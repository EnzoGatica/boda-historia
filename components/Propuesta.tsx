'use client'

import { motion, useScroll, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { useTramo } from '@/lib/scroll'
import { propuesta } from '@/lib/content'
import { Foto } from './Foto'

/**
 * Capítulo III — el clímax. La página se oscurece como al atardecer, se cuenta
 * el momento, un anillo se dibuja con el scroll y la respuesta llega en oro.
 */
export function Propuesta() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const fondo = useTramo(p, [0, 0.12], ['#ece2d2', '#1c1916'])
  const fotoOpacidad = useTramo(p, [0.05, 0.25, 0.85, 1], [0, 0.35, 0.35, 0.2])
  const fotoEscala = useTramo(p, [0, 1], [1.15, 1])

  // Fase 1: el relato
  const antesOp = useTramo(p, [0.1, 0.18, 0.3, 0.36], [0, 1, 1, 0])
  const antesY = useTramo(p, [0.1, 0.36], [40, -40])

  // Fase 2: la pregunta y el anillo
  const anillo = useTramo(p, [0.36, 0.6], [0, 1])
  const preguntaOp = useTramo(p, [0.42, 0.5, 0.62, 0.68], [0, 1, 1, 0])

  // Fase 3: la respuesta
  const siOp = useTramo(p, [0.66, 0.76], [0, 1])
  const siEscala = useTramo(p, [0.66, 0.8], [0.6, 1])
  const fechaOp = useTramo(p, [0.78, 0.86], [0, 1])

  return (
    <section id="propuesta" ref={ref} className="relative h-[420svh]">
      <motion.div style={{ backgroundColor: fondo }} className="sticky top-0 flex h-svh items-center justify-center overflow-hidden text-papel">
        <motion.div aria-hidden style={{ opacity: fotoOpacidad, scale: fotoEscala }} className="absolute inset-0">
          <Foto foto={propuesta.foto} tono="noche" className="[&>span]:hidden [&>svg]:hidden" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#1c1916_75%)]" />
        </motion.div>

        <Destellos progreso={p} />

        <div className="relative w-full max-w-3xl px-6 text-center">
          <motion.div style={{ opacity: antesOp, y: antesY }} className="absolute inset-x-6 top-1/2 -translate-y-1/2">
            <p className="etiqueta text-oro">{propuesta.numero} · {propuesta.titulo}</p>
            <p className="mt-8 font-display text-[clamp(1.6rem,3.6vw,2.8rem)] font-light italic leading-snug">{propuesta.antes}</p>
          </motion.div>

          <div className="relative mx-auto aspect-square w-[min(78vw,460px)]">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full text-oro">
              <motion.circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="0.8" style={{ pathLength: anillo }} />
              <motion.circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 3" style={{ pathLength: anillo }} />
              {/* La piedra del anillo, arriba */}
              <motion.path d="M100 2 l6 6 -6 7 -6 -7z" fill="currentColor" style={{ opacity: anillo }} />
            </svg>

            <motion.p
              style={{ opacity: preguntaOp }}
              className="absolute inset-0 flex items-center justify-center px-10 font-display text-[clamp(2rem,5vw,3.4rem)] font-light italic leading-tight"
            >
              {propuesta.pregunta}
            </motion.p>

            <motion.div style={{ opacity: siOp, scale: siEscala }} className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="bg-gradient-to-b from-[#f3dcaa] via-oro to-[#9c7a43] bg-clip-text font-display text-[clamp(6rem,20vw,11rem)] font-light italic leading-none text-transparent">
                {propuesta.respuesta}
              </span>
              <motion.span style={{ opacity: fechaOp }} className="etiqueta mt-4 text-papel/70">
                {propuesta.fecha}
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// Puntos de luz fijos (sin Math.random para que el render sea estable)
const puntos = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 37) % 100,
  y: (i * 61 + 13) % 100,
  t: 1 + ((i * 7) % 4),
  d: (i % 5) * 0.4,
}))

function Destellos({ progreso }: { progreso: MotionValue<number> }) {
  const opacidad = useTramo(progreso, [0.64, 0.78], [0, 1])
  return (
    <motion.div aria-hidden style={{ opacity: opacidad }} className="pointer-events-none absolute inset-0">
      {puntos.map((pt, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-oro"
          style={{ left: `${pt.x}%`, top: `${pt.y}%`, width: pt.t + 1, height: pt.t + 1 }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2.4 + pt.d, repeat: Infinity, delay: pt.d }}
        />
      ))}
    </motion.div>
  )
}
