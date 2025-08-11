import { GetStaticProps } from 'next'
import BlogContainer from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import BlogLayout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import PostPreview from 'components/PostPreview'
import { readToken } from 'lib/sanity.api'
import { getAllPosts, getClient, getSettings } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import type { SharedPageProps } from 'pages/_app'

interface PostsPageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
}

export default function PostsPage({ posts, settings, previewMode }: PostsPageProps) {
  return (
    <>
      <IndexPageHead settings={settings} />
      <BlogLayout preview={previewMode}>
        <BlogContainer>
          <BlogHeader title="All Articles" level={1} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {posts.map((post) => (
              <article key={post._id} className="group">
                <PostPreview
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  excerpt={post.excerpt}
                  author={post.author}
                  categories={post.categories}
                  slug={post.slug}
                />
              </article>
            ))}
          </div>
          
          {(!posts || posts.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No posts found. <a href="/studio" className="text-blue-600 hover:underline">Create your first post</a>
              </p>
            </div>
          )}
        </BlogContainer>
      </BlogLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps<PostsPageProps> = async (ctx) => {
  const { preview: previewMode = false, previewData } = ctx
  const client = getClient(
    previewMode ? { token: readToken, perspective: previewData } : undefined,
  )

  const [settings, posts = []] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
  ])

  return {
    props: {
      posts,
      settings,
      previewMode,
      previewPerspective: typeof previewData === 'string' ? previewData : null,
      token: previewMode ? readToken : '',
    },
  }
}
