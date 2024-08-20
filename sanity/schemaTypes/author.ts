export default {
    name: 'author',
    type: 'document',
    title: 'Authors',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name',
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug of your blog article',
            options: {
                source: 'name'
            }
        },
        {
            name: 'profileimage',
            type: 'customImage',
            title: 'Profile Image'
        },
        {
            name: 'bio',
            type: 'array',
            title: 'Bio',
            of: [
                {
                    type: 'block',
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'name',
            image: 'profileimage',
        },
        prepare({ title, image, slug }: any) {
            return {
                title: title,
                media: image,
            };
        },
    },
}
