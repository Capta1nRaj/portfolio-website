export default {
    name: "customCode",
    title: "Code",
    type: "object",
    fields: [
        {
            name: "code",
            title: "Code",
            type: "code",
        },
        {
            name: "language",
            title: "Language",
            type: "string",
        },
    ],
    preview: {
        select: {
            title: "code.code"
        },
    },
}