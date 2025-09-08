-- rename prognose in table zahlung to bedarf
alter table zaehlung rename column prognose to bedarf;
-- rename prognose in table zaehlung_rev to bedarf
alter table zaehlung_rev rename column prognose to bedarf;

drop trigger trigger_zaehlung_rev_set_winning_revision on zaehlung_rev;
drop function zaehlung_rev_set_winning_revision ();

-- TODO: create function zaehlung_rev_set_winning_revision, see: createRevTriggers_zaehlung.sql
-- TODO: create trigger trigger_zaehlung_rev_set_winning_revision, see: createRevTriggers_zaehlung.sql