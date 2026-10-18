'use client'

import { motion, useScroll, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { useTramo } from '@/lib/scroll'
import { conocimos } from '@/lib/content'
import { Encabezado } from './Encabezado'
import { Foto } from './Foto'

/**
 * Capítulo I — la sección queda pegada mientras el relato se ilumina palabra por
 * palabra y las fotos caen sobre la mesa como polaroids.
 */
export function Conocimos() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const palabras = conocimos.texto.split(' ')

  return (
    <section id="conocimos" ref={ref} className="relative h-[320svh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pl-32">
          <div>
            <Encabezado numero={conocimos.numero} titulo={conocimos.titulo} />
            <p className="mt-6 flex flex-wrap font-display text-[clamp(1.2rem,2.4vw,1.85rem)] leading-[1.45] lg:mt-10">
              {palabras.map((p, i) => (
                <Palabra key={i} progreso={scrollYProgress} desde={0.05 + (i / palabras.length) * 0.6} hasta={0.05 + ((i + 1) / palabras.length) * 0.6}>
                  {p}
                </Palabra>
              ))}
            </p>
            <Lugar progreso={scrollYProgress} />
          </div>

          <div className="relative h-[34svh] lg:h-[70svh]">
            {conocimos.fotos.map((foto, i) => (
              <Polaroid key={i} indice={i} progreso={scrollYProgress} foto={foto} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Palabra({ children, progreso, desde, hasta }: { children: string; progreso: MotionValue<number>; desde: number; hasta: number }) {
  const opacidad = useTramo(progreso, [desde, hasta], [0.14, 1])
  return (
    <motion.span style={{ opacity: opacidad }} className="mr-[0.26em]">
      {children}
    </motion.span>
  )
}

function Lugar({ progreso }: { progreso: MotionValue<number> }) {
  const opacidad = useTramo(progreso, [0.66, 0.74], [0, 1])
  return (
    <motion.p style={{ opacity: opacidad }} className="etiqueta mt-6 text-oliva lg:mt-8">
      — {conocimos.lugar}
    </motion.p>
  )
}

// Posición final de cada polaroid sobre la "mesa"
const mesa = [
  { left: '4%', top: '6%', rot: -7, tono: 'calido' as const },
  { left: '38%', top: '22%', rot: 5, tono: 'rosa' as const },
  { left: '14%', top: '46%', rot: -2, tono: 'salvia' as const },
]

function Polaroid({ indice, progreso, foto }: { indice: number; progreso: MotionValue<number>; foto: { alt: string; src?: string } }) {
  const p = mesa[indice]
  const inicio = 0.12 + indice * 0.2
  const tramo = [inicio, inicio + 0.16]
  const y = useTramo(progreso, tramo, [420, 0])
  const x = useTramo(progreso, tramo, [indice % 2 ? 160 : -160, 0])
  const rot = useTramo(progreso, tramo, [p.rot * 4, p.rot])
  const opacidad = useTramo(progreso, [inicio, inicio + 0.06], [0, 1])

  return (
    <motion.figure
      style={{ x, y, rotate: rot, opacity: opacidad, left: p.left, top: p.top }}
      className="absolute w-[46%] bg-white p-2 pb-8 shadow-[0_20px_50px_-20px_rgba(43,38,32,0.45)] lg:w-[52%] lg:p-3 lg:pb-12"
    >
      <div className="aspect-[4/5] lg:aspect-square">
        <Foto foto={foto} tono={p.tono} />
      </div>
    </motion.figure>
  )
}
