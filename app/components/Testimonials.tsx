import {Image} from '@shopify/hydrogen';
import {Section} from './Text';

interface TestimonialCard {
  fields: {
    key: string;
    value: string;
  }[];
  field: {
    value: string;
    reference: {
      id: string;
      image: {
        altText: string;
        url: string;
      };
    };
  };
}

interface TestimonialEdge {
  node: TestimonialCard;
}

interface TestimonialData {
  metaobjects: {
    edges: TestimonialEdge[];
  };
}

// Export TestimonialData interface
export type {TestimonialData};

interface TestimonialsProps {
  testimonials: TestimonialData;
  title?: string;
  tagline?: string;
}

export function Testimonials({
  testimonials,
  title,
  tagline,
}: TestimonialsProps) {
  const edges = testimonials.metaobjects?.edges || [];
  return (
    <Section className="mx-auto py-20 px-6 md:px-16">
      <h2 className="text-heading lg:text-display font-bold leading-10 text-primary md:text-3xl sm:truncate">
        {title}
      </h2>
      {tagline && (
        <p className="text-left text-xl md:text-2xl max-w-7xl text-primary/80 mb-4">
          {tagline}
        </p>
      )}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-5">
        {edges.map(({node}) => {
          // Here we create a map to easily access the fields by key
          const fieldsMap = node.fields.reduce((acc, field) => {
            acc[field.key] = field.value;
            return acc;
          }, {} as Record<string, string>);

          return (
            <div
              key={fieldsMap['name']}
              className="
              relative flex items-center space-x-3 rounded-sm 
              border border-primary bg-brandPurple/70 hover:bg-primaryGreen
              p-4 shadow-md focus-within:ring-2 focus-within:ring-contrast 
              focus-within:ring-offset-2 hover:border-primary"
            >
              <div className="flex-shrink-0">
                <Image
                  alt={node.field.reference.image.altText}
                  data={{
                    url: node.field.reference.image.url,
                  }}
                  className="h-24 w-24 rounded-full"
                  sizes="(max-width: 600px) 30vw, (max-width: 900px) 50vw, 300px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-lead font-medium pb-4">
                    {fieldsMap['name']}
                  </p>
                  <p className="text-fine">{fieldsMap['testimonial']}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
