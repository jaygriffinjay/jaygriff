'use client';

import styled from '@emotion/styled';
import * as Slider from '@radix-ui/react-slider';

export const Container = styled.div`
  padding: ${props => props.theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const Card = styled.div`
  background: ${props => props.theme.colors.hover};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.medium};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.lg};
`;

export const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.radii.medium};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSizes.base};
  font-family: ${props => props.theme.fonts.body};
  cursor: pointer;
  margin-right: ${props => props.theme.spacing.sm};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.2s;
  
  &:hover {
    opacity: 0.9;
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: ${props => props.theme.shadows.sm};
  }
`;

export const ControlGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const SliderRoot = styled(Slider.Root)`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
`;

export const SliderTrack = styled(Slider.Track)`
  background: ${props => props.theme.colors.border};
  position: relative;
  flex-grow: 1;
  height: 4px;
  border-radius: ${props => props.theme.radii.full};
`;

export const SliderRange = styled(Slider.Range)`
  background: ${props => props.theme.colors.primary};
  position: absolute;
  height: 100%;
  border-radius: ${props => props.theme.radii.full};
`;

export const SliderThumb = styled(Slider.Thumb)`
  display: block;
  width: 20px;
  height: 20px;
  background: white;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.radii.full};
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
  }
`;

export const CodeBlock = styled.pre`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.small};
  padding: ${props => props.theme.spacing.md};
  overflow-x: auto;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.text};
`;
