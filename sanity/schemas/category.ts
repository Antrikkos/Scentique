export default {
  name: 'category',
  type: 'document',
  title: 'Categories',
  fields: [
    {
      name: 'name',
      title: 'Name of Category',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Category Slug',
      options: {
        source: 'name',
        slugify: input => input
            .replace(/\s+/g, '-')
            .slice(0, 200)
      },
    }
  ],
}
