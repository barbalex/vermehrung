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
            distinct on (a.id) z.datum
            from
              art a
                inner join kultur
                  inner join zaehlung z
                  on kultur.id = z.kultur_id
                on a.id = kultur.art_id
            where
              kultur.art_id = k.art_id
              and z.geplant is false
              and z.datum is not null
            order by
              a.id,
              z.datum desc
          )
        )
      )
      and tz.anzahl_pflanzen is not null
    group by
      k.art_id,
      z.id,
      z.datum
    union all
    select
      s.art_id,
      -- partitioner must be id of previous count
      (select
        distinct on (a.id) z.id
        from
          art a
            inner join kultur k
              inner join zaehlung z
              on k.id = z.kultur_id
            on a.id = k.art_id
        where
          k.art_id = s.art_id
          and z.geplant is false
          and z.datum is not null
          and z.datum <= s.datum
        order by
          a.id,
          z.datum desc) as partitioner,
      s.datum,
      s.geplant,
      s.anzahl_pflanzen,
      'sammlung' as action
    FROM
      sammlung s
    where
      s.datum is not null
      and (
        s.geplant is false or
        (
          -- sammlung is after last count done for this art_id
          s.datum > (
            select
            distinct on (a.id) z.datum
            from
              art a
                inner join kultur
                  inner join zaehlung z
                  on kultur.id = z.kultur_id
                on a.id = kultur.art_id
            where
              kultur.art_id = s.art_id
              and z.geplant is false
              and z.datum is not null
            order by
              a.id,
              z.datum desc
          )
        )
      )
      and s.anzahl_pflanzen is not null
    union all
    select
      l.art_id,
      -- partitioner must be id of previous count
      (select
        distinct on (a.id) z.id
        from
          art a
            inner join kultur k
              inner join zaehlung z
              on k.id = z.kultur_id
            on a.id = k.art_id
        where
          k.art_id = l.art_id
          and z.geplant is false
          and z.datum is not null
          and z.datum <= l.datum
        order by
          a.id,
          z.datum desc) partitioner,
      l.datum,
      l.geplant,
      -l.anzahl_pflanzen as anzahl_pflanzen,
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
            distinct on (a.id) z.datum
            from
              art a
                inner join kultur
                  inner join zaehlung z
                  on kultur.id = z.kultur_id
                on a.id = kultur.art_id
            where
              kultur.art_id = l.art_id
              and z.geplant is false
              and z.datum is not null
            order by
              a.id,
              z.datum desc
          )
        )
      )
      and l.anzahl_pflanzen is not null
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
  sum(anzahl_pflanzen) over (partition by art_id, partitioner order by datum) as sum_anzahl_pflanzen
from counts
order by
  art_id,
  datum;