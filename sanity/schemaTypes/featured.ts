export default {
    name: 'features',
    type: 'document',
    title: 'Featured',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title'
        },
        {
            name: 'blog',
            type: 'array',
            title: 'Featured Blogs',
            of: [{ type: 'reference', to: [{ type: 'blog' }] }],
            validation: (Rule: any) => [
                Rule.unique().error("Every Item should be unique!"),
                Rule.required().error("Title is required!")
            ]
        },
        {
            name: 'categories',
            type: 'array',
            title: 'Featured Categories',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
            validation: (Rule: any) => [
                Rule.unique().error("Every Item should be unique!"),
                Rule.required().error("Title is required!")
            ]
        },
    ],
}
