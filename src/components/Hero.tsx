'use client';
import Image from 'next/image';
import useIsMobile from './useIsMobile';
import { useRef } from 'react';

// Define an interface for the social link object
interface SocialLink {
  title: string;
  href: string;
  icon: string;
  width: number;
  height: number;
}

const socialLinks: SocialLink[] = [
  {
    title: 'Email',
    href: 'mailto:tomrishworth@gmail.com',
    icon: '/envelope.svg', // Path to the SVG file in public directory
    width: 24,
    height: 24,
  },
  {
    title: 'Github',
    href: 'https://github.com/tomrishworth',
    icon: '/github.svg', // Path to the SVG file in public directory
    width: 24,
    height: 24,
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tomrishworth',
    icon: '/linkedin.svg', // Path to the SVG file in public directory
    width: 22,
    height: 22,
  },
];

const Hero = () => {
  const backgroundRef = useRef(null);
  const isMobile = useIsMobile();
  const mobileImageSrc =
    'https://res.cloudinary.com/atmosphere-studios/image/upload/v1746000868/me-portrait_ssgnyi.jpg';
  const desktopImageSrc =
    'https://res.cloudinary.com/atmosphere-studios/image/upload/f_auto/v1745879582/me-landscape_jygxpr.jpg';

  return (
    <section className='relative w-full h-screen flex items-center justify-center overflow-hidden'>
      <div ref={backgroundRef} className='absolute inset-0'>
        <Image
          src={isMobile ? mobileImageSrc : desktopImageSrc}
          alt='Tom Rishworth'
          fill
          priority
          className={`${isMobile ? 'object-contain object-bottom' : 'object-cover'} w-full h-full`}
        />
      </div>
      <div className='absolute inset-0 flex flex-col items-start justify-start z-10'>
        <div className='max-w-xl lg:max-w-3xl xl:max-w-3xl pt-4 md:pt-24 lg:pt-40 pl-6 md:pl-24 lg:pl-60'>
          <Image
            src='/tomrishworth.png'
            alt='Tom Rishworth'
            width={1024}
            height={361}
            className='max-w-[200px] md:max-w-2xs'
          />
          <h1 className='text-lg md:text-2xl text-gray-900'>
            Hey there! I&apos;m a Digital Designer and Frontend Developer crafting digital experiences for over 15
            years. Based in Auckland, NZ.
          </h1>
          <div className='flex items-center gap-4 mt-2 md:mt-6'>
            {socialLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                title={link.title}
                aria-label={link.title} // Added aria-label for accessibility
                className='p-2 hover:opacity-75 transition-opacity'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  src={link.icon}
                  alt={link.title}
                  width={link.width} // Use width from link object
                  height={link.height} // Use height from link object
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Optional: Overlay for better text readability */}
      <div className='absolute inset-0 z-0' />
    </section>
  );
};

export default Hero;
