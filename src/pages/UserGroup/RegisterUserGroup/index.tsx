/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import { components } from 'react-select';

import api from '../../../services/api';

import Button from '../../../components/Button';
import Header from '../../../components/Header';
import InputFormik from '../../../components/InputFormik';
import ButtonBack from '../../../components/ButtonBack';
import CustomSelect from '../../../components/CustomSelect';

import { Container, Main, FormCustom } from './styles';

const { Option } = components;

interface RegisterUserGroupForm {
  code: string;
  description: string;
  modules: string[];
}

interface Module {
  module: {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
    url: string;
  };
}

interface Company {
  id: string;
}

interface SelectFields {
  value: string;
  label: string;
}

const RegisterUserGroup: React.FC = () => {
  let navigate = useNavigate();
  const company = localStorage.getItem('@Cilex:companySelected');

  const [listModules, setListModules] = useState<SelectFields[]>([]);

  const formSchemaUserGroup = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório'),
    description: Yup.string().required('Descrição Obrigatória'),
    // eslint-disable-next-line react/forbid-prop-types
    modules: Yup.array(),
  });

  const handleSubmitForm = useCallback(
    async (data: RegisterUserGroupForm) => {
      try {
        const { code, description, modules } = data;

        api
          .post('/group', {
            code,
            description,
            modules,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            navigate('/group');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              "There's already an entity registered with the same code"
            ) {
              toast.error(
                'Já existe um grupo de usuários cadastrado com o mesmo código!',
              );
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Grupo de Usuários!');
      }
    },
    [history],
  );

  useEffect(() => {
    api
      .get<Module[]>(
        `company_modules/?company_id=${JSON.parse(company as string).id}`, // Usar hook de empresa
      )
      .then(response => {
        const responseModules = response.data;

        const eachListModules = responseModules.map(listModule => {
          return {
            value: listModule.module.id,
            label: listModule.module.title,
          };
        });

        setListModules(eachListModules);
      });
  }, [company]);

  return (
    <>
      <Container>
        <Header pageName="Registro de Grupo de Usuários" />
        <ButtonBack destinationBack="/group" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              description: '',
              modules: [],
            }}
            validationSchema={formSchemaUserGroup}
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
                    placeholder="Grupo"
                    value={values.description}
                    onChange={handleChange('description')}
                    messageError={
                      errors.description && touched.description
                        ? errors.description
                        : ''
                    }
                  />
                  <Field
                    className="select-custom"
                    name="modules"
                    options={listModules}
                    component={CustomSelect}
                    placeholder="Módulos"
                    isMulti
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
        </Main>
      </Container>
    </>
  );
};

export default RegisterUserGroup;
