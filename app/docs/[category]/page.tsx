import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { DocContent } from '@/components/DocContent';
import { docsCategories } from '@/lib/docs-data';

type Props = {
  params: Promise<{ category: string }>;
};

// Generate static params for all doc categories
export async function generateStaticParams() {
  return docsCategories.map((category) => ({
    category: category.id,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryData = docsCategories.find((c) => c.id === category);

  if (!categoryData) {
    return {
      title: 'Documentation Not Found',
    };
  }

  return {
    title: `${categoryData.title} | Matt M. Developer Docs`,
    description: categoryData.description,
  };
}

export default async function DocCategoryPage({ params }: Props) {
  const { category } = await params;

  // Find category data
  const categoryData = docsCategories.find((c) => c.id === category);

  if (!categoryData) {
    notFound();
  }

  // Map category ID to markdown filename
  const filenameMap: Record<string, string> = {
    'tui-tools': 'tui-tools.md',
    'ai-apis': 'ai-apis.md',
    'browser-apis': 'browser-apis.md',
    'terminal-apis': 'terminal-apis.md',
  };

  const filename = filenameMap[category];

  if (!filename) {
    notFound();
  }

  // Read markdown file
  const docsDirectory = path.join(process.cwd(), 'docs');
  const filePath = path.join(docsDirectory, filename);

  let content: string;
  try {
    content = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    notFound();
  }

  return (
    <DocContent
      category={categoryData}
      content={content}
    />
  );
}
