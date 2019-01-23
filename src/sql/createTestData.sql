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

insert into zaehleinheit_werte (id,wert)
values
 (1, 'Pflanzen'),
 (2, 'Zwiebeln');

insert into masseinheit_werte (id,wert)
values
 (1, 'Gramm'),
 (2, 'Anzahl');

insert into sammlung (id,art_id,person_id,herkunft_id,nr,datum)
values
 (1,1,1,1,'1a','2018-09-01'),
 (2,2,2,2,'3b','2018-07-05');

insert into garten (id,person_id)
values
 (1,1),
 (2,2);
 
insert into kultur (id,garten_id)
values
 (1,1),
 (2,2);
 
insert into sammlung_in_kultur (sammlung_id,kultur_id)
values
 (1,1),
 (2,2);

insert into kultur_event (id,kultur_id,datum,event)
values
 (1,1,'2018-10-01','umgepflanzt'),
 (2,2,'2017-08-03','Unkraut entfernt');

insert into kultur_inventar (id,kultur_id,datum,kasten,beet,nr,anzahl_pflanzen,anz_mutter_pflanzen,anz_nicht_auspflanzbereit,anz_auspflanzbereit)
values
 (1,1,'2018-10-01','1','3','5',10,4,6,4),
 (2,2,'2017-08-03','2','1','3',20,6,10,10);

insert into zaehlung (id,kultur_id,datum,anzahl_pflanzen,anz_mutter_pflanzen,anz_nicht_auspflanzbereit,anz_auspflanzbereit)
values
 (1,1,'2018-10-01',10,4,6,4),
 (2,2,'2017-08-03',20,6,10,10);

insert into bewegung_typ_werte (id,wert)
values
 (1, 'Lieferung'),
 (2, 'Bestellung');

insert into bewegung_status_werte (id,wert)
values
 (1, 'ausgeführt'),
 (2, 'geplant');

insert into bewegung_zwischenlager_werte (id,wert)
values
 (1, 'GAW'),
 (2, 'Winzeler');

insert into bewegung (id,typ,zaehleinheit,menge,masseinheit,von_datum,von_herkunft_id,nach_datum,nach_kultur_id,status)
values
 (1,1,1,25,1,'2018-05-04',1,'2018-05-05',1,1),
 (2,2,2,33,2,'2018-07-06',2,'2018-07-06',2,2);
 