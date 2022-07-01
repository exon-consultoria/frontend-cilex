import React, { useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import CompromiseRow from '../CompromiseRow';

import { Container } from './styles';

interface Compromise {
  id: string;
  date: string;
  hour: string;
  done: boolean;
  work: {
    id: string;
    color: string;
    description: string;
  };
  pet: {
    id: string;
    name: string;
  };
  owner: {
    id: string;
    nome?: string;
    razao_social?: string;
    endereco: string;
  };
  recurrence?: string;
}

interface ListCompromisesProps {
  dayClicked: string;
  compromises: Compromise[];
  renderDay: (day: Date | string) => void;
}

const ListCompromises: React.FC<ListCompromisesProps> = ({
  dayClicked,
  compromises,
  renderDay,
}) => {
  const { colors } = useContext(ThemeContext);
  const [showDetailCompromise, setShowDetailCompromise] = useState(false);

  return (
    <Container>
      <div id="containerHeader">
        <p>Dia: {dayClicked}</p>
        <button
          type="button"
          onClick={() => setShowDetailCompromise(!showDetailCompromise)}
        >
          {showDetailCompromise ? (
            <FiEyeOff size={24} color={colors.main} />
          ) : (
            <FiEye size={24} color={colors.main} />
          )}
        </button>
      </div>

      <div id="contentCompromises">
        {compromises.length === 0 && (
          <h3>Não há serviços listados para este dia!</h3>
        )}

        {compromises.map(compromise => {
          if (compromise.date === dayClicked) {
            return (
              <CompromiseRow
                key={compromise.id}
                compromise={compromise}
                showDetail={showDetailCompromise}
                renderDay={renderDay}
              />
            );
          }

          return null;
        })}
      </div>
    </Container>
  );
};

export default ListCompromises;
