export default {
    name: "excerptText",
    title: "Excerpt Text",
    type: "array",
    of: [
        {
            title: 'Block',
            type: 'block',
            styles: [{ title: 'Normal', value: 'normal' }],
            lists: [],
            marks: {
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' }
                ],
                annotations: [
                    {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                            {
                                name: 'href',
                                type: 'url',
                                title: 'URL'
                            }
                        ]
                    }
                ]
            }
        }
    ]
}