import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { MdClose } from 'react-icons/md';

import { Background, Content } from './styles';

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ visible, setVisible, children }) => {
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
        {children}
      </Content>
    </Background>
  ) : null;
};

export default Modal;
