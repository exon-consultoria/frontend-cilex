import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import api from 'services/api';
import { useCrudModules } from 'hooks/useCrudModules';
import { IRegisterEntry } from 'types/entry/entry';

import { Header,Button,InputFormik, ButtonBack, ModalDelete, Select } from 'components'

import { Container, Main, HeaderContent, FormCustom } from './styles';

export const EditEntry: React.FC = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const { colors } = useContext(ThemeContext);
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [entry, setentry] = useState({} as IRegisterEntry);

  useEffect(() => {
    api.get<IRegisterEntry>(`/entry/${id}`).then(response => {
      setentry(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: IRegisterEntry) => {
      try {
        api
          .put(`/entry/${id}`, {
            date_income: data.date_income,
            type: data.type,
            financial_entity: data.financial_entity,
            chart_of_accounts: data.chart_of_accounts,
            description: data.description,
            value: data.value,
            date_to_pay: data.date_to_pay,
            value_payed: data.value_payed,
            date_payed: data.date_payed,
            title_status: data.title_status,
            payed_status: data.payed_status,
            cash_flow: data.cash_flow,
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
  });

  return (
    <>
      <Container>
        <Header pageName="Editar Conta" />
        {entry && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/financial/entry" />
              </div>
              <div id="container-titles">
                <h2>{entry.date_income}</h2>
                <p>{entry.cash_flow}</p>
                <p>{entry.chart_of_accounts}</p>
                <p>{entry.date_income}</p>
                <p>{entry.date_payed}</p>
                <p>{entry.date_to_pay}</p>
                <p>{entry.description}</p>
                <p>{entry.financial_entity}</p>
                <p>{entry.payed_status}</p>
                <p>{entry.title_status}</p>
                <p>{entry.type}</p>
                <p>{entry.value}</p>
                <p>{entry.value_payed}</p>
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
                  chart_of_accounts: entry.chart_of_accounts,
                  description: entry.description,
                  value: entry.value,
                  date_to_pay: entry.date_to_pay,
                  value_payed: entry.value_payed,
                  date_payed: entry.date_payed,
                  title_status: entry.title_status,
                  payed_status: entry.payed_status,
                  cash_flow: entry.cash_flow,
                }}
                validationSchema={formSchemaEnclosureEdit}
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

