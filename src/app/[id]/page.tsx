import { Metadata } from "next";
import { type FC } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

//  Fix: constrain the expected prop type to the correct Next.js type
type PageProps = {
  params: { id: string };
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    { cache: "force-cache" }
  ).then((res) => res.json());

  return {
    title: post.title,
    description: post.body.slice(0, 100),
  };
};

const PostPage: FC<PageProps> = async ({ params }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    return <div className="p-4 text-red-600">Failed to load post.</div>;
  }

  const post: Post = await res.json();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 leading-relaxed">{post.body}</p>
    </div>
  );
};

export default PostPage;
