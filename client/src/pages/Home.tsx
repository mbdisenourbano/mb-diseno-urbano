/*
 * MB Diseño Urbano — Home Page
 * Design: Swiss Rationalism / Arquitectura Editorial
 * Sections: Hero, Quiénes Somos, Nuestro Rol, Servicios, Portafolio, Contacto
 */

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Menu, X } from "lucide-react";

// ─── Image URLs ────────────────────────────────────────────────────────────────
const LOGO = "/manus-storage/logo_mb_d0d02ff8.png";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663589322188/7nMPGwPPB7PYAMQiJH4cxH/hero_bg-dxN2NH3PD2UjnEzYEb38bp.webp";
const IMG_BICENTENARIO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663589322188/7nMPGwPPB7PYAMQiJH4cxH/proyecto_bicentenario-FJNAe5StvyWHTcpPio6zRY.webp";
const IMG_PARQUE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663589322188/7nMPGwPPB7PYAMQiJH4cxH/proyecto_parque-k4ja9Dxfe3NmB5bV88ZopQ.webp";
const IMG_CONCURSO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663589322188/7nMPGwPPB7PYAMQiJH4cxH/proyecto_concurso-gU3WedDbNWnWhMLFhuF3JY.webp";
const IMG_TERRITORIO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663589322188/7nMPGwPPB7PYAMQiJH4cxH/territorio_abstract-M2omtEJeBciAa8eCtqEDNb.webp";

// ─── Fade-in hook ──────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── FadeBox wrapper ───────────────────────────────────────────────────────────
function FadeBox({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className={`fade-in ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Quiénes Somos", href: "#quienes-somos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Portafolio", href: "#portafolio" },
    { label: "Contacto", href: "#contacto" },
  ];

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#F5F4F0]/95 backdrop-blur-sm border-b border-[#D8D5CC]" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between py-5">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2 group"
        >
          <img src={LOGO} alt="MB Logo" className="h-10 w-auto" />
          <span className="font-['Anek_Devanagari'] text-sm font-600 tracking-[0.08em] uppercase text-[#B8D946] group-hover:text-[#A0C000] transition-colors duration-300">Urbano</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="font-['DM_Sans'] text-xs font-400 tracking-[0.1em] uppercase text-white hover:text-[#B8D946] transition-colors duration-200"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#1C1C1C] hover:text-[#8A9A5B] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#F5F4F0] border-t border-[#D8D5CC] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="text-left font-['DM_Sans'] text-sm font-400 tracking-[0.1em] uppercase text-[#1C1C1C] hover:text-[#8A9A5B] transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="Vista aérea ciudad"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1C1C1C]/55" />
      </div>

      {/* Content */}
      <div className="relative container pb-20 pt-40">
        <div className="max-w-3xl">
          <p className="section-label text-[#8A9A5B] mb-6">Planificación y Gestión Territorial</p>
          <h1 className="font-['Anek_Devanagari'] text-5xl md:text-7xl font-400 text-white leading-[1.05] mb-8">
            Diseño<br />
            <em className="italic">Urbano</em>
          </h1>
          <p className="font-['DM_Sans'] text-base font-300 text-white/75 max-w-lg leading-relaxed mb-10">
            Oficina dedicada al desarrollo de estudios, consultorías y proyectos urbanos.
            Comprensión del territorio, articulación entre planificación, normativa y proyecto.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => document.querySelector("#portafolio")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 bg-[#8A9A5B] text-white font-['DM_Sans'] text-xs font-500 tracking-[0.12em] uppercase px-6 py-3 hover:bg-[#7A8A4B] transition-colors duration-200"
            >
              Ver Portafolio <ArrowRight size={14} />
            </button>
            <button
              onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
              className="font-['DM_Sans'] text-xs font-400 tracking-[0.12em] uppercase text-white/80 hover:text-white border-b border-white/40 hover:border-white pb-0.5 transition-colors duration-200"
            >
              Contactar
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-60">
        <span className="font-['DM_Sans'] text-[10px] tracking-[0.2em] uppercase text-white rotate-90 origin-center translate-x-4">Scroll</span>
        <div className="w-px h-12 bg-white/50" />
      </div>
    </section>
  );
}

// ─── Quiénes Somos ─────────────────────────────────────────────────────────────
function QuienesSomos() {
  return (
    <section id="quienes-somos" className="py-24 bg-[#F5F4F0]">
      <div className="container">
        <hr className="rule mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Left column */}
          <FadeBox>
            <p className="section-label mb-3">01</p>
            <h2 className="font-['Anek_Devanagari'] text-3xl md:text-4xl font-400 text-[#1C1C1C] leading-tight">
              Quiénes<br />Somos
            </h2>
          </FadeBox>

          {/* Right column */}
          <FadeBox delay={100}>
            <p className="font-['DM_Sans'] text-base font-300 text-[#3A3A3A] leading-relaxed mb-8">
              <strong className="font-500">MB Diseño Urbano</strong> es una oficina dedicada al desarrollo de estudios,
              consultorías y proyectos urbanos, liderada por Miguel Meza Buzeta, arquitecto.
              El trabajo se centra en la comprensión del territorio y en la articulación entre
              planificación, normativa y proyecto. Según la naturaleza de cada encargo se
              establecen colaboraciones con distintos profesionales y especialistas.
            </p>

            <hr className="rule mb-8" />

            {/* Profile */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-[#D8D5CC] rounded-full overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-[#C5C0B0] to-[#A8A090] flex items-center justify-center">
                  <span className="font-['Anek_Devanagari'] text-xl text-[#F5F4F0]">MM</span>
                </div>
              </div>
              <div>
                <p className="font-['Anek_Devanagari'] text-lg font-500 text-[#1C1C1C] mb-1">Miguel Meza Buzeta</p>
                <p className="section-label mb-2">Arquitecto / Director</p>
                <p className="font-['DM_Sans'] text-xs font-300 text-[#6A6A6A]">
                  Universidad de Artes y Ciencias de la Comunicación — UNIACC<br />
                  Dipl. B.I.M. / 2019
                </p>
              </div>
            </div>
          </FadeBox>
        </div>
      </div>
    </section>
  );
}

// ─── Nuestro Rol ───────────────────────────────────────────────────────────────
function NuestroRol() {
  return (
    <section className="py-24 bg-[#ECEAE3]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16 items-start">
          {/* Left — image */}
          <FadeBox className="relative">
            <img
              src={IMG_TERRITORIO}
              alt="Análisis territorial"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#ECEAE3]/60 to-transparent" />
          </FadeBox>

          {/* Right — text */}
          <FadeBox delay={150} className="flex flex-col justify-center">
            <p className="section-label mb-3">02</p>
            <h2 className="font-['Anek_Devanagari'] text-3xl md:text-4xl font-400 text-[#1C1C1C] leading-tight mb-6">
              Nuestro<br />Rol
            </h2>
            <p className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A] leading-relaxed mb-6">
              Interpretar el territorio, articular normativa y estructura territorial,
              y desarrollar estrategias de proyecto. El trabajo se basa en comprender
              cómo las condiciones territoriales, las estructuras existentes y los
              instrumentos de planificación interactúan en un lugar determinado.
            </p>
            <p className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A] leading-relaxed mb-8">
              Desde esa lectura surge el proyecto como una forma de ordenar,
              articular o activar el territorio.
            </p>
            <div className="border-l-2 border-[#8A9A5B] pl-4">
              <p className="font-['Anek_Devanagari'] text-sm italic text-[#5A5A5A] leading-relaxed">
                "Motor Territorial — una línea de reflexión y análisis que explora
                la relación entre normativa, territorio y proyecto."
              </p>
            </div>
          </FadeBox>
        </div>
      </div>
    </section>
  );
}

// ─── Servicios ─────────────────────────────────────────────────────────────────
function Servicios() {
  const items = [
    {
      num: "A",
      title: "Consultorías Territoriales y Urbanas",
      desc: "Orientadas a comprender y estructurar el territorio como base para la toma de decisiones en proyectos urbanos y procesos de planificación. Incluye estudios territoriales, análisis normativos, estrategias urbanas y apoyo en procesos de planificación.",
    },
    {
      num: "B",
      title: "Proyectos Urbanos",
      desc: "Desarrollo de proyectos de espacio público, paisajismo y diseño urbano. El trabajo territorial se desarrolla a través de colaboraciones interdisciplinarias que integran conocimientos y experiencias diversas.",
    },
    {
      num: "C",
      title: "Motor Territorial",
      desc: "Línea de reflexión y análisis que profundiza en la relación entre normativa, territorio y proyecto. Estudios, publicaciones y estrategias que articulan el territorio de manera coherente.",
    },
  ];

  return (
    <section id="servicios" className="py-24 bg-[#F5F4F0]">
      <div className="container">
        <hr className="rule mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-16">
          <FadeBox>
            <p className="section-label mb-3">03</p>
            <h2 className="font-['Anek_Devanagari'] text-3xl md:text-4xl font-400 text-[#1C1C1C] leading-tight">
              Servicios
            </h2>
          </FadeBox>
          <FadeBox delay={100}>
            <p className="font-['DM_Sans'] text-base font-300 text-[#3A3A3A] leading-relaxed">
              Nuestro objetivo es interpretar el territorio para identificar oportunidades
              de proyecto que surgen de su propia estructura. A partir de la lectura de la
              normativa, las dinámicas territoriales y las condiciones existentes, buscamos
              desarrollar estrategias y proyectos que articulen el territorio de manera coherente.
            </p>
          </FadeBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {items.map((item, i) => (
            <FadeBox key={item.num} delay={i * 80} className="border-t border-[#D8D5CC] pt-8 pb-8 md:pr-8">
              <p className="font-['Anek_Devanagari'] text-4xl font-400 text-[#1C1C1C] mb-4">{item.num}</p>
              <h3 className="font-['Anek_Devanagari'] text-lg font-500 text-[#1C1C1C] mb-4 leading-snug">{item.title}</h3>
              <p className="font-['DM_Sans'] text-sm font-300 text-[#5A5A5A] leading-relaxed">{item.desc}</p>
            </FadeBox>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Portafolio ────────────────────────────────────────────────────────────────
const proyectos = [
  {
    id: 1,
    num: "01",
    categoria: "Proyectos Urbanos",
    titulo: "Proyecto Bicentenario",
    subtitulo: "Campus Juan Gómez Millas",
    mandante: "Iniciativa Bicentenario — Universidad de Chile",
    descripcion: "Diseño de arquitectura y paisajismo en el Campus Juan Gómez Millas. Un proyecto que articula los espacios exteriores del campus con la vida universitaria y el entorno urbano.",
    img: IMG_BICENTENARIO,
  },
  {
    id: 2,
    num: "02",
    categoria: "Espacio Público",
    titulo: "Parque Rosa Vicencio",
    subtitulo: "Canela Alta, Región de Coquimbo",
    mandante: "I.M. de Canela y SERVIU Coquimbo",
    descripcion: "Proyecto de espacio público que integra la identidad local con el diseño contemporáneo de paisaje. Una intervención que activa el territorio desde sus propias condiciones.",
    img: IMG_PARQUE,
  },
  {
    id: 3,
    num: "03",
    categoria: "Concursos y Propuestas",
    titulo: "Nuevo Parque para La Reina",
    subtitulo: "Concurso Arquitectónico 2023",
    mandante: "Concurso público — Santiago, Chile",
    descripcion: "Propuesta para el diseño de un nuevo parque en la comuna de La Reina. Una exploración de nuevas ideas sobre el territorio y el diseño urbano a través del ejercicio concursal.",
    img: IMG_CONCURSO,
  },
];

function Portafolio() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="portafolio" className="py-24 bg-[#1C1C1C]">
      <div className="container">
        <hr className="border-t border-white/10 mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-16">
          <FadeBox>
            <p className="section-label text-[#8A9A5B] mb-3">04</p>
            <h2 className="font-['Anek_Devanagari'] text-3xl md:text-4xl font-400 text-white leading-tight">
              Portafolio
            </h2>
          </FadeBox>
          <FadeBox delay={100}>
            <p className="font-['DM_Sans'] text-base font-300 text-white/60 leading-relaxed">
              Los proyectos urbanos desarrollados durante los últimos años hoy forman parte del
              entorno construido. Su materialización permite observar cómo el análisis territorial
              y la propuesta de proyecto se traducen en espacios reales dentro de la ciudad.
            </p>
          </FadeBox>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {proyectos.map((p, i) => (
            <FadeBox key={p.id} delay={i * 100}>
              <div
                className="group relative overflow-hidden bg-[#1C1C1C] cursor-pointer"
                onClick={() => setActive(active === p.id ? null : p.id)}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.titulo}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/20 to-transparent" />
                </div>

                {/* Card content */}
                <div className="p-6">
                  <p className="section-label text-[#8A9A5B] mb-2">{p.num} — {p.categoria}</p>
                  <h3 className="font-['Anek_Devanagari'] text-xl font-500 text-white mb-1">{p.titulo}</h3>
                  <p className="font-['DM_Sans'] text-xs font-300 text-white/50 mb-4">{p.subtitulo}</p>

                  {/* Expandable */}
                  <div
                    className={`overflow-hidden transition-all duration-400 ${active === p.id ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="font-['DM_Sans'] text-xs font-300 text-white/65 leading-relaxed mb-3">{p.descripcion}</p>
                    <p className="font-['DM_Sans'] text-[10px] font-400 tracking-[0.1em] uppercase text-[#8A9A5B]">
                      Mandante: {p.mandante}
                    </p>
                  </div>

                  <button className="flex items-center gap-1 mt-2 font-['DM_Sans'] text-xs font-400 tracking-[0.08em] uppercase text-white/40 hover:text-[#8A9A5B] transition-colors duration-200">
                    {active === p.id ? "Cerrar" : "Ver más"} <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            </FadeBox>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Alianzas ──────────────────────────────────────────────────────────────────
function Alianzas() {
  return (
    <section className="py-20 bg-[#ECEAE3]">
      <div className="container">
        <hr className="rule mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-center">
          <FadeBox>
            <p className="section-label mb-3">05</p>
            <h2 className="font-['Anek_Devanagari'] text-3xl font-400 text-[#1C1C1C] leading-tight">
              Alianzas &<br />Colaboraciones
            </h2>
          </FadeBox>
          <FadeBox delay={100}>
            <p className="font-['DM_Sans'] text-base font-300 text-[#3A3A3A] leading-relaxed mb-8">
              La experiencia acumulada durante los últimos años incluye el desarrollo de estudios,
              consultorías y proyectos urbanos realizados para distintas oficinas, instituciones
              y clientes en Chile y en el extranjero. El trabajo territorial se desarrolla a
              través de colaboraciones con distintos profesionales y organizaciones, integrando
              conocimientos y experiencias que permiten abordar cada proyecto desde una mirada
              interdisciplinaria.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Universidad de Chile", "SERVIU Coquimbo", "I.M. de Canela", "Concursos Públicos"].map((org) => (
                <div key={org} className="border border-[#C8C5BC] px-4 py-3">
                  <p className="font-['DM_Sans'] text-xs font-400 text-[#5A5A5A] leading-snug">{org}</p>
                </div>
              ))}
            </div>
          </FadeBox>
        </div>
      </div>
    </section>
  );
}

// ─── Contacto ──────────────────────────────────────────────────────────────────
function Contacto() {
  return (
    <section id="contacto" className="py-24 bg-[#F5F4F0]">
      <div className="container">
        <hr className="rule mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
          <FadeBox>
            <p className="section-label mb-3">06</p>
            <h2 className="font-['Anek_Devanagari'] text-3xl md:text-4xl font-400 text-[#1C1C1C] leading-tight mb-4">
              Contacto
            </h2>
            <p className="font-['Anek_Devanagari'] text-lg italic text-[#8A9A5B]">
              Ideas — Estrategias — Soluciones.
            </p>
          </FadeBox>

          <FadeBox delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Mail size={14} className="text-[#8A9A5B]" />
                  <p className="section-label">Correo</p>
                </div>
                <a
                  href="mailto:mbduarq@gmail.com"
                  className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A] hover:text-[#8A9A5B] transition-colors"
                >
                  mbduarq@gmail.com
                </a>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Phone size={14} className="text-[#8A9A5B]" />
                  <p className="section-label">Teléfono</p>
                </div>
                <a
                  href="tel:+56941771443"
                  className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A] hover:text-[#8A9A5B] transition-colors"
                >
                  +56 9 4177 1443
                </a>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={14} className="text-[#8A9A5B]" />
                  <p className="section-label">Ubicación</p>
                </div>
                <p className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A]">El Totoral, El Quisco<br />Región de Valparaíso, Chile</p>
              </div>
            </div>

            {/* Contact form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Mensaje enviado. Nos pondremos en contacto pronto.");
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex flex-col gap-1">
                <label className="section-label">Nombre</label>
                <input
                  type="text"
                  required
                  placeholder="Su nombre"
                  className="bg-transparent border border-[#C8C5BC] px-4 py-3 font-['DM_Sans'] text-sm font-300 text-[#1C1C1C] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#8A9A5B] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="section-label">Correo</label>
                <input
                  type="email"
                  required
                  placeholder="su@correo.cl"
                  className="bg-transparent border border-[#C8C5BC] px-4 py-3 font-['DM_Sans'] text-sm font-300 text-[#1C1C1C] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#8A9A5B] transition-colors"
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="section-label">Mensaje</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Cuéntenos sobre su proyecto o consulta..."
                  className="bg-transparent border border-[#C8C5BC] px-4 py-3 font-['DM_Sans'] text-sm font-300 text-[#1C1C1C] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#8A9A5B] transition-colors resize-none"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#1C1C1C] text-white font-['DM_Sans'] text-xs font-500 tracking-[0.12em] uppercase px-8 py-4 hover:bg-[#8A9A5B] transition-colors duration-300"
                >
                  Enviar Mensaje <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </FadeBox>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 bg-[#1C1C1C]">
      <div className="container">
        <hr className="border-t border-white/10 mb-8" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center">
              <span className="font-['Anek_Devanagari'] text-[9px] text-white/60">MB</span>
            </div>
            <span className="font-['DM_Sans'] text-xs font-300 tracking-[0.1em] uppercase text-white/40">
              MB Diseño Urbano
            </span>
          </div>
          <p className="font-['DM_Sans'] text-xs font-300 text-white/30">
            © 2023 MB Diseño Urbano — Santiago, Chile
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <QuienesSomos />
      <NuestroRol />
      <Servicios />
      <Portafolio />
      <Alianzas />
      <Contacto />
      <Footer />
    </div>
  );
}
