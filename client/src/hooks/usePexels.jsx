import { useState, useEffect } from 'react';
import { getPhotoUrl, placeholderGradient } from '../services/pexels';

// Hook: fetch a single Pexels image by query
export function usePexelsImage(query, size = 'large2x') {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    let cancelled = false;
    setLoading(true);
    getPhotoUrl(query, size).then((result) => {
      if (!cancelled) {
        setUrl(result);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [query, size]);

  return { url, loading, placeholder: placeholderGradient };
}

// Component: Image with loading state
export function PexelsImage({ query, alt, className, style, size = 'large2x' }) {
  const { url, loading } = usePexelsImage(query, size);

  if (loading || !url) {
    return (
      <div
        className={className}
        style={{
          background: placeholderGradient,
          ...style,
        }}
      />
    );
  }

  return (
    <img
      src={url}
      alt={alt || query}
      className={className}
      style={{ objectFit: 'cover', ...style }}
      loading="lazy"
    />
  );
}

// Component: Background image div
export function PexelsBg({ query, children, className, style, overlay }) {
  const { url } = usePexelsImage(query);

  return (
    <div
      className={className}
      style={{
        backgroundImage: url ? `url(${url})` : placeholderGradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        ...style,
      }}
    >
      {overlay && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: typeof overlay === 'string' ? overlay : 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1))',
            borderRadius: 'inherit',
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
