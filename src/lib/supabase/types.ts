export type Phone = {
  id: string;
  brand_id: string;
  name: string;
  slug: string;
  is_published: boolean;
  release_date: string | null;
  upcoming: boolean;
  images: string[];
  processor: string | null;
  ram: string | null;
  storage: string | null;
  display: string | null;
  battery: string | null;
  charging: string | null;
  camera_main: string | null;
  camera_front: string | null;
  os: string | null;
  detailed_specs: any;
  price_usd: number | null;
  antutu_score: number | null;
  created_at: string;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  created_at: string;
};
