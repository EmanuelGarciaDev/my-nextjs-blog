import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import { getAllPosts, getClient, getSettings } from 'lib/sanity.client'
import { Post, Settings, Category, categoriesQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
  categories: Category[]
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { posts, settings, categories, previewMode } = props

  if (previewMode) {
    return <PreviewIndexPage posts={posts} settings={settings} />
  }

  return (
    <main>
      <IndexPage posts={posts} settings={settings} categories={categories} />
    </main>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { preview: previewMode = false, previewData } = ctx
  const client = getClient(
    previewMode ? { token: readToken, perspective: previewData } : undefined,
  )

  const [settings, posts = [], categories = []] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
    client.fetch<Category[]>(categoriesQuery),
  ])

  return {
    props: {
      posts,
      settings,
      categories,
      previewMode,
      previewPerspective: typeof previewData === 'string' ? previewData : null,
      token: previewMode ? readToken : '',
    },
  }
}
