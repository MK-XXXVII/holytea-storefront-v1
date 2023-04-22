import {Image} from '@shopify/hydrogen';
import type {Article} from '@shopify/hydrogen/storefront-api-types';
import {Heading, Section, Grid, Link} from '~/components';

interface FeaturedArticlesProps {
  articles: Article[];
  title?: string;
  [key: string]: any;
}

export function FeaturedArticles({
  articles,
  title = 'Featured Articles',
  ...props
}: FeaturedArticlesProps) {
  const haveArticles = articles && articles.length > 0;
  if (!haveArticles) return null;

  const items = articles.filter((item) => item.image).length;

  return (
    <Section {...props} heading={title} className="bg-[#BEBFEA]">
      <Grid items={items}>
        {articles.map((article) => {
          if (!article?.image) {
            return null;
          }
          return (
            <Link key={article.id} to={`/journal/${article.handle}`}>
              <div className="grid gap-4">
                <div className="card-image bg-primary/5 aspect-[4/2]">
                  {article?.image && (
                    <Image
                      alt={`Image of ${article.title}`}
                      data={article.image}
                      sizes="(max-width: 32em) 100vw, 33vw"
                      aspectRatio="4/2"
                    />
                  )}
                </div>
                <Heading size="copy">{article.title}</Heading>
              </div>
            </Link>
          );
        })}
      </Grid>
    </Section>
  );
}
