--
-- PostgreSQL database dump
--

\restrict hd8jDgiYeGRyQtbauGjQkDN638KSMIfPQiK4bbXpEL2oWVrKGaRB4gV958iSpJP

-- Dumped from database version 17.7
-- Dumped by pg_dump version 18.6

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: crecimiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.crecimiento (
    id integer NOT NULL,
    planta_id integer,
    valor numeric(5,2),
    fecha_medida timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    usuario_id integer
);


ALTER TABLE public.crecimiento OWNER TO postgres;

--
-- Name: crecimiento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.crecimiento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.crecimiento_id_seq OWNER TO postgres;

--
-- Name: crecimiento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.crecimiento_id_seq OWNED BY public.crecimiento.id;


--
-- Name: irradianza; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.irradianza (
    id integer NOT NULL,
    planta_id integer,
    valor numeric(7,2),
    fecha_medida timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    usuario_id integer
);


ALTER TABLE public.irradianza OWNER TO postgres;

--
-- Name: irradianza_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.irradianza_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.irradianza_id_seq OWNER TO postgres;

--
-- Name: irradianza_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.irradianza_id_seq OWNED BY public.irradianza.id;


--
-- Name: ph; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ph (
    id integer NOT NULL,
    planta_id integer,
    valor numeric(5,2),
    fecha_medida timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    usuario_id integer
);


ALTER TABLE public.ph OWNER TO postgres;

--
-- Name: ph_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ph_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ph_id_seq OWNER TO postgres;

--
-- Name: ph_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ph_id_seq OWNED BY public.ph.id;


--
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
-- Name: plantas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plantas_id_seq OWNED BY public.plantas.id;


--
-- Name: productividad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productividad (
    id integer NOT NULL,
    planta_id integer,
    valor numeric(5,2),
    fecha_medida timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    usuario_id integer
);


ALTER TABLE public.productividad OWNER TO postgres;

--
-- Name: productividad_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productividad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productividad_id_seq OWNER TO postgres;

--
-- Name: productividad_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productividad_id_seq OWNED BY public.productividad.id;


--
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
-- Name: relaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.relaciones_id_seq OWNED BY public.relaciones.id;


--
-- Name: sanidad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sanidad (
    id integer NOT NULL,
    planta_id integer,
    valor numeric(5,2),
    fecha_medida timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    usuario_id integer
);


ALTER TABLE public.sanidad OWNER TO postgres;

--
-- Name: sanidad_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sanidad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sanidad_id_seq OWNER TO postgres;

--
-- Name: sanidad_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sanidad_id_seq OWNED BY public.sanidad.id;


--
-- Name: temperatura_atmosferica; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.temperatura_atmosferica (
    id integer NOT NULL,
    planta_id integer,
    tipo character varying(20),
    valor numeric(5,2),
    fecha_medida timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    usuario_id integer
);


ALTER TABLE public.temperatura_atmosferica OWNER TO postgres;

--
-- Name: temperatura_atmosferica_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.temperatura_atmosferica_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.temperatura_atmosferica_id_seq OWNER TO postgres;

--
-- Name: temperatura_atmosferica_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.temperatura_atmosferica_id_seq OWNED BY public.temperatura_atmosferica.id;


--
-- Name: temperatura_suelo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.temperatura_suelo (
    id integer NOT NULL,
    planta_id integer,
    valor numeric(5,2),
    fecha_medida timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    usuario_id integer
);


ALTER TABLE public.temperatura_suelo OWNER TO postgres;

--
-- Name: temperatura_suelo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.temperatura_suelo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.temperatura_suelo_id_seq OWNER TO postgres;

--
-- Name: temperatura_suelo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.temperatura_suelo_id_seq OWNED BY public.temperatura_suelo.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(150),
    rol character varying(50) DEFAULT 'usuario'::character varying,
    activo boolean DEFAULT true
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: crecimiento id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crecimiento ALTER COLUMN id SET DEFAULT nextval('public.crecimiento_id_seq'::regclass);


--
-- Name: irradianza id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.irradianza ALTER COLUMN id SET DEFAULT nextval('public.irradianza_id_seq'::regclass);


--
-- Name: ph id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ph ALTER COLUMN id SET DEFAULT nextval('public.ph_id_seq'::regclass);


--
-- Name: plantas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plantas ALTER COLUMN id SET DEFAULT nextval('public.plantas_id_seq'::regclass);


--
-- Name: productividad id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productividad ALTER COLUMN id SET DEFAULT nextval('public.productividad_id_seq'::regclass);


--
-- Name: relaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relaciones ALTER COLUMN id SET DEFAULT nextval('public.relaciones_id_seq'::regclass);


--
-- Name: sanidad id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sanidad ALTER COLUMN id SET DEFAULT nextval('public.sanidad_id_seq'::regclass);


--
-- Name: temperatura_atmosferica id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperatura_atmosferica ALTER COLUMN id SET DEFAULT nextval('public.temperatura_atmosferica_id_seq'::regclass);


--
-- Name: temperatura_suelo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperatura_suelo ALTER COLUMN id SET DEFAULT nextval('public.temperatura_suelo_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: crecimiento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.crecimiento (id, planta_id, valor, fecha_medida, usuario_id) FROM stdin;
1	1	15.20	2026-09-04 17:43:14.557869	1
2	2	18.70	2026-09-03 17:43:14.557869	1
3	3	14.90	2026-09-02 17:43:14.557869	1
4	4	16.50	2026-09-04 17:43:14.557869	1
\.


--
-- Data for Name: irradianza; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.irradianza (id, planta_id, valor, fecha_medida, usuario_id) FROM stdin;
1	1	850.50	2026-09-04 17:43:14.557869	1
2	2	920.30	2026-09-03 17:43:14.557869	1
3	3	780.20	2026-09-02 17:43:14.557869	1
4	4	950.00	2026-09-04 17:43:14.557869	1
\.


--
-- Data for Name: ph; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ph (id, planta_id, valor, fecha_medida, usuario_id) FROM stdin;
1	1	6.45	2026-09-04 17:43:14.557869	1
2	2	6.52	2026-09-03 17:43:14.557869	1
3	3	6.38	2026-09-02 17:43:14.557869	1
4	4	6.55	2026-09-04 17:43:14.557869	1
\.


--
-- Data for Name: plantas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plantas (id, nombre, especie, ubicacion, estado) FROM stdin;
1	Gulupa 1	Solanum gula*,	Zona A	activa
2	Gulupa 2	Solanum gula*,	Zona B	activa
3	Gulupa 3	Solanum gula*,	Zona C	activa
4	Gulupa 4	Solanum gula*,	Zona D	activa
\.


--
-- Data for Name: productividad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productividad (id, planta_id, valor, fecha_medida, usuario_id) FROM stdin;
1	1	2.40	2026-09-04 17:43:14.557869	1
2	2	2.80	2026-09-03 17:43:14.557869	1
3	3	2.10	2026-09-02 17:43:14.557869	1
4	4	3.00	2026-09-04 17:43:14.557869	1
\.


--
-- Data for Name: relaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.relaciones (id, tipo_relacion, plantida_id, tipo_medida1, valor1, tipo_medida2, valor2, fecha_registro) FROM stdin;
1	temperatura_atmosferica_temperatura_suelo	1	temperatura_atmosferica_entrada	28.50	temperatura_suelo	22.50	2026-09-04 17:24:45.947823
2	temperatura_atmosferica_temperatura_suelo	2	temperatura_atmosferica_entrada	29.20	temperatura_suelo	23.10	2026-09-03 17:24:45.947823
3	temperatura_atmosferica_temperatura_suelo	3	temperatura_atmosferica_entrada	27.80	temperatura_suelo	21.80	2026-09-02 17:24:45.947823
4	temperatura_atmosferica_temperatura_suelo	4	temperatura_atmosferica_entrada	30.10	temperatura_suelo	24.00	2026-09-04 17:24:45.947823
\.


--
-- Data for Name: sanidad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sanidad (id, planta_id, valor, fecha_medida, usuario_id) FROM stdin;
1	1	95.50	2026-09-04 17:43:14.557869	1
2	2	92.00	2026-09-03 17:43:14.557869	1
3	3	88.30	2026-09-02 17:43:14.557869	1
4	4	91.70	2026-09-04 17:43:14.557869	1
\.


--
-- Data for Name: temperatura_atmosferica; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.temperatura_atmosferica (id, planta_id, tipo, valor, fecha_medida, usuario_id) FROM stdin;
1	1	entrada	28.50	2026-09-04 17:43:14.557869	1
2	1	salida	25.20	2026-09-04 17:43:14.557869	1
3	2	entrada	29.20	2026-09-03 17:43:14.557869	1
4	2	salida	26.10	2026-09-03 17:43:14.557869	1
\.


--
-- Data for Name: temperatura_suelo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.temperatura_suelo (id, planta_id, valor, fecha_medida, usuario_id) FROM stdin;
1	1	22.50	2026-09-04 17:43:14.557869	1
2	2	23.10	2026-09-03 17:43:14.557869	1
3	3	21.80	2026-09-02 17:43:14.557869	1
4	4	24.00	2026-09-04 17:43:14.557869	1
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, email, rol, activo) FROM stdin;
1	Administrador	admin@invernadero.com	admin	t
2	Juan PÃ©rez	juan.perez@invernadero.com	agricultor	t
3	MarÃ­a GÃ³mez	maria.gomez@invernadero.com	tÃ©cnico	t
4	Luis Torres	luis.torres@invernadero.com	tÃ©cnico	t
\.


--
-- Name: crecimiento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.crecimiento_id_seq', 4, true);


--
-- Name: irradianza_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.irradianza_id_seq', 4, true);


--
-- Name: ph_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ph_id_seq', 4, true);


--
-- Name: plantas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plantas_id_seq', 4, true);


--
-- Name: productividad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productividad_id_seq', 4, true);


--
-- Name: relaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.relaciones_id_seq', 4, true);


--
-- Name: sanidad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sanidad_id_seq', 4, true);


--
-- Name: temperatura_atmosferica_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.temperatura_atmosferica_id_seq', 4, true);


--
-- Name: temperatura_suelo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.temperatura_suelo_id_seq', 4, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 4, true);


--
-- Name: crecimiento crecimiento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crecimiento
    ADD CONSTRAINT crecimiento_pkey PRIMARY KEY (id);


--
-- Name: irradianza irradianza_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.irradianza
    ADD CONSTRAINT irradianza_pkey PRIMARY KEY (id);


--
-- Name: ph ph_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ph
    ADD CONSTRAINT ph_pkey PRIMARY KEY (id);


--
-- Name: plantas plantas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plantas
    ADD CONSTRAINT plantas_pkey PRIMARY KEY (id);


--
-- Name: productividad productividad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productividad
    ADD CONSTRAINT productividad_pkey PRIMARY KEY (id);


--
-- Name: relaciones relaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relaciones
    ADD CONSTRAINT relaciones_pkey PRIMARY KEY (id);


--
-- Name: sanidad sanidad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sanidad
    ADD CONSTRAINT sanidad_pkey PRIMARY KEY (id);


--
-- Name: temperatura_atmosferica temperatura_atmosferica_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperatura_atmosferica
    ADD CONSTRAINT temperatura_atmosferica_pkey PRIMARY KEY (id);


--
-- Name: temperatura_suelo temperatura_suelo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperatura_suelo
    ADD CONSTRAINT temperatura_suelo_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: crecimiento crecimiento_planta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crecimiento
    ADD CONSTRAINT crecimiento_planta_id_fkey FOREIGN KEY (planta_id) REFERENCES public.plantas(id);


--
-- Name: crecimiento crecimiento_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crecimiento
    ADD CONSTRAINT crecimiento_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: irradianza irradianza_planta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.irradianza
    ADD CONSTRAINT irradianza_planta_id_fkey FOREIGN KEY (planta_id) REFERENCES public.plantas(id);


--
-- Name: irradianza irradianza_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.irradianza
    ADD CONSTRAINT irradianza_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: ph ph_planta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ph
    ADD CONSTRAINT ph_planta_id_fkey FOREIGN KEY (planta_id) REFERENCES public.plantas(id);


--
-- Name: ph ph_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ph
    ADD CONSTRAINT ph_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: productividad productividad_planta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productividad
    ADD CONSTRAINT productividad_planta_id_fkey FOREIGN KEY (planta_id) REFERENCES public.plantas(id);


--
-- Name: productividad productividad_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productividad
    ADD CONSTRAINT productividad_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: relaciones relaciones_plantida_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relaciones
    ADD CONSTRAINT relaciones_plantida_id_fkey FOREIGN KEY (plantida_id) REFERENCES public.plantas(id) ON DELETE CASCADE;


--
-- Name: sanidad sanidad_planta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sanidad
    ADD CONSTRAINT sanidad_planta_id_fkey FOREIGN KEY (planta_id) REFERENCES public.plantas(id);


--
-- Name: sanidad sanidad_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sanidad
    ADD CONSTRAINT sanidad_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: temperatura_atmosferica temperatura_atmosferica_planta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperatura_atmosferica
    ADD CONSTRAINT temperatura_atmosferica_planta_id_fkey FOREIGN KEY (planta_id) REFERENCES public.plantas(id);


--
-- Name: temperatura_atmosferica temperatura_atmosferica_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperatura_atmosferica
    ADD CONSTRAINT temperatura_atmosferica_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: temperatura_suelo temperatura_suelo_planta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperatura_suelo
    ADD CONSTRAINT temperatura_suelo_planta_id_fkey FOREIGN KEY (planta_id) REFERENCES public.plantas(id);


--
-- Name: temperatura_suelo temperatura_suelo_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperatura_suelo
    ADD CONSTRAINT temperatura_suelo_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- PostgreSQL database dump complete
--

\unrestrict hd8jDgiYeGRyQtbauGjQkDN638KSMIfPQiK4bbXpEL2oWVrKGaRB4gV958iSpJP

