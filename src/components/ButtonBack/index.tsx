import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { ThemeContext } from 'styled-components';

import { Container } from './styles';

interface ButtonBackProps {
  destinationBack: string;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ destinationBack }) => {
  let navigate = useNavigate();
  const { colors } = useContext(ThemeContext);

  const handleBack = useCallback((): void => {
    navigate(destinationBack);
  }, [history, destinationBack]);

  return (
    <Container type="button" onClick={() => handleBack()}>
      <HiOutlineArrowLeft size={42} color={colors.main} />
    </Container>
  );
};

export default ButtonBack;
