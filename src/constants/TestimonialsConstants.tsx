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
        body: "Your work on Modaro Health was outstanding! Skilled, fast, and reliable—you delivered on time and at a fair price. Truly appreciate your execution. Highly recommend you! Looking forward to working again.",
        author: "Ankur Morbale",
        company: "Modaro Health",
        position: "Founder & CEO",
        imageUrl: "/images/TestimonialsImagefs/AnkurMorbale1.jpeg",
        clientUrl: "https://www.linkedin.com/in/ankurmorbale",
        projects: [{ name: "Modaro Health", url: "https://modarohealth.com" }],
    },
    {
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        author: "Siddharth Nair",
        company: "Bravas Digital",
        position: "CEO",
        imageUrl: "/images/TestimonialsImagefs/SiddharthNair1.jpeg",
        clientUrl: "https://www.linkedin.com/in/siddharth-nair-b30a3413b/",
        projects: [{ name: "Bravas Digital", url: "https://www.bravasdigital.com" }],
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
        body: "The project was completed in the given time with proper and friendly support.",
        author: "Parth Panjwani",
        company: "",
        position: "",
        imageUrl: "/images/TestimonialsImagefs/ParthPanjwani1.jpeg",
        clientUrl: "https://www.linkedin.com/in/parth-panjwani",
        projects: [{ name: "Pet Welfare App", url: "https://pet-guard.vercel.app" }],
    },
];