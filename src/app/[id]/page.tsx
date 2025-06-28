import type { Metadata } from "next";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ id: string }>; // params is now a Promise
}

//  Correct usage of generateMetadata in Next.js 15
export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return {
    title: post.title,
    description: post.body.slice(0, 80),
  };
}

export default async function PostLayout({ children }: Awaited<LayoutProps>) {
  return <div>{children}</div>;
}
