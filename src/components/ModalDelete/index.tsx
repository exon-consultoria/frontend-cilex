import React, { useContext } from 'react';
import { MdClose } from 'react-icons/md';
import { ThemeContext } from 'styled-components';

import Button from '../Button';

import { Background, Content } from './styles';

interface ModalDeleteProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionToDelete: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  visible,
  setVisible,
  actionToDelete,
}) => {
  const { colors } = useContext(ThemeContext);

  return visible ? (
    <Background>
      <Content>
        <button
          type="button"
          id="button-exit"
          onClick={() => {
            setVisible(false);
          }}
        >
          <MdClose size={20} color={colors.main} />
        </button>
        <h3>Realmente deseja excluir essa informação ?</h3>

        <Button layoutColor="button-filled" onClick={actionToDelete}>
          Excluir
        </Button>
      </Content>
    </Background>
  ) : null;
};

export default ModalDelete;
