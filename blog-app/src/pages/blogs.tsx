import BlogCard from "@/components/BlogCard";
import { NextPage } from "next";
import React from "react";

interface Props {}

const Blogs: NextPage<Props> = () => {
  return (
    <div className="max-w-3xl mx-auto p-5 space-y-5">
      <BlogCard
        title="This is my blogs"
        desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil quisquam,
      consectetur perspiciatis vel sed quos earum ea nostrum sint obcaecati?
      Dolore vero voluptatibus, optio in provident aliquid dicta. Porro,
      architecto!"
      ></BlogCard>
      <BlogCard
        title="This is my blogs"
        desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil quisquam,
      consectetur perspiciatis vel sed quos earum ea nostrum sint obcaecati?
      Dolore vero voluptatibus, optio in provident aliquid dicta. Porro,
      architecto!"
      ></BlogCard>
      <BlogCard
        title="This is my blogs"
        desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil quisquam,
      consectetur perspiciatis vel sed quos earum ea nostrum sint obcaecati?
      Dolore vero voluptatibus, optio in provident aliquid dicta. Porro,
      architecto!"
      ></BlogCard>
    </div>
  );
};

export default Blogs;
