drop view if exists art_label;
create view art_label as
select art.id, coalesce(ae_art.name, '(keine Art gewählt)') as label
from art left join ae_art on ae_art.id = art.ae_id;