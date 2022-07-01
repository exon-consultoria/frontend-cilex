import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiShare2 } from 'react-icons/fi';
import { Checkbox } from '@material-ui/core';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

import Button from '../../../components/Button';
import ButtonBack from '../../../components/ButtonBack';
import NewButton from '../../../components/NewButton';
import DefaultTable from '../../../components/DefaultTable';
import ChangeCompany from '../../../components/ChangeCompany';
import Modal from '../../../components/Modal';
import Header from '../../../components/Header';
import EmptyData from '../../../components/EmptyData';

import {
  Container,
  Main,
  ContainerContentModalShare,
  ContentModalShare,
} from './styles';

export interface Person {
  id: string;
  code: string;
  cnpj: string;
  cpf: string;
  nome: string;
  razao_social: string;
  nome_fantasia: string;
}

interface UserCompany {
  id: string;
  code: string;
  razao_social: string;
}

const ListPeople: React.FC = () => {
  const { user } = useAuth();
  const { colors } = useContext(ThemeContext);

  const [peoples, setPeoples] = useState<Person[]>([]);
  const [userCompanies, setUserCompanies] = useState<UserCompany[]>([]);
  const [visibleModalShare, setVisibleModalShare] = useState(false);

  useEffect(() => {
    api.get<Person[]>('/person').then(response => {
      setPeoples(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<UserCompany[]>(`/usercompany?user=${user.id}`).then(response => {
      setUserCompanies(response.data);
    });
  }, [user.id]);

  return (
    <>
      <Container>
        <Header pageName="Pessoas" />
        <Main>
          <div id="align-content">
            <ButtonBack destinationBack="/menu" />
            <NewButton to="/people/register">Novo</NewButton>
            {peoples.length > 0 ? (
              <DefaultTable tbh={['Código', 'CNPJ/CPF', 'Razão Social/Nome']}>
                <tbody>
                  {peoples.map(people => (
                    <tr key={people.code}>
                      <td>{people.code}</td>
                      <td>{people.cnpj || people.cpf}</td>
                      <td>
                        {people.razao_social ||
                          people.nome_fantasia ||
                          people.nome}
                      </td>

                      <td id="td-options">
                        <button
                          type="button"
                          id="share"
                          onClick={() => setVisibleModalShare(true)}
                        >
                          <FiShare2 size={24} color={colors.main} />
                        </button>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/people/${people.id}`}
                        >
                          <FiEye size={24} color={colors.main} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </DefaultTable>
            ) : (
              <EmptyData />
            )}
            <Modal
              visible={visibleModalShare}
              setVisible={setVisibleModalShare}
            >
              <ContentModalShare>
                <h2>Compartilhamento de Cadastro</h2>

                <ContainerContentModalShare>
                  {userCompanies.map(company => (
                    <div id="row-share" key={company.id}>
                      <Checkbox color="primary" />
                      <h4>{company.razao_social}</h4>
                    </div>
                  ))}
                </ContainerContentModalShare>

                <Button
                  layoutColor="button-green"
                  onClick={() => setVisibleModalShare(false)}
                >
                  Atualizar
                </Button>
              </ContentModalShare>
            </Modal>
          </div>
        </Main>
      </Container>
      <ChangeCompany />
    </>
  );
};

export default ListPeople;
