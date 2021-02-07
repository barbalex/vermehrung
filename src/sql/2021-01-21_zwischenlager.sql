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
    kultur.garten_id in ('cc033efa-b555-11ea-b3de-0242ac130004', '1c3ba9f0-ed20-11ea-be2b-93662cfc26b3')
    and kultur.zwischenlager = true
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
)
select
  list.*,
  id_count.anzahl as anzahl_art_herkunft_in_garten
from list
left join id_count
on id_count.garten_id = list.garten_id
  and id_count.herkunft_id = list.herkunft_id
  and id_count.art_id = list.art_id