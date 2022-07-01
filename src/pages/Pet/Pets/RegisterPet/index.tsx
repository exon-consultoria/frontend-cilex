import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';

import api from '../../../../services/api';
import camera from '../../../../assets/camera.svg';
import { IVaccine } from '../../../../types/pet/vaccine';
import { IEnclosure } from '../../../../types/pet/enclosure';

import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import InputFormik from '../../../../components/InputFormik';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import CustomSelect from '../../../../components/CustomSelect';

import {
  Container,
  Main,
  FormCustom,
  ContainerSwitch,
  ContainerInputFile,
  ContainerInputDate,
} from './styles';

interface VaccinesMultiSelect {
  label: string;
  value: string;
}

interface RegisterPetForm {
  name: string;
  picture: string;
  breed: string;
  bornAt: string;
  gender: string;
  sociable: boolean;
  castrated: boolean;
  items: string;
  enclosure_id: string;
  vaccines: string[];
  owner_id: string;
  note: string;
}

interface People {
  id: string;
  nome?: string;
  razao_social?: string;
}

const formSchemaPet = Yup.object().shape({
  name: Yup.string().required('Nome Obrigatório'),
  picture: Yup.mixed(),
  breed: Yup.string(),
  bornAt: Yup.string(),
  gender: Yup.string(),
  sociable: Yup.boolean(),
  castrated: Yup.boolean(),
  items: Yup.string(),
  enclosure_id: Yup.string(),
  // eslint-disable-next-line react/forbid-prop-types
  vaccines: Yup.array(),
  owner_id: Yup.string().required('Dono Obrigatório'),
  note: Yup.string(),
});

const RegisterPet: React.FC = () => {
  let navigate = useNavigate();
  const { colors } = useContext(ThemeContext);

  const [peoples, setPeoples] = useState<People[]>([]);
  const [petPicture, setPetPicture] = useState<any>(null);
  const [vaccinesOptions, setVaccinesOptions] = useState<VaccinesMultiSelect[]>(
    [],
  );
  const [enclosures, setEnclosures] = useState<IEnclosure[]>([]);

  const previewPetPicture = useMemo(() => {
    return petPicture ? URL.createObjectURL(petPicture) : null;
  }, [petPicture]);

  useEffect(() => {
    api.get('/person').then(response => {
      setPeoples(response.data);
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
    api.get<IEnclosure[]>('/enclosure').then(response => {
      setEnclosures(response.data);
    });
  }, []);

  const handleSubmitForm = useCallback(
    async (data: RegisterPetForm) => {
      try {
        const {
          name,
          picture,
          breed,
          bornAt,
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
          .post('/pet', {
            name,
            breed: breed || undefined,
            born_at: bornAt || undefined,
            gender: gender || undefined,
            sociable,
            castrated,
            enclosure_id: enclosure_id || undefined,
            owner_id,
            items: items || undefined,
            vaccines: vaccines || undefined,
            note: note || undefined,
          })
          .then(response => {
            if (picture) {
              const pet_id = response.data.id;

              const formData = new FormData();
              formData.append('picture', picture);

              api.patch(`/pet/${pet_id}`, formData).then(() => {
                toast.success('Registrado com sucesso');
                navigate('/pet/pets');
              });
            } else {
              toast.success('Registrado com sucesso');
              navigate('/pet/pets');
            }
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Pet');
      }
    },
    [history],
  );

  console.log('Re-load');

  return (
    <>
      <Container>
        <Header pageName="Registro de Pet" />
        <ButtonBack destinationBack="/pet/pets" />
        <Main>
          <Formik
            initialValues={{
              name: '',
              picture: '',
              breed: '',
              bornAt: '',
              gender: '',
              sociable: false,
              castrated: false,
              items: '',
              enclosure_id: '',
              vaccines: [],
              owner_id: '',
              note: '',
            }}
            validationSchema={formSchemaPet}
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
                    <input
                      type="date"
                      name="bornAt"
                      value={values.bornAt}
                      onChange={handleChange('bornAt')}
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
                  >
                    <option value="">Canil</option>
                    {enclosures.map(enclosure => (
                      <option key={enclosure.id} value={enclosure.id}>
                        {enclosure.code} - {enclosure.description}
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
                  <textarea
                    cols={30}
                    placeholder="Observações"
                    name="note"
                    value={values.note}
                    onChange={handleChange('note')}
                  />
                  <ContainerInputFile
                    style={{
                      backgroundImage: `url(${previewPetPicture})`,
                    }}
                    hasThumb={petPicture}
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
        </Main>
      </Container>
    </>
  );
};

export default RegisterPet;
