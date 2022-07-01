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
import { IRegisterVaccine } from '../../../../types/pet/vaccine';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import InputFormik from '../../../../components/InputFormik';
import ButtonBack from '../../../../components/ButtonBack';
import ModalDelete from '../../../../components/ModalDelete';

import { Container, Main, HeaderContent, FormCustom } from './styles';

const EditVaccine: React.FC = () => {
  let navigate = useNavigate();
  const { id }: any = useParams();
  const { colors } = useContext(ThemeContext);
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [vaccine, setVaccine] = useState({} as IRegisterVaccine);

  useEffect(() => {
    api.get<IRegisterVaccine>(`/vaccine/${id}`).then(response => {
      setVaccine(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: IRegisterVaccine) => {
      try {
        api
          .put(`/vaccine/${id}`, {
            code: data.code,
            description: data.description,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            navigate('/pet/vaccine');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              "There's already an entity registered with the same code"
            ) {
              toast.error(
                'Já existe uma vacina cadastrada com o mesmo código!',
              );
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização da Vacina!');
      }
    },
    [history, id],
  );

  const formSchemaVaccineEdit = Yup.object().shape({
    code: Yup.string(),
    description: Yup.string(),
  });

  return (
    <>
      <Container>
        <Header pageName="Editar Vacina" />
        {vaccine && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/pet/vaccine" />
              </div>
              <div id="container-titles">
                <h2>{vaccine.code}</h2>
                <p>{vaccine.description}</p>
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
                  code: vaccine.code,
                  description: vaccine.description,
                }}
                validationSchema={formSchemaVaccineEdit}
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
                        placeholder="Vacina"
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
          deleteDataFromModule({ id, route: 'vaccine', routePush: 'pet' });
        }}
      />
    </>
  );
};

export default EditVaccine;
