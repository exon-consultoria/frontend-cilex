import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';

import api from '../../../../services/api';
import { IRegisterType } from '../../../../types/storage/type';

import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import InputFormik from '../../../../components/InputFormik';
import ButtonBack from '../../../../components/ButtonBack';

import { Container, Main, FormCustom } from './styles';

const formSchemaType = Yup.object().shape({
  code: Yup.string()
    .required('Código Obrigatório')
    .max(6, 'Tamanho máximo de 6 caracteres'),
  description: Yup.string().required('Descrição Obrigatória'),
  acceptStructure: Yup.boolean(),
});

const RegisterType: React.FC = () => {
  let navigate = useNavigate();
  const { colors } = useContext(ThemeContext);

  const [acceptStructure, setAcceptStructure] = useState(false);

  const handleSubmitForm = useCallback(
    async (data: IRegisterType) => {
      try {
        const { code, description } = data;
        api
          .post('/product_type', {
            code,
            description,
            accept_structure: acceptStructure,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            navigate('/inventory/type');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              "There's already an entity registered with the same code"
            ) {
              toast.error('Já existe um tipo cadastrado com o mesmo código!');
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Tipo!');
      }
    },
    [history, acceptStructure],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Tipo" />
        <ButtonBack destinationBack="/inventory/type" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              description: '',
              accept_structure: false,
            }}
            validationSchema={formSchemaType}
            onSubmit={handleSubmitForm}
          >
            {({ handleChange, touched, values, errors, handleSubmit }) => (
              <FormCustom onSubmit={handleSubmit}>
                <div id="align-inputs">
                  <InputFormik
                    name="code"
                    type="text"
                    placeholder="Código"
                    value={values.code}
                    onChange={handleChange('code')}
                    messageError={
                      errors.code && touched.code ? errors.code : ''
                    }
                    maxLength={6}
                  />
                  <InputFormik
                    name="description"
                    type="text"
                    placeholder="Descrição"
                    value={values.description}
                    onChange={handleChange('description')}
                    messageError={
                      errors.description && touched.description
                        ? errors.description
                        : ''
                    }
                  />
                  <div id="align-switch">
                    <p>Aceita estrutura ?</p>
                    <Switch
                      onChange={() => setAcceptStructure(!acceptStructure)}
                      checked={acceptStructure}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor={colors.main}
                    />
                  </div>
                </div>
                <div id="align-button-save">
                  <Button layoutColor="button-green" type="submit">
                    <FiSave size={24} />
                    <span>Salvar</span>
                  </Button>
                </div>
              </FormCustom>
            )}
          </Formik>
        </Main>
      </Container>
    </>
  );
};

export default RegisterType;
