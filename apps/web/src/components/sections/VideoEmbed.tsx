'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

interface VideoEmbedProps {
  url: string;
  thumbnail?: string;
  title?: string;
}

function extractVideoId(url: string): { provider: 'youtube' | 'vimeo'; id: string } | null {
  // YouTube patterns
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) return { provider: 'youtube', id: ytMatch[1] };

  // Vimeo patterns
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) return { provider: 'vimeo', id: vimeoMatch[1] };

  return null;
}

function getEmbedUrl(provider: 'youtube' | 'vimeo', id: string): string {
  if (provider === 'youtube') {
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  }
  return `https://player.vimeo.com/video/${id}?autoplay=1`;
}

function getDefaultThumbnail(provider: 'youtube' | 'vimeo', id: string): string | null {
  if (provider === 'youtube') {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }
  return null;
}

export function VideoEmbed({ url, thumbnail, title }: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const video = extractVideoId(url);
  if (!video) return null;

  const embedUrl = getEmbedUrl(video.provider, video.id);
  const thumbnailSrc = thumbnail ?? getDefaultThumbnail(video.provider, video.id);

  return (
    <section className="px-6 py-(--spacing-section)">
      <div className="glass mx-auto max-w-4xl overflow-hidden rounded-xl">
        {title && (
          <div className="px-6 pt-5">
            <h3 className="text-text-primary text-lg font-semibold">{title}</h3>
          </div>
        )}

        <div className="relative aspect-video">
          {isPlaying ? (
            <iframe
              src={embedUrl}
              title={title ?? 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="group bg-bg-secondary relative flex h-full w-full items-center justify-center"
              aria-label={`Play ${title ?? 'video'}`}
            >
              {/* Thumbnail */}
              {thumbnailSrc ? (
                <Image
                  src={thumbnailSrc}
                  alt={title ?? 'Video thumbnail'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              ) : (
                <div
                  className="from-accent-blue/20 via-bg-secondary to-accent-teal/10 absolute inset-0 bg-gradient-to-br"
                  aria-hidden="true"
                />
              )}

              {/* Overlay */}
              <div
                className="bg-bg-primary/30 group-hover:bg-bg-primary/20 absolute inset-0 transition-opacity duration-300"
                aria-hidden="true"
              />

              {/* Play button */}
              <div
                className={cn(
                  'relative z-10 flex h-20 w-20 items-center justify-center rounded-full',
                  'bg-gradient-to-r from-blue-500 to-teal-500',
                  'glow-blue transition-transform duration-300',
                  'group-hover:scale-110'
                )}
              >
                <Play className="ml-1 h-8 w-8 fill-white text-white" />
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
