import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import fs from "fs";
import path from "path";
import React from "react";
import matter from "gray-matter";
import { ParsedUrlQuery } from "querystring";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import NotFound from "./404";

export const getStaticPaths: GetStaticPaths = () => {
  // Read paths
  const dirPathToRead = path.join(process.cwd(), "posts");
  const dirs = fs.readdirSync(dirPathToRead);
  const paths = dirs.map((filename) => {
    const filePathToRead = path.join(process.cwd(), "posts/" + filename);
    const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" });
    // send paths to static props (context)
    return { params: { postSlug: matter(fileContent).data.slug } };
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
};

interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

type Post = {
  post: {
    title: string;
    content: MDXRemoteSerializeResult;
  };
};
export const getStaticProps: GetStaticProps<Post> = async (context) => {
  try {
    const { params } = context;
    const { postSlug } = params as IStaticProps;

    const filePathToRead = path.join(
      process.cwd(),
      "posts/" + postSlug + ".md"
    );
    const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" });
    const source: any = await serialize(fileContent, {
      parseFrontmatter: true,
    });

    // Send props to tsx
    return {
      props: { post: { content: source, title: source.frontmatter.title } },
    };
  } catch (error) {
    return { notFound: true };
  }
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = ({ post }) => {
  return (
    <div className="max-w-2xl mx-auto my-4">
      <h1 className="font-semibold text-3xl mb-4 mt-10">{post.title}</h1>
      <div className="prose prose-gray">
        <MDXRemote {...post.content}></MDXRemote>
      </div>
    </div>
  );
};

export default SinglePage;
