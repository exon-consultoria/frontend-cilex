import React from 'react';
import { Field } from 'formik';

import { Container } from './styles';

interface CheckboxProps {
  name: string;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label }) => {
  return (
    <Container>
      <label htmlFor="checkboxReference">{label}</label>
      <Field type="checkbox" id="checkboxReference" name={name} />
    </Container>
  );
};

export default Checkbox;
