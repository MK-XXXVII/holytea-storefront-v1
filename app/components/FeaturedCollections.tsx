import {Image} from '@shopify/hydrogen';
import type {Collection} from '@shopify/hydrogen/storefront-api-types';
import {Heading, Section, Grid, Link} from '~/components';

function truncateWords(str: string, limit = 40) {
  const words = str.split(' ');

  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }

  return str;
}

export function FeaturedCollections({
  collections,
  title = 'Collections',
  ...props
}: {
  collections: Collection[];
  title?: string;
  [key: string]: any;
}) {
  const haveCollections = collections && collections.length > 0;
  if (!haveCollections) return null;

  const items = collections.filter((item) => item.image).length;

  return (
    <Section {...props} heading={title} className="bg-[#D1F1A3]">
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
                <p className="text-sm text-gray-700">
                  {truncateWords(collection.description)}
                </p>
              </div>
            </Link>
          );
        })}
      </Grid>
    </Section>
  );
}
