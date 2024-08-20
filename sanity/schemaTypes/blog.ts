export default {
    name: 'blog',
    type: 'document',
    title: 'Blog Posts',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title of the blog',
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug of your blog article',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'category',
            type: 'array',
            title: 'Category of the blog',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
            validation: (Rule: any) => [
                Rule.unique().error("Every Item should be unique!"),
            ]
        },
        {
            name: 'publishedAt',
            type: 'datetime',
            title: 'Published at',
        },
        {
            name: 'author',
            type: 'reference',
            title: 'Author of the blog',
            to: [{ type: 'author' }]
        },
        {
            name: 'readTimeOfTheBlog',
            type: 'string',
            title: 'Read time of the blog',
        },
        {
            name: 'coverImage',
            type: 'customImage',
            title: 'Cover Image'
        },
        {
            name: 'excerpt',
            type: 'excerptText',
            title: 'Excerpt of the Blog',
        },
        {
            name: 'content',
            type: 'bodyText',
            title: 'Content of the Blog',
        },
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            image: 'coverImage',
            publishedAt: 'publishedAt'
        },
        prepare({ title, image, publishedAt }: any) {
            return {
                title: title,
                media: image,
                subtitle: publishedAt ? new Date(publishedAt).toLocaleString("en-US") : ""
            };
        },
    },
}
