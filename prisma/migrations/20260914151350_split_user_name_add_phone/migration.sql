-- Sustituye el campo unico "fullName" por "firstName" + "lastName", y anade
-- "phone" (opcional). Los datos existentes se rellenan partiendo fullName
-- por el primer espacio: la primera palabra pasa a firstName, el resto a
-- lastName (puede quedar vacio si el nombre no tenia apellido).

ALTER TABLE "User" ADD COLUMN "firstName" TEXT;
ALTER TABLE "User" ADD COLUMN "lastName" TEXT;
ALTER TABLE "User" ADD COLUMN "phone" TEXT;

UPDATE "User" SET
  "firstName" = split_part("fullName", ' ', 1),
  "lastName" = trim(substring("fullName" from length(split_part("fullName", ' ', 1)) + 1));

ALTER TABLE "User" ALTER COLUMN "firstName" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "lastName" SET NOT NULL;

ALTER TABLE "User" DROP COLUMN "fullName";
