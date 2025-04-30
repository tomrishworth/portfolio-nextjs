import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import ProjectCard from "../components/ProjectCard";
import Hero from "../components/Hero";
import ScrollToTopButton from "../components/ScrollToTopButton";

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

const PROJECTS_QUERY = `*[
  _type == "project"
]|order(publishedAt desc)[0...12]{
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
}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);

  return (
    <>
      <main>
        <Hero />
        <div className="mb-6 md:my-28 pl-6 pr-6 md:pl-12 lg:max-w-[600px]">
          <h1 className="text-6xl mt-8 mb-4">Recent Projects</h1>
          <p className="text-gray-700 dark:text-gray-200">
            With these projects I have been involved with Wireframing, UI Design
            & Frontend Development
          </p>
        </div>
        <ul className="flex flex-col gap-y-0">
          {projects.map((project: Project, idx: number) => (
            <li
              key={project._id}
              className="mb-16 pb-16 border-b-2 border-gray-200"
            >
              <ProjectCard
                title={project.title || ""}
                description={project.description || ""}
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
