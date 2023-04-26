import {Image} from '@shopify/hydrogen';
import type {Collection} from '@shopify/hydrogen/storefront-api-types';
import {Heading, Section, Grid, Link, Button} from '~/components';

interface FeaturedCollectionsProps {
  collections: Collection[];
  title?: string;
  tagline?: string;
  [key: string]: any;
}

function truncateWords(str = '', limit = 40) {
  if (!str) return '';

  const words = str.split(' ');

  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }

  return str;
}

export function FeaturedCollections({
  collections,
  title = 'Collections',
  tagline,
  ...props
}: FeaturedCollectionsProps) {
  const haveCollections = collections && collections.length > 0;
  if (!haveCollections) return null;

  const items = collections.filter((item) => item.image).length;

  return (
    <Section {...props} heading={title}>
      {tagline && (
        <p className="text-left text-xl md:text-3xl text-primary/80 mb-4">
          {tagline}
        </p>
      )}
      <Grid items={items}>
        {collections.map((collection) => {
          if (!collection?.image) {
            return null;
          }
          return (
            <Link key={collection.id} to={`/collections/${collection.handle}`}>
              <div className="grid gap-4">
                <div className="card-image bg-primary/5 aspect-[3/2]">
                  {collection?.image && (
                    <Image
                      alt={`Image of ${collection.title}`}
                      data={collection.image}
                      sizes="(max-width: 32em) 100vw, 33vw"
                      aspectRatio="3/2"
                    />
                  )}
                </div>
                <Heading size="copy">{collection.title}</Heading>
                <p className="text-md text-primary">
                  {truncateWords(collection.description)}
                </p>
              </div>
            </Link>
          );
        })}
      </Grid>
      <div className="flex justify-center mt-6">
        <Button as="a" variant="secondary" width="auto" href="/collections">
          Explore All Collections
        </Button>
      </div>
    </Section>
  );
}
