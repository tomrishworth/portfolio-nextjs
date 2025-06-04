import { type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/client';
import ProjectCard from '../components/ProjectCard';
import Hero from '../components/Hero';
import ScrollToTopButton from '../components/ScrollToTopButton';

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
  technologies?: string[];
}

const PROJECTS_QUERY = `*[_type == "projectsOrder"][0]{
  projects[]->{
    _id,
    title,
    description,
    images[]{
      asset->{
        url, 
        metadata{
          dimensions
        }
      }
    },
    technologies
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const { projects = [] } = await client.fetch<{ projects: Project[] }>(PROJECTS_QUERY, {}, options);

  return (
    <>
      <main>
        <Hero />
        <div className='mb-6 md:my-28 pl-6 pr-6 md:pl-30 lg:max-w-[600px]'>
          <h1 className='text-4xl mt-8 mb-4'>Recent Projects</h1>
          <p className='text-gray-700 dark:text-gray-200'>
            With these projects I have been involved with Wireframing, UI Design & Frontend Development
          </p>
        </div>
        <ul className='grid grid-cols-1 xl:grid-cols-2 border-t-1 border-gray-200'>
          {projects.map((project: Project, index: number) => (
            <li
              key={project._id}
              className={`py-6 md:py-20 px-6 md:px-20 lg:px-22 xl:px-30 relative border-b border-gray-200 md:first:border-r md:last:border-none
                ${index % 2 === 0 ? 'md:border-r' : ''} 
                ${index >= projects.length - 2 ? 'md:border-b-0' : ''}`}
            >
              <ProjectCard
                title={project.title || ''}
                description={project.description || ''}
                images={project.images}
                technologies={project.technologies}
              />
            </li>
          ))}
        </ul>
      </main>
      <ScrollToTopButton />
    </>
  );
}
