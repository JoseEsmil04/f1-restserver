-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "drivers" VARCHAR NOT NULL,
    "champions" INTEGER NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);
