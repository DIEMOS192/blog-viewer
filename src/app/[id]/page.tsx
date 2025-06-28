import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>; // params is now a Promise
}

//  Correct usage of generateMetadata in Next.js 15
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return {
    title: post.title,
    description: post.body.slice(0, 80),
  };
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-4">Post ID: {id}</p>
        <div className="prose prose-lg">
          <p>{post.body}</p>
        </div>
      </article>
    </div>
  );
}
