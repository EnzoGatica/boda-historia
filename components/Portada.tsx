'use client'

import { motion, useScroll } from 'motion/react'
import { useRef } from 'react'
import { useTramo } from '@/lib/scroll'
import { boda, pareja } from '@/lib/content'

const suave = [0.22, 1, 0.36, 1] as const

/**
 * Portada: los nombres entran letra por letra y, al bajar, se alejan y se
 * desvanecen mientras el arco floral sube más lento (parallax).
 */
export function Portada() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const escala = useTramo(scrollYProgress, [0, 1], [1, 0.82])
  const opacidad = useTramo(scrollYProgress, [0, 0.7], [1, 0])
  const subeTexto = useTramo(scrollYProgress, [0, 1], [0, -80])
  const subeArco = useTramo(scrollYProgress, [0, 1], [0, 160])

  const [uno, dos] = pareja.nombres

  return (
    <section id="portada" ref={ref} className="relative h-[130svh]">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <motion.div aria-hidden style={{ y: subeArco }} className="absolute inset-0">
          <Arco />
        </motion.div>

        <motion.div style={{ scale: escala, opacity: opacidad, y: subeTexto }} className="relative px-6 text-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.32em' }}
            transition={{ duration: 1.6, ease: suave }}
            className="etiqueta text-oliva"
          >
            Nos casamos
          </motion.p>

          <h1 className="mt-8 font-display font-light leading-[0.85] tracking-tight text-tinta">
            <Nombre texto={uno} retraso={0.3} />
            <motion.span
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.9, ease: suave }}
              className="my-2 block font-display text-[clamp(3rem,9vw,6rem)] italic text-terracota"
            >
              &amp;
            </motion.span>
            <Nombre texto={dos} retraso={1.1} />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8, ease: suave }}
            className="mt-10"
          >
            <p className="font-display text-xl italic text-tinta/80 sm:text-2xl">{boda.fechaTexto}</p>
            <p className="etiqueta mt-3 text-tinta/50">{boda.ciudad}</p>
          </motion.div>
        </motion.div>

        <motion.a
          href="#conocimos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1 }}
          style={{ opacity: opacidad }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-tinta/55"
        >
          <span className="etiqueta">Desliza y conoce nuestra historia</span>
          <span className="relative h-12 w-px overflow-hidden bg-tinta/15">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-terracota"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.a>
      </div>
    </section>
  )
}

function Nombre({ texto, retraso }: { texto: string; retraso: number }) {
  return (
    <span aria-label={texto} className="block text-[clamp(4.2rem,16vw,12rem)]">
      {texto.split('').map((letra, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0, y: '0.4em', filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: retraso + i * 0.06, ease: suave }}
          className="inline-block"
        >
          {letra}
        </motion.span>
      ))}
    </span>
  )
}

/** Ramas de olivo dibujadas a línea que se trazan solas al cargar. */
function Arco() {
  const rama = (d: string, retraso: number) => (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2.6, delay: retraso, ease: 'easeInOut' }}
    />
  )
  const hoja = (x: number, y: number, r: number, retraso: number) => (
    <motion.ellipse
      cx={x}
      cy={y}
      rx="16"
      ry="5.5"
      transform={`rotate(${r} ${x} ${y})`}
      className="fill-salvia/50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: retraso }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    />
  )
  const hojas: [number, number, number][] = [
    [190, 610, -40], [160, 520, -60], [150, 420, -80], [170, 320, -110], [215, 230, -130], [280, 160, -150],
    [810, 610, 40], [840, 520, 60], [850, 420, 80], [830, 320, 110], [785, 230, 130], [720, 160, 150],
  ]
  return (
    <svg viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full text-oliva/45">
      {rama('M230 720 C 120 560, 120 330, 360 120', 0.2)}
      {rama('M770 720 C 880 560, 880 330, 640 120', 0.2)}
      {hojas.map(([x, y, r], i) => (
        <g key={i}>{hoja(x, y, r, 1 + (i % 6) * 0.18)}</g>
      ))}
      <motion.circle
        cx="500"
        cy="400"
        r="300"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="2 8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 2, duration: 2 }}
      />
    </svg>
  )
}
