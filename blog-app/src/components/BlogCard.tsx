import Link from "next/link";
import React, { FC } from "react";

interface Props {
  title: string;
  desc: string;
  slug: string;
}

const BlogCard: FC<Props> = ({ title, desc, slug }): JSX.Element => {
  return (
    <Link href={"/blogs/" + slug} className="block">
      <div className="bg-gray-50 p-4 border border-gray-500 rounded">
        <h1 className="text-2xl font-semibold">{title} </h1>
        <p className="text-gray-500 font-light">{desc}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
