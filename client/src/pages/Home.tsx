/*
 * MB Diseño Urbano — Home Page
 * Design: Swiss Rationalism / Arquitectura Editorial
 * Sections: Hero, Quiénes Somos, Nuestro Rol, Servicios, Portafolio, Contacto
 */

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Menu, X } from "lucide-react";

// ─── Image URLs ────────────────────────────────────────────────────────────────
const LOGO_WHITE = "/manus-storage/logo_mb_d0d02ff8.png";
const LOGO_BLACK = "/manus-storage/logo_mb_black_0cdc6a1c.png";
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

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setInHero(window.scrollY < 100);
    };
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
          <img src={inHero ? LOGO_WHITE : LOGO_BLACK} alt="MB Logo" className="h-10 w-auto transition-all duration-300" />
          <div className="flex flex-col leading-none">
            <span className={`font-['Anek_Devanagari'] text-[10px] font-600 tracking-[0.08em] uppercase transition-colors duration-300 ${
              inHero ? "text-white" : "text-[#1C1C1C]"
            }`}>
              Diseño
            </span>
            <span className="font-['Anek_Devanagari'] text-sm font-600 tracking-[0.08em] uppercase text-[#B8D946] group-hover:text-[#A0C000] transition-colors duration-300">Urbano</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className={`font-['DM_Sans'] text-xs font-400 tracking-[0.1em] uppercase transition-colors duration-200 ${
                inHero ? "text-white hover:text-[#B8D946]" : "text-[#1C1C1C] hover:text-[#8A9A5B]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className={`md:hidden transition-colors ${
            inHero ? "text-white hover:text-[#B8D946]" : "text-[#1C1C1C] hover:text-[#8A9A5B]"
          }`}
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
          <p className="section-label text-[#8A9A5B] mb-6">Destrabe Normativo. Evaluación de Factibilidad. Estrategias de Proyecto.</p>
          <h1 className="font-['Anek_Devanagari'] text-5xl md:text-7xl font-400 text-white leading-[1.05] mb-8">
            Proyectos<br />
            <em className="italic">Desbloqueados</em>
          </h1>
          <p className="font-['DM_Sans'] text-base font-300 text-white/75 max-w-lg leading-relaxed mb-10">
            Especialista en interpretación regulatoria, viabilidad de proyectos y resolución de conflictos normativos.
            Destrabe de proyectos detenidos en zonas rurales, subdivisiones y terrenos complejos.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => document.querySelector("#problemas")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 bg-[#8A9A5B] text-white font-['DM_Sans'] text-xs font-500 tracking-[0.12em] uppercase px-6 py-3 hover:bg-[#7A8A4B] transition-colors duration-200"
            >
              Ver Servicios <ArrowRight size={14} />
            </button>
            <button
              onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
              className="font-['DM_Sans'] text-xs font-400 tracking-[0.12em] uppercase text-white/80 hover:text-white border-b border-white/40 hover:border-white pb-0.5 transition-colors duration-200"
            >
              Agendar Evaluación
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
              <strong className="font-500">MB Diseño Urbano</strong> es un equipo especializado en destrabe normativo y evaluación de viabilidad de proyectos.
              No somos arquitectos diseñadores tradicionales. Nuestro enfoque es interpretar regulaciones complejas,
              identificar rutas viables y diseñar estrategias para desbloquear proyectos atrapados en conflictos regulatorios.
              Trabajamos con propietarios, inversionistas y desarrolladores que enfrentan incertidumbre normativa.
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
                <p className="section-label mb-2">Especialista en Destrabe Normativo</p>
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
              Qué Resolvemos
            </h2>
            <p className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A] leading-relaxed mb-6">
              Proyectos detenidos por normativa. Subdivisiones en zonas rurales. Conflictos con autoridades.
              Incertidumbre sobre factibilidad. Evaluamos la viabilidad real de tu proyecto, identificamos rutas
              posibles y diseñamos estrategias para desbloquear lo que está atrapado.
            </p>
            <p className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A] leading-relaxed mb-8">
              Nuestro enfoque es técnico, directo y basado en interpretación profunda de regulaciones.
              Reducimos incertidumbre. Protegemos tu inversión. Desbloqueamos proyectos.
            </p>
            <div className="border-l-2 border-[#8A9A5B] pl-4">
              <p className="font-['Anek_Devanagari'] text-sm italic text-[#5A5A5A] leading-relaxed">
                "Especialización en destrabe normativo. Evaluación de factibilidad. Estrategias de proyecto para contextos complejos."
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
      title: "Evaluación Normativa Integral",
      desc: "Análisis exhaustivo de instrumentos normativos (PRC, PRMS, OGUC, leyes especiales). Evaluación de factibilidad según normativa vigente. Identificación de conflictos, restricciones y excepciones. Informe técnico con conclusiones claras y recomendaciones.",
    },
    {
      num: "B",
      title: "Estrategia de Destrabe",
      desc: "Diagnóstico del problema normativo. Análisis de rutas posibles (interpretación, excepción, cambio de zonificación). Evaluación de viabilidad de cada ruta. Propuesta de estrategia recomendada con probabilidad de éxito y roadmap de implementación.",
    },
    {
      num: "C",
      title: "Gestión de Trámites Normativos",
      desc: "Coordinación con autoridades (municipalidad, SEREMI, GORE). Preparación de documentación técnica. Seguimiento de expedientes. Negociación en caso de conflictos. Apoyo en recursos administrativos si es necesario.",
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
              Nuestros servicios están diseñados para reducir incertidumbre normativa y desbloquear proyectos.
              Desde evaluación inicial hasta gestión completa de trámites. Cada servicio incluye análisis técnico profundo,
              estrategia clara y apoyo en implementación. Trabajamos con propietarios, inversionistas y desarrolladores
              que enfrentan problemas normativos reales.
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
    categoria: "Subdivisión Rural",
    titulo: "Destrabe de Subdivisión",
    subtitulo: "Zona Rural, Región de Valparaíso",
    mandante: "Propietario privado",
    descripcion: "Terreno de 5 hectáreas en zona rural con restricciones normativas. Evaluación de viabilidad, identificación de excepciones, negociación con municipalidad. Resultado: subdivisión aprobada en 8 semanas.",
    img: IMG_BICENTENARIO,
  },
  {
    id: 2,
    num: "02",
    categoria: "Conflicto Regulatorio",
    titulo: "Resolución de Rechazo SEREMI",
    subtitulo: "Proyecto de Equipamiento Comunitario",
    mandante: "Inversionista privado",
    descripcion: "Proyecto rechazado por SEREMI. Análisis técnico del rechazo, identificación de error en interpretación, preparación de impugnación. Resultado: aprobación tras presentar argumentos técnicos en 6 semanas.",
    img: IMG_PARQUE,
  },
  {
    id: 3,
    num: "03",
    categoria: "Pre-Evaluación",
    titulo: "Evaluación de Viabilidad Antes de Inversión",
    subtitulo: "Proyecto Inmobiliario en Evaluación",
    mandante: "Inversionista inmobiliario",
    descripcion: "Evaluación normativa integral antes de cierre de compra. Identificación de restricciones y oportunidades. Análisis de riesgo regulatorio. Resultado: inversionista procedió con confianza, proyecto ejecutado sin conflictos.",
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
              Casos de Éxito
            </h2>
          </FadeBox>
          <FadeBox delay={100}>
            <p className="font-['DM_Sans'] text-base font-300 text-white/60 leading-relaxed">
              Proyectos desbloqueados. Subdivisiones aprobadas. Conflictos resueltos.
              Estos casos muestran cómo el análisis normativo profundo y la estrategia clara
              transforman proyectos detenidos en realidad ejecutada.
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
              Trabajamos con propietarios, inversionistas, desarrolladores y asesores que enfrentan problemas normativos reales.
              Nuestro equipo tiene experiencia en interpretación regulatoria, negociación con autoridades y resolución de conflictos.
              Cada proyecto es diferente. Cada contexto es único. Por eso nuestro enfoque es siempre personalizado y basado en
              análisis técnico profundo.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Propietarios Rurales", "Inversionistas Inmobiliarios", "Desarrolladores", "Asesores Legales"].map((org) => (
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
              Destrabe Normativo. Evaluación de Factibilidad. Reducción de Riesgo.
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
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <p className="section-label">LinkedIn</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/miguelmezabuzeta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A] hover:text-[#8A9A5B] transition-colors"
                >
                  Miguel Meza Buzeta
                </a>
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
                  placeholder="Cuéntenos sobre tu proyecto o problema normativo..."
                  className="bg-transparent border border-[#C8C5BC] px-4 py-3 font-['DM_Sans'] text-sm font-300 text-[#1C1C1C] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#8A9A5B] transition-colors resize-none"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#8A9A5B] text-white font-['DM_Sans'] text-xs font-500 tracking-[0.12em] uppercase px-8 py-4 hover:bg-[#7A8A4B] transition-colors duration-300"
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
            <img src={LOGO_BLACK} alt="MB Logo" className="h-6 w-auto" />
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
