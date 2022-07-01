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
import { IGroup } from '../../../../types/storage/group';
import { IRegisterSubGroup } from '../../../../types/storage/subGroup';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import InputFormik from '../../../../components/InputFormik';
import ButtonBack from '../../../../components/ButtonBack';
import ModalDelete from '../../../../components/ModalDelete';
import Select from '../../../../components/Select';

import { Container, Main, HeaderContent, FormCustom } from './styles';

const formSchemaSubGroup = Yup.object().shape({
  code: Yup.string().required('Código Obrigatório'),
  description: Yup.string().required('Sub-Grupo Obrigatório'),
  product_group_id: Yup.string().required('Grupo Obrigatório'),
});

const EditSubGroup: React.FC = () => {
  let navigate = useNavigate();
  const { colors } = useContext(ThemeContext);
  const { id }: any = useParams();
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [subGroup, setSubGroup] = useState({} as IRegisterSubGroup);
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    api.get<IRegisterSubGroup>(`/product_subgroup/${id}`).then(response => {
      setSubGroup(response.data);
    });
    api.get('/product_group').then(response => {
      setGroups(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: IRegisterSubGroup) => {
      try {
        api
          .put(`/product_subgroup/${id}`, {
            code: data.code,
            description: data.description,
            product_group_id: data.product_group_id,
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
                'Já existe um sub-grupo cadastrado com o mesmo código!',
              );
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Sub-Grupo!');
      }
    },
    [history, id],
  );

  return (
    <>
      <Container>
        <Header pageName="Editar Sub-Grupo" />
        {subGroup && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/inventory" />
              </div>
              <div id="container-titles">
                <h2>{subGroup.code}</h2>
                <p>{subGroup.description}</p>
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
                  code: subGroup.code,
                  description: subGroup.description,
                  product_group_id: subGroup.product_group_id,
                }}
                validationSchema={formSchemaSubGroup}
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
                      <Select
                        name="product_group_id"
                        value={values.product_group_id}
                        onChange={handleChange('product_group_id')}
                        messageError={
                          errors.product_group_id && touched.product_group_id
                            ? errors.product_group_id
                            : ''
                        }
                      >
                        <option value="">Grupo</option>
                        {groups.map(group => (
                          <option value={group.id}>
                            {group.code} - {group.description}
                          </option>
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
          deleteDataFromModule({
            id,
            route: 'product_subgroup',
            routePush: 'inventory',
          });
        }}
      />
    </>
  );
};

export default EditSubGroup;
