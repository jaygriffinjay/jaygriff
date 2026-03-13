'use client';

import { Heading, Container } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { IoMailOutline, IoDocumentTextOutline } from 'react-icons/io5';
import Image from 'next/image';

const shimmer = keyframes`
  to {
    background-position: -200% 0;
  }
`;

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0 4rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.lg};
  margin: 0 0 2.5rem;
  text-align: center;
`;

const LinkStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  width: 100%;
  max-width: 480px;
`;

const PillCard = styled.a`
  display: grid;
  grid-template-columns: 52px 1fr 52px;
  align-items: center;
  padding: 0.85rem 1rem;
  border-radius: 999px;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: ${props => props.theme.colors.border};
    border-color: hsl(210, 100%, 60%);
    color: hsl(210, 100%, 70%);
  }

  &.email:hover {
    background-color: ${props => props.theme.colors.border};
    border-color: hsl(210, 100%, 60%);
    color: hsl(210, 100%, 70%);
  }

  &.email:hover .pill-label {
    background: linear-gradient(
      90deg,
      hsl(190, 100%, 55%),
      hsl(210, 100%, 60%),
      hsl(230, 100%, 55%),
      hsl(210, 100%, 60%),
      hsl(190, 100%, 55%)
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 3s linear infinite;
  }
`;

const IconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Label = styled.span`
  text-align: center;
  line-height: 1;
  display: block;
`;

const links = [
  {
    href: 'mailto:jay@jaygriff.com',
    label: 'jay@jaygriff.com',
    icon: <IoMailOutline />,
    className: 'email',
    external: false,
  },
  {
    href: 'https://github.com/jaygriffinjay',
    label: 'GitHub',
    icon: <SiGithub />,
    className: '',
    external: true,
  },
  {
    href: 'https://linkedin.com/in/jaygriffinjay',
    label: 'LinkedIn',
    icon: <SiLinkedin />,
    className: '',
    external: true,
  }
];

export default function ContactPageClient() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <PageWrap>
          <Image
            src="/images/me.jpg"
            alt="Jay Griffin"
            width={200}
            height={200}
            priority
            style={{
              borderRadius: '5%',
              marginBottom: '1.5rem',
              display: 'block',
            }}
          />
          <Heading level={1}>Contact Me</Heading>

          <LinkStack>
            {links.map(({ href, label, icon, className, external }) => (
              <PillCard
                key={href}
                href={href}
                className={className}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <IconSlot aria-hidden>{icon}</IconSlot>
                <Label className="pill-label">{label}</Label>
                <span />
              </PillCard>
            ))}
          </LinkStack>
        </PageWrap>
      </ContentWrapper>
    </Container>
  );
}
