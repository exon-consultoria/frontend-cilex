import React, { useState, InputHTMLAttributes } from 'react';
import { Field, FieldProps } from 'formik';
import MaskedInput from 'react-text-mask';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputFormikProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<IconBaseProps>;
  messageError?: string;
  mask?: (string | RegExp)[];
}

const InputFormik: React.FC<InputFormikProps> = ({
  icon: Icon,
  messageError,
  mask,
  ...rest
}) => {
  const [inputFocus, setInputFocus] = useState(false);

  return (
    <Container isFocus={inputFocus} isError={!!messageError}>
      {Icon && <Icon size={20} />}

      {mask ? (
        <Field name={rest.name} {...rest}>
          {({ field }: FieldProps) => (
            <MaskedInput
              {...field}
              placeholder={rest.placeholder}
              mask={mask}
              type="text"
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          )}
        </Field>
      ) : (
        <Field
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          {...rest}
        />
      )}

      {messageError && (
        <Error title={messageError}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};
export default InputFormik;
