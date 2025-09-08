-- TODO: test locally first
drop function zaehlung_rev_set_winning_revision ();
create function zaehlung_rev_set_winning_revision ();

-- rename prognose in table zahlung to bedarf
alter table zahlung rename column prognose to bedarf;
-- rename prognose in table zaehlung_rev to bedarf
alter table zaehlung_rev rename column prognose to bedarf;

drop view if exists art_sums;
-- TODO: create or replace view art_sums, see in createViews.sql;

drop view if exists herkunft_sums;
-- TODO: create or replace view herkunft_sums, see in createViews.sql;