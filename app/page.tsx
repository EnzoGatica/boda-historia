import { Portada } from '@/components/Portada'
import { Hilo } from '@/components/Hilo'
import { Conocimos } from '@/components/Conocimos'
import { Camino } from '@/components/Camino'
import { Propuesta } from '@/components/Propuesta'
import { Numeros } from '@/components/Numeros'
import { GranDia } from '@/components/GranDia'
import { Detalles } from '@/components/Detalles'
import { Proximamente } from '@/components/Proximamente'
import { Cierre } from '@/components/Cierre'

export default function Inicio() {
  return (
    <main>
      <Hilo />
      <Portada />
      <Conocimos />
      <Camino />
      <Propuesta />
      <Numeros />
      <GranDia />
      <Detalles />
      <Proximamente />
      <Cierre />
    </main>
  )
}
