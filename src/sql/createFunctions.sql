drop function if exists person_search(filter text);
create or replace function person_search(filter text)
returns setof person as
  $$
    select * from person where tsv @@ to_tsquery($1);
  $$
language sql stable;
-- alter function person_search(filter text) owner to postgres;

-- query like this:
--art_search(args: {filter: "abies"}) {
--  id--
--}

drop function if exists art_search(filter text);
create or replace function art_search(filter text)
returns setof art as
  $$
    select * from art where tsv @@ to_tsquery($1);
  $$
language sql stable;
-- alter function art_search(filter text) owner to postgres;

drop function if exists herkunft_search(filter text);
create or replace function herkunft_search(filter text)
returns setof herkunft as
  $$
    select * from herkunft where tsv @@ to_tsquery($1);
  $$
language sql stable;
-- alter function herkunft_search(filter text) owner to postgres;

drop function if exists sammlung_search(filter text);
create or replace function sammlung_search(filter text)
returns setof sammlung as
  $$
    select * from sammlung where tsv @@ to_tsquery($1);
  $$
language sql stable;
-- alter function sammlung_search(filter text) owner to postgres;

drop function if exists garten_search(filter text);
create or replace function garten_search(filter text)
returns setof garten as
  $$
    select * from garten where tsv @@ to_tsquery($1);
  $$
language sql stable;
-- alter function garten_search(filter text) owner to postgres;

drop function if exists kultur_search(filter text);
create or replace function kultur_search(filter text)
returns setof kultur as
  $$
    select * from kultur where tsv @@ to_tsquery($1);
  $$
language sql stable;
-- alter function kultur_search(filter text) owner to postgres;

drop function if exists kultur_event_search(filter text);
create or replace function kultur_event_search(filter text)
returns setof kultur_event as
  $$
    select * from kultur_event where tsv @@ to_tsquery($1);
  $$
language sql stable;
-- alter function kultur_event_search(filter text) owner to postgres;

drop function if exists kultur_inventar_search(filter text);
create or replace function kultur_inventar_search(filter text)
returns setof kultur_inventar as
  $$
    select * from kultur_inventar where tsv @@ to_tsquery($1);
  $$
language sql stable;
-- alter function kultur_inventar_search(filter text) owner to postgres;

drop function if exists zaehlung_search(filter text);
create or replace function zaehlung_search(filter text)
returns setof zaehlung as
  $$
    select * from zaehlung where tsv @@ to_tsquery($1);
  $$
language sql stable;
-- alter function zaehlung_search(filter text) owner to postgres;

drop function if exists lieferung_search(filter text);
create or replace function lieferung_search(filter text)
returns setof lieferung as
  $$
    select * from lieferung where tsv @@ to_tsquery($1);
  $$
language sql stable;
-- alter function lieferung_search(filter text) owner to postgres;