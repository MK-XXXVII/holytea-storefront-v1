import {Image} from '@shopify/hydrogen';
import type {Article} from '@shopify/hydrogen/storefront-api-types';
import {Heading, Section, Grid, Link} from '~/components';

interface ExtendedArticle extends Article {
  contentHtml: string;
}

interface FeaturedArticlesProps {
  articles: ExtendedArticle[];
  title?: string;
  tagline?: string;
  [key: string]: any;
}

function truncateHtmlContent(content: string, maxWords: number): string {
  const strippedText = content.replace(/(<([^>]+)>)/gi, '');
  const words = strippedText.split(/\s+/);
  const truncatedWords = words.slice(0, maxWords).join(' ');

  return truncatedWords + (words.length > maxWords ? '...' : '');
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
    <Section {...props} heading={title} className="bg-[#BEBFEA]">
      {tagline && (
        <text className="text-left text-xl md:text-3xl text-primary/80 mb-4">
          {tagline}
        </text>
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
    </Section>
  );
}
