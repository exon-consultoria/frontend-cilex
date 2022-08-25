import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from 'services/api';
import { IRegisterEntry } from 'types/entry/entry';

import { Button,Header,InputFormik, ButtonBack, Select } from 'components'

import { Container, Main, FormCustom } from './styles';

export const RegisterEntry: React.FC = () => {
  const navigate = useNavigate();

  const formSchemaEntry = Yup.object().shape({
    date_income: Yup.string(),
    type: Yup.string(),
    financial_entity: Yup.string(),
    chart_of_accounts: Yup.string(),
    description: Yup.string(),
    value: Yup.number(),
    date_to_pay: Yup.string(),
    value_payed: Yup.number(),
    date_payed: Yup.string(),
    title_status: Yup.string(),
    payed_status: Yup.string(),
    cash_flow: Yup.number(),
  });

  const handleSubmitForm = useCallback(
    async (data: IRegisterEntry) => {
      try {
        const { 
          date_income,
          type,
          financial_entity,
          chart_of_accounts,
          description,
          value,
          date_to_pay,
          value_payed,
          date_payed,
          title_status,
          payed_status,
          cash_flow,
        } = data;

        api
          .post('/Entry', {
            date_income,
            type,
            financial_entity,
            chart_of_accounts,
            description,
            value,
            date_to_pay,
            value_payed,
            date_payed,
            title_status,
            payed_status,
            cash_flow,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            navigate('/financial/Entry');
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
        <ButtonBack destinationBack="/financial/Entry" />
        <Main>
          <Formik
            initialValues={{
              date_income: '',
              type: '',
              financial_entity: '',
              chart_of_accounts: '',
              description: '',
              value: 0,
              date_to_pay: '',
              value_payed: 0,
              date_payed: '',
              title_status: '',
              payed_status: '',
              cash_flow: 0,
            }}
            validationSchema={formSchemaEntry}
            onSubmit={handleSubmitForm}
          >
            {({ handleChange, touched, values, errors, handleSubmit }) => (
              <FormCustom onSubmit={handleSubmit}>
                <div id="align-inputs">
                  <InputFormik
                    name="date_income"
                    type="text"
                    placeholder="Data de entrada"
                    value={values.date_income}
                    onChange={handleChange('date_income')}
                    messageError={
                      errors.date_income && touched.date_income ? errors.date_income : ''
                    }
                    maxLength={6}
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
                    <option value='Custo'>Custo</option>
                    <option value='Despesa'>Despesa</option>
                  </Select>
                  <InputFormik
                    name="financial_entity"
                    type="text"
                    placeholder="Data de entrada"
                    value={values.financial_entity}
                    onChange={handleChange('financial_entity')}
                    messageError={
                      errors.financial_entity && touched.financial_entity ? errors.financial_entity : ''
                    }
                    maxLength={6}
                  />
                  <InputFormik
                    name="chart_of_accounts"
                    type="text"
                    placeholder="Data de entrada"
                    value={values.chart_of_accounts}
                    onChange={handleChange('chart_of_accounts')}
                    messageError={
                      errors.chart_of_accounts && touched.chart_of_accounts ? errors.chart_of_accounts : ''
                    }
                    maxLength={6}
                  />
                  <InputFormik
                    name="description"
                    type="text"
                    placeholder="Data de entrada"
                    value={values.description}
                    onChange={handleChange('description')}
                    messageError={
                      errors.description && touched.description ? errors.description : ''
                    }
                    maxLength={6}
                  />
                  <InputFormik
                    name="value"
                    type="text"
                    placeholder="Data de entrada"
                    value={values.value}
                    onChange={handleChange('value')}
                    messageError={
                      errors.value && touched.value ? errors.value : ''
                    }
                    maxLength={6}
                  />
                  <InputFormik
                    name="date_to_pay"
                    type="text"
                    placeholder="Data de entrada"
                    value={values.date_to_pay}
                    onChange={handleChange('date_to_pay')}
                    messageError={
                      errors.date_to_pay && touched.date_to_pay ? errors.date_to_pay : ''
                    }
                    maxLength={6}
                  />
                  <InputFormik
                    name="value_payed"
                    type="text"
                    placeholder="Data de entrada"
                    value={values.value_payed}
                    onChange={handleChange('value_payed')}
                    messageError={
                      errors.value_payed && touched.value_payed ? errors.value_payed : ''
                    }
                    maxLength={6}
                  />
                  <InputFormik
                    name="date_payed"
                    type="text"
                    placeholder="Data de entrada"
                    value={values.date_payed}
                    onChange={handleChange('date_payed')}
                    messageError={
                      errors.date_payed && touched.date_payed ? errors.date_payed : ''
                    }
                    maxLength={6}
                  />
                  <InputFormik
                    name="title_status"
                    type="text"
                    placeholder="Data de entrada"
                    value={values.title_status}
                    onChange={handleChange('title_status')}
                    messageError={
                      errors.title_status && touched.title_status ? errors.title_status : ''
                    }
                    maxLength={6}
                  />
                  <InputFormik
                    name="payed_status"
                    type="text"
                    placeholder="Data de entrada"
                    value={values.payed_status}
                    onChange={handleChange('payed_status')}
                    messageError={
                      errors.payed_status && touched.payed_status ? errors.payed_status : ''
                    }
                    maxLength={6}
                  />
                  <InputFormik
                    name="cash_flow"
                    type="text"
                    placeholder="Data de entrada"
                    value={values.cash_flow}
                    onChange={handleChange('cash_flow')}
                    messageError={
                      errors.cash_flow && touched.cash_flow ? errors.cash_flow : ''
                    }
                    maxLength={6}
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

