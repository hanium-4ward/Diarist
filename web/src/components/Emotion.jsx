import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: ${props => 120 * props.theme.widthRatio}px;
  height: ${props => 120 * props.theme.widthRatio}px;
`;

const Figcaption = styled.figcaption`
  text-align: center;
  font-size: ${props => 24 * props.theme.widthRatio}px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #000;
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

const Figure = styled.figure`
  padding: ${props => 10 * props.theme.widthRatio}px;
  border-radius: 15px;
  opacity: ${props => (props.isSelected ? 1 : 0.3)};
  transition: opacity 0.8s ease;
`;

function Emotion({src, label, onClick, isSelected}) {
  return (
    <li>
      <Button onClick={onClick}>
        <Figure isSelected={isSelected}>
          <Image src={src} alt={label} />
          <Figcaption>{label}</Figcaption>
        </Figure>
      </Button>
    </li>
  );
}

export default Emotion;
