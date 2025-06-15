export interface Testimonial {
  id: string;
  clientName: string;
  quote: string; // The full testimonial quote text
  location: string;
  clientImage?: string; // Optional: path to the client's profile image
  rating?: 1 | 2 | 3 | 4 | 5; // Optional: Star rating (e.g., 5 for 5 stars)
  projectSlug?: string; // Optional: Link to a specific project if this testimonial is related
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    clientName: "Mr. & Mrs. Sharma",
    quote:
      "Shriejan Infraa transformed our old house into a modern masterpiece. Their attention to detail and commitment to quality were truly exceptional. We are thrilled with our new home!",
    location: "Vaishali Nagar, Jaipur",
    clientImage: "/images/clients/client1.jpg", // Placeholder image
    rating: 5,
    projectSlug: "modern-family-bungalow",
  },
  {
    id: "t2",
    clientName: "Rahul Enterprises",
    quote:
      "The team at Shriejan Infraa delivered our commercial office complex ahead of schedule and within budget. Their structural engineering expertise is unparalleled. Highly recommend!",
    location: "Sitapura Industrial Area, Jaipur",
    clientImage: "/images/clients/client2.jpg", // Placeholder image
    rating: 5,
    projectSlug: "commercial-office-complex",
  },
  {
    id: "t3",
    clientName: "Boutique Stay Hotels",
    quote:
      "For our hotel interior design, Shriejan Infraa captured the essence of local heritage while integrating modern luxury seamlessly. The result is stunning and our guests love it.",
    location: "Old City, Jaipur",
    clientImage: "/images/clients/client3.jpg", // Placeholder image
    rating: 4,
    projectSlug: "boutique-hotel-interior",
  },
  {
    id: "t4",
    clientName: "Amit Singh",
    quote:
      "I entrusted Shriejan Infraa with my industrial warehouse project, and they exceeded all expectations. Their efficiency and robust construction methods ensured a smooth process.",
    location: "RIICO Industrial Area, Sri Ganganagar",
    clientImage: "/images/clients/client4.jpg", // Placeholder image
    rating: 5,
    projectSlug: "industrial-warehouse-development",
  },
  {
    id: "t5",
    clientName: "Kaveri Devi",
    quote:
      "From concept to completion, Shriejan Infraa made building my new home a stress-free experience. Their team was professional, knowledgeable, and always available to answer my questions.",
    location: "Mansarovar, Jaipur",
    rating: 5,
  },
  {
    id: "t6",
    clientName: "City Developers Group",
    quote:
      "The residential apartment complex designed and supervised by Shriejan Infraa is a testament to their architectural and structural prowess. The project stands out in the city.",
    location: "Adarsh Nagar, Jaipur",
    rating: 4,
    projectSlug: "residential-apartments",
  },
  {
    id: "t7",
    clientName: "Priya Mehta",
    quote:
      "Exceptional service and outstanding results! Shriejan Infraa’s attention to detail ensured our commercial space was exactly as envisioned. A truly professional team.",
    location: "C-Scheme, Jaipur",
    rating: 5,
  },
  {
    id: "t8",
    clientName: "Gaurav Kumar",
    quote:
      "Their structural planning for our multi-story building was meticulous. The project was completed on time and the quality of construction is top-notch. Highly recommend for any large-scale project.",
    location: "Jhotwara, Jaipur",
    rating: 5,
  },
];
