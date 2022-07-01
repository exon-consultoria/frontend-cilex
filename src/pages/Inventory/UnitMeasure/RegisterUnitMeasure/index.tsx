import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from '../../../../services/api';
import { IRegisterUnitMeasure } from '../../../../types/storage/unitMeasure';

import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import InputFormik from '../../../../components/InputFormik';
import ButtonBack from '../../../../components/ButtonBack';

import { Container, Main, FormCustom } from './styles';

const formSchemaUnitMeasure = Yup.object().shape({
  code: Yup.string()
    .required('Código Obrigatório')
    .max(6, 'Tamanho máximo de 6 caracteres'),
  description: Yup.string().required('Descrição Obrigatória'),
});

const RegisterUnitMeasure: React.FC = () => {
  let navigate = useNavigate();

  const handleSubmitForm = useCallback(
    async (data: IRegisterUnitMeasure) => {
      try {
        const { code, description } = data;
        api
          .post('/product_um', {
            code,
            description,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            navigate('/inventory/unitmeasure');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              "There's already an entity registered with the same code"
            ) {
              toast.error(
                'Já existe uma unidade de medida cadastrada com o mesmo código!',
              );
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro da Unidade de Medida!');
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Unidade de Medida" />
        <ButtonBack destinationBack="/inventory/unitmeasure" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              description: '',
            }}
            validationSchema={formSchemaUnitMeasure}
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

export default RegisterUnitMeasure;
