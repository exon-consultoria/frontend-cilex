import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';

import { IRegisterType } from '../../../../types/storage/type';
import api from '../../../../services/api';
import { useCrudModules } from '../../../../hooks/useCrudModules';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import InputFormik from '../../../../components/InputFormik';
import ButtonBack from '../../../../components/ButtonBack';
import ModalDelete from '../../../../components/ModalDelete';

import { Container, Main, HeaderContent, FormCustom } from './styles';

const formSchemaType = Yup.object().shape({
  code: Yup.string()
    .required('Código Obrigatório')
    .max(6, 'Tamanho máximo de 6 caracteres'),
  description: Yup.string().required('Descrição Obrigatória'),
  acceptStructure: Yup.boolean(),
});

const EditType: React.FC = () => {
  let navigate = useNavigate();
  const { colors } = useContext(ThemeContext);
  const { id }: any = useParams();
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [acceptStructure, setAcceptStructure] = useState(false);
  const [type, setType] = useState({} as IRegisterType);

  useEffect(() => {
    api.get<IRegisterType>(`/product_type/${id}`).then(response => {
      setType(response.data);
      if (response.data) setAcceptStructure(response.data.accept_structure);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: IRegisterType) => {
      try {
        api
          .put(`/product_type/${id}`, {
            code: data.code,
            description: data.description,
            accept_structure: acceptStructure,
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
              toast.error('Já existe um tipo cadastrado com o mesmo código!');
            }

            return error;
          });
      } catch {
        toast.error('Ocorreu um erro na atualização do Tipo!');
      }
    },
    [history, id, acceptStructure],
  );

  return (
    <>
      <Container>
        <Header pageName="Editar Tipo" />
        {type && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/inventory/type" />
              </div>
              <div id="container-titles">
                <h2>{type.code}</h2>
                <p>{type.description}</p>
                <p>
                  Aceita Estrutura ?{' '}
                  {type.accept_structure === true ? 'Sim' : 'Não'}
                </p>
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
                  code: type.code,
                  description: type.description,
                  accept_structure: type.accept_structure,
                }}
                validationSchema={formSchemaType}
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
                      <div id="align-switch">
                        <p>Aceita estrutura ?</p>
                        <Switch
                          onChange={() => setAcceptStructure(!acceptStructure)}
                          checked={acceptStructure}
                          checkedIcon={false}
                          uncheckedIcon={false}
                          onColor={colors.main}
                        />
                      </div>
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
            route: 'product_type',
            routePush: 'inventory',
          });
        }}
      />
    </>
  );
};

export default EditType;
