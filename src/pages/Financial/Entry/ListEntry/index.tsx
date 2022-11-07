import React, { useEffect, useState, useContext, useReducer, SetStateAction, Dispatch } from 'react';
import { ThemeContext } from 'styled-components';
import { months } from 'constants'

import api from 'services/api';
import { IEntry } from 'types/entry/entry';

import { NewButton, Header, ButtonBack, EmptyData, Select, BarChart } from 'components'
import { Container, Main, ContainerInputWithLabel, TotalCashFlow, CashFlowText } from './styles';
import { IIncome } from 'types/Income/income';
import { format, isSameMonth } from 'date-fns/esm';
import { Table } from '../Table';
import { ptBR } from 'date-fns/locale';

type Action =  
| { type: 'Date' | string; 
  payload: {
  entries: IEntry[],
  inputValue?: string,
  setDateType?: Dispatch<SetStateAction<boolean>>
} }
| { type: 'Entrada' | null; 
    payload: {
      entries: IEntry[],
      inputValue?: string ,
      setDateType?: Dispatch<SetStateAction<boolean>>
} }
| { type: 'Saida' | null; 
    payload: {
      entries: IEntry[],
      inputValue?: string ,
      setDateType?: Dispatch<SetStateAction<boolean>>
} };

const reducer = (_:any, action:Action) => {
  const { payload, type } = action
  const { entries, inputValue, setDateType } = payload
  setDateType && setDateType(false)

  if(type === 'Date') {
    setDateType && setDateType(true)
    const filter = entries.filter((entry) => {
      const filterValueDate = new Date(inputValue || '')
      const entryDate = new Date(entry.date_income)
      
      if(!inputValue) {
        return isSameMonth(new Date(),entryDate)
      }
      return isSameMonth(filterValueDate,entryDate)
    })
    return filter
  }

  if(type === 'Entrada' || type === 'Saida') {
    const filterByType = entries.filter((entry) => {
      return entry.type === type
    })
    return filterByType
  }
  return entries
}

const chartValue = (entriesByMonth:IEntry[],type:string) => 
  months.map((month) => 
    entriesByMonth
      .filter((entry) => entry.month === month && entry.type === type )
      .reduce((acc,curr) =>  Number(curr.value) + acc , 0)
  )

export const ListEntry: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const [entries, setEntries] = useState<IEntry[]>([])
  const [incomes, setIncomes] = useState<IIncome[]>([])
  const [entriesFiltered, dispatch] = useReducer(reducer,entries)
  const [dateType, setDateType] = useState(false)
  
  const defaultDate = new Date().toISOString().substr(0 ,10)
  
  useEffect(() => {
    api.get<IEntry[]>('/entry').then(response => {
      setEntries(response.data);
      dispatch({payload: {entries: response.data, inputValue: '',setDateType: undefined}, type: null})
    });
    api.get<IIncome[]>('/income').then(response => {
      setIncomes(response.data);
    });
  }, []);


  const entriesByMonth = entriesFiltered.map((entry) => {
    if(entry.date_payed) {
      const month = format(new Date(entry.date_payed),'MMM', { locale: ptBR })
      return {...entry, month}
    }
    return {...entry}
  })

  
  const totalReceive = chartValue(entriesByMonth, 'Entrada')
  const totalPayed = chartValue(entriesByMonth, 'Saida')

  const a = totalReceive.reduce((acc,curr) => acc + curr, 0)
  const b = totalPayed.reduce((acc,curr) => acc+ curr, 0)
  
  const totalCashFlow = (- b + a).toFixed(2)

  const chartValues = {
    labels: months,
    datasets: [
      {
        label: 'Entradas',
        data: totalReceive,
        backgroundColor: colors.main,

      },
      {
        label: 'Saídas',
        data: totalPayed,
        backgroundColor: colors.green,
      },
    ]
  }

  return (
    <Container>
      <Header pageName="Lançamentos" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/financial" />
          <div id="align-buttons">
            <NewButton to="/financial/entry/register">Novo</NewButton>
          </div>
          <TotalCashFlow>
            <BarChart values={chartValues}/>
            <CashFlowText balance={Number(totalCashFlow) > 0 ? 'positive' : 'negative'}>
              Fluxo de caixa
              <br />
              R$ {totalCashFlow}
            </CashFlowText>
          </TotalCashFlow>
          <div style={{width: '300px', display: 'flex', gap: '10px'}}>
            <Select
              style={{width: '400px'}}
              onChange={(e) => dispatch({payload: {entries, setDateType}, type: e.target.value})}
            >
              <option value=''>Filtrar por...</option>
              <option value='Date'>Data</option>
              <option value='Entrada'>Entrada</option>
              <option value='Saida'>Saida</option>
            </Select>
            {dateType && (
              <ContainerInputWithLabel>
                <p>Data: </p>
                <input
                  type="date"
                  defaultValue={defaultDate}
                  onChange={(e) => dispatch({payload: {entries,inputValue: e.target.value}, type: 'Date'})}
                  style={{width: '200px'}}
                />
              </ContainerInputWithLabel>
            )}
          </div>
          {
            entriesFiltered.length > 0 
              ? <Table incomes={incomes} entries={entriesFiltered} colors={colors}/>
              : <EmptyData /> 
          }
        </div>
      </Main>
    </Container>
  );
};

