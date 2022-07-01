import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import api from '../../../services/api';

import Header from '../../../components/Header';
import Button from '../../../components/Button';
import InputFormik from '../../../components/InputFormik';
import ButtonBack from '../../../components/ButtonBack';
import ModalDelete from '../../../components/ModalDelete';

import {
  Container,
  Main,
  HeaderContent,
  FormCustom,
  ContainerListModules,
} from './styles';

interface RegisterUserGroupForm {
  code: string;
  description: string;
  modules: SelectFields[];
}

interface Module {
  module: {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
    url: string;
    classIcon: string;
  };
}

interface SelectFields {
  classIcon: string;
  value: string;
  label: string;
}

const EditUserGroup: React.FC = () => {
  let navigate = useNavigate();
  const { id }: any = useParams();
  const { colors } = useContext(ThemeContext);

  const company = localStorage.getItem('@Cilex:companySelected');

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [group, setGroup] = useState<RegisterUserGroupForm | null>(null);
  const [listModulesUsed, setListModulesUsed] = useState<SelectFields[]>([]);
  const [listModulesAvailable, setListModulesAvailable] = useState<
    SelectFields[]
  >([]);

  useEffect(() => {
    api.get<RegisterUserGroupForm | null>(`/group/${id}`).then(response => {
      setGroup(response.data);
    });

    api.get<Module[]>(`/group_modules?group=${id}`).then(response2 => {
      const responseModules = response2.data;

      const eachListModules = responseModules.map(listModule => {
        return {
          value: listModule.module.id,
          label: listModule.module.title,
          classIcon: listModule.module.classIcon,
        };
      });

      setListModulesUsed(eachListModules);

      api
        .get<Module[]>(
          `company_modules/?company_id=${JSON.parse(company as string).id}`,
        )
        .then(response => {
          const responseModules2 = response.data;

          const eachListModules2 = responseModules2.map(listModule => {
            return {
              value: listModule.module.id,
              label: listModule.module.title,
              classIcon: listModule.module.classIcon,
            };
          });

          const modulesFiltered: SelectFields[] = [];

          eachListModules2.forEach(k => {
            const isIncluded = eachListModules.find(j => j.value === k.value);

            if (!isIncluded) {
              modulesFiltered.push(k);
            }
          });

          setListModulesAvailable(modulesFiltered);
        });
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: RegisterUserGroupForm) => {
      const modules: string[] = [];
      listModulesUsed.forEach(module => {
        modules.push(module.value);
      });

      try {
        api
          .put(`/group/${id}`, {
            code: data.code,
            description: data.description,
            modules,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            navigate('/group');
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Grupo!');
      }
    },
    [history, listModulesUsed, id],
  );

  const formSchemaUserGroupEdit = Yup.object().shape({
    code: Yup.string(),
    description: Yup.string(),
    // eslint-disable-next-line react/forbid-prop-types
    modules: Yup.array(),
  });

  const handleDeleteGroup = () => {
    api
      .delete(`/group/${id}`)
      .then(() => {
        toast.success('Deletado com Sucesso');
        navigate('/group');
      })
      .catch(() => {
        toast.success('Erro ao deletar Grupo');
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
  };

  const handleAddModule = ({ value, label, classIcon }: SelectFields) => {
    const availableList = [...listModulesAvailable];
    const updateModules = [...listModulesUsed];

    const hasModuleSelected = updateModules.find(
      module => module.value === value,
    );

    const moduleIndex = availableList.findIndex(
      module => module.value === value,
    );

    availableList.splice(moduleIndex, 1);

    setListModulesAvailable([...availableList]);

    if (hasModuleSelected) {
      toast.info('Módulo já selecionado');
    } else {
      setListModulesUsed([...updateModules, { value, label, classIcon }]);
    }
  };

  const handleRemoveModule = ({ value, label, classIcon }: SelectFields) => {
    const updateModules = [...listModulesUsed];

    const moduleIndex = updateModules.findIndex(
      module => module.value === value,
    );

    setListModulesAvailable([
      ...listModulesAvailable,
      { value, label, classIcon },
    ]);

    if (moduleIndex >= 0) {
      updateModules.splice(moduleIndex, 1);
      setListModulesUsed(updateModules);
    } else {
      toast.info('Módulo não existente');
    }
  };

  return (
    <>
      <Container>
        <Header pageName="Editar Grupo de Usuários" />
        {group && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/group" />
              </div>
              <div id="container-titles">
                <h2>{group.description}</h2>
                <p>{group.code}</p>
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

            {editting && (
              <Formik
                initialValues={{
                  code: group.code,
                  description: group.description,
                  modules: [],
                }}
                validationSchema={formSchemaUserGroupEdit}
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
                    </div>
                    <ContainerListModules>
                      <div className="content-modules">
                        <h3>Módulos Selecionados</h3>

                        <ul>
                          {listModulesUsed.map(module => (
                            <li key={module.value}>
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveModule({
                                    value: module.value,
                                    label: module.label,
                                    classIcon: module.classIcon,
                                  })
                                }
                              >
                                <i className={module.classIcon} />
                                {module.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="content-modules">
                        <h3>Módulos Disponíveis</h3>

                        <ul>
                          {listModulesAvailable.map(module => (
                            <li key={module.value}>
                              <button
                                type="button"
                                onClick={() =>
                                  handleAddModule({
                                    value: module.value,
                                    label: module.label,
                                    classIcon: module.classIcon,
                                  })
                                }
                              >
                                <i className={module.classIcon} />
                                {module.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ContainerListModules>
                    <div id="align-button-save">
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
        actionToDelete={handleDeleteGroup}
      />
    </>
  );
};

export default EditUserGroup;
