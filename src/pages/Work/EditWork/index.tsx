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

import {
  Container,
  Main,
  HeaderContent,
  FormCustom,
  ContainerInputColor,
} from './styles';

interface RegisterWorkForm {
  code: string;
  description: string;
  color: string;
}

const EditWork: React.FC = () => {
  let navigate = useNavigate();
  const { id }: any = useParams();
  const { colors } = useContext(ThemeContext);
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [work, setWork] = useState({
    code: '1000',
    description: 'Banho e Tosa',
    color: '#F00',
  } as RegisterWorkForm);

  useEffect(() => {
    api.get<RegisterWorkForm>(`/work/${id}`).then(response => {
      setWork(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: RegisterWorkForm) => {
      try {
        api
          .put(`/work/${id}`, {
            code: data.code,
            description: data.description,
            color: data.color,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            navigate('/work');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              "There's already an entity registered with the same code"
            ) {
              toast.error(
                'Já existe um trabalho cadastrado com o mesmo código!',
              );
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Trabalho!');
      }
    },
    [history, id],
  );

  const formSchemaWork = Yup.object().shape({
    code: Yup.string(),
    description: Yup.string(),
    color: Yup.string(),
  });

  return (
    <>
      <Container>
        <Header pageName="Editar Trabalho" />
        {work && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/work" />
              </div>
              <div id="container-titles">
                <h2>{work.code}</h2>
                <p>{work.description}</p>
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
                  code: work.code,
                  description: work.description,
                  color: work.color,
                }}
                validationSchema={formSchemaWork}
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
                        placeholder="Trabalho"
                        value={values.description}
                        onChange={handleChange('description')}
                        messageError={
                          errors.description && touched.description
                            ? errors.description
                            : ''
                        }
                      />
                      <ContainerInputColor>
                        <span>Cor</span>
                        <input
                          type="color"
                          name="main"
                          value={values.color}
                          onChange={handleChange('color')}
                        />
                        <span>{values.color}</span>
                      </ContainerInputColor>
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
          deleteDataFromModule({ id, route: 'work', routePush: 'work' });
        }}
      />
    </>
  );
};

export default EditWork;
