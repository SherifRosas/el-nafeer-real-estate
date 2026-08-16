import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://el-nafeer-real-estate.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://el-nafeer-real-estate.vercel.app/%D8%AD%D8%B7%D8%A8-%D8%A3%D9%81%D8%B1%D9%8A%D9%82%D9%8A',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
