'use client'

import { interpolate, useTransform, type MotionValue } from 'motion/react'
import { useMemo } from 'react'

/**
 * Mapea un progreso de scroll (0 a 1) a un rango de salida.
 *
 * Usa una funcion en lugar del atajo `useTransform(p, [a, b], [x, y])` a proposito.
 * Con el atajo de arrays, Motion intenta delegar la animacion al ViewTimeline del
 * navegador, y ese timeline mide el elemento animado —no la seccion de la que salio
 * el progreso—, asi que las capas terminan desincronizadas entre si. Pasando una
 * funcion, Motion no puede convertirlo a keyframes y calcula en JS, que es lo que
 * queremos: una sola fuente de verdad para todas las capas de la escena.
 */
export function useTramo<T extends number | string>(
  progreso: MotionValue<number>,
  entrada: number[],
  salida: T[],
) {
  const claveEntrada = entrada.join(',')
  const claveSalida = salida.join(',')

  const mapear = useMemo(
    () => interpolate(entrada, salida),
    // Las dependencias son las claves y no los arrays: en cada render llegan
    // arrays nuevos con el mismo contenido.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [claveEntrada, claveSalida],
  )

  return useTransform(progreso, (valor: number) => mapear(valor))
}
