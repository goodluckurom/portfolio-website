import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { BlogEditorClient } from './BlogEditorClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditBlogPage({ params }: PageProps) {
  if (!params.id) {
    notFound();
  }

  const blog = await prisma.blog.findUnique({
    where: { id: params.id },
  });

  if (!blog) {
    notFound();
  }

  // Ensure dates are serialized properly
  const serializedBlog = {
    ...blog,
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  };

  const handleSave = async (data: any) => {
    try {
      await prisma.blog.update({
        where: { id: params.id },
        data: {
          ...data,
          tags: data.tags.join(','),
        },
      });
      // Redirect or show success toast
    } catch (error) {
      // Handle error
      console.error('Failed to update blog', error);
    }
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
          <p className="text-muted-foreground">
            Make changes to your blog post and save when you're done.
          </p>
        </div>
        <BlogEditorClient blog={serializedBlog} />
      </div>
    </div>
  );
}