import Link from "next/link";
import React, { FC } from "react";

interface Props {
  title: string;
  desc: string;
  slug: string;
}

const BlogCard: FC<Props> = ({ title, desc, slug }): JSX.Element => {
  return (
    <div className="block">
      <div className="flex flex-col p-4 border border-gray-500 rounded-md ">
        <h1 className="text-2xl font-semibold">{title} </h1>
        <p className="text-gray-500 font-light">{desc}</p>
        <Link href={"/" + slug} className="ml-auto my-1">
          <button className=" border border-gray-500 rounded-md p-2 hover:bg-gray-100">
            Read more
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
