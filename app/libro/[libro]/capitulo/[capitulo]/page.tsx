import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ChapterScreen } from '@/components/san-yallego/capitulo/chapter-screen'
import { CHAPTERS, getChapter } from '@/lib/san-yallego/chapters'

type Props = { params: Promise<{ libro: string; capitulo: string }> }

export function generateStaticParams() {
  return CHAPTERS.map((chapter) => ({ libro: String(chapter.book), capitulo: String(chapter.number) }))
}

async function resolve(params: Props['params']) {
  const { libro, capitulo } = await params
  return getChapter(Number(libro), Number(capitulo))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chapter = await resolve(params)
  return { title: chapter ? `Capítulo ${chapter.number} — ${chapter.title}` : 'San Yallego' }
}

export default async function Page({ params }: Props) {
  const chapter = await resolve(params)
  if (!chapter) notFound()
  return <ChapterScreen chapter={chapter} />
}
