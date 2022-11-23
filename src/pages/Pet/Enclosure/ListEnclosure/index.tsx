import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from 'services/api';
import { IEnclosure } from 'types/pet/enclosure';

import { NewButton, DefaultTable, Header, ButtonBack, EmptyData} from 'components';

import { Container, Main } from './styles';

const ListEnclosure: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const [enclosures, setEnclosures] = useState<IEnclosure[]>([]);

  useEffect(() => {
    api.get<IEnclosure[]>('/enclosure').then(response => {
      setEnclosures(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Canis" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/pet" />
          <div id="align-buttons">
            <NewButton to="/pet/enclosure/register">Novo</NewButton>
            <NewButton to="/pet/enclosure/all">Ver Todos</NewButton>
          </div>
          {enclosures.length > 0 ? (
            <DefaultTable tbh={['Código', 'Canil', 'Alocação','Disponíveis']}>
              <tbody>
                {enclosures.map(enclosure => {
                  const {
                    id,
                    code,
                    description,
                    size,
                    enclosure_size_big_available,
                    enclosure_size_medium_available,
                    enclosure_size_small_available 
                  } = enclosure

                  const available = size === 'g' 
                    ? enclosure_size_big_available 
                    : size === 'm' 
                      ? enclosure_size_medium_available 
                      : enclosure_size_small_available

                  return (
                    <tr key={id}>
                      <td>{code}</td>
                      <td>{description}</td>
                      <td>{size}</td>
                      <td>{available}</td>
                      <td>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/pet/enclosure/${enclosure.id}`}
                        >
                          <FiEye size={24} color={colors.main} />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
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

export default ListEnclosure;
