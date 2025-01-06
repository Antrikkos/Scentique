export default {
    name: 'box',
    type: 'document',
    title: 'Gift Boxes',
    fields: [
        {
            name: 'name',
            title: 'Name of Gift Box',
            type: 'string',
        },
        {
            name: 'included',
            title: 'Included Products',
            of: [
                {
                    type: 'reference',
                    to: [
                        {type: 'productGroup'}
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
