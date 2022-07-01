import React from 'react';
import Lottie from 'react-lottie';

import EmptyBox from '../../assets/animation/empty-box.json';

import { Container } from './styles';

const EmptyData: React.FC = () => {
  return (
    <Container>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: EmptyBox,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={300}
        width={300}
      />
      <h3>Nenhum dado cadastrado!</h3>
    </Container>
  );
};

export default EmptyData;
