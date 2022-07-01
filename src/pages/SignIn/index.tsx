import React, { useCallback } from 'react';
import { FiLogIn, FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik } from 'formik';

import { useAuth } from '../../hooks/auth';

import InputFormik from '../../components/InputFormik';
import Button from '../../components/Button';

import solutionSvg from '../../assets/solution.svg';

import { Container, ShowOff, AnimationContainer, FormCustom } from './styles';

interface SignInFormData {
  username: string;
  password: string;
}

const formSchemaLogin = Yup.object().shape({
  username: Yup.string().required('Username obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
});

const SignIn: React.FC = () => {
  let navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmitForm = useCallback(
    async (data: SignInFormData) => {
      try {
        await signIn({
          username: data.username,
          password: data.password,
        });

        navigate('/chosecompany');
      } catch (err) {
        toast.error(
          'Erro na autenticação! Ocorreu um erro ao fazer login, cheque as credenciais',
        );
      }
    },
    [history, signIn],
  );

  return (
    <>
      <Container>
        <ShowOff>
          <h1>Cilex</h1>
          <p>O cilex aumenta sua produtividade</p>

          <img src={solutionSvg} alt="" />
        </ShowOff>
        <AnimationContainer>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={formSchemaLogin}
            onSubmit={handleSubmitForm}
          >
            {({ handleChange, touched, values, errors, handleSubmit }) => (
              <FormCustom onSubmit={handleSubmit}>
                <InputFormik
                  icon={FiUser}
                  name="username"
                  type="text"
                  placeholder="Nome"
                  value={values.username}
                  onChange={handleChange('username')}
                  messageError={
                    errors.username && touched.username ? errors.username : ''
                  }
                />

                <InputFormik
                  icon={FiLock}
                  name="password"
                  type="password"
                  placeholder="Senha"
                  value={values.password}
                  onChange={handleChange('password')}
                  messageError={
                    errors.password && touched.password ? errors.password : ''
                  }
                />

                <Button type="submit" layoutColor="button-filled">
                  <FiLogIn size={24} />
                  <span>Entrar</span>
                </Button>

                <Link to="/forgot-password">Esqueceu a senha ?</Link>
              </FormCustom>
            )}
          </Formik>
        </AnimationContainer>
      </Container>
    </>
  );
};

export default SignIn;
