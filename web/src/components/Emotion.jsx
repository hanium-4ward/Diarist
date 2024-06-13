import React from 'react';
import styled, {useTheme} from 'styled-components';

const Image = styled.img`
  width: ${props => 110 * props.theme.widthRatio}px;
  height: ${props => 110 * props.theme.widthRatio}px;
  flex-shrink: 0;
`;

const Figcaption = styled.figcaption`
  text-align: center;
  font-size: ${props => 24 * props.theme.widthRatio}px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

function Emotion({src, label, onClick}) {
  return (
    <li onClick={onClick}>
      <figure>
        <Image src={src} alt={label} />
        <Figcaption>{label}</Figcaption>
      </figure>
    </li>
  );
}

export default Emotion;
