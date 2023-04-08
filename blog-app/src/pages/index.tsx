import BlogCard from "@/components/BlogCard";
import { PostApiResponse } from "@/utils/types";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import React from "react";
import { readPostsInfo } from "../lib/helper";

export const getStaticProps = async () => {
  const postInfo: PostApiResponse = readPostsInfo();
  return {
    props: { posts: postInfo },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Blogs: NextPage<Props> = ({ posts }) => {
  return (
    <div className="max-w-2xl mx-auto my-4 space-y-5 h-screen">
      {posts.map((post) => (
        <BlogCard
          key={post.slug}
          title={post.title}
          desc={post.meta}
          slug={post.slug}
        ></BlogCard>
      ))}
    </div>
  );
};

export default Blogs;
