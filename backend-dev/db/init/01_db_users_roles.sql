CREATE DATABASE vermehrung WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';

\c vermehrung
-- no roles?
CREATE USER fdw_user WITH encrypted PASSWORD 'secret';

