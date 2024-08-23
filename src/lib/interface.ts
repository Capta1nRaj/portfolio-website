export interface simpleBlogCard {
    title: string,
    excerpt: {
        _type: string;
        _key: string;
        text: string;
        marks: string[];
    }[];
    currentSlug: string,
    coverImage: string,
    readTimeOfTheBlog: string,
    publishedAt: Date,
}

export interface fullBlog {
    currentSlug: string,
    title: string,
    content: any,
    titleImage: string
}