import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from 'services/api';
import {  IRegisterEnclosure } from 'types/pet/enclosure';

import { Button, Header, InputFormik, ButtonBack, Select } from 'components';

import { Container, Main, FormCustom } from './styles';

const RegisterEnclosure: React.FC = () => {
  const navigate = useNavigate();


  const formSchemaEnclosure = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório'),
    description: Yup.string().required('Canil Obrigatório'),
    size: Yup.string().required('Capacidade do Canil'),
  });

  const handleSubmitForm = useCallback(
    async (data: IRegisterEnclosure) => {
      try {
        const { code, description,size ,enclosure_size} = data;

        JSON.stringify(enclosure_size)
        api
          .post('/enclosure', {
            code,
            description,
            size,
            enclosure_size
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            navigate('/pet/enclosure');
          })
          .catch(error => {
            const dataError = error.response.data;
  
            if (
              dataError.message ===
              'There\'s already an entity registered with the same code'
            ) {
              toast.error('Já existe um Canil cadastrado com o mesmo código!');
            }
  
            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Canil!');
      }
    },
    [history],
  );


  return (
    <>
      <Container>
        <Header pageName="Registro de Canis" />
        <ButtonBack destinationBack="/pet/enclosure" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              description: '',
              size: '',
              enclosure_size: [{capacity: '', size: '', available: ''}]
            }}
            validationSchema={formSchemaEnclosure}
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
                    name="size"
                    placeholder="Porte"
                    value={values.size}
                    onChange={handleChange('size')}
                    messageError={
                      errors.size && touched.size
                        ? errors.size
                        : ''
                    }
                  >
                    <option value="">Porte do canil</option>
                    <option value="g">Grande</option>
                    <option value="m">Médio</option>
                    <option value="p">Pequeno</option>
                  </Select>
                </div>
                <div>
                  <FieldArray name='enclosure_size'>
                    {({push}) => (
                      <>
                        {values.enclosure_size.map((_,index) => (
                          <div id="align-inputs" key={index}>
                            <Select
                              onChange={handleChange(`enclosure_size.${index}.size`)}
                              name={`enclosure_size.${index}.size`}
                            >
                              <option value="">Alocação</option>
                              {values.size === 'p' ? (
                                <option value="p">Pequeno</option>
                              ):null}
                              {values.size === 'm' ? (
                                <>
                                  <option value="m">Médio</option>
                                  <option value="p">Pequeno</option>
                                </>
                              ):null}
                              {values.size === 'g' ? (
                                <>
                                  <option value="g">Grande</option>
                                  <option value="m">Médio</option>
                                  <option value="p">Pequeno</option>
                                </>
                              ):null}
                            </Select>
                            <InputFormik
                              type="text"
                              placeholder="Capacidade"
                              name={`enclosure_size.${index}.capacity`}
                            />
                            <InputFormik
                              type="text"
                              placeholder="Disponível"
                              name={`enclosure_size.${index}.available`}
                            />
                          </div>
                        ))}
                        <Button 
                          style={{width: '300px'}}
                          layoutColor='button-filled'
                          type='button'
                          onClick={() => {
                            if(values.enclosure_size.length < 3) {
                              push({capacity: '',size: '',available: ''})
                            }
                          }}>
                          {values.enclosure_size.length < 3 ? 'Adicionar alocação' : 'Máximo permitido'}
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </div>
                <div id="align-button-save" style={{marginTop: '20px'}}>
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

export default RegisterEnclosure;
