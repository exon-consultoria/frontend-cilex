/* eslint-disable no-nested-ternary */
import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  useMemo,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';
import Switch from 'react-switch';

import api from '../../../../services/api';
import camera from '../../../../assets/camera.svg';
import { useCrudModules } from '../../../../hooks/useCrudModules';
import { IVaccine } from '../../../../types/pet/vaccine';
import { IEnclosure } from '../../../../types/pet/enclosure';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import InputFormik from '../../../../components/InputFormik';
import ButtonBack from '../../../../components/ButtonBack';
import ModalDelete from '../../../../components/ModalDelete';
import Select from '../../../../components/Select';
import CustomSelect from '../../../../components/CustomSelect';

import {
  Container,
  Main,
  HeaderContent,
  FormCustom,
  ContainerSwitch,
  ContainerInputFile,
  ContainerInputDate,
  ContainerPetData,
  InfoCard,
} from './styles';

interface VaccinesMultiSelect {
  label: string;
  value: string;
}

interface People {
  id: string;
  nome?: string;
  razao_social?: string;
}

interface RegisterPetForm {
  name: string;
  picture: any;
  breed: string;
  born_at: string;
  gender: string;
  sociable: boolean;
  castrated: boolean;
  items: string;
  enclosure_id: string;
  vaccines: string[];
  owner_id: string;
  note: string;
}

const EditPet: React.FC = () => {
  let navigate = useNavigate();
  const { id }: any = useParams();
  const { colors } = useContext(ThemeContext);
  const { deleteDataFromModule } = useCrudModules();

  const [petPicture, setPetPicture] = useState<any>(null);

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [pet, setPet] = useState({} as RegisterPetForm);

  const [peoples, setPeoples] = useState<People[]>([]);
  const [enclosures, setEnclosures] = useState<IEnclosure[]>([]);
  const [vaccinesOptions, setVaccinesOptions] = useState<VaccinesMultiSelect[]>(
    [],
  );

  useEffect(() => {
    api.get(`/pet/${id}`).then(response => {
      setPet(response.data);

      if (response.data.picture) {
        fetch(`http://localhost:3333/api/v1/files/${response.data.picture}`)
          .then(responsePic => {
            return responsePic.blob();
          })
          .then(myBlob => {
            const objectUrl = URL.createObjectURL(myBlob);
            setPet(prevState => ({
              ...prevState,
              picture: objectUrl,
            }));
          });
      }
    });
    api.get(`/pet_vaccine?pet=${id}`).then(response => {
      const petVaccines = response.data.map((item: any) => {
        return item.vaccine_id;
      });
      setPet(prevState => ({
        ...prevState,
        vaccines: petVaccines,
      }));
    });
    api.get<IVaccine[]>('/vaccine').then(response => {
      const fixListToUseInMultiSelect = response.data.map(vaccine => {
        return {
          label: vaccine.description,
          value: vaccine.id,
        };
      });
      setVaccinesOptions(fixListToUseInMultiSelect);
    });
    api.get('/person').then(response => {
      setPeoples(response.data);
    });
    api.get('/enclosure').then(response => {
      setEnclosures(response.data);
    });
  }, [id]);

  const formatDataToBR = (date: string): string => {
    const splitedDate = date.split('');
    const dateFormated = `${splitedDate[8]}${splitedDate[9]}/${splitedDate[5]}${splitedDate[6]}/${splitedDate[0]}${splitedDate[1]}${splitedDate[2]}${splitedDate[3]}`;
    return dateFormated;
  };

  const previewPetPicture = useMemo(() => {
    return petPicture ? URL.createObjectURL(petPicture) : null;
  }, [petPicture]);

  const handleSubmitForm = useCallback(
    async (data: RegisterPetForm) => {
      try {
        const {
          name,
          picture,
          breed,
          born_at,
          gender,
          sociable,
          castrated,
          items,
          enclosure_id,
          vaccines,
          owner_id,
          note,
        } = data;

        api
          .put(`/pet/${id}`, {
            name,
            breed: breed || undefined,
            born_at: born_at || undefined,
            gender: gender || undefined,
            sociable,
            castrated,
            enclosure_id: enclosure_id || undefined,
            owner_id,
            items: items || undefined,
            vaccines: vaccines || undefined,
            note: note || undefined,
          })
          .then(() => {
            if (picture) {
              const pet_id = id;

              const formData = new FormData();
              formData.append('picture', picture);

              api.patch(`/pet/${pet_id}`, formData).then(() => {
                toast.success('Atualizado com sucesso');
                navigate('/pet/pets');
              });
            } else {
              toast.success('Atualizado com sucesso');
              navigate('/pet/pets');
            }
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Pet!');
      }
    },
    [history, id],
  );

  const formSchemaPetEdit = Yup.object().shape({
    name: Yup.string(),
    picture: Yup.mixed(),
    breed: Yup.string(),
    born_at: Yup.string(),
    gender: Yup.string(),
    sociable: Yup.boolean(),
    castrated: Yup.boolean(),
    items: Yup.string(),
    enclosure_id: Yup.string(),
    // eslint-disable-next-line react/forbid-prop-types
    vaccines: Yup.array(),
    owner_id: Yup.string(),
    note: Yup.string(),
  });

  console.log(pet);

  return (
    <>
      <Container>
        <Header pageName="Editar Pet" />
        {pet && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/pet/pets" />
              </div>
              <div id="container-titles">
                <h2>{pet.name}</h2>
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

            <ContainerPetData>
              <InfoCard>
                <h4>Informações</h4>

                <span>
                  {pet.breed ? `Raça: ${pet.breed}` : 'Não há Raça cadastrada'}
                </span>
                <span>
                  {pet.born_at
                    ? `Nascimento: ${formatDataToBR(pet.born_at)}`
                    : 'Não há Data de Nascimento cadastrada'}
                </span>
                <span>
                  {pet.gender
                    ? `Gênero: ${pet.gender === 'male' ? 'Macho' : 'Fêmea'}`
                    : 'Não há Gênero cadastrado'}
                </span>
              </InfoCard>
              <InfoCard>
                <h4>Saúde</h4>

                <span>
                  {`Castrado: ${pet.castrated === true ? 'Sim' : 'Não'}`}
                </span>
                <span>
                  {Array.isArray(pet.vaccines)
                    ? pet.vaccines.length > 0
                      ? 'Possui Vacinas'
                      : 'Não possui Vacinas'
                    : 'Não há dados das Vacinas'}
                </span>
              </InfoCard>
            </ContainerPetData>

            {editting && (
              <Formik
                initialValues={{
                  name: pet.name,
                  picture: null,
                  breed: pet.breed ? pet.breed : '',
                  born_at: pet.born_at ? pet.born_at : '',
                  gender: pet.gender ? pet.gender : '',
                  sociable: pet.sociable,
                  castrated: pet.castrated,
                  items: pet.items ? pet.items : '',
                  enclosure_id: pet.enclosure_id ? pet.enclosure_id : '',
                  vaccines: pet.vaccines,
                  owner_id: pet.owner_id,
                  note: pet.note ? pet.note : '',
                }}
                validationSchema={formSchemaPetEdit}
                onSubmit={handleSubmitForm}
              >
                {({
                  handleChange,
                  touched,
                  values,
                  errors,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <FormCustom onSubmit={handleSubmit}>
                    <div id="align-inputs">
                      <InputFormik
                        name="name"
                        type="text"
                        placeholder="Nome"
                        value={values.name}
                        onChange={handleChange('name')}
                        messageError={
                          errors.name && touched.name ? errors.name : ''
                        }
                      />
                      <InputFormik
                        name="breed"
                        type="text"
                        placeholder="Raça"
                        value={values.breed}
                        onChange={handleChange('breed')}
                        messageError={
                          errors.breed && touched.breed ? errors.breed : ''
                        }
                      />
                      <ContainerInputDate>
                        <p>Nascimento: </p>
                        <Field
                          type="date"
                          name="born_at"
                          value={values.born_at}
                          onChange={handleChange('born_at')}
                        />
                      </ContainerInputDate>
                      <Select
                        name="gender"
                        value={values.gender}
                        onChange={handleChange('gender')}
                        messageError={
                          errors.gender && touched.gender ? errors.gender : ''
                        }
                      >
                        <option value="">Gênero</option>
                        <option value="male">Macho</option>
                        <option value="female">Fêmea</option>
                      </Select>
                      <Select
                        name="enclosure_id"
                        value={values.enclosure_id}
                        onChange={handleChange('enclosure_id')}
                        messageError={
                          errors.enclosure_id && touched.enclosure_id
                            ? errors.enclosure_id
                            : ''
                        }
                      >
                        <option value="">Localização</option>
                        {enclosures.map(enclosure => (
                          <option key={enclosure.id} value={enclosure.id}>
                            {enclosure.description}
                          </option>
                        ))}
                      </Select>
                      <Field
                        className="select-custom"
                        name="vaccines"
                        options={vaccinesOptions}
                        component={CustomSelect}
                        placeholder="Vacinas"
                        isMulti
                      />
                      <Select
                        name="owner_id"
                        value={values.owner_id}
                        onChange={handleChange('owner_id')}
                        messageError={
                          errors.owner_id && touched.owner_id
                            ? errors.owner_id
                            : ''
                        }
                      >
                        <option value="">Dono</option>
                        {peoples.map(people => (
                          <option key={people.id} value={people.id}>
                            {people.nome || people.razao_social}
                          </option>
                        ))}
                      </Select>
                      <InputFormik
                        name="items"
                        type="text"
                        placeholder="Acessórios"
                        value={values.items}
                        onChange={handleChange('items')}
                        messageError={
                          errors.items && touched.items ? errors.items : ''
                        }
                      />
                      <ContainerSwitch>
                        <p>Sociável ?</p>
                        <Switch
                          onChange={() => {
                            if (values.sociable === false) {
                              setFieldValue('sociable', true);
                            } else {
                              setFieldValue('sociable', false);
                            }
                          }}
                          checked={values.sociable}
                          checkedIcon={false}
                          uncheckedIcon={false}
                          onColor={colors.main}
                        />
                      </ContainerSwitch>
                      <ContainerSwitch>
                        <p>Castrado ?</p>
                        <Switch
                          onChange={() => {
                            if (values.castrated === false) {
                              setFieldValue('castrated', true);
                            } else {
                              setFieldValue('castrated', false);
                            }
                          }}
                          checked={values.castrated}
                          checkedIcon={false}
                          uncheckedIcon={false}
                          onColor={colors.main}
                        />
                      </ContainerSwitch>
                      <Field
                        as="textarea"
                        cols={30}
                        placeholder="Observações"
                        name="note"
                        value={values.note}
                        onChange={handleChange('note')}
                        messageError={
                          errors.note && touched.note ? errors.note : ''
                        }
                      />
                      <ContainerInputFile
                        style={{
                          backgroundImage: previewPetPicture
                            ? `url(${previewPetPicture})`
                            : `url(${pet.picture})`,
                        }}
                        hasThumb={!!(previewPetPicture || pet.picture)}
                      >
                        <p>Foto do Pet</p>
                        <input
                          id="picture"
                          name="picture"
                          type="file"
                          onChange={e => {
                            if (e.target.files) {
                              setPetPicture(e.target.files[0]);
                              setFieldValue('picture', e.target.files[0]);
                            }
                          }}
                        />
                        <img src={camera} alt="Select img" />
                      </ContainerInputFile>
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
            )}
          </Main>
        )}
      </Container>
      <ModalDelete
        visible={showModalDelete}
        setVisible={setShowModalDelete}
        actionToDelete={() => {
          deleteDataFromModule({ id, route: 'pet', routePush: 'pet/pets' });
        }}
      />
    </>
  );
};

export default EditPet;
