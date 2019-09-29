-- 1. create datasets with:
--    art_id, action, geplant, partitioner, datum, anzahl_pflanzen, sum_anzahl_pflanzen
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
      z.geplant,
      sum(tz.anzahl_pflanzen) as anzahl_pflanzen,
      sum(tz.anzahl_auspflanzbereit) as anzahl_auspflanzbereit,
      'zaehlung' as action
    FROM
      kultur k inner join zaehlung z
        inner join teilzaehlung tz
        on tz.zaehlung_id = z.id
      on k.id = z.kultur_id
    where
      z.datum is not null
      and (
        z.geplant is false or
        (
          -- zahlung is after last count done for this art_id
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
              and z2.geplant is false
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
              z2.geplant is false
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
              and z2.geplant is false
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
              z2.geplant is false
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
      'auspflanzung' as action
    FROM
      lieferung l
    where
      l.datum is not null
      and (
        l.geplant is false or
        (
          -- sammlung is after last count done for this art_id
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
              and z2.geplant is false
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
  geplant,
  partitioner,
  datum,
  anzahl_pflanzen,
  anzahl_auspflanzbereit,
  sum(anzahl_pflanzen) over (partition by art_id, partitioner order by datum) as sum_anzahl_pflanzen,
  sum(anzahl_auspflanzbereit) over (partition by art_id, partitioner order by datum) as sum_anzahl_auspflanzbereit
from counts
order by
  art_id,
  datum;