export default {
    name: 'category',
    type: 'document',
    title: 'Categories',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title'
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'coverImage',
            type: 'customImage',
            title: 'Cover Image'
        },
        {
            name: 'description',
            type: 'bodyText',
            title: 'Description',
        }
    ],
    preview: {
        select: {
            title: 'title',
            image: 'coverImage',
            slug: 'slug'
        },
        prepare: ({ title, image, slug }: any) => {
            return {
                title: title,
                media: image,
                subtitle: slug.current
            }
        }
    }
}
