'use client'

import { motion } from 'motion/react'
import { proximamente } from '@/lib/content'

/**
 * Adelanto de la segunda etapa: las zonas interactivas se muestran, pero quedan
 * marcadas como "próximamente" para que nadie intente usarlas todavía.
 */
export function Proximamente() {
  return (
    <section className="relative overflow-hidden bg-oliva px-6 py-[18svh] text-papel lg:pl-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="etiqueta text-oro">Próximamente</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-light leading-[1] tracking-tight">
            {proximamente.titulo}
          </h2>
          <p className="mt-5 max-w-xl text-papel/75">{proximamente.bajada}</p>
        </motion.div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {proximamente.items.map((it, i) => (
            <motion.li
              key={it.titulo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative rounded-sm border border-papel/20 bg-papel/5 p-6 backdrop-blur-sm"
            >
              <span className="etiqueta !text-[9px] rounded-full border border-oro/50 px-2.5 py-1 text-oro">Muy pronto</span>
              <h3 className="mt-6 font-display text-2xl leading-tight">{it.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-papel/70">{it.texto}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
