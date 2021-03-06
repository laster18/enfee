import styled from 'styled-components';
import { Color, Size } from 'src/const';

const FieldError = styled.div`
  color: ${Color.THEME.ERROR};
  font-size: ${Size.FONT_RATIO.XSMALL}rem;
`;

export default FieldError;
