import type { NextConfig } from 'next'

// GitHub Pages sirve el sitio bajo /<repo>/, no en la raiz del dominio.
// El workflow de deploy define esta variable; en local queda vacia.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  images: { unoptimized: true },
}

export default nextConfig
