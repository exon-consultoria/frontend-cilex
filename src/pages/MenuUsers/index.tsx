import React, { useEffect, useState, useContext } from 'react';
import { FiUserCheck, FiUserMinus } from 'react-icons/fi';
import { MdNotificationsActive } from 'react-icons/md';
import { ThemeContext } from 'styled-components';

import Header from '../../components/Header';
import ButtonBack from '../../components/ButtonBack';

import { Container, Main, Module } from './styles';

const MenuUsers: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const [hasUserPending, setHasUserPending] = useState(false);

  useEffect(() => {
    const jsonHasUser = localStorage.getItem('@Cilex:hasPendingUser');

    if (jsonHasUser) setHasUserPending(JSON.parse(jsonHasUser));
  }, []);

  return (
    <>
      <Container>
        <Header pageName="Menu de Usuários" />
        <ButtonBack destinationBack="/menu" />
        <Main>
          <Module to="/users/pending">
            {hasUserPending && (
              <div id="notification">
                <MdNotificationsActive size={16} color="#fff" />
              </div>
            )}
            <FiUserMinus size={44} color={colors.main} />
            <h3>Pendentes</h3>
            <p>Área destinada a ativação de seus usuários</p>
          </Module>
          <Module to="/users/active">
            <FiUserCheck size={44} color={colors.main} />
            <h3>Usuários</h3>
            <p>Área destinada a controle e monitoramento de usuários</p>
          </Module>
        </Main>
      </Container>
    </>
  );
};

export default MenuUsers;
