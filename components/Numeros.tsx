'use client'

import { animate, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { inicioRelacion, numeros } from '@/lib/content'
import { Encabezado } from './Encabezado'

function diasJuntos() {
  return Math.floor((Date.now() - new Date(inicioRelacion).getTime()) / 86_400_000)
}

/** Capítulo IV — contadores que corren al entrar en pantalla. */
export function Numeros() {
  return (
    <section id="numeros" className="relative bg-noche px-6 py-[22svh] text-papel lg:pl-40">
      <div className="mx-auto max-w-6xl">
        <Encabezado numero={numeros.numero} titulo={numeros.titulo} claro />
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 lg:mt-24 lg:grid-cols-4">
          {numeros.datos.map((d, i) => (
            <motion.div
              key={d.etiqueta}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, delay: i * 0.12 }}
              className="border-t border-papel/15 pt-6"
            >
              <dd className="font-display text-[clamp(3rem,7vw,5.5rem)] font-light leading-none text-oro">
                <Contador hasta={d.valor ?? null} />
                {d.sufijo}
              </dd>
              <dt className="etiqueta mt-4 text-papel/60">{d.etiqueta}</dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Contador({ hasta }: { hasta: number | null }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, margin: '-10% 0px' })
  const [valor, setValor] = useState(0)

  useEffect(() => {
    if (!visible) return
    const destino = hasta ?? diasJuntos()
    const control = animate(0, destino, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValor(Math.round(v)),
    })
    return () => control.stop()
  }, [visible, hasta])

  return <span ref={ref}>{valor.toLocaleString('es-CL')}</span>
}
