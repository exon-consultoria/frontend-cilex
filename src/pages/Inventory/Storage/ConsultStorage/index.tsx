import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import DefaultTable from '../../../../components/DefaultTable';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';
import DefaultLayout from '../../../../components/DefaultLayout';
import api from '../../../../services/api';

interface ConsultStorageParams {
  id: string;
}

interface ConsultStorageProducts {
  description: string;
  quantity: string;
}

const ConsultStorage: React.FC = () => {
  const { id } = useParams<ConsultStorageParams>();

  const [products, setProducts] = useState<ConsultStorageProducts[]>([]);

  useEffect(() => {
    try {
      api
        .post(`/product/calculateInventory`, {
          storage_id: id,
          startDate: '2021-11-26 17:47:03.050257',
          endDate: '2022-01-31T22:44:04.467Z',
        })
        .then(response => {
          setProducts(response.data);
        });
    } catch {
      console.log('Error');
    }
  }, [id]);

  return (
    <DefaultLayout pageNameHeader="Consultar Estoque">
      <div id="align-content">
        <ButtonBack destinationBack="/inventory/storage" />
        {products.length > 0 ? (
          <DefaultTable tbh={['Produto', 'Quantidade']}>
            <tbody>
              {products.map(product => (
                <tr key={product.description}>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </DefaultTable>
        ) : (
          <EmptyData />
        )}
      </div>
    </DefaultLayout>
  );
};

export default ConsultStorage;
