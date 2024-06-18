import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  color: #555;
  text-align: center;
  font-size: ${props => 28 * props.theme.widthRatio}px;
  font-weight: 300;
  line-height: normal;
  letter-spacing: ${props => -0.42 * props.theme.widthRatio}px;
  width: 25%;
  background: #fff;
  height: ${props => 60 * props.theme.widthRatio}px;
  padding-left: ${props => 32 * props.theme.widthRatio}px;
  padding-right: ${props => 32 * props.theme.widthRatio}px;
  ${props =>
    props.$isActive &&
    `
    font-weight: 700;
    color: black;
    border-bottom: 2px solid #000;
  `}
`;

function CategoryButton({label, onClick, isActive}) {
  return (
    <Button onClick={onClick} $isActive={isActive}>
      {label}
    </Button>
  );
}

export default CategoryButton;
