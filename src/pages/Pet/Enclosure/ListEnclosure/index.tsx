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
            <DefaultTable tbh={['Código', 'Canil', 'Alocação']}>
              <tbody>
                {enclosures.map(enclosure => (
                  <tr key={enclosure.id}>
                    <td>{enclosure.code}</td>
                    <td>{enclosure.description}</td>
                    <td>{enclosure.size}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/pet/enclosure/${enclosure.id}`}
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

export default ListEnclosure;
