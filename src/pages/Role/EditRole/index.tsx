import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import api from '../../../services/api';
import { useCrudModules } from '../../../hooks/useCrudModules';

import Header from '../../../components/Header';
import Button from '../../../components/Button';
import InputFormik from '../../../components/InputFormik';
import ButtonBack from '../../../components/ButtonBack';
import ModalDelete from '../../../components/ModalDelete';

import { Container, Main, HeaderContent, FormCustom } from './styles';

interface RegisterRoleForm {
  code: string;
  role: string;
  description: string;
}

const EditRole: React.FC = () => {
  let navigate = useNavigate();
  const { id }: any = useParams();
  const { colors } = useContext(ThemeContext);
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [role, setRole] = useState<RegisterRoleForm | null>(null);

  useEffect(() => {
    api.get<RegisterRoleForm | null>(`/role/${id}`).then(response => {
      setRole(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: RegisterRoleForm) => {
      try {
        api
          .put(`/role/${id}`, {
            code: data.code,
            role: data.role,
            description: data.description,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            navigate('/role');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              "There's already an entity registered with the same code"
            ) {
              toast.error('Já existe um cargo cadastrado com o mesmo código!');
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Cargo!');
      }
    },
    [history, id],
  );

  const formSchemaRoleEdit = Yup.object().shape({
    code: Yup.string(),
    role: Yup.string(),
    description: Yup.string(),
  });

  return (
    <>
      <Container>
        <Header pageName="Editar Cargo" />
        {role && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/role" />
              </div>
              <div id="container-titles">
                <h2>{role.role}</h2>
                <p>{role.description}</p>
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
                  code: role.code,
                  role: role.role,
                  description: role.description,
                }}
                validationSchema={formSchemaRoleEdit}
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
                        name="role"
                        type="text"
                        placeholder="Cargo"
                        value={values.role}
                        onChange={handleChange('role')}
                        messageError={
                          errors.role && touched.role ? errors.role : ''
                        }
                      />
                      <InputFormik
                        name="description"
                        type="text"
                        placeholder="Função"
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
          deleteDataFromModule({ id, route: 'role', routePush: 'role' });
        }}
      />
    </>
  );
};

export default EditRole;
