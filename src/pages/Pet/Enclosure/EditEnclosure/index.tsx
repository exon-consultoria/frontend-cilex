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
import { IRegisterEnclosure } from 'types/pet/enclosure';

import { Header, Button, InputFormik, ButtonBack, ModalDelete, Select} from 'components';

import { Container, Main, HeaderContent, FormCustom } from './styles';

const EditEnclosure: React.FC = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const { colors } = useContext(ThemeContext);
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [enclosure, setEnclosure] = useState({} as IRegisterEnclosure);

  useEffect(() => {
    api.get<IRegisterEnclosure>(`/enclosure/${id}`).then(response => {
      setEnclosure(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: IRegisterEnclosure) => {
      const { code, description, size } = data
      try {
        api
          .put(`/enclosure/${id}`, {
            code,
            description,
            size
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            navigate('/pet/enclosure');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              'There\'s already an entity registered with the same code'
            ) {
              toast.error('Já existe um canil cadastrado com o mesmo código!');
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Canil!');
      }
    },
    [history, id],
  );

  const formSchemaEnclosureEdit = Yup.object().shape({
    code: Yup.string(),
    description: Yup.string(),
  });

  return (
    <>
      <Container>
        <Header pageName="Editar Canil" />
        {enclosure && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/pet/enclosure" />
              </div>
              <div id="container-titles">
                <h2>{enclosure.code}</h2>
                <p>{enclosure.description}</p>
                <p>{enclosure.size}</p>
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
                  code: enclosure.code,
                  description: enclosure.description,
                  size: enclosure.size
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
                        name="description"
                        type="text"
                        placeholder="Canil"
                        value={values.description}
                        onChange={handleChange('description')}
                        messageError={
                          errors.description && touched.description
                            ? errors.description
                            : ''
                        }
                      />
                      <Select
                        name="dog_size"
                        value={values.size}
                        onChange={handleChange('size')}
                        messageError={
                          errors.size && touched.size ? errors.size : ''
                        }
                      >
                        <option value="">Alocação</option>
                        <option value="p">Pequeno</option>
                        <option value="m">Médio</option>
                        <option value="g">Grande</option>
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
          deleteDataFromModule({ id, route: 'enclosure', routePush: 'pet' });
        }}
      />
    </>
  );
};

export default EditEnclosure;
