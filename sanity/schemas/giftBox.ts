export default {
  name: 'gift-box',
  type: 'document',
  title: 'Gift Box',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of Gift Box',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Gift Box Images',
      of: [{type: 'image'}],
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description of Gift Box',
    },
    {
      name: 'product1',
      type: 'array',
      title: 'Gift product 1',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'product'}
          ]
        }
      ],
    },
    {
      name: 'product2',
      type: 'array',
      title: 'Gift product 2',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'product'}
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
      name: 'price_id',
      title: 'Stripe Price ID',
      type: 'string',
    },
  ],
}
