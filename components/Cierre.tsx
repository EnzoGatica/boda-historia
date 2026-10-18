'use client'

import { motion, useScroll } from 'motion/react'
import { useRef } from 'react'
import { useTramo } from '@/lib/scroll'
import { boda, pareja } from '@/lib/content'

/** Cierre: el monograma se acerca mientras la página termina. */
export function Cierre() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const escala = useTramo(scrollYProgress, [0, 1], [0.7, 1])
  const opacidad = useTramo(scrollYProgress, [0.2, 0.8], [0, 1])

  return (
    <section ref={ref} className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
      <motion.div style={{ scale: escala, opacity: opacidad }}>
        <p className="etiqueta text-oliva">Te esperamos</p>
        <div className="relative mx-auto mt-10 flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
          <svg viewBox="0 0 200 200" className="absolute inset-0 text-terracota/50" aria-hidden>
            <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 4" />
          </svg>
          <p className="font-display text-6xl font-light italic text-tinta sm:text-7xl">{pareja.iniciales}</p>
        </div>
        <p className="mx-auto mt-10 max-w-md font-display text-2xl italic leading-snug text-tinta/75">{pareja.frase}</p>
        <p className="etiqueta mt-8 text-tinta/50">{boda.fechaTexto}</p>
      </motion.div>
      <p className="absolute bottom-6 text-xs text-tinta/35">
        Hecho con cariño para {pareja.nombres[0]} y {pareja.nombres[1]}
      </p>
    </section>
  )
}
