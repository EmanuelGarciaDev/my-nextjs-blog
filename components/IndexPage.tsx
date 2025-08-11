import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import HeroSection from 'components/HeroSection'
import TopicsGrid from 'components/TopicsGrid'
import FeaturedPosts from 'components/FeaturedPosts'
import StatsSection from 'components/StatsSection'
import IndexPageHead from 'components/IndexPageHead'
import * as demo from 'lib/demo.data'
import type { Post, Settings, Category } from 'lib/sanity.queries'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
  categories: Category[]
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings, categories } = props
  const { title = demo.title, description = demo.description } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        {/* Hero Section */}
        <HeroSection 
          title={title} 
          description={Array.isArray(description) ? description.join(' ') : description}
        />
        
        {/* Main Content */}
        <div id="main-content">
          {/* Topics Grid */}
          <TopicsGrid categories={categories} />
          
          {/* Stats Section */}
          <StatsSection />
          
          {/* Featured Posts */}
          <FeaturedPosts posts={posts} />
        </div>
      </Layout>
    </>
  )
}
