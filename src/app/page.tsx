import Image from 'next/image';
import { type SanityDocument } from 'next-sanity';

import { client } from '@/sanity/client';

// Define an interface for image dimensions
interface ImageDimensions {
  width: number;
  height: number;
}

// Define an interface for image metadata
interface ImageMetadata {
  dimensions: ImageDimensions;
}

// Update the interface for the image asset to include metadata
interface ImageAsset {
  url: string;
  metadata?: ImageMetadata; // Make metadata optional in case it's missing
}

// Define an interface for the image object
interface ProjectImage {
  asset?: ImageAsset;
}

// Define an interface for the project document, including the new fields
interface Project extends SanityDocument {
  title?: string;
  description?: string;
  images?: ProjectImage[];
}

// Update the query to fetch image metadata (dimensions)
const PROJECTS_QUERY = `*[
  _type == "project"
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  description,
  images[]{asset->{url, metadata{dimensions}}}
}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  // Use the Project interface for the fetched data
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);
  return (
    <main className=''>
      <h1 className='text-4xl mb-8'>Projects</h1>
      <ul className='flex flex-col gap-y-4'>
        {projects.map((project) => (
          <li className='' key={project._id}>
            <h2 className='text-7xl mb-2'>{project.title}</h2>
            {project.description && <p className='mb-2 max-w-[800px]'>{project.description}</p>}
            {project.images && (
              <div className='flex gap-2 flex-wrap'>
                {project.images.map((image: ProjectImage, index: number) => {
                  // Check if asset, url, metadata and dimensions exist
                  const imageUrl = image.asset?.url;
                  const imageWidth = image.asset?.metadata?.dimensions?.width;
                  const imageHeight = image.asset?.metadata?.dimensions?.height;

                  // Only render the image if we have the URL and dimensions
                  if (imageUrl && imageWidth && imageHeight) {
                    return (
                      <Image
                        key={index}
                        src={imageUrl}
                        alt={project.title || 'Project image'}
                        width={imageWidth} // Use dynamic width
                        height={imageHeight} // Use dynamic height
                        className='object-cover max-h-[500px] w-auto rounded-2xl'
                        // Optional: Add sizes prop for responsive optimization
                        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    );
                  }
                  return null; // Don't render if data is incomplete
                })}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
