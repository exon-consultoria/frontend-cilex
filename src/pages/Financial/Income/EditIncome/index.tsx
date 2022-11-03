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
import { IRegisterIncome } from 'types/Income/income';

import { Header,Button,InputFormik, ButtonBack, ModalDelete, Select } from 'components'

import { Container, Main, HeaderContent, FormCustom } from './styles';

export const EditIncome: React.FC = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const { colors } = useContext(ThemeContext);
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [income, setIncome] = useState({} as IRegisterIncome);

  useEffect(() => {
    api.get<IRegisterIncome>(`/income/${id}`).then(response => {
      setIncome(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: IRegisterIncome) => {
      try {
        const {account,code,type} = data
        console.log(account,code,type)
        api
          .put(`/income/${id}`, {
            code,
            account,
            type
          })
          .then((res) => {
            console.log(res)
            toast.success('Atualizado com sucesso');
            navigate('/financial/income');
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
    code: Yup.string(),
    account: Yup.string(),
    type: Yup.string()
  });

  return (
    <>
      <Container>
        <Header pageName="Editar Conta" />
        {income && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/financial/income" />
              </div>
              <div id="container-titles">
                <h2>Código {income.code}</h2>
                <h2>Serviço: {income.account}</h2>
                <h2>Tipo: {income.type}</h2>
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
                  code: income.code,
                  account: income.account,
                  type: income.type
                }}
                validationSchema={formSchemaEnclosureEdit}
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
            )}
          </Main>
        )}
      </Container>
      <ModalDelete
        visible={showModalDelete}
        setVisible={setShowModalDelete}
        actionToDelete={() => {
          deleteDataFromModule({ id, route: 'income', routePush: 'financial' });
        }}
      />
    </>
  );
};

