import { testimonials as allTestimonials } from "./testimonials";

// Define a simplified interface for homepage snippets
interface HomepageTestimonial {
  id: string;
  clientName: string;
  quote: string;
  location: string;
}

export function getTestimonialsForHomepage(
  t: (key: string) => string,
  count: number = 3
): HomepageTestimonial[] {
  if (allTestimonials.length === 0) return [];

  // Shuffle the testimonials array to get random ones each time (or on redeploy)
  const shuffled = [...allTestimonials].sort(() => 0.5 - Math.random());

  // Take the first 'count' testimonials
  const selected = shuffled.slice(0, count);

  // Return formatted data for display
  return selected.map((t) => ({
    id: t.id,
    clientName: t.clientName,
    quote: t.quote, // The quote is already a string, not a translation key
    location: t.location, // Location is also a string
  }));
}
