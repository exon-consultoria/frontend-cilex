/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-types */
import React, { ChangeEvent, useCallback, useRef } from 'react';

import { FiMail, FiLock, FiUser, FiArrowLeft, FiCamera } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import InputFormik from '../../components/InputFormik';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, updateUser } = useAuth();

  let navigate = useNavigate();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo Obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo Obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, old_password, password, password_confirmation } =
          data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        navigate('/dashboard');

        toast.success(
          'Perfil atualizado com succeso! Suas informações do perfil foram atualizadas com sucesso!',
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        toast.error(
          'Erro na atualização! Ocorreu um erro ao atualziar perfil, tente novamente.',
        );
      }
    },
    [history],
  );

  const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = new FormData();

      data.append('avatar', e.target.files[0]);

      api.patch('/users/avatar', data).then(response => {
        updateUser(response.data);

        toast.success('Avatar atualizado!');
      });
    }
  }, []);
  return (
    <>
      <Container>
        <header>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </header>
        <Content>
          <Form
            ref={formRef}
            initialData={{
              name: user.name,
              email: user.email,
            }}
            onSubmit={handleSubmit}
          >
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name} />
              <label htmlFor="avatar">
                <FiCamera />

                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>

            <h1>Meu perfil</h1>

            <InputFormik
              icon={FiUser}
              name="name"
              type="text"
              placeholder="Nome"
            />

            <InputFormik
              icon={FiMail}
              name="email"
              type="text"
              placeholder="E-mail"
            />

            <InputFormik
              icon={FiLock}
              name="old_password"
              type="password"
              placeholder="Senha Atual"
            />

            <InputFormik
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Nova Senha"
            />

            <InputFormik
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirmar Nova Senha"
            />

            <Button type="submit" layoutColor="button-filled">
              Confirmar Mudanças
            </Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
