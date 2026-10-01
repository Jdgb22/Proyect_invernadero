--
-- PostgreSQL database dump
--

\restrict 5fbWhzFjA05zVFExqpwLyLka7r16kJchDx40MmJzp4GGcIEP0zCpq1Sfb6LIr7l

-- Dumped from database version 17.7
-- Dumped by pg_dump version 17.7

-- Started on 2026-10-01 13:04:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 862 (class 1247 OID 25187)
-- Name: tipo_medicion_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipo_medicion_enum AS ENUM (
    'crecimiento',
    'ph',
    'productividad',
    'temperatura_atmosferica',
    'temperatura_suelo',
    'humedad'
);


ALTER TYPE public.tipo_medicion_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 25200)
-- Name: mediciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mediciones (
    id bigint NOT NULL,
    planta_id integer NOT NULL,
    tipo public.tipo_medicion_enum NOT NULL,
    valor numeric(10,2) NOT NULL,
    subtipo character varying(50),
    fecha_medida timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    usuario_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.mediciones OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 25199)
-- Name: mediciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mediciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mediciones_id_seq OWNER TO postgres;

--
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 223
-- Name: mediciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mediciones_id_seq OWNED BY public.mediciones.id;


--
-- TOC entry 218 (class 1259 OID 24995)
-- Name: plantas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plantas (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    especie character varying(100),
    ubicacion character varying(50),
    estado character varying(20) DEFAULT 'activa'::character varying
);


ALTER TABLE public.plantas OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24994)
-- Name: plantas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plantas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plantas_id_seq OWNER TO postgres;

--
-- TOC entry 4945 (class 0 OID 0)
-- Dependencies: 217
-- Name: plantas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plantas_id_seq OWNED BY public.plantas.id;


--
-- TOC entry 220 (class 1259 OID 25021)
-- Name: relaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.relaciones (
    id integer NOT NULL,
    tipo_relacion character varying(50) NOT NULL,
    plantida_id integer,
    tipo_medida1 character varying(50),
    valor1 numeric(10,2),
    tipo_medida2 character varying(50),
    valor2 numeric(10,2),
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.relaciones OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25020)
-- Name: relaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.relaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.relaciones_id_seq OWNER TO postgres;

--
-- TOC entry 4946 (class 0 OID 0)
-- Dependencies: 219
-- Name: relaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.relaciones_id_seq OWNED BY public.relaciones.id;


--
-- TOC entry 222 (class 1259 OID 25166)
-- Name: responsable_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.responsable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.responsable_id_seq OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 25159)
-- Name: responsable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.responsable (
    id integer DEFAULT nextval('public.responsable_id_seq'::regclass) NOT NULL,
    nombre character varying(100) NOT NULL,
    cargo character varying(50),
    activo boolean DEFAULT true,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.responsable OWNER TO postgres;

--
-- TOC entry 4767 (class 2604 OID 25203)
-- Name: mediciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mediciones ALTER COLUMN id SET DEFAULT nextval('public.mediciones_id_seq'::regclass);


--
-- TOC entry 4760 (class 2604 OID 24998)
-- Name: plantas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plantas ALTER COLUMN id SET DEFAULT nextval('public.plantas_id_seq'::regclass);


--
-- TOC entry 4762 (class 2604 OID 25024)
-- Name: relaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relaciones ALTER COLUMN id SET DEFAULT nextval('public.relaciones_id_seq'::regclass);


--
-- TOC entry 4937 (class 0 OID 25200)
-- Dependencies: 224
-- Data for Name: mediciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mediciones (id, planta_id, tipo, valor, subtipo, fecha_medida, usuario_id, created_at) FROM stdin;
1	1	crecimiento	15.20	\N	2026-09-04 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
2	2	crecimiento	18.70	\N	2026-09-03 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
3	3	crecimiento	14.90	\N	2026-09-02 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
4	4	crecimiento	16.50	\N	2026-09-04 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
5	1	ph	6.45	\N	2026-09-04 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
6	2	ph	6.52	\N	2026-09-03 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
7	3	ph	6.38	\N	2026-09-02 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
8	4	ph	6.55	\N	2026-09-04 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
9	1	productividad	2.40	\N	2026-09-04 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
10	2	productividad	2.80	\N	2026-09-03 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
11	3	productividad	2.10	\N	2026-09-02 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
12	4	productividad	3.00	\N	2026-09-04 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
13	1	temperatura_atmosferica	28.50	entrada	2026-09-04 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
14	1	temperatura_atmosferica	25.20	salida	2026-09-04 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
15	2	temperatura_atmosferica	29.20	entrada	2026-09-03 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
16	2	temperatura_atmosferica	26.10	salida	2026-09-03 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
17	1	temperatura_suelo	22.50	\N	2026-09-04 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
18	2	temperatura_suelo	23.10	\N	2026-09-03 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
19	3	temperatura_suelo	21.80	\N	2026-09-02 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
20	4	temperatura_suelo	24.00	\N	2026-09-04 17:43:14.557869-05	1	2026-10-01 12:32:50.801617-05
21	1	humedad	68.50	\N	2026-09-04 17:43:14.557869-05	1	2026-10-01 12:58:22.406336-05
22	2	humedad	72.30	\N	2026-09-03 17:43:14.557869-05	1	2026-10-01 12:58:22.406336-05
23	3	humedad	65.80	\N	2026-09-02 17:43:14.557869-05	1	2026-10-01 12:58:22.406336-05
24	4	humedad	70.10	\N	2026-09-04 17:43:14.557869-05	1	2026-10-01 12:58:22.406336-05
\.


--
-- TOC entry 4931 (class 0 OID 24995)
-- Dependencies: 218
-- Data for Name: plantas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plantas (id, nombre, especie, ubicacion, estado) FROM stdin;
1	Gulupa 1	Solanum gula*,	Zona A	activa
2	Gulupa 2	Solanum gula*,	Zona B	activa
3	Gulupa 3	Solanum gula*,	Zona C	activa
4	Gulupa 4	Solanum gula*,	Zona D	activa
\.


--
-- TOC entry 4933 (class 0 OID 25021)
-- Dependencies: 220
-- Data for Name: relaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.relaciones (id, tipo_relacion, plantida_id, tipo_medida1, valor1, tipo_medida2, valor2, fecha_registro) FROM stdin;
1	temperatura_atmosferica_temperatura_suelo	1	temperatura_atmosferica_entrada	28.50	temperatura_suelo	22.50	2026-09-04 17:24:45.947823
2	temperatura_atmosferica_temperatura_suelo	2	temperatura_atmosferica_entrada	29.20	temperatura_suelo	23.10	2026-09-03 17:24:45.947823
3	temperatura_atmosferica_temperatura_suelo	3	temperatura_atmosferica_entrada	27.80	temperatura_suelo	21.80	2026-09-02 17:24:45.947823
4	temperatura_atmosferica_temperatura_suelo	4	temperatura_atmosferica_entrada	30.10	temperatura_suelo	24.00	2026-09-04 17:24:45.947823
\.


--
-- TOC entry 4934 (class 0 OID 25159)
-- Dependencies: 221
-- Data for Name: responsable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.responsable (id, nombre, cargo, activo, fecha_registro) FROM stdin;
1	Administrador	Supervisor Técnico	t	2026-09-17 09:58:11.767383
2	Juan Perez	Técnico Agrónomo	t	2026-09-17 09:58:11.767383
3	Maria Gomez	Supervisora de Riego	t	2026-09-17 09:58:11.767383
4	Luis Torres	Auxiliar de Campo	t	2026-09-17 09:58:11.767383
\.


--
-- TOC entry 4947 (class 0 OID 0)
-- Dependencies: 223
-- Name: mediciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mediciones_id_seq', 24, true);


--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 217
-- Name: plantas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plantas_id_seq', 4, true);


--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 219
-- Name: relaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.relaciones_id_seq', 4, true);


--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 222
-- Name: responsable_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.responsable_id_seq', 4, true);


--
-- TOC entry 4781 (class 2606 OID 25207)
-- Name: mediciones mediciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mediciones
    ADD CONSTRAINT mediciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4771 (class 2606 OID 25001)
-- Name: plantas plantas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plantas
    ADD CONSTRAINT plantas_pkey PRIMARY KEY (id);


--
-- TOC entry 4773 (class 2606 OID 25027)
-- Name: relaciones relaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relaciones
    ADD CONSTRAINT relaciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4775 (class 2606 OID 25165)
-- Name: responsable responsable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.responsable
    ADD CONSTRAINT responsable_pkey PRIMARY KEY (id);


--
-- TOC entry 4776 (class 1259 OID 25218)
-- Name: idx_mediciones_planta_fecha; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_mediciones_planta_fecha ON public.mediciones USING btree (planta_id, fecha_medida DESC);


--
-- TOC entry 4777 (class 1259 OID 25220)
-- Name: idx_mediciones_planta_tipo_fecha; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_mediciones_planta_tipo_fecha ON public.mediciones USING btree (planta_id, tipo, fecha_medida DESC);


--
-- TOC entry 4778 (class 1259 OID 25219)
-- Name: idx_mediciones_tipo_fecha; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_mediciones_tipo_fecha ON public.mediciones USING btree (tipo, fecha_medida DESC);


--
-- TOC entry 4779 (class 1259 OID 25221)
-- Name: idx_mediciones_usuario_fecha; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_mediciones_usuario_fecha ON public.mediciones USING btree (usuario_id, fecha_medida DESC);


--
-- TOC entry 4783 (class 2606 OID 25208)
-- Name: mediciones mediciones_planta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mediciones
    ADD CONSTRAINT mediciones_planta_id_fkey FOREIGN KEY (planta_id) REFERENCES public.plantas(id) ON DELETE CASCADE;


--
-- TOC entry 4784 (class 2606 OID 25213)
-- Name: mediciones mediciones_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mediciones
    ADD CONSTRAINT mediciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.responsable(id) ON DELETE SET NULL;


--
-- TOC entry 4782 (class 2606 OID 25028)
-- Name: relaciones relaciones_plantida_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relaciones
    ADD CONSTRAINT relaciones_plantida_id_fkey FOREIGN KEY (plantida_id) REFERENCES public.plantas(id) ON DELETE CASCADE;


-- Completed on 2026-10-01 13:04:36

--
-- PostgreSQL database dump complete
--

\unrestrict 5fbWhzFjA05zVFExqpwLyLka7r16kJchDx40MmJzp4GGcIEP0zCpq1Sfb6LIr7l

