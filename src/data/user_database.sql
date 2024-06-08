SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE public.users (
	"_id" serial NOT NULL,
    "email" varchar NOT NULL,
    "password" varchar,
	"firstname" varchar NOT NULL,
	"lastname" varchar NOT NULL,
	"cache_id" bigint,
	"configuration_id" bigint,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE  public.films (
	"_id" serial NOT NULL,
	"title" varchar NOT NULL,
	"episode_id" integer NOT NULL,
	"opening_crawl" varchar NOT NULL,
	"director" varchar NOT NULL,
	"producer" varchar NOT NULL,
	"release_date" DATE NOT NULL,
	CONSTRAINT "films_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE  public.people_in_films (
	"_id" serial NOT NULL,
	"person_id" bigint NOT NULL,
	"film_id" bigint NOT NULL,
	CONSTRAINT "people_in_films_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);
