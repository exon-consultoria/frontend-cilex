import React, { useCallback } from 'react';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { Container } from './styles';

export const ChangeCompany: React.FC = ({ ...rest }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('/chosecompany');
  }, [history]);

  return (
    <Container type="button" onClick={() => handleClick()} {...rest}>
      <HiOutlineSwitchVertical size={28} color="#FFF" />
    </Container>
  );
};

