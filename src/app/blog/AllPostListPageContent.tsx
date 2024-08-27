'use client';

import FooterLayout from '@/layouts/FooterLayout/FooterLayout';
import GetInTouch from '@/layouts/GetInTouch/GetInTouch';
import NavBar from '@/layouts/NavBarLayout/NavBar';
import { simpleBlogCard } from '@/lib/interface';
import { urlFor } from '@/lib/sanity';
import { GetHomepagePost } from '@/server/GetHomepagePost';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useCallback, useEffect, useState } from 'react';
import { FetchEachBlogPostViews } from './FetchEachBlogPostViews';

const maxWidthCSS = '2xl:max-w-[1440px] xl:max-w-screen-xl lg:max-w-[1155px] md:max-w-4xl max-w-2xl';

const POSTS_PER_PAGE = 6;

type PostViews = { [key: string]: number };

// Fetch post views function without await
function fetchPostViews(posts: simpleBlogCard[]): Promise<PostViews> {
    const views: PostViews = {};
    const fetchPromises = posts.map(post =>
        FetchEachBlogPostViews(post.currentSlug)
            .then(({ postViews }) => { views[post.currentSlug] = postViews; })
            // Default value if fetching fails
            .catch(error => { console.error(`Error fetching views for ${post.currentSlug}:`, error); views[post.currentSlug] = 0; })
    );

    return Promise.all(fetchPromises).then(() => views);
}

export default function AllPostListPageContent() {
    const [data, setData] = useState<simpleBlogCard[]>([]);
    const [postViews, setPostViews] = useState<PostViews>({});
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchData = useCallback(async (page: number) => {
        setIsLoading(true);
        const start = page * POSTS_PER_PAGE;
        const newData = await GetHomepagePost(start, POSTS_PER_PAGE);

        setData((prevData) => {
            const uniqueNewData = newData.filter(
                (newPost: simpleBlogCard) => !prevData.some((prevPost) => prevPost.currentSlug === newPost.currentSlug)
            );
            return [...prevData, ...uniqueNewData];
        });

        // Fetch views after the data has been set
        fetchPostViews(newData)
            .then((newPostViews) => {
                setPostViews((prevViews) => ({ ...prevViews, ...newPostViews }));
            })
            .catch((error) => {
                console.error("Error updating post views:", error);
            });

        setIsLoading(false);
        if (newData.length < POSTS_PER_PAGE) {
            setHasMore(false);
        }
    }, []);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, fetchData]);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastPostElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (isLoading || !hasMore) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setCurrentPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    return (
        <>
            <NavBar />

            <div className={`text-white text-center mt-10 ${maxWidthCSS} mx-auto px-4`}>
                <h1 className="text-4xl font-bold"> Priyal Raj&#39;s Code & Curiosities </h1>
                <h2 className="font-medium"> Coding, Tools, and a Bit of Fun with Gaming & Food </h2>
            </div>

            <section className={`grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 ${maxWidthCSS} mx-auto px-4 xl:gap-10 gap-4 py-10`}>
                {data.map((post, idx) => (
                    <section ref={idx === data.length - 1 ? lastPostElementRef : null} key={post.currentSlug} className="mx-auto rounded-md relative bg-[#151515] drop-shadow-[4px_4px_2px_rgba(255,255,255,0.50)] group">
                        <Link href={`/article/${post.currentSlug}`}>
                            <div className="overflow-hidden">
                                <Image
                                    src={urlFor(post.coverImage).url()}
                                    alt={post.title}
                                    width={500}
                                    height={500}
                                    className="rounded-t-md h-[250px] object-cover w-full group-hover:scale-105 defaultTransitionCSS"
                                />
                            </div>

                            <h3 className="mt-4 px-4 font-bold text-2xl text-white h-24">{post.title}</h3>

                            <div className="mt-4 px-4 text-sm text-white/50 line-clamp-3">
                                <PortableText value={post.excerpt} />
                            </div>

                            <div className="mt-4 pb-4 px-4 text-sm flex items-center justify-between">
                                <div className="left-side">
                                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                    <span> | </span>
                                    {post.readTimeOfTheBlog} read
                                </div>

                                <div className="right-side flex items-center gap-x-2">
                                    <Image width={25} height={25} src="https://img.icons8.com/?size=100&id=986&format=png&color=FFFFFF" alt="" />
                                    <p className="font-bold">
                                        {postViews[post.currentSlug] !== undefined ? postViews[post.currentSlug] : 'Loading...'}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </section>
                ))}
            </section>

            {isLoading && <p className="text-center md:text-3xl text-2xl pb-10">Loading...</p>}

            {!hasMore && (
                <div className={`text-center md:text-3xl sm:text-2xl text-lg pb-10 ${maxWidthCSS} mx-auto px-4`}>
                    <p>That&#39;s all for now, more coming soon!</p>
                </div>
            )}

            <GetInTouch />

            <FooterLayout />
        </>
    );
}