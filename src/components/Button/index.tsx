import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  layoutColor: 'button-filled' | 'button-outline' | 'button-green';
};

const Button: React.FC<ButtonProps> = ({ children, layoutColor, ...rest }) => (
  <Container type="button" className={layoutColor} {...rest}>
    {children}
  </Container>
);

export default Button;
