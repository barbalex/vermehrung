-- 1. create datasets with:
--    art_id, action, prognose, partitioner, datum, anzahl_pflanzen, sum_anzahl_pflanzen
--    from: sammlung, auspflanzung, zaehlung
--    partitioner is the id of last zaehlung done
-- 2. union them
-- 3. calculate sum_anzahl_pflanzen partitioning by art_id and partitioner
drop view if exists art_sums;
create or replace view art_sums as
with 
  counts as (
    select
      k.art_id,
      z.id as partitioner,
      z.datum,
      z.prognose,
      sum(tz.anzahl_pflanzen) as anzahl_pflanzen,
      sum(tz.anzahl_auspflanzbereit) as anzahl_auspflanzbereit,
      sum(tz.anzahl_mutterpflanzen) as anzahl_mutterpflanzen,
      0 as von_anzahl_individuen,
      0 as gramm_samen,
      string_agg(tz.andere_menge, ', ') as andere_menge,
      string_agg(tz.auspflanzbereit_beschreibung, ', ') as auspflanzbereit_beschreibung,
      string_agg(tz.bemerkungen, ', ') as bemerkungen,
      'zaehlung' as action
    FROM
      kultur k inner join zaehlung z
        inner join teilzaehlung tz
        on tz.zaehlung_id = z.id
      on k.id = z.kultur_id
    where
      z.datum is not null
      and (
        (
          z.ziel is false 
          and z.prognose is false
        ) or
        (
          -- zaehlung is after last count done for this art_id
          z.datum > (
            select
            distinct on (a2.id) z2.datum
            from
              art a2
                inner join kultur k2
                  inner join zaehlung z2
                  on k2.id = z2.kultur_id
                on a2.id = k2.art_id
            where
              k2.art_id = k.art_id
              and z2.ziel is false 
              and z2.prognose is false
              and z2.datum is not null
            order by
              a2.id,
              z2.datum desc
          )
        )
      )
      and (
        tz.anzahl_pflanzen is not null
        or tz.anzahl_auspflanzbereit is not null
      )
    group by
      k.art_id,
      z.id,
      z.datum
    union all
    select
      s.art_id,
      -- partitioner must be id of previous count
      (select
        distinct on (a2.id) z2.id
        from
          art a2
            inner join kultur k2
              inner join zaehlung z2
              on k2.id = z2.kultur_id
            on a2.id = k2.art_id
        where
          case
            when s.geplant is false then 
              z2.ziel is false 
              and z2.prognose is false
              and k2.art_id = s.art_id
              and z2.datum is not null
              and z2.datum <= s.datum
            else
              -- if lieferung is geplant, also accept zaehlung geplant
              k2.art_id = s.art_id
              and z2.datum is not null
              and z2.datum <= s.datum
          end
        order by
          a2.id,
          z2.datum desc
      ) as partitioner,
      s.datum,
      s.geplant,
      s.anzahl_pflanzen,
      0 as anzahl_auspflanzbereit,
      0 as anzahl_mutterpflanzen,
      s.von_anzahl_individuen,
      s.gramm_samen,
      s.andere_menge,
      '' as auspflanzbereit_beschreibung,
      s.bemerkungen,
      'sammlung' as action
    FROM
      sammlung s
    where
      s.datum is not null
      and (
        s.geplant is false or
        (
          -- sammlung is after last zaehlung done for this art_id
          s.datum > (
            select
            distinct on (a2.id) z2.datum
            from
              art a2
                inner join kultur k2
                  inner join zaehlung z2
                  on k2.id = z2.kultur_id
                on a2.id = k2.art_id
            where
              k2.art_id = s.art_id
              and z2.ziel is false 
              and z2.prognose is false
              and z2.datum is not null
            order by
              a2.id,
              z2.datum desc
          )
        )
      )
      and s.anzahl_pflanzen is not null
    union all
    select
      l.art_id,
      -- partitioner must be id of previous count
      (select
        distinct on (a2.id) z2.id
        from
          art a2
            inner join kultur k2
              inner join zaehlung z2
              on k2.id = z2.kultur_id
            on a2.id = k2.art_id
        where
          case
            when l.geplant is false then 
              z2.ziel is false 
              and z2.prognose is false
              and k2.art_id = l.art_id
              and z2.datum is not null
              and z2.datum <= l.datum
            else
              -- if lieferung is geplant, also accept zaehlung geplant
              k2.art_id = l.art_id
              and z2.datum is not null
              and z2.datum <= l.datum
          end
        order by
          a2.id,
          z2.datum desc
      ) as partitioner,
      l.datum,
      l.geplant,
      -l.anzahl_pflanzen as anzahl_pflanzen,
      -l.anzahl_auspflanzbereit as anzahl_auspflanzbereit,
      0 as anzahl_mutterpflanzen,
      l.von_anzahl_individuen,
      -l.gramm_samen as gramm_samen,
      l.andere_menge,
      '' as auspflanzbereit_beschreibung,
      l.bemerkungen,
      'auspflanzung' as action
    FROM
      lieferung l
    where
      l.datum is not null
      and (
        l.geplant is false or
        (
          -- lieferung is after last count done for this art_id
          l.datum > (
            select
            distinct on (a2.id) z2.datum
            from
              art a2
                inner join kultur k2
                  inner join zaehlung z2
                  on k2.id = z2.kultur_id
                on a2.id = k2.art_id
            where
              k2.art_id = l.art_id
              and z2.ziel is false 
              and z2.prognose is false
              and z2.datum is not null
            order by
              a2.id,
              z2.datum desc
          )
        )
      )
      and (
        l.anzahl_pflanzen is not null
        or l.anzahl_auspflanzbereit is not null
      )
      and l.nach_ausgepflanzt is true
    order by
      art_id,
      datum
  )
select
  art_id,
  action,
  prognose,
  partitioner,
  datum,
  anzahl_pflanzen,
  anzahl_auspflanzbereit,
  sum(anzahl_pflanzen) over (partition by art_id, partitioner order by datum) as sum_anzahl_pflanzen,
  sum(anzahl_auspflanzbereit) over (partition by art_id, partitioner order by datum) as sum_anzahl_auspflanzbereit,
  sum(anzahl_mutterpflanzen) over (partition by art_id, partitioner order by datum) as anzahl_mutterpflanzen,
  sum(von_anzahl_individuen) over (partition by art_id, partitioner order by datum) as von_anzahl_individuen,
  sum(gramm_samen) over (partition by art_id, partitioner order by datum) as gramm_samen,
  string_agg(andere_menge, ', ') over (partition by art_id, partitioner order by datum) as andere_menge,
  string_agg(auspflanzbereit_beschreibung, ', ') over (partition by art_id, partitioner order by datum) as auspflanzbereit_beschreibung,
  string_agg(bemerkungen, ', ') over (partition by art_id, partitioner order by datum) as bemerkungen
from counts
order by
  art_id,
  datum;

drop view if exists herkunft_sums;
create or replace view herkunft_sums as
with 
  counts as (
    select
      k.art_id,
      k.herkunft_id,
      z.id as partitioner,
      z.datum,
      z.prognose,
      sum(tz.anzahl_pflanzen) as anzahl_pflanzen,
      sum(tz.anzahl_auspflanzbereit) as anzahl_auspflanzbereit,
      sum(tz.anzahl_mutterpflanzen) as anzahl_mutterpflanzen,
      0 as von_anzahl_individuen,
      0 as gramm_samen,
      string_agg(tz.andere_menge, ', ') as andere_menge,
      string_agg(tz.auspflanzbereit_beschreibung, ', ') as auspflanzbereit_beschreibung,
      string_agg(tz.bemerkungen, ', ') as bemerkungen,
      'zaehlung' as action
    FROM
      kultur k inner join zaehlung z
        inner join teilzaehlung tz
        on tz.zaehlung_id = z.id
      on k.id = z.kultur_id
    where
      z.datum is not null
      and (
        (
          z.ziel is false 
          and z.prognose is false
        ) or
        (
          -- zaehlung is after last count done for this art_id
          z.datum > (
            select
            distinct on (k2.art_id, k2.herkunft_id) z2.datum
            from
              kultur k2 inner join zaehlung z2
              on k2.id = z2.kultur_id
            where
              k2.art_id = k.art_id
              and k2.herkunft_id = k.herkunft_id
              and z2.ziel is false 
              and z2.prognose is false
              and z2.datum is not null
            order by
              k2.art_id,
              k2.herkunft_id,
              z2.datum desc
          )
        )
      )
      and (
        tz.anzahl_pflanzen is not null
        or tz.anzahl_auspflanzbereit is not null
      )
    group by
      k.art_id,
      k.herkunft_id,
      z.id,
      z.datum
    union all
    select
      s.art_id,
      s.herkunft_id,
      -- partitioner must be id of previous count
      (select
        distinct on (k2.art_id, k2.herkunft_id) z2.id
        from
          kultur k2 inner join zaehlung z2
          on k2.id = z2.kultur_id
        where
          case
            when s.geplant is false then 
              z2.ziel is false 
              and z2.prognose is false
              and k2.art_id = s.art_id
              and k2.herkunft_id = s.herkunft_id
              and z2.datum is not null
              and z2.datum <= s.datum
            else
              -- if lieferung is geplant, also accept zaehlung geplant
              k2.art_id = s.art_id
              and k2.herkunft_id = s.herkunft_id
              and z2.datum is not null
              and z2.datum <= s.datum
          end
        order by
          k2.art_id, 
          k2.herkunft_id,
          z2.datum desc
      ) as partitioner,
      s.datum,
      s.geplant,
      s.anzahl_pflanzen,
      0 as anzahl_auspflanzbereit,
      0 as anzahl_mutterpflanzen,
      s.von_anzahl_individuen,
      s.gramm_samen,
      s.andere_menge,
      '' as auspflanzbereit_beschreibung,
      s.bemerkungen,
      'sammlung' as action
    FROM
      sammlung s
    where
      s.datum is not null
      and (
        s.geplant is false or
        (
          -- sammlung is after last zaehlung done for this art_id
          s.datum > (
            select
            distinct on (k2.art_id, k2.herkunft_id) z2.datum
            from
              kultur k2 inner join zaehlung z2
              on k2.id = z2.kultur_id
            where
              k2.art_id = s.art_id
              and k2.herkunft_id = s.herkunft_id
              and z2.ziel is false 
              and z2.prognose is false
              and z2.datum is not null
            order by
              k2.art_id,
              k2.herkunft_id,
              z2.datum desc
          )
        )
      )
      and s.anzahl_pflanzen is not null
    union all
    select
      l.art_id,
      ku.herkunft_id,
      -- partitioner must be id of previous count
      (select
        distinct on (k2.art_id, k2.herkunft_id) z2.id
        from
          kultur k2 inner join zaehlung z2
          on k2.id = z2.kultur_id
        where
          case
            when l.geplant is false then 
              z2.ziel is false 
              and z2.prognose is false
              and k2.art_id = l.art_id
              and k2.herkunft_id = ku.herkunft_id
              and z2.datum is not null
              and z2.datum <= l.datum
            else
              -- if lieferung is geplant, also accept zaehlung geplant
              k2.art_id = l.art_id
              and k2.herkunft_id = ku.herkunft_id
              and z2.datum is not null
              and z2.datum <= l.datum
          end
        order by
          k2.art_id,
          k2.herkunft_id,
          z2.datum desc
      ) as partitioner,
      l.datum,
      l.geplant,
      -l.anzahl_pflanzen as anzahl_pflanzen,
      -l.anzahl_auspflanzbereit as anzahl_auspflanzbereit,
      0 as anzahl_mutterpflanzen,
      l.von_anzahl_individuen,
      -l.gramm_samen as gramm_samen,
      l.andere_menge,
      '' as auspflanzbereit_beschreibung,
      l.bemerkungen,
      'auspflanzung' as action
    FROM
      lieferung l inner join kultur ku
      on l.von_kultur_id = ku.id
    where
      l.datum is not null
      and (
        l.geplant is false or
        (
          -- lieferung is after last count done for this art_id
          l.datum > (
            select
            distinct on (k2.art_id, k2.herkunft_id) z2.datum
            from
              kultur k2 inner join zaehlung z2
              on k2.id = z2.kultur_id
            where
              k2.art_id = l.art_id
              and k2.herkunft_id = ku.herkunft_id
              and z2.ziel is false 
              and z2.prognose is false
              and z2.datum is not null
            order by
              k2.art_id,
              k2.herkunft_id,
              z2.datum desc
          )
        )
      )
      and (
        l.anzahl_pflanzen is not null
        or l.anzahl_auspflanzbereit is not null
      )
      and l.nach_ausgepflanzt is true
    order by
      art_id,
      herkunft_id,
      datum
  )
select
  art_id,
  herkunft_id,
  action,
  prognose,
  partitioner,
  datum,
  anzahl_pflanzen,
  anzahl_auspflanzbereit,
  sum(anzahl_pflanzen) over (partition by art_id, partitioner order by datum) as sum_anzahl_pflanzen,
  sum(anzahl_auspflanzbereit) over (partition by art_id, partitioner order by datum) as sum_anzahl_auspflanzbereit,
  sum(anzahl_mutterpflanzen) over (partition by art_id, partitioner order by datum) as anzahl_mutterpflanzen,
  sum(von_anzahl_individuen) over (partition by art_id, partitioner order by datum) as von_anzahl_individuen,
  sum(gramm_samen) over (partition by art_id, partitioner order by datum) as gramm_samen,
  string_agg(andere_menge, ', ') over (partition by art_id, partitioner order by datum) as andere_menge,
  string_agg(auspflanzbereit_beschreibung, ', ') over (partition by art_id, partitioner order by datum) as auspflanzbereit_beschreibung,
  string_agg(bemerkungen, ', ') over (partition by art_id, partitioner order by datum) as bemerkungen
from counts
order by
  art_id,
  herkunft_id,
  herkunft_id,
  datum;


drop view if exists kultur_export_sums;
create or replace view kultur_export_sums as
with kultur_last_event as (
  select
    distinct on (kultur.id)
    kultur.id as kultur_id,
    event.datum,
    event.id as event_id
  from
    kultur inner join event
    on kultur.id = event.kultur_id
  where
    event.geplant is false
    and event.datum is not null
  order by
    kultur.id,
    event.datum desc
), kultur_last_zaehlung as (
  select
    distinct on (kultur.id)
    kultur.id as kultur_id,
    zaehlung.datum,
    zaehlung.id as zaehlung_id
  from
    kultur inner join zaehlung
    on kultur.id = zaehlung.kultur_id
  where
    zaehlung.ziel is false 
    and zaehlung.prognose is false
    and zaehlung.datum is not null
  order by
    kultur.id,
    zaehlung.datum desc
), zaehlung_summs as (
  select
    zaehlung.id,
    sum (teilzaehlung.anzahl_pflanzen) as anzahl_pflanzen,
    sum (teilzaehlung.anzahl_auspflanzbereit) as anzahl_auspflanzbereit,
    sum (teilzaehlung.anzahl_mutterpflanzen) as anzahl_mutterpflanzen
  from
    zaehlung
    inner join teilzaehlung
    on teilzaehlung.zaehlung_id = zaehlung.id
  group by zaehlung.id
), kultur_summs as (
  -- TODO: use only letzte Zählung that is not prognose
  select
    kultur.id,
    zaehlung_summs.anzahl_pflanzen,
    zaehlung_summs.anzahl_auspflanzbereit,
    zaehlung_summs.anzahl_mutterpflanzen
  from
    kultur
    inner join kultur_last_zaehlung
      inner join zaehlung_summs
      on zaehlung_summs.id = kultur_last_zaehlung.zaehlung_id
    on kultur_last_zaehlung.kultur_id = kultur.id
)
select
  g.id as garten_id,
  g.name as garten_name,
  k.id as kultur_id,
  ae_art.name as art_name,
  h.nr as herkunft_nr,
  ks.anzahl_pflanzen as kultur_anzahl_pflanzen,
  ks.anzahl_auspflanzbereit as kultur_anzahl_auspflanzbereit,
  ks.anzahl_mutterpflanzen as kultur_anzahl_mutterpflanzen,
  z.id as zaehlung_id,
  z.datum as zaehlung_datum,
  z.prognose as zaehlung_prognose,
  z.bemerkungen as zaehlung_bemerkungen,
  zs.anzahl_pflanzen as zaehlung_anzahl_pflanzen,
  zs.anzahl_auspflanzbereit as zaehlung_anzahl_auspflanzbereit,
  zs.anzahl_mutterpflanzen as zaehlung_anzahl_mutterpflanzen,
  tz.id as teilzaehlung_id,
  tk.name as teilzaehlung_teilkultur_name,
  tk.ort1 as teilzaehlung_teilkultur_ort1,
  tk.ort2 as teilzaehlung_teilkultur_ort2,
  tk.ort3 as teilzaehlung_teilkultur_ort3,
  tk.bemerkungen as teilzaehlung_teilkultur_bemerkungen,
  tz.anzahl_pflanzen as teilzaehlung_anzahl_pflanzen,
  tz.anzahl_auspflanzbereit as teilzaehlung_anzahl_auspflanzbereit,
  tz.anzahl_mutterpflanzen as teilzaehlung_anzahl_mutterpflanzen,
  tz.andere_menge as teilzaehlung_andere_menge,
  tz.auspflanzbereit_beschreibung as teilzaehlung_auspflanzbereit_beschreibung,
  tz.bemerkungen as teilzaehlung_bemerkungen,
  e.id as event_id,
  e.datum as event_datum,
  e.beschreibung as event_beschreibung,
  e.geplant as event_geplant,
  ep.name as event_person_name,
  etk.name as event_teilkultur_name,
  etk.ort1 as event_teilkultur_ort1,
  etk.ort2 as event_teilkultur_ort2,
  etk.ort3 as event_teilkultur_ort3,
  etk.bemerkungen as event_teilkultur_bemerkungen
from
  kultur k
  inner join zaehlung z
    inner join teilzaehlung tz
      left join teilkultur tk
      on tz.teilkultur_id = tk.id
    on tz.zaehlung_id = z.id
    left join zaehlung_summs zs
    on zs.id = z.id
  on z.kultur_id = k.id
  left join kultur_summs ks
  on ks.id = k.id
  inner join art a
    inner join ae_art
    on ae_art.id = a.ae_id
  on k.art_id = a.id
  inner join garten g
  on g.id = k.garten_id
  inner join herkunft h
  on h.id = k.herkunft_id
  left join event e
    inner join kultur_last_event on
    kultur_last_event.event_id = e.id
    left join person ep
    on ep.id = e.person_id
    left join teilkultur etk
    on etk.id = e.teilkultur_id
  on e.kultur_id = k.id
order by
  g.name,
  ae_art.name,
  h.nr,
  z.datum desc;
