import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import api from '../../../../services/api';
import { useCrudModules } from '../../../../hooks/useCrudModules';
import { IRegisterStorage } from '../../../../types/storage/storage';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import InputFormik from '../../../../components/InputFormik';
import InputDefault from '../../../../components/InputDefault';
import ButtonBack from '../../../../components/ButtonBack';
import ModalDelete from '../../../../components/ModalDelete';

import { Container, Main, HeaderContent, FormCustom } from './styles';

const formSchemaStorage = Yup.object().shape({
  code: Yup.string()
    .required('Código Obrigatório')
    .max(6, 'Tamanho máximo de 6 caracteres'),
  description: Yup.string().required('Descrição Obrigatória'),
});

const EditStorage: React.FC = () => {
  let navigate = useNavigate();
  const { colors } = useContext(ThemeContext);
  const { id }: any = useParams();
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [storage, setStorage] = useState({} as IRegisterStorage);

  useEffect(() => {
    api.get<IRegisterStorage>(`/storage/${id}`).then(response => {
      setStorage(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: IRegisterStorage) => {
      try {
        api
          .put(`/storage/${id}`, {
            code: data.code,
            description: data.description,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            navigate('/inventory');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              "There's already an entity registered with the same code"
            ) {
              toast.error(
                'Já existe um estoque cadastrado com o mesmo código!',
              );
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Estoque!');
      }
    },
    [history, id],
  );

  return (
    <>
      <Container>
        <Header pageName="Editar Estoque" />
        {storage && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/inventory/storage" />
              </div>
              <div id="container-titles">
                <h2>{storage.code}</h2>
                <p>{storage.description}</p>
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

            {/* <FormCustom>
              <div id="align-inputs">
                <InputDefault type="text" placeholder="Código" value="123" />
                <InputDefault type="text" placeholder="Código" value="123" />
              </div>
            </FormCustom> */}

            {editting && (
              <Formik
                initialValues={{
                  code: storage.code,
                  description: storage.description,
                }}
                validationSchema={formSchemaStorage}
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
            )}
          </Main>
        )}
      </Container>
      <ModalDelete
        visible={showModalDelete}
        setVisible={setShowModalDelete}
        actionToDelete={() => {
          deleteDataFromModule({
            id,
            route: 'storage',
            routePush: 'inventory',
          });
        }}
      />
    </>
  );
};

export default EditStorage;
