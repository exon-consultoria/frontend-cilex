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

import api from 'services/api';
import camera from 'assets/camera.svg';
import { IVaccine } from 'types/pet/vaccine';
import { IEnclosure, IEnclosureSizes } from 'types/pet/enclosure';

import { Header, ButtonBack, InputFormik, Button, Select, CustomSelect} from 'components';
import { Occupation } from '../../Occupation'

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
  dog_size: string;
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
  vaccines: Yup.array(),
  owner_id: Yup.string().required('Dono Obrigatório'),
  note: Yup.string().required(),
  dog_size: Yup.string().required()
});

const RegisterPet: React.FC = () => {
  const navigate = useNavigate();
  const { colors } = useContext(ThemeContext);

  const [peoples, setPeoples] = useState<People[]>([]);
  const [petPicture, setPetPicture] = useState<any>(null);
  const [vaccinesOptions, setVaccinesOptions] = useState<VaccinesMultiSelect[]>(
    [],
  );
  const [allEnclosures, setAllEnclosures] = useState<IEnclosure[]>([]);
  const [enclosure,setEnclosure] = useState<IEnclosure>({} as IEnclosure)
  const [dogSize, setDogSize] = useState<string>('')
  const [enclosuresBySize,setEnclosuresBySize] = useState<IEnclosure[]>([])
  const [selectedEnclosure, setSelectedEnclosure] = useState<string>('')
  const [hasCapacity, setHasCapacity] = useState<boolean>(false)

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
      setAllEnclosures(response.data);
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
          dog_size
        } = data;

        const enclosureUpdated = enclosure.enclosure_size
          .map((enclosure) => {
            if(enclosure.size === dog_size) {
              const newSize = Number(enclosure.available) - 1
              if(newSize <= 0) return enclosure
              enclosure.available = newSize.toString()
              return enclosure
            }
            return enclosure
          })

        api.put(`/enclosure/${enclosure.id}`, {
          code: enclosure.code,
          description: enclosure.description,
          size: enclosure.size,
          enclosure_size: enclosureUpdated
        })

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
            size: dog_size
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
    [history,enclosure]
  );

  useEffect(() => {
    const enclosureSize = allEnclosures.filter((enclosure) => {
      const { size } = enclosure

      const isBig = size === 'g'
      const isMedium = size === 'm' && dogSize !== 'g'
      const isSmall = size ==='p' && dogSize === 'p'
  
      if(dogSize === 'null') return null
      
      if(isBig) return enclosure

      if(isMedium) return enclosure

      if(isSmall) return enclosure
    })
    setEnclosuresBySize(enclosureSize)
  },[dogSize])

  
  useEffect(() => {
    if(selectedEnclosure === 'null') return setEnclosure({} as IEnclosure)
    
    const enclosure = allEnclosures.find((enclosure) => enclosure.id === selectedEnclosure)
    
    if(enclosure) {
      setEnclosure(enclosure)
    }
  },[selectedEnclosure])

  useMemo(() => {
    setHasCapacity(enclosure?.enclosure_size?.some((enclosure) => enclosure.size === dogSize && Number(enclosure.available) > 0))
  },[enclosure,dogSize])


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
              dog_size: ''
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
                <Occupation enclosure={enclosure}/>
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
                    name="dog_size"
                    value={values.dog_size}
                    onChange={e=> {
                      handleChange(e)
                      setDogSize(e.target.value)
                    }}
                    messageError={
                      errors.dog_size && touched.dog_size ? errors.dog_size : ''
                    }
                  >
                    <option value="null">Porte</option>
                    <option value="p">Pequeno</option>
                    <option value="m">Médio</option>
                    <option value="g">Grande</option>
                  </Select>
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
                    onChange={e => {
                      const inputValue = e.target.value
                      handleChange(e)
                      setSelectedEnclosure(inputValue)
                    }}
                  >
                    <option value="null">Canil</option>
                    {enclosuresBySize.map(enclosure => (
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
                  <Button layoutColor="button-green" disabled={!hasCapacity} type="submit">
                    <FiSave size={24} />
                    <span>{hasCapacity ? 'Salvar': 'Canil não suporta'}</span>
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
