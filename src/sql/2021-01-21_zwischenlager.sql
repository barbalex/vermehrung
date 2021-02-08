with list as (
  select
    garten.name as garten_name,
    ae_art.name as art_name,
    herkunft.nr as herkunft_nr,
    herkunft.lokalname as herkunft_lokalname,
    herkunft.gemeinde as herkunft_gemeinde,
    kultur.*
  from kultur
  left join garten
  on garten.id = kultur.garten_id
  left join herkunft
  on herkunft.id = kultur.herkunft_id
  left join art
    left join ae_art
    on ae_art.id = art.ae_id
  on art.id = kultur.art_id
  where
    kultur.zwischenlager = true
    and kultur.art_id is not null
    and kultur.herkunft_id is not null
  order by
    garten.name,
    ae_art.name,
    herkunft.nr
), id_count as (
  select
    garten_id,
    herkunft_id,
    art_id,
    count(id) as anzahl
  from list
  group by
    garten_id,
    herkunft_id,
    art_id
), anlieferung as (
  select
    nach_kultur_id as id,
    count(id) as anzahl
  from lieferung
  group by nach_kultur_id
), auslieferung as (
  select
    von_kultur_id as id,
    count(id) as anzahl
  from lieferung
  group by von_kultur_id
), zaehlung as (
  select
    kultur_id as id,
    count(id) as anzahl
  from zaehlung
  group by kultur_id
), event as (
  select
    kultur_id as id,
    count(id) as anzahl
  from event
  group by kultur_id
), teilkultur as (
  select
    kultur_id as id,
    count(id) as anzahl
  from teilkultur
  group by kultur_id
)
select
  list.*,
  id_count.anzahl as anzahl_art_herkunft_in_garten,
  coalesce(anlieferung.anzahl, 0) as anzahl_anlieferungen,
  coalesce(auslieferung.anzahl, 0) as anzahl_auslieferungen,
  coalesce(zaehlung.anzahl, 0) as anzahl_zaehlungen,
  coalesce(event.anzahl, 0) as anzahl_events,
  coalesce(teilkultur.anzahl, 0) as anzahl_teilkulturen
from list
  left join id_count
  on id_count.garten_id = list.garten_id
    and id_count.herkunft_id = list.herkunft_id
    and id_count.art_id = list.art_id
  left join anlieferung
  on anlieferung.id = list.id
  left join auslieferung
  on auslieferung.id = list.id
  left join zaehlung
  on zaehlung.id = list.id
  left join event
  on event.id = list.id
  left join teilkultur
  on teilkultur.id = list.id