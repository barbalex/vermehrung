-- 1. create datasets with:
--    art_id, action, bedarf, partitioner, datum, anzahl_pflanzen, sum_anzahl_pflanzen
--    from: sammlung, auspflanzung, zaehlung
--    partitioner is the id of last zaehlung done
-- 2. union them
-- 3. calculate sum_anzahl_pflanzen partitioning by art_id and partitioner
-- NOT IN USE
drop view if exists art_sums;
create or replace view art_sums as
with 
  counts as (
    select
      k.art_id,
      z.id as partitioner,
      z.datum,
      z.bedarf,
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
        z.bedarf is false
        or
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
              and z2.bedarf is false
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
              z2.bedarf is false
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
              and z2.bedarf is false
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
              z2.bedarf is false
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
              and z2.bedarf is false
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
  concat(art_id, datum) id,
  art_id,
  action,
  bedarf,
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

-- NOT IN USE
drop view if exists herkunft_sums;
create or replace view herkunft_sums as
with 
  counts as (
    select
      k.art_id,
      k.herkunft_id,
      z.id as partitioner,
      z.datum,
      z.bedarf,
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
        z.bedarf is false
        or
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
              and z2.bedarf is false
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
              z2.bedarf is false
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
              and z2.bedarf is false
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
              z2.bedarf is false
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
              and z2.bedarf is false
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
  concat(art_id, herkunft_id) as id,
  art_id,
  herkunft_id,
  action,
  bedarf,
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
