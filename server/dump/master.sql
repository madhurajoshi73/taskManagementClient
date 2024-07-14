CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE public.usertable( 
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text,
    email text,
    password text,
    role text
  );
CREATE TABLE public.task(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text,
    description text,
    userId UUID NOT NULL REFERENCES public.usertable(id) ON DELETE cascade,
    created_time timestamp with time zone default now(),
    status text ,
    priority text
  );
