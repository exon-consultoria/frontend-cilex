import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Switch from 'react-switch';
import { FiSave } from 'react-icons/fi';
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineUser,
} from 'react-icons/hi';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import api from '../../../services/api';
import { maskPhone, maskCPF, maskCEP, maskCNPJ } from '../../../utils/masks';
import {
  unformatTel,
  unformatCPF,
  unformatCEP,
  unformatCNPJ,
} from '../../../utils/unformat';

import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import InputFormik from '../../../components/InputFormik';
import ButtonBack from '../../../components/ButtonBack';
import ModalDelete from '../../../components/ModalDelete';

import {
  Container,
  Main,
  Badge,
  InfoCard,
  HeaderContent,
  ContainerCompanyData,
  Select,
  FormCustom,
  CheckboxContainer,
} from './styles';

interface IRegisterForm {
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

const EditPeople: React.FC = () => {
  let navigate = useNavigate();
  const { colors } = useContext(ThemeContext);
  const { id }: any = useParams();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [person, setPerson] = useState<IRegisterForm | null>(null);
  const [isPhysicalPerson, setIsPhysicalPerson] = useState(false);
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    api.get<IRegisterForm | null>(`/person/${id}`).then(response => {
      setPerson(response.data);

      if (person?.cpf) setIsPhysicalPerson(true);
    });
  }, [id, person?.cpf]);

  useEffect(() => {
    api.get<IRole[]>('/role').then(response => {
      setRoles(response.data);
    });
  }, []);

  const handleSubmitForm = useCallback(
    async (data: IRegisterForm) => {
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
        } = data;

        let { cpf, nome, cnpj, razao_social, nome_fantasia } = data;

        if (isPhysicalPerson) {
          cnpj = '';
          razao_social = '';
          nome_fantasia = '';
        } else {
          cpf = '';
          nome = '';
        }

        api
          .put(`/person/${id}`, {
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
            if (person) {
              if (person.isUser === false && isUser === true) {
                localStorage.setItem('@Cilex:hasPendingUser', 'true');
              }
            }

            toast.success('Atualizado com sucesso');
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
        toast.error('Ocorreu um erro na atualização da Empresa!');
      }
    },
    [history, id, isPhysicalPerson, person],
  );

  const formSchemaPersonEdit = Yup.object().shape({
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

  const optionsSelect = [
    { value: '', label: 'Tipo' },
    { value: 'Fornecedor', label: 'Fornecedor' },
    { value: 'Cliente', label: 'Cliente' },
    { value: 'Colaborador', label: 'Colaborador' },
  ];

  const handleDeletePerson = () => {
    api
      .delete(`/person/${id}`)
      .then(() => {
        toast.success('Deletado com Sucesso');
        navigate('/people');
      })
      .catch(() => {
        toast.success('Erro ao deletar Pessoa');
        navigate('/people');
      });
  };

  return (
    <>
      <Container>
        <Header pageName="Editar Pessoa" />
        {person && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/people" />
              </div>
              <div id="container-titles">
                <HiOutlineUser size={32} color={colors.main} />
                <div>
                  <h2>{person.nome ? person.nome : person.nome_fantasia}</h2>
                  {person.razao_social && <p>{person.razao_social}</p>}
                </div>
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
            <ContainerCompanyData>
              <InfoCard>
                <h4>Endereço</h4>
                <span> {person.endereco}</span>
                <span> {person.cep}</span>
                <span> {person.uf}</span>
              </InfoCard>
              <InfoCard>
                <h4>Dados</h4>
                <span>{person.code}</span>
                <span>{person.cpf ? person.cpf : person.cnpj}</span>
                <span>{person.tipo}</span>
              </InfoCard>
              <InfoCard>
                <h4>Contato</h4>
                <span>{person.email}</span>
                <span>{person.tel}</span>
              </InfoCard>
            </ContainerCompanyData>

            {editting && (
              <Formik
                initialValues={{
                  code: person.code,
                  cnpj: person.cnpj ? person.cnpj : '',
                  razao_social: person.razao_social ? person.razao_social : '',
                  nome_fantasia: person.nome_fantasia
                    ? person.nome_fantasia
                    : '',
                  email: person.email ? person.email : '',
                  tel: person.tel,
                  endereco: person.endereco,
                  cep: person.cep,
                  uf: person.uf,
                  info: person.info,
                  cpf: person.cpf ? person.cpf : '',
                  nome: person.nome ? person.nome : '',
                  isUser: person.isUser,
                  tipo: person.tipo ? person.tipo : '',
                  role_id: person.role_id ? person.role_id : '',
                }}
                validationSchema={formSchemaPersonEdit}
                onSubmit={handleSubmitForm}
              >
                {({ handleChange, touched, values, errors, handleSubmit }) => (
                  <FormCustom onSubmit={handleSubmit}>
                    <div id="align-inputs">
                      <div id="container-switch">
                        <p>Pessoa Jurídica</p>
                        <Switch
                          onChange={() =>
                            setIsPhysicalPerson(!isPhysicalPerson)
                          }
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
                        messageError={
                          errors.tel && touched.tel ? errors.tel : ''
                        }
                      />
                      <InputFormik
                        name="endereco"
                        type="text"
                        placeholder="Endereço"
                        value={values.endereco}
                        onChange={handleChange('endereco')}
                        messageError={
                          errors.endereco && touched.endereco
                            ? errors.endereco
                            : ''
                        }
                      />
                      <InputFormik
                        name="cep"
                        type="text"
                        placeholder="CEP"
                        mask={maskCEP}
                        messageError={
                          errors.cep && touched.cep ? errors.cep : ''
                        }
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
                          <option key={role.id} value={role.id}>
                            {role.role}
                          </option>
                        ))}
                      </Select>
                      <Select
                        name="tipo"
                        value={values.tipo}
                        onChange={handleChange('tipo')}
                      >
                        {optionsSelect.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
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
        actionToDelete={handleDeletePerson}
      />
    </>
  );
};

export default EditPeople;
