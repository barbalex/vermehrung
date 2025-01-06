-- TODO: seems that shema vermehrung does not yet exist
\c vermehrung
-- grant select on table vermehrung.v_vermehrung_arten to fdw_user;
-- grant select on table vermehrung.v_apflora_lr_delarze to fdw_user;
-- grant select on table vermehrung.v_apflora_taxonomies to fdw_user;
ALTER DATABASE vermehrung SET "app.jwt_secret" TO '${JWT_SECRET}';

