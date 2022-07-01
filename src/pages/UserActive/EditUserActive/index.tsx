import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';

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

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  group_id: string;
  isActive: boolean;
}

interface UpdateUserForm {
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

const EditUserActive: React.FC = () => {
  let navigate = useNavigate();
  const { id }: any = useParams();
  const { colors } = useContext(ThemeContext);

  const [user, setUser] = useState<User>({} as User);
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
  const [edditing, setEdditing] = useState(false);
  const [userActive, setUserActive] = useState(false);

  const formSchemaUser = Yup.object().shape({
    username: Yup.string(),
    password: Yup.string(),
    email: Yup.string().email(),
    isAdmin: Yup.boolean(),
    group_id: Yup.string(),
    isActive: Yup.boolean(),
  });

  useEffect(() => {
    api.get(`/users/${id}`).then(response => {
      setUser(response.data);
      setUserActive(response.data.isActive);
    });
    api.get<UserGroup[]>('/group').then(response => {
      setUserGroups(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: UpdateUserForm) => {
      try {
        api
          .put(`/users/${id}`, {
            name: data.username || undefined,
            email: data.email || undefined,
            password: data.password || undefined,
            isAdmin: data.isAdmin,
            group_id: data.group_id || undefined,
            isActive: userActive,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            navigate('/users/active');
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Usuário!');
      }
    },
    [history, id, userActive],
  );

  return (
    <>
      <Container>
        <Header pageName="Editar Usuários" />
        <ButtonBack destinationBack="/users/active" />
        <Main>
          <div id="info-user">
            {user && (
              <>
                <span>Nome</span>
                <p>{user.name}</p>
                <span>Email</span>
                <p>{user.email}</p>
                <span>É Admin ?</span>
                <p>{user.isAdmin ? 'Sim' : 'Não'}</p>
                <Button
                  layoutColor="button-green"
                  onClick={() => setEdditing(true)}
                >
                  <HiOutlinePencilAlt size={22} />
                  <span id="activate-user">Editar Usuário</span>
                </Button>
              </>
            )}
          </div>
          {edditing && (
            <Formik
              initialValues={{
                username: user.name,
                password: '',
                email: user.email,
                isAdmin: user.isAdmin,
                group_id: user.group_id ? user.group_id : '',
              }}
              validationSchema={formSchemaUser}
              onSubmit={handleSubmitForm}
            >
              {({ handleChange, touched, values, errors, handleSubmit }) => (
                <FormCustom onSubmit={handleSubmit}>
                  <div id="container-switch">
                    <p>Desativo</p>
                    <Switch
                      onChange={() => setUserActive(!userActive)}
                      checked={userActive}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor={colors.main}
                    />
                    <p>Ativo</p>
                  </div>
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
                    placeholder="Nova Senha"
                    value={values.password}
                    onChange={handleChange('password')}
                    messageError={
                      errors.password && touched.password ? errors.password : ''
                    }
                  />
                  {!user.isAdmin && (
                    <Select
                      name="group_id"
                      value={values.group_id}
                      onChange={handleChange('group_id')}
                    >
                      {userGroups.length > 0 ? (
                        userGroups.map(group => (
                          <option key={group.id} value={group.id}>
                            {group.description}
                          </option>
                        ))
                      ) : (
                        <option value="">
                          Nenhum grupo de usuários cadastrado
                        </option>
                      )}
                    </Select>
                  )}
                  <CheckboxContainer>
                    <Checkbox name="isAdmin" label="É Admin ?" />
                  </CheckboxContainer>
                  <Button layoutColor="button-green" type="submit">
                    <FiSave size={24} />
                    <span>Atualizar Cadastro</span>
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

export default EditUserActive;
