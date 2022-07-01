import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from '../../../services/api';

import Button from '../../../components/Button';
import Header from '../../../components/Header';
import InputFormik from '../../../components/InputFormik';
import ButtonBack from '../../../components/ButtonBack';

import { Container, Main, FormCustom, ContainerInputColor } from './styles';

interface RegisterWorkForm {
  code: string;
  description: string;
  color: string;
}

const RegisterWork: React.FC = () => {
  let navigate = useNavigate();

  const formSchemaWork = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório'),
    description: Yup.string(),
    color: Yup.string(),
  });

  const handleSubmitForm = useCallback(
    async (data: RegisterWorkForm) => {
      try {
        const { code, description, color } = data;

        api
          .post('/work', {
            code,
            description,
            color,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            navigate('/work');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              "There's already an entity registered with the same code"
            ) {
              toast.error(
                'Já existe um trabalho cadastrado com o mesmo código!',
              );
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Trabalho!');
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Trabalho" />
        <ButtonBack destinationBack="/work" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              description: '',
              color: '',
            }}
            validationSchema={formSchemaWork}
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
                    placeholder="Trabalho"
                    value={values.description}
                    onChange={handleChange('description')}
                    messageError={
                      errors.description && touched.description
                        ? errors.description
                        : ''
                    }
                  />
                  <ContainerInputColor>
                    <span>Cor</span>
                    <input
                      type="color"
                      name="main"
                      value={values.color}
                      onChange={handleChange('color')}
                    />
                    <span>{values.color}</span>
                  </ContainerInputColor>
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

export default RegisterWork;
