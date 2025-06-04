'use client';
import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/ProjectCard.module.css';

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

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, images, technologies }) => {
  interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }

  function NextArrow(props: ArrowProps) {
    const { onClick } = props;
    return (
      <div className='arrow arrow-next text-gray-400' onClick={onClick}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1}
          stroke='currentColor'
          className='size-10'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
        </svg>
      </div>
    );
  }

  function PrevArrow(props: ArrowProps) {
    const { onClick } = props;
    return (
      <div className='arrow arrow-previous text-gray-400' onClick={onClick}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1}
          stroke='currentColor'
          className='size-10'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
        </svg>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className='project-card max-w-[900px]'>
      {images && images.length > 0 && (
        <div className={`project-images  ${styles['project-images']} mb-14`}>
          <Slider {...settings}>
            {images.map((image) => {
              const imageUrl = image.asset?.url;
              const imageWidth = image.asset?.metadata?.dimensions?.width;
              const imageHeight = image.asset?.metadata?.dimensions?.height;
              if (imageUrl && imageWidth && imageHeight) {
                return (
                  <div key={imageUrl} className='w-full'>
                    <Image
                      src={imageUrl}
                      alt={title || 'Project image'}
                      width={imageWidth}
                      height={imageHeight}
                      className='object-cover rounded-xl'
                    />
                  </div>
                );
              }
              return null;
            })}
          </Slider>
        </div>
      )}
      <div className='mb-12'>
        <h2 className='text-2xl mb-4 mt-0'>{title}</h2>{' '}
        <p className='text-gray-700 dark:text-gray-50 mb-4'>{description}</p>
        {technologies && technologies.length > 0 && (
          <div className='mt-4'>
            <h3 className='mb-2'>Technologies</h3>
            <div className='flex flex-wrap gap-2'>
              {technologies.map((item, index) => (
                <span key={index} className='inline-block px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-md text-sm'>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
