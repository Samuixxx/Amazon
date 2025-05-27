--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

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
-- Name: topology; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA topology;


ALTER SCHEMA topology OWNER TO postgres;

--
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    CONSTRAINT cart_items_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO postgres;

--
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carts_id_seq OWNER TO postgres;

--
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    price_at_purchase numeric(10,2) NOT NULL
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    cart_id integer NOT NULL,
    total numeric(10,2) NOT NULL,
    status character varying(50) DEFAULT 'in_progress'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    order_id integer NOT NULL,
    method character varying(50) NOT NULL,
    status character varying(50) NOT NULL,
    transaction_id character varying(100),
    paid_at timestamp without time zone
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_id_seq OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: product_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_images (
    id integer NOT NULL,
    product_id integer NOT NULL,
    image_url text NOT NULL,
    is_primary boolean DEFAULT false
);


ALTER TABLE public.product_images OWNER TO postgres;

--
-- Name: product_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_images_id_seq OWNER TO postgres;

--
-- Name: product_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_images_id_seq OWNED BY public.product_images.id;


--
-- Name: product_models; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_models (
    id integer NOT NULL,
    product_id integer NOT NULL,
    model_url text NOT NULL,
    is_primary boolean DEFAULT false
);


ALTER TABLE public.product_models OWNER TO postgres;

--
-- Name: product_models_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_models_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_models_id_seq OWNER TO postgres;

--
-- Name: product_models_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_models_id_seq OWNED BY public.product_models.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    vendor character varying(255) NOT NULL,
    description jsonb NOT NULL,
    specifications jsonb NOT NULL,
    price numeric(10,2) NOT NULL,
    quantity integer NOT NULL,
    subcategory_id integer NOT NULL,
    CONSTRAINT products_quantity_check CHECK ((quantity >= 0))
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    text text NOT NULL,
    rating integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: shipments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shipments (
    id integer NOT NULL,
    order_id integer NOT NULL,
    address text NOT NULL,
    city character varying(100) NOT NULL,
    postal_code character varying(20) NOT NULL,
    country character varying(100) NOT NULL,
    carrier character varying(50),
    tracking_number character varying(100),
    status character varying(50) DEFAULT 'preparing'::character varying,
    shipped_at timestamp without time zone,
    delivered_at timestamp without time zone
);


ALTER TABLE public.shipments OWNER TO postgres;

--
-- Name: shipments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shipments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shipments_id_seq OWNER TO postgres;

--
-- Name: shipments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shipments_id_seq OWNED BY public.shipments.id;


--
-- Name: special_offers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.special_offers (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    discount_percent numeric(5,2),
    start_date date NOT NULL,
    end_date date NOT NULL,
    active boolean DEFAULT true,
    product_id integer,
    subcategory_id integer,
    CONSTRAINT special_offers_discount_percent_check CHECK (((discount_percent >= (0)::numeric) AND (discount_percent <= (100)::numeric)))
);


ALTER TABLE public.special_offers OWNER TO postgres;

--
-- Name: special_offers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.special_offers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.special_offers_id_seq OWNER TO postgres;

--
-- Name: special_offers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.special_offers_id_seq OWNED BY public.special_offers.id;


--
-- Name: subcategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subcategories (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.subcategories OWNER TO postgres;

--
-- Name: subcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subcategories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subcategories_id_seq OWNER TO postgres;

--
-- Name: subcategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subcategories_id_seq OWNED BY public.subcategories.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    telephone character varying(32) NOT NULL,
    password character varying(255) NOT NULL,
    country character varying(2) NOT NULL,
    address character varying(55) NOT NULL,
    city character varying(55) NOT NULL,
    postalcode character varying(10) NOT NULL,
    specifications text,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    termsaccepted boolean DEFAULT false,
    privacyaccepted boolean DEFAULT false,
    cookiesaccepted boolean DEFAULT false,
    marketingaccepted boolean DEFAULT false,
    subscribed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    google_id character varying(255),
    facebook_id character varying(255),
    microsoft_id character varying(255),
    is_completed boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: product_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images ALTER COLUMN id SET DEFAULT nextval('public.product_images_id_seq'::regclass);


--
-- Name: product_models id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_models ALTER COLUMN id SET DEFAULT nextval('public.product_models_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: shipments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipments ALTER COLUMN id SET DEFAULT nextval('public.shipments_id_seq'::regclass);


--
-- Name: special_offers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.special_offers ALTER COLUMN id SET DEFAULT nextval('public.special_offers_id_seq'::regclass);


--
-- Name: subcategories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategories ALTER COLUMN id SET DEFAULT nextval('public.subcategories_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, cart_id, product_id, quantity) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (id, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name) FROM stdin;
1	Daily Offers
2	Prime
3	Electronics
4	Books
5	Fashion
6	Home & Furniture
7	Toys & Games
8	Health & Beauty
9	Sports & Outdoors
10	Arts & Crafts
11	Jewelry & Watches
12	Tech & Innovations
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id, quantity, price_at_purchase) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, cart_id, total, status, created_at) FROM stdin;
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, order_id, method, status, transaction_id, paid_at) FROM stdin;
\.


--
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_images (id, product_id, image_url, is_primary) FROM stdin;
42	10	/uploads/products/images/images-1748094097973-574192809.jpg	f
43	10	/uploads/products/images/images-1748094097992-30875802.jpg	f
44	10	/uploads/products/images/images-1748094097994-210550741.jpg	f
45	10	/uploads/products/images/images-1748094098059-242856747.jpg	f
46	10	/uploads/products/images/images-1748094098061-182528156.jpg	f
47	10	/uploads/products/images/images-1748094098074-839469168.jpg	f
48	11	/uploads/products/images/images-1748095805596-231895392.jpg	f
49	11	/uploads/products/images/images-1748095805611-361681482.jpg	f
50	11	/uploads/products/images/images-1748095805621-544533482.jpg	f
51	11	/uploads/products/images/images-1748095805623-878661539.jpg	f
52	11	/uploads/products/images/images-1748095805633-991057704.jpg	f
53	11	/uploads/products/images/images-1748095805643-43060552.jpg	f
54	12	/uploads/products/images/images-1748096816792-922498926.jpg	f
55	12	/uploads/products/images/images-1748096816814-155821779.jpg	f
56	12	/uploads/products/images/images-1748096816845-942917374.jpg	f
57	12	/uploads/products/images/images-1748096816872-535349533.jpg	f
58	12	/uploads/products/images/images-1748096816878-552802796.jpg	f
59	12	/uploads/products/images/images-1748096816881-781804299.jpg	f
60	12	/uploads/products/images/images-1748096816899-919441305.jpg	f
61	13	/uploads/products/images/images-1748107978110-855889272.jpg	f
62	13	/uploads/products/images/images-1748107978152-670950513.jpg	f
63	13	/uploads/products/images/images-1748107978160-104670693.jpg	f
64	13	/uploads/products/images/images-1748107978183-612803481.jpg	f
65	13	/uploads/products/images/images-1748107978210-156683407.jpg	f
66	14	/uploads/products/images/images-1748110191952-272123130.jpg	f
67	14	/uploads/products/images/images-1748110191994-958067543.jpg	f
68	14	/uploads/products/images/images-1748110192010-659192097.jpg	f
69	14	/uploads/products/images/images-1748110192022-901746718.jpg	f
70	14	/uploads/products/images/images-1748110192087-254434235.jpg	f
71	14	/uploads/products/images/images-1748110192105-99691241.jpg	f
72	15	/uploads/products/images/images-1748110953430-851089694.jpg	f
73	15	/uploads/products/images/images-1748110953443-138548825.jpg	f
74	15	/uploads/products/images/images-1748110953447-529621302.jpg	f
75	15	/uploads/products/images/images-1748110953526-967899719.jpg	f
76	15	/uploads/products/images/images-1748110953543-809479564.jpg	f
77	15	/uploads/products/images/images-1748110953592-247150067.jpg	f
78	16	/uploads/products/images/images-1748111316960-504459993.jpg	f
79	16	/uploads/products/images/images-1748111316960-644925561.jpg	f
80	17	/uploads/products/images/images-1748125396804-141998045.jpg	f
81	17	/uploads/products/images/images-1748125396817-21215267.jpg	f
82	17	/uploads/products/images/images-1748125396827-977296216.jpg	f
83	17	/uploads/products/images/images-1748125396833-461085145.jpg	f
84	17	/uploads/products/images/images-1748125396849-342706425.jpg	f
85	17	/uploads/products/images/images-1748125396858-96953419.jpg	f
86	18	/uploads/products/images/images-1748125871257-143706726.jpg	f
87	18	/uploads/products/images/images-1748125871264-540538117.jpg	f
88	18	/uploads/products/images/images-1748125871281-691768423.jpg	f
89	18	/uploads/products/images/images-1748125871289-730826557.jpg	f
90	18	/uploads/products/images/images-1748125871302-509653989.jpg	f
91	19	/uploads/products/images/images-1748126099645-911189534.jpg	f
92	19	/uploads/products/images/images-1748126099659-391545064.jpg	f
93	19	/uploads/products/images/images-1748126099662-777616774.jpg	f
94	20	/uploads/products/images/images-1748126365695-513114348.jpg	f
95	20	/uploads/products/images/images-1748126365712-61870372.jpg	f
96	20	/uploads/products/images/images-1748126365725-771747385.jpg	f
97	21	/uploads/products/images/images-1748126505518-349433610.jpg	f
98	21	/uploads/products/images/images-1748126505547-807164946.jpg	f
99	21	/uploads/products/images/images-1748126505569-612250929.jpg	f
100	21	/uploads/products/images/images-1748126505590-923185676.jpg	f
101	22	/uploads/products/images/images-1748126676084-368737684.jpg	f
102	22	/uploads/products/images/images-1748126676093-848180990.jpg	f
103	22	/uploads/products/images/images-1748126676103-285691953.jpg	f
104	22	/uploads/products/images/images-1748126676111-615839607.jpg	f
105	22	/uploads/products/images/images-1748126676133-969404241.jpg	f
106	22	/uploads/products/images/images-1748126676156-663565373.jpg	f
107	23	/uploads/products/images/images-1748126856652-333733339.jpg	f
108	23	/uploads/products/images/images-1748126856659-137678148.jpg	f
109	23	/uploads/products/images/images-1748126856692-45356451.jpg	f
110	23	/uploads/products/images/images-1748126856696-144036418.jpg	f
111	23	/uploads/products/images/images-1748126856701-299982952.jpg	f
112	24	/uploads/products/images/images-1748127035696-530630161.jpg	f
113	24	/uploads/products/images/images-1748127035705-414560950.jpg	f
114	24	/uploads/products/images/images-1748127035733-431844892.jpg	f
115	24	/uploads/products/images/images-1748127035738-37484414.jpg	f
116	24	/uploads/products/images/images-1748127035743-870341507.jpg	f
117	25	/uploads/products/images/images-1748160835207-821626857.jpg	f
118	25	/uploads/products/images/images-1748160835242-337409149.jpg	f
119	25	/uploads/products/images/images-1748160835268-256666752.jpg	f
120	25	/uploads/products/images/images-1748160835285-773830631.jpg	f
121	26	/uploads/products/images/images-1748161361208-945756894.jpg	f
132	28	/uploads/products/images/images-1748162487403-10693661.jpg	f
133	28	/uploads/products/images/images-1748162487419-728302237.jpg	f
134	28	/uploads/products/images/images-1748162487425-235374036.jpg	f
135	28	/uploads/products/images/images-1748162487431-919594220.jpg	f
136	28	/uploads/products/images/images-1748162487436-235635033.jpg	f
137	29	/uploads/products/images/images-1748162617638-27480342.jpg	f
138	29	/uploads/products/images/images-1748162617644-918729760.jpg	f
139	29	/uploads/products/images/images-1748162617647-489765593.jpg	f
140	29	/uploads/products/images/images-1748162617650-169462769.jpg	f
141	30	/uploads/products/images/images-1748162980660-645478780.jpg	f
142	30	/uploads/products/images/images-1748162980675-986469989.jpg	f
143	30	/uploads/products/images/images-1748162980703-268761410.jpg	f
144	30	/uploads/products/images/images-1748162980714-904989049.jpg	f
145	30	/uploads/products/images/images-1748162980735-244817569.jpg	f
146	31	/uploads/products/images/images-1748163193386-555165424.jpg	f
147	31	/uploads/products/images/images-1748163193392-14255898.jpg	f
148	31	/uploads/products/images/images-1748163193399-901701977.jpg	f
149	31	/uploads/products/images/images-1748163193407-731348082.jpg	f
150	31	/uploads/products/images/images-1748163193419-211011937.jpg	f
151	32	/uploads/products/images/images-1748163339953-315154786.jpg	f
152	32	/uploads/products/images/images-1748163339971-652099657.jpg	f
153	32	/uploads/products/images/images-1748163339996-515828782.jpg	f
154	32	/uploads/products/images/images-1748163340011-51820896.jpg	f
155	32	/uploads/products/images/images-1748163340019-831249996.jpg	f
156	32	/uploads/products/images/images-1748163340029-495083291.jpg	f
157	32	/uploads/products/images/images-1748163340035-22249661.jpg	f
158	33	/uploads/products/images/images-1748164132802-774886668.jpg	f
159	33	/uploads/products/images/images-1748164132802-59503977.jpg	f
160	33	/uploads/products/images/images-1748164132803-675293374.jpg	f
161	33	/uploads/products/images/images-1748164132804-662671452.jpg	f
162	34	/uploads/products/images/images-1748164308954-166381838.jpg	f
163	34	/uploads/products/images/images-1748164308974-201889825.jpg	f
164	34	/uploads/products/images/images-1748164308980-242173331.jpg	f
165	34	/uploads/products/images/images-1748164308988-860826590.jpg	f
166	34	/uploads/products/images/images-1748164309017-126641245.jpg	f
167	34	/uploads/products/images/images-1748164309028-100198376.jpg	f
168	35	/uploads/products/images/images-1748164485897-85690773.webp	f
169	35	/uploads/products/images/images-1748164485898-523896554.webp	f
170	35	/uploads/products/images/images-1748164485899-324489206.webp	f
171	36	/uploads/products/images/images-1748164676489-608630217.jpg	f
172	36	/uploads/products/images/images-1748164676493-459317772.jpg	f
173	36	/uploads/products/images/images-1748164676512-966344011.jpg	f
174	36	/uploads/products/images/images-1748164676546-97640705.jpg	f
175	36	/uploads/products/images/images-1748164676571-71808814.jpg	f
176	37	/uploads/products/images/images-1748198074466-853092782.jpg	f
177	37	/uploads/products/images/images-1748198074536-123534262.jpg	f
178	37	/uploads/products/images/images-1748198074573-829773434.jpg	f
179	37	/uploads/products/images/images-1748198074628-536459119.jpg	f
180	37	/uploads/products/images/images-1748198074657-258327618.jpg	f
181	38	/uploads/products/images/images-1748198734737-403060444.jpg	f
182	38	/uploads/products/images/images-1748198734764-801487353.jpg	f
183	38	/uploads/products/images/images-1748198734776-715354456.jpg	f
184	38	/uploads/products/images/images-1748198734798-595793234.jpg	f
185	38	/uploads/products/images/images-1748198734836-809311018.jpg	f
186	39	/uploads/products/images/images-1748198931243-345351703.jpg	f
187	39	/uploads/products/images/images-1748198931243-322724077.jpg	f
188	39	/uploads/products/images/images-1748198931243-734871234.jpg	f
189	39	/uploads/products/images/images-1748198931244-521183422.jpg	f
190	39	/uploads/products/images/images-1748198931245-26585847.jpg	f
191	40	/uploads/products/images/images-1748199032984-496035813.jpg	f
192	40	/uploads/products/images/images-1748199033031-12452540.jpg	f
193	40	/uploads/products/images/images-1748199033034-325947664.jpg	f
194	40	/uploads/products/images/images-1748199033054-469850916.jpg	f
195	40	/uploads/products/images/images-1748199033058-801862347.jpg	f
196	40	/uploads/products/images/images-1748199033071-900257507.jpg	f
197	41	/uploads/products/images/images-1748199103567-659676971.jpg	f
198	41	/uploads/products/images/images-1748199103576-427828447.jpg	f
199	41	/uploads/products/images/images-1748199103587-4381271.jpg	f
200	41	/uploads/products/images/images-1748199103598-530725231.jpg	f
201	41	/uploads/products/images/images-1748199103607-437619563.jpg	f
202	42	/uploads/products/images/images-1748199217431-363093813.jpg	f
203	42	/uploads/products/images/images-1748199217431-869596117.jpg	f
204	42	/uploads/products/images/images-1748199217433-328225593.jpg	f
205	42	/uploads/products/images/images-1748199217433-994679028.jpg	f
206	42	/uploads/products/images/images-1748199217434-977677502.jpg	f
207	43	/uploads/products/images/images-1748208558468-833795645.jpg	f
208	43	/uploads/products/images/images-1748208558492-657911006.jpg	f
209	43	/uploads/products/images/images-1748208558504-810899460.jpg	f
210	43	/uploads/products/images/images-1748208558522-827382648.jpg	f
211	43	/uploads/products/images/images-1748208558533-898221490.jpg	f
212	43	/uploads/products/images/images-1748208558547-638915132.jpg	f
213	44	/uploads/products/images/images-1748208707680-943183388.jpg	f
214	44	/uploads/products/images/images-1748208707699-133422308.jpg	f
215	44	/uploads/products/images/images-1748208707720-821643234.jpg	f
216	44	/uploads/products/images/images-1748208707726-922681941.jpg	f
217	44	/uploads/products/images/images-1748208707752-958963370.jpg	f
218	44	/uploads/products/images/images-1748208707762-598493636.jpg	f
219	45	/uploads/products/images/images-1748208805435-919467274.jpg	f
220	45	/uploads/products/images/images-1748208805446-732940768.jpg	f
221	45	/uploads/products/images/images-1748208805458-750491687.jpg	f
222	45	/uploads/products/images/images-1748208805481-575483073.jpg	f
223	46	/uploads/products/images/images-1748209281370-322554589.jpg	f
224	46	/uploads/products/images/images-1748209281379-440852725.jpg	f
225	46	/uploads/products/images/images-1748209281385-125327111.jpg	f
226	46	/uploads/products/images/images-1748209281415-905103173.jpg	f
227	47	/uploads/products/images/images-1748209425513-746118172.jpg	f
228	47	/uploads/products/images/images-1748209425522-627711606.jpg	f
229	47	/uploads/products/images/images-1748209425557-976455586.jpg	f
230	47	/uploads/products/images/images-1748209425580-539420873.jpg	f
231	47	/uploads/products/images/images-1748209425592-156798882.jpg	f
232	48	/uploads/products/images/images-1748209522743-776798096.jpg	f
233	48	/uploads/products/images/images-1748209522777-325373263.jpg	f
234	48	/uploads/products/images/images-1748209522789-65144005.jpg	f
235	48	/uploads/products/images/images-1748209522805-991455882.jpg	f
236	49	/uploads/products/images/images-1748209634036-500347533.jpg	f
237	49	/uploads/products/images/images-1748209634065-32230811.jpg	f
238	49	/uploads/products/images/images-1748209634076-162705020.jpg	f
239	49	/uploads/products/images/images-1748209634095-984859689.jpg	f
240	49	/uploads/products/images/images-1748209634110-434147802.jpg	f
241	50	/uploads/products/images/images-1748209795859-811518474.jpg	f
242	50	/uploads/products/images/images-1748209795859-738844647.jpg	f
243	50	/uploads/products/images/images-1748209795859-427012101.jpg	f
244	50	/uploads/products/images/images-1748209795860-996745966.jpg	f
245	50	/uploads/products/images/images-1748209795861-428288579.jpg	f
246	51	/uploads/products/images/images-1748210012681-190302071.jpg	f
247	51	/uploads/products/images/images-1748210012681-338828475.jpg	f
248	51	/uploads/products/images/images-1748210012683-595311760.jpg	f
249	51	/uploads/products/images/images-1748210012683-804555894.jpg	f
250	52	/uploads/products/images/images-1748210131272-685053465.jpg	f
251	52	/uploads/products/images/images-1748210131285-335078981.jpg	f
252	53	/uploads/products/images/images-1748210245050-88208308.jpg	f
253	53	/uploads/products/images/images-1748210245058-966788137.jpg	f
254	53	/uploads/products/images/images-1748210245067-187639692.jpg	f
255	53	/uploads/products/images/images-1748210245071-777150632.jpg	f
256	53	/uploads/products/images/images-1748210245081-862770935.jpg	f
257	54	/uploads/products/images/images-1748210353230-588007956.jpg	f
258	54	/uploads/products/images/images-1748210353256-46215285.jpg	f
259	54	/uploads/products/images/images-1748210353266-767819208.jpg	f
260	54	/uploads/products/images/images-1748210353303-104704956.jpg	f
261	54	/uploads/products/images/images-1748210353310-290352533.jpg	f
262	55	/uploads/products/images/images-1748210456117-397019880.jpg	f
263	55	/uploads/products/images/images-1748210456125-765662630.jpg	f
264	56	/uploads/products/images/images-1748210574067-260309563.jpg	f
265	56	/uploads/products/images/images-1748210574078-232565372.jpg	f
266	56	/uploads/products/images/images-1748210574085-677279929.jpg	f
267	56	/uploads/products/images/images-1748210574092-233436665.jpg	f
268	56	/uploads/products/images/images-1748210574097-438332903.jpg	f
269	57	/uploads/products/images/images-1748210700230-21853647.jpg	f
270	57	/uploads/products/images/images-1748210700238-572724498.jpg	f
271	57	/uploads/products/images/images-1748210700273-59159111.jpg	f
272	57	/uploads/products/images/images-1748210700293-302334406.jpg	f
273	57	/uploads/products/images/images-1748210700304-577862480.jpg	f
274	57	/uploads/products/images/images-1748210700317-787957798.jpg	f
275	58	/uploads/products/images/images-1748210858996-864185392.jpg	f
276	58	/uploads/products/images/images-1748210859005-646710285.jpg	f
277	58	/uploads/products/images/images-1748210859007-523386000.jpg	f
278	58	/uploads/products/images/images-1748210859013-911654089.jpg	f
279	59	/uploads/products/images/images-1748210967589-39969107.jpg	f
280	59	/uploads/products/images/images-1748210967595-73487263.jpg	f
281	60	/uploads/products/images/images-1748211186660-239591497.jpg	f
282	60	/uploads/products/images/images-1748211186674-51662461.jpg	f
283	60	/uploads/products/images/images-1748211186682-565624312.jpg	f
284	60	/uploads/products/images/images-1748211186697-729597110.jpg	f
285	60	/uploads/products/images/images-1748211186705-304483035.jpg	f
286	60	/uploads/products/images/images-1748211186712-562457789.jpg	f
287	61	/uploads/products/images/images-1748211300178-328432676.jpg	f
288	61	/uploads/products/images/images-1748211300202-53920207.jpg	f
289	61	/uploads/products/images/images-1748211300229-827699606.jpg	f
290	61	/uploads/products/images/images-1748211300249-651011881.jpg	f
291	61	/uploads/products/images/images-1748211300257-608753435.jpg	f
292	62	/uploads/products/images/images-1748211374748-613642600.jpg	f
293	62	/uploads/products/images/images-1748211374767-606769827.jpg	f
294	62	/uploads/products/images/images-1748211374771-395267771.jpg	f
295	62	/uploads/products/images/images-1748211374776-981384757.jpg	f
296	63	/uploads/products/images/images-1748211568731-679583994.jpg	f
297	63	/uploads/products/images/images-1748211568735-738362549.jpg	f
298	63	/uploads/products/images/images-1748211568764-938204632.jpg	f
299	63	/uploads/products/images/images-1748211568791-595713596.jpg	f
300	63	/uploads/products/images/images-1748211568798-995488356.jpg	f
301	64	/uploads/products/images/images-1748211686644-820648938.jpg	f
302	64	/uploads/products/images/images-1748211686657-158722270.jpg	f
303	64	/uploads/products/images/images-1748211686669-66342105.jpg	f
304	64	/uploads/products/images/images-1748211686677-118389386.jpg	f
305	64	/uploads/products/images/images-1748211686695-220593001.jpg	f
306	65	/uploads/products/images/images-1748211791515-2535456.jpg	f
307	65	/uploads/products/images/images-1748211791524-830948486.jpg	f
308	65	/uploads/products/images/images-1748211791536-880181218.jpg	f
309	65	/uploads/products/images/images-1748211791542-518319451.jpg	f
310	65	/uploads/products/images/images-1748211791552-958854743.jpg	f
311	65	/uploads/products/images/images-1748211791565-30927236.jpg	f
312	66	/uploads/products/images/images-1748211895787-729141894.jpg	f
313	66	/uploads/products/images/images-1748211895815-395370113.jpg	f
314	66	/uploads/products/images/images-1748211895824-494285182.jpg	f
315	66	/uploads/products/images/images-1748211895832-727068023.jpg	f
316	66	/uploads/products/images/images-1748211895838-688702161.jpg	f
317	66	/uploads/products/images/images-1748211895855-698593583.jpg	f
318	67	/uploads/products/images/images-1748212043590-936089620.jpg	f
319	67	/uploads/products/images/images-1748212043597-249373368.jpg	f
320	67	/uploads/products/images/images-1748212043610-778698336.jpg	f
321	67	/uploads/products/images/images-1748212043615-585752657.jpg	f
322	67	/uploads/products/images/images-1748212043632-603538010.jpg	f
323	67	/uploads/products/images/images-1748212043647-571827246.jpg	f
324	67	/uploads/products/images/images-1748212043652-154560826.jpg	f
325	68	/uploads/products/images/images-1748212132302-214945859.jpg	f
326	68	/uploads/products/images/images-1748212132317-447876316.jpg	f
327	68	/uploads/products/images/images-1748212132328-853016809.jpg	f
328	68	/uploads/products/images/images-1748212132342-108044469.jpg	f
329	68	/uploads/products/images/images-1748212132352-694795184.jpg	f
330	69	/uploads/products/images/images-1748212255585-649666673.jpg	f
331	69	/uploads/products/images/images-1748212255641-761741499.jpg	f
332	69	/uploads/products/images/images-1748212255648-118130384.jpg	f
333	69	/uploads/products/images/images-1748212255667-898246434.jpg	f
334	70	/uploads/products/images/images-1748212338166-936856994.jpg	f
335	70	/uploads/products/images/images-1748212338194-199195292.jpg	f
336	70	/uploads/products/images/images-1748212338214-955628403.jpg	f
337	70	/uploads/products/images/images-1748212338235-435482513.jpg	f
338	70	/uploads/products/images/images-1748212338251-953751855.jpg	f
339	70	/uploads/products/images/images-1748212338265-846656831.jpg	f
340	71	/uploads/products/images/images-1748212454641-936859818.jpg	f
341	71	/uploads/products/images/images-1748212454664-210135104.jpg	f
342	71	/uploads/products/images/images-1748212454675-656771832.jpg	f
343	71	/uploads/products/images/images-1748212454682-174913131.jpg	f
344	72	/uploads/products/images/images-1748212576792-888840367.jpg	f
345	72	/uploads/products/images/images-1748212576813-874497008.jpg	f
346	72	/uploads/products/images/images-1748212576828-844153868.jpg	f
347	72	/uploads/products/images/images-1748212576840-283046163.jpg	f
348	72	/uploads/products/images/images-1748212576850-770649115.jpg	f
349	72	/uploads/products/images/images-1748212576855-604099046.jpg	f
350	73	/uploads/products/images/images-1748212721545-212808327.jpg	f
351	73	/uploads/products/images/images-1748212721560-60437109.jpg	f
352	73	/uploads/products/images/images-1748212721570-202016716.jpg	f
353	73	/uploads/products/images/images-1748212721583-873031245.jpg	f
354	73	/uploads/products/images/images-1748212721594-636639512.jpg	f
355	74	/uploads/products/images/images-1748212906743-195682473.jpg	f
356	74	/uploads/products/images/images-1748212906762-543738443.jpg	f
357	74	/uploads/products/images/images-1748212906767-506043580.jpg	f
358	74	/uploads/products/images/images-1748212906774-15960223.jpg	f
359	75	/uploads/products/images/images-1748212999813-875694862.jpg	f
360	75	/uploads/products/images/images-1748212999828-318915334.jpg	f
361	75	/uploads/products/images/images-1748212999837-644493590.jpg	f
362	75	/uploads/products/images/images-1748212999845-997659569.jpg	f
363	76	/uploads/products/images/images-1748213097778-44451632.jpg	f
364	76	/uploads/products/images/images-1748213097816-504773433.jpg	f
365	76	/uploads/products/images/images-1748213097838-117008161.jpg	f
366	76	/uploads/products/images/images-1748213097849-148995725.jpg	f
367	76	/uploads/products/images/images-1748213097865-526847570.jpg	f
368	77	/uploads/products/images/images-1748213192193-258399592.jpg	f
369	77	/uploads/products/images/images-1748213192217-912068388.jpg	f
370	77	/uploads/products/images/images-1748213192250-59843259.jpg	f
371	77	/uploads/products/images/images-1748213192280-875802162.jpg	f
372	77	/uploads/products/images/images-1748213192309-845335628.jpg	f
373	77	/uploads/products/images/images-1748213192316-276134073.jpg	f
374	78	/uploads/products/images/images-1748213289972-783393536.jpg	f
375	78	/uploads/products/images/images-1748213290030-244438797.jpg	f
376	78	/uploads/products/images/images-1748213290043-388346861.jpg	f
377	78	/uploads/products/images/images-1748213290052-621412606.jpg	f
378	79	/uploads/products/images/images-1748213381089-884150152.jpg	f
379	79	/uploads/products/images/images-1748213381109-495464552.jpg	f
380	79	/uploads/products/images/images-1748213381126-575683601.jpg	f
381	79	/uploads/products/images/images-1748213381141-488390871.jpg	f
382	80	/uploads/products/images/images-1748213491016-242806654.jpg	f
383	80	/uploads/products/images/images-1748213491023-714186563.jpg	f
384	80	/uploads/products/images/images-1748213491034-358325341.jpg	f
385	80	/uploads/products/images/images-1748213491063-925340892.jpg	f
386	81	/uploads/products/images/images-1748214424731-334257816.jpg	f
387	81	/uploads/products/images/images-1748214424798-827056046.jpg	f
388	81	/uploads/products/images/images-1748214424820-432425369.jpg	f
389	81	/uploads/products/images/images-1748214424824-668196688.jpg	f
390	81	/uploads/products/images/images-1748214424839-387327510.jpg	f
391	82	/uploads/products/images/images-1748214512646-671915789.jpg	f
392	82	/uploads/products/images/images-1748214512673-192501602.jpg	f
393	82	/uploads/products/images/images-1748214512698-291928988.jpg	f
394	82	/uploads/products/images/images-1748214512706-100264953.jpg	f
395	82	/uploads/products/images/images-1748214512711-62832506.jpg	f
396	82	/uploads/products/images/images-1748214512718-762801265.jpg	f
397	83	/uploads/products/images/images-1748214592585-433127972.jpg	f
398	83	/uploads/products/images/images-1748214592618-861355049.jpg	f
399	83	/uploads/products/images/images-1748214592638-467669579.jpg	f
400	83	/uploads/products/images/images-1748214592645-990912239.jpg	f
401	84	/uploads/products/images/images-1748214687494-961731492.jpg	f
402	84	/uploads/products/images/images-1748214687502-189381747.jpg	f
403	84	/uploads/products/images/images-1748214687527-187253584.jpg	f
404	85	/uploads/products/images/images-1748214796071-410131277.jpg	f
405	85	/uploads/products/images/images-1748214796086-658406141.jpg	f
406	85	/uploads/products/images/images-1748214796097-220121976.jpg	f
407	86	/uploads/products/images/images-1748214953252-262079218.jpg	f
408	86	/uploads/products/images/images-1748214953268-115732837.jpg	f
409	86	/uploads/products/images/images-1748214953294-704877128.jpg	f
410	87	/uploads/products/images/images-1748215044002-530521828.jpg	f
411	87	/uploads/products/images/images-1748215044028-562762321.jpg	f
412	87	/uploads/products/images/images-1748215044039-811485511.jpg	f
413	87	/uploads/products/images/images-1748215044050-459187527.jpg	f
414	87	/uploads/products/images/images-1748215044092-387530309.jpg	f
415	87	/uploads/products/images/images-1748215044101-765401224.jpg	f
416	88	/uploads/products/images/images-1748215244436-736439837.jpg	f
417	88	/uploads/products/images/images-1748215244457-154965084.jpg	f
418	88	/uploads/products/images/images-1748215244482-56493948.jpg	f
419	88	/uploads/products/images/images-1748215244520-172487739.jpg	f
420	88	/uploads/products/images/images-1748215244530-686080760.jpg	f
421	88	/uploads/products/images/images-1748215244552-792641078.jpg	f
422	89	/uploads/products/images/images-1748215491555-264051351.jpg	f
423	89	/uploads/products/images/images-1748215491577-674964801.jpg	f
424	89	/uploads/products/images/images-1748215491599-290488678.jpg	f
425	89	/uploads/products/images/images-1748215491613-163569308.jpg	f
426	89	/uploads/products/images/images-1748215491618-131239803.jpg	f
427	90	/uploads/products/images/images-1748215726986-495346363.jpg	f
428	90	/uploads/products/images/images-1748215727007-446965477.jpg	f
429	90	/uploads/products/images/images-1748215727020-325919196.jpg	f
430	90	/uploads/products/images/images-1748215727027-898837182.jpg	f
431	91	/uploads/products/images/images-1748215813108-989461098.jpg	f
432	91	/uploads/products/images/images-1748215813127-304514568.jpg	f
433	91	/uploads/products/images/images-1748215813138-949121744.jpg	f
434	91	/uploads/products/images/images-1748215813165-173648903.jpg	f
435	91	/uploads/products/images/images-1748215813204-437056386.jpg	f
436	92	/uploads/products/images/images-1748215932494-318512091.jpg	f
437	92	/uploads/products/images/images-1748215932494-930023290.jpg	f
438	92	/uploads/products/images/images-1748215932494-545307064.jpg	f
439	92	/uploads/products/images/images-1748215932496-283343455.jpg	f
440	93	/uploads/products/images/images-1748216040373-529342445.jpg	f
441	93	/uploads/products/images/images-1748216040383-456695883.jpg	f
442	93	/uploads/products/images/images-1748216040392-924627796.jpg	f
443	93	/uploads/products/images/images-1748216040397-35587259.jpg	f
444	93	/uploads/products/images/images-1748216040408-579218321.jpg	f
445	93	/uploads/products/images/images-1748216040432-407236810.jpg	f
446	94	/uploads/products/images/images-1748216183757-720175446.jpg	f
447	94	/uploads/products/images/images-1748216183763-494973372.jpg	f
448	94	/uploads/products/images/images-1748216183775-864849580.jpg	f
449	94	/uploads/products/images/images-1748216183786-843282754.jpg	f
450	95	/uploads/products/images/images-1748242914141-50159717.jpg	f
451	95	/uploads/products/images/images-1748242914160-181410537.jpg	f
452	95	/uploads/products/images/images-1748242914182-59213183.jpg	f
453	95	/uploads/products/images/images-1748242914233-276320506.jpg	f
454	96	/uploads/products/images/images-1748243009269-151271157.jpg	f
455	96	/uploads/products/images/images-1748243009352-768885570.jpg	f
456	96	/uploads/products/images/images-1748243009369-628274472.jpg	f
457	96	/uploads/products/images/images-1748243009381-69599564.jpg	f
458	96	/uploads/products/images/images-1748243009389-40560094.jpg	f
459	96	/uploads/products/images/images-1748243009402-934690232.jpg	f
460	97	/uploads/products/images/images-1748243317962-617613611.jpg	f
461	97	/uploads/products/images/images-1748243317963-1262837.jpg	f
462	97	/uploads/products/images/images-1748243317963-916081960.jpg	f
463	97	/uploads/products/images/images-1748243317964-835548788.jpg	f
464	97	/uploads/products/images/images-1748243317965-826954237.jpg	f
465	98	/uploads/products/images/images-1748243422834-983198033.jpg	f
466	98	/uploads/products/images/images-1748243422852-319148110.jpg	f
467	98	/uploads/products/images/images-1748243422856-223189065.jpg	f
468	98	/uploads/products/images/images-1748243422875-731046179.jpg	f
469	98	/uploads/products/images/images-1748243422884-243088214.jpg	f
470	99	/uploads/products/images/images-1748243545037-303652261.jpg	f
471	99	/uploads/products/images/images-1748243545037-128484526.jpg	f
472	99	/uploads/products/images/images-1748243545039-209839981.jpg	f
473	100	/uploads/products/images/images-1748243664824-701327402.jpg	f
474	100	/uploads/products/images/images-1748243664849-672813316.jpg	f
475	100	/uploads/products/images/images-1748243664866-124587894.jpg	f
476	100	/uploads/products/images/images-1748243664887-264111154.jpg	f
477	100	/uploads/products/images/images-1748243664894-904493181.jpg	f
478	101	/uploads/products/images/images-1748243789195-2588198.jpg	f
479	101	/uploads/products/images/images-1748243789202-41008419.jpg	f
480	101	/uploads/products/images/images-1748243789211-509577338.jpg	f
481	101	/uploads/products/images/images-1748243789222-452710865.jpg	f
482	102	/uploads/products/images/images-1748243948409-342992383.jpg	f
483	102	/uploads/products/images/images-1748243948424-766293988.jpg	f
484	102	/uploads/products/images/images-1748243948456-625507021.jpg	f
485	102	/uploads/products/images/images-1748243948481-449689876.jpg	f
486	102	/uploads/products/images/images-1748243948505-146299358.jpg	f
487	103	/uploads/products/images/images-1748244104118-653812674.jpg	f
488	103	/uploads/products/images/images-1748244104135-630965798.jpg	f
489	103	/uploads/products/images/images-1748244104141-182747979.jpg	f
490	103	/uploads/products/images/images-1748244104155-419319378.jpg	f
491	103	/uploads/products/images/images-1748244104164-179541756.jpg	f
492	104	/uploads/products/images/images-1748244206335-368304587.jpg	f
493	104	/uploads/products/images/images-1748244206339-987707511.jpg	f
494	104	/uploads/products/images/images-1748244206342-698274024.jpg	f
495	104	/uploads/products/images/images-1748244206356-848862599.jpg	f
496	104	/uploads/products/images/images-1748244206374-303645986.jpg	f
497	104	/uploads/products/images/images-1748244206385-867874419.jpg	f
498	105	/uploads/products/images/images-1748244324814-530709283.jpg	f
499	105	/uploads/products/images/images-1748244324825-332517584.jpg	f
500	105	/uploads/products/images/images-1748244324838-753188261.jpg	f
501	105	/uploads/products/images/images-1748244324841-17418095.jpg	f
502	105	/uploads/products/images/images-1748244324852-650383399.jpg	f
503	106	/uploads/products/images/images-1748244435981-648261361.jpg	f
504	106	/uploads/products/images/images-1748244435994-353581616.jpg	f
505	106	/uploads/products/images/images-1748244436005-15492676.jpg	f
506	106	/uploads/products/images/images-1748244436021-37093200.jpg	f
507	106	/uploads/products/images/images-1748244436034-283144505.jpg	f
508	106	/uploads/products/images/images-1748244436040-812672.jpg	f
509	106	/uploads/products/images/images-1748244436049-742713849.jpg	f
510	107	/uploads/products/images/images-1748244619510-107038456.jpg	f
511	107	/uploads/products/images/images-1748244619528-572332289.jpg	f
512	107	/uploads/products/images/images-1748244619545-356096485.jpg	f
513	107	/uploads/products/images/images-1748244619561-514685904.jpg	f
514	108	/uploads/products/images/images-1748244836736-65753915.jpg	f
515	108	/uploads/products/images/images-1748244836737-841043773.jpg	f
516	108	/uploads/products/images/images-1748244836737-101392850.jpg	f
517	108	/uploads/products/images/images-1748244836737-735512310.jpg	f
518	108	/uploads/products/images/images-1748244836738-171202845.jpg	f
519	109	/uploads/products/images/images-1748244975271-553026331.jpg	f
520	109	/uploads/products/images/images-1748244975271-698932061.jpg	f
521	109	/uploads/products/images/images-1748244975271-251253664.jpg	f
522	109	/uploads/products/images/images-1748244975274-111474267.jpg	f
523	110	/uploads/products/images/images-1748245086179-269258630.jpg	f
524	110	/uploads/products/images/images-1748245086196-860750737.jpg	f
525	110	/uploads/products/images/images-1748245086206-848065645.jpg	f
526	110	/uploads/products/images/images-1748245086212-907902113.jpg	f
527	110	/uploads/products/images/images-1748245086222-12025737.jpg	f
528	110	/uploads/products/images/images-1748245086237-969551095.jpg	f
529	111	/uploads/products/images/images-1748245244024-627193704.jpg	f
530	111	/uploads/products/images/images-1748245244040-256940919.jpg	f
531	111	/uploads/products/images/images-1748245244045-463393521.jpg	f
532	111	/uploads/products/images/images-1748245244051-722444840.jpg	f
533	111	/uploads/products/images/images-1748245244092-916304844.jpg	f
534	111	/uploads/products/images/images-1748245244098-378125691.jpg	f
535	112	/uploads/products/images/images-1748245352517-991598221.jpg	f
536	112	/uploads/products/images/images-1748245352519-218197414.jpg	f
537	112	/uploads/products/images/images-1748245352519-180538403.jpg	f
538	113	/uploads/products/images/images-1748245504649-782907107.jpg	f
539	113	/uploads/products/images/images-1748245504649-714927115.jpg	f
540	113	/uploads/products/images/images-1748245504650-470090393.jpg	f
541	113	/uploads/products/images/images-1748245504651-78356011.jpg	f
542	114	/uploads/products/images/images-1748245732509-712096197.jpg	f
543	114	/uploads/products/images/images-1748245732509-202589699.jpg	f
544	114	/uploads/products/images/images-1748245732512-70932101.jpg	f
545	114	/uploads/products/images/images-1748245732512-111299782.jpg	f
546	115	/uploads/products/images/images-1748245874734-545123759.jpg	f
547	115	/uploads/products/images/images-1748245874747-948499607.jpg	f
548	115	/uploads/products/images/images-1748245874753-750570264.jpg	f
549	115	/uploads/products/images/images-1748245874770-824215159.jpg	f
\.


--
-- Data for Name: product_models; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_models (id, product_id, model_url, is_primary) FROM stdin;
8	10	/uploads/products/models/models-1748094098081-221388191.glb	t
9	11	/uploads/products/models/models-1748095805659-674448532.glb	t
10	12	/uploads/products/models/models-1748096816911-653592052.glb	t
11	14	/uploads/products/models/models-1748110192119-238852787.glb	f
12	15	/uploads/products/models/models-1748110953603-612676909.glb	f
13	17	/uploads/products/models/models-1748125396871-178445624.glb	f
14	21	/uploads/products/models/models-1748126505597-314017192.glb	f
15	22	/uploads/products/models/models-1748126676169-31240623.glb	f
16	23	/uploads/products/models/models-1748126856704-629821871.glb	f
17	24	/uploads/products/models/models-1748127035753-140759462.glb	f
20	30	/uploads/products/models/models-1748162980767-680099066.glb	f
21	31	/uploads/products/models/models-1748163193425-564660921.glb	f
22	32	/uploads/products/models/models-1748163340045-264720943.glb	f
23	33	/uploads/products/models/models-1748164132804-503578606.glb	f
24	34	/uploads/products/models/models-1748164309053-255244669.glb	f
25	36	/uploads/products/models/models-1748164676588-569697452.glb	f
26	46	/uploads/products/models/models-1748209281442-523126633.glb	f
27	47	/uploads/products/models/models-1748209425613-342352981.glb	f
28	48	/uploads/products/models/models-1748209522821-173074455.glb	f
29	50	/uploads/products/models/models-1748209795861-153080906.glb	f
30	53	/uploads/products/models/models-1748210245094-456129841.glb	f
31	54	/uploads/products/models/models-1748210353324-43391509.glb	f
32	56	/uploads/products/models/models-1748210574102-849114248.glb	f
33	57	/uploads/products/models/models-1748210700329-412760878.glb	f
34	58	/uploads/products/models/models-1748210859018-812202887.glb	f
35	60	/uploads/products/models/models-1748211186724-137490020.glb	f
36	61	/uploads/products/models/models-1748211300260-246388317.glb	f
37	63	/uploads/products/models/models-1748211568807-73119337.glb	f
38	64	/uploads/products/models/models-1748211686724-789358011.glb	f
39	65	/uploads/products/models/models-1748211791575-226650689.glb	f
40	66	/uploads/products/models/models-1748211895873-739227861.glb	f
41	67	/uploads/products/models/models-1748212043658-610285898.glb	f
42	71	/uploads/products/models/models-1748212454691-644718424.glb	f
43	72	/uploads/products/models/models-1748212576859-57259001.glb	f
44	73	/uploads/products/models/models-1748212721600-120564745.glb	f
45	74	/uploads/products/models/models-1748212906781-35966939.glb	f
46	77	/uploads/products/models/models-1748213192391-787471812.glb	f
47	78	/uploads/products/models/models-1748213290069-455376808.glb	f
48	79	/uploads/products/models/models-1748213381153-585743246.glb	f
49	80	/uploads/products/models/models-1748213491076-68102318.glb	f
50	81	/uploads/products/models/models-1748214424841-901561640.glb	f
51	82	/uploads/products/models/models-1748214512733-408876983.glb	f
52	84	/uploads/products/models/models-1748214687548-772830350.glb	f
53	86	/uploads/products/models/models-1748214953310-587038547.glb	f
54	88	/uploads/products/models/models-1748215244584-805285176.glb	f
55	93	/uploads/products/models/models-1748216040440-318727319.glb	f
56	97	/uploads/products/models/models-1748243317966-788973547.glb	f
57	100	/uploads/products/models/models-1748243664903-524450318.glb	f
58	102	/uploads/products/models/models-1748243948522-732963792.glb	f
59	103	/uploads/products/models/models-1748244104183-739782570.glb	f
60	104	/uploads/products/models/models-1748244206400-483298767.glb	f
61	105	/uploads/products/models/models-1748244324855-423555828.glb	f
62	107	/uploads/products/models/models-1748244619569-261469317.glb	f
63	110	/uploads/products/models/models-1748245086241-278952686.glb	f
64	111	/uploads/products/models/models-1748245244102-349877814.glb	f
65	115	/uploads/products/models/models-1748245874787-190846101.glb	f
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, vendor, description, specifications, price, quantity, subcategory_id) FROM stdin;
14	Smartwatch Fitness Pro	WearTech	{"cn": "带有心率监测和GPS追踪功能的高级智能手表。", "de": "Fortgeschrittene Smartwatch mit Herzfrequenzmessung und GPS-Tracking.", "en": "Advanced smartwatch with heart rate monitoring and GPS tracking.", "es": "Reloj inteligente avanzado con seguimiento de ritmo cardíaco y GPS.", "fr": "Montre intelligente avancée avec suivi cardiaque et géolocalisation GPS.", "it": "Smartwatch avanzato con monitoraggio della frequenza cardiaca e tracciamento GPS."}	{"cn": "AMOLED显示屏，10天电池续航，GPS，IP68防水", "de": "AMOLED-Display, 10 Tage Akku, GPS, wasserdicht IP68", "en": "AMOLED display, 10-day battery, GPS, IP68 waterproof", "es": "Pantalla AMOLED, batería de 10 días, GPS, resistente al agua IP68", "fr": "Affichage AMOLED, batterie de 10 jours, GPS, étanche IP68", "it": "Display AMOLED, batteria da 10 giorni, GPS, resistente all'acqua IP68"}	199.99	200	18
15	Smartphone Discounted X90	TechDeals	{"cn": "限时优惠的高端智能手机，性能出色。", "de": "Zeitlich begrenztes Angebot für ein leistungsstarkes High-End-Smartphone.", "en": "Limited-time offer for high-end smartphone with great performance.", "es": "Oferta por tiempo limitado para smartphone de gama alta con gran rendimiento.", "fr": "Offre à durée limitée pour un smartphone haut de gamme performant.", "it": "Offerta limitata per smartphone di alta gamma con ottime prestazioni."}	{"cn": "6.4英寸AMOLED屏，128GB存储，八核CPU，三摄", "de": "6,4-Zoll-AMOLED-Display, 128 GB Speicher, Octa-Core-CPU, Triple-Kamera", "en": "6.4 inch AMOLED, 128GB storage, Octa-core CPU, Triple camera", "es": "Pantalla AMOLED de 6,4 pulgadas, almacenamiento de 128 GB, CPU octa-core, cámara triple", "fr": "Écran AMOLED de 6,4 pouces, stockage de 128 Go, processeur octa-core, appareil photo triple", "it": "Display AMOLED da 6.4 pollici, memoria da 128GB, CPU octa-core, fotocamera tripla"}	599.99	50	7
16	The Art of Living Well	BookLovers	{"cn": "一本关于正念与健康习惯的自助书籍。", "de": "Ein Ratgeber zur Achtsamkeit und gesunden Gewohnheiten.", "en": "A self-help book focusing on mindfulness and healthy habits.", "es": "Libro de autoayuda enfocado en atención plena y hábitos saludables.", "fr": "Un livre d'auto-développement axé sur la pleine conscience et les habitudes saines.", "it": "Un libro di auto-aiuto che si concentra sulla consapevolezza e abitudini sane."}	{"cn": "平装，280页，英文版", "de": "Taschenbuch, 280 Seiten, englische Sprache", "en": "Paperback, 280 pages, English language", "es": "Tapa blanda, 280 páginas, idioma inglés", "fr": "Broché, 280 pages, langue anglaise", "it": "Brossura, 280 pagine, lingua inglese"}	19.99	200	29
11	Ultra HD Laptop Pro	CompTech	{"cn": "面向专业人士和玩家的高性能笔记本电脑。", "de": "Hochleistungs-Laptop für Profis und Gamer.", "en": "High performance laptop for professionals and gamers.", "es": "Portátil de alta potencia para profesionales y jugadores.", "fr": "Ordinateur portable haute performance pour professionnels et joueurs.", "it": "Laptop ad alte prestazioni per professionisti e gamer."}	{"cn": "15.6英寸4K显示屏，16GB内存，512GB固态硬盘，NVIDIA GTX 3060", "de": "15,6-Zoll-4K-Display, 16 GB RAM, 512 GB SSD, NVIDIA GTX 3060", "en": "15.6 inch 4K display, 16GB RAM, 512GB SSD, NVIDIA GTX 3060", "es": "Pantalla 4K de 15,6 pulgadas, 16 GB de RAM, SSD de 512 GB, NVIDIA GTX 3060", "fr": "Écran 4K de 15,6 pouces, RAM de 16 Go, SSD de 512 Go, NVIDIA GTX 3060", "it": "Display 4K da 15.6 pollici, 16GB RAM, 512GB SSD, NVIDIA GTX 3060"}	1299.99	80	14
12	4K Smart TV 55	VisionTech	{"cn": "配备语音助手和流媒体应用的沉浸式4K超高清智能电视。", "de": "Immersiver 4K UHD Smart-TV mit Sprachassistent und Streaming-Apps.", "en": "Immersive 4K UHD Smart TV with voice assistant and streaming apps.", "es": "Televisor inteligente 4K UHD inmersivo con asistente de voz y aplicaciones de streaming.", "fr": "Téléviseur Smart 4K UHD immersif avec assistant vocal et applications de streaming.", "it": "TV Smart 4K UHD immersiva con assistente vocale e app di streaming."}	{"cn": "55英寸4K超高清，Android TV，HDR，语音助手", "de": "55 Zoll 4K UHD, Android TV, HDR, Sprachassistent", "en": "55\\" 4K UHD, Android TV, HDR, Voice Assistant", "es": "55 pulgadas 4K UHD, Android TV, HDR, Asistente de voz", "fr": "55 pouces 4K UHD, Android TV, HDR, Assistant vocal", "it": "55\\" 4K UHD, Android TV, HDR, Assistente vocale"}	799.99	60	15
13	DSLR Camera Z7	PhotoMaster	{"cn": "具有超高分辨率和快速自动对焦的专业单反相机。", "de": "Professionelle DSLR-Kamera mit ultra-hoher Auflösung und schnellem Autofokus.", "en": "Professional DSLR camera with ultra-high resolution and fast autofocus.", "es": "Cámara réflex profesional con resolución ultralta y enfoque automático rápido.", "fr": "Appareil photo reflex professionnel avec résolution ultra élevée et autofocus rapide.", "it": "Fotocamera DSLR professionale con risoluzione ultra alta e autofocus veloce."}	{"cn": "4500万像素传感器，4K视频，Wi-Fi，10fps连拍模式", "de": "45-MP-Sensor, 4K-Video, Wi-Fi, Serienbildmodus mit 10 fps", "en": "45MP sensor, 4K video, Wi-Fi, 10fps burst mode", "es": "Sensor de 45 MP, video 4K, Wi-Fi, modo de ráfaga de 10 fps", "fr": "Capteur de 45 mégapixels, vidéo 4K, Wi-Fi, mode rafale à 10 images/seconde", "it": "Sensore da 45MP, video 4K, Wi-Fi, modalità raffica a 10fps"}	1999.00	30	16
10	Smartphone X100	TechCorp	{"cn": "具有高级功能和高性能的最新智能手机。", "de": "Neuestes Smartphone mit fortschrittlichen Funktionen und hoher Leistung.", "en": "Latest smartphone with advanced features and high performance.", "es": "Último smartphone con funciones avanzadas y alto rendimiento.", "fr": "Dernier smartphone avec des fonctionnalités avancées et des performances élevées.", "it": "Ultimo smartphone con funzionalità avanzate e alte prestazioni."}	{"cn": "6.5英寸显示屏，128GB存储，6GB内存，双摄像头", "de": "6,5-Zoll-Display, 128 GB Speicher, 6 GB RAM, Dual-Kamera", "en": "6.5 inch display, 128GB storage, 6GB RAM, Dual Camera", "es": "Pantalla de 6,5 pulgadas, almacenamiento de 128 GB, RAM de 6 GB, Cámara dual", "fr": "Écran de 6,5 pouces, stockage de 128 Go, RAM de 6 Go, Double appareil photo", "it": "Display da 6.5 pollici, 128GB memoria, 6GB RAM, Doppia fotocamera"}	799.99	150	13
17	Men's Winter Jacket Classic	UrbanStyle	{"cn": "由环保材料制成的时尚冬季夹克。", "de": "Stylische Winterjacke aus umweltfreundlichen Materialien.", "en": "Stylish winter jacket made from eco-friendly materials.", "es": "Chaqueta de invierno elegante fabricada con materiales ecológicos.", "fr": "Veste hivernale élégante fabriquée à partir de matériaux écologiques.", "it": "Giubbotto invernale elegante realizzato con materiali ecologici."}	{"cn": "防水材质，内衬保暖，多个口袋", "de": "Wasserdicht, wärmendes Futter, mehrere Taschen", "en": "Waterproof, insulated lining, multiple pockets", "es": "Impermeable, forro aislante, múltiples bolsillos", "fr": "Imperméable, doublure isolante, multiples poches", "it": "Impermeabile, foderato termico, tasche multiple"}	129.99	150	39
18	Modern Dining Table Set	HomeCraft	{"cn": "现代餐桌椅套装，含桌与四把椅子，适合现代家居。", "de": "Elegantes Esszimmer-Set mit Tisch und vier Stühlen für moderne Wohnungen.", "en": "Elegant dining set with table and four chairs, suitable for modern homes.", "es": "Conjunto elegante para comedor con mesa y cuatro sillas, ideal para casas modernas.", "fr": "Ensemble de salle à manger élégant comprenant une table et quatre chaises.", "it": "Set da pranzo elegante con tavolo e quattro sedie, adatto a case moderne."}	{"cn": "实木材质，哑光饰面，易组装", "de": "Massivholz, matte Oberfläche, einfache Montage", "en": "Solid wood, matte finish, easy assembly", "es": "Madera maciza, acabado mate, fácil montaje", "fr": "Bois massif, finition mate, montage facile", "it": "Legno massiccio, finitura opaca, facile da montare"}	499.99	40	42
19	Educational Science Kit	KidsLearning	{"cn": "针对8-12岁儿童的STEM教育套件，包括实验工具。", "de": "STEM-Lernset für Kinder im Alter von 8 bis 12 Jahren mit Experimenten und Werkzeugen.", "en": "STEM learning kit for children aged 8-12, includes experiments and tools.", "es": "Kit educativo STEM para niños de 8 a 12 años, incluye experimentos y herramientas.", "fr": "Kit éducatif STEM pour enfants de 8 à 12 ans, avec expériences et outils.", "it": "Kit educativo STEM per bambini tra 8 e 12 anni, include esperimenti e strumenti."}	{"cn": "化学实验包，显微镜，实验工具，指导手册", "de": "Chemiekoffer, Mikroskop, Labortools, Anleitungsbuch", "en": "Chemistry set, microscope, lab tools, guidebook", "es": "Kit de química, microscopio, herramientas de laboratorio, manual de usuario", "fr": "Kit chimie, microscope, outils de laboratoire, guide d'utilisation", "it": "Set chimica, microscopio, strumenti da laboratorio, manuale illustrato"}	89.99	100	51
20	Hydrating Facial Serum	GlowSkin	{"cn": "高端面部精华液，深层保湿并改善肤质。", "de": "Premium-Gesichtsserum, das die Haut intensiv befeuchtet und die Hautstruktur verbessert.", "en": "Premium facial serum that deeply hydrates and improves skin texture.", "es": "Sérum facial premium que hidrata profundamente y mejora la textura de la piel.", "fr": "Sérum facial premium qui hydrate en profondeur et améliore la texture de la peau.", "it": "Siero viso premium che idrata in profondità e migliora la texture della pelle."}	{"cn": "透明质酸，维生素C，不油腻，适合所有肤质", "de": "Hyaluronsäure, Vitamin C, nicht fettend, für alle Hauttypen", "en": "Hyaluronic acid, vitamin C, non-greasy, all skin types", "es": "Ácido hialurónico, vitamina C, no graso, apto para todo tipo de piel", "fr": "Acide hyaluronique, vitamine C, non gras, pour tous types de peau", "it": "Acido ialuronico, vitamina C, non grasso, per tutti i tipi di pelle"}	39.99	250	57
21	Professional Yoga Mat	FitLife	{"cn": "防滑瑜伽垫，额外缓冲设计，提升锻炼舒适度。", "de": "Rutschfester Yogateppich mit extra Polsterung für maximalen Komfort beim Training.", "en": "Non-slip yoga mat with extra cushioning for comfort during workouts.", "es": "Estera de yoga antideslizante con acolchado extra para mayor comodidad durante el entrenamiento.", "fr": "Tapis de yoga antidérapant avec coussinage supplémentaire pour plus de confort.", "it": "Tappetino yoga antiscivolo con imbottitura extra per il comfort durante l'allenamento."}	{"cn": "超厚设计，环保材质，轻便", "de": "Extra dick, umweltfreundliches Material, leichtgewichtig", "en": "Extra thick, eco-friendly material, lightweight", "es": "Muy grueso, material ecológico, ligero", "fr": "Très épais, matériau écologique, léger", "it": "Extra spesso, materiale ecologico, leggero"}	29.99	180	70
22	Complete Painting Kit	CreativeArt	{"cn": "适合初学者和专业艺术家的一站式绘画套件。", "de": "Komplettset zum Malen für Anfänger und erfahrene Künstler.", "en": "All-in-one painting set for beginners and experienced artists alike.", "es": "Kit completo de pintura ideal tanto para principiantes como artistas avanzados.", "fr": "Kit complet de peinture destiné aux débutants comme aux artistes confirmés.", "it": "Set completo per dipingere, ideale sia per principianti che per artisti esperti."}	{"cn": "画布、画笔、丙烯颜料、调色板、携带袋", "de": "Leinwand, Pinsel, Acrylfarben, Palette, Transporttasche", "en": "Canvas, brushes, acrylic paints, palette, carrying bag", "es": "Lienzo, pinceles, pinturas acrílicas, paleta, bolsa de transporte", "fr": "Toile, pinceaux, peintures acryliques, palette, sac de transport", "it": "Tele, pennelli, colori acrilici, tavolozza, borsa da trasporto"}	59.99	120	73
23	Classic Men's Watch	LuxuryTime	{"cn": "经典设计奢华腕表，不锈钢表带，精准机芯。", "de": "Luxusuhr mit zeitlosem Design, Edelstahlarmband und präzisem Uhrwerk.", "en": "Timeless design luxury watch with stainless steel band and precise movement.", "es": "Reloj de lujo con diseño atemporal, brazalete de acero inoxidable y movimiento preciso.", "fr": "Montre de luxe au design intemporel avec bracelet en acier inoxydable et mouvement précis.", "it": "Orologio di lusso dal design senza tempo, con cinturino in acciaio inox e movimento preciso."}	{"cn": "不锈钢材质，石英机芯，防水深度50米", "de": "Edelstahl, Quarzuhrwerk, wasserdicht bis 50 Meter", "en": "Stainless steel, quartz movement, water resistant up to 50m", "es": "Acero inoxidable, movimiento de cuarzo, resistente al agua hasta 50m", "fr": "Acier inoxydable, mouvement quartz, étanche jusqu'à 50m", "it": "Acciaio inox, movimento quarzo, resistente all'acqua fino a 50m"}	249.99	70	84
24	AI-Powered Smart Assistant	FutureTech	{"cn": "语音控制智能助手，具备人工智能功能和智能家居控制。", "de": "Sprachgesteuerte Smartwatch mit KI-Funktionen und Smart-Home-Steuerung.", "en": "Voice-controlled smart assistant with AI capabilities and home automation.", "es": "Asistente inteligente controlado por voz con funciones de IA y automatización del hogar.", "fr": "Assistant intelligent contrôlé par la voix avec fonctionnalités IA et domotique.", "it": "Assistente intelligente controllabile a voce con funzioni AI e automazione domestica."}	{"cn": "内置麦克风，支持Wi-Fi/Ethernet，兼容Alexa/Google Assistant", "de": "Integriertes Mikrofon, Wi-Fi/Ethernet, kompatibel mit Alexa/Google Assistant", "en": "Built-in microphone, Wi-Fi/Ethernet, compatible with Alexa/Google Assistant", "es": "Micrófono integrado, Wi-Fi/Ethernet, compatible con Alexa/Google Assistant", "fr": "Micro intégré, Wi-Fi/Ethernet, compatible avec Alexa/Google Assistant", "it": "Microfono integrato, Wi-Fi/Ethernet, compatibile con Alexa/Google Assistant"}	199.99	90	101
25	Casual Denim Jacket (Women's)	FashionBloom	{"cn": "高品质牛仔夹克，休闲百搭造型的完美选择。", "de": "Hochwertige Jeansjacke, perfekt für einen lässigen und vielseitigen Look.", "en": "High-quality denim jacket, perfect for a casual and versatile look.", "es": "Chaqueta vaquera de alta calidad, perfecta para un look casual y versátil.", "fr": "Veste en jean de haute qualité, parfaite pour un look décontracté et polyvalent.", "it": "Giacca in denim di alta qualità, perfetta per un look casual e versatile."}	{"cn": "100%棉，中度水洗，标准版型，提供多种尺码选择。", "de": "100% Baumwolle, mittlere Waschung, normale Passform, in verschiedenen Größen erhältlich.", "en": "100% cotton, medium wash, regular fit, available in various sizes.", "es": "100% algodón, lavado medio, corte regular, disponible en varias tallas.", "fr": "100% coton, délavage moyen, coupe régulière, disponible en différentes tailles.", "it": "100% cotone, lavaggio medio, vestibilità regolare, disponibile in varie taglie."}	65.00	150	31
26	Ergonomic Office Chair	ErgoDesk	{"cn": "符合人体工程学的办公椅，为长时间工作提供最大舒适度和支撑。", "de": "Ergonomischer Bürostuhl für maximalen Komfort und Halt bei langen Arbeitsstunden.", "en": "Ergonomic office chair for maximum comfort and support during long working hours.", "es": "Silla de oficina ergonómica para máxima comodidad y apoyo durante largas horas de trabajo.", "fr": "Chaise de bureau ergonomique pour un confort et un soutien maximum pendant de longues heures de travail.", "it": "Sedia da ufficio ergonomica per massimo comfort e supporto durante lunghe ore di lavoro."}	{"cn": "可调节腰部支撑，3D扶手，透气网布内饰，静音轮。", "de": "Verstellbare Lordosenstütze, 3D-Armlehnen, atmungsaktiver Netzbezug, geräuschlose Rollen.", "en": "Adjustable lumbar support, 3D armrests, breathable mesh upholstery, silent wheels.", "es": "Soporte lumbar ajustable, reposabrazos 3D, tapicería de malla transpirable, ruedas silenciosas.", "fr": "Soutien lombaire réglable, accoudoirs 3D, revêtement en maille respirante, roulettes silencieuses.", "it": "Supporto lombare regolabile, braccioli 3D, rivestimento in mesh traspirante, ruote silenziose."}	149.99	70	48
28	Wooden Building Blocks Set (100 pcs)	PlayfulPals	{"cn": "木制积木套装，激发儿童创造力和运动技能。", "de": "Holzbausteine-Set zur Förderung der Kreativität und motorischen Fähigkeiten von Kindern.", "en": "Wooden building blocks set to stimulate children's creativity and motor skills.", "es": "Set de bloques de construcción de madera para estimular la creatividad y las habilidades motoras de los niños.", "fr": "Ensemble de blocs de construction en bois pour stimuler la créativité et la motricité des enfants.", "it": "Set di blocchi di costruzione in legno per stimolare la creatività e le abilità motorie dei bambini."}	{"cn": "100块，天然木材，无毒涂料，建议年龄3岁以上。", "de": "100 Teile, Naturholz, ungiftige Farben, Altersempfehlung 3+.", "en": "100 pieces, natural wood, non-toxic paints, recommended age 3+.", "es": "100 piezas, madera natural, pinturas no tóxicas, edad recomendada 3+.", "fr": "100 pièces, bois naturel, peintures non toxiques, âge recommandé 3+.", "it": "100 pezzi, legno naturale, vernici atossiche, età consigliata 3+."}	29.99	200	55
29	Anti-Aging Eye Cream	YouthEssence	{"cn": "眼霜，减少皱纹、浮肿和黑眼圈，令双眼更显年轻。", "de": "Augenkonturcreme zur Reduzierung von Falten, Schwellungen und Augenringen für ein jüngeres Aussehen.", "en": "Eye contour cream to reduce wrinkles, puffiness, and dark circles, for a younger look.", "es": "Crema para el contorno de ojos para reducir arrugas, bolsas y ojeras, para un aspecto más joven.", "fr": "Crème contour des yeux pour réduire les rides, les poches et les cernes, pour un regard plus jeune.", "it": "Crema contorno occhi per ridurre rughe, borse e occhiaie, per uno sguardo più giovane."}	{"cn": "含透明质酸和肽，15毫升，适用于所有肤质。", "de": "Mit Hyaluronsäure und Peptiden, 15ml, für alle Hauttypen.", "en": "With hyaluronic acid and peptides, 15ml, for all skin types.", "es": "Con ácido hialurónico y péptidos, 15 ml, para todo tipo de piel.", "fr": "Avec acide hyaluronique et peptides, 15ml, pour tous types de peau.", "it": "Con acido ialuronico e peptidi, 15ml, per tutti i tipi di pelle."}	34.50	180	57
30	Sterling Silver Pendant Necklace	ElegantGems	{"cn": "925纯银吊坠项链，设计优雅简约。", "de": "Halskette mit 925 Sterling Silber Anhänger, elegantes und minimalistisches Design.", "en": "Necklace with 925 sterling silver pendant, elegant and minimalist design.", "es": "Collar con colgante de plata de ley 925, diseño elegante y minimalista.", "fr": "Collier avec pendentif en argent sterling 925, design élégant et minimaliste.", "it": "Collana con ciondolo in argento sterling 925, design elegante e minimalista."}	{"cn": "925纯银，链长45厘米，心形吊坠。", "de": "925 Sterling Silber, 45cm Kettenlänge, herzförmiger Anhänger.", "en": "925 sterling silver, 45cm chain length, heart-shaped pendant.", "es": "Plata de ley 925, 45 cm de longitud de cadena, colgante en forma de corazón.", "fr": "Argent sterling 925, longueur de chaîne 45cm, pendentif en forme de cœur.", "it": "Argento sterling 925, lunghezza catena 45cm, ciondolo a forma di cuore."}	45.00	90	80
31	Smart Robot Vacuum Cleaner	CleanBot	{"cn": "带激光测绘和应用控制的智能扫地机器人。", "de": "Intelligenter Roboterstaubsauger mit Laser-Mapping und App-Steuerung.", "en": "Smart robot vacuum cleaner with laser mapping and app control.", "es": "Robot aspirador inteligente con mapeo láser y control por aplicación.", "fr": "Aspirateur robot intelligent avec cartographie laser et contrôle via application.", "it": "Aspirapolvere robot intelligente con mappatura laser e controllo tramite app."}	{"cn": "2500Pa吸力，150分钟电池续航，兼容Alexa/Google Assistant。", "de": "2500Pa Saugleistung, 150min Akkulaufzeit, Alexa/Google Assistant kompatibel.", "en": "2500Pa suction power, 150min battery life, Alexa/Google Assistant compatible.", "es": "2500Pa de potencia de succión, 150 min de duración de la batería, compatible con Alexa/Google Assistant.", "fr": "Puissance d'aspiration de 2500Pa, autonomie de 150min, compatible Alexa/Google Assistant.", "it": "Potenza di aspirazione 2500Pa, durata batteria 150min, compatibile con Alexa/Google Assistant."}	299.00	60	99
32	Portable Bluetooth Speaker	SoundWave	{"cn": "便携式蓝牙音箱，音质强劲，电池续航持久。", "de": "Tragbarer Bluetooth-Lautsprecher mit kraftvollem Klang und langer Akkulaufzeit.", "en": "Portable Bluetooth speaker with powerful sound and long battery life.", "es": "Altavoz Bluetooth portátil con sonido potente y batería de larga duración.", "fr": "Enceinte Bluetooth portable avec un son puissant et une longue autonomie de batterie.", "it": "Altoparlante Bluetooth portatile con suono potente e lunga durata della batteria."}	{"cn": "蓝牙5.0，20小时电池续航，IPX7防水，内置麦克风。", "de": "Bluetooth 5.0, 20h Akku, IPX7 wasserdicht, integriertes Mikrofon.", "en": "Bluetooth 5.0, 20h battery, IPX7 waterproof, built-in microphone.", "es": "Bluetooth 5.0, 20 horas de batería, resistente al agua IPX7, micrófono incorporado.", "fr": "Bluetooth 5.0, batterie 20h, étanche IPX7, microphone intégré.", "it": "Bluetooth 5.0, batteria 20h, impermeabile IPX7, microfono integrato."}	59.99	180	19
33	Cookbook: Italian Classics	FoodiePress	{"cn": "意大利经典食谱，从开胃菜到甜点。", "de": "Kochbuch mit den besten Rezepten der italienischen Küche, von Vorspeisen bis Desserts.", "en": "Cookbook with the best Italian cuisine recipes, from appetizers to desserts.", "es": "Libro de cocina con las mejores recetas de la cocina italiana, desde aperitivos hasta postres.", "fr": "Livre de cuisine avec les meilleures recettes de la cuisine italienne, des entrées aux desserts.", "it": "Ricettario con le migliori ricette della cucina italiana, da antipasti a dolci."}	{"cn": "精装，250页，100多道食谱，彩色插图。", "de": "Hardcover, 250 Seiten, über 100 Rezepte, Farbillustrationen.", "en": "Hardcover, 250 pages, over 100 recipes, color illustrations.", "es": "Tapa dura, 250 páginas, más de 100 recetas, ilustraciones a color.", "fr": "Couverture rigide, 250 pages, plus de 100 recettes, illustrations couleur.", "it": "Copertina rigida, 250 pagine, oltre 100 ricette, illustrazioni a colori."}	24.99	100	25
34	Running Shoes (Men's)	StrideFit	{"cn": "轻便缓震跑鞋，适合日常训练。", "de": "Leichte und gedämpfte Laufschuhe, ideal für das tägliche Training.", "en": "Lightweight and cushioned running shoes, ideal for daily training.", "es": "Zapatillas de running ligeras y amortiguadas, ideales para el entrenamiento diario.", "fr": "Chaussures de course légères et amorties, idéales pour l'entraînement quotidien.", "it": "Scarpe da corsa leggere e ammortizzate, ideali per l'allenamento quotidiano."}	{"cn": "透气网眼鞋面，防滑橡胶鞋底，多种颜色和尺码。", "de": "Atmungsaktives Mesh-Obermaterial, rutschfeste Gummisohle, verschiedene Farben und Größen.", "en": "Breathable mesh upper, non-slip rubber sole, various colors and sizes.", "es": "Parte superior de malla transpirable, suela de goma antideslizante, varios colores y tallas.", "fr": "Tige en mesh respirant, semelle en caoutchouc antidérapante, différentes couleurs et tailles.", "it": "Tomaia in mesh traspirante, suola in gomma antiscivolo, vari colori e taglie."}	89.00	130	70
35	Crafting Kit: DIY Jewelry Making	CreativeHands	{"cn": "DIY珠宝制作工具包，含珠子和配件，打造个性化珠宝。", "de": "Komplettset zur Herstellung Ihres personalisierten Schmucks mit Perlen und Accessoires.", "en": "Complete kit for creating your personalized jewelry with beads and accessories.", "es": "Kit completo para crear tus joyas personalizadas con cuentas y accesorios.", "fr": "Kit complet pour créer vos bijoux personnalisés avec des perles et des accessoires.", "it": "Kit completo per creare i tuoi gioielli personalizzati con perline e accessori."}	{"cn": "包含各类珠子、线材、钳子、说明书，适合所有年龄段。", "de": "Enthält verschiedene Perlen, Drähte, Zangen, Anleitungen, für alle Altersgruppen.", "en": "Includes assorted beads, wires, pliers, instructions, for all ages.", "es": "Incluye cuentas surtidas, alambres, alicates, instrucciones, para todas las edades.", "fr": "Comprend des perles assorties, des fils, des pinces, des instructions, pour tous les âges.", "it": "Include perline assortite, fili, pinze, istruzioni, per tutte le età."}	19.99	110	75
36	Gaming Keyboard RGB Mechanical	GameForce	{"cn": "RGB机械游戏键盘，带可自定义RGB灯光和灵敏轴体。", "de": "Mechanische Gaming-Tastatur mit anpassbarer RGB-Beleuchtung und reaktionsschnellen Switches.", "en": "Mechanical gaming keyboard with customizable RGB lighting and responsive switches.", "es": "Teclado mecánico para juegos con iluminación RGB personalizable e interruptores responsivos.", "fr": "Clavier gaming mécanique avec éclairage RGB personnalisable et commutateurs réactifs.", "it": "Tastiera meccanica da gaming con illuminazione RGB personalizzabile e switch reattivi."}	{"cn": "蓝/红机械轴，RGB背光，可编程宏按键，防鬼影。", "de": "Blaue/rote mechanische Schalter, RGB-Hintergrundbeleuchtung, programmierbare Makrotasten, Anti-Ghosting.", "en": "Blue/Red mechanical switches, RGB backlighting, programmable macro keys, anti-ghosting.", "es": "Interruptores mecánicos azules/rojos, retroiluminación RGB, teclas macro programables, anti-ghosting.", "fr": "Commutateurs mécaniques bleus/rouges, rétroéclairage RGB, touches macro programmables, anti-ghosting.", "it": "Switch meccanici Blue/Red, retroilluminazione RGB, tasti macro programmabili, anti-ghosting."}	79.99	90	19
37	Prime Video Annual Membership	Amazon Prime	{"cn": "享受无限电影和电视剧流媒体体验。", "de": "Genieße unbegrenztes Streaming von Filmen und Serien mit Amazon Prime Video.", "en": "Enjoy unlimited streaming of movies and series with Amazon Prime Video.", "es": "Disfruta de transmisión ilimitada de películas y series con Amazon Prime Video.", "fr": "Profitez du streaming illimité de films et séries avec Amazon Prime Video.", "it": "Goditi lo streaming illimitato di film e serie con Amazon Prime Video."}	{"cn": "12个月会员资格，支持高清/4K流媒体、离线观看、多设备同步。", "de": "12-Monats-Mitgliedschaft, HD/4K-Streaming, Offline-Ansicht, Multi-Geräte-Unterstützung.", "en": "12-month membership, HD/4K streaming, offline viewing, multi-device support.", "es": "Membresía de 12 meses, reproducción en HD/4K, visualización sin conexión, soporte multi-dispositivo.", "fr": "Abonnement de 12 mois, streaming HD/4K, visionnage hors ligne, prise en charge multi-appareils.", "it": "Abbonamento annuale, streaming HD/4K, visione offline, compatibile con più dispositivi."}	99.99	1000	1
38	Prime Video Monthly Membership	Amazon Prime	{"cn": "享受无限电影和电视剧流媒体体验。", "de": "Genieße unbegrenztes Streaming von Filmen und Serien mit Amazon Prime Video.", "en": "Enjoy unlimited streaming of movies and series with Amazon Prime Video.", "es": "Disfruta de transmisión ilimitada de películas y series con Amazon Prime Video.", "fr": "Profitez du streaming illimitato di film et séries con Amazon Prime Video.", "it": "Goditi lo streaming illimitato di film e serie con Amazon Prime Video."}	{"cn": "30天会员资格，支持高清/4K流媒体、离线观看、多设备同步。", "de": "30-Tage-Mitgliedschaft, HD/4K-Streaming, Offline-Ansicht, Multi-Geräte-Unterstützung.", "en": "30-day membership, HD/4K streaming, offline viewing, multi-device support.", "es": "Membresía de 30 días, reproducción en HD/4K, visualización sin conexión, soporte multi-dispositivo.", "fr": "Abonnement de 30 jours, streaming HD/4K, visionnage hors ligne, prise en charge multi-appareils.", "it": "Membro per 30 giorni, streaming HD/4K, visione offline, compatibile con più dispositivi."}	10.99	1000	1
39	Family Prime Music Subscription	Amazon Prime	{"cn": "最多可为6位家庭成员提供无限音乐访问服务。", "de": "Unbegrenzter Zugang zu Millionen von Songs für bis zu 6 Familienmitglieder.", "en": "Unlimited access to millions of songs for up to 6 family members.", "es": "Acceso ilimitado a millones de canciones para hasta 6 miembros de la familia.", "fr": "Accès illimité à des millions de chansons pour jusqu'à 6 membres de la famille.", "it": "Accesso illimitato a milioni di brani per fino a 6 membri della famiglia."}	{"cn": "最多6名用户，无广告音乐，离线下载，独家专辑。", "de": "Bis zu 6 Nutzer, Musik ohne Werbung, Offline-Downloads, exklusive Alben.", "en": "Up to 6 users, ad-free music, offline downloads, exclusive albums.", "es": "Hasta 6 usuarios, música sin anuncios, descargas offline, álbumes exclusivos.", "fr": "Jusqu'à 6 utilisateurs, musique sans publicité, téléchargements hors ligne, albums exclusifs.", "it": "Fino a 6 utenti, musica senza pubblicità, download offline, album esclusivi."}	14.99	500	2
40	Same-Day Prime Delivery Pass	Amazon Prime	{"cn": "适用于所有符合条件商品的当日达服务。", "de": "Erhalte Tageslieferung auf berechtigte Artikel im gesamten Shop.", "en": "Get same-day delivery on eligible items across the store.", "es": "Obtén envío el mismo día en artículos elegibles en toda la tienda.", "fr": "Bénéficiez d'une livraison le jour même sur les articles éligibles dans tout le magasin.", "it": "Ricevi consegna nello stesso giorno su articoli idonei in tutto il negozio."}	{"cn": "无需最低订单金额，主要城市可用。", "de": "Tageslieferung, keine Mindestbestellung, verfügbar in Großstädten.", "en": "Same-day delivery, no minimum order, available in major cities.", "es": "Entrega el mismo día, sin pedido mínimo, disponible en ciudades principales.", "fr": "Livraison le jour même, pas de commande minimale, disponible dans les grandes villes.", "it": "Consegna lo stesso giorno, nessun ordine minimo, disponibile nelle principali città."}	19.99	800	3
42	Prime Gaming Exclusive Game Bundle	Amazon Prime	{"cn": "包含专属游戏、游戏内物品和仅限会员的福利。", "de": "Exklusive Spiele, Ingame-Loot und Mitgliedsvorteile.", "en": "Exclusive games, in-game loot, and member-only perks.", "es": "Juegos exclusivos, botín dentro del juego y beneficios solo para miembros.", "fr": "Jeux exclusifs, butin en jeu et avantages réservés aux membres.", "it": "Giochi esclusivi, oggetti speciali nel gioco e vantaggi riservati ai membri."}	{"cn": "每月游戏包，独家皮肤，抢先测试机会。", "de": "Monatliche Spielepakete, exklusive Skins, Early Access zu Betas.", "en": "Monthly game bundle, exclusive skins, early access to beta tests.", "es": "Paquete mensual de juegos, skins exclusivas, acceso temprano a betas.", "fr": "Pack mensuel de jeux, skins exclusifs, accès prioritaire aux tests bêta.", "it": "Bundle mensili di giochi, skin esclusive, accesso anticipato alle beta."}	8.99	600	5
41	Prime Reading EBook Library Access	Amazon Prime	{"cn": "随时随地访问数千本电子书、杂志和漫画。", "de": "Greife jederzeit auf Tausende von Büchern, Zeitschriften und Comics zu.", "en": "Access thousands of books, magazines, and comics anytime.", "es": "Accede a miles de libros, revistas y cómics en cualquier momento.", "fr": "Accédez à des milliers de livres, magazines et bandes dessinées à tout moment.", "it": "Accedi a migliaia di libri, riviste e fumetti in qualsiasi momento."}	{"cn": "数以千计的书籍，即时访问，兼容所有设备。", "de": "Tausende Titel, sofortiger Zugriff, kompatibel mit allen Geräten.", "en": "Thousands of titles, instant access, compatible with all devices.", "es": "Miles de títulos, acceso instantáneo, compatible con todos los dispositivos.", "fr": "Des milliers de titres, accès immédiat, compatible avec tous les appareils.", "it": "Migliaia di titoli, accesso immediato, compatibile con tutti i dispositivi."}	12.99	700	4
43	Lightning Deal Electronics Bundle	Amazon Flash Sales	{"cn": "限时电子产品套装，为快速购买者提供大幅折扣。", "de": "Zeitlich begrenztes Elektronik-Bundle mit massiven Rabatten für schnelle Käufer.", "en": "Limited-time electronics bundle with massive discounts for quick buyers.", "es": "Paquete de electrónicos por tiempo limitado con descuentos masivos para compradores rápidos.", "fr": "Pack électronique à durée limitée avec des remises massives pour les acheteurs rapides.", "it": "Bundle elettronico a tempo limitato con sconti enormi per acquirenti veloci."}	{"cn": "6小时闪购，高达70%折扣，限量供应，即时结账。", "de": "6-Stunden Flash Sale, bis zu 70% Rabatt, begrenzte Mengen, sofortiger Checkout.", "en": "6-hour flash sale, up to 70% off, limited quantities, instant checkout.", "es": "Venta flash de 6 horas, hasta 70% de descuento, cantidades limitadas, pago instantáneo.", "fr": "Vente flash de 6 heures, jusqu'à 70% de réduction, quantités limitées, paiement instantané.", "it": "Vendita lampo di 6 ore, fino al 70% di sconto, quantità limitate, checkout istantaneo."}	199.99	50	7
44	Top Bestsellers Discount Pack	Amazon Bestsellers	{"cn": "亚马逊热销产品精选合集，特殊折扣价格。", "de": "Kuratierte Sammlung von Amazons meistverkauften Produkten zu speziellen Rabattpreisen.", "en": "Curated collection of Amazon's top-selling products at special discount prices.", "es": "Colección curada de los productos más vendidos de Amazon a precios de descuento especiales.", "fr": "Collection organisée des produits les plus vendus d'Amazon à prix réduits spéciaux.", "it": "Collezione curata dei prodotti più venduti di Amazon a prezzi scontati speciali."}	{"cn": "前100名畅销书，25-50%折扣，包含客户评价，快速送货。", "de": "Top 100 Bestseller, 25-50% Rabatte, Kundenbewertungen enthalten, schneller Versand.", "en": "Top 100 bestsellers, 25-50% discounts, customer reviews included, fast shipping.", "es": "Top 100 más vendidos, descuentos 25-50%, reseñas de clientes incluidas, envío rápido.", "fr": "Top 100 des meilleures ventes, remises 25-50%, avis clients inclus, expédition rapide.", "it": "Top 100 bestseller, sconti 25-50%, recensioni clienti incluse, spedizione veloce."}	49.99	300	9
45	End-of-Season Clearance Mega Sale	Amazon Warehouse	{"cn": "季节性和库存过剩商品大幅折扣的大型清仓销售。", "de": "Massive Räumungsverkauf mit tiefen Rabatten auf saisonale und überbestandene Artikel.", "en": "Massive clearance sale with deep discounts on seasonal and overstocked items.", "es": "Venta masiva de liquidación con descuentos profundos en artículos estacionales y con exceso de inventario.", "fr": "Vente massive de liquidation avec des remises importantes sur les articles saisonniers et en surstock.", "it": "Vendita di liquidazione massiva con sconti profondi su articoli stagionali e in eccesso di magazzino."}	{"cn": "高达80%折扣，最终销售商品，不退货，售完为止，批量折扣可用。", "de": "Bis zu 80% Rabatt, Endverkaufsartikel, keine Rückgabe, solange Vorrat reicht, Mengenrabatte verfügbar.", "en": "Up to 80% off, final sale items, no returns, while supplies last, bulk discounts available.", "es": "Hasta 80% de descuento, artículos de venta final, sin devoluciones, hasta agotar existencias, descuentos por volumen disponibles.", "fr": "Jusqu'à 80% de réduction, articles de vente finale, pas de retours, dans la limite des stocks, remises en vrac disponibles.", "it": "Fino all'80% di sconto, articoli in vendita finale, nessun reso, fino ad esaurimento scorte, sconti bulk disponibili."}	19.99	1500	10
46	Romanzo di Fantascienza - 'L'Ultima Stella'	Casa Editrice Futurama	{"cn": "一部史诗般的科幻小说，探索人类在一个垂死宇宙中的最后希望。", "de": "Ein epischer Science-Fiction-Roman, der die letzte Hoffnung der Menschheit in einem sterbenden Universum erforscht.", "en": "An epic science fiction novel exploring humanity's last hope in a dying universe.", "es": "Una novela épica de ciencia ficción que explora la última esperanza de la humanidad en un universo moribundo.", "fr": "Un roman de science-fiction épique explorant le dernier espoir de l'humanité dans un univers mourant.", "it": "Un epico romanzo di fantascienza che esplora l'ultima speranza dell'umanità in un universo morente."}	{"cn": "精装版，500页，纽约时报畅销书，续集已定于明年发布。", "de": "Gebundene Ausgabe, 500 Seiten, New York Times Bestseller, Fortsetzung für nächstes Jahr angekündigt.", "en": "Hardcover edition, 500 pages, New York Times Bestseller, sequel announced for next year.", "es": "Edición de tapa dura, 500 páginas, Bestseller del New York Times, secuela anunciada para el próximo año.", "fr": "Édition reliée, 500 pages, best-seller du New York Times, suite annoncée pour l'année prochaine.", "it": "Edizione rilegata, 500 pagine, Bestseller del New York Times, sequel annunciato per il prossimo anno."}	24.99	1000	22
47	Saggio - 'Il Potere delle Abitudini'	Editore Conoscenza	{"cn": "一本富有洞察力的非虚构书籍，深入探讨习惯形成和改变的科学。", "de": "Ein aufschlussreiches Sachbuch, das die Wissenschaft der Gewohnheitsbildung und -veränderung erforscht.", "en": "An insightful non-fiction book that delves into the science of habit formation and change.", "es": "Un libro de no ficción revelador que profundiza en la ciencia de la formación y el cambio de hábitos.", "fr": "Un livre de non-fiction perspicace qui explore la science de la formation et du changement des habitudes.", "it": "Un libro di saggistica illuminante che approfondisce la scienza della formazione e del cambiamento delle abitudini."}	{"cn": "平装版，320页，包含实践练习，心理学家推荐。", "de": "Taschenbuchausgabe, 320 Seiten, inklusive praktischer Übungen, von Psychologen empfohlen.", "en": "Paperback edition, 320 pages, includes practical exercises, recommended by psychologists.", "es": "Edición de bolsillo, 320 páginas, incluye ejercicios prácticos, recomendado por psicólogos.", "fr": "Édition de poche, 320 pages, comprend des exercices pratiques, recommandé par des psychologues.", "it": "Edizione tascabile, 320 pagine, include esercizi pratici, consigliato dagli psicologi."}	16.50	800	23
48	Libro per Bambini - 'Il Drago Curioso'	Edizioni Arcobaleno	{"cn": "一本关于友善龙冒险的迷人儿童书，里面充满了色彩鲜艳的插图。", "de": "Ein bezauberndes Kinderbuch über die Abenteuer eines freundlichen Drachen, voller farbenfroher Illustrationen.", "en": "A charming children's book about a friendly dragon's adventures, full of colorful illustrations.", "es": "Un encantador libro infantil sobre las aventuras de un dragón amigable, lleno de ilustraciones coloridas.", "fr": "Un charmant livre pour enfants sur les aventures d'un dragon amical, rempli d'illustrations colorées.", "it": "Un affascinante libro per bambini sulle avventure di un drago amichevole, pieno di illustrazioni colorate."}	{"cn": "精装，48页，适合3-7岁儿童，教导友谊和勇气。", "de": "Gebundene Ausgabe, 48 Seiten, geeignet für 3-7 Jahre, lehrt über Freundschaft und Mut.", "en": "Hardcover, 48 pages, suitable for ages 3-7, teaches about friendship and courage.", "es": "Tapa dura, 48 páginas, apto para edades de 3 a 7 años, enseña sobre la amistad y el coraje.", "fr": "Relié, 48 pages, convient aux 3-7 ans, enseigne l'amitié et le courage.", "it": "Rilegato, 48 pagine, adatto per età 3-7 anni, insegna l'amicizia e il coraggio."}	12.99	1200	24
49	Ricettario - 'Sapori d'Italia'	Gusto Edizioni	{"cn": "一本全面的食谱，收录了来自不同地区的正宗意大利菜谱。", "de": "Ein umfassendes Kochbuch mit authentischen italienischen Rezepten aus verschiedenen Regionen.", "en": "A comprehensive cookbook featuring authentic Italian recipes from various regions.", "es": "Un completo libro de cocina con recetas italianas auténticas de varias regiones.", "fr": "Un livre de cuisine complet présentant des recettes italiennes authentiques de différentes régions.", "it": "Un ricettario completo con ricette autentiche italiane di varie regioni."}	{"cn": "螺旋装订，280页，包含素食和纯素选项，精美的食物摄影。", "de": "Spiralbindung, 280 Seiten, inklusive vegetarischer und veganer Optionen, atemberaubende Food-Fotografie.", "en": "Spiral-bound, 280 pages, includes vegetarian and vegan options, stunning food photography.", "es": "Encuadernación en espiral, 280 páginas, incluye opciones vegetarianas y veganas, impresionantes fotografías de alimentos.", "fr": "Reliure spirale, 280 pages, comprend des options végétariennes et végétaliennes, superbes photographies culinaires.", "it": "Rilegato a spirale, 280 pagine, include opzioni vegetariane e vegane, splendide fotografie di cibo."}	29.99	700	25
50	Graphic Novel - 'Il Cavaliere Silenzioso'	Fumetti Fantastici	{"cn": "一部广受好评的图画小说，拥有令人惊叹的艺术作品和引人入胜的奇幻故事。", "de": "Ein von der Kritik gefeierter Graphic Novel mit atemberaubenden Kunstwerken und einer fesselnden Fantasy-Geschichte.", "en": "A critically acclaimed graphic novel with stunning artwork and a compelling fantasy story.", "es": "Una novela gráfica aclamada por la crítica con impresionantes ilustraciones y una convincente historia de fantasía.", "fr": "Un roman graphique acclamé par la critique avec des illustrations époustouflantes et une histoire fantastique captivante.", "it": "Una graphic novel acclamata dalla critica con illustrazioni mozzafiato e una storia fantasy avvincente."}	{"cn": "全彩，180页，完美装订，适合青少年和成人。", "de": "Vollfarbig, 180 Seiten, klebegebunden, geeignet für junge Erwachsene und Erwachsene.", "en": "Full color, 180 pages, perfect bound, suitable for young adults and adults.", "es": "A todo color, 180 páginas, encuadernación perfecta, apto para jóvenes y adultos.", "fr": "Couleurs, 180 pages, dos carré collé, convient aux jeunes adultes et aux adultes.", "it": "A colori, 180 pagine, brossura cucita, adatto per giovani adulti e adulti."}	19.99	600	26
51	Libro Educativo - 'Programmazione per Principianti'	Apprendimento Facile	{"cn": "编程入门指南，非常适合没有经验的初学者。", "de": "Ein Einführungsleitfaden zur Programmierung, perfekt für absolute Anfänger ohne Vorkenntnisse.", "en": "An introductory guide to programming, perfect for absolute beginners with no prior experience.", "es": "Una guía introductoria a la programación, perfecta para principiantes absolutos sin experiencia previa.", "fr": "Un guide d'introduction à la programmation, parfait pour les débutants absolus sans expérience préalable.", "it": "Una guida introduttiva alla programmazione, perfetta per i principianti assoluti senza esperienza precedente."}	{"cn": "平装，400页，包含编码示例和练习，提供在线资源。", "de": "Softcover, 400 Seiten, inklusive Codebeispiele und Übungen, Online-Ressourcen verfügbar.", "en": "Softcover, 400 pages, includes coding examples and exercises, online resources available.", "es": "Tapa blanda, 400 páginas, incluye ejemplos de código y ejercicios, recursos en línea disponibles.", "fr": "Broché, 400 pages, comprend des exemples de code et des exercices, ressources en ligne disponibles.", "it": "Brossura, 400 pagine, include esempi di codice ed esercizi, risorse online disponibili."}	35.00	900	27
52	Biografia - 'Il Viaggio di una Vita'	Storie Vere Edizioni	{"cn": "一本引人入胜的传记，讲述了一位著名冒险家的非凡人生。", "de": "Eine fesselnde Biografie, die das außergewöhnliche Leben eines renommierten Abenteurers nacherzählt.", "en": "A compelling biography recounting the extraordinary life of a renowned adventurer.", "es": "Una biografía convincente que relata la extraordinaria vida de un renombrado aventurero.", "fr": "Une biographie captivante racontant la vie extraordinaire d'un aventurier de renom.", "it": "Una biografia avvincente che racconta la vita straordinaria di un rinomato avventuriero."}	{"cn": "精装，450页，包含稀有照片，受到评论家好评。", "de": "Gebundene Ausgabe, 450 Seiten, inklusive seltener Fotografien, von Kritikern gelobt.", "en": "Hardcover, 450 pages, includes rare photographs, praised by critics.", "es": "Tapa dura, 450 páginas, incluye fotografías raras, elogiado por la crítica.", "fr": "Relié, 450 pages, comprend des photographies rares, salué par la critique.", "it": "Rilegato, 450 pagine, include fotografie rare, elogiato dalla critica."}	27.99	550	28
53	Camicia Casual da Uomo in Lino	Stile Uomo	{"cn": "男士轻薄透气的亚麻衬衫，非常适合夏季休闲穿着。", "de": "Leichtes und atmungsaktives Leinenhemd für Herren, perfekt für lässige Sommerkleidung.", "en": "Lightweight and breathable linen shirt for men, perfect for summer casual wear.", "es": "Camisa de lino ligera y transpirable para hombre, perfecta para el uso casual de verano.", "fr": "Chemise en lin légère et respirante pour homme, parfaite pour les tenues décontractées d'été.", "it": "Camicia di lino leggera e traspirante da uomo, perfetta per l'abbigliamento casual estivo."}	{"cn": "100%亚麻，有S-XXL尺码，多种颜色，可机洗。", "de": "100% Leinen, erhältlich in den Größen S-XXL, verschiedene Farben, maschinenwaschbar.", "en": "100% linen, available in sizes S-XXL, multiple colors, machine washable.", "es": "100% lino, disponible en tallas S-XXL, varios colores, lavable a máquina.", "fr": "100% lin, disponible dans les tailles S-XXL, plusieurs couleurs, lavable en machine.", "it": "100% lino, disponibile nelle taglie S-XXL, più colori, lavabile in lavatrice."}	45.00	800	30
54	Vestito Estivo Floreale da Donna	Moda Donna	{"cn": "优雅的女士花卉印花夏装，打造时尚舒适造型的完美选择。", "de": "Elegantes Sommerkleid mit Blumenmuster für Damen, perfekt für einen schicken und bequemen Look.", "en": "Elegant floral print summer dress for women, perfect for a chic and comfortable look.", "es": "Elegante vestido de verano con estampado floral para mujer, perfecto para un look elegante y cómodo.", "fr": "Robe d'été élégante à imprimé floral pour femme, parfaite pour un look chic et confortable.", "it": "Elegante vestito estivo con stampa floreale da donna, perfetto per un look chic e confortevole."}	{"cn": "涤纶混纺，有XS-XL尺码，及膝，隐形拉链。", "de": "Polyester-Mischung, erhältlich in den Größen XS-XL, knielang, verdeckter Reißverschluss.", "en": "Polyester blend, available in sizes XS-XL, knee-length, concealed zipper.", "es": "Mezcla de poliéster, disponible en tallas XS-XL, hasta la rodilla, cremallera oculta.", "fr": "Mélange de polyester, disponible dans les tailles XS-XL, longueur genou, fermeture éclair dissimulée.", "it": "Misto poliestere, disponibile nelle taglie XS-XL, lunghezza al ginocchio, cerniera nascosta."}	59.99	1000	31
55	Set Tuta Sportiva per Bambini	KidsPlay	{"cn": "舒适耐用的儿童运动服套装，非常适合玩耍或休闲穿着。", "de": "Bequemer und strapazierfähiger Trainingsanzug für aktive Kinder, perfekt zum Spielen oder für die Freizeit.", "en": "Comfortable and durable tracksuit set for active kids, perfect for play or casual wear.", "es": "Conjunto de chándal cómodo y duradero para niños activos, perfecto para jugar o para el uso casual.", "fr": "Ensemble de survêtement confortable et durable pour enfants actifs, parfait pour le jeu ou les tenues décontractées.", "it": "Comodo e resistente set tuta per bambini attivi, perfetto per giocare o per l'abbigliamento casual."}	{"cn": "棉混纺，有2T-10Y尺码，弹性腰带，可机洗。", "de": "Baumwollmischung, erhältlich in den Größen 2T-10Y, elastischer Bund, maschinenwaschbar.", "en": "Cotton blend, available in sizes 2T-10Y, elastic waistband, machine washable.", "es": "Mezcla de algodón, disponible en tallas 2T-10Y, cintura elástica, lavable a máquina.", "fr": "Mélange de coton, disponible dans les tailles 2T-10Y, taille élastique, lavable en machine.", "it": "Misto cotone, disponibile nelle taglie 2T-10Y, vita elasticizzata, lavabile in lavatrice."}	34.99	700	32
56	Sneakers da Corsa Uomo Ultra Leggere	SpeedStep	{"cn": "超轻量男士跑鞋，专为最大舒适度和性能设计。", "de": "Ultraleichte Laufschuhe für Herren, entwickelt für maximalen Komfort und Leistung.", "en": "Ultra-lightweight running sneakers for men, designed for maximum comfort and performance.", "es": "Zapatillas de running ultraligeras para hombre, diseñadas para máxima comodidad y rendimiento.", "fr": "Baskets de course ultra-légères pour hommes, conçues pour un confort et des performances maximums.", "it": "Sneakers da corsa ultra leggere da uomo, progettate per il massimo comfort e prestazioni."}	{"cn": "透气网眼鞋面，缓震鞋底，防滑橡胶外底，有美国尺码7-13。", "de": "Atmungsaktives Mesh-Obermaterial, gepolsterte Sohle, rutschfeste Gummilaufsohle, erhältlich in den Größen US 7-13.", "en": "Breathable mesh upper, cushioned sole, anti-slip rubber outsole, available in sizes US 7-13.", "es": "Parte superior de malla transpirable, suela acolchada, suela de goma antideslizante, disponible en tallas US 7-13.", "fr": "Tige en mesh respirant, semelle amortie, semelle extérieure en caoutchouc antidérapante, disponible dans les tailles US 7-13.", "it": "Tomaia in mesh traspirante, suola ammortizzata, suola in gomma antiscivolo, disponibile nelle taglie US 7-13."}	89.99	400	33
57	Cintura in Vera Pelle da Uomo	LeatherCraft	{"cn": "高品质男士真皮腰带，非常适合正式或休闲穿着。", "de": "Hochwertiger Gürtel aus echtem Leder für Herren, perfekt für formelle oder legere Kleidung.", "en": "High-quality genuine leather belt for men, perfect for formal or casual wear.", "es": "Cinturón de cuero genuino de alta calidad para hombre, perfecto para uso formal o casual.", "fr": "Ceinture en cuir véritable de haute qualité pour homme, parfaite pour les tenues formelles ou décontractées.", "it": "Cintura da uomo in vera pelle di alta qualità, perfetta per l'abbigliamento formale o casual."}	{"cn": "100%真皮，耐用搭扣，有多种长度和颜色。", "de": "100% echtes Leder, robuste Schnalle, erhältlich in verschiedenen Längen und Farben.", "en": "100% genuine leather, durable buckle, available in various lengths and colors.", "es": "100% cuero genuino, hebilla duradera, disponible en varias longitudes y colores.", "fr": "100% cuir véritable, boucle durable, disponible en différentes longueurs et couleurs.", "it": "100% vera pelle, fibbia resistente, disponibile in varie lunghezze e colori."}	29.99	600	34
58	Collana con Pendente Cuore in Argento Sterling	Brilliant Gems	{"cn": "优雅的纯银心形吊坠项链，送给挚爱的完美礼物。", "de": "Elegante Halskette mit Herzanhänger aus Sterlingsilber, perfektes Geschenk für einen geliebten Menschen.", "en": "Elegant sterling silver heart pendant necklace, perfect gift for a loved one.", "es": "Elegante collar con colgante de corazón de plata de ley, regalo perfecto para un ser querido.", "fr": "Élégant collier avec pendentif cœur en argent sterling, cadeau parfait pour un être cher.", "it": "Elegante collana con pendente a cuore in argento sterling, regalo perfetto per una persona cara."}	{"cn": "925纯银，低过敏性，可调节链长，附赠礼盒。", "de": "925er Sterlingsilber, hypoallergen, verstellbare Kettenlänge, Lieferung in einer Geschenkbox.", "en": "925 sterling silver, hypoallergenic, adjustable chain length, comes in a gift box.", "es": "Plata de ley 925, hipoalergénico, longitud de cadena ajustable, viene en una caja de regalo.", "fr": "Argent sterling 925, hypoallergénique, longueur de chaîne réglable, livré dans une boîte cadeau.", "it": "Argento sterling 925, ipoallergenico, lunghezza della catena regolabile, viene fornito in una confezione regalo."}	49.99	350	35
59	Borsa a Tracolla in Pelle Vegana	EcoChic Bags	{"cn": "时尚环保的纯素皮革斜挎包，非常适合日常使用。", "de": "Stilvolle und umweltfreundliche Umhängetasche aus veganem Leder, perfekt für den täglichen Gebrauch.", "en": "Stylish and eco-friendly vegan leather crossbody bag, perfect for everyday use.", "es": "Elegante y ecológica bandolera de piel vegana, perfecta para el uso diario.", "fr": "Sac bandoulière élégant et écologique en cuir végétalien, parfait pour un usage quotidien.", "it": "Elegante e ecologica borsa a tracolla in pelle vegana, perfetta per l'uso quotidiano."}	{"cn": "优质纯素皮革，多隔层，可调节肩带，耐用五金件。", "de": "Hochwertiges veganes Leder, mehrere Fächer, verstellbarer Riemen, robuste Hardware.", "en": "High-quality vegan leather, multiple compartments, adjustable strap, durable hardware.", "es": "Piel vegana de alta calidad, múltiples compartimentos, correa ajustable, herrajes duraderos.", "fr": "Cuir végétalien de haute qualité, plusieurs compartiments, sangle réglable, quincaillerie durable.", "it": "Pelle vegana di alta qualità, scomparti multipli, tracolla regolabile, hardware resistente."}	69.00	450	36
60	Orologio da Polso Classico da Uomo	Timeless Watches	{"cn": "经典男士腕表，简约设计，适合任何场合。", "de": "Klassische Herrenarmbanduhr mit minimalistischem Design, passend für jeden Anlass.", "en": "Classic men's wristwatch with a minimalist design, suitable for any occasion.", "es": "Reloj de pulsera clásico para hombre con un diseño minimalista, adecuado para cualquier ocasión.", "fr": "Montre-bracelet classique pour homme avec un design minimaliste, adaptée à toutes les occasions.", "it": "Orologio da polso classico da uomo con un design minimalista, adatto a ogni occasione."}	{"cn": "不锈钢表壳，真皮表带，石英机芯，防水深度50米。", "de": "Edelstahlgehäuse, echtes Lederarmband, Quarzwerk, wasserdicht bis 50m.", "en": "Stainless steel case, genuine leather strap, quartz movement, water-resistant up to 50m.", "es": "Caja de acero inoxidable, correa de cuero genuino, movimiento de cuarzo, resistente al agua hasta 50m.", "fr": "Boîtier en acier inoxydable, bracelet en cuir véritable, mouvement à quartz, résistant à l'eau jusqu'à 50m.", "it": "Cassa in acciaio inossidabile, cinturino in vera pelle, movimento al quarzo, resistente all'acqua fino a 50m."}	120.00	250	37
61	Leggings da Yoga a Vita Alta	FlexFit Apparel	{"cn": "高腰瑜伽裤，专为运动时提供最大柔韧性和舒适度而设计。", "de": "High-Waist Yoga-Leggings für maximale Flexibilität und Komfort beim Training.", "en": "High-waisted yoga leggings designed for maximum flexibility and comfort during workouts.", "es": "Leggings de yoga de cintura alta diseñados para máxima flexibilidad y comodidad durante los entrenamientos.", "fr": "Leggings de yoga taille haute conçus pour une flexibilité et un confort maximum pendant les entraînements.", "it": "Leggings da yoga a vita alta progettati per la massima flessibilità e comfort durante gli allenamenti."}	{"cn": "吸湿排汗面料，四向弹力，隐藏口袋，有XS-XXL尺码。", "de": "Feuchtigkeitsableitendes Material, Vier-Wege-Stretch, versteckte Tasche, erhältlich in den Größen XS-XXL.", "en": "Moisture-wicking fabric, four-way stretch, hidden pocket, available in sizes XS-XXL.", "es": "Tejido que absorbe la humedad, elástico en cuatro direcciones, bolsillo oculto, disponible en tallas XS-XXL.", "fr": "Tissu anti-humidité, extensible dans les quatre sens, poche cachée, disponible dans les tailles XS-XXL.", "it": "Tessuto traspirante, elasticizzato in quattro direzioni, tasca nascosta, disponibile nelle taglie XS-XXL."}	39.99	500	38
62	Giacca Impermeabile Ultraleggera	WeatherProof Gear	{"cn": "轻便且完全防水的夹克，非常适合在多变天气下进行户外活动。", "de": "Leichte und vollständig wasserdichte Jacke, ideal für Outdoor-Aktivitäten bei unvorhersehbarem Wetter.", "en": "Lightweight and fully waterproof jacket, ideal for outdoor activities in unpredictable weather.", "es": "Chaqueta ligera y totalmente impermeable, ideal para actividades al aire libre con clima impredecible.", "fr": "Veste légère et entièrement imperméable, idéale pour les activités de plein air par temps imprévisible.", "it": "Giacca leggera e completamente impermeabile, ideale per attività all'aperto con tempo imprevedibile."}	{"cn": "可收纳设计，透气膜，可调节风帽，拉链口袋。", "de": "Packbares Design, atmungsaktive Membran, verstellbare Kapuze, Reißverschlusstaschen.", "en": "Packable design, breathable membrane, adjustable hood, zippered pockets.", "es": "Diseño plegable, membrana transpirable, capucha ajustable, bolsillos con cremallera.", "fr": "Conception compactable, membrane respirante, capuche ajustable, poches zippées.", "it": "Design impacchettabile, membrana traspirante, cappuccio regolabile, tasche con cerniera."}	119.99	300	39
63	Divano a Tre Posti Moderno	ComfortHome	{"cn": "时尚舒适的三人沙发，非常适合现代客厅。", "de": "Stilvolles und bequemes Dreisitzer-Sofa, perfekt für moderne Wohnzimmer.", "en": "Stylish and comfortable three-seater sofa, perfect for modern living rooms.", "es": "Sofá de tres plazas elegante y cómodo, perfecto para salas de estar modernas.", "fr": "Canapé trois places élégant et confortable, parfait pour les salons modernes.", "it": "Divano a tre posti elegante e confortevole, perfetto per salotti moderni."}	{"cn": "织物软垫，实木框架，可拆卸坐垫套，需要组装。", "de": "Stoffbezug, Massivholzrahmen, abnehmbare Kissenbezüge, Montage erforderlich.", "en": "Fabric upholstery, solid wood frame, removable cushion covers, assembly required.", "es": "Tapicería de tela, estructura de madera maciza, fundas de cojín extraíbles, requiere montaje.", "fr": "Revêtement en tissu, cadre en bois massif, housses de coussin amovibles, assemblage requis.", "it": "Rivestimento in tessuto, struttura in legno massello, fodere dei cuscini rimovibili, montaggio richiesto."}	899.99	50	40
64	Letto Matrimoniale con Testiera Imbottita	DreamSleep	{"cn": "优雅的特大号床，带软垫床头板，为任何卧室增添精致感。", "de": "Elegantes Queensize-Bett mit gepolstertem Kopfteil, das jedem Schlafzimmer Raffinesse verleiht.", "en": "Elegant queen-size bed with upholstered headboard, adding sophistication to any bedroom.", "es": "Elegante cama queen size con cabecero tapizado, que añade sofisticación a cualquier dormitorio.", "fr": "Lit queen-size élégant avec tête de lit rembourrée, ajoutant du raffinement à toute chambre à coucher.", "it": "Elegante letto matrimoniale con testiera imbottita, che aggiunge raffinatezza a qualsiasi camera da letto."}	{"cn": "天鹅绒软垫，坚固的木板条，易于组装，不含床垫。", "de": "Samtbezug, stabile Holzlattenroste, einfache Montage, Matratze nicht enthalten.", "en": "Velvet upholstery, sturdy wooden slats, easy assembly, mattress not included.", "es": "Tapicería de terciopelo, somier de madera resistente, fácil montaje, colchón no incluido.", "fr": "Rembourrage en velours, lattes en bois robustes, assemblage facile, matelas non inclus.", "it": "Rivestimento in velluto, robuste doghe in legno, facile montaggio, materasso non incluso."}	599.00	30	41
65	Set di Pentole e Padelle Antiaderenti	CookMaster	{"cn": "全套不粘锅具，满足您的所有烹饪需求，易于清洁。", "de": "Komplettes Antihaft-Kochgeschirr-Set für alle Ihre Kochbedürfnisse, leicht zu reinigen.", "en": "Complete non-stick cookware set for all your cooking needs, easy to clean.", "es": "Juego completo de utensilios de cocina antiadherentes para todas sus necesidades de cocina, fácil de limpiar.", "fr": "Ensemble complet d'ustensiles de cuisine antiadhésifs pour tous vos besoins de cuisson, facile à nettoyer.", "it": "Set completo di pentole e padelle antiaderenti per tutte le tue esigenze di cottura, facile da pulire."}	{"cn": "8件套，无PFOA不粘涂层，兼容电磁炉，可用洗碗机清洗。", "de": "8-teiliges Set, PFOA-freie Antihaftbeschichtung, Induktionsgeeignet, spülmaschinenfest.", "en": "8-piece set, PFOA-free non-stick coating, induction compatible, dishwasher safe.", "es": "Juego de 8 piezas, revestimiento antiadherente sin PFOA, compatible con inducción, apto para lavavajillas.", "fr": "Ensemble de 8 pièces, revêtement antiadhésif sans PFOA, compatible induction, lavable au lave-vaisselle.", "it": "Set da 8 pezzi, rivestimento antiaderente senza PFOA, compatibile con induzione, lavabile in lavastoviglie."}	149.99	200	42
66	Vaso Decorativo in Ceramica Artigianale	Artisan Crafts	{"cn": "独特的手工陶瓷装饰花瓶，为任何房间增添艺术气息的完美选择。", "de": "Einzigartige handgefertigte Keramik-Dekovase, perfekt, um jedem Raum eine künstlerische Note zu verlei explosivem Touch zu verleihen.", "en": "Unique handcrafted ceramic decorative vase, perfect for adding an artistic touch to any room.", "es": "Jarrón decorativo de cerámica artesanal único, perfecto para añadir un toque artístico a cualquier habitación.", "fr": "Vase décoratif unique en céramique artisanale, parfait pour ajouter une touche artistique à n'importe quelle pièce.", "it": "Vaso decorativo in ceramica artigianale unico, perfetto per aggiungere un tocco artistico a qualsiasi stanza."}	{"cn": "手绘，釉面，高30厘米，适合鲜花或作为独立摆件。", "de": "Handbemalt, glasierte Oberfläche, 30 cm Höhe, ideal für frische Blumen oder als Einzelstück.", "en": "Hand-painted, glazed finish, 30cm height, ideal for fresh flowers or as a standalone piece.", "es": "Pintado a mano, acabado esmaltado, 30 cm de altura, ideal para flores frescas o como pieza individual.", "fr": "Peint à la main, finition émaillée, 30 cm de hauteur, idéal pour les fleurs fraîches ou comme pièce autonome.", "it": "Dipinto a mano, finitura smaltata, altezza 30 cm, ideale per fiori freschi o come pezzo singolo."}	75.00	150	43
67	Lampada da Tavolo LED con Caricatore Wireless	BrightIdeas	{"cn": "带集成无线充电板的现代LED台灯，可为智能手机充电。", "de": "Moderne LED-Schreibtischlampe mit integriertem kabellosem Ladepad für Smartphones.", "en": "Modern LED desk lamp with integrated wireless charging pad for smartphones.", "es": "Lámpara de escritorio LED moderna con plataforma de carga inalámbrica integrada para teléfonos inteligentes.", "fr": "Lampe de bureau LED moderne avec pavé de charge sans fil intégré pour smartphones.", "it": "Lampada da tavolo LED moderna con pad di ricarica wireless integrato per smartphone."}	{"cn": "可调光，可调节色温，触摸控制，兼容Qi无线充电。", "de": "Dimmbar, einstellbare Farbtemperatur, Touch-Steuerung, Qi-Wireless-Charging-kompatibel.", "en": "Dimmable, adjustable color temperature, touch control, Qi wireless charging compatible.", "es": "Regulable, temperatura de color ajustable, control táctil, compatible con carga inalámbrica Qi.", "fr": "Intensité variable, température de couleur réglable, commande tactile, compatible avec la charge sans fil Qi.", "it": "Dimmerabile, temperatura colore regolabile, controllo touch, compatibile con ricarica wireless Qi."}	85.00	250	44
68	Set Lenzuola in Cotone Egiziano Matrimoniale	LuxuryLinens	{"cn": "奢华埃及棉特大号床单套装，带来极致舒适和柔软。", "de": "Luxuriöses Kingsize-Bettwäscheset aus ägyptischer Baumwolle für höchsten Komfort und Weichheit.", "en": "Luxurious Egyptian cotton king-size sheet set for ultimate comfort and softness.", "es": "Lujoso juego de sábanas king-size de algodón egipcio para máxima comodidad y suavidad.", "fr": "Luxueux ensemble de draps king-size en coton égyptien pour un confort et une douceur ultimes.", "it": "Lussuoso set di lenzuola matrimoniali in cotone egiziano per il massimo comfort e morbidezza."}	{"cn": "800支，低过敏性，深口袋，可机洗，有多种颜色。", "de": "800 Fadenzahl, hypoallergen, tiefe Taschen, maschinenwaschbar, in verschiedenen Farben erhältlich.", "en": "800 thread count, hypoallergenic, deep pockets, machine washable, available in various colors.", "es": "800 hilos, hipoalergénico, bolsillos profundos, lavable a máquina, disponible en varios colores.", "fr": "800 fils, hypoallergénique, poches profondes, lavable en machine, disponible en différentes couleurs.", "it": "800 fili, ipoallergenico, tasche profonde, lavabile in lavatrice, disponibile in vari colori."}	129.99	180	45
69	Scatole Contenitore Pieghevoli con Coperchio (Set di 3)	OrganizeIt	{"cn": "3个带盖可折叠收纳盒套装，非常适合整理任何空间。", "de": "Set mit 3 faltbaren Aufbewahrungsboxen mit Deckel, perfekt zum Aufräumen jedes Raumes.", "en": "Set of 3 collapsible storage boxes with lids, perfect for decluttering any space.", "es": "Set de 3 cajas de almacenamiento plegables con tapa, perfectas para organizar cualquier espacio.", "fr": "Ensemble de 3 boîtes de rangement pliables avec couvercles, parfaites pour désencombrer n'importe quel espace.", "it": "Set di 3 scatole contenitore pieghevoli con coperchio, perfette per riordinare qualsiasi spazio."}	{"cn": "耐用面料，加固手柄，可堆叠，非常适合存放衣物、玩具或书籍。", "de": "Strapazierfähiges Material, verstärkte Griffe, stapelbar, ideal für Kleidung, Spielzeug oder Bücher.", "en": "Durable fabric, reinforced handles, stackable, ideal for clothes, toys, or books.", "es": "Tejido duradero, asas reforzadas, apilables, ideales para ropa, juguetes o libros.", "fr": "Tissu durable, poignées renforcées, empilables, idéales pour les vêtements, les jouets ou les livres.", "it": "Tessuto resistente, maniglie rinforzate, impilabili, ideali per vestiti, giocattoli o libri."}	34.99	600	46
70	Set Salotto da Giardino in Rattan	Garden Oasis	{"cn": "优雅的藤制户外休闲套装，非常适合在花园或露台上放松身心。", "de": "Elegantes Rattan-Loungeset für den Außenbereich, perfekt zum Entspannen in Ihrem Garten oder auf Ihrer Terrasse.", "en": "Elegant rattan outdoor lounge set, perfect for relaxing in your garden or patio.", "es": "Elegante juego de salón de ratán para exteriores, perfecto para relajarse en su jardín o patio.", "fr": "Élégant ensemble de salon d'extérieur en rotin, parfait pour se détendre dans votre jardin ou sur votre patio.", "it": "Elegante set salotto da esterno in rattan, perfetto per rilassarsi nel tuo giardino o patio."}	{"cn": "防风雨藤条，舒适坐垫，钢化玻璃桌面，易于清洁。", "de": "Wetterbeständiges Rattan, bequeme Kissen, Tischplatte aus gehärtetem Glas, leicht zu reinigen.", "en": "Weather-resistant rattan, comfortable cushions, tempered glass tabletop, easy to clean.", "es": "Ratán resistente a la intemperie, cojines cómodos, tablero de vidrio templado, fácil de limpiar.", "fr": "Rotin résistant aux intempéries, coussins confortables, plateau en verre trempé, facile à nettoyer.", "it": "Rattan resistente alle intemperie, cuscini confortevoli, piano in vetro temperato, facile da pulire."}	799.00	20	47
71	Scrivania Ergonomica Regolabile in Altezza	WorkSmart	{"cn": "高度可调的人体工学办公桌，打造更健康、更高效的工作空间。", "de": "Höhenverstellbarer ergonomischer Schreibtisch für einen gesünderen und produktiveren Arbeitsplatz.", "en": "Height-adjustable ergonomic desk for a healthier and more productive workspace.", "es": "Escritorio ergonómico ajustable en altura para un espacio de trabajo más saludable y productivo.", "fr": "Bureau ergonomique réglable en hauteur pour un espace de travail plus sain et plus productif.", "it": "Scrivania ergonomica regolabile in altezza per uno spazio di lavoro più sano e produttivo."}	{"cn": "电动马达，记忆预设，坚固钢架，宽敞桌面，易于组装。", "de": "Elektromotor, Speichervoreinstellungen, stabiler Stahlrahmen, geräumige Arbeitsplatte, einfache Montage.", "en": "Electric motor, memory presets, sturdy steel frame, spacious desktop, easy assembly.", "es": "Motor eléctrico, ajustes de memoria, estructura de acero resistente, escritorio espacioso, fácil montaje.", "fr": "Moteur électrique, préréglages de mémoire, cadre en acier robuste, grand bureau, assemblage facile.", "it": "Motore elettrico, preimpostazioni di memoria, robusto telaio in acciaio, ampio desktop, facile montaggio."}	349.99	80	48
72	Gioco da Tavolo Strategico - 'Colonizzatori di Catan'	Fantasy Games	{"cn": "经典策略棋盘游戏，玩家收集资源并建造定居点。", "de": "Klassisches Strategie-Brettspiel, bei dem Spieler Ressourcen sammeln und Siedlungen bauen.", "en": "Classic strategy board game where players collect resources and build settlements.", "es": "Clásico juego de mesa de estrategia donde los jugadores recolectan recursos y construyen asentamientos.", "fr": "Jeu de plateau de stratégie classique où les joueurs collectent des ressources et construisent des colonies.", "it": "Classico gioco da tavolo strategico in cui i giocatori raccolgono risorse e costruiscono insediamenti."}	{"cn": "适合3-4名玩家，10岁以上，平均游戏时间60分钟，提供扩展包。", "de": "Für 3-4 Spieler, ab 10 Jahren, durchschnittliche Spielzeit 60 Minuten, Erweiterungspacks erhältlich.", "en": "For 3-4 players, ages 10+, average playtime 60 minutes, expansion packs available.", "es": "Para 3-4 jugadores, mayores de 10 años, tiempo de juego promedio 60 minutos, paquetes de expansión disponibles.", "fr": "Pour 3-4 joueurs, 10 ans et plus, temps de jeu moyen 60 minutes, packs d'extension disponibles.", "it": "Per 3-4 giocatori, età 10+, tempo di gioco medio 60 minuti, espansioni disponibili."}	45.00	300	49
83	Integratore Multivitaminico Giornaliero	VitaBoost	{"cn": "全面的每日多种维生素补充剂，支持整体健康和福祉。", "de": "Umfassendes tägliches Multivitaminpräparat zur Unterstützung der allgemeinen Gesundheit und des Wohlbefindens.", "en": "Comprehensive daily multivitamin supplement to support overall health and well-being.", "es": "Suplemento multivitamínico diario completo para apoyar la salud y el bienestar general.", "fr": "Supplément multivitaminé quotidien complet pour soutenir la santé et le bien-être général.", "it": "Integratore multivitaminico giornaliero completo per supportare la salute e il benessere generale."}	{"cn": "60粒胶囊（2个月用量），非转基因，无麸质，第三方检测，GMP认证。", "de": "60 Kapseln (2-Monats-Vorrat), gentechnikfrei, glutenfrei, von Drittanbietern getestet, GMP-zertifiziert.", "en": "60 capsules (2-month supply), non-GMO, gluten-free, third-party tested, GMP certified.", "es": "60 cápsulas (suministro para 2 meses), sin OGM, sin gluten, probado por terceros, certificado GMP.", "fr": "60 gélules (approvisionnement de 2 mois), sans OGM, sans gluten, testé par des tiers, certifié GMP.", "it": "60 capsule (scorta di 2 mesi), senza OGM, senza glutine, testato da terze parti, certificato GMP."}	19.99	600	61
73	Action Figure da Collezione - Eroe Spaziale	ToyVerse	{"cn": "高度详细的流行太空英雄收藏版人偶，具有多个可动关节。", "de": "Hochdetaillierte Sammelfigur eines beliebten Weltraumhelden mit mehreren Gelenkpunkten.", "en": "Highly detailed collectible action figure of a popular space hero, with multiple articulation points.", "es": "Figura de acción coleccionable altamente detallada de un popular héroe espacial, con múltiples puntos de articulación.", "fr": "Figurine d'action de collection très détaillée d'un héros spatial populaire, avec plusieurs points d'articulation.", "it": "Action figure da collezione altamente dettagliata di un popolare eroe spaziale, con più punti di articolazione."}	{"cn": "15厘米高，可互换手和配件，高级涂装，包含展示架。", "de": "15 cm hoch, austauschbare Hände und Zubehör, hochwertige Lackierung, Display-Ständer inklusive.", "en": "15cm tall, interchangeable hands and accessories, premium paint application, display stand included.", "es": "15 cm de alto, manos y accesorios intercambiables, aplicación de pintura premium, soporte de exhibición incluido.", "fr": "15 cm de haut, mains et accessoires interchangeables, application de peinture premium, support de présentation inclus.", "it": "Alta 15 cm, mani e accessori intercambiabili, applicazione di pittura premium, supporto espositivo incluso."}	29.99	200	50
74	Kit Scientifico per Bambini - Microscopio	Learn&Play	{"cn": "一个有趣的科学套件，配有真正的显微镜，非常适合有抱负的年轻科学家。", "de": "Ein spannendes Wissenschafts-Kit mit einem funktionierenden Mikroskop, perfekt für junge angehende Wissenschaftler.", "en": "An engaging science kit with a real working microscope, perfect for young aspiring scientists.", "es": "Un kit de ciencias atractivo con un microscopio real que funciona, perfecto para jóvenes científicos aspirantes.", "fr": "Un kit scientifique captivant avec un véritable microscope fonctionnel, parfait pour les jeunes scientifiques en herbe.", "it": "Un coinvolgente kit scientifico con un vero microscopio funzionante, perfetto per giovani aspiranti scienziati."}	{"cn": "100x-1200x放大倍数，包含预制玻片，LED照明，手提箱。", "de": "100x-1200x Vergrößerung, vorbereitete Objektträger enthalten, LED-Beleuchtung, Tragekoffer.", "en": "100x-1200x magnification, prepared slides included, LED illumination, carrying case.", "es": "Aumento de 100x-1200x, portaobjetos preparados incluidos, iluminación LED, estuche de transporte.", "fr": "Grossissement 100x-1200x, lames préparées incluses, éclairage LED, mallette de transport.", "it": "Ingrandimento 100x-1200x, vetrini preparati inclusi, illuminazione LED, custodia per il trasporto."}	49.99	300	51
75	Bambola Moda con Set di Vestiti	DollFantasy	{"cn": "带可更换服装和配饰的时尚娃娃，激发创意玩耍。", "de": "Modepuppe mit wechselbaren Outfits und Accessoires, inspiriert zum kreativen Spielen.", "en": "Fashion doll with changeable outfits and accessories, inspiring creative play.", "es": "Muñeca de moda con trajes y accesorios intercambiables, que inspira el juego creativo.", "fr": "Poupée mannequin avec tenues et accessoires interchangeables, inspirant le jeu créatif.", "it": "Bambola alla moda con abiti e accessori intercambiabili, che ispira il gioco creativo."}	{"cn": "30厘米高，植发，3套完整服装，2双鞋，小配件。", "de": "30 cm groß, verwurzeltes Haar, 3 komplette Outfits, 2 Paar Schuhe, kleine Accessoires.", "en": "30cm tall, rooted hair, 3 complete outfits, 2 pairs of shoes, small accessories.", "es": "30 cm de alto, cabello enraizado, 3 conjuntos completos, 2 pares de zapatos, pequeños accesorios.", "fr": "30 cm de haut, cheveux implantés, 3 tenues complètes, 2 paires de chaussures, petits accessoires.", "it": "Alta 30 cm, capelli radicati, 3 outfit completi, 2 paia di scarpe, piccoli accessori."}	24.99	400	52
76	Puzzle 1000 Pezzi - Paesaggio Montano	PuzzleMasters	{"cn": "具有挑战性的1000片拼图，以美丽的群山景色为特色。", "de": "Herausforderndes 1000-Teile-Puzzle mit einer wunderschönen Berglandschaft.", "en": "Challenging 1000-piece jigsaw puzzle featuring a beautiful mountain landscape scene.", "es": "Rompecabezas desafiante de 1000 piezas con una hermosa escena de paisaje montañoso.", "fr": "Puzzle de 1000 pièces stimulant représentant un magnifique paysage de montagne.", "it": "Puzzle da 1000 pezzi stimolante con una splendida scena di paesaggio montano."}	{"cn": "高品质纸板，精确切割件，成品尺寸70x50厘米，包含海报。", "de": "Hochwertiger Karton, präzisionsgeschnittene Teile, fertige Größe 70x50cm, Poster inklusive.", "en": "High-quality cardboard, precision cut pieces, finished size 70x50cm, poster included.", "es": "Cartón de alta calidad, piezas cortadas con precisión, tamaño terminado 70x50cm, póster incluido.", "fr": "Carton de haute qualité, pièces coupées avec précision, taille finie 70x50cm, poster inclus.", "it": "Cartone di alta qualità, pezzi tagliati con precisione, dimensione finita 70x50cm, poster incluso."}	18.99	500	53
77	Set da Gioco per Esterno - Scivolo e Altalena	PlaySafe	{"cn": "耐用户外游乐套装，带滑梯和秋千，非常适合在后院玩耍数小时。", "de": "Robustes Outdoor-Spielset mit Rutsche und Schaukel, perfekt für stundenlangen Spaß im Garten.", "en": "Durable outdoor play set with a slide and swing, perfect for hours of fun in the backyard.", "es": "Juego de exterior duradero con tobogán y columpio, perfecto para horas de diversión en el patio trasero.", "fr": "Ensemble de jeu d'extérieur durable avec toboggan et balançoire, parfait pour des heures de plaisir dans le jardin.", "it": "Robusto set da gioco per esterni con scivolo e altalena, perfetto per ore di divertimento in giardino."}	{"cn": "防风雨塑料，安全设计，易于组装，适合2-8岁儿童。", "de": "Wetterbeständiger Kunststoff, sicheres Design, einfach zu montieren, geeignet für 2-8 Jahre.", "en": "Weather-resistant plastic, safe design, easy to assemble, suitable for ages 2-8.", "es": "Plástico resistente a la intemperie, diseño seguro, fácil de montar, apto para edades de 2 a 8 años.", "fr": "Plastique résistant aux intempéries, conception sûre, facile à assembler, convient aux 2-8 ans.", "it": "Plastica resistente alle intemperie, design sicuro, facile da montare, adatto per età 2-8."}	199.99	100	54
84	Set Spazzole per Capelli in Bambù	EcoBrush	{"cn": "环保竹制发刷套装，温和解开缠结，打造健康秀发。", "de": "Umweltfreundliches Bambus-Haarbürsten-Set für sanftes Entwirren und gesundes Haar.", "en": "Eco-friendly bamboo hairbrush set for gentle detangling and healthy hair.", "es": "Juego de cepillos para el cabello de bambú ecológicos para desenredar suavemente y cabello sano.", "fr": "Ensemble de brosses à cheveux en bambou écologiques pour un démêlage doux et des cheveux sains.", "it": "Set di spazzole per capelli in bambù ecologico per districare delicatamente e capelli sani."}	{"cn": "包括板刷和圆刷，防静电，适合所有发质，耐用且可持续。", "de": "Inklusive Paddelbürste und Rundbürste, antistatisch, für alle Haartypen geeignet, langlebig und nachhaltig.", "en": "Includes paddle brush and round brush, anti-static, suitable for all hair types, durable and sustainable.", "es": "Incluye cepillo plano y cepillo redondo, antiestático, apto para todo tipo de cabello, duradero y sostenible.", "fr": "Comprend une brosse plate et une brosse ronde, antistatique, convient à tous les types de cheveux, durable et durable.", "it": "Include spazzola piatta e spazzola rotonda, antistatica, adatta a tutti i tipi di capelli, resistente e sostenibile."}	25.00	350	62
78	Set di Costruzioni Creativo - 500 Pezzi	BuildFun	{"cn": "大型创意积木套装，鼓励想象力和精细运动技能发展。", "de": "Großes kreatives Baustein-Set, das Fantasie und Feinmotorik fördert.", "en": "Large creative building block set, encouraging imagination and fine motor skills development.", "es": "Gran set de bloques de construcción creativo, que fomenta la imaginación y el desarrollo de habilidades motoras finas.", "fr": "Grand ensemble de blocs de construction créatifs, encourageant l'imagination et le développement de la motricité fine.", "it": "Ampio set di blocchi da costruzione creativo, che incoraggia l'immaginazione e lo sviluppo delle capacità motorie fini."}	{"cn": "500块什锦彩色积木，兼容各大品牌，无毒ABS塑料，包含收纳箱。", "de": "500 verschiedene bunte Bausteine, kompatibel mit großen Marken, ungiftiger ABS-Kunststoff, Aufbewahrungsbox inklusive.", "en": "500 assorted colorful blocks, compatible with major brands, non-toxic ABS plastic, storage bin included.", "es": "500 bloques de colores variados, compatibles con las principales marcas, plástico ABS no tóxico, cubo de almacenamiento incluido.", "fr": "500 blocs colorés assortis, compatibles avec les grandes marques, plastique ABS non toxique, bac de rangement inclus.", "it": "500 blocchi colorati assortiti, compatibili con le principali marche, plastica ABS atossica, contenitore inclusivo."}	39.99	700	55
79	Robot Interattivo Programmabile	RoboFun	{"cn": "可编程互动机器人玩具，教授基本的编码和机器人概念。", "de": "Programmierbarer interaktiver Spielzeugroboter, vermittelt grundlegende Programmier- und Robotikkonzepte.", "en": "Programmable interactive robot toy, teaches basic coding and robotics concepts.", "es": "Robot de juguete interactivo programable, enseña conceptos básicos de codificación y robótica.", "fr": "Robot jouet interactif programmable, enseigne les concepts de base du codage et de la robotique.", "it": "Robot giocattolo interattivo programmabile, insegna concetti di base di codifica e robotica."}	{"cn": "语音识别，手势控制，App控制，包含学习模块，USB充电。", "de": "Spracherkennung, Gestensteuerung, App-gesteuert, inklusive Lernmodule, USB-wiederaufladbar.", "en": "Voice recognition, gesture control, app-controlled, includes learning modules, USB rechargeable.", "es": "Reconocimiento de voz, control por gestos, controlado por aplicación, incluye módulos de aprendizaje, recargable por USB.", "fr": "Reconnaissance vocale, contrôle gestuel, contrôlé par application, comprend des modules d'apprentissage, rechargeable par USB.", "it": "Riconoscimento vocale, controllo gestuale, controllato tramite app, include moduli di apprendimento, ricaricabile tramite USB."}	89.99	150	56
80	Shampoo Volumizzante Naturale	HealthyHair	{"cn": "天然丰盈洗发水，温和清洁，为细软或稀疏头发增添丰盈感。", "de": "Natürliches Volumen-Shampoo, reinigt sanft und verleiht feinem oder schlaffem Haar Fülle.", "en": "Natural volumizing shampoo, gently cleanses and adds body to fine or limp hair.", "es": "Champú voluminizador natural, limpia suavemente y da cuerpo al cabello fino o sin vida.", "fr": "Shampooing volumateur naturel, nettoie en douceur et donne du corps aux cheveux fins ou mous.", "it": "Shampoo volumizzante naturale, deterge delicatamente e aggiunge corpo ai capelli fini o spenti."}	{"cn": "250毫升瓶装，不含硫酸盐，不含对羟基苯甲酸酯，富含生物素和植物提取物。", "de": "250ml Flasche, sulfatfrei, parabenfrei, angereichert mit Biotin und Pflanzenextrakten.", "en": "250ml bottle, sulfate-free, paraben-free, infused with biotin and plant extracts.", "es": "Botella de 250 ml, sin sulfatos, sin parabenos, infundido con biotina y extractos de plantas.", "fr": "Flacon de 250 ml, sans sulfate, sans paraben, infusé de biotine et d'extraits de plantes.", "it": "Flacone da 250 ml, senza solfati, senza parabeni, infuso con biotina ed estratti vegetali."}	15.99	400	58
81	Palette Ombretti Nudi Universale	Glamour Cosmetics	{"cn": "多功能裸色眼影盘，色彩高度饱和，可打造日常或华丽妆容。", "de": "Vielseitige Nude-Lidschatten-Palette mit hochpigmentierten Farbtönen für Alltags- bis Glamour-Looks.", "en": "Versatile nude eyeshadow palette with highly pigmented shades for everyday to glam looks.", "es": "Paleta de sombras de ojos nude versátil con tonos altamente pigmentados para looks diarios a glamorosos.", "fr": "Palette d'ombres à paupières nude polyvalente avec des teintes très pigmentées pour des looks quotidiens à glamour.", "it": "Palette di ombretti nude versatile con tonalità altamente pigmentate per look dal quotidiano al glamour."}	{"cn": "12种颜色，哑光和闪光饰面，持久，易于混合，包含镜子。", "de": "12 Farbtöne, matte und schimmernde Finishes, langanhaltend, verblendbar, Spiegel inklusive.", "en": "12 shades, matte and shimmer finishes, long-lasting, blendable, mirror included.", "es": "12 tonos, acabados mate y brillante, de larga duración, difuminable, espejo incluido.", "fr": "12 teintes, finitions mates et scintillantes, longue tenue, estompable, miroir inclus.", "it": "12 tonalità, finiture opache e shimmer, lunga durata, sfumabile, specchio incluso."}	22.00	300	59
82	Profumo Floreale da Donna 'Fiori di Primavera'	AromaLux	{"cn": "精致清新的女士花香香水，适合日常穿着。", "de": "Zartes und erfrischendes Blumenparfüm für Damen, perfekt für den täglichen Gebrauch.", "en": "Delicate and refreshing floral perfume for women, perfect for everyday wear.", "es": "Perfume floral delicado y refrescante para mujer, perfecto para el uso diario.", "fr": "Parfum floral délicat et rafraîchissant pour femme, parfait pour un usage quotidien.", "it": "Profumo floreale delicato e rinfrescante da donna, perfetto per l'uso quotidiano."}	{"cn": "50毫升淡香精，前调为茉莉和玫瑰，持久留香，优雅瓶身设计。", "de": "50ml Eau de Parfum, Kopfnoten von Jasmin und Rose, langanhaltender Duft, elegantes Flaschendesign.", "en": "50ml eau de parfum, top notes of jasmine and rose, long-lasting scent, elegant bottle design.", "es": "Eau de parfum de 50 ml, notas de salida de jazmín y rosa, aroma duradero, diseño de botella elegante.", "fr": "Eau de parfum de 50 ml, notes de tête de jasmin et de rose, parfum longue durée, design de bouteille élégant.", "it": "Eau de parfum da 50 ml, note di testa di gelsomino e rosa, profumo a lunga durata, design elegante della bottiglia."}	65.00	200	60
85	Spazzolino Elettrico Sonic con Testine di Ricambio	SparkleClean	{"cn": "先进的声波电动牙刷，可高效去除牙菌斑，使牙龈更健康。", "de": "Fortschrittliche Schallzahnbürste für überlegene Plaqueentfernung und gesünderes Zahnfleisch.", "en": "Advanced sonic electric toothbrush for superior plaque removal and healthier gums.", "es": "Cepillo de dientes eléctrico sónico avanzado para una eliminación superior de la placa y encías más sanas.", "fr": "Brosse à dents électrique sonique avancée pour une élimination supérieure de la plaque dentaire et des gencives plus saines.", "it": "Spazzolino elettrico sonico avanzato per una rimozione superiore della placca e gengive più sane."}	{"cn": "5种刷牙模式，2分钟计时器，压力传感器，包含3个替换刷头，可充电电池。", "de": "5 Putzmodi, 2-Minuten-Timer, Drucksensor, 3 Ersatzbürstenköpfe enthalten, wiederaufladbarer Akku.", "en": "5 brushing modes, 2-minute timer, pressure sensor, 3 replacement brush heads included, rechargeable battery.", "es": "5 modos de cepillado, temporizador de 2 minutos, sensor de presión, 3 cabezales de cepillo de repuesto incluidos, batería recargable.", "fr": "5 modes de brossage, minuterie de 2 minutes, capteur de pression, 3 têtes de brosse de rechange incluses, batterie rechargeable.", "it": "5 modalità di spazzolamento, timer di 2 minuti, sensore di pressione, 3 testine di ricambio incluse, batteria ricaricabile."}	79.99	250	63
86	Kit da Barba Classico con Pennello in Tasso	Gentleman's Essentials	{"cn": "完整的经典男士剃须套装，提供顺滑奢华的剃须体验。", "de": "Komplettes klassisches Rasierkit für Herren, das eine glatte und luxuriöse Rasur bietet.", "en": "Complete classic shaving kit for men, providing a smooth and luxurious shave.", "es": "Kit de afeitado clásico completo para hombres, que proporciona un afeitado suave y lujoso.", "fr": "Kit de rasage classique complet pour hommes, offrant un rasage doux et luxueux.", "it": "Kit da barba classico completo per uomo, che offre una rasatura liscia e lussuosa."}	{"cn": "包含安全剃须刀，獾毛刷，剃须皂和须后膏。", "de": "Inklusive Sicherheitsrasierer, Dachshaar-Rasierpinsel, Rasierseife und Aftershave-Balsam.", "en": "Includes safety razor, badger hair brush, shaving soap, and aftershave balm.", "es": "Incluye maquinilla de afeitar de seguridad, brocha de pelo de tejón, jabón de afeitar y bálsamo para después del afeitado.", "fr": "Comprend un rasoir de sécurité, une brosse en poils de blaireau, du savon à raser et un baume après-rasage.", "it": "Include rasoio di sicurezza, pennello da barba in tasso, sapone da barba e balsamo dopobarba."}	59.99	180	64
87	Tenda da Campeggio per 2 Persone Ultraleggera	TrailBlazer Gear	{"cn": "超轻2人露营帐篷，非常适合背包旅行和户外探险。", "de": "Ultraleichtes 2-Personen-Campingzelt, perfekt für Rucksackreisen und Outdoor-Abenteuer.", "en": "Ultralight 2-person camping tent, perfect for backpacking and outdoor adventures.", "es": "Tienda de campaña ultraligera para 2 personas, perfecta para mochileros y aventuras al aire libre.", "fr": "Tente de camping ultralégère pour 2 personnes, parfaite pour la randonnée et les aventures en plein air.", "it": "Tenda da campeggio ultraleggera per 2 persone, perfetta per il backpacking e le avventure all'aperto."}	{"cn": "防水防撕裂尼龙，快速搭建，紧凑包装尺寸，包含地钉和防风绳。", "de": "Wasserdichtes Ripstop-Nylon, schneller Aufbau, kompaktes Packmaß, inklusive Heringe und Abspannleinen.", "en": "Waterproof ripstop nylon, quick setup, compact packed size, includes stakes and guylines.", "es": "Nylon ripstop impermeable, configuración rápida, tamaño compacto embalado, incluye estacas y cuerdas de sujeción.", "fr": "Nylon ripstop imperméable, montage rapide, taille compacte une fois emballé, comprend des piquets et des haubans.", "it": "Nylon ripstop impermeabile, montaggio rapido, dimensioni compatte una volta imballata, include picchetti e tiranti."}	179.99	100	65
88	Set di Bande di Resistenza per Fitness	FitStrong	{"cn": "多功能健身阻力带套装，适合在家或外出进行全身锻炼。", "de": "Vielseitiges Fitness-Widerstandsband-Set für Ganzkörpertraining zu Hause oder unterwegs.", "en": "Versatile fitness resistance band set for full-body workouts at home or on the go.", "es": "Juego de bandas de resistencia versátiles para entrenamientos de cuerpo completo en casa o mientras viaja.", "fr": "Ensemble de bandes de résistance de fitness polyvalentes pour des entraînements complets à la maison ou en déplacement.", "it": "Set versatile di bande di resistenza per allenamenti completi a casa o in viaggio."}	{"cn": "5个不同阻力级别，耐用天然乳胶，包含门锚和脚踝带，手提袋。", "de": "5 verschiedene Widerstandsstufen, strapazierfähiges Naturlatex, inklusive Türanker und Knöchelriemen, Tragetasche.", "en": "5 varying resistance levels, durable natural latex, includes door anchor and ankle straps, carrying bag.", "es": "5 niveles de resistencia variados, látex natural duradero, incluye anclaje para puerta y correas para tobillos, bolsa de transporte.", "fr": "5 niveaux de résistance variés, latex naturel durable, comprend une ancre de porte et des sangles de cheville, sac de transport.", "it": "5 livelli di resistenza diversi, lattice naturale resistente, include ancora per porta e cinghie per caviglie, borsa per il trasporto."}	24.99	400	66
89	Casco da Ciclismo Aerodinamico	CycleSafe	{"cn": "空气动力学自行车头盔，为公路自行车手提供卓越的保护和通风。", "de": "Aerodynamischer Fahrradhelm, der überlegenen Schutz und Belüftung für Rennradfahrer bietet.", "en": "Aerodynamic cycling helmet offering superior protection and ventilation for road cyclists.", "es": "Casco de ciclismo aerodinámico que ofrece protección y ventilación superiores para ciclistas de carretera.", "fr": "Casque de cyclisme aérodynamique offrant une protection et une ventilation supérieures aux cyclistes sur route.", "it": "Casco da ciclismo aerodinamico che offre protezione e ventilazione superiori per i ciclisti su strada."}	{"cn": "轻质聚碳酸酯外壳，MIPS技术，18个通风口，可调节贴合系统，符合安全标准。", "de": "Leichte Polycarbonat-Schale, MIPS-Technologie, 18 Belüftungsöffnungen, verstellbares Anpassungssystem, erfüllt Sicherheitsstandards.", "en": "Lightweight polycarbonate shell, MIPS technology, 18 vents, adjustable fit system, complies with safety standards.", "es": "Carcasa de policarbonato ligera, tecnología MIPS, 18 ventilaciones, sistema de ajuste ajustable, cumple con los estándares de seguridad.", "fr": "Coque en polycarbonate léger, technologie MIPS, 18 aérations, système d'ajustement réglable, conforme aux normes de sécurité.", "it": "Guscio in policarbonato leggero, tecnologia MIPS, 18 prese d'aria, sistema di regolazione, conforme agli standard di sicurezza."}	99.99	150	67
90	Pallone da Calcio Ufficiale Taglia 5	SportSphere	{"cn": "官方5号足球，耐用，适合训练和比赛。", "de": "Offizieller Fußball der Größe 5, langlebig und geeignet für Training und Spiele.", "en": "Official size 5 soccer ball, durable and suitable for training and matches.", "es": "Balón de fútbol oficial talla 5, duradero y adecuado para entrenamientos y partidos.", "fr": "Ballon de football officiel taille 5, durable et adapté à l'entraînement et aux matchs.", "it": "Pallone da calcio ufficiale taglia 5, resistente e adatto per allenamenti e partite."}	{"cn": "热粘合面板，纹理表面增强抓地力，丁基内胆保持气压。", "de": "Thermogebundene Paneele, strukturierte Oberfläche für verbesserten Grip, Butylblase zur Luftretention.", "en": "Thermo-bonded panels, textured surface for enhanced grip, butyl bladder for air retention.", "es": "Paneles termoadheridos, superficie texturizada para un mejor agarre, cámara de butilo para retención de aire.", "fr": "Panneaux thermocollés, surface texturée pour une meilleure adhérence, vessie en butyle pour la rétention d'air.", "it": "Pannelli termosaldati, superficie testurizzata per una presa migliorata, vescica in butile per la ritenzione dell'aria."}	29.99	300	68
91	Amaca da Campeggio Portatile con Zanzariera	RelaxOutdoor	{"cn": "舒适便携的露营吊床，带一体式蚊帐，让您免受昆虫困扰。", "de": "Bequeme und tragbare Camping-Hängematte mit integriertem Moskitonetz für entspanntes Verweilen ohne Insekten.", "en": "Comfortable and portable camping hammock with integrated mosquito net for bug-free relaxation.", "es": "Cómoda y portátil hamaca de camping con mosquitera integrada para relajarse sin insectos.", "fr": "Hamac de camping confortable et portable avec moustiquaire intégrée pour une détente sans insectes.", "it": "Comoda e portatile amaca da campeggio con zanzariera integrata per un relax senza insetti."}	{"cn": "高强度尼龙，承重200公斤，易于安装，包含树带和登山扣。", "de": "Hochfestes Nylon, trägt bis zu 200 kg, einfacher Aufbau, inklusive Baumgurte und Karabiner.", "en": "High-strength nylon, holds up to 200kg, easy setup, includes tree straps and carabiners.", "es": "Nylon de alta resistencia, soporta hasta 200 kg, fácil de montar, incluye correas para árboles y mosquetones.", "fr": "Nylon haute résistance, supporte jusqu'à 200 kg, montage facile, comprend des sangles pour arbres et des mousquetons.", "it": "Nylon ad alta resistenza, supporta fino a 200 kg, facile da montare, include cinghie per alberi e moschettoni."}	55.00	200	69
92	Cintura da Corsa Idratante con Portaborraccia	RunFast	{"cn": "带安全水壶架和必需品储物空间的跑步水化腰带。", "de": "Hydrationslaufgürtel mit sicherem Flaschenhalter und Stauraum für das Nötigste.", "en": "Hydration running belt with secure bottle holder and storage for essentials.", "es": "Cinturón de hidratación para correr con soporte seguro para botellas y almacenamiento para lo esencial.", "fr": "Ceinture de course d'hydratation avec porte-bouteille sécurisé et rangement pour les essentiels.", "it": "Cintura da corsa idratante con portaborraccia sicuro e spazio per gli essenziali."}	{"cn": "可调节弹力带，反光细节，带拉链的手机/钥匙口袋，包含500毫升水壶。", "de": "Verstellbarer elastischer Riemen, reflektierende Akzente, Reißverschlusstasche für Telefon/Schlüssel, inklusive 500ml Flasche.", "en": "Adjustable elastic strap, reflective accents, zippered pocket for phone/keys, includes 500ml bottle.", "es": "Correa elástica ajustable, detalles reflectantes, bolsillo con cremallera para teléfono/llaves, incluye botella de 500 ml.", "fr": "Sangle élastique réglable, accents réfléchissants, poche zippée pour téléphone/clés, comprend une bouteille de 500 ml.", "it": "Cinturino elastico regolabile, dettagli riflettenti, tasca con cerniera per telefono/chiavi, include borraccia da 500 ml."}	29.99	300	70
93	Set Maschera e Boccaglio da Snorkeling	AquaVenture	{"cn": "高品质浮潜面罩和呼吸管套装，带来清晰的水下视野。", "de": "Hochwertiges Schnorchelmasken- und Schnorchelset für klare Unterwassersichten.", "en": "High-quality snorkeling mask and snorkel set for clear underwater views.", "es": "Set de máscara y snorkel de alta calidad para snorkel para vistas submarinas claras.", "fr": "Masque et tuba de plongée de haute qualité pour des vues sous-marines claires.", "it": "Set maschera e boccaglio per snorkeling di alta qualità per viste subacquee chiare."}	{"cn": "钢化玻璃镜片，舒适硅胶裙边，干式呼吸管，可调节带子。", "de": "Gehärtete Glaslinse, bequemer Silikonrand, Trockentop-Schnorchel, verstellbares Band.", "en": "Tempered glass lens, comfortable silicone skirt, dry top snorkel, adjustable strap.", "es": "Lente de vidrio templado, faldón de silicona cómodo, snorkel de punta seca, correa ajustable.", "fr": "Lentille en verre trempé, jupe en silicone confortable, tuba à dessus sec, sangle réglable.", "it": "Lente in vetro temperato, bordo in silicone confortevole, boccaglio dry top, cinturino regolabile."}	39.99	250	71
94	Guanti da Sci Impermeabili e Caldi	SnowPro Gear	{"cn": "保暖防水滑雪手套，斜坡上舒适和保护的必备品。", "de": "Warme und wasserdichte Skihandschuhe, unverzichtbar für Komfort und Schutz auf der Piste.", "en": "Warm and waterproof ski gloves, essential for comfort and protection on the slopes.", "es": "Guantes de esquí cálidos e impermeables, esenciales para la comodidad y protección en las pistas.", "fr": "Gants de ski chauds et imperméables, essentiels pour le confort et la protection sur les pistes.", "it": "Guanti da sci caldi e impermeabili, essenziali per comfort e protezione sulle piste."}	{"cn": "新雪丽保暖层，透气膜，加固手掌，可调节腕带。", "de": "Thinsulate-Isolierung, atmungsaktive Membran, verstärkte Handfläche, verstellbarer Handgelenkriemen.", "en": "Thinsulate insulation, breathable membrane, reinforced palm, adjustable wrist strap.", "es": "Aislamiento Thinsulate, membrana transpirable, palma reforzada, correa de muñeca ajustable.", "fr": "Isolation Thinsulate, membrane respirante, paume renforcée, dragonne réglable.", "it": "Isolamento Thinsulate, membrana traspirante, palmo rinforzato, cinturino da polso regolabile."}	49.99	180	72
95	Set di Colori Acrilici Professionali (12 Colori)	Artistic Creations	{"cn": "12种鲜艳的专业级丙烯颜料套装，适合各种水平的艺术家。", "de": "Set mit 12 lebendigen professionellen Acrylfarben, ideal für Künstler aller Niveaus.", "en": "Set of 12 vibrant professional-grade acrylic paints, ideal for artists of all levels.", "es": "Juego de 12 vibrantes pinturas acrílicas de grado profesional, ideal para artistas de todos los niveles.", "fr": "Ensemble de 12 peintures acryliques vibrantes de qualité professionnelle, idéales pour les artistes de tous niveaux.", "it": "Set di 12 vivaci colori acrilici di qualità professionale, ideali per artisti di tutti i livelli."}	{"cn": "22毫升管装，快干，防水，耐光，适用于画布、木材、织物。", "de": "22ml Tuben, schnell trocknend, wasserabweisend, lichtecht, geeignet für Leinwand, Holz, Stoff.", "en": "22ml tubes, fast-drying, water-resistant, lightfast, suitable for canvas, wood, fabric.", "es": "Tubos de 22 ml, secado rápido, resistente al agua, resistente a la luz, apto para lienzo, madera, tela.", "fr": "Tubes de 22 ml, séchage rapide, résistant à l'eau, résistant à la lumière, convient pour toile, bois, tissu.", "it": "Tubi da 22 ml, asciugatura rapida, resistente all'acqua, resistente alla luce, adatto per tela, legno, tessuto."}	28.99	400	73
96	Kit da Cucito Essenziale per Principianti	StitchPerfect	{"cn": "初学者综合缝纫工具包，包含所有基本工具和配件。", "de": "Umfassendes Nähset für Anfänger, das alle wichtigen Werkzeuge und Nähzubehör enthält.", "en": "Comprehensive sewing kit for beginners, containing all essential tools and notions.", "es": "Kit de costura completo para principiantes, que contiene todas las herramientas y nociones esenciales.", "fr": "Kit de couture complet pour débutants, contenant tous les outils et fournitures essentiels.", "it": "Kit da cucito completo per principianti, contenente tutti gli strumenti e i materiali essenziali."}	{"cn": "包含剪刀，卷尺，顶针，针，各种线，针插，收纳盒。", "de": "Inklusive Schere, Maßband, Fingerhut, Nadeln, Fadensortiment, Nadelkissen, Aufbewahrungskoffer.", "en": "Includes scissors, measuring tape, thimble, needles, thread assortment, pincushion, storage case.", "es": "Incluye tijeras, cinta métrica, dedal, agujas, surtido de hilos, alfiletero, estuche de almacenamiento.", "fr": "Comprend des ciseaux, un mètre ruban, un dé à coudre, des aiguilles, un assortiment de fils, un coussin à épingles, un étui de rangement.", "it": "Include forbici, metro a nastro, ditale, aghi, assortimento di fili, puntaspilli, custodia."}	20.00	300	74
97	Set Completo di Colla a Caldo e Bastoncini	CraftyWorks	{"cn": "多功能热熔胶枪套件，带多根胶棒，非常适合各种手工艺项目。", "de": "Vielseitiges Heißklebepistolen-Kit mit mehreren Klebestiften, perfekt für verschiedene Bastelprojekte.", "en": "Versatile hot glue gun kit with multiple glue sticks, perfect for various craft projects.", "es": "Kit de pistola de pegamento caliente versátil con varias barras de pegamento, perfecto para diversos proyectos de manualidades.", "fr": "Kit de pistolet à colle chaude polyvalent avec plusieurs bâtons de colle, parfait pour divers projets d'artisanat.", "it": "Versatile kit pistola per colla a caldo con più bastoncini di colla, perfetto per vari progetti artigianali."}	{"cn": "功率：60W | 预热时间：3-5分钟 | 包含：20根胶棒 | 材质：ABS塑料 | 电压：100-240V", "de": "Leistung: 60W | Aufheizzeit: 3–5 Minuten | Enthält: 20 Klebestifte | Material: ABS-Kunststoff | Spannung: 100–240V", "en": "Power: 60W | Preheat Time: 3-5 minutes | Includes: 20 glue sticks | Material: ABS plastic | Voltage: 100-240V", "es": "Potencia: 60W | Tiempo de calentamiento: 3-5 minutos | Incluye: 20 barras de pegamento | Material: plástico ABS | Voltaje: 100-240V", "fr": "Puissance: 60W | Temps de préchauffage: 3-5 minutes | Comprend: 20 bâtons de colle | Matériau: plastique ABS | Tension: 100-240V", "it": "Potenza: 60W | Tempo di riscaldamento: 3-5 minuti | Include: 20 bastoncini di colla | Materiale: plastica ABS | Voltaggio: 100-240V"}	25.99	400	75
98	Set di Ferri da Maglia Ergonomici	YarnCraft	{"cn": "符合人体工程学的针织针套装，提供舒适流畅的针织体验。", "de": "Set ergonomischer Stricknadeln für ein komfortables und reibungsloses Strickerlebnis.", "en": "Set of ergonomic knitting needles for comfortable and smooth knitting experience.", "es": "Juego de agujas de tejer ergonómicas para una experiencia de tejido cómoda y suave.", "fr": "Ensemble d'aiguilles à tricoter ergonomiques pour une expérience de tricot confortable et fluide.", "it": "Set di ferri da maglia ergonomici per un'esperienza di lavoro a maglia confortevole e fluida."}	{"cn": "10双（2.0毫米-6.0毫米），光滑铝材，舒适握柄，包含收纳盒。", "de": "10 Paar (Größen 2,0 mm-6,0 mm), glattes Aluminium, bequeme Griffe, Etui inklusive.", "en": "10 pairs (sizes 2.0mm-6.0mm), smooth aluminum, comfortable grip handles, case included.", "es": "10 pares (tallas 2.0mm-6.0mm), aluminio liso, mangos de agarre cómodo, estuche incluido.", "fr": "10 paires (tailles 2,0 mm-6,0 mm), aluminium lisse, poignées confortables, étui inclus.", "it": "10 paia (misure 2.0mm-6.0mm), alluminio liscio, manici con impugnatura comoda, custodia inclusa."}	32.00	180	77
99	Kit per Ceramica per Principianti con Argilla e Utensili	ClayArt Studio	{"cn": "初学者陶艺套件，包含风干粘土和基本雕塑工具。", "de": "Komplettes Töpfer-Kit für Anfänger, inklusive lufttrocknendem Ton und wichtigen Modellierwerkzeugen.", "en": "Complete pottery kit for beginners, including air-dry clay and essential sculpting tools.", "es": "Kit completo de cerámica para principiantes, que incluye arcilla de secado al aire y herramientas esenciales para esculpir.", "fr": "Kit de poterie complet pour débutants, comprenant de l'argile séchant à l'air et des outils de sculpture essentiels.", "it": "Kit completo per ceramica per principianti, include argilla che asciuga all'aria e strumenti essenziali per la scultura."}	{"cn": "2公斤风干粘土，8件雕塑工具，画笔，指导手册，无毒。", "de": "2 kg lufttrocknender Ton, 8 Modellierwerkzeuge, Pinsel, Anleitung, ungiftig.", "en": "2kg air-dry clay, 8 sculpting tools, painting brushes, instructional guide, non-toxic.", "es": "2 kg de arcilla de secado al aire, 8 herramientas para esculpir, pinceles, guía de instrucciones, no tóxico.", "fr": "2 kg d'argile séchant à l'air, 8 outils de sculpture, pinceaux, guide d'instructions, non toxique.", "it": "2 kg di argilla che asciuga all'aria, 8 strumenti per scolpire, pennelli, guida didattica, non tossico."}	45.00	120	78
100	Set di Utensili da Intaglio Legno per Principianti	WoodWorks Tools	{"cn": "适合初学者的木工雕刻工具套装，非常适合小型雕刻项目和手工艺品。", "de": "Anfängerfreundliches Holzschnitzwerkzeug-Set, ideal für kleine Schnitzprojekte und Bastelarbeiten.", "en": "Beginner-friendly woodworking carving tool set, ideal for small carving projects and crafts.", "es": "Juego de herramientas de tallado de madera para principiantes, ideal para pequeños proyectos y manualidades.", "fr": "Ensemble d'outils de sculpture sur bois pour débutants, idéal pour les petits projets de sculpture et d'artisanat.", "it": "Set di utensili da intaglio del legno adatto ai principianti, ideale per piccoli progetti e lavori artigianali."}	{"cn": "12件套，锋利碳钢刀片，舒适木柄，保护卷袋。", "de": "12-teiliges Set, scharfe Karbonstahlklingen, bequeme Holzgriffe, schützende Roll-Up-Tasche.", "en": "12-piece set, sharp carbon steel blades, comfortable wooden handles, protective roll-up pouch.", "es": "Juego de 12 piezas, cuchillas afiladas de acero al carbono, mangos de madera cómodos, estuche enrollable protector.", "fr": "Ensemble de 12 pièces, lames tranchantes en acier au carbone, poignées en bois confortables, pochette de rangement protectrice.", "it": "Set da 12 pezzi, lame affilate in acciaio al carbonio, manici in legno comodi, custodia protettiva arrotolabile."}	38.00	100	79
101	Collana con Pendente Goccia di Cristallo	SparkleJewels	{"cn": "优雅的水晶水滴吊坠项链，为任何服装增添一丝光彩。", "de": "Elegante Kristalltropfen-Halskette, die jedem Outfit einen Hauch von Glanz verleiht.", "en": "Elegant crystal drop pendant necklace, adding a touch of sparkle to any outfit.", "es": "Elegante collar con colgante de gota de cristal, que añade un toque de brillo a cualquier conjunto.", "fr": "Élégant collier avec pendentif goutte de cristal, ajoutant une touche d'éclat à n'importe quelle tenue.", "it": "Elegante collana con pendente a goccia di cristallo, che aggiunge un tocco di brillantezza a qualsiasi outfit."}	{"cn": "镀铑，纯正水晶，链长40-45厘米可调，龙虾扣。", "de": "Rhodiumbeschichtet, echter Kristall, verstellbare Kettenlänge 40-45 cm, Karabinerverschluss.", "en": "Rhodium-plated, genuine crystal, adjustable chain length 40-45cm, lobster clasp closure.", "es": "Chapado en rodio, cristal genuino, longitud de cadena ajustable de 40-45 cm, cierre de langosta.", "fr": "Plaqué rhodium, cristal véritable, longueur de chaîne réglable de 40-45 cm, fermoir mousqueton.", "it": "Placcato rodio, cristallo autentico, lunghezza catena regolabile 40-45 cm, chiusura a moschettone."}	55.00	200	80
102	Bracciale Rigido Aperto in Acciaio Inossidabile	ModernMetal	{"cn": "简约抛光不锈钢开口手镯，男女皆宜。", "de": "Minimalistischer offener Armreif aus poliertem Edelstahl, sowohl für Männer als auch für Frauen geeignet.", "en": "Minimalist open cuff bracelet in polished stainless steel, suitable for both men and women.", "es": "Pulsera abierta minimalista de acero inoxidable pulido, adecuada tanto para hombres como para mujeres.", "fr": "Bracelet jonc ouvert minimaliste en acier inoxydable poli, convient aux hommes et aux femmes.", "it": "Bracciale rigido aperto minimalista in acciaio inossidabile lucido, adatto sia per uomo che per donna."}	{"cn": "低过敏性，防变色，可调节以适应大多数手腕尺寸，时尚现代设计。", "de": "Hypoallergen, anlaufbeständig, anpassbar an die meisten Handgelenksgrößen, schlankes und modernes Design.", "en": "Hypoallergenic, tarnish-resistant, adjustable to fit most wrist sizes, sleek and modern design.", "es": "Hipoalergénico, resistente al deslustre, ajustable para adaptarse a la mayoría de los tamaños de muñeca, diseño elegante y moderno.", "fr": "Hypoallergénique, résistant au ternissement, ajustable pour s'adapter à la plupart des tailles de poignet, design élégant et moderne.", "it": "Ipoallergenico, resistente all'ossidazione, regolabile per adattarsi alla maggior parte delle dimensioni del polso, design elegante e moderno."}	35.00	280	81
103	Orecchini a Cerchio Dorati con Cristalli	GlamourGlimmer	{"cn": "璀璨镀金圈形耳环，镶嵌闪亮水晶，非常适合特殊场合。", "de": "Blendende vergoldete Creolen, verziert mit funkelnden Kristallen, perfekt für besondere Anlässe.", "en": "Dazzling gold-plated hoop earrings adorned with sparkling crystals, perfect for special occasions.", "es": "Deslumbrantes aretes de aro chapados en oro adornados con cristales brillantes, perfectos para ocasiones especiales.", "fr": "Boucles d'oreilles créoles plaquées or éblouissantes ornées de cristaux étincelants, parfaites pour les occasions spéciales.", "it": "Abbaglianti orecchini a cerchio placcati oro adornati con cristalli scintillanti, perfetti per le occasioni speciali."}	{"cn": "不含镍，不含铅，安全搭扣，轻巧舒适。", "de": "Nickelfrei, bleifrei, sicherer Verschluss, leicht und bequem.", "en": "Nickel-free, lead-free, secure clasp, lightweight and comfortable.", "es": "Sin níquel, sin plomo, cierre seguro, ligero y cómodo.", "fr": "Sans nickel, sans plomb, fermoir sécurisé, léger et confortable.", "it": "Senza nichel, senza piombo, chiusura sicura, leggero e confortevole."}	42.00	150	82
104	Anello Solitario in Argento con Zirconia Cubica	SilverDreams	{"cn": "经典的纯银单钻戒指，镶嵌璀璨立方氧化锆，非常适合日常优雅。", "de": "Klassischer Solitärring aus Sterlingsilber mit einem brillanten Zirkonia, perfekt für die tägliche Eleganz.", "en": "Classic sterling silver solitaire ring featuring a brilliant cubic zirconia, perfect for everyday elegance.", "es": "Anillo solitario clásico de plata de ley con una brillante circonita cúbica, perfecto para la elegancia diaria.", "fr": "Bague solitaire classique en argent sterling avec une zircone cubique brillante, parfaite pour l'élégance quotidienne.", "it": "Classico anello solitario in argento sterling con una brillante zirconia cubica, perfetto per l'eleganza quotidiana."}	{"cn": "925纯银，AAA级立方氧化锆，多种尺寸可选，抛光处理。", "de": "925er Sterlingsilber, AAA-Zirkonia, verschiedene Größen erhältlich, polierte Oberfläche.", "en": "925 sterling silver, AAA grade cubic zirconia, various sizes available, polished finish.", "es": "Plata de ley 925, circonita cúbica de grado AAA, varios tamaños disponibles, acabado pulido.", "fr": "Argent sterling 925, zircone cubique de grade AAA, différentes tailles disponibles, finition polie.", "it": "Argento sterling 925, zirconia cubica di grado AAA, varie taglie disponibili, finitura lucida."}	39.99	220	83
105	Orologio Cronografo Sportivo da Uomo	ActiveTime	{"cn": "坚固的男士运动计时码表，适合积极的生活方式和精确计时。", "de": "Robuste Sportchronographenuhr für Herren, ideal für einen aktiven Lebensstil und präzise Zeitmessung.", "en": "Robust sports chronograph watch for men, ideal for active lifestyles and precise timekeeping.", "es": "Robusto reloj cronógrafo deportivo para hombre, ideal para estilos de vida activos y una medición precisa del tiempo.", "fr": "Montre chronographe sportive robuste pour homme, idéale pour les modes de vie actifs et la mesure précise du temps.", "it": "Robusto orologio cronografo sportivo da uomo, ideale per stili di vita attivi e una precisa misurazione del tempo."}	{"cn": "不锈钢表壳，硅胶表带，石英机芯，100米防水，日期显示。", "de": "Edelstahlgehäuse, Silikonarmband, Quarzwerk, 100m Wasserdichtigkeit, Datumsanzeige.", "en": "Stainless steel case, silicone strap, quartz movement, 100m water resistance, date display.", "es": "Caja de acero inoxidable, correa de silicona, movimiento de cuarzo, resistencia al agua de 100 m, visualización de la fecha.", "fr": "Boîtier en acier inoxydable, bracelet en silicone, mouvement à quartz, résistance à l'eau de 100 m, affichage de la date.", "it": "Cassa in acciaio inossidabile, cinturino in silicone, movimento al quarzo, resistenza all'acqua 100m, display data."}	180.00	100	84
106	Orologio da Donna con Cinturino in Maglia Milanaise	ElegantTime	{"cn": "优雅的女士腕表，搭配时尚米兰尼斯网状表带，完美展现精致风格。", "de": "Elegante Damenuhr mit elegantem Mailänder-Mesh-Armband, perfekt für einen anspruchsvollen Stil.", "en": "Elegant women's watch with a sleek Milanese mesh strap, perfect for sophisticated style.", "es": "Elegante reloj de mujer con una elegante correa de malla milanesa, perfecto para un estilo sofisticado.", "fr": "Élégante montre femme avec un bracelet en maille milanaise élégant, parfaite pour un style sophistiqué.", "it": "Elegante orologio da donna con un raffinato cinturino in maglia milanese, perfetto per uno stile sofisticato."}	{"cn": "不锈钢表壳，精准石英机芯，简约表盘，可调节表带，防水。", "de": "Edelstahlgehäuse, präzises Quarzwerk, minimalistisches Zifferblatt, verstellbares Armband, wasserdicht.", "en": "Stainless steel case, precise quartz movement, minimalist dial, adjustable strap, water resistant.", "es": "Caja de acero inoxidable, movimiento de cuarzo preciso, esfera minimalista, correa ajustable, resistente al agua.", "fr": "Boîtier en acier inoxydable, mouvement à quartz précis, cadran minimaliste, bracelet réglable, résistant à l'eau.", "it": "Cassa in acciaio inossidabile, movimento al quarzo preciso, quadrante minimalista, cinturino regolabile, resistente all'acqua."}	119.99	120	85
107	Orologio Automatico da Uomo in Oro 18 carati	HauteHorlogerie	{"cn": "精美的18K金自动腕表，奢华与精准的永恒杰作。", "de": "Exquisite 18 Karat Gold Automatikuhr, ein zeitloses Meisterwerk an Luxus und Präzision.", "en": "Exquisite 18k gold automatic watch, a timeless masterpiece of luxury and precision.", "es": "Exquisito reloj automático de oro de 18 quilates, una obra maestra atemporal de lujo y precisión.", "fr": "Montre automatique exquise en or 18 carats, un chef-d'œuvre intemporel de luxe et de précision.", "it": "Squisito orologio automatico in oro 18 carati, un capolavoro senza tempo di lusso e precisione."}	{"cn": "瑞士制造自动机芯，蓝宝石水晶，鳄鱼皮表带，50米防水，限量版。", "de": "Schweizer Automatikwerk, Saphirglas, Alligatorlederarmband, 50m Wasserdichtigkeit, limitierte Auflage.", "en": "Swiss made automatic movement, sapphire crystal, alligator leather strap, 50m water resistance, limited edition.", "es": "Movimiento automático de fabricación suiza, cristal de zafiro, correa de piel de cocodrilo, 50 m de resistencia al agua, edición limitada.", "fr": "Mouvement automatique de fabrication suisse, verre saphir, bracelet en cuir d'alligator, étanchéité à 50 m, édition limitée.", "it": "Movimento automatico di fabbricazione svizzera, vetro zaffiro, cinturino in pelle di alligatore, resistenza all'acqua 50 m, edizione limitata."}	15000.00	5	86
108	Cinturino per Orologio in Vera Pelle di Ricambio	StrapMaster	{"cn": "高品质真皮替换表带，提升舒适度和风格。", "de": "Hochwertiges Ersatzarmband aus echtem Leder, das Komfort und Stil verbessert.", "en": "High-quality genuine leather replacement watch strap, enhancing comfort and style.", "es": "Correa de reloj de repuesto de cuero genuino de alta calidad, que mejora la comodidad y el estilo.", "fr": "Bracelet de montre de rechange en cuir véritable de haute qualité, améliorant le confort et le style.", "it": "Cinturino di ricambio per orologio in vera pelle di alta qualità, che migliora il comfort e lo stile."}	{"cn": "有18毫米、20毫米、22毫米宽度可选，多种颜色，快速释放弹簧杆。", "de": "Erhältlich in 18 mm, 20 mm, 22 mm Breiten, verschiedene Farben, Schnellverschluss-Federstege.", "en": "Available in 18mm, 20mm, 22mm widths, various colors, quick release spring bars.", "es": "Disponible en anchos de 18 mm, 20 mm, 22 mm, varios colores, pasadores de liberación rápida.", "fr": "Disponible en largeurs de 18 mm, 20 mm, 22 mm, différentes couleurs, barres à ressort à dégagement rapide.", "it": "Disponibile in larghezze da 18mm, 20mm, 22mm, vari colori, anse a sgancio rapido."}	25.00	300	87
109	Termostato Intelligente Wi-Fi	SmartHome Solutions	{"cn": "智能Wi-Fi恒温器，实现高效家庭气候控制和节能。", "de": "Intelligenter Wi-Fi-Thermostat für effiziente Klimaregelung und Energieeinsparung zu Hause.", "en": "Smart Wi-Fi thermostat for efficient home climate control and energy saving.", "es": "Termostato inteligente Wi-Fi para un control eficiente del clima del hogar y ahorro de energía.", "fr": "Thermostat intelligent Wi-Fi pour un contrôle climatique domestique efficace et des économies d'énergie.", "it": "Termostato Wi-Fi intelligente per un controllo efficiente del clima domestico e il risparmio energetico."}	{"cn": "App控制，兼容语音助手（Alexa/Google Home），地理围栏，能源使用报告。", "de": "App-Steuerung, sprachassistentenkompatibel (Alexa/Google Home), Geofencing, Energieverbrauchsberichte.", "en": "App control, voice assistant compatible (Alexa/Google Home), geofencing, energy usage reports.", "es": "Control de aplicaciones, compatible con asistente de voz (Alexa/Google Home), geocercado, informes de uso de energía.", "fr": "Contrôle par application, compatible assistant vocal (Alexa/Google Home), géorepérage, rapports de consommation d'énergie.", "it": "Controllo tramite app, compatibile con assistente vocale (Alexa/Google Home), geofencing, rapporti sull'utilizzo energetico."}	149.99	100	96
110	Drone Pieghevole con Telecamera 4K	AeroCam	{"cn": "小巧可折叠无人机，带高分辨率4K摄像头，非常适合空中摄影。", "de": "Kompakte und faltbare Drohne mit hochauflösender 4K-Kamera, perfekt für Luftaufnahmen.", "en": "Compact and foldable drone with a high-resolution 4K camera, perfect for aerial photography.", "es": "Drone compacto y plegable con una cámara 4K de alta resolución, perfecto para fotografía aérea.", "fr": "Drone compact et pliable avec une caméra 4K haute résolution, parfait pour la photographie aérienne.", "it": "Drone compatto e pieghevole con una fotocamera 4K ad alta risoluzione, perfetto per la fotografia aerea."}	{"cn": "25分钟飞行时间，2公里传输范围，GPS自动返航，智能飞行模式。", "de": "25 Minuten Flugzeit, 2 km Übertragungsreichweite, GPS-Auto-Rückkehr, intelligente Flugmodi.", "en": "25-minute flight time, 2km transmission range, GPS auto-return, intelligent flight modes.", "es": "25 minutos de tiempo de vuelo, 2 km de alcance de transmisión, retorno automático por GPS, modos de vuelo inteligentes.", "fr": "Autonomie de vol de 25 minutes, portée de transmission de 2 km, retour automatique GPS, modes de vol intelligents.", "it": "25 minuti di autonomia di volo, portata di trasmissione di 2 km, ritorno automatico GPS, modalità di volo intelligenti."}	349.00	50	97
111	Visore VR All-in-One con Controller	ImmersionTech	{"cn": "一体式虚拟现实头显，带直观控制器，带来沉浸式游戏和体验。", "de": "All-in-One Virtual-Reality-Headset mit intuitiven Controllern für immersive Spiele und Erlebnisse.", "en": "All-in-one virtual reality headset with intuitive controllers for immersive gaming and experiences.", "es": "Casco de realidad virtual todo en uno con controladores intuitivos para juegos y experiencias inmersivas.", "fr": "Casque de réalité virtuelle tout-en-un avec des contrôleurs intuitifs pour des jeux et des expériences immersives.", "it": "Visore di realtà virtuale all-in-one con controller intuitivi per giochi ed esperienze immersive."}	{"cn": "2560x1440分辨率，90Hz刷新率，内置音频，独立运行，可通过Link兼容PC VR。", "de": "2560x1440 Auflösung, 90Hz Bildwiederholfrequenz, integrierter Audio, eigenständiger Betrieb, kompatibel mit PC VR über Link.", "en": "2560x1440 resolution, 90Hz refresh rate, built-in audio, standalone operation, compatible with PC VR via Link.", "es": "Resolución de 2560x1440, frecuencia de actualización de 90 Hz, audio integrado, funcionamiento autónomo, compatible con PC VR a través de Link.", "fr": "Résolution 2560x1440, taux de rafraîchissement de 90 Hz, audio intégré, fonctionnement autonome, compatible PC VR via Link.", "it": "Risoluzione 2560x1440, frequenza di aggiornamento 90Hz, audio integrato, funzionamento autonomo, compatibile con PC VR tramite Link."}	399.00	70	98
112	Kit di Costruzione Robotica Programmabile per Bambini	FutureBots	{"cn": "教育机器人搭建套件，通过动手搭建教授孩子们工程和编程知识。", "de": "Pädagogisches Robotik-Baukasten, das Kindern Ingenieurwesen und Programmierung durch praktisches Bauen vermittelt.", "en": "Educational robotics construction kit, teaching kids about engineering and programming through hands-on building.", "es": "Kit de construcción de robótica educativa, que enseña a los niños sobre ingeniería y programación a través de la construcción práctica.", "fr": "Kit de construction robotique éducatif, enseignant aux enfants l'ingénierie et la programmation par la construction pratique.", "it": "Kit di costruzione robotica educativo, che insegna ai bambini l'ingegneria e la programmazione attraverso la costruzione pratica."}	{"cn": "模块化设计，图形化编程界面，多种传感器类型，兼容智能手机App。", "de": "Modulares Design, grafische Programmieroberfläche, mehrere Sensortypen, kompatibel mit Smartphone-App.", "en": "Modular design, graphical programming interface, multiple sensor types, compatible with smartphone app.", "es": "Diseño modular, interfaz de programación gráfica, múltiples tipos de sensores, compatible con la aplicación de teléfono inteligente.", "fr": "Conception modulaire, interface de programmation graphique, plusieurs types de capteurs, compatible avec l'application smartphone.", "it": "Design modulare, interfaccia di programmazione grafica, più tipi di sensori, compatibile con app per smartphone."}	129.99	80	99
113	Filamento PLA per Stampa 3D (1kg - Nero)	PrintPerfect	{"cn": "高品质黑色PLA 3D打印耗材，打印效果出色，易于使用。", "de": "Hochwertiges schwarzes PLA-Filament für den 3D-Druck, das hervorragende Druckergebnisse und Benutzerfreundlichkeit bietet.", "en": "High-quality black PLA filament for 3D printing, offering excellent print results and ease of use.", "es": "Filamento PLA negro de alta calidad para impresión 3D, que ofrece excelentes resultados de impresión y facilidad de uso.", "fr": "Filament PLA noir de haute qualité pour l'impression 3D, offrant d'excellents résultats d'impression et une facilité d'utilisation.", "it": "Filamento PLA nero di alta qualità per la stampa 3D, offre risultati di stampa eccellenti e facilità d'uso."}	{"cn": "1.75毫米直径，1公斤卷轴，环保，低翘曲，兼容大多数FDM 3D打印机。", "de": "1,75mm Durchmesser, 1kg Spule, umweltfreundlich, geringe Verzugsneigung, kompatibel mit den meisten FDM 3D-Druckern.", "en": "1.75mm diameter, 1kg spool, environmentally friendly, low warping, compatible with most FDM 3D printers.", "es": "1,75 mm de diámetro, bobina de 1 kg, respetuoso con el medio ambiente, baja deformación, compatible con la mayoría de las impresoras 3D FDM.", "fr": "Diamètre de 1,75 mm, bobine de 1 kg, respectueux de l'environnement, faible déformation, compatible avec la plupart des imprimantes 3D FDM.", "it": "Diametro 1,75 mm, bobina da 1 kg, ecologico, bassa deformazione, compatibile con la maggior parte delle stampanti 3D FDM."}	24.99	200	100
114	Libro - 'Introduzione all'Intelligenza Artificiale'	TechKnowledge	{"cn": "人工智能全面介绍，涵盖基本概念和应用。", "de": "Umfassende Einführung in die Künstliche Intelligenz, die grundlegende Konzepte und Anwendungen abdeckt.", "en": "Comprehensive introduction to Artificial Intelligence, covering fundamental concepts and applications.", "es": "Introducción completa a la Inteligencia Artificial, que cubre conceptos fundamentales y aplicaciones.", "fr": "Introduction complète à l'Intelligence Artificielle, couvrant les concepts fondamentaux et les applications.", "it": "Introduzione completa all'Intelligenza Artificiale, che copre concetti fondamentali e applicazioni."}	{"cn": "教材风格，500页，包含练习和案例研究，适合学生和专业人士。", "de": "Lehrbuchstil, 500 Seiten, inklusive Übungen und Fallstudien, geeignet für Studenten und Fachleute.", "en": "Textbook style, 500 pages, includes exercises and case studies, suitable for students and professionals.", "es": "Estilo libro de texto, 500 páginas, incluye ejercicios y estudios de caso, apto para estudiantes y profesionales.", "fr": "Style manuel, 500 pages, comprend des exercices et des études de cas, convient aux étudiants et aux professionnels.", "it": "Stile libro di testo, 500 pagine, include esercizi e casi di studio, adatto a studenti e professionisti."}	45.00	100	101
115	Monopattino Elettrico Pieghevole per Pendolari	UrbanGlide	{"cn": "可折叠电动滑板车，高效城市通勤，提供快速环保的骑行体验。", "de": "Faltbarer Elektroroller für effizientes Pendeln in der Stadt, der eine schnelle und umweltfreundliche Fahrt bietet.", "en": "Foldable electric scooter for efficient urban commuting, offering a fast and eco-friendly ride.", "es": "Patinete eléctrico plegable para desplazamientos urbanos eficientes, que ofrece un viaje rápido y ecológico.", "fr": "Trottinette électrique pliable pour les déplacements urbains efficaces, offrant une conduite rapide et écologique.", "it": "Monopattino elettrico pieghevole per pendolari urbani efficienti, offre una guida veloce ed ecologica."}	{"cn": "最高时速25公里/小时，续航30公里，350W电机，碟刹，LED显示屏，轻质铝合金车架。", "de": "25 km/h Höchstgeschwindigkeit, 30 km Reichweite, 350W Motor, Scheibenbremsen, LED-Anzeige, leichter Aluminiumrahmen.", "en": "25km/h max speed, 30km range, 350W motor, disc brakes, LED display, lightweight aluminum frame.", "es": "Velocidad máxima de 25 km/h, autonomía de 30 km, motor de 350W, frenos de disco, pantalla LED, cuadro ligero de aluminio.", "fr": "Vitesse max 25 km/h, autonomie 30 km, moteur 350W, freins à disque, écran LED, cadre en aluminium léger.", "it": "Velocità massima 25 km/h, autonomia 30 km, motore 350W, freni a disco, display LED, telaio leggero in alluminio."}	499.00	60	102
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, text, rating, user_id, product_id, "timestamp") FROM stdin;
1	Tastiera meccanica RGB super reattiva e personalizzabile. Perfetta per il gaming, i tasti sono un piacere da premere.	5	3	36	2025-05-25 17:35:07.956422
2	Questo Smartphone X100 è incredibile! Veloce, display magnifico e fotocamera top. Super consigliato!	5	3	10	2025-05-25 17:35:54.554874
3	Buon telefono, fa il suo dovere. La batteria dura un po' meno di quanto sperassi, ma nel complesso soddisfatto.	4	3	10	2025-05-25 17:36:12.612417
4	Decisamente deluso. Si blocca spesso e la qualità audio in chiamata non è buona. Mi aspettavo molto di più per il prezzo.	2	3	10	2025-05-25 17:36:19.246446
5	Il Laptop Pro è una bestia! Perfetto per gaming e editing video. Lo schermo 4K è stupendo.	5	3	11	2025-05-25 17:38:59.717341
6	Laptop potente, ma il raffreddamento è un po' rumoroso sotto stress. Non male, ma non eccellente.	3	3	11	2025-05-25 17:39:11.481353
7	Assolutamente orribile. Il portatile è arrivato con un pixel bruciato e si surriscalda troppo rapidamente. Restituirò.	1	3	11	2025-05-25 17:39:25.136858
8	Ottima Smart TV, i colori sono vividi e l'interfaccia Android TV è molto fluida. Un buon acquisto per il salotto.	4	3	12	2025-05-25 17:39:40.776357
9	Buona qualità d'immagine, ma l'audio integrato è piuttosto scarso. Consiglio una soundbar a parte.	3	3	12	2025-05-25 17:39:52.773468
10	Fotocamera DSLR Z7 è fantastica! La risoluzione è pazzesca e l'autofocus rapidissimo. Ideale per professionisti.	5	3	13	2025-05-25 17:40:03.700845
11	Una buona DSLR, ma il prezzo è un po' elevato per le mie esigenze amatoriali. Le foto sono comunque stupende.	4	3	13	2025-05-25 17:40:43.1944
12	Questo smartwatch è il mio compagno di allenamento ideale. Batteria duratura e GPS precisissimo. Non potrei farne a meno.	5	3	14	2025-05-25 17:41:03.391036
13	Funziona bene per il fitness, ma le notifiche a volte sono un po' lente. Niente di grave, ma si può migliorare.	3	3	14	2025-05-25 17:41:12.520071
14	Un ottimo smartphone per il prezzo. Veloce e con una buona fotocamera. Non è un top di gamma, ma è un affare.	4	3	15	2025-05-25 17:41:23.13744
15	Il telefono è lento e la batteria non dura nulla. Il "prezzo scontato" non giustifica le scarse prestazioni.	2	3	15	2025-05-25 17:41:31.569263
16	Libro interessante, offre buoni spunti di riflessione per uno stile di vita più consapevole.	4	3	16	2025-05-25 17:41:41.272398
17	Alcuni concetti sono un po' ripetitivi, ma nel complesso è una lettura piacevole e utile.	3	3	16	2025-05-25 17:41:52.664201
18	Giacca calda e stilosissima! Ottima qualità dei materiali e veste benissimo.	5	3	17	2025-05-25 17:42:06.087385
19	Buona giacca, ma la taglia mi sembra un po' piccola rispetto agli standard. Consiglio di prendere una taglia in più.	3	3	17	2025-05-25 17:42:13.465423
20	Tavolo e sedie molto belli e moderni. Facile da montare. Sembra robusto.	4	3	18	2025-05-25 17:42:25.270738
21	Arrivato con un piccolo graffio sul piano del tavolo. La qualità costruttiva è discreta, ma niente di eccezionale.	2	3	18	2025-05-25 17:42:34.063815
22	Regalo perfetto per i bambini, li ha intrattenuti per ore e hanno imparato tantissimo. Ottimo kit scientifico!	5	3	19	2025-05-25 17:42:43.100252
23	Kit ben fatto, ma alcune istruzioni erano un po' complesse per un bambino senza supervisione. Utile con un adulto.	4	3	19	2025-05-25 17:42:50.772907
24	Questo siero viso è miracoloso! La mia pelle è molto più idratata e luminosa. Lo ricomprerò sicuramente.	5	3	20	2025-05-25 17:42:57.902801
25	Siero buono, non unge e si assorbe bene. Non ho notato effetti spettacolari ma idrata a sufficienza.	4	3	20	2025-05-25 17:43:06.195314
26	Tappetino yoga eccellente! Molto spesso e antiscivolo, rende le mie sessioni di yoga molto più comode.	5	3	21	2025-05-25 17:43:25.633921
27	Fa il suo lavoro, ma dopo qualche utilizzo tende a segnarsi. Mi aspettavo una maggiore resistenza.	3	3	21	2025-05-25 17:43:32.374928
28	Kit di pittura completo e ben assortito. Perfetto per iniziare a dipingere o per un regalo creativo.	4	3	22	2025-05-25 17:43:40.992294
29	I colori non sono di altissima qualità e i pennelli si rovinano facilmente. Va bene solo per un uso molto occasionale.	2	3	22	2025-05-25 17:43:50.896845
30	Orologio elegante e ben rifinito. Fa una bella figura al polso, molto contento dell'acquisto.	5	3	23	2025-05-25 17:44:01.079818
31	Bell'orologio, ma il cinturino è un po' rigido all'inizio. Ci vuole un po' per abituarsi.	4	3	23	2025-05-25 17:44:09.573425
32	Assistente AI molto utile per la casa. Risponde velocemente e controlla bene i dispositivi smart. Non tutte le funzioni sono ancora perfette.	4	3	24	2025-05-25 17:44:17.509303
33	L'assistente a volte non capisce i comandi vocali e ha difficoltà a connettersi con alcuni dispositivi. Potrebbe migliorare.	2	3	24	2025-05-25 17:44:26.111741
34	Giacca in denim perfetta! Vestibilità comoda e look super casual. Un capo che non passa mai di moda.	5	3	25	2025-05-25 17:44:33.737301
35	Sedia ergonomica abbastanza comoda per lunghe sessioni al PC. Il supporto lombare è un plus. Montaggio un po' laborioso.	4	3	26	2025-05-25 17:44:42.711812
36	Un classico intramontabile, mio figlio ci gioca per ore. Blocchi di legno di qualità, sicuri e resistenti.	5	3	28	2025-05-25 17:44:50.182835
37	Collana molto carina, il ciondolo è delicato e l'argento brillante. Un bel regalo, anche se la catena è un po' sottile.	4	3	30	2025-05-25 17:45:01.234258
\.


--
-- Data for Name: shipments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shipments (id, order_id, address, city, postal_code, country, carrier, tracking_number, status, shipped_at, delivered_at) FROM stdin;
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: special_offers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.special_offers (id, title, description, discount_percent, start_date, end_date, active, product_id, subcategory_id) FROM stdin;
1	Offerta Smartphone X100	Ultimo smartphone con funzionalità avanzate e alte prestazioni.	15.00	2025-06-01	2025-06-15	t	10	13
2	Offerta Libro - The Art of Living Well	Un viaggio illuminante nella scienza del benessere moderno.	20.00	2025-06-01	2025-06-15	t	16	29
5	Offerta Giacca Invernale Uomo	Giubbotto invernale elegante realizzato con materiali ecologici in super sconto!	12.50	2025-05-25	2025-06-10	t	17	39
6	Siero Viso Idratante in Offerta	Siero viso premium che idrata in profondità e migliora la texture della pelle ad un prezzo speciale.	8.00	2025-05-25	2025-06-07	t	20	57
7	Offerta Speciale Assistente AI	Assistente intelligente controllabile a voce con funzioni AI e automazione domestica in offerta limitata.	18.00	2025-05-25	2025-06-12	t	24	101
\.


--
-- Data for Name: subcategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subcategories (id, name, category_id) FROM stdin;
1	Prime Video	2
2	Prime Music	2
3	Prime Delivery	2
4	Prime Reading	2
5	Prime Gaming	2
6	Prime Pantry	2
7	Flash Deals	1
8	Limited Time Offers	1
9	Best Sellers Deals	1
10	Clearance Sales	1
11	Exclusive Online Deals	1
12	Seasonal Discounts	1
13	Smartphones	3
14	Laptops	3
15	TVs & Home Cinema	3
16	Cameras	3
17	Headphones	3
18	Wearable Tech	3
19	Computer Accessories	3
20	Gaming Consoles	3
21	Smart Home Devices	3
22	Fiction	4
23	Non-Fiction	4
24	Children's Books	4
25	Cookbooks	4
26	Comics & Graphic Novels	4
27	Educational Books	4
28	Biographies & Memoirs	4
29	Science & Technology	4
30	Men's Clothing	5
31	Women's Clothing	5
32	Kids' Fashion	5
33	Footwear	5
34	Accessories	5
35	Jewelry	5
36	Handbags & Wallets	5
37	Watches	5
38	Sportswear	5
39	Outerwear	5
40	Living Room Furniture	6
41	Bedroom Furniture	6
42	Kitchen & Dining	6
43	Home Decor	6
44	Lighting	6
45	Bedding & Bath	6
46	Storage & Organization	6
47	Outdoor Furniture	6
48	Office Furniture	6
49	Board Games	7
50	Action Figures	7
51	Educational Toys	7
52	Dolls & Accessories	7
53	Puzzles	7
54	Outdoor Play	7
55	Building Sets & Blocks	7
56	Electronic Toys	7
57	Skincare	8
58	Haircare	8
59	Makeup	8
60	Fragrances	8
61	Vitamins & Supplements	8
62	Personal Care	8
63	Oral Care	8
64	Men's Grooming	8
65	Camping & Hiking	9
66	Fitness Equipment	9
67	Cycling	9
68	Team Sports	9
69	Outdoor Recreation	9
70	Running	9
71	Water Sports	9
72	Winter Sports	9
73	Drawing & Painting	10
74	Sewing & Fabric	10
75	Craft Supplies	10
76	Scrapbooking	10
77	Knitting & Crochet	10
78	Pottery & Ceramics	10
79	Woodworking	10
80	Necklaces	11
81	Bracelets	11
82	Earrings	11
83	Rings	11
84	Men's Watches	11
85	Women's Watches	11
86	Luxury Watches	11
87	Watch Accessories	11
96	Domotic Device	12
97	Drones	12
98	Virtual Reality	12
99	Robotics	12
100	3D Printing	12
101	Artificial Intelligence	12
102	Electric Vehicles	12
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, surname, email, telephone, password, country, address, city, postalcode, specifications, latitude, longitude, termsaccepted, privacyaccepted, cookiesaccepted, marketingaccepted, subscribed_at, google_id, facebook_id, microsoft_id, is_completed) FROM stdin;
3	samuele	casalin	casalinsamuele@gmail.com	+393518003296	$2b$12$jb9Syd9bOpELE4JR8dOsuOkXAPKQ0udc31rxsjclMDKlG1/lyq1TG	IT	Via Teonghio 130/1	Orgiano	36040		45.3284186	11.472384	t	t	t	f	2025-05-25 17:26:31.061393	\N	\N	\N	t
\.


--
-- Data for Name: topology; Type: TABLE DATA; Schema: topology; Owner: postgres
--

COPY topology.topology (id, name, srid, "precision", hasz) FROM stdin;
\.


--
-- Data for Name: layer; Type: TABLE DATA; Schema: topology; Owner: postgres
--

COPY topology.layer (topology_id, layer_id, schema_name, table_name, feature_column, feature_type, level, child_id) FROM stdin;
\.


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_id_seq', 1, false);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 12, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- Name: product_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_images_id_seq', 549, true);


--
-- Name: product_models_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_models_id_seq', 65, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 115, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 37, true);


--
-- Name: shipments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shipments_id_seq', 1, false);


--
-- Name: special_offers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.special_offers_id_seq', 7, true);


--
-- Name: subcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subcategories_id_seq', 102, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: topology_id_seq; Type: SEQUENCE SET; Schema: topology; Owner: postgres
--

SELECT pg_catalog.setval('topology.topology_id_seq', 1, false);


--
-- Name: cart_items cart_items_cart_id_product_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_product_id_key UNIQUE (cart_id, product_id);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: payments payments_order_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_key UNIQUE (order_id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (id);


--
-- Name: product_models product_models_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_models
    ADD CONSTRAINT product_models_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: shipments shipments_order_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipments
    ADD CONSTRAINT shipments_order_id_key UNIQUE (order_id);


--
-- Name: shipments shipments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipments
    ADD CONSTRAINT shipments_pkey PRIMARY KEY (id);


--
-- Name: special_offers special_offers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.special_offers
    ADD CONSTRAINT special_offers_pkey PRIMARY KEY (id);


--
-- Name: subcategories subcategories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_name_key UNIQUE (name);


--
-- Name: subcategories subcategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_pkey PRIMARY KEY (id);


--
-- Name: special_offers unique_product_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.special_offers
    ADD CONSTRAINT unique_product_id UNIQUE (product_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_telephone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_telephone_key UNIQUE (telephone);


--
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE CASCADE;


--
-- Name: cart_items cart_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orders orders_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id);


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: payments payments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: product_images product_images_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: product_models product_models_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_models
    ADD CONSTRAINT product_models_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products products_subcategory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_subcategory_id_fkey FOREIGN KEY (subcategory_id) REFERENCES public.subcategories(id);


--
-- Name: reviews reviews_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: shipments shipments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipments
    ADD CONSTRAINT shipments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: special_offers special_offers_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.special_offers
    ADD CONSTRAINT special_offers_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: special_offers special_offers_subcategory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.special_offers
    ADD CONSTRAINT special_offers_subcategory_id_fkey FOREIGN KEY (subcategory_id) REFERENCES public.subcategories(id) ON DELETE CASCADE;


--
-- Name: subcategories subcategories_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- PostgreSQL database dump complete
--

