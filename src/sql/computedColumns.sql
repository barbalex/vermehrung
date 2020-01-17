CREATE OR REPLACE FUNCTION is_valid_coordinates(geometry) RETURNS boolean AS
  'SELECT ST_XMin($1) >= -180 AND ST_XMax($1) <= 180 AND
          ST_YMin($1) >= -90 AND ST_YMax($1) <= 90;'
LANGUAGE sql IMMUTABLE STRICT;


create or replace view herkunft_computed as
select
  herkunft.id,
  case
    when is_valid_coordinates(geom_point) then ST_Y(geom_point)
    else null
  end as wgs84_lat,
  case
    when is_valid_coordinates(geom_point) then ST_X(geom_point)
    else null
  end as wgs84_long,
  case
    when is_valid_coordinates(geom_point) then round(ST_X(ST_Transform(geom_point, 2056)))
    else null
  end as lv95_x,
  case
    when is_valid_coordinates(geom_point) then round(ST_Y(ST_Transform(geom_point, 2056)))
    else null
  end as lv95_y
from herkunft;

create or replace view garten_computed as
select
  garten.id,
  case
    when is_valid_coordinates(geom_point) then ST_Y(geom_point)
    else null
  end as wgs84_lat,
  case
    when is_valid_coordinates(geom_point) then ST_X(geom_point)
    else null
  end as wgs84_long,
  case
    when is_valid_coordinates(geom_point) then round(ST_X(ST_Transform(geom_point, 2056)))
    else null
  end as lv95_x,
  case
    when is_valid_coordinates(geom_point) then round(ST_Y(ST_Transform(geom_point, 2056)))
    else null
  end as lv95_y
from garten;


create or replace view sammlung_computed as
select
  sammlung.id,
  case
    when is_valid_coordinates(geom_point) then ST_Y(geom_point)
    else null
  end as wgs84_lat,
  case
    when is_valid_coordinates(geom_point) then ST_X(geom_point)
    else null
  end as wgs84_long,
  case
    when is_valid_coordinates(geom_point) then round(ST_X(ST_Transform(geom_point, 2056)))
    else null
  end as lv95_x,
  case
    when is_valid_coordinates(geom_point) then round(ST_Y(ST_Transform(geom_point, 2056)))
    else null
  end as lv95_y
from sammlung;