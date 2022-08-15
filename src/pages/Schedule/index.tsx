import React from 'react';
import Calendar from 'react-calendar';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import * as Yup from 'yup';

import { scheduleController } from './schedule.controller'
import ListCompromise from './ListCompromises';
import Header from '../../components/Header';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import ButtonBack from '../../components/ButtonBack';
import { stringDaysWeek } from '../../utils/daysOfWeek'

import 'react-calendar/dist/Calendar.css';

import {
  Container,
  Main,
  ActionsArea,
  FormCustom,
  ContainerInputDate,
  Day
} from './styles';
import InputFormik from '../../components/InputFormik';

const formSchemaCompromise = Yup.object().shape({
  date: Yup.string().required('Data Obrigatória'),
  hour: Yup.string().required('Hora Obrigatória'),
  pet_id: Yup.string().required('Pet Obrigatório'),
  work_id: Yup.string().required('Serviço Obrigatório'),
  recurrence: Yup.string(),
});

const Schedule: React.FC = () => {
  const {
    actions:{
      handleClickDay,
      handleChangeServiceSelected,
      handleSubmitForm,
      setModalVisible
    },
    states: {
      compromises,
      dayClicked,
      modalVisible,
      pets,
      serviceSelected,
      works
    }
  } = scheduleController()

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
            recurrence: false,
            dayInWeek: [],
            endDate: ''
          }}
          validationSchema={formSchemaCompromise}
          onSubmit={(props) => handleSubmitForm({compromise: undefined, data: props})}
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
              <ContainerInputDate>
                <p>Recorrência? </p>
                <input
                  type="checkbox"
                  name="recurrence"
                  onChange={handleChange('recurrence')}
                />
              </ContainerInputDate>
              {values.recurrence && (
                <ContainerInputDate>
                  {stringDaysWeek.map((dayWeek,index) => (
                    <Day>
                      <p>{dayWeek}</p>
                      <input type='checkbox' name='dayInWeek' value={index}  onChange={handleChange('dayInWeek')}/>
                    </Day>
                  )) }
                </ContainerInputDate>
              )}
              {values.recurrence && (
                <ContainerInputDate>
                  <p>Data Final: </p>
                  <input
                    type="date"
                    name="endDate"
                    value={values.endDate}
                    onChange={handleChange('endDate')}
                  />
                </ContainerInputDate>
              )}
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
