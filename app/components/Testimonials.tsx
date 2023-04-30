import {Image} from '@shopify/hydrogen';

interface TestimonialsProps {
  headline?: string;
  tagline?: string;
  testimonials?: {
    name: string;
    testimonial: string;
    image: string;
  }[];
  className?: string;
}

export function Testimonials({
  headline,
  tagline,
  testimonials,
  className,
}: TestimonialsProps) {
  return (
    <div className={`p-4 space-y-4 ${className}`}>
      {headline && <h1 className="text-3xl text-center">{headline}</h1>}
      {tagline && (
        <h2 className="text-xl text-center text-primary">{tagline}</h2>
      )}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 items-start">
        {testimonials?.map(({name, testimonial, image}, index) => (
          <div key={index} className="flex space-x-4 items-start">
            <Image
              src={image}
              alt={`Image of ${name}`}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <p>{testimonial}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
