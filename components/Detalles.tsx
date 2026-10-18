'use client'

import { motion } from 'motion/react'
import { detalles } from '@/lib/content'
import { Encabezado } from './Encabezado'

const iconos = [
  // Vestimenta
  <path key="v" d="M9 3l3 3 3-3 4 3-2 4-2-1v12H9V9l-2 1-2-4z" />,
  // Regalo
  <g key="r"><rect x="4" y="9" width="16" height="11" rx="1" /><path d="M3 9h18M12 9v11M12 9c-2-4-6-4-6-1.5S10 9 12 9zm0 0c2-4 6-4 6-1.5S14 9 12 9z" /></g>,
  // Alojamiento
  <g key="a"><path d="M3 20V8l9-5 9 5v12" /><path d="M9 20v-6h6v6" /></g>,
]

/** Capítulo VI — lo práctico, con el mismo cuidado que el resto. */
export function Detalles() {
  return (
    <section id="detalles" className="relative bg-lino px-6 py-[18svh] lg:pl-40">
      <div className="mx-auto max-w-6xl">
        <Encabezado numero={detalles.numero} titulo={detalles.titulo} />
        <div className="mt-16 grid gap-px overflow-hidden border border-tinta/10 bg-tinta/10 md:grid-cols-3">
          {detalles.tarjetas.map((t, i) => (
            <motion.article
              key={t.titulo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="bg-lino p-8 lg:p-10"
            >
              <svg viewBox="0 0 24 24" className="h-9 w-9 text-oliva" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" aria-hidden>
                {iconos[i]}
              </svg>
              <h3 className="mt-6 font-display text-3xl leading-tight">{t.titulo}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-tinta/65">{t.texto}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
