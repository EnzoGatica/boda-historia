'use client'

import { motion, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { capitulos } from '@/lib/content'

/**
 * El hilo de la historia: una línea fija que se llena con el scroll y marca el
 * capítulo en curso. En escritorio va a la izquierda con índice; en móvil es
 * una barra fina arriba.
 */
export function Hilo() {
  const { scrollYProgress } = useScroll()
  const progreso = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const [activo, setActivo] = useState<string>(capitulos[0].id)

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setActivo(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const c of capitulos) {
      const el = document.getElementById(c.id)
      if (el) observador.observe(el)
    }
    return () => observador.disconnect()
  }, [])

  // En capítulos oscuros el hilo se aclara
  const oscuro = activo === 'propuesta' || activo === 'numeros'

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progreso }}
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-terracota lg:hidden"
      />

      <nav
        aria-label="Capítulos"
        className={`fixed left-8 top-1/2 z-50 hidden -translate-y-1/2 transition-colors duration-700 lg:block ${oscuro ? 'text-papel' : 'text-tinta'}`}
      >
        <div className="relative pl-6">
          <span className="absolute left-0 top-1 bottom-1 w-px bg-current opacity-15" />
          <motion.span
            style={{ scaleY: progreso }}
            className="absolute left-0 top-1 bottom-1 w-px origin-top bg-terracota"
          />
          <ul className="space-y-4">
            {capitulos.map((c) => {
              const esActivo = c.id === activo
              return (
                <li key={c.id}>
                  <a href={`#${c.id}`} className="group flex items-center gap-3">
                    <span
                      className={`absolute -left-[3px] h-[7px] w-[7px] rounded-full transition-all duration-500 ${esActivo ? 'scale-100 bg-terracota' : 'scale-0 bg-current'}`}
                    />
                    <span
                      className={`etiqueta whitespace-nowrap !text-[10px] transition-all duration-500 ${esActivo ? 'opacity-90' : 'opacity-0 group-hover:opacity-60'}`}
                    >
                      {c.etiqueta}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </>
  )
}
