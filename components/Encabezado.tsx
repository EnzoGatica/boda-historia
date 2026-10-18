'use client'

import { motion } from 'motion/react'

/** Número de capítulo + título, con la entrada que se repite en toda la historia. */
export function Encabezado({
  numero,
  titulo,
  claro = false,
  centrado = false,
}: {
  numero: string
  titulo: string
  claro?: boolean
  centrado?: boolean
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={centrado ? 'text-center' : ''}
    >
      <p className={`etiqueta flex items-center gap-4 ${centrado ? 'justify-center' : ''} ${claro ? 'text-oro' : 'text-terracota'}`}>
        <span className={`h-px w-10 ${claro ? 'bg-oro/60' : 'bg-terracota/50'}`} />
        {numero}
        {centrado && <span className={`h-px w-10 ${claro ? 'bg-oro/60' : 'bg-terracota/50'}`} />}
      </p>
      <h2
        className={`mt-5 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[0.95] tracking-tight ${claro ? 'text-papel' : 'text-tinta'}`}
      >
        {titulo}
      </h2>
    </motion.header>
  )
}
