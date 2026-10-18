'use client'

import { motion, useScroll } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useTramo } from '@/lib/scroll'
import { boda, granDia } from '@/lib/content'
import { Encabezado } from './Encabezado'

/** Capítulo V — cuenta regresiva, lugares e itinerario con línea que se traza. */
export function GranDia() {
  return (
    <section id="gran-dia" className="relative px-6 pb-[16svh] pt-[22svh] lg:pl-40">
      <div className="mx-auto max-w-6xl">
        <Encabezado numero={granDia.numero} titulo={granDia.titulo} />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 max-w-xl font-display text-2xl italic leading-snug text-tinta/75"
        >
          {granDia.invitacion}
        </motion.p>

        <CuentaRegresiva />

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {granDia.lugares.map((l, i) => (
            <motion.article
              key={l.tipo}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden border border-tinta/10 bg-white/50 p-8 lg:p-10"
            >
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-terracota transition-transform duration-700 group-hover:scale-x-100" />
              <p className="etiqueta text-terracota">{l.tipo}</p>
              <h3 className="mt-4 font-display text-4xl leading-tight">{l.nombre}</h3>
              <p className="mt-2 font-display text-2xl italic text-oliva">{l.hora}</p>
              <p className="mt-6 text-[15px] text-tinta/65">{l.direccion}</p>
              <a
                href={l.mapa}
                target="_blank"
                rel="noopener noreferrer"
                className="etiqueta mt-8 inline-flex items-center gap-3 border-b border-tinta/30 pb-1 text-tinta transition-colors hover:border-terracota hover:text-terracota"
              >
                Cómo llegar <span aria-hidden>→</span>
              </a>
            </motion.article>
          ))}
        </div>

        <Itinerario />
      </div>
    </section>
  )
}

function CuentaRegresiva() {
  // Se calcula solo en el navegador para no desalinear el HTML estático
  const [resta, setResta] = useState<number | null>(null)

  useEffect(() => {
    const destino = new Date(boda.fecha).getTime()
    const tick = () => setResta(Math.max(0, destino - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const s = resta === null ? null : Math.floor(resta / 1000)
  const partes = [
    { valor: s === null ? '—' : Math.floor(s / 86400), etiqueta: 'días' },
    { valor: s === null ? '—' : Math.floor((s % 86400) / 3600), etiqueta: 'horas' },
    { valor: s === null ? '—' : Math.floor((s % 3600) / 60), etiqueta: 'minutos' },
    { valor: s === null ? '—' : s % 60, etiqueta: 'segundos' },
  ]

  return (
    <div className="mt-14">
      <p className="etiqueta text-tinta/50">{boda.fechaTexto} · Faltan</p>
      <div className="mt-5 grid grid-cols-4 gap-3 sm:max-w-xl">
        {partes.map((p) => (
          <div key={p.etiqueta} className="border-l border-terracota/40 pl-3 sm:pl-4">
            <p className="font-display text-[clamp(2.2rem,6vw,3.8rem)] font-light tabular-nums leading-none">
              {typeof p.valor === 'number' ? String(p.valor).padStart(2, '0') : p.valor}
            </p>
            <p className="etiqueta mt-2 !text-[9px] text-tinta/50 sm:!text-[11px]">{p.etiqueta}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Itinerario() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.55'] })
  const largo = useTramo(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className="mt-28">
      <p className="etiqueta text-terracota">Itinerario</p>
      <ol ref={ref} className="relative mt-10 ml-2 space-y-12 pl-10">
        <span className="absolute left-0 top-2 bottom-2 w-px bg-tinta/12" />
        <motion.span style={{ scaleY: largo }} className="absolute left-0 top-2 bottom-2 w-px origin-top bg-terracota" />
        {granDia.itinerario.map((it) => (
          <motion.li
            key={it.hora}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-25% 0px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid gap-1 sm:grid-cols-[110px_1fr] sm:gap-8"
          >
            <span className="absolute -left-[45px] top-2 h-[11px] w-[11px] rounded-full border border-terracota bg-papel" />
            <p className="font-display text-3xl italic text-terracota">{it.hora}</p>
            <div>
              <h4 className="font-display text-3xl leading-tight">{it.titulo}</h4>
              <p className="mt-1 text-[15px] text-tinta/60">{it.texto}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
