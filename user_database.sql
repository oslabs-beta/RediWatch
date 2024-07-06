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
    "password" varchar, NOT NULL,
	"firstname" varchar NOT NULL,
	"lastname" varchar NOT NULL,
	"cache_id" bigint,
	"config_id" bigint,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE  public.caches (
	"_id" serial NOT NULL,
	"connectionstring" varchar NOT NULL,
	"connectionnickname" varchar NOT NULL,
	"user_id" bigint,
	"config_id" bigint,
	CONSTRAINT "caches_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE  public.configurations (
	"_id" serial NOT NULL,
    
	CONSTRAINT "configurations_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE public.users ADD CONSTRAINT "users_fk0" FOREIGN KEY ("cache_id") REFERENCES  public.caches("_id");
ALTER TABLE public.users ADD CONSTRAINT "users_fk1" FOREIGN KEY ("config_id") REFERENCES  public.configurations("_id");

ALTER TABLE public.caches ADD CONSTRAINT "caches_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.caches ADD CONSTRAINT "caches_fk1" FOREIGN KEY ("config_id") REFERENCES public.configurations("_id");