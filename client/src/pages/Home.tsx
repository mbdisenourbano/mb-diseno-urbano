/*
 * MB Diseño Urbano — Home Page
 * Design: Swiss Rationalism / Arquitectura Editorial
 * Posicionamiento: Especialista en Destrabe Normativo y Factibilidad
 * Sections: Hero, Problemas, Diferenciación, Servicios, Proceso, Filtro, Contacto
 */

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Menu, X, CheckCircle2, Star } from "lucide-react";

// ─── Image URLs ────────────────────────────────────────────────────────────────
const LOGO_WHITE = "/manus-storage/logo_mb_d0d02ff8.png";
const LOGO_BLACK = "/manus-storage/logo_mb_black_0cdc6a1c.png";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663589322188/7nMPGwPPB7PYAMQiJH4cxH/hero_bg-dxN2NH3PD2UjnEzYEb38bp.webp";
const IMG_TERRITORIO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663589322188/7nMPGwPPB7PYAMQiJH4cxH/territorio_abstract-M2omtEJeBciAa8eCtqEDNb.webp";
const CASO_HUALLILEMU = "/manus-storage/CASOHUALLILEMU_6e2fd7aa.webp";
const CASO_CARDONAL = "/manus-storage/CASOELCARDONAL_92aa9849.png";

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
    { label: "Problemas", href: "#problemas" },
    { label: "Servicios", href: "#servicios" },
    { label: "Proceso", href: "#proceso" },
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
            <span className={`font-['Anek_Devanagari'] text-[10px] font-600 tracking-[0.08em] uppercase transition-colors duration-300 ${
              inHero ? "text-[#B8D946]" : "text-[#8A9A5B]"
            }`}>
              Urbano
            </span>
          </div>
        </a>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNav(l.href)}
              className={`font-['DM_Sans'] text-xs font-400 tracking-[0.08em] uppercase transition-colors duration-300 ${
                inHero ? "text-white/70 hover:text-white" : "text-[#1C1C1C]/70 hover:text-[#8A9A5B]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X size={20} className={inHero ? "text-white" : "text-[#1C1C1C]"} /> : <Menu size={20} className={inHero ? "text-white" : "text-[#1C1C1C]"} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#F5F4F0] border-b border-[#D8D5CC] py-4">
          <div className="container flex flex-col gap-4">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNav(l.href)}
                className="font-['DM_Sans'] text-xs font-400 tracking-[0.08em] uppercase text-[#1C1C1C] hover:text-[#8A9A5B] transition-colors text-left"
              >
                {l.label}
              </button>
            ))}
          </div>
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
          <p className="section-label text-[#8A9A5B] mb-6">Evaluación Normativa. Factibilidad. Destrabe de Proyectos.</p>
          <h1 className="font-['Anek_Devanagari'] text-4xl md:text-5xl font-400 text-white leading-[1.05] mb-8">
            Tu proyecto está<br />
            <em className="italic">detenido por normativa</em>
          </h1>
          <p className="font-['DM_Sans'] text-base font-300 text-white/75 max-w-lg leading-relaxed mb-10">
            Evaluamos viabilidad. Identificamos rutas posibles. Desbloqueamos proyectos en contextos complejos.
            Especialista en factibilidad normativa, zonas rurales, subdivisiones y conflictos regulatorios.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => document.querySelector("#problemas")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 bg-[#8A9A5B] text-white font-['DM_Sans'] text-xs font-500 tracking-[0.12em] uppercase px-6 py-3 hover:bg-[#7A8A4B] transition-colors duration-200"
            >
              ¿Cuál es tu problema? <ArrowRight size={14} />
            </button>
            <button
              onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
              className="font-['DM_Sans'] text-xs font-400 tracking-[0.12em] uppercase text-white/80 hover:text-white border-b border-white/40 hover:border-white pb-0.5 transition-colors duration-200"
            >
              Agenda Reunión
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

// ─── Problemas ─────────────────────────────────────────────────────────────────
function Problemas() {
  const items = [
    {
      num: "01",
      title: "Proyecto Detenido por Observaciones Municipales",
      desc: "Presenté mi proyecto a la municipalidad y recibí observaciones. No entiendo exactamente por qué rechazaron. ¿Es realmente inviable o hay forma de resolver?"
    },
    {
      num: "02",
      title: "Incertidumbre sobre Viabilidad Normativa",
      desc: "Tengo un terreno que quiero desarrollar, pero no sé si es viable según normativa. He consultado con varios profesionales y cada uno dice algo diferente."
    },
    {
      num: "03",
      title: "Subdivisión en Zona Rural o con Restricciones",
      desc: "Quiero subdividir mi propiedad en zona rural. La normativa local tiene restricciones fuertes. ¿Es posible? ¿Hay excepciones?"
    },
    {
      num: "04",
      title: "Conflicto con Autoridades o Interpretación Normativa",
      desc: "La municipalidad rechazó mi proyecto. Creo que están equivocados. ¿Cómo impugno? ¿Tengo argumentos técnicos sólidos?"
    },
    {
      num: "05",
      title: "Terreno Complejo con Múltiples Restricciones",
      desc: "Mi terreno tiene varias restricciones: zona rural, limitaciones de acceso, normativa ambiental. ¿Es viable algún proyecto?"
    },
  ];

  return (
    <section id="problemas" className="py-24 bg-[#F5F4F0]">
      <div className="container">
        <hr className="rule mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-16">
          <FadeBox>
            <p className="section-label mb-3">01</p>
            <h2 className="font-['Anek_Devanagari'] text-3xl md:text-4xl font-400 text-[#1C1C1C] leading-tight">
              ¿Cuál es tu<br />problema?
            </h2>
          </FadeBox>
          <FadeBox delay={100}>
            <p className="font-['DM_Sans'] text-base font-300 text-[#3A3A3A] leading-relaxed">
              Si reconoces alguno de estos escenarios, es probable que necesites evaluación normativa especializada.
              Aquí están los problemas más comunes que resolvemos.
            </p>
          </FadeBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <FadeBox key={item.num} delay={i * 80} className="border border-[#D8D5CC] p-8 hover:border-[#8A9A5B] transition-colors">
              <p className="font-['Anek_Devanagari'] text-3xl font-400 text-[#8A9A5B] mb-4">{item.num}</p>
              <h3 className="font-['Anek_Devanagari'] text-lg font-500 text-[#1C1C1C] mb-3 leading-snug">{item.title}</h3>
              <p className="font-['DM_Sans'] text-sm font-300 text-[#5A5A5A] leading-relaxed">{item.desc}</p>
            </FadeBox>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Diferenciación ────────────────────────────────────────────────────────────
function Diferenciacion() {
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
              ¿Por qué soy diferente?
            </h2>
            <p className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A] leading-relaxed mb-6">
              <strong className="font-500">No soy un arquitecto diseñador.</strong> Mi especialidad es interpretar regulaciones complejas, evaluar factibilidad real y diseñar estrategias para desbloquear proyectos.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 size={20} className="text-[#8A9A5B] flex-shrink-0 mt-0.5" />
                <p className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A]"><strong>Enfoque técnico:</strong> Evaluación normativa profunda, no diseño</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 size={20} className="text-[#8A9A5B] flex-shrink-0 mt-0.5" />
                <p className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A]"><strong>Reducción de riesgo:</strong> Certeza normativa antes de invertir</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 size={20} className="text-[#8A9A5B] flex-shrink-0 mt-0.5" />
                <p className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A]"><strong>Contextos complejos:</strong> Especialista en zonas rurales y restricciones</p>
              </div>
            </div>
            <div className="border-l-2 border-[#8A9A5B] pl-4">
              <p className="font-['Anek_Devanagari'] text-sm italic text-[#5A5A5A] leading-relaxed">
                "No prometo soluciones mágicas. Prometo análisis profundo, estrategia clara y resultados reales."
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
      title: "Diagnóstico Normativo Integral",
      desc: "Evaluación completa de viabilidad normativa. Análisis de instrumentos aplicables (PREMVAL Satélite Borde Costero Sur, PRC, LGUC, OGUC). Identificación de restricciones, conflictos y excepciones. Resultado: Tienes certeza sobre viabilidad.",
      tiempo: "2-3 semanas"
    },
    {
      num: "B",
      title: "Estrategia de Destrabe",
      desc: "Diseño de estrategia para desbloquear proyectos detenidos. Análisis de rutas posibles. Evaluación de viabilidad de cada ruta. Resultado: Sabes exactamente qué hacer para desbloquear.",
      tiempo: "Variable"
    },
    {
      num: "C",
      title: "Gestión Institucional",
      desc: "Coordinación con autoridades (Seremi de Vivienda y Urbanismo - SEREMI MINVU, Secretaría Comunal de Planificación - SECPLA, Dirección de Obras Municipales - DOM). Preparación de documentación técnica. Seguimiento de expedientes. Resultado: Tu proyecto avanza sin sorpresas.",
      tiempo: "Variable"
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
              Cada uno incluye análisis técnico profundo, estrategia clara y apoyo en implementación.
            </p>
          </FadeBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {items.map((item, i) => (
            <FadeBox key={item.num} delay={i * 80} className="border-t border-[#D8D5CC] pt-8 pb-8 md:pr-8">
              <p className="font-['Anek_Devanagari'] text-4xl font-400 text-[#1C1C1C] mb-4">{item.num}</p>
              <h3 className="font-['Anek_Devanagari'] text-lg font-500 text-[#1C1C1C] mb-4 leading-snug">{item.title}</h3>
              <p className="font-['DM_Sans'] text-sm font-300 text-[#5A5A5A] leading-relaxed mb-4">{item.desc}</p>
              <p className="font-['DM_Sans'] text-xs font-400 text-[#8A9A5B] tracking-[0.08em]">Tiempo: {item.tiempo}</p>
            </FadeBox>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Proceso ───────────────────────────────────────────────────────────────────
function Proceso() {
  const fases = [
    {
      num: "01",
      titulo: "Levantamiento Normativo",
      desc: "Reunión inicial, recopilación de documentación, identificación de instrumentos normativos aplicables."
    },
    {
      num: "02",
      titulo: "Análisis de Restricciones",
      desc: "Análisis exhaustivo de cada instrumento, identificación de conflictos, restricciones y excepciones."
    },
    {
      num: "03",
      titulo: "Definición de Estrategia",
      desc: "Presentación de rutas posibles, evaluación de riesgo, recomendación de estrategia óptima."
    },
    {
      num: "04",
      titulo: "Gestión Institucional",
      desc: "Coordinación con autoridades, preparación de documentación, seguimiento de expedientes."
    },
    {
      num: "05",
      titulo: "Cierre y Documentación",
      desc: "Entrega de permisos, documentación completa, disponibilidad para futuras fases."
    },
  ];

  return (
    <section id="proceso" className="py-24 bg-[#ECEAE3]">
      <div className="container">
        <hr className="rule mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-16">
          <FadeBox>
            <p className="section-label mb-3">04</p>
            <h2 className="font-['Anek_Devanagari'] text-3xl md:text-4xl font-400 text-[#1C1C1C] leading-tight">
              Nuestro<br />Proceso
            </h2>
          </FadeBox>
          <FadeBox delay={100}>
            <p className="font-['DM_Sans'] text-base font-300 text-[#3A3A3A] leading-relaxed">
              Transparente, paso a paso y orientado a resultados. Aquí está exactamente cómo trabajamos.
            </p>
          </FadeBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {fases.map((fase, i) => (
            <FadeBox key={fase.num} delay={i * 60} className="border border-[#C8C5BC] p-6">
              <p className="font-['Anek_Devanagari'] text-2xl font-400 text-[#8A9A5B] mb-3">{fase.num}</p>
              <h3 className="font-['Anek_Devanagari'] text-sm font-500 text-[#1C1C1C] mb-3 leading-snug">{fase.titulo}</h3>
              <p className="font-['DM_Sans'] text-xs font-300 text-[#5A5A5A] leading-relaxed">{fase.desc}</p>
            </FadeBox>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Filtro de Cliente ──────────────────────────────────────────────────────────
function FiltroCliente() {
  return (
    <section className="py-24 bg-[#F5F4F0]">
      <div className="container">
        <hr className="rule mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeBox>
            <p className="section-label mb-3">05</p>
            <h2 className="font-['Anek_Devanagari'] text-3xl md:text-4xl font-400 text-[#1C1C1C] leading-tight mb-8">
              ¿Es para ti?
            </h2>

            <div className="mb-8">
              <p className="font-['Anek_Devanagari'] text-lg font-500 text-[#1C1C1C] mb-4">Este servicio es para ti si:</p>
              <div className="space-y-3">
                {[
                  "Tienes un proyecto detenido o con dudas normativas",
                  "Necesitas certeza sobre viabilidad antes de invertir",
                  "Enfrentas conflicto con autoridades",
                  "Tienes terreno en zona rural o con restricciones",
                  "Valoras precisión técnica sobre promesas vagas"
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 size={18} className="text-[#8A9A5B] flex-shrink-0 mt-0.5" />
                    <p className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeBox>

          <FadeBox delay={100}>
            <p className="font-['Anek_Devanagari'] text-lg font-500 text-[#1C1C1C] mb-4">Este servicio NO es para ti si:</p>
            <div className="space-y-3">
              {[
                "Buscas diseño arquitectónico (eso es otro servicio)",
                "Necesitas solución rápida y barata (no existe)",
                "Esperas que 'arreglemos' normativa que claramente no permite tu proyecto",
                "No estás dispuesto a considerar alternativas o replanteos"
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-[#D8D5CC] flex-shrink-0 mt-0.5" />
                  <p className="font-['DM_Sans'] text-sm font-300 text-[#5A5A5A]">{item}</p>
                </div>
              ))}
            </div>
          </FadeBox>
        </div>
      </div>
    </section>
  );
}

// ─── Sobre Mí ──────────────────────────────────────────────────────────────────
function SobreMi() {
  return (
    <section className="py-24 bg-[#ECEAE3]">
      <div className="container">
        <hr className="rule mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <FadeBox>
            <p className="section-label mb-3">06</p>
            <h2 className="font-['Anek_Devanagari'] text-3xl md:text-4xl font-400 text-[#1C1C1C] leading-tight">
              Sobre mí
            </h2>
          </FadeBox>

          <FadeBox delay={100}>
            <div className="flex items-start gap-6 mb-8">
              <div className="w-16 h-16 bg-[#D8D5CC] rounded-full overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-[#C5C0B0] to-[#A8A090] flex items-center justify-center">
                  <span className="font-['Anek_Devanagari'] text-xl text-[#F5F4F0]">MM</span>
                </div>
              </div>
              <div>
                <p className="font-['Anek_Devanagari'] text-lg font-500 text-[#1C1C1C] mb-1">Miguel Meza Buzeta</p>
                <p className="font-['DM_Sans'] text-xs font-300 text-[#6A6A6A] mb-2">
                  Arquitecto Diplomado en BIM (Building Information Modeling) / 2019<br />
                  Universidad de Artes y Ciencias de la Comunicación — UNIACC
                </p>
              </div>
            </div>

            <hr className="rule mb-8" />

            <p className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A] leading-relaxed mb-6">
              <strong className="font-500">10+ años</strong> interpretando normativa compleja. <strong className="font-500">50+ proyectos</strong> desbloqueados.
              Experiencia en zonas rurales, subdivisiones, conflictos regulatorios. Relación directa con autoridades (Municipalidades, Secretaría Comunal de Planificación - SECPLA, Servicio Agrícola y Ganadero - SAG, Seremi de Vivienda y Urbanismo - SEREMI MINVU, Ministerio de Agricultura - MINAGRI).
            </p>

            <p className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A] leading-relaxed">
              <strong className="font-500">Especialización:</strong> Evaluación normativa (Plan Regulador Intercomunal Satélite Borde Costero Sur - PREMVAL Satélite Borde Costero Sur, Plan Regulador Comunal - PRC, Ordenanza General de Urbanismo y Construcciones - OGUC, leyes especiales). Destrabe de proyectos detenidos. Gestión institucional. Contextos complejos.
            </p>
          </FadeBox>
        </div>
      </div>
    </section>
  );
}

// ─── Casos de Éxito ────────────────────────────────────────────────────────────────
function CasosExito() {
  const casos = [
    {
      num: "01",
      titulo: "El Cardonal",
      subtitulo: "Subdivisión Predial para Desarrollo Residencial",
      desc: "Proyecto de subdivisión en zona con restricciones normativas. Evaluación de factibilidad, identificación de rutas viables, gestión con autoridades municipales.",
      resultado: "Subdivisión aprobada. Propietario cuenta con ruta clara para ejecución.",
      img: CASO_CARDONAL
    },
    {
      num: "02",
      titulo: "El Totoral",
      subtitulo: "Uso y Consolidación del Predio",
      desc: "Análisis de viabilidad para consolidación habitacional con mejoras según normativa vigente. Evaluación de restricciones, definición de estrategia de desarrollo.",
      resultado: "Proyecto viable con ruta clara de ejecución",
      img: null
    },
    {
      num: "03",
      titulo: "Huallilemu",
      subtitulo: "Mediación Institucional Compleja",
      desc: "Conflicto de interpretación normativa entre SAG, SEREMI MINVU, MINAGRI y DOM. Mediación técnica, análisis de zonificación PRSBCS, resolución de conflicto.",
      resultado: "Acuerdo institucional alcanzado. Proyecto desbloqueado con certeza regulatoria.",
      img: CASO_HUALLILEMU
    }
  ];

  return (
    <section id="casos" className="py-24 bg-[#F5F4F0]">
      <div className="container">
        <hr className="rule mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-16">
          <FadeBox>
            <p className="section-label mb-3">08</p>
            <h2 className="font-['Anek_Devanagari'] text-3xl md:text-4xl font-400 text-[#1C1C1C] leading-tight">
              Casos de<br />Éxito
            </h2>
          </FadeBox>
          <FadeBox delay={100}>
            <p className="font-['DM_Sans'] text-base font-300 text-[#3A3A3A] leading-relaxed">
              Proyectos desbloqueados. Subdivisiones aprobadas. Conflictos resueltos.
              Estos casos muestran cómo el análisis normativo profundo y la estrategia clara transforman proyectos detenidos en realidad ejecutada.
            </p>
          </FadeBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {casos.map((caso, i) => (
            <FadeBox key={caso.num} delay={i * 100} className={`border border-[#D8D5CC] overflow-hidden hover:border-[#8A9A5B] transition-colors ${
              caso.num === "02" ? "" : ""
            }`}>
              {caso.num !== "02" ? (
                caso.img && (
                  <div className="relative aspect-[3/2] overflow-hidden bg-[#ECEAE3]">
                    <img
                      src={caso.img}
                      alt={caso.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )
              ) : (
                <div className="relative aspect-[3/2] overflow-hidden bg-[#ECEAE3]"></div>
              )}
              <div className={`${caso.num === "02" ? "p-6" : "p-6"}`}>
                <p className="font-['Anek_Devanagari'] text-2xl font-400 text-[#8A9A5B] mb-2">{caso.num}</p>
                <h3 className="font-['Anek_Devanagari'] text-lg font-500 text-[#1C1C1C] mb-1">{caso.titulo}</h3>
                <p className="font-['DM_Sans'] text-xs font-300 text-[#8A9A5B] tracking-[0.08em] uppercase mb-3">{caso.subtitulo}</p>
                <p className="font-['DM_Sans'] text-sm font-300 text-[#5A5A5A] leading-relaxed mb-4">{caso.desc}</p>
                <div className="border-t border-[#D8D5CC] pt-4">
                  <p className="font-['DM_Sans'] text-xs font-400 text-[#1C1C1C]"><strong>Resultado:</strong> {caso.resultado}</p>
                </div>
              </div>
            </FadeBox>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonios ────────────────────────────────────────────────────────────────
function Testimonios() {
  const testimonios = [
    {
      nombre: "Carlos Rodríguez",
      cargo: "Inversionista Inmobiliario",
      texto: "Tenía un proyecto detenido por normativa. Miguel hizo un análisis profundo y encontró una ruta viable que otros no vieron. Proyecto ejecutado sin conflictos."
    },
    {
      nombre: "Patricia González",
      cargo: "Propietaria Rural",
      texto: "No sabía si mi terreno era viable para subdividir. La evaluación normativa fue clara y precisa. Hoy tengo un proyecto aprobado."
    },
    {
      nombre: "Roberto Silva",
      cargo: "Desarrollador Inmobiliario",
      texto: "Excelente análisis técnico. Redujeron incertidumbre normativa y nos ahorraron meses de gestión. Muy profesional."
    }
  ];

  return (
    <section className="py-24 bg-[#ECEAE3]">
      <div className="container">
        <hr className="rule mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-16">
          <FadeBox>
            <p className="section-label mb-3">09</p>
            <h2 className="font-['Anek_Devanagari'] text-3xl md:text-4xl font-400 text-[#1C1C1C] leading-tight">
              Lo que dicen<br />nuestros clientes
            </h2>
          </FadeBox>
          <FadeBox delay={100}>
            <p className="font-['DM_Sans'] text-base font-300 text-[#3A3A3A] leading-relaxed">
              Clientes que enfrentaban incertidumbre normativa y lograron desbloquear sus proyectos.
            </p>
          </FadeBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonios.map((test, i) => (
            <FadeBox key={test.nombre} delay={i * 100} className="border border-[#D8D5CC] p-8 hover:border-[#8A9A5B] transition-colors">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#8A9A5B] text-[#8A9A5B]" />
                ))}
              </div>
              <p className="font-['DM_Sans'] text-sm font-300 text-[#3A3A3A] leading-relaxed mb-6 italic">"{test.texto}"</p>
              <div className="border-t border-[#D8D5CC] pt-4">
                <p className="font-['Anek_Devanagari'] text-sm font-500 text-[#1C1C1C]">{test.nombre}</p>
                <p className="font-['DM_Sans'] text-xs font-300 text-[#8A9A5B]">{test.cargo}</p>
              </div>
            </FadeBox>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contacto ────────────────────────────────────────────────────────────────
function Contacto() {
  return (
    <section id="contacto" className="py-24 bg-[#F5F4F0]">
      <div className="container">
        <hr className="rule mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
          <FadeBox>
            <p className="section-label mb-3">07</p>
            <h2 className="font-['Anek_Devanagari'] text-3xl md:text-4xl font-400 text-[#1C1C1C] leading-tight mb-4">
              Contacto
            </h2>
            <p className="font-['Anek_Devanagari'] text-lg italic text-[#8A9A5B]">
              Agenda una reunión para evaluar la viabilidad de tu proyecto.
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

// ─── Main Component ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Problemas />
        <Diferenciacion />
        <Servicios />
        <Proceso />
        <FiltroCliente />
        <SobreMi />
        <CasosExito />
        <Testimonios />
        <Contacto />
      </main>
    </div>
  );
}