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
import { IRegisterGroup } from 'types/storage/group';

import { Header, Button, InputFormik, ButtonBack, ModalDelete } from 'components'

import { Container, Main, HeaderContent, FormCustom } from './styles';

const formSchemaGroup = Yup.object().shape({
  code: Yup.string()
    .required('Código Obrigatório')
    .max(6, 'Tamanho máximo de 6 caracteres'),
  description: Yup.string().required('Descrição Obrigatória'),
});

const EditGroup: React.FC = () => {
  const navigate = useNavigate();
  const { colors } = useContext(ThemeContext);
  const { id }: any = useParams();
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [group, setGroup] = useState({} as IRegisterGroup);

  useEffect(() => {
    api.get<IRegisterGroup>(`/product_group/${id}`).then(response => {
      setGroup(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: IRegisterGroup) => {
      try {
        api
          .put(`/product_group/${id}`, {
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
              'There\'s already an entity registered with the same code'
            ) {
              toast.error('Já existe um grupo cadastrado com o mesmo código!');
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Grupo!');
      }
    },
    [history, id],
  );

  return (
    <>
      <Container>
        <Header pageName='Editar Grupo' />
        {group && (
          <Main>
            <HeaderContent>
              <div id='container-arrow'>
                <ButtonBack destinationBack='/inventory/group' />
              </div>
              <div id='container-titles'>
                <h2>{group.code}</h2>
                <p>{group.description}</p>
              </div>
              <div id='container-buttons-actions'>
                <Button
                  layoutColor='button-filled'
                  onClick={() => setEditting(!editting)}
                >
                  <HiOutlinePencilAlt size={24} color='#fefefe' />
                </Button>
                <Button
                  layoutColor='button-outline'
                  onClick={() => setShowModalDelete(true)}
                >
                  <HiOutlineTrash size={24} color={colors.main} />
                </Button>
              </div>
            </HeaderContent>

            {editting && (
              <Formik
                initialValues={{
                  code: group.code,
                  description: group.description,
                }}
                validationSchema={formSchemaGroup}
                onSubmit={handleSubmitForm}
              >
                {({ handleChange, touched, values, errors, handleSubmit }) => (
                  <FormCustom onSubmit={handleSubmit}>
                    <div id='align-inputs'>
                      <InputFormik
                        name='code'
                        type='text'
                        placeholder='Código'
                        value={values.code}
                        onChange={handleChange('code')}
                        messageError={
                          errors.code && touched.code ? errors.code : ''
                        }
                        maxLength={6}
                      />
                      <InputFormik
                        name='description'
                        type='text'
                        placeholder='Descrição'
                        value={values.description}
                        onChange={handleChange('description')}
                        messageError={
                          errors.description && touched.description
                            ? errors.description
                            : ''
                        }
                      />
                    </div>
                    <div id='align-button-save'>
                      <Button layoutColor='button-green' type='submit'>
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
            route: 'product_group',
            routePush: 'inventory',
          });
        }}
      />
    </>
  );
};

export default EditGroup;
