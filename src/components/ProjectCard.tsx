import React from "react";
import Image from "next/image";

interface ProjectImage {
  asset?: {
    url: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
}

interface ProjectCardProps {
  title: string;
  description: string;
  images?: ProjectImage[];
  technologies?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  images,
  technologies,
}) => {
  return (
    <div className="project-card lg:grid lg:grid-cols-[600px_1fr] gap-10 relative">
      <div className="pl-6 md:pl-12 pr-6 md:pr-12 lg:sticky lg:top-[30px] lg:h-[fit-content] mb-12 lg:mb-0">
        <h2 className="text-6xl mb-4 mt-0">{title}</h2>{" "}
        <p className="text-gray-700 dark:text-gray-50 mb-4">{description}</p>
        {technologies && technologies.length > 0 && (
          <div className="mt-4">
            <h3 className="mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((item, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      {images && images.length > 0 && (
        <div className="project-images flex flex-col gap-6 md:gap-10 items-center justify-center pl-6 md:pl-12 lg:pl-0 pr-6 md:pr-12">
          {images.map((image, idx) => {
            const imageUrl = image.asset?.url;
            const imageWidth = image.asset?.metadata?.dimensions?.width;
            const imageHeight = image.asset?.metadata?.dimensions?.height;
            if (imageUrl && imageWidth && imageHeight) {
              return (
                <div key={imageUrl} className="w-full">
                  <Image
                    key={idx}
                    src={imageUrl}
                    alt={title || "Project image"}
                    width={imageWidth}
                    height={imageHeight}
                    className="object-cover rounded-xl shadow-xl"
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
