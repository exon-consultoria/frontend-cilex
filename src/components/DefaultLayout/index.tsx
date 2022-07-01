import React from 'react';

import Header from '../Header';

import { Container, Main } from './styles';

interface DefaultLayoutProps {
  pageNameHeader: string;
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  pageNameHeader,
  children,
}) => {
  return (
    <Container>
      <Header pageName={pageNameHeader} />
      <Main>{children}</Main>
    </Container>
  );
};

export default DefaultLayout;
