/* eslint-disable import/no-duplicates */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import cilexLogo from '../../assets/cilex-logo.png';

import orange from '../../styles/theme/orange';
import { useToggleTheme } from '../../hooks/useToggleTheme';
import { useAuth } from '../../hooks/auth';
import { useCompany } from '../../hooks/useCompany';

import Button from '../Button';

import { Container, Greetings } from './styles';

interface HeaderProps {
  message: string;
}

const Header: React.FC<HeaderProps> = ({ message }) => {
  let navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toggleTheme } = useToggleTheme();
  const { company, clearCompany } = useCompany();

  const [date, setDate] = useState<string[]>([]);

  useEffect(() => {
    const data = new Date();
    const dateFormatted = format(data, 'EEEE/dd/MMMM/yyyy', { locale: ptBR });
    const dateSplitted = dateFormatted.split('/');

    setDate([
      dateSplitted[0].charAt(0).toUpperCase() + dateSplitted[0].slice(1),
      dateSplitted[1],
      dateSplitted[2],
      dateSplitted[3],
    ]);
  }, []);

  const handleLogout = useCallback((): void => {
    signOut();
    toggleTheme(orange);
    clearCompany();
    navigate('/');
  }, [history, signOut, toggleTheme, clearCompany]);

  return (
    <Container>
      <div id="container-logo">
        {company ? (
          <img src={company.company_logo} alt="logo" />
        ) : (
          <img src={cilexLogo} alt="logo" />
        )}
      </div>

      <Greetings>
        <h2>Bom Dia {user.name.split(' ')[0]} !</h2>
        {date && (
          <h3>{`${date[0]}, ${date[1]} de ${date[2]} de ${date[3]}`}</h3>
        )}

        <p>{message}</p>
      </Greetings>
      <Button onClick={() => handleLogout()} layoutColor="button-outline">
        <FiPower size={24} />
      </Button>
    </Container>
  );
};

export default Header;
