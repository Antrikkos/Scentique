
export default {
    name: 'group',
    type: 'document',
    title: 'Product Group',
    of: [
        {
            type: 'reference',
            to: [
                {type: 'product'}
            ]
        }
    ],
}
