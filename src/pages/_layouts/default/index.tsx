import React from 'react';

import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';

import { Wrapper, Container } from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Sidebar />
      <Container>
        <Header />
        {children}
      </Container>
    </Wrapper>
  );
};

export default DefaultLayout;
