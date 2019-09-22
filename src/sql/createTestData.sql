insert into person (id,name)
values
 (1, 'Test tester'),
 (2, 'Fritz Müller');

insert into art (id,ae_id)
values
 (1, '1ab6bbb1-979a-4232-a5d8-62efb5cb984a'),
 (2, '15544ebd-51d0-470b-9c34-b6f822eacabf');

insert into herkunft (id,nr,lokalname)
values
 (1, '1a', 'hier'),
 (2, '2b', 'da');

insert into sammlung (id,art_id,person_id,herkunft_id,nr,datum)
values
 (1,1,1,1,'1a','2018-09-01'),
 (2,2,2,2,'3b','2018-07-05');

insert into garten (id,person_id)
values
 (1,1),
 (2,2);
 
insert into kultur (id,art_id,garten_id)
values
 (1,1,1),
 (2,2,2);

insert into zaehlung (id,kultur_id,datum,anzahl_pflanzen,anz_mutter_pflanzen,anzahl_auspflanzbereit)
values
 (1,1,'2018-10-01',10,4,4),
 (2,2,'2017-08-03',20,6,10);

insert into lieferung (id,art_id,person_id,datum,von_sammlung_id,nach_kultur_id)
values
 (1,1,1,'2018-05-04',1,1),
 (2,1,2,'2018-07-06',2,2);
 