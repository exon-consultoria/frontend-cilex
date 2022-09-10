import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from 'services/api';
import { IRegisterEntry } from 'types/entry/entry';

import { Button,Header,InputFormik, ButtonBack, Select } from 'components'

import { Container, Main, FormCustom, ContainerInputWithLabel } from './styles';
import { IIncome } from 'types/Income/income';

import { convertCurrencyToNumber } from 'utils/convertCurrencyToNumber'
import { numberMask } from 'utils/masks';

export const RegisterEntry: React.FC = () => {
  const navigate = useNavigate();
  const [incomes,setIncomes] = useState<IIncome[]>([])

  useEffect(() => {
    api.get('/income').then(response => {
      setIncomes(response.data)
    })
  }, []);

  const formSchemaEntry = Yup.object().shape({
    date_income: Yup.string(),
    type: Yup.string(),
    financial_entity: Yup.string(),
    description: Yup.string(),
    value: Yup.string(),
    date_to_pay: Yup.string(),
    value_payed: Yup.string(),
    date_payed: Yup.string(),
    title_status: Yup.string(),
    payed_status: Yup.string(),
    cash_flow: Yup.string(),
    income_id: Yup.string().notRequired()
  });

  const handleSubmitForm = useCallback(
    async (data: IRegisterEntry) => {
      try {
        const { 
          date_income,
          type,
          financial_entity,
          description,
          value,
          date_to_pay,
          value_payed,
          date_payed,
          title_status,
          payed_status,
          cash_flow,
          income_id
        } = data;

        const valueFormatted = convertCurrencyToNumber(value)
        const valuePayedFormatted = convertCurrencyToNumber(value_payed)
        const cashFlowFormatted = convertCurrencyToNumber(cash_flow)

        api
          .post('/entry', {
            date_income,
            type,
            financial_entity,
            description,
            value: valueFormatted,
            date_to_pay,
            value_payed: valuePayedFormatted,
            date_payed,
            title_status,
            payed_status,
            cash_flow: cashFlowFormatted,
            income_id: income_id || undefined
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
              description: '',
              value: '',
              date_to_pay: '',
              value_payed: '',
              date_payed: '',
              title_status: '',
              payed_status: '',
              cash_flow: '',
              income_id: ''
            }}
            validationSchema={formSchemaEntry}
            onSubmit={handleSubmitForm}
          >
            {({ handleChange, touched, values, errors, handleSubmit }) => (
              <FormCustom onSubmit={handleSubmit}>
                <div id="align-inputs">
                  <ContainerInputWithLabel>
                    <p>Data de entrada: </p>
                    <Field
                      type="date"
                      name="date_income"
                      value={values.date_income}
                      onChange={handleChange('date_income')}
                    />
                  </ContainerInputWithLabel>
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
                    <option value="">Escolha um tipo de lançamento</option>
                    <option value='Entrada'>Entrada</option>
                    <option value='Saida'>Saída</option>
                  </Select>
                  <InputFormik
                    name="financial_entity"
                    type="text"
                    placeholder="Entidade financeira"
                    value={values.financial_entity}
                    onChange={handleChange('financial_entity')}
                    messageError={
                      errors.financial_entity && touched.financial_entity ? errors.financial_entity : ''
                    }
                  />
                  <Select
                    name="income_id"
                    value={values.income_id}
                    onChange={handleChange('income_id')}
                    messageError={
                      errors.income_id && touched.income_id
                        ? errors.income_id
                        : ''
                    }
                  >
                    <option value=''>Selecione um plano de contas</option>
                    {incomes?.map((income) => (
                      <option value={income.id}>{income.account}</option>
                    ))}
                  </Select>
                  <InputFormik  
                    name="description"
                    type="text"
                    placeholder="Descrição"
                    value={values.description}
                    onChange={handleChange('description')}
                    messageError={
                      errors.description && touched.description ? errors.description : ''
                    }
                  />
                  <InputFormik
                    name="value"
                    type="text"
                    placeholder="Valor"
                    value={values.value}
                    mask={numberMask}
                    onChange={handleChange('value')}
                    messageError={
                      errors.value && touched.value ? errors.value : ''
                    }
                  />
                  <ContainerInputWithLabel>
                    <p>Vencimento: </p>
                    <Field
                      type="date"
                      name="date_to_pay"
                      value={values.date_to_pay}
                      onChange={handleChange('date_to_pay')}
                    />
                  </ContainerInputWithLabel>
                  <InputFormik
                    name="value_payed"
                    type="text"
                    placeholder="Valor da baixa"
                    mask={numberMask}
                    value={values.value_payed}
                    onChange={handleChange('value_payed')}
                    messageError={
                      errors.value_payed && touched.value_payed ? errors.value_payed : ''
                    }
                  />
                  <ContainerInputWithLabel>
                    <p>Data da baixa: </p>
                    <Field
                      type="date"
                      name="date_payed"
                      value={values.date_payed}
                      onChange={handleChange('date_payed')}
                    />
                  </ContainerInputWithLabel>
                  <Select
                    name="title_status"
                    value={values.title_status}
                    onChange={handleChange('title_status')}
                    messageError={
                      errors.title_status && touched.title_status
                        ? errors.title_status
                        : ''
                    }
                  >
                    <option value="">Status do título</option>
                    <option value='Entrada'>Atrasado</option>
                    <option value='Saida'>Pago</option>
                  </Select>
                  <Select
                    name="payed_status"
                    value={values.payed_status}
                    onChange={handleChange('payed_status')}
                    messageError={
                      errors.payed_status && touched.payed_status
                        ? errors.payed_status
                        : ''
                    }
                  >
                    <option value="">Status da baixa</option>
                    <option value='Entrada'>Atrasada</option>
                    <option value='Saida'>Paga</option>
                  </Select>
                  <InputFormik
                    name="cash_flow"
                    type="text"
                    placeholder="Fluxo de caixa"
                    value={values.cash_flow}
                    mask={numberMask}
                    onChange={handleChange('cash_flow')}
                    messageError={
                      errors.cash_flow && touched.cash_flow ? errors.cash_flow : ''
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

