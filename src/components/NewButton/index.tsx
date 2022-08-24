import React, { AnchorHTMLAttributes } from 'react';

import { Container } from './styles';

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

export const NewButton: React.FC<LinkProps> = ({ children, to, ...rest }) => (
  <Container to={to} type="button" {...rest}>
    {children}
  </Container>
);

