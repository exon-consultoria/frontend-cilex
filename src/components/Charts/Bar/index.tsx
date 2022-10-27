import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import * as S from './styles'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

type IData = {
    labels: string[]
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
    }[];
}
interface ValuesTypes  {
  values: IData
}

export const BarChart:React.FC<ValuesTypes> = ({values}:ValuesTypes) => {
  const { colors } = useContext(ThemeContext);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    barPercentage: 0.1,
    scales: {
      x: {
        ticks: {
          color: colors.main,
          font: {
            size: 16
          }
        }
      },
      y: {
        display: false
      }
    }
  };


  return (
    <S.Container>
      <Bar options={options} data={values}/>
    </S.Container>
  )
}