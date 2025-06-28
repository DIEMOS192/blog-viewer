import Link from "next/link";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default async function PostsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache",
  });
  const posts: Post[] = await res.json();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded hover:shadow">
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                {post.title}
              </h2>
              <p className="text-gray-700">{post.body.slice(0, 100)}...</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
