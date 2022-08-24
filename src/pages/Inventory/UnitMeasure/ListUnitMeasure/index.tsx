import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from 'services/api';
import { IUnitMeasure } from 'types/storage/unitMeasure';

import { NewButton, DefaultTable, Header, ButtonBack, EmptyData } from 'components'

import { Container, Main } from './styles';

const ListUnitMeasure: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const [unitsMeasure, setUnitsMeasure] = useState<IUnitMeasure[]>([]);

  useEffect(() => {
    api.get('/product_um').then(response => {
      setUnitsMeasure(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Unidade de Medida de Compra" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/unitmeasure/register">Novo</NewButton>
          {unitsMeasure.length > 0 ? (
            <DefaultTable tbh={['Descrição', 'Unidade de Medida']}>
              <tbody>
                {unitsMeasure.map(unit => (
                  <tr key={unit.id}>
                    <td>{unit.code}</td>
                    <td>{unit.description}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/unitmeasure/${unit.id}`}
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

export default ListUnitMeasure;
