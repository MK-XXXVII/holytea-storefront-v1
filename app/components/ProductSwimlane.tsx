import type {Product} from '@shopify/hydrogen/storefront-api-types';
import {ProductCard, Section, Button} from '~/components';

const mockProducts = new Array(12).fill('');

export function ProductSwimlane({
  title = 'Featured Blends',
  tagline,
  products = mockProducts,
  count = 12,
  ...props
}: {
  title?: string;
  tagline?: string;
  products?: Product[];
  count?: number;
}) {
  return (
    <Section heading={title} padding="y" {...props}>
      {tagline && (
        <p className="text-left max-w-7xl text-xl md:text-2xl text-primary/80 mb-4 px-6 sm:px-12">
          {tagline}
        </p>
      )}
      <div className="swimlane hiddenScroll md:pb-8 md:scroll-px-8 lg:scroll-px-12 md:px-8 lg:px-12">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            className="snap-start w-80"
          />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Button as="a" href="/products" variant="secondary">
          View All Products
        </Button>
      </div>
    </Section>
  );
}
