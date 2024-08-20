export default {
    name: "customImage",
    title: "image",
    type: "image",
    options: {
        hotspot: true
    },
    fields: [
        {
            name: "alt",
            type: "string",
            title: "Alt Text",
            validation: (Rule: any) => Rule.required().error("Alt text is required!"),
            options: {
                isHighlighted: true
            }
        }
    ]
}