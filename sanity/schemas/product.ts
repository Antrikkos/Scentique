export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of Product',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Product Images',
      of: [{type: 'image'}],
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description of product',
    },
    {
      name: 'colors',
      type: 'array',
      title: 'Candle Colors',
      of: [{type: 'string'}],
    },
    {
      name: 'scents',
      type: 'array',
      title: 'Candle Scents',
      of: [
        {
          type: 'reference',
          to: [
              {type: 'scents'}
          ]
        }
      ],
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Product Slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [
        {
          type: 'category',
        },
      ],
    },
    {
      name: 'price_id',
      title: 'Stripe Price ID',
      type: 'string',
    },
  ],
}
