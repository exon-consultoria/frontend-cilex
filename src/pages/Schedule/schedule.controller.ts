import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { convertDate } from 'utils/convertDate'
import { toast } from 'react-toastify';
import api from 'services/api';
import { Compromise,Works,Pets,RegisterCompromiseForm } from './schedule.types'

export const scheduleController = () => {
  const [compromises, setCompromises] = useState<Compromise[]>([]);
  const [DBCompromises, setDBCompromises] = useState<Compromise[]>([]);
  const [dayClicked, setDayClicked] = useState<string>(
    new Date().toLocaleDateString(),
  );
  const [works, setWorks] = useState<Works[]>([]);
  const [pets, setPets] = useState<Pets[]>([]);
  const [serviceSelected, setServiceSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState<string>('')
  const [allCompromises,setAllCompromises] = useState<Compromise[]>([])
  
  useEffect(() => {
    api.get('/work').then(response => {
      setWorks(response.data);
    });

    api.get('/pet').then(response => {
      setPets(response.data);
    });

    api.get('/appointments').then(response => {
      setAllCompromises(response.data)
    })
  }, []);

  const handleClickDay = (day: Date | string) => {
    if (typeof day === 'string') {
      setDayClicked(day);
      api.get<Compromise[]>(`/appointments?date=${day}`).then(response => {
        setCompromises(response.data);
      });
    } else {
      setDayClicked(day.toLocaleDateString());
      api.get<Compromise[]>(`/appointments?date=${day.toLocaleDateString()}`)
        .then(response => { setCompromises(response.data)});
    }
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
    async ({compromise,data}:RegisterCompromiseForm) => {
      try {
        const { date, recurrence, hour, pet_id, work_id,dayInWeek ,endDate} = data;

        const dateInitial = convertDate(date);
        const dateFinal = convertDate(endDate);

        if(recurrence) {
          const allDates: Date[] = []
          const tempDate = new Date(dateInitial.getTime());
          
          while(tempDate <= dateFinal){
            allDates.push(new Date(tempDate));
            tempDate.setDate(tempDate.getDate() + 1);
          }
          const notUndefined = (anyValue:any) => typeof anyValue !== 'undefined' 

          const allAppointments = allDates.map((date) => {
            const dayWeek = date.getDay()
            const hasSchedule = dayInWeek.find(day => Number(day) === dayWeek)
            if(hasSchedule) {
              return ({
                date: date.toLocaleDateString('pt-BR'),
                hour,
                pet_id,
                work_id,
                done: false,
                recurrence
              })
            }
          }).filter(notUndefined)

          if(compromise) {
            return api.put(`/appointments/${compromise.id}`, {
              date: compromise.date,
              hour: compromise.hour,
              work_id: compromise.work.id,
              pet_id: compromise.pet.id,
              done: true,
            })
              .then(() => {
                api.post('/appointments/many', allAppointments).then(() => {
                  toast.success('Compromisso cadastrado com sucesso!');
                  handleClickDay(dayClicked);
                  setModalVisible(false);
                })
                  .catch(() => {
                    toast.error('Criação do compromisso ocorreu um erro!');
                  });
              })
          }
          return api.post('/appointments/many', allAppointments)
            .then(() => {
              toast.success('Compromisso cadastrado com sucesso!');
              handleClickDay(dayClicked);
              setModalVisible(false);
            })
            .catch(() => {
              toast.error('Criação do compromisso ocorreu um erro!');
            });
        }else {
          api.post('/appointments', {
            date: dateInitial.toLocaleDateString('pt-BR'),
            hour,
            pet_id,
            work_id,
            done: false,
            recurrence
          }).then(() => {
            toast.success('Compromisso cadastrado com sucesso!');
            setModalVisible(false);
            handleClickDay(dayClicked);
          })
            .catch(() => {
              toast.error('Criação do compromisso ocorreu um erro!');
            });
        }
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Compromisso');
      }
    },
    [dayClicked],
  );
    

  const handleUnfinishedCompromise = (compromise:Compromise) => {
    api
      .put(`/appointments/${compromise.id}`, {
        date: compromise.date,
        hour: compromise.hour,
        work_id: compromise.work.id,
        pet_id: compromise.pet.id,
        done: false,
      })
      .then(() => {
        toast.success('Serviço concluído!');
        handleClickDay(compromise.date);
        setModalVisible(false);
      })
      .catch(() => {
        toast.error('Erro na conclusão do Serviço!');
      });
  };

  const handleDeleteCompromise = (selectedCompromise:Compromise) => {
    if(selectedCompromise.recurrence && type === 'all') {
      const getByRecurrence = allCompromises.filter(compromise => compromise.recurrence_id === selectedCompromise.recurrence_id)
      const ids = getByRecurrence.map((recurrence) => recurrence.id).toString()

      api
        .delete(`/appointments/many/${ids}`)
        .then(() => {
          toast.success('Todos os compromissos foram deletados.');
        })
        .catch(() => {
          toast.error('Erro na exclusão dos Compromissos.');
        });
    }

    if(selectedCompromise.recurrence && type === 'since') {
      const formattedDate = selectedCompromise.date.replaceAll('/','-')
      api
        .delete(`/appointments/appointment/${formattedDate}`)
        .then(() => {
          toast.success(`Compromissos após ${selectedCompromise.date} foram deletados.`);
        })
        .catch(() => {
          toast.error('Erro na exclusão dos Compromissos.');
        });
    }

    if(type === 'one') {
      api
        .delete(`/appointments/${selectedCompromise.id}`)
        .then(() => {
          toast.success('Compromisso deletado.');
          handleClickDay(selectedCompromise.date);
        })
        .catch(() => {
          toast.error('Erro na exclusão do Compromisso.');
        });
    }
  };

  const handleFinishedCompromise = () => {
    api.get('/work').then(response => {
      setWorks(response.data);
    });
    api.get('/pet').then(response => {
      setPets(response.data);
    });

    setModalVisible(true);
  };

  return {
    states: {
      compromises,
      dayClicked,
      works,
      pets,
      serviceSelected,
      modalVisible
    },
    actions: {
      handleClickDay,
      handleChangeServiceSelected,
      handleSubmitForm,
      setModalVisible,
      handleUnfinishedCompromise,
      handleDeleteCompromise,
      handleFinishedCompromise,
      setType,
    }
  }
}