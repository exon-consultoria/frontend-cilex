import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { toast } from 'react-toastify';

import { useAuth } from '../../../hooks/auth';
import { useHasUserCompany } from '../../../hooks/useHasUserCompany';
import api from '../../../services/api';
import { maskPhone, maskCEP, maskCNPJ } from '../../../utils/masks';
import {
  unformatTel,
  unformatCEP,
  unformatCNPJ,
} from '../../../utils/unformat';

import Button from '../../../components/Button';
import Header from '../../../components/Header';
import InputFormik from '../../../components/InputFormik';
import ButtonBack from '../../../components/ButtonBack';

import {
  Container,
  FormCustom,
  Step,
  Select,
  ContainerCards,
  Module,
  AlignButtonsStepTwo,
} from './styles';

type Module = {
  title: string;
  moduleclassicon: string;
};

interface Segment {
  id: string;
  name: string;
  description: string;
  classIcon: string;
  isLockes: boolean;
  modules: Module[];
}

interface RegisterCompanyForm {
  code: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  email: string;
  tel?: string;
  endereco?: string;
  cep?: string;
  uf?: string;
  info?: string;
  matriz_id?: string;
  segment_id: string;
}

interface MatrizID {
  id: string;
  code: string;
  nome_fantasia: string;
}

const RegisterCompany: React.FC = () => {
  let navigate = useNavigate();
  const { user } = useAuth();
  const { hasUserCompany, setHasUserCompany } = useHasUserCompany();

  const [matrizCompanies, setMatrizCompanies] = useState<MatrizID[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [segmentIdSelected, setSegmentIdSelected] = useState('');
  const [isStepOne, setIsStepOne] = useState(true);

  useEffect(() => {
    api.get<MatrizID[]>('/company?isMatriz=true').then(response => {
      setMatrizCompanies(response.data);
    });
    api.get<Segment[]>('/segment/segmentsModule').then(response => {
      setSegments(response.data);
    });
  }, []);

  const formSchemaCompany = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório'),
    cnpj: Yup.string().required('CNPJ obrigatório').min(18).max(18),
    razao_social: Yup.string().required('Razão Social obrigatória'),
    nome_fantasia: Yup.string().required('Nome Fantasia obrigatório'),
    email: Yup.string().required('E-mail obrigatório'),
    tel: Yup.string(),
    endereco: Yup.string(),
    cep: Yup.string(),
    uf: Yup.string(),
    info: Yup.string(),
    matriz_id: Yup.string(),
    segment_id: Yup.string(),
  });

  const handleSubmitForm = useCallback(
    async (data: RegisterCompanyForm) => {
      try {
        const {
          code,
          cnpj,
          razao_social,
          nome_fantasia,
          email,
          tel,
          endereco,
          cep,
          uf,
          info,
          matriz_id,
        } = data;

        if (segmentIdSelected) {
          api
            .post('/company', {
              code,
              cnpj: cnpj && unformatCNPJ(cnpj),
              razao_social,
              nome_fantasia,
              email,
              tel: tel && unformatTel(tel),
              endereco,
              cep: cep && unformatCEP(cep),
              uf,
              info,
              matriz_id: matriz_id || undefined,
              segment_id: segmentIdSelected,
            })
            .then(() => {
              toast.success('Registrado com sucesso');

              if (!hasUserCompany) {
                setHasUserCompany(true);
                navigate('/chosecompany');
              } else {
                navigate('/company');
              }
            })
            .catch(error => {
              const dataError = error.response.data;

              if (
                dataError.message ===
                "There's already a company registered with the same code"
              ) {
                toast.error(
                  'Já existe uma empresa cadastrada com o mesmo código!',
                );
              }

              return error;
            });
        } else {
          toast.error('Um segmento deve ser selecionado!');
        }
      } catch (err) {
        toast.error('Ocorreu um erro no registro da Empresa!');
      }
    },
    [history, segmentIdSelected, hasUserCompany, setHasUserCompany],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Empresa" disabledHome={!hasUserCompany} />
        {hasUserCompany && <ButtonBack destinationBack="/company" />}

        <Step>
          <Formik
            initialValues={{
              code: '',
              cnpj: '',
              razao_social: '',
              nome_fantasia: '',
              email: '',
              tel: '',
              endereco: '',
              cep: '',
              uf: '',
              info: '',
              matriz_id: '',
              segment_id: '',
            }}
            validationSchema={formSchemaCompany}
            onSubmit={handleSubmitForm}
          >
            {({ handleChange, touched, values, errors, handleSubmit }) => (
              <FormCustom onSubmit={handleSubmit}>
                {isStepOne ? (
                  <>
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
                      <Select
                        name="matriz_id"
                        value={values.matriz_id}
                        onChange={handleChange('matriz_id')}
                      >
                        <option value="">Matriz</option>
                        {matrizCompanies.map(companyMatriz => (
                          <option
                            key={companyMatriz.id}
                            value={companyMatriz.id}
                          >
                            {companyMatriz.code} - {companyMatriz.nome_fantasia}
                          </option>
                        ))}
                      </Select>
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
                      <Button
                        layoutColor="button-green"
                        type="button"
                        onClick={() => setIsStepOne(false)}
                      >
                        <span>Continuar</span>
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <ContainerCards>
                      {segments.map(segment => (
                        <Module
                          key={segment.id}
                          selected={segmentIdSelected === segment.id}
                        >
                          <div className="card">
                            <div className="front">
                              <i className={segment.classIcon} />
                              <h3>{segment.name}</h3>
                              <p>{segment.description}</p>
                            </div>
                            <div className="back">
                              <h3>Lista de Módulos</h3>

                              <ul>
                                {segment.modules.map(module => (
                                  <li key={module.title}>
                                    <i className={module.moduleclassicon} />
                                    <p>{module.title}</p>
                                  </li>
                                ))}
                              </ul>
                              <Button
                                layoutColor="button-green"
                                onClick={() => setSegmentIdSelected(segment.id)}
                              >
                                {segmentIdSelected === segment.id
                                  ? 'Selecionado'
                                  : 'Usar'}
                              </Button>
                            </div>
                          </div>
                        </Module>
                      ))}
                    </ContainerCards>
                    <AlignButtonsStepTwo>
                      <Button
                        layoutColor="button-green"
                        type="button"
                        onClick={() => setIsStepOne(true)}
                      >
                        <HiOutlineArrowLeft size={24} />
                        <span>Voltar</span>
                      </Button>
                      <Button
                        layoutColor="button-green"
                        onClick={() => {
                          if (
                            errors.code ||
                            errors.cnpj ||
                            errors.razao_social ||
                            errors.nome_fantasia ||
                            errors.email
                          ) {
                            toast.error(
                              'Preencha os campos anteriores corretamente!',
                            );
                            handleSubmit();
                          } else {
                            handleSubmit();
                          }
                        }}
                      >
                        <FiSave size={24} />
                        <span>Salvar</span>
                      </Button>
                    </AlignButtonsStepTwo>
                  </>
                )}
              </FormCustom>
            )}
          </Formik>
        </Step>
      </Container>
    </>
  );
};

export default RegisterCompany;
