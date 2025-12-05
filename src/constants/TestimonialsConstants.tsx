type ProjectType = {
    name: string;
    url?: string;
}

type TestimonialType = {
    body: string;
    author: string;
    company: string;
    position?: string;
    imageUrl: string;
    clientUrl?: string;
    projects?: ProjectType[];
}

export const TestimonialsConstants: TestimonialType[] = [
    {
        body: "Hi i am NiQ, CEO of Blyt and i would love to have a meaningful testimonial dedicated to this young talented man here, his name is Priyal! \n\n" +
            "He has been responsible and attentive tbroughout the project, always giving me and my team extra values and insights, never calculative and always helping whenever needed. \n\n" +
            "Double thumbs up to your professionalism and thank you so much for the help overall, very much appreciated! \n\n" +
            "Keep it up, and see you at the Top!",
        author: "NiQ Chong",
        company: "Blyt",
        position: "CEO",
        imageUrl: "/images/TestimonialsImagefs/NiqChong1.jpg",
        clientUrl: "https://www.linkedin.com/in/niqchong",
        projects: [{ name: "Blyt", url: "https://blyt.world" }],
    },
    {
        body: "I had a wonderful experience working with Priyal for our website nativlang.in. He understands our requirements very quickly and always suggests the best solutions. He is extremely fast with delivery and maintains great quality in his work. His professionalism and commitment made the entire process smooth and hassle-free. Highly recommended for anyone looking for a reliable and efficient website developer!",
        author: "Purvi Teckwani",
        company: "",
        position: "",
        imageUrl: "/images/TestimonialsImagefs/PurviTeckwani1.png",
        clientUrl: "https://in.linkedin.com/in/purvi-teckwani-543a02125",
        projects: [{ name: "NativLang", url: "https://www.nativlang.in" }],
    },
    {
        body: "Raj was a great help at setting up my Wiki-IMDB pages. He’s incredibly responsive and professional. Highly recommend his services for anything relating to website and profile design. ",
        author: "Tanishq Kaura",
        company: "Boys Played Well",
        position: "Founder",
        imageUrl: "/images/TestimonialsImagefs/TanishqKaura1.jpeg",
        clientUrl: "https://in.linkedin.com/in/tanishq-kaura-ab3358268",
        projects: [
            { name: "Boys Played Well", url: "https://boysplayedwell.in" },
            { name: "IMDb page", url: "https://www.imdb.com/name/nm7858569" }
        ],
    },
    {
        body: "We have worked with Priyal on multiple projects and his understanding of the space is brilliant. He is a solution getter which is key in such a dynamic space and has always been very responsive and prompt. I would recommend Priyal to anyone looking for a reliable website partner.",
        author: "Siddharth Nair",
        company: "Bravas Digital",
        position: "CEO",
        imageUrl: "/images/TestimonialsImagefs/SiddharthNair1.jpeg",
        clientUrl: "https://www.linkedin.com/in/siddharth-nair-b30a3413b/",
        projects: [{ name: "Bravas Digital", url: "https://bravos-11.vercel.app/" }],
    },
    {
        body: "Your work on Modaro Health was outstanding! Skilled, fast, and reliable—you delivered on time and at a fair price. Truly appreciate your execution. Highly recommend you! Looking forward to working again.",
        author: "Ankur Morbale",
        company: "Modaro Health",
        position: "Founder & CEO",
        imageUrl: "/images/TestimonialsImagefs/AnkurMorbale1.jpeg",
        clientUrl: "https://www.linkedin.com/in/ankurmorbale",
        projects: [{ name: "Modaro Health", url: "https://modarohealth.com" }],
    },
    {
        body: "The project was completed in the given time with proper and friendly support.",
        author: "Parth Panjwani",
        company: "",
        position: "",
        imageUrl: "/images/TestimonialsImagefs/ParthPanjwani1.jpeg",
        clientUrl: "https://www.linkedin.com/in/parth-panjwani",
        projects: [{ name: "Pet Welfare App", url: "https://pet-guard.vercel.app" }],
    },
];