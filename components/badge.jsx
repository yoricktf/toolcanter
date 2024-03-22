'use client';
import React from 'react';
import styled from 'styled-components';

const Title = styled.p`
  font-size: 0.8rem;
`;

const Tag = styled.div`
  background-color: ${(props) => props.color};
  color: white;
  width: fit-content;
  padding: 10px;
  border-radius: 5px;
  margin: 2px;
`;

const Badge = ({ children }) => {
  const stringToColour = (str) => {
    let hash = 0;
    str.split('').forEach((char) => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += value.toString(16).padStart(2, '0');
    }
    return colour;
  };

  const color = stringToColour(children);

  return (
    <Tag color={color}>
      <Title>{children}</Title>
    </Tag>
  );
};

export default Badge;
