import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection(
    'articles',
    ({ data }) => data.draft !== true
  );

  const publishedArticles = articles.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Mohamed Usman',
    description: 'Thoughts, reflections and lessons about life.',
    site: context.site,

    items: publishedArticles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: `/articles/${article.id}/`,
    })),
  });
}
