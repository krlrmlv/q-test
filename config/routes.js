import { gql, GraphQLClient } from 'graphql-request'

export default async function () {
  const client = new GraphQLClient(process.env.API_LOCATION)

  const query = gql`
    query CatalogCategories {
      categories: ekfgroup_catalog_categories(
        where: { active: { _eq: true }, language: { code: { _eq: "ru" } } }
      ) {
        slug
      }
      products: ekfgroup_catalog_products(
        where: {
          language: { code: { _eq: "ru" } }
          show_by_link: { _eq: true }
        }
      ) {
        slug
      }
      articles: ekfgroup_catalog_articles(
        where: {
          category: { parent: { slug: { _eq: "news" } } }
          language: { code: { _eq: "ru" } }
        }
      ) {
        slug
      }
    }
  `
  const { categories, products, articles } = await client.request(query)

  return [
    ...categories.map((category) => `ru/catalog/${category.slug}`),
    ...products.map((product) => `ru/catalog/products/${product.slug}`),
    ...articles.map((article) => `ru/about/news/${article.slug}`),
  ]
}
