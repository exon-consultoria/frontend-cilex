import React from 'react';

import ButtonBack from '../../components/ButtonBack';
import DefaultTable from '../../components/DefaultTable';
import ChangeCompany from '../../components/ChangeCompany';
import Header from '../../components/Header';

import { Container, Main } from './styles';

const Module: React.FC = () => {
  const modules = [
    {
      id: 1,
      name: 'Financeiro',
      desc: 'Controle seu financeiro facilmente',
      url: '/',
      isActive: true,
      classIcon: 'bi bi-currency-dollar',
    },
    {
      id: 2,
      name: 'Logística',
      desc: 'Monitore seus produtos',
      url: '/',
      isActive: true,
      classIcon: 'bi bi-truck',
    },
    {
      id: 3,
      name: 'CRM',
      desc: 'Acompanhe seus clientes',
      url: '/',
      isActive: false,
      classIcon: 'bi bi-truck',
    },
    {
      id: 4,
      name: 'Pessoas',
      desc: 'Gerencia as pessoas',
      url: '/people',
      isActive: true,
      classIcon: 'bi bi-person',
    },
    {
      id: 5,
      name: 'Empresas',
      desc: 'Registre suas empresas',
      url: '/company',
      isActive: true,
      classIcon: 'bi bi-building',
    },
    {
      id: 6,
      name: 'Parâmetros Gerais',
      desc: 'Defina os parâmetros do sistema',
      url: '/',
      isActive: false,
      classIcon: 'bi bi-globe',
    },
    {
      id: 7,
      name: 'Cargos e Funções',
      desc: 'Adicione novos cargos',
      url: '/role',
      isActive: true,
      classIcon: 'bi bi-wrench',
    },
    {
      id: 8,
      name: 'Usuários',
      desc: 'Gerencie usuários pendentes e ativos',
      url: '/menu/users',
      isActive: true,
      classIcon: 'bi bi-person-circle',
    },
    {
      id: 9,
      name: 'Grupo de Usuários',
      desc: 'Gerencia grupos de usuários e suas permissões',
      url: '/group',
      isActive: true,
      classIcon: 'bi bi-people',
    },
    {
      id: 10,
      name: 'Módulos',
      desc: 'Gerencie seus módulos disponíveis',
      url: '/',
      isActive: true,
      classIcon: 'bi bi-box',
    },
  ];

  return (
    <>
      <Container>
        <Header pageName="Empresas" />
        <Main>
          <div id="align-content">
            <ButtonBack destinationBack="/menu" />
            <DefaultTable tbh={['Módulo', 'Descrição', 'Ativo']}>
              <tbody>
                {modules.map(module => (
                  <tr key={module.id}>
                    <td>{module.name}</td>
                    <td>{module.desc}</td>
                    <td>{module.isActive ? 'Sim' : 'Não'}</td>
                  </tr>
                ))}
              </tbody>
            </DefaultTable>
          </div>
        </Main>
      </Container>
      <ChangeCompany />
    </>
  );
};

export default Module;
