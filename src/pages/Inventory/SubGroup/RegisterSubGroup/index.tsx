import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from '../../../../services/api';
import { IGroup } from '../../../../types/storage/group';
import { IRegisterSubGroup } from '../../../../types/storage/subGroup';

import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import InputFormik from '../../../../components/InputFormik';
import ButtonBack from '../../../../components/ButtonBack';
import Select from '../../../../components/Select';

import { Container, Main, FormCustom } from './styles';

const formSchemaSubGroup = Yup.object().shape({
  code: Yup.string()
    .required('Código Obrigatório')
    .max(6, 'Tamanho máximo de 6 caracteres'),
  description: Yup.string().required('Descrição Obrigatória'),
  product_group_id: Yup.string().required('Grupo Obrigatório'),
});

const RegisterSubGroup: React.FC = () => {
  let navigate = useNavigate();

  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    api.get('/product_group').then(response => {
      setGroups(response.data);
    });
  }, []);

  const handleSubmitForm = useCallback(
    async (data: IRegisterSubGroup) => {
      try {
        const { code, description, product_group_id } = data;
        api
          .post('/product_subgroup', {
            code,
            description,
            product_group_id,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            navigate('/inventory/subgroup');
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
        toast.error('Ocorreu um erro no registro do Sub-Grupo!');
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Sub-Grupo" />
        <ButtonBack destinationBack="/inventory/subgroup" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              description: '',
              product_group_id: '',
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
        </Main>
      </Container>
    </>
  );
};

export default RegisterSubGroup;
