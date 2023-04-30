import {Image} from '@shopify/hydrogen';
import type {Article} from '@shopify/hydrogen/storefront-api-types';
import {Heading, Section, Grid, Link, Button} from '~/components';
import {truncateHtmlContent} from '~/lib/utils/truncateHtmlContent';

interface ExtendedArticle extends Article {
  contentHtml: string;
}
interface FeaturedArticlesProps {
  articles: ExtendedArticle[];
  title?: string;
  tagline?: string;
  [key: string]: any;
}

export function FeaturedArticles({
  articles,
  title = 'Featured Articles',
  tagline,
  ...props
}: FeaturedArticlesProps) {
  const haveArticles = articles && articles.length > 0;
  if (!haveArticles) return null;

  const items = articles.filter((item) => item.image).length;

  return (
    <Section {...props} heading={title}>
      {tagline && (
        <p className="text-left text-xl md:text-2xl max-w-7xl text-primary/80 mb-4">
          {tagline}
        </p>
      )}
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
                <div
                  className="prose prose-lg text-primary"
                  dangerouslySetInnerHTML={{
                    __html: truncateHtmlContent(article.contentHtml, 30), // Limit to 20 words
                  }}
                />
              </div>
            </Link>
          );
        })}
      </Grid>
      <div className="flex justify-center mt-6">
        <Button as={Link} to="/journal" variant="secondary">
          View All Articles
        </Button>
      </div>
    </Section>
  );
}
