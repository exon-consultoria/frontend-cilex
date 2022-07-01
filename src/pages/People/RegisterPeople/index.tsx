/* eslint-disable jsx-a11y/label-has-for */
import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Switch from 'react-switch';
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';
import { maskPhone, maskCPF, maskCEP, maskCNPJ } from '../../../utils/masks';
import {
  unformatTel,
  unformatCPF,
  unformatCEP,
  unformatCNPJ,
} from '../../../utils/unformat';

import Button from '../../../components/Button';
import Header from '../../../components/Header';
import InputFormik from '../../../components/InputFormik';
import ButtonBack from '../../../components/ButtonBack';
import Checkbox from '../../../components/Checkbox';

import {
  CheckboxContainer,
  Container,
  FormCustom,
  Main,
  Select,
} from './styles';

interface RegisterPeopleForm {
  code: number | string;
  email: string;
  tel: string;
  endereco: string;
  cep: string;
  uf: string;
  info: string;
  tipo: string;
  isUser: boolean;
  role_id: string;

  cnpj?: string;
  razao_social?: string;
  nome_fantasia?: string;

  cpf?: string;
  nome?: string;
}

export interface IRole {
  id: string;
  code: string;
  role: string;
  description: string;
}

const optionsSelect = [
  { value: '', label: 'Tipo' },
  { value: 'fornecedor', label: 'Fornecedor' },
  { value: 'cliente', label: 'Cliente' },
  { value: 'colaborador', label: 'Colaborador' },
];

const RegisterPeople: React.FC = () => {
  let navigate = useNavigate();
  const { user } = useAuth();
  const { colors } = useContext(ThemeContext);

  const [isPhysicalPerson, setIsPhysicalPerson] = useState(false);
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    api.get<IRole[]>('/role').then(response => {
      setRoles(response.data);
    });
  }, []);

  const formSchemaPeople = Yup.object().shape({
    code: Yup.number().required('Código obrigatório'),
    email: Yup.string(),
    tel: Yup.string(),
    endereco: Yup.string(),
    cep: Yup.string(),
    uf: Yup.string(),
    info: Yup.string(),
    tipo: Yup.string(),
    isUser: Yup.boolean(),
    role_id: Yup.string(),

    // Jurídica
    cnpj: isPhysicalPerson
      ? Yup.string()
      : Yup.string().required('CNPJ obrigatório').min(18).max(18),
    razao_social: isPhysicalPerson
      ? Yup.string()
      : Yup.string().required('Razão Social obrigatório'),
    nome_fantasia: isPhysicalPerson
      ? Yup.string()
      : Yup.string().required('Nome Fantasia obrigatório'),

    // Fisica
    cpf: isPhysicalPerson ? Yup.string().min(14).max(14) : Yup.string(),
    nome: isPhysicalPerson
      ? Yup.string().required('Nome obrigatório')
      : Yup.string(),
  });

  const handleSubmitForm = useCallback(
    async (data: RegisterPeopleForm) => {
      try {
        const {
          code,
          email,
          tel,
          endereco,
          cep,
          uf,
          info,
          tipo,
          isUser,
          role_id,
          cpf,
          nome,
          cnpj,
          razao_social,
          nome_fantasia,
        } = data;

        api
          .post('/person', {
            code,
            email,
            tel: unformatTel(tel),
            endereco,
            cep: unformatCEP(cep),
            uf,
            info,
            tipo,
            isUser,
            role_id: role_id || undefined,
            cpf: (cpf && unformatCPF(cpf)) || undefined,
            nome: nome || undefined,
            cnpj: (cnpj && unformatCNPJ(cnpj)) || undefined,
            razao_social: razao_social || undefined,
            nome_fantasia: nome_fantasia || undefined,
          })
          .then(() => {
            if (isUser) {
              localStorage.setItem('@Cilex:hasPendingUser', 'true');
            }

            toast.success('Registrado com sucesso');
            navigate('/people');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              "There's already a person registered with the same code"
            ) {
              toast.error(
                'Já existe uma pessoa cadastrada com o mesmo código!',
              );
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro da Pessoa!');
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Pessoa" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              email: '',
              tel: '',
              endereco: '',
              cep: '',
              uf: '',
              info: '',
              tipo: '',
              isUser: false,
              role_id: '',
              cnpj: '',
              razao_social: '',
              nome_fantasia: '',
              cpf: '',
              nome: '',
            }}
            validationSchema={formSchemaPeople}
            onSubmit={handleSubmitForm}
          >
            {({ handleChange, touched, values, errors, handleSubmit }) => (
              <FormCustom onSubmit={handleSubmit}>
                <div id="align-switch">
                  <ButtonBack destinationBack="/people" />
                  <div id="container-switch">
                    <p>Pessoa Jurídica</p>
                    <Switch
                      onChange={() => setIsPhysicalPerson(!isPhysicalPerson)}
                      checked={isPhysicalPerson}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor={colors.main}
                      offColor={colors.main}
                    />
                    <p>Pessoa Física</p>
                  </div>
                  <CheckboxContainer>
                    <Checkbox name="isUser" label="É usuário ?" />
                  </CheckboxContainer>
                </div>
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
                  {isPhysicalPerson ? (
                    <>
                      <InputFormik
                        name="cpf"
                        type="text"
                        placeholder="CPF"
                        mask={maskCPF}
                        messageError={
                          errors.cpf && touched.cpf ? errors.cpf : ''
                        }
                        maxLength={14}
                      />
                      <InputFormik
                        name="nome"
                        type="text"
                        placeholder="Nome"
                        value={values.nome}
                        onChange={handleChange('nome')}
                        messageError={
                          errors.nome && touched.nome ? errors.nome : ''
                        }
                      />
                    </>
                  ) : (
                    <>
                      <InputFormik
                        name="cnpj"
                        type="text"
                        placeholder="CNPJ"
                        mask={maskCNPJ}
                        messageError={
                          errors.cnpj && touched.cnpj ? errors.cnpj : ''
                        }
                        maxLength={18}
                      />
                      <InputFormik
                        name="razao_social"
                        type="text"
                        placeholder="Razão Social"
                        value={values.razao_social}
                        onChange={handleChange('razao_social')}
                        messageError={
                          errors.razao_social && touched.razao_social
                            ? errors.razao_social
                            : ''
                        }
                      />
                      <InputFormik
                        name="nome_fantasia"
                        type="text"
                        placeholder="Nome Fantasia"
                        value={values.nome_fantasia}
                        onChange={handleChange('nome_fantasia')}
                        messageError={
                          errors.nome_fantasia && touched.nome_fantasia
                            ? errors.nome_fantasia
                            : ''
                        }
                      />
                    </>
                  )}
                  <InputFormik
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    value={values.email}
                    onChange={handleChange('email')}
                    messageError={
                      errors.email && touched.email ? errors.email : ''
                    }
                  />
                  <InputFormik
                    name="tel"
                    type="text"
                    placeholder="Telefone"
                    mask={maskPhone}
                    messageError={errors.tel && touched.tel ? errors.tel : ''}
                  />
                  <InputFormik
                    name="endereco"
                    type="text"
                    placeholder="Endereço"
                    value={values.endereco}
                    onChange={handleChange('endereco')}
                    messageError={
                      errors.endereco && touched.endereco ? errors.endereco : ''
                    }
                  />
                  <InputFormik
                    name="cep"
                    type="text"
                    placeholder="CEP"
                    mask={maskCEP}
                    messageError={errors.cep && touched.cep ? errors.cep : ''}
                  />
                  <InputFormik
                    name="uf"
                    type="text"
                    placeholder="Estado"
                    value={values.uf}
                    onChange={handleChange('uf')}
                    messageError={errors.uf && touched.uf ? errors.uf : ''}
                  />
                  <Select
                    name="role_id"
                    value={values.role_id}
                    onChange={handleChange('role_id')}
                  >
                    <option value="">Cargo</option>
                    {roles.map(role => (
                      <option value={role.id}>{role.role}</option>
                    ))}
                  </Select>
                  <Select
                    name="tipo"
                    value={values.tipo}
                    onChange={handleChange('tipo')}
                  >
                    {optionsSelect.map(option => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </Select>
                  <InputFormik
                    name="info"
                    type="text"
                    placeholder="Informações"
                    value={values.info}
                    onChange={handleChange('info')}
                    messageError={
                      errors.info && touched.info ? errors.info : ''
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
        </Main>
      </Container>
    </>
  );
};

export default RegisterPeople;
