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
  herkunft.nr;