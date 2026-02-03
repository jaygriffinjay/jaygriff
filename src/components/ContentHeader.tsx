"use client";

import { css } from '@emotion/react';
import { useRef, useState, useEffect } from 'react';
import type { PostMeta } from '@/types/post';
import { formatPostDate } from '@/lib/date';

interface ContentHeaderProps {
  metadata: PostMeta;
}

const headerStyles = css({
  marginBottom: '2rem',
  paddingBottom: '1.5rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

const titleStyles = css({
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: '0.5rem',
  lineHeight: 1.2,
});

const categoryBadgeStyles = css({
  display: 'inline-block',
  padding: '0.375rem 1rem',
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  borderRadius: '6px',
  marginBottom: '1rem',
});

const commitBadgeStyles = css({
  backgroundColor: '#fbbf24',
  color: '#1f2937',
});

const metaTextStyles = css({
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.6)',
  marginBottom: '1rem',
});

const badgeContainerStyles = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '1rem',
});

const tagsRowStyles = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  alignItems: 'center',
  marginBottom: '1rem',
});

const tagsLabelStyles = css({
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.5)',
  marginRight: '0.25rem',
});

const badgeStyles = css({
  display: 'inline-block',
  padding: '0.25rem 0.75rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 0.7)',
});

const tooltipContainerStyles = css({
  position: 'relative',
  display: 'inline-block',
  padding: '0.125rem 0.5rem',
  marginLeft: '-0.5rem',
  borderRadius: '12px',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

// Tooltip positioning: defaults to appearing above, flips to below if it would overflow viewport top
const tooltipStyles = css({
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  marginBottom: '0.5rem',
  padding: '0.5rem 0.75rem',
  backgroundColor: 'rgba(255, 255, 255, 0.99)',
  color: '#000',
  fontSize: '0.75rem',
  borderRadius: '8px',
  minWidth: '160px',
  pointerEvents: 'none',
  zIndex: 900,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.15s ease, visibility 0.15s ease',
  '.tooltip-trigger:hover &': {
    opacity: 1,
    visibility: 'visible',
    transitionDelay: '0.15s',
  },
});

// Flipped version: appears below when there's not enough room above
const tooltipFlippedStyles = css({
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  marginTop: '0.5rem',
  padding: '0.5rem 0.75rem',
  backgroundColor: 'rgba(255, 255, 255, 0.99)',
  color: '#000',
  fontSize: '0.75rem',
  borderRadius: '8px',
  minWidth: '160px',
  pointerEvents: 'none',
  zIndex: 900,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.15s ease, visibility 0.15s ease',
  '.tooltip-trigger:hover &': {
    opacity: 1,
    visibility: 'visible',
    transitionDelay: '0.15s',
  },
});

export function ContentHeader({ metadata }: ContentHeaderProps) {
  // Refs for tooltip DOM elements to measure their position
  const authorTooltipRef = useRef<HTMLSpanElement>(null);
  const updatedTooltipRef = useRef<HTMLSpanElement>(null);
  
  // Track whether each tooltip should flip to appear below instead of above
  const [authorTooltipFlipped, setAuthorTooltipFlipped] = useState(false);
  const [updatedTooltipFlipped, setUpdatedTooltipFlipped] = useState(false);

  // Check tooltip positioning on mount and when metadata changes
  useEffect(() => {
    const checkTooltipPosition = (tooltipRef: React.RefObject<HTMLSpanElement | null>, setFlipped: (flipped: boolean) => void) => {
      if (!tooltipRef.current) return;
      
      // Temporarily show tooltip to measure its position
      const tooltip = tooltipRef.current;
      const originalOpacity = tooltip.style.opacity;
      const originalVisibility = tooltip.style.visibility;
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
      
      // Get tooltip's position relative to viewport
      const rect = tooltip.getBoundingClientRect();
      
      // If tooltip's top edge is above viewport (negative or < 20px margin), flip it
      const shouldFlip = rect.top < 20;
      setFlipped(shouldFlip);
      
      // Restore original visibility
      tooltip.style.opacity = originalOpacity;
      tooltip.style.visibility = originalVisibility;
    };

    // Check both tooltips if they exist
    if (metadata.authorshipNote && authorTooltipRef.current) {
      checkTooltipPosition(authorTooltipRef, setAuthorTooltipFlipped);
    }
    if (metadata.updated && updatedTooltipRef.current) {
      checkTooltipPosition(updatedTooltipRef, setUpdatedTooltipFlipped);
    }
  }, [metadata.authorshipNote, metadata.updated]);
  const repoUrl = 'https://github.com/jaygriffinjay/my-website-v3';
  
  // Handle author as string or array
  const authorText = metadata.author 
    ? (Array.isArray(metadata.author) 
        ? metadata.author.join(', ')
        : metadata.author)
    : null;
  
  return (
    <header css={headerStyles}>
      {metadata.type === 'doc:commit' && (
        <div>
          <span css={[categoryBadgeStyles, commitBadgeStyles]}>Commit</span>
          {metadata.commitHash && (
            <a 
              href={`${repoUrl}/commit/${metadata.commitHash}`}
              target="_blank"
              rel="noopener noreferrer"
              css={{
                marginLeft: '0.75rem',
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'underline',
                }
              }}
            >
              View on GitHub →
            </a>
          )}
        </div>
      )}
      
      <h1 css={titleStyles}>{metadata.title}</h1>
      
      {/* Author and date metadata with tooltips */}
      <div css={metaTextStyles}>
        {authorText && (
          metadata.authorshipNote ? (
            <span css={tooltipContainerStyles} className="tooltip-trigger">
              By {authorText}<span css={{ color: '#fbbf24' }}>*</span>
              {/* Ref allows position measurement; conditional styling flips tooltip below if it would overflow top */}
              <span 
                ref={authorTooltipRef}
                css={authorTooltipFlipped ? tooltipFlippedStyles : tooltipStyles}
              >
                {metadata.authorshipNote}
              </span>
            </span>
          ) : (
            <span>By {authorText}</span>
          )
        )}
        {/* Conditional spacing: asterisk adds visual weight, needs less extra space */}
        {metadata.authorshipNote ? (
          <span>·&nbsp; </span>
        ) : (
          <span>&nbsp;&nbsp;·&nbsp; </span>
        )}
        {metadata.updated ? (
          <span css={tooltipContainerStyles} className="tooltip-trigger">
            {formatPostDate(metadata.date)}<span css={{ color: '#fbbf24' }}>*</span>
            {/* Ref allows position measurement; conditional styling flips tooltip below if it would overflow top */}
            <span 
              ref={updatedTooltipRef}
              css={updatedTooltipFlipped ? tooltipFlippedStyles : tooltipStyles}
            >
              {Array.isArray(metadata.updated) ? (
                <>
                  Updated {metadata.updated.length} time{metadata.updated.length > 1 ? 's' : ''}:
                  <ol css={{ margin: '0.25rem 0 0 0', paddingLeft: '1.25rem' }}>
                    {[...metadata.updated].reverse().map((date) => (
                      <li key={date}>{formatPostDate(date)}</li>
                    ))}
                  </ol>
                </>
              ) : (
                <>
                  Updated:<br/>
                  {formatPostDate(metadata.updated)}
                </>
              )}
            </span>
          </span>
        ) : (
          <span>{formatPostDate(metadata.date)}</span>
        )}
      </div>
      {/* End of cursed formatting logic */}
      
      <div css={badgeContainerStyles}>
        {metadata.type === 'doc' && <span css={badgeStyles}>docs</span>}
        
        {metadata.projectId && <span css={badgeStyles}>Project: {metadata.projectId}</span>}
        
        {metadata.feature && <span css={badgeStyles}>Feature: {metadata.feature}</span>}
      </div>
      
      {metadata.tags && metadata.tags.length > 0 && (
        <div css={tagsRowStyles}>
          <span css={tagsLabelStyles}>🏷️ Tags:</span>
          {metadata.tags.map((tag) => (
            <span key={tag} css={badgeStyles}>{tag}</span>
          ))}
        </div>
      )}
      
      {metadata.description && (
        <p css={{ marginTop: '1rem', fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5 }}>
          {metadata.description}
        </p>
      )}
    </header>
  );
}
