'use client'

import { motion, useScroll } from 'motion/react'
import { useRef } from 'react'
import { useTramo } from '@/lib/scroll'
import { camino } from '@/lib/content'
import { Encabezado } from './Encabezado'
import { Foto } from './Foto'

const tonos = ['calido', 'salvia', 'rosa', 'calido', 'salvia'] as const

/**
 * Capítulo II — línea de tiempo horizontal. La sección queda pegada y el scroll
 * vertical desplaza los hitos de lado; una línea con fecha los va hilando.
 * No se secuestra la rueda: el usuario sigue haciendo scroll normal.
 */
export function Camino() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })

  const x = useTramo(scrollYProgress, [0.05, 0.95], ['0%', '-78%'])
  const linea = useTramo(scrollYProgress, [0.05, 0.95], [0, 1])

  return (
    <section id="camino" ref={ref} className="relative h-[520svh] bg-lino">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="px-6 lg:pl-40">
          <Encabezado numero={camino.numero} titulo={camino.titulo} />
        </div>

        <div className="relative mt-8 lg:mt-12">
          {/* La línea del tiempo, fija, que se llena con el avance */}
          <div className="absolute inset-x-6 top-[11px] h-px bg-tinta/15 lg:left-40" />
          <motion.div style={{ scaleX: linea }} className="absolute inset-x-6 top-[11px] h-px origin-left bg-terracota lg:left-40" />

          <motion.ol style={{ x }} className="relative flex gap-8 px-6 lg:gap-14 lg:pl-40">
            {camino.hitos.map((h, i) => (
              <li key={h.anio + h.titulo} className="w-[78vw] shrink-0 sm:w-[46vw] lg:w-[30vw]">
                <span className="relative z-10 block h-[23px] w-[23px] rounded-full border border-terracota bg-lino p-[5px]">
                  <span className="block h-full w-full rounded-full bg-terracota" />
                </span>
                <p className="mt-5 font-display text-6xl font-light italic leading-none text-terracota/90 lg:text-7xl">{h.anio}</p>
                <div className="mt-5 grid grid-cols-[1fr] gap-5 sm:grid-cols-[0.9fr_1fr] sm:items-end">
                  <div className="aspect-[4/3] overflow-hidden rounded-sm sm:aspect-[4/5]">
                    <Foto foto={h.foto} tono={tonos[i % tonos.length]} />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl leading-tight text-tinta">{h.titulo}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-tinta/65">{h.texto}</p>
                  </div>
                </div>
              </li>
            ))}
            <li className="flex w-[60vw] shrink-0 items-center sm:w-[30vw]" aria-hidden>
              <p className="font-display text-4xl italic text-oliva">y entonces…</p>
            </li>
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
