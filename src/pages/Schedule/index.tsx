import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import api from '../../services/api';

import ListCompromise from './ListCompromises';
import Header from '../../components/Header';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import ButtonBack from '../../components/ButtonBack';

import 'react-calendar/dist/Calendar.css';

import {
  Container,
  Main,
  ActionsArea,
  FormCustom,
  ContainerInputDate,
} from './styles';
import InputFormik from '../../components/InputFormik';

interface Compromise {
  id: string;
  date: string;
  hour: string;
  done: boolean;
  work: {
    id: string;
    color: string;
    description: string;
  };
  pet: {
    id: string;
    name: string;
  };
  owner: {
    id: string;
    nome?: string;
    razao_social?: string;
    endereco: string;
  };
  recurrence?: string;
}

interface RegisterCompromiseForm {
  date: string;
  hour: string;
  pet_id: string;
  work_id: string;
  recurrence: string;
}

interface Works {
  id: string;
  description: string;
  color: string;
}

interface Pets {
  id: string;
  name: string;
}

const formSchemaCompromise = Yup.object().shape({
  date: Yup.string().required('Data Obrigatória'),
  hour: Yup.string().required('Hora Obrigatória'),
  pet_id: Yup.string().required('Pet Obrigatório'),
  work_id: Yup.string().required('Serviço Obrigatório'),
  recurrence: Yup.string(),
});

const Schedule: React.FC = () => {
  const [compromises, setCompromises] = useState<Compromise[]>([]);
  const [DBCompromises, setDBCompromises] = useState<Compromise[]>([]);
  const [dayClicked, setDayClicked] = useState<string>(
    new Date().toLocaleDateString(),
  );
  const [works, setWorks] = useState<Works[]>([]);
  const [pets, setPets] = useState<Pets[]>([]);
  const [serviceSelected, setServiceSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    api.get('/work').then(response => {
      setWorks(response.data);
    });
    api.get('/pet').then(response => {
      setPets(response.data);
    });
  }, []);

  const handleClickDay = (day: Date | string) => {
    if (typeof day === 'string') {
      setDayClicked(day);

      api.get<Compromise[]>(`/appointments?date=${day}`).then(response => {
        setCompromises(response.data);
      });
    } else {
      setDayClicked(day.toLocaleDateString());

      api
        .get<Compromise[]>(`/appointments?date=${day.toLocaleDateString()}`)
        .then(response => {
          setCompromises(response.data);
        });
    }

    // const servicesInDayClicked = DBCompromises.filter(
    //   compromise => compromise.day === day.toLocaleDateString(),
    // ).filter(compromise =>
    //   serviceSelected
    //     ? compromise.service.title === serviceSelected
    //     : compromise.service.title !== '',
    // );

    // setCompromises(servicesInDayClicked);
  };

  const handleChangeServiceSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    const valueChange = e.target.value;
    setServiceSelected(valueChange);

    const servicesInDayClicked = DBCompromises.filter(
      compromise => compromise.date === dayClicked,
    ).filter(compromise =>
      valueChange
        ? compromise.work.description === valueChange
        : compromise.work.description !== '',
    );

    setCompromises(servicesInDayClicked);
  };

  const handleSubmitForm = useCallback(
    async (data: RegisterCompromiseForm) => {
      try {
        const { date, recurrence, hour, pet_id, work_id } = data;

        const splitedDate = date.split('');

        const year = Number(
          `${splitedDate[0]}${splitedDate[1]}${splitedDate[2]}${splitedDate[3]}`,
        );
        const month = Number(`${splitedDate[5]}${splitedDate[6]}`) - 1;
        const day = Number(`${splitedDate[8]}${splitedDate[9]}`);

        const formatedDate = new Date(year, month, day).toLocaleDateString(); // dd/mm/yyyy

        api
          .post('/appointments', {
            date: formatedDate,
            hour,
            pet_id,
            work_id,
            done: false,
            recurrence,
          })
          .then(() => {
            toast.success('Compromisso cadastado com sucesso!');
            handleClickDay(dayClicked);
            setModalVisible(false);
          })
          .catch(() => {
            toast.error('Criação do compromisso ocorreu um erro!');
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Compromisso');
      }
    },
    [dayClicked],
  );

  return (
    <Container>
      <Header pageName="Agenda" />
      <ActionsArea>
        <div id="align-buttons">
          <ButtonBack destinationBack="/menu" />
          <Button
            layoutColor="button-green"
            onClick={() => setModalVisible(true)}
          >
            Novo Compromisso
          </Button>
        </div>
        <Select value={serviceSelected} onChange={handleChangeServiceSelected}>
          <option value="">Serviços</option>
          {works.map(work => (
            <option key={work.id} value={work.id}>
              {work.description}
            </option>
          ))}
        </Select>
      </ActionsArea>
      <Main>
        <Calendar onClickDay={value => handleClickDay(value)} />
        <ListCompromise
          dayClicked={dayClicked}
          compromises={compromises}
          renderDay={handleClickDay}
        />
      </Main>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <Formik
          initialValues={{
            date: '',
            hour: '',
            pet_id: '',
            work_id: '',
            recurrence: '',
          }}
          validationSchema={formSchemaCompromise}
          onSubmit={handleSubmitForm}
        >
          {({ handleChange, touched, values, errors, handleSubmit }) => (
            <FormCustom onSubmit={handleSubmit}>
              <ContainerInputDate>
                <p>Data: </p>
                <input
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange('date')}
                />
              </ContainerInputDate>
              <InputFormik
                name="hour"
                type="text"
                placeholder="Hora"
                value={values.hour}
                onChange={handleChange('hour')}
                messageError={errors.hour && touched.hour ? errors.hour : ''}
              />
              <Select
                name="pet_id"
                value={values.pet_id}
                onChange={handleChange('pet_id')}
                messageError={
                  errors.pet_id && touched.pet_id ? errors.pet_id : ''
                }
              >
                <option value="">Pet</option>
                {pets.map(pet => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name}
                  </option>
                ))}
              </Select>
              <Select
                name="work_id"
                value={values.work_id}
                onChange={handleChange('work_id')}
                messageError={
                  errors.work_id && touched.work_id ? errors.work_id : ''
                }
              >
                <option value="">Serviços</option>
                {works.map(work => (
                  <option key={work.id} value={work.id}>
                    {work.description}
                  </option>
                ))}
              </Select>
              <Select
                name="recurrence"
                value={values.recurrence}
                onChange={handleChange('recurrence')}
                messageError={
                  errors.recurrence && touched.recurrence
                    ? errors.recurrence
                    : ''
                }
              >
                <option value="">Frequência</option>
                <option value="7d">7 dias</option>
                <option value="15d">15 dias</option>
                <option value="30d">30 dias</option>
              </Select>
              <Button layoutColor="button-green" type="submit">
                <FiSave size={24} />
                <span>Salvar</span>
              </Button>
            </FormCustom>
          )}
        </Formik>
      </Modal>
    </Container>
  );
};

export default Schedule;
