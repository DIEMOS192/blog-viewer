import { Metadata } from "next";

interface Post {
  id: number;
  title: string;
  body: string;
}

type Props = {
  params: { id: string };
};


export async function generateMetadata({
  params,
}: Awaited<Props>): Promise<Metadata> {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    { cache: "force-cache" }
  ).then((res) => res.json());

  return {
    title: post.title,
    description: post.body.slice(0, 100),
  };
}

export default async function PostPage({ params }: Props) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    { cache: "force-cache" }
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
}
