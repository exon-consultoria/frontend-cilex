import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { BsTrash } from 'react-icons/bs';
import { ImCheckboxUnchecked, ImCheckmark } from 'react-icons/im';
import { FiSave } from 'react-icons/fi';
import { Formik } from 'formik';

import { Select, Button, Modal, InputFormik} from 'components';

import {
    Container,
    InsideContainer,
    ServiceIdentifier,
    AlignTexts,
    FormCustom,
    ContainerInputDate,
    ContainerButtonsActions,
    ButtonActions,
    ContainerButtonsModal,
    DeleteContainer,
    DeleteOption,
    Day,
} from './styles';
import { format } from 'date-fns';
import { stringDaysWeek } from 'utils/daysOfWeek';
import { scheduleController } from '../schedule.controller';
import { Compromise } from '../schedule.types'
interface CompromiseRowProps {
  compromise: Compromise
  showDetail: boolean;
}

const CompromiseRow: React.FC<CompromiseRowProps> = ({
  compromise,
  showDetail,
}) => {
  const {
    actions: {
      handleFinishedCompromise,
      handleUnfinishedCompromise,
      setType,
      handleDeleteCompromise,
      setModalVisible,
      handleSubmitForm
    },
    states: {
      pets,
      works,
      modalVisible,
    }
  } = scheduleController()
  const { colors } = useContext(ThemeContext);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

  const splitDate = compromise.date.split('/')
  const dateFormatted = format(new Date(+splitDate[2], splitDate[1] - 1, +splitDate[0]),'yyyy-MM-dd')
  
  return (
    <>
      <Container done={compromise.done}>
        <InsideContainer>
          <ServiceIdentifier color={compromise.work.color} />

          <AlignTexts>
            <p>
              <b>{compromise.hour}</b> - {compromise.work.description}
            </p>

            {showDetail && (
              <>
                <p>
                  <b>Pet:</b> {compromise.pet.name}
                </p>
                <p>
                  <b>Dono:</b>{' '}
                  {compromise.owner.nome || compromise.owner.razao_social}
                </p>
                <p>
                  <b>Endereço:</b> {compromise.owner.endereco}
                </p>
              </>
            )}
          </AlignTexts>

          <ContainerButtonsActions>
            {compromise.done ? (
              <ButtonActions onClick={()=> handleUnfinishedCompromise(compromise)}>
                <ImCheckmark size={20} color={colors.main} />
              </ButtonActions>
            ) : (
              <ButtonActions onClick={handleFinishedCompromise}>
                <ImCheckboxUnchecked size={20} color={colors.main} />
              </ButtonActions>
            )}
            <ButtonActions onClick={() => setModalDeleteVisible(true)}>
              <BsTrash size={22} color="#F00" />
            </ButtonActions>
          </ContainerButtonsActions>
        </InsideContainer>
      </Container>
      {modalVisible && (
        <Modal visible={modalVisible} setVisible={setModalVisible}>
          <Formik
            initialValues={{
              date: dateFormatted,
              hour: compromise.hour,
              pet_id: compromise.pet.id,
              work_id: compromise.work.id,
              done: true,
              dayInWeek: [],
              recurrence: compromise.recurrence,
              endDate: ''
            }}
            onSubmit={(props) => handleSubmitForm({compromise,data: props})}
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
                    disabled={!compromise.recurrence}
                  />
                </ContainerInputDate>
                <InputFormik
                  name="hour"
                  type="text"
                  placeholder="Hora"
                  value={values.hour}
                  onChange={handleChange('hour')}
                  messageError={errors.hour && touched.hour ? errors.hour : ''}
                  disabled={!compromise.recurrence}
                />
                <Select
                  name="pet_id"
                  value={values.pet_id}
                  onChange={handleChange('pet_id')}
                  messageError={
                    errors.pet_id && touched.pet_id ? errors.pet_id : ''
                  }
                  disabled={!compromise.recurrence}
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
                  disabled={!compromise.recurrence}
                >
                  <option value="">Serviços</option>
                  {works.map(work => (
                    <option key={work.id} value={work.id}>
                      {work.description}
                    </option>
                  ))}
                </Select>
                {!compromise.recurrence && (
                  <>
                    <ContainerInputDate>
                      <p>Recorrência? </p>
                      <input
                        type="checkbox"
                        name="recurrence"
                        onChange={handleChange('recurrence')}
                      />
                    </ContainerInputDate>
                    <ContainerInputDate>
                      {values.recurrence && (
                        stringDaysWeek.map((dayWeek,index) => (
                          <Day>
                            <p>{dayWeek}</p>
                            <input type='checkbox' name='dayInWeek' value={index}  onChange={handleChange('dayInWeek')}/>
                          </Day>
                        ))
                      )}
                    </ContainerInputDate>
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
                  </>
                )}
                <Button layoutColor="button-green" type="submit">
                  <FiSave size={24} />
                  <span>
                    Concluir
                  </span>
                </Button>
              </FormCustom>
            )}
          </Formik> 
        </Modal>
      )}
      {modalDeleteVisible && (
        <Modal visible={modalDeleteVisible} setVisible={setModalDeleteVisible}>
        
          <DeleteContainer>
            <DeleteOption>
              <input type="radio" id="deleteOne" name="delete" value='one' onChange={(e) => setType(e.target.value)} />
              <label htmlFor="deleteOne">Deseja excluir apenas este evento ?</label>
            </DeleteOption>
            {compromise.recurrence && (
              <>
                <DeleteOption >
                  <input type="radio" id="deleteSince" name="delete" value='since' onChange={(e) => setType(e.target.value)} />
                  <label htmlFor="deleteSince">Deseja excluir deste evento para frente ?</label>
                </DeleteOption>

                <DeleteOption>
                  <input type="radio" id="deleteAll" name="delete" value='all' onChange={(e) => setType(e.target.value)}/>
                  <label htmlFor="deleteAll">Deseja excluir todos os eventos ?</label>
                </DeleteOption>
              </>
            )}
          </DeleteContainer>
          <ContainerButtonsModal>
            <Button
              layoutColor="button-outline"
              type="button"
              onClick={() => setModalDeleteVisible(false)}
            >
              Não
            </Button>
            <Button
              layoutColor="button-filled"
              type="button"
              onClick={() => {
                handleDeleteCompromise(compromise);
                setModalDeleteVisible(false);
              }}
            >
              Sim
            </Button>
          </ContainerButtonsModal>
        </Modal>
      )}
    </>
  );
};

export default CompromiseRow;
