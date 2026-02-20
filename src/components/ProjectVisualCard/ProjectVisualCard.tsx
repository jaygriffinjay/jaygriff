'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  GalleryWrap,
  SliderWrap,
  SliderTrack,
  ArrowButton,
  Thumbnail,
  ThumbnailLabel,
  PlaceholderThumb,
  PlaceholderTitle,
  DetailPanel,
  DetailHeader,
  DetailLogoWrap,
  DetailTitle,
  DetailImageWrap,
  DetailDescription,
  DetailLinks,
  DetailLink,
} from './ProjectVisualCard.styles';

interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  videoSrc?: string;
  videoPosterSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  placeholderGradient?: string;
  logoSrc?: string;
  logoAlt?: string;
  links: ProjectLink[];
}

interface ProjectGalleryProps {
  projects: ProjectData[];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [selectedId, setSelectedId] = useState<string | null>(projects[0]?.id ?? null);
  const trackRef = useRef<HTMLDivElement>(null);

  const selected = projects.find(p => p.id === selectedId);

  function handleSelect(id: string) {
    setSelectedId(id);
  }

  function scroll(direction: 'left' | 'right') {
    if (!trackRef.current) return;
    const amount = 220;
    trackRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  }

  return (
    <GalleryWrap>
      <SliderWrap>
        <ArrowButton direction="left" onClick={() => scroll('left')} aria-label="Scroll left">
          ‹
        </ArrowButton>

        <SliderTrack ref={trackRef}>
          {projects.map(project => (
            <Thumbnail
              key={project.id}
              selected={selectedId === project.id}
              onClick={() => handleSelect(project.id)}
              aria-label={`View ${project.title}`}
            >
              {project.imageSrc ? (
                <>
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt || project.title}
                    fill
                    sizes="200px"
                    priority
                    style={{ display: 'block' }}
                  />
                  <ThumbnailLabel>{project.title}</ThumbnailLabel>
                </>
              ) : (
                <PlaceholderThumb gradient={project.placeholderGradient || 'linear-gradient(135deg, #667eea, #764ba2)'}>
                  <PlaceholderTitle>{project.title}</PlaceholderTitle>
                </PlaceholderThumb>
              )}
            </Thumbnail>
          ))}
        </SliderTrack>

        <ArrowButton direction="right" onClick={() => scroll('right')} aria-label="Scroll right">
          ›
        </ArrowButton>
      </SliderWrap>

      {selected && (
        <DetailPanel key={selected.id}>
          <DetailHeader>
            {selected.logoSrc && (
              <DetailLogoWrap>
                <Image
                  src={selected.logoSrc}
                  alt={selected.logoAlt || `${selected.title} logo`}
                  width={24}
                  height={24}
                />
              </DetailLogoWrap>
            )}
            <DetailTitle>{selected.title}</DetailTitle>
          </DetailHeader>

          <DetailDescription>{selected.description}</DetailDescription>

          <DetailLinks>
            {selected.links.map(link => (
              <DetailLink
                key={`${selected.id}-${link.href}`}
                href={link.href}
              >
                {link.label}
              </DetailLink>
            ))}
          </DetailLinks>

          {selected.videoSrc ? (
            <DetailImageWrap>
              <video
                className="projectVideo"
                src={selected.videoSrc}
                poster={selected.videoPosterSrc}
                controls
                playsInline
                preload="metadata"
              />
            </DetailImageWrap>
          ) : (
            selected.imageSrc && selected.imageWidth && selected.imageHeight && (
              <DetailImageWrap>
                <Image
                  src={selected.imageSrc}
                  alt={selected.imageAlt || selected.title}
                  width={selected.imageWidth}
                  height={selected.imageHeight}
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority={selected.id === projects[0]?.id}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </DetailImageWrap>
            )
          )}
        </DetailPanel>
      )}
    </GalleryWrap>
  );
}
