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
-- Name: Order; Type: TABLE; Schema: public; Owner: ecommerce_user
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    total double precision NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Order" OWNER TO ecommerce_user;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: ecommerce_user
--

CREATE TABLE public."OrderItem" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "productId" integer NOT NULL,
    quantity integer NOT NULL,
    price double precision NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO ecommerce_user;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE; Schema: public; Owner: ecommerce_user
--

CREATE SEQUENCE public."OrderItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."OrderItem_id_seq" OWNER TO ecommerce_user;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ecommerce_user
--

ALTER SEQUENCE public."OrderItem_id_seq" OWNED BY public."OrderItem".id;


--
-- Name: Order_id_seq; Type: SEQUENCE; Schema: public; Owner: ecommerce_user
--

CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Order_id_seq" OWNER TO ecommerce_user;

--
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ecommerce_user
--

ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: ecommerce_user
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price double precision NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
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
-- Name: Cart id; Type: DEFAULT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."Cart" ALTER COLUMN id SET DEFAULT nextval('public."Cart_id_seq"'::regclass);


--
-- Name: Order id; Type: DEFAULT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);


--
-- Name: OrderItem id; Type: DEFAULT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."OrderItem" ALTER COLUMN id SET DEFAULT nextval('public."OrderItem_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Data for Name: Cart; Type: TABLE DATA; Schema: public; Owner: ecommerce_user
--

COPY public."Cart" (id, quantity, "productId", "userId") FROM stdin;
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: ecommerce_user
--

COPY public."Order" (id, "userId", total, "createdAt") FROM stdin;
1	1	30	2024-11-28 23:17:01.786
2	1	60	2024-11-28 23:17:06.151
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: ecommerce_user
--

COPY public."OrderItem" (id, "orderId", "productId", quantity, price) FROM stdin;
1	1	1	1	10
2	1	2	1	20
3	2	1	1	10
4	2	3	1	30
5	2	2	1	20
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: ecommerce_user
--

COPY public."Product" (id, name, description, price, "createdAt", "updatedAt") FROM stdin;
1	Product 1	Description of Product 1	10	2024-11-28 23:14:21.113728	2024-11-28 23:14:21.113728
2	Product 2	Description of Product 2	20	2024-11-28 23:14:21.113728	2024-11-28 23:14:21.113728
3	Product 3	Description of Product 3	30	2024-11-28 23:14:21.113728	2024-11-28 23:14:21.113728
\.


--
-- Name: Cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ecommerce_user
--

SELECT pg_catalog.setval('public."Cart_id_seq"', 5, true);


--
-- Name: OrderItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ecommerce_user
--

SELECT pg_catalog.setval('public."OrderItem_id_seq"', 5, true);


--
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ecommerce_user
--

SELECT pg_catalog.setval('public."Order_id_seq"', 2, true);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ecommerce_user
--

SELECT pg_catalog.setval('public."Product_id_seq"', 3, true);


--
-- Name: Cart Cart_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: Cart uq_user_product; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT uq_user_product UNIQUE ("userId", "productId");


--
-- Name: OrderItem fk_order; Type: FK CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT fk_order FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON DELETE CASCADE;


--
-- Name: Cart fk_product; Type: FK CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT fk_product FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON DELETE CASCADE;


--
-- Name: OrderItem fk_product_order; Type: FK CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT fk_product_order FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

