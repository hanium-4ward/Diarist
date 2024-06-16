import React from 'react';
import styled from 'styled-components';

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

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

function Emotion({src, label, onClick}) {
  return (
    <li>
      <Button onClick={onClick}>
        <figure>
          <Image src={src} alt={label} />
          <Figcaption>{label}</Figcaption>
        </figure>
      </Button>
    </li>
  );
}

export default Emotion;
