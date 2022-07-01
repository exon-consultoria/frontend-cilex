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
import { IRegisterSubFamily } from '../../../../types/storage/subFamily';
import { IFamily } from '../../../../types/storage/family';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import InputFormik from '../../../../components/InputFormik';
import ButtonBack from '../../../../components/ButtonBack';
import ModalDelete from '../../../../components/ModalDelete';
import Select from '../../../../components/Select';

import { Container, Main, HeaderContent, FormCustom } from './styles';

const formSchemaSubFamily = Yup.object().shape({
  code: Yup.string().required('Código Obrigatório'),
  description: Yup.string().required('Sub-Família Obrigatória'),
  product_family_id: Yup.string().required('Família Obrigatória'),
});

const EditSubFamily: React.FC = () => {
  let navigate = useNavigate();
  const { colors } = useContext(ThemeContext);
  const { id }: any = useParams();
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [subFamily, setSubFamily] = useState({} as IRegisterSubFamily);
  const [families, setFamilies] = useState<IFamily[]>([]);

  useEffect(() => {
    api.get<IRegisterSubFamily>(`/product_subfamily/${id}`).then(response => {
      setSubFamily(response.data);
    });
    api.get('/product_family').then(response => {
      setFamilies(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: IRegisterSubFamily) => {
      try {
        api
          .put(`/product_subfamily/${id}`, {
            code: data.code,
            description: data.description,
            product_family_id: data.product_family_id,
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
                'Já existe uma sub-família cadastrada com o mesmo código!',
              );
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização da Sub-Família!');
      }
    },
    [history, id],
  );

  return (
    <>
      <Container>
        <Header pageName="Editar Sub-Família" />
        {subFamily && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/inventory" />
              </div>
              <div id="container-titles">
                <h2>{subFamily.code}</h2>
                <p>{subFamily.description}</p>
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
                  code: subFamily.code,
                  description: subFamily.description,
                  product_family_id: subFamily.product_family_id,
                }}
                validationSchema={formSchemaSubFamily}
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
                        name="product_family_id"
                        value={values.product_family_id}
                        onChange={handleChange('product_family_id')}
                        messageError={
                          errors.product_family_id && touched.product_family_id
                            ? errors.product_family_id
                            : ''
                        }
                      >
                        <option value="">Familia</option>
                        {families.map(family => (
                          <option value={family.id}>
                            {family.code} - {family.description}
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
            route: 'product_subfamily',
            routePush: 'inventory',
          });
        }}
      />
    </>
  );
};

export default EditSubFamily;
