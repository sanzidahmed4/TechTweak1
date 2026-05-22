import { MetadataRoute } from 'next'
import connectToDatabase from '@/lib/mongodb/mongoose'
import Phone from '@/lib/models/Phone'
import Brand from '@/lib/models/Brand'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectToDatabase()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techtweak.com'

  // Fetch dynamic routes
  let phonesData: any[] = []
  let brandsData: any[] = []
  
  try {
    // Phones
    const rawPhones = await Phone.find({ is_published: true })
      .select('slug updated_at brand_id')
      .populate('brand_id', 'slug')
      .lean()
    
    if (rawPhones) {
      phonesData = rawPhones.map((p: any) => ({
        slug: p.slug,
        updated_at: p.updated_at || new Date(),
        brands: { slug: p.brand_id?.slug }
      }))
    }

    // Brands
    const rawBrands = await Brand.find()
      .select('slug updated_at')
      .lean()
      
    if (rawBrands) {
      brandsData = rawBrands.map((b: any) => ({
        slug: b.slug,
        updated_at: b.updated_at || new Date()
      }))
    }
  } catch (error) {
    console.error('Error fetching sitemap data', error)
  }

  // Define static routes
  const staticRoutes = [
    '',
    '/phones',
    '/compare',
    '/upcoming-phones',
    '/news',
    '/articles',
    '/reviews',
    '/best',
    '/about',
    '/contact'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Generate dynamic phone routes
  const phoneRoutes = phonesData.map((phone) => ({
    url: `${baseUrl}/phones/${phone.brands?.slug}/${phone.slug}`,
    lastModified: new Date(phone.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Generate dynamic brand routes
  const brandRoutes = brandsData.map((brand) => ({
    url: `${baseUrl}/phones/${brand.slug}`,
    lastModified: new Date(brand.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...brandRoutes, ...phoneRoutes]
}
