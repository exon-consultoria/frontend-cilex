import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';
import api from '../../../../services/api';

interface Product {
  id: string;
  code: string;
  description: string;
}

const ListGroup: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get('/product').then(response => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Produto" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/product/register">Novo</NewButton>
          {products.length > 0 ? (
            <DefaultTable tbh={['Código', 'Produto']}>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.code}</td>
                    <td>{product.description}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/product/${product.id}`}
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

export default ListGroup;
