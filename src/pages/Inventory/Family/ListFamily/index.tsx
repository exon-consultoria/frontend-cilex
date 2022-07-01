import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from '../../../../services/api';
import { IFamily } from '../../../../types/storage/family';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';

const ListFamily: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const [families, setFamilies] = useState<IFamily[]>([]);

  useEffect(() => {
    api.get('product_family').then(response => {
      setFamilies(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Família" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/family/register">Novo</NewButton>
          {families.length > 0 ? (
            <DefaultTable tbh={['Código', 'Família']}>
              <tbody>
                {families.map(family => (
                  <tr key={family.id}>
                    <td>{family.code}</td>
                    <td>{family.description}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/family/${family.id}`}
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
        </div>
      </Main>
    </Container>
  );
};

export default ListFamily;
