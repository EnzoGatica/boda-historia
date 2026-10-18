import type { Foto as TipoFoto } from '@/lib/content'

const tonos = {
  calido: 'from-[#e9d6bd] via-[#d9b996] to-[#b8875f]',
  salvia: 'from-[#dfe2cf] via-[#b9c0a0] to-[#7f8b66]',
  rosa: 'from-[#f0dcd2] via-[#dcb4a2] to-[#b47c66]',
  noche: 'from-[#4a4038] via-[#2e2823] to-[#191612]',
}

/**
 * Foto real si hay `src`; si no, un marco con la descripción de qué foto va ahí.
 * Así la presentación se entiende sin fotos y el cambio es solo cargar el archivo.
 */
export function Foto({
  foto,
  tono = 'calido',
  className = '',
}: {
  foto: TipoFoto
  tono?: keyof typeof tonos
  className?: string
}) {
  if (foto.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={foto.src} alt={foto.alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
    )
  }

  return (
    <div
      role="img"
      aria-label={foto.alt}
      className={`relative flex h-full w-full items-end overflow-hidden bg-gradient-to-br ${tonos[tono]} ${className}`}
    >
      {/* Luz suave, como de ventana */}
      <div aria-hidden className="absolute -left-1/4 -top-1/4 h-3/4 w-3/4 rounded-full bg-white/30 blur-3xl" />
      <svg aria-hidden viewBox="0 0 24 24" className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-white/55" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <circle cx="12" cy="13" r="3.5" />
        <path d="M8 6l1.5-2h5L16 6" />
      </svg>
      <span className="relative m-3 font-display text-sm italic leading-tight text-white/85">{foto.alt}</span>
    </div>
  )
}
