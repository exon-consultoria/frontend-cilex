import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from '../../../../services/api';
import { IFamily } from '../../../../types/storage/family';
import { IRegisterSubFamily } from '../../../../types/storage/subFamily';

import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import InputFormik from '../../../../components/InputFormik';
import ButtonBack from '../../../../components/ButtonBack';
import Select from '../../../../components/Select';

import { Container, Main, FormCustom } from './styles';

const formSchemaSubFamily = Yup.object().shape({
  code: Yup.string()
    .required('Código Obrigatório')
    .max(6, 'Tamanho máximo de 6 caracteres'),
  description: Yup.string().required('Descrição Obrigatória'),
  product_family_id: Yup.string().required('Família Obrigatória'),
});

const RegisterSubFamily: React.FC = () => {
  let navigate = useNavigate();

  const [families, setFamilies] = useState<IFamily[]>([]);

  useEffect(() => {
    api.get('/product_family').then(response => {
      setFamilies(response.data);
    });
  }, []);

  const handleSubmitForm = useCallback(
    async (data: IRegisterSubFamily) => {
      try {
        const { code, description, product_family_id } = data;
        api
          .post('/product_subfamily', {
            code,
            description,
            product_family_id,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            navigate('/inventory/subfamily');
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
        toast.error('Ocorreu um erro no registro da Sub-Família!');
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Sub-Família" />
        <ButtonBack destinationBack="/inventory/subfamily" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              description: '',
              product_family_id: '',
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
                    <option value="">Família</option>
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
        </Main>
      </Container>
    </>
  );
};

export default RegisterSubFamily;
