import clsx from 'clsx';
import type {SerializeFrom} from '@shopify/remix-oxygen';
import {MediaFile} from '@shopify/hydrogen';
import type {
  MediaImage,
  Media,
  Metafield,
  Video as MediaVideo,
} from '@shopify/hydrogen/storefront-api-types';
import {Heading, Text, Link} from '~/components';

export interface CollectionHero {
  byline: Metafield;
  cta: Metafield;
  handle: string;
  heading: Metafield;
  height?: 'full' | 'half';
  loading?: 'eager' | 'lazy';
  spread: Metafield;
  top?: boolean;
}

/**
 * Hero component that renders metafields attached to collection resources
 **/
export function Hero({
  byline,
  cta,
  handle,
  heading,
  height,
  loading,
  spread,
  top,
}: SerializeFrom<CollectionHero>) {
  return (
    <Link to={`/collections/${handle}`}>
      <section
        className={clsx(
          'relative justify-end flex flex-col w-full max-h-[50%]',
          top && '-mt-nav',
          height === 'half' && 'h-[50vh]'
            ? 'h-screen'
            : 'aspect-[4/6] sm:aspect-square md:aspect-[5/4] lg:aspect-[3/2] xl:aspect-[5/2]',
        )}
      >
        <div className="absolute inset-0 grid flex-grow grid-flow-col pointer-events-none auto-cols-fr -z-10 content-stretch overflow-clip">
          {spread?.reference && (
            <div>
              <SpreadMedia
                sizes="50vh"
                data={spread.reference as Media}
                loading={loading}
              />
            </div>
          )}
        </div>
        <div
          className="
        flex flex-col bg-contrast/50 items-start max-w-fit 
        justify-between gap-8 px-6 py-12 sm:px-12 md:px-12 
        bg-gradient-to-t dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast"
        >
          {heading?.value && (
            <Heading format as="h2" size="display" className="max-w-xl">
              {heading.value}
            </Heading>
          )}
          {byline?.value && (
            <Text format width="narrow" as="p" size="copy">
              {byline.value}
            </Text>
          )}
          {cta?.value && (
            <Text
              size="copy"
              className="border border-primary px-4 py-2 bg-primaryGreen hover:bg-brandPurple hover:text-contrast hover:border-primary animate-bounce"
            >
              {cta.value}
            </Text>
          )}
        </div>
      </section>
    </Link>
  );
}

interface SpreadMediaProps {
  data: Media | MediaImage | MediaVideo;
  loading?: HTMLImageElement['loading'];
  sizes: string;
}

function SpreadMedia({data, loading, sizes}: SpreadMediaProps) {
  return (
    <MediaFile
      data={data}
      className="block object-cover w-full h-full"
      mediaOptions={{
        video: {
          controls: false,
          muted: true,
          loop: true,
          playsInline: true,
          autoPlay: true,
          previewImageOptions: {src: data.previewImage?.url ?? ''},
        },
        image: {
          loading,
          crop: 'center',
          sizes,
          alt: data.alt || '',
        },
      }}
    />
  );
}
