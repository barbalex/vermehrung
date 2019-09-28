drop view if exists v_art_zaehlung_done_sums;
create or replace view v_art_zaehlung_done_sums as
select
  k.art_id,
  z.datum,
  sum(tz.anzahl_pflanzen) over (partition by k.art_id order by z.datum) as anzahl_pflanzen,
  sum(tz.anzahl_auspflanzbereit) over (partition by k.art_id order by z.datum) as anzahl_auspflanzbereit
FROM
  kultur k inner join zaehlung z
    inner join teilzaehlung tz
    on tz.zaehlung_id = z.id
  on k.id = z.kultur_id
where
  z.datum is not null
  and z.geplant is false
order by
  k.art_id,
  z.datum;

drop view if exists v_art_zaehlung_planned_sums;
create or replace view v_art_zaehlung_planned_sums as
select
  k.art_id,
  z.datum,
  sum(tz.anzahl_pflanzen) over (partition by k.art_id order by z.datum) as anzahl_pflanzen,
  sum(tz.anzahl_auspflanzbereit) over (partition by k.art_id order by z.datum) as anzahl_auspflanzbereit
FROM
  kultur k inner join zaehlung z
    inner join teilzaehlung tz
    on tz.zaehlung_id = z.id
  on k.id = z.kultur_id
where
  z.datum is not null
  and z.geplant is true
order by
  k.art_id,
  z.datum;