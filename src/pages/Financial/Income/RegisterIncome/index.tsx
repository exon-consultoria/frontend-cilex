import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from 'services/api';
import { IRegisterIncome } from 'types/Income/income';

import { Button,Header,InputFormik, ButtonBack, Select } from 'components'

import { Container, Main, FormCustom } from './styles';

export const RegisterIncome: React.FC = () => {
  const navigate = useNavigate();

  const formSchemaIncome = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório').length(4),
    account: Yup.string().required('Canil Obrigatório'),
    type: Yup.string().required('Canil Obrigatório'),
  });

  const handleSubmitForm = useCallback(
    async (data: IRegisterIncome) => {
      try {
        const { code, account,type } = data;

        api
          .post('/income', {
            code,
            account,
            type
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            navigate('/financial/income');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              'There\'s already an entity registered with the same code'
            ) {
              toast.error('Já existe uma conta cadastrada com o mesmo código!');
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro da Conta!');
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <Header pageName="Cadastro de Contas" />
        <ButtonBack destinationBack="/financial/income" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              account: '',
              type: 'Custo'
            }}
            validationSchema={formSchemaIncome}
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
                    name="account"
                    type="text"
                    placeholder="Conta"
                    value={values.account}
                    onChange={handleChange('account')}
                    messageError={
                      errors.account && touched.account
                        ? errors.account
                        : ''
                    }
                  />
                  <Select
                    name="type"
                    value={values.type}
                    onChange={handleChange('type')}
                    messageError={
                      errors.type && touched.type
                        ? errors.type
                        : ''
                    }
                  >
                    <option value="">Escolha um tipo</option>
                    <option value='Receita'>Receita</option>
                    <option value='Despesa'>Despesa</option>
                    <option value='Custo'>Custo</option>
                  </Select>
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

