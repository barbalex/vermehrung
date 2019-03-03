drop function if exists art_search(filter text);
create or replace function art_search(filter text)
returns setof art as
  $$
    select * from art where tsv @@ to_tsquery($1);
  $$
language sql stable;
alter function art_search(filter text) owner to postgres;

-- query like this:
--art_search(args: {filter: "abies"}) {
--  id--
--}