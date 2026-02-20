import styled from '@emotion/styled';

/* ── Gallery wrapper ── */
export const GalleryWrap = styled.div`
  margin: 1.5rem 0 2rem;
`;

/* ── Slider row ── */
export const SliderWrap = styled.div`
  position: relative;
`;

export const SliderTrack = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 0.5rem 0;

  /* Hide scrollbar but keep scroll */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ArrowButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => (props.direction === 'left' ? 'left: -1.5rem;' : 'right: -1.5rem;')}
  transform: translateY(-50%);
  z-index: 10;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #fff;
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1;
  opacity: 0.6;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ── Thumbnail card ── */
export const Thumbnail = styled.button<{ selected?: boolean }>`
  flex: 0 0 auto;
  width: 200px;
  scroll-snap-align: start;
  background: transparent;
  border: 2px solid ${props => (props.selected ? props.theme.colors.primary : props.theme.colors.border)};
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  position: relative;
  aspect-ratio: 4 / 5;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  ${props =>
    props.selected &&
    `box-shadow: 0 0 0 2px ${props.theme.colors.primary}40;`}

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${props => props.theme.colors.primary};
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
    }

    &:focus-visible {
      border-color: ${props => props.theme.colors.primary};
    }
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
`;

export const ThumbnailLabel = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.3rem 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* ── Gradient placeholder thumbnail ── */
export const PlaceholderThumb = styled.div<{ gradient: string }>`
  position: absolute;
  inset: 0;
  background: ${props => props.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
`;

export const PlaceholderTitle = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  line-height: 1.25;
`;

/* ── Detail panel (below slider) ── */
export const DetailPanel = styled.div`
  margin-top: 1.2rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  background: ${props => props.theme.colors.background};
  padding: 1.25rem;
  animation: detailFadeIn 200ms ease;

  @keyframes detailFadeIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.8rem;
`;

export const DetailLogoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const DetailTitle = styled.h3`
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.heading};
`;

export const DetailImageWrap = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.8rem;

  img,
  video {
    display: block;
    width: 100%;
    height: auto;
  }

  .projectVideo {
    aspect-ratio: 16 / 9;
    height: auto;
    object-fit: cover;
    background: #000;
  }
`;

export const DetailDescription = styled.p`
  margin: 0 0 0.8rem;
  line-height: 1.55;
  color: ${props => props.theme.colors.text};
`;

export const DetailLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
`;


export const DetailLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
