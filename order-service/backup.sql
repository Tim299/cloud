--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10 (Debian 15.10-1.pgdg120+1)
-- Dumped by pg_dump version 15.10 (Debian 15.10-1.pgdg120+1)

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: ecommerce_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO ecommerce_user;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: ecommerce_user
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Cart; Type: TABLE; Schema: public; Owner: ecommerce_user
--

CREATE TABLE public."Cart" (
    id integer NOT NULL,
    quantity integer NOT NULL,
    "productId" integer NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."Cart" OWNER TO ecommerce_user;

--
-- Name: Cart_id_seq; Type: SEQUENCE; Schema: public; Owner: ecommerce_user
--

CREATE SEQUENCE public."Cart_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cart_id_seq" OWNER TO ecommerce_user;

--
-- Name: Cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ecommerce_user
--

ALTER SEQUENCE public."Cart_id_seq" OWNED BY public."Cart".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: ecommerce_user
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    price double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Product" OWNER TO ecommerce_user;

--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: ecommerce_user
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Product_id_seq" OWNER TO ecommerce_user;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ecommerce_user
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: ecommerce_user
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO ecommerce_user;

--
-- Name: Cart id; Type: DEFAULT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."Cart" ALTER COLUMN id SET DEFAULT nextval('public."Cart_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Data for Name: Cart; Type: TABLE DATA; Schema: public; Owner: ecommerce_user
--

COPY public."Cart" (id, quantity, "productId", "userId") FROM stdin;
8	1	3	1
6	2	2	1
7	2	1	1
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: ecommerce_user
--

COPY public."Product" (id, name, description, price, "createdAt", "updatedAt") FROM stdin;
1	Volvo	Volvo offers premium, safety-focused vehicles with Scandinavian design and innovative hybrid and electric options	600000	2024-11-25 15:52:10.287	2024-11-25 15:39:21.15
2	BMW	BMW delivers high-performance, luxury cars and SUVs that blend cutting-edge technology with dynamic driving experiences	700000	2024-11-25 15:52:10.287	2024-11-25 15:50:51.671
3	Audi	Audi combines sleek design, advanced technology, and sporty performance in its luxury vehicles and electric offerings.	900000	2024-11-25 15:52:10.287	2024-11-25 15:51:19.552
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: ecommerce_user
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e244fe57-b347-4281-a2c0-493b83dbd496	9321fa3ad63cfff209b671df4304887edd325971313f48d9311864520d98dbb5	2024-11-28 11:19:35.717052+00	20241128111935_init	\N	\N	2024-11-28 11:19:35.701007+00	1
bb33fc82-70a3-409d-af3c-d314a0bf99d2	e07d8f4944ae9918c5ac8da35189216fa1efdbf4e6cec8ce068b158561a82d2b	2024-11-25 15:38:33.554651+00	20241125153833_init	\N	\N	2024-11-25 15:38:33.539169+00	1
\.


--
-- Name: Cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ecommerce_user
--

SELECT pg_catalog.setval('public."Cart_id_seq"', 8, true);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ecommerce_user
--

SELECT pg_catalog.setval('public."Product_id_seq"', 1, false);


--
-- Name: Cart Cart_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Cart_productId_key; Type: INDEX; Schema: public; Owner: ecommerce_user
--

CREATE UNIQUE INDEX "Cart_productId_key" ON public."Cart" USING btree ("productId");


--
-- Name: Cart_userId_productId_key; Type: INDEX; Schema: public; Owner: ecommerce_user
--

CREATE UNIQUE INDEX "Cart_userId_productId_key" ON public."Cart" USING btree ("userId", "productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: ecommerce_user
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

