select
  ae_taxonomy.name as taxonomy_name,
  ae_object.id,
  ae_object.name,
  ae_object.properties
from ae_taxonomy
inner join ae_object
on ae_object.taxonomy_id = ae_taxonomy.id
where ae_taxonomy.name = 'SISF Index 2 (2005)'
and ae_object.properties is not null
order by ae_object.name;

-- this view is much faster:
select
  id,
  name,
  properties
from ae_object
where taxonomy_id = 'aed47d41-7b0e-11e8-b9a5-bd4f79edbcc4'
and properties is not null
order by name;