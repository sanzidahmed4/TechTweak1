import { unstable_cache } from 'next/cache';
import connectToDatabase from '@/lib/mongodb/mongoose';
import Phone from '@/lib/models/Phone';
import '@/lib/models/Brand';

export const getFeaturedPhones = unstable_cache(
  async (limit: number = 50) => {
    await connectToDatabase();
    
    // Select only required fields
    const phones = await Phone.find({ is_published: true, phone_status: 'released' })
      .select('name slug brand_id price_usd images phone_status display processor ram storage camera_main battery network is_featured release_date antutu_score')
      .populate('brand_id', 'name slug')
      .sort({ release_date_parsed: -1, price_usd: 1, name: 1 })
      .limit(limit)
      .lean();
      
    // Serialize object ids
    return JSON.parse(JSON.stringify(phones));
  },
  ['featured-phones'],
  { revalidate: 1800, tags: ['featured-phones', 'phones'] }
);

export const getUpcomingPhones = unstable_cache(
  async (limit: number = 10) => {
    await connectToDatabase();
    
    const phones = await Phone.find({ is_published: true, phone_status: { $in: ['upcoming', 'rumored'] } })
      .select('name slug brand_id price_usd images phone_status expected_launch_date leak_confidence display processor ram storage camera_main battery network is_featured release_date antutu_score')
      .populate('brand_id', 'name slug')
      .sort({ expected_launch_date: 1, name: 1 })
      .limit(limit)
      .lean();
      
    return JSON.parse(JSON.stringify(phones));
  },
  ['upcoming-phones'],
  { revalidate: 1800, tags: ['upcoming-phones', 'phones'] }
);
