import React from 'react';
import styled from 'styled-components';
import { Color, Size } from 'src/const';

interface Props {
  text: string;
}

const CategoryTag: React.FC<Props> = ({ text }) => <Tag>{text}</Tag>;

const Tag = styled.span`
  font-size: ${Size.FONT_RATIO.XXSMALL}rem;
  text-align: center;
  display: inline-block;
  line-height: 20px;
  position: relative;
  padding: 0 20px 0 23px;
  text-decoration: none;
  color: ${Color.FONT.LESS};
  background: ${Color.THEME.PRIMARY};

  &::after {
    position: absolute;
    top: -1px;
    right: -8px;
    width: 0;
    height: 0;
    content: '';
    border-width: 11px 0 11px 9px;
    border-style: solid;
    border-color: transparent transparent transparent ${Color.THEME.PRIMARY};
    border-radius: 9px;
  }
`;

export default CategoryTag;
