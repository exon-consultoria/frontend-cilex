import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from '../../../../services/api';
import { IRegisterEnclosure } from '../../../../types/pet/enclosure';

import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import InputFormik from '../../../../components/InputFormik';
import ButtonBack from '../../../../components/ButtonBack';

import { Container, Main, FormCustom } from './styles';

const RegisterEnclosure: React.FC = () => {
  let navigate = useNavigate();

  const formSchemaEnclosure = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório'),
    description: Yup.string().required('Canil Obrigatório'),
  });

  const handleSubmitForm = useCallback(
    async (data: IRegisterEnclosure) => {
      try {
        const { code, description } = data;

        api
          .post('/enclosure', {
            code,
            description,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            navigate('/pet/enclosure');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              "There's already an entity registered with the same code"
            ) {
              toast.error('Já existe um Canil cadastrado com o mesmo código!');
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Canil!');
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Canis" />
        <ButtonBack destinationBack="/pet/enclosure" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              description: '',
            }}
            validationSchema={formSchemaEnclosure}
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
                    placeholder="Canil"
                    value={values.description}
                    onChange={handleChange('description')}
                    messageError={
                      errors.description && touched.description
                        ? errors.description
                        : ''
                    }
                  />
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

export default RegisterEnclosure;
