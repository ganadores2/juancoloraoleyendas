import type { Metadata } from 'next'
import { GlossaryExplorer } from '@/components/san-yallego/glossary-explorer'

export const metadata: Metadata = {
  title: 'Archivo de Palabras — San Yallego | Juan Colorao Leyendas',
  description: 'Diccionario cultural de San Yallego: personajes, dichos populares, voces de lenguas originarias y términos del universo Juan Colorao.',
}

export default function GlosarioPage() {
  return <GlossaryExplorer />
}
