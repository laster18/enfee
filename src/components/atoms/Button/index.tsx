import React from 'react';
import styled, { css } from 'styled-components';
import { Color, Size } from '../../../const';

type ColorType = 'primary' | 'secondary' | 'twitter';
type SizeType = 'small' | 'midium' | 'large';
type ShapeType = 'oval' | 'rect';

interface Props {
  color?: ColorType;
  size?: SizeType;
  shape?: ShapeType;
  reverse?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({
  children,
  color = 'primary',
  size = 'midium',
  shape = 'rect',
  reverse = false,
}) => (
  <>
    <StyledButton {...{ color, size, shape, reverse }}>{children}</StyledButton>
  </>
);

const getColor = (color: ColorType = 'primary') => {
  switch (color) {
    case 'primary':
      return Color.THEME.PRIMARY;
    case 'secondary':
      return Color.THEME.ACCENT;
    case 'twitter':
      return Color.THEME.TWITTER;
    default:
      return Color.THEME.PRIMARY;
  }
};

const getShape = (shape: ShapeType = 'rect') => {
  switch (shape) {
    case 'rect':
      return Size.BORDER_RADIUS.RECT;
    case 'oval':
      return Size.BORDER_RADIUS.OVAL;
    default:
      return Size.BORDER_RADIUS.RECT;
  }
};

const getColorStyle = (color: ColorType, reverse: boolean) => {
  const colorCode = getColor(color);

  if (reverse) {
    return css`
      color: ${colorCode};
      background-color: white;
      border: 2px solid ${colorCode};

      &:hover {
        color: ${Color.FONT.LESS};
        background-color: ${colorCode};
      }
    `;
  }

  return css`
    color: ${Color.FONT.LESS};
    background-color: ${colorCode};
    border: none;

    &:hover {
      opacity: 0.8;
    }
  `;
};

type ButtonProps = Required<Omit<Props, 'children'>>;

const StyledButton = styled.button<ButtonProps>`
  ${({ color, reverse }) => getColorStyle(color, reverse)}
  font-size: ${Size.FONT.BASE}px;
  padding: 6px 15px;
  border-radius: ${({ shape }) => getShape(shape)}px;
  letter-spacing: 1.28px;
  cursor: pointer;
  outline: none;
`;

export default Button;
