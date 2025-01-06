-- TODO: seems that shema ae does not yet exist
\c ae
-- grant select on table ae.v_vermehrung_arten to fdw_user;
-- grant select on table ae.v_apflora_lr_delarze to fdw_user;
-- grant select on table ae.v_apflora_taxonomies to fdw_user;
ALTER DATABASE ae SET "app.jwt_secret" TO '${JWT_SECRET}';

