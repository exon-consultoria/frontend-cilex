import React, { useCallback, useEffect, useState, useContext } from 'react';
import { Params, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import api from 'services/api';
import { useCrudModules } from 'hooks/useCrudModules';
import { IRegisterEntry } from 'types/entry/entry';

import { Header,Button,InputFormik, ButtonBack, ModalDelete, Select } from 'components'

import { Container, Main, HeaderContent, FormCustom, ContainerInputWithLabel } from './styles';
import { IIncome } from 'types/Income/income';
import { numberMask } from 'utils/masks';

export const EditEntry: React.FC = () => {
  const navigate = useNavigate();
  const { id }: Readonly<Params<string>> = useParams();
  const { colors } = useContext(ThemeContext);
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [entry, setEntry] = useState({} as IRegisterEntry);
  const [incomes,setIncomes] = useState<IIncome[]>([])

  useEffect(() => {
    api.get<IRegisterEntry>(`/entry/${id}`).then(response => {
      setEntry(response.data);
    });
    api.get('/income').then(response => {
      setIncomes(response.data)
    })
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: IRegisterEntry) => {
      try {
        api
          .put(`/entry/${id}`, {
            date_income: data.date_income,
            type: data.type,
            financial_entity: data.financial_entity,
            description: data.description,
            value: data.value,
            date_to_pay: data.date_to_pay,
            value_payed: data.value_payed,
            date_payed: data.date_payed,
            title_status: data.title_status,
            payed_status: data.payed_status,
            cash_flow: data.cash_flow,
            income_id: data.income_id
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            navigate('/financial/entry');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              'There\'s already an entity registered with the same code'
            ) {
              toast.error('Já existe uma conta cadastrado com o mesmo código!');
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização da conta!');
      }
    },
    [history, id],
  );

  const formSchemaEnclosureEdit = Yup.object().shape({
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
    income_id: Yup.string(),
  });
  
  return (
    <>
      <Container>
        <Header pageName="Editar Lançamento" />
        {entry && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/financial/entry" />
              </div>
              <div id="container-titles">
                <h2>Entidade Financeira: {entry.financial_entity}</h2>
                <h2>Tipo: {entry.type}</h2>
                <h2>Descrição: {entry.description}</h2>
                <h2>Valor: {entry.value}</h2>
              </div>
              <div id="container-buttons-actions">
                <Button
                  layoutColor="button-filled"
                  onClick={() => setEditting(!editting)}
                >
                  <HiOutlinePencilAlt size={24} color="#fefefe" />
                </Button>
                <Button
                  layoutColor="button-outline"
                  onClick={() => setShowModalDelete(true)}
                >
                  <HiOutlineTrash size={24} color={colors.main} />
                </Button>
              </div>
            </HeaderContent>

            {editting && (
              <Formik
                initialValues={{
                  date_income: entry.date_income,
                  type: entry.type,
                  financial_entity: entry.financial_entity,
                  description: entry.description,
                  value: entry.value,
                  date_to_pay: entry.date_to_pay,
                  value_payed: entry.value_payed,
                  date_payed: entry.date_payed,
                  title_status: entry.title_status,
                  payed_status: entry.payed_status,
                  cash_flow: entry.cash_flow,
                  income_id: entry.income_id
                }}
                validationSchema={formSchemaEnclosureEdit}
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
                          onChange={handleChange('born_at')}
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
                        <option disabled>Selecione um tipo</option>
                        <option value='Entrada'>Entrada</option>
                        <option value='Saida'> Saida</option>
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
                      <InputFormik
                        name="title_status"
                        type="text"
                        placeholder="Status do titulo"
                        value={values.title_status}
                        onChange={handleChange('title_status')}
                        messageError={
                          errors.title_status && touched.title_status ? errors.title_status : ''
                        }
                      />
                      <InputFormik
                        name="payed_status"
                        type="text"
                        placeholder="Status da baixa"
                        value={values.payed_status}
                        onChange={handleChange('payed_status')}
                        messageError={
                          errors.payed_status && touched.payed_status ? errors.payed_status : ''
                        }
                      />
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
                      <Select
                        name="income_id"
                        value={values.income_id}
                        onChange={handleChange('income_id')}
                        messageError={
                          errors.type && touched.type
                            ? errors.type
                            : ''
                        }
                      >
                        <option value=''>Selecione um plano de contas</option>
                        {incomes?.map((income) => (
                          <option value={income.id}>{income.account}</option>
                        ))}
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
            )}
          </Main>
        )}
      </Container>
      <ModalDelete
        visible={showModalDelete}
        setVisible={setShowModalDelete}
        actionToDelete={() => {
          deleteDataFromModule({ id, route: 'entry', routePush: 'financial' });
        }}
      />
    </>
  );
};

