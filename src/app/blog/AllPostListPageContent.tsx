"use client";

import { simpleBlogCard } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback, useEffect, useState } from "react";

// Responsive container widths
const maxWidthCSS = "2xl:max-w-[1440px] xl:max-w-screen-xl lg:max-w-[1155px] md:max-w-4xl max-w-2xl";

// Number of posts to load per page
const POSTS_PER_PAGE = 6;

// For storing post views
type PostViews = { [key: string]: number };

// Utility function to fetch post views in batch
async function fetchPostViews(posts: simpleBlogCard[]): Promise<PostViews> {
    try {
        const blogIds = posts.map(post => post.currentSlug);
        const response = await fetch('/api/blog-views', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blogIds })
        });

        const result = await response.json();

        if (result.success) {
            return result.data;
        } else {
            console.error('Failed to fetch blog views:', result.error);
            // Return default views (0) for all posts if API fails
            const defaultViews: PostViews = {};
            blogIds.forEach(id => {
                defaultViews[id] = 0;
            });
            return defaultViews;
        }
    } catch (error) {
        console.error('Error fetching blog views:', error);
        // Return default views (0) for all posts if fetch fails
        const defaultViews: PostViews = {};
        posts.forEach(post => {
            defaultViews[post.currentSlug] = 0;
        });
        return defaultViews;
    }
}

export default function AllPostListPageContent() {
    const [data, setData] = useState<simpleBlogCard[]>([]);
    const [postViews, setPostViews] = useState<PostViews>({});
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Fetch posts for a given page
    const fetchData = useCallback(async (page: number) => {
        setIsLoading(true);
        const start = page * POSTS_PER_PAGE;

        try {
            const response = await fetch(`/api/blog?start=${start}&limit=${POSTS_PER_PAGE}`);
            const result = await response.json();

            if (result.success) {
                const newData = result.data;

                // Merge with existing data, avoiding duplicates
                setData((prev) => {
                    const uniqueNewData = newData.filter((post: { currentSlug: string; }) => !prev.some((p) => p.currentSlug === post.currentSlug));
                    return [...prev, ...uniqueNewData];
                });

                // Fetch post views for these new posts
                fetchPostViews(newData)
                    .then((newPostViews) => { setPostViews((prevViews) => ({ ...prevViews, ...newPostViews })); })
                    .catch((error) => { console.error("Error updating post views:", error); });

                // If fewer than POSTS_PER_PAGE returned, we've reached the end
                if (newData.length < POSTS_PER_PAGE) { setHasMore(false); }
            } else {
                console.error('Failed to fetch blog posts:', result.error);
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }

        setIsLoading(false);
    }, []);

    // Trigger data fetch whenever currentPage changes
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, fetchData]);

    // Intersection Observer for infinite scrolling
    const observer = useRef<IntersectionObserver | null>(null);
    const lastPostElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (isLoading || !hasMore) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) { setCurrentPage((prevPage) => prevPage + 1); }
            });

            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    return (
        <>
            {/* Page Heading */}
            <div className={`text-white text-center mt-10 ${maxWidthCSS} mx-auto px-4`}>
                <h1 className="text-4xl font-bold">Priyal Raj&apos;s Code &amp; Curiosities</h1>
                <h2 className="font-medium mt-2">
                    Coding, Tools, and a Bit of Fun with Gaming &amp; Food
                </h2>
            </div>

            {/* Posts Grid */}
            <section className={`grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 ${maxWidthCSS} mx-auto px-4 xl:gap-10 gap-6 py-10`}>
                {data.map((post, idx) => {
                    const isLast = idx === data.length - 1;
                    return (
                        <article ref={isLast ? lastPostElementRef : null} key={post.currentSlug} className="bg-[#151515] rounded-md group flex flex-col border-2 border-white hover:border-reddish defaultTransitionCSS">
                            <Link href={`/article/${post.currentSlug}`}>
                                {/* Image Section */}
                                <div className="relative overflow-hidden rounded-t-md">
                                    <Image src={urlFor(post.coverImage).url()} alt={post.title} width={500} height={500} className=" w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-md" />
                                </div>

                                {/* Content Section */}
                                <div className="px-4 py-4 flex flex-col flex-grow">
                                    {/* Title can expand, but let's limit to ~4 lines for uniformity */}
                                    <h3 className=" font-bold text-xl text-white mb-2 leading-tight h-[75px]">
                                        {post.title}
                                    </h3>

                                    {/* Excerpt truncated to 2 lines */}
                                    <div className="text-sm text-white/60 leading-snug">
                                        <PortableText value={post.excerpt} />
                                    </div>

                                    {/* Meta Info (Date, Read Time, Views) at bottom */}
                                    <div className="mt-auto flex items-center justify-between text-sm pt-4">
                                        <div className="text-white/60">
                                            {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric", })}
                                            <span> | </span>
                                            {post.readTimeOfTheBlog} read
                                        </div>
                                        <div className="flex items-center gap-2 text-white/80">
                                            <Image width={25} height={25} src="https://img.icons8.com/?size=100&id=986&format=png&color=FFFFFF" alt="Views icon" />
                                            <p className="font-bold">
                                                {postViews[post.currentSlug] !== undefined ? postViews[post.currentSlug] : "Loading..."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    );
                })}
            </section>

            {/* Loading Indicator */}
            {isLoading && (<p className="text-center md:text-3xl text-2xl pb-10 text-white"> Loading... </p>)}

            {/* End of Posts Indicator */}
            {!hasMore && (
                <div className={`text-center md:text-3xl sm:text-2xl text-lg pb-10 ${maxWidthCSS} mx-auto px-4 text-white`}>
                    <p>That&apos;s all for now, more coming soon!</p>
                </div>
            )}
        </>
    );
}