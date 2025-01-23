import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'tuca5i9i',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKEN,
  withCredentials: true,
  cors: true,
  ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
} 