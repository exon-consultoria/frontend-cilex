import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import { BsUnlock } from 'react-icons/bs';

import api from '../../../services/api';

import Header from '../../../components/Header';
import InputFormik from '../../../components/InputFormik';
import Button from '../../../components/Button';
import ButtonBack from '../../../components/ButtonBack';
import Checkbox from '../../../components/Checkbox';

import {
  Container,
  Main,
  FormCustom,
  CheckboxContainer,
  Select,
} from './styles';

interface UserPending {
  id: string;
  person: {
    code: string;
    cpf: string;
    email: string;
    nome: string;
  };
}

interface RegisterUserForm {
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
  group_id: string;
}

export interface UserGroup {
  id: string;
  code: string;
  description: string;
}

const EditUserPending: React.FC = () => {
  let navigate = useNavigate();
  const { id }: any = useParams();

  const [user, setUser] = useState<UserPending>({} as UserPending);
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
  const [edditing, setEdditing] = useState(false);

  const formSchemaUser = Yup.object().shape({
    username: Yup.string().required('Username Obrigatório'),
    password: Yup.string().required('Password Obrigatório'),
    email: Yup.string().email(),
    isAdmin: Yup.boolean(),
    group_id: Yup.string(),
  });

  useEffect(() => {
    api.get(`/pendinguser/${id}`).then(response => {
      setUser(response.data);
    });
    api.get<UserGroup[]>('/group').then(response => {
      setUserGroups(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: RegisterUserForm) => {
      try {
        api
          .post('/users/pending', {
            name: data.username,
            email: data.email,
            password: data.password,
            isAdmin: data.isAdmin,
            pendingUser_id: id,
            group_id: data.group_id || undefined,
          })
          .then(() => {
            toast.success('Criado com sucesso');
            navigate('/menu');
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Usuário!');
      }
    },
    [history, id],
  );

  return (
    <>
      <Container>
        <Header pageName="Criar Usuário Pendente" />
        <ButtonBack destinationBack="/users/pending" />
        <Main>
          <div id="info-user">
            {user.person && (
              <>
                <span>Código</span>
                <p>{user.person.code}</p>
                <span>Email</span>
                <p>{user.person.email}</p>
                <span>Nome</span>
                <p>{user.person.nome}</p>
                <span>CPF</span>
                <p>{user.person.cpf}</p>
                <Button
                  layoutColor="button-green"
                  onClick={() => setEdditing(true)}
                >
                  <BsUnlock size={22} />
                  <span id="activate-user">Ativar Usuário</span>
                </Button>
              </>
            )}
          </div>
          {edditing && (
            <Formik
              initialValues={{
                username: '',
                password: '',
                email: user.person.email,
                isAdmin: false,
                group_id: '',
              }}
              validationSchema={formSchemaUser}
              onSubmit={handleSubmitForm}
            >
              {({ handleChange, touched, values, errors, handleSubmit }) => (
                <FormCustom onSubmit={handleSubmit}>
                  <InputFormik
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange('email')}
                    messageError={
                      errors.email && touched.email ? errors.email : ''
                    }
                  />
                  <InputFormik
                    name="username"
                    type="text"
                    placeholder="Usuário"
                    value={values.username}
                    onChange={handleChange('username')}
                    messageError={
                      errors.username && touched.username ? errors.username : ''
                    }
                  />
                  <InputFormik
                    name="password"
                    type="password"
                    placeholder="Senha"
                    value={values.password}
                    onChange={handleChange('password')}
                    messageError={
                      errors.password && touched.password ? errors.password : ''
                    }
                  />
                  <Select
                    name="group_id"
                    value={values.group_id}
                    onChange={handleChange('group_id')}
                  >
                    {userGroups.map(group => (
                      <option key={group.id} value={group.id}>
                        {group.description}
                      </option>
                    ))}
                  </Select>
                  <CheckboxContainer>
                    <Checkbox name="isUser" label="É Admin ?" />
                  </CheckboxContainer>
                  <Button layoutColor="button-green" type="submit">
                    <FiSave size={24} />
                    <span>Criar</span>
                  </Button>
                </FormCustom>
              )}
            </Formik>
          )}
        </Main>
      </Container>
    </>
  );
};

export default EditUserPending;
