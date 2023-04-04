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
    fallback: false,
  };
};

interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

type Post = {
  post: {
    title: string;
    content: string;
  };
};
export const getStaticProps: GetStaticProps<Post> = (context) => {
  const { params } = context;
  const { postSlug } = params as IStaticProps;

  const filePathToRead = path.join(process.cwd(), "posts/" + postSlug + ".md");
  const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" });
  const { content, data } = matter(fileContent);

  // Send props to tsx
  return {
    props: { post: { content, title: data.title } },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default SinglePage;
