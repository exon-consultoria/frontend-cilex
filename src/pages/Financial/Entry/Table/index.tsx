import { DefaultTable } from 'components'
import { formatDate } from 'utils/formatDate';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { IIncome } from 'types/Income/income';
import { IEntry } from 'types/entry/entry';

type Colors = {
  main: string;
  mainHover: string;
  green: string;
}

interface TableProps {
  incomes:IIncome[];
  entries:IEntry[];
  colors: Colors;
}

export const Table = ({incomes,entries,colors}:TableProps) => {

  const findIncome = (id:string | undefined) => { 
    const income = incomes.find((income) => income.id === id)
    return income?.account
  }
  

  return (
    <DefaultTable tbh={[
      'Data do lançamento',
      'tipo',
      'Plano de contas',
      'Valor',
      'Vencimento',
      'Valor Baixa',
      'Data Baixa',
      'Status do titulo',
      'Status Baixa',
      'Balanço',
    ]}>
      <tbody>
        {entries.map(entry => (
          <tr key={entry.id}>
            <td>{formatDate(new Date(entry.date_income))}</td>

            <td>{entry.type}</td>

            <td>{findIncome(entry.income_id)}</td>

            <td className="money"><span>R$</span> {entry.value.includes('.') ? entry.value : `${entry.value}.00`}</td>

            <td>{formatDate(new Date(entry.date_to_pay))}</td>

            <td className="money"><span>R$</span> {entry.value_payed.includes('.') ? entry.value_payed : `${entry.value_payed}.00`}</td>

            <td>{formatDate(new Date(entry.date_payed))}</td>

            <td>{entry.title_status}</td>
            <td>{entry.payed_status}</td>

            <td className="money"><span>R$</span> {entry.cash_flow.includes('.') ? entry.cash_flow : `${entry.cash_flow}.00`}</td>
            <td>
              <Link
                style={{ textDecoration: 'none' }}
                to={`/financial/entry/${entry.id}`}
              >
                <FiEye size={24} color={colors.main} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </DefaultTable>
  )
}