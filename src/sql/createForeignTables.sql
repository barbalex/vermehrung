-- enable ae as foreign tables
-- see: https://www.percona.com/blog/2018/08/21/foreign-data-wrappers-postgresql-postgres_fdw/

-- on arteigenschaften.ch:
-- postgresql insists on a password. but data is open,
-- so no problem not to use a secure one
create user fdw_user with encrypted password 'secret';
grant select on table ae.v_vermehrung_arten to fdw_user;

-- on vermehrung
CREATE EXTENSION postgres_fdw;
CREATE SERVER ae_server
  FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS (host '207.154.212.35', port '5432', dbname 'ae');
-- need to use this view
-- because joining tables is way too slow
-- BUT: querying from this foreign table takes 2.4s
-- while querying in ae takes 0.125xs
-- so: insert into own table
create foreign table ae_art_live (
  id uuid,
  name text
)
server ae_server options (schema_name 'ae', table_name 'v_vermehrung_arten');

CREATE USER MAPPING
    FOR postgres
 SERVER ae_server
OPTIONS (user 'fdw_user', password 'secret');

create table ae_art (
  id uuid primary key,
  taxonomy text,
  name text,
  name_latein text,
  name_deutsch text,
  changed timestamp default now(),
  _rev_at decimal default extract(epoch from now())
);
create index on ae_art using btree (id);
create index on ae_art using btree (name);
create index on ae_art using btree (_rev_at);
create index on ae_art using btree (taxonomy);

insert into ae_art (id,name,name_latein,name_deutsch)
select id, name, name_latein, name_deutsch
from ae_art_live
on conflict on constraint ae_art_pkey do update set 
  name = EXCLUDED.name,
  name_latein = EXCLUDED.name_latein,
  name_deutsch = EXCLUDED.name_deutsch;

insert into ae_art (id,name,name_latein,name_deutsch)
select id, name, name_latein, name_deutsch
from ae_art_live
on conflict on constraint ae_art_pkey do nothing;