drop function if exists person_search(filter text);
create or replace function person_search(filter text)
returns setof person as
  $$
    select * from person where tsv @@ to_tsquery($1);
  $$
language sql stable;

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

drop function if exists herkunft_search(filter text);
create or replace function herkunft_search(filter text)
returns setof herkunft as
  $$
    select * from herkunft where tsv @@ to_tsquery($1);
  $$
language sql stable;

drop function if exists sammlung_search(filter text);
create or replace function sammlung_search(filter text)
returns setof sammlung as
  $$
    select * from sammlung where tsv @@ to_tsquery($1);
  $$
language sql stable;

drop function if exists garten_search(filter text);
create or replace function garten_search(filter text)
returns setof garten as
  $$
    select * from garten where tsv @@ to_tsquery($1);
  $$
language sql stable;

drop function if exists kultur_search(filter text);
create or replace function kultur_search(filter text)
returns setof kultur as
  $$
    select * from kultur where tsv @@ to_tsquery($1);
  $$
language sql stable;

drop function if exists teilkultur_search(filter text);
create or replace function teilkultur_search(filter text)
returns setof teilkultur as
  $$
    select * from teilkultur where tsv @@ to_tsquery($1);
  $$
language sql stable;

drop function if exists zaehlung_search(filter text);
create or replace function zaehlung_search(filter text)
returns setof zaehlung as
  $$
    select * from zaehlung where tsv @@ to_tsquery($1);
  $$
language sql stable;

drop function if exists lieferung_search(filter text);
create or replace function lieferung_search(filter text)
returns setof lieferung as
  $$
    select * from lieferung where tsv @@ to_tsquery($1);
  $$
language sql stable;

drop function if exists aufgabe_search(filter text);
create or replace function aufgabe_search(filter text)
returns setof aufgabe as
  $$
    select * from aufgabe where tsv @@ to_tsquery($1);
  $$
language sql stable;