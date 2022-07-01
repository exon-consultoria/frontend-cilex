import React from 'react';

import { Container } from './styles';

interface ModuleCardProps {
  to: string;
  classIcon: string;
  title: string;
  description: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  to,
  classIcon,
  title,
  description,
}) => {
  return (
    <Container to={to}>
      <i className={classIcon} />
      <h3>{title}</h3>
      <p>{description}</p>
    </Container>
  );
};

export default ModuleCard;
