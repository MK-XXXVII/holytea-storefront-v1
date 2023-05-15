import {defer, type LoaderArgs} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {
  Hero,
  ProductSwimlane,
  FeaturedCollections,
  FeaturedArticles,
  SocialMedia,
  Testimonials,
} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import type {
  Article,
  ArticleConnection,
  Collection,
  CollectionConnection,
  Product,
  ProductConnection,
} from '@shopify/hydrogen/storefront-api-types';
import {AnalyticsPageType} from '@shopify/hydrogen';
import {routeHeaders, CACHE_SHORT} from '~/data/cache';
import {type CollectionHero} from '~/components/Hero';
import {type TestimonialData} from '~/components/Testimonials';

interface HomeSeoData {
  shop: {
    name: string;
    description: string;
  };
}

export const headers = routeHeaders;

export async function loader({params, context}: LoaderArgs) {
  const {language, country} = context.storefront.i18n;

  if (
    params.lang &&
    params.lang.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the lang URL param is defined, yet we still are on `EN-US`
    // the lang param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  const {shop, hero} = await context.storefront.query<{
    hero: CollectionHero;
    shop: HomeSeoData;
  }>(HOMEPAGE_SEO_QUERY, {
    variables: {handle: 'premium-loose-leaf-tea-box'},
  });

  const seo = seoPayload.home();

  return defer(
    {
      shop,
      primaryHero: hero,
      // These different queries are separated to illustrate how 3rd party content
      // fetching can be optimized for both above and below the fold.
      featuredProducts: context.storefront.query<{
        products: ProductConnection;
      }>(HOMEPAGE_FEATURED_PRODUCTS_QUERY, {
        variables: {
          /**
           * Country and language properties are automatically injected
           * into all queries. Passing them is unnecessary unless you
           * want to override them from the following default:
           */
          country,
          language,
        },
      }),
      featuredCollections: context.storefront.query<{
        collections: CollectionConnection;
      }>(FEATURED_COLLECTIONS_QUERY, {
        variables: {
          country,
          language,
        },
      }),
      featuredArticles: context.storefront.query<{
        blog: {
          articles: ArticleConnection;
        };
      }>(FEATURED_ARTICLES_QUERY, {
        variables: {
          country,
          language,
        },
      }),
      testimonials: context.storefront.query<TestimonialData>(
        TESTIMONIALS_QUERY,
        {
          variables: {
            country,
            language,
          },
        },
      ),
      analytics: {
        pageType: AnalyticsPageType.home,
      },
      seo,
    },
    {
      headers: {
        'Cache-Control': CACHE_SHORT,
      },
    },
  );
}

export default function Homepage() {
  const {
    primaryHero,
    featuredCollections,
    featuredProducts,
    featuredArticles,
    testimonials,
  } = useLoaderData<typeof loader>();

  // TODO: skeletons vs placeholders

  const skeletons = getHeroPlaceholder([{}, {}, {}]);

  return (
    <>
      {primaryHero && (
        <Hero {...primaryHero} height="full" top loading="eager" />
      )}

      {featuredProducts && (
        <Suspense>
          <Await resolve={featuredProducts}>
            {({products}) => {
              if (!products?.nodes) return <></>;
              return (
                <ProductSwimlane
                  products={products.nodes as Product[]}
                  title="Tea Blends - Crafted with Love"
                  tagline="Each of our loose-leaf tea blends carries a piece of our home. Carefully curated, they're more than just a refreshing beverage; they're an invitation to pause, savor and connect - with yourself and your loved ones. Experience the comforting embrace of our tea, just as we have over generations."
                  count={4}
                />
              );
            }}
          </Await>
        </Suspense>
      )}

      {featuredCollections && (
        <Suspense>
          <Await resolve={featuredCollections}>
            {({collections}) => {
              if (!collections?.nodes) return <></>;
              return (
                <FeaturedCollections
                  collections={collections.nodes as Collection[]}
                  title="Savor the Spectrum of Flavors with Tea!"
                  tagline="Each of our tea collections holds a unique bouquet of flavors and aromas, carefully crafted to engage your senses and nourish your soul. Explore the robust intensity of our Black Tea, the soothing calm of Green Tea, the earthy richness of Rooibos Tea, the fragrant diversity of Herbal Tea, the pure goodness of Organic Tea, the sun-kissed allure of Mediterranean Tea, the holistic embrace of Wellness Tea, the vibrant charm of Fruit Tea, the elegant subtlety of White Tea, or the refreshing zest of our Homemade Iced Tea. Whatever your preference, we have a blend to make your tea-time truly special."
                />
              );
            }}
          </Await>
        </Suspense>
      )}

      {featuredArticles && (
        <Suspense>
          <Await resolve={featuredArticles}>
            {({blog}) => {
              if (!blog?.articles?.nodes) return <></>;
              return (
                <FeaturedArticles
                  articles={blog.articles.nodes as Article[]}
                  title="Tea Wisdom - An Ode to a Timeless Tradition"
                  tagline="With Holy Tea, you're not just buying tea, you're inheriting a wealth of knowledge. Journey with us through the annals of tea history, uncover brewing secrets, and discover the soulful art of tea appreciation."
                />
              );
            }}
          </Await>
        </Suspense>
      )}

      {testimonials && (
        <Suspense>
          <Await resolve={testimonials}>
            {({metaobjects}) => {
              if (!metaobjects?.edges) return <></>;
              return (
                <Testimonials
                  testimonials={{
                    metaobjects: {
                      edges: metaobjects.edges.map((edge) => ({
                        node: edge.node,
                      })),
                    },
                  }}
                  title="Brewed with Love, Savored by Many!"
                  tagline="Journey with us through the voices of our satisfied customers and experience the love, tradition, and magic that brew in every cup of Holy Tea."
                />
              );
            }}
          </Await>
        </Suspense>
      )}

      {SocialMedia && (
        <SocialMedia
          facebook="https://www.facebook.com/holyteanl"
          twitter="https://twitter.com/holyteanl"
          instagram="https://www.instagram.com/holyteanl"
          youtube="https://www.youtube.com/@holyteanl"
          linkedin="https://www.linkedin.com/company/holyteanl"
          tiktok="https://www.tiktok.com/@holyteanl"
          pinterest="https://pinterest.com/holyteanl"
          headline="Join Our Tea Community"
          tagline="Connect, Share, and Celebrate with Fellow Tea Lovers on Our Social Media Platforms! Share your tea moments with us by tagging us @holyteanl or @holyteaamsterdam"
        />
      )}
    </>
  );
}

const COLLECTION_CONTENT_FRAGMENT = `#graphql 
  ${MEDIA_FRAGMENT}
  fragment CollectionContent on Collection {
    id
    handle
    title
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    }
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
`;

const HOMEPAGE_SEO_QUERY = `#graphql 
  ${COLLECTION_CONTENT_FRAGMENT}
  query collectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    shop {
      name
      description
    }
  }
`;

const COLLECTION_HERO_QUERY = `#graphql 
  ${COLLECTION_CONTENT_FRAGMENT}
  query collectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
  }
`;

// @see: https://shopify.dev/api/storefront/2023-04/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql 
  ${PRODUCT_CARD_FRAGMENT}
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

// @see: https://shopify.dev/api/storefront/2023-04/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql 
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 8 
      query:"title:'black tea' OR title:'green tea' OR title:'rooibos tea' OR title:'herbal tea' OR title:'organic tea' OR title:'mediterranean tea' OR title:'wellness tea' OR title:'fruit tea' OR title:'white tea' OR title:'iced tea'"
    ) {
      nodes {
        id
        title
        handle
        description
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;

// Add the featured articles query
const FEATURED_ARTICLES_QUERY = `#graphql
  query homepageFeaturedArticles($language: LanguageCode, $country: CountryCode) @inContext(language: $language, country: $country) {
    blog(handle: "journal") {
      articles(first: 4) {
        nodes {
          id
          title
          handle
          contentHtml
          image {
            altText
            width
            height
            url
          }
        }
      }
    }
  }
`;

const TESTIMONIALS_QUERY = `#graphql
  query testimonialCards($language: LanguageCode, $country: CountryCode) @inContext(language: $language, country: $country) {
    metaobjects(first: 3, type: "testimonials_card") {
      edges {
        node {
          fields {
            key
            value
          }
          field(key: "image") {
            value
            reference {
              ... on MediaImage {
                id
                image {
                  altText
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;
