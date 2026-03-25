import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { VideoEmbed } from '../VideoEmbed';

vi.mock('next/image', () => ({
  default: ({ alt, fill: _fill, sizes: _sizes, ...props }: any) => <img alt={alt} {...props} />,
}));

describe('VideoEmbed', () => {
  afterEach(cleanup);

  it('shows play button for a YouTube URL', () => {
    render(<VideoEmbed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />);
    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeInTheDocument();
  });

  it('shows play button for a Vimeo URL', () => {
    render(<VideoEmbed url="https://vimeo.com/123456789" />);
    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeInTheDocument();
  });

  it('renders the title when provided', () => {
    render(<VideoEmbed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" title="Product Demo" />);
    expect(screen.getByText('Product Demo')).toBeInTheDocument();
  });

  it('renders nothing for an invalid URL', () => {
    const { container } = render(<VideoEmbed url="https://example.com/not-a-video" />);
    expect(container.querySelector('section')).toBeNull();
  });

  it('uses YouTube thumbnail as default when no custom thumbnail', () => {
    render(<VideoEmbed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" title="Demo" />);
    const img = screen.getByAltText('Demo');
    expect(img).toHaveAttribute('src', 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg');
  });

  it('uses custom thumbnail when provided', () => {
    render(
      <VideoEmbed
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        thumbnail="/custom-thumb.jpg"
        title="Demo"
      />
    );
    const img = screen.getByAltText('Demo');
    expect(img).toHaveAttribute('src', '/custom-thumb.jpg');
  });
});
