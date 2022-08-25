export interface IEntry {
  id: string;
  date_income: string;
  type: string;
  financial_entity: string;
  chart_of_accounts: string;
  description: string;
  value: number;
  date_to_pay: string;
  value_payed: number;
  date_payed: string;
  title_status: string;
  payed_status: string;
  cash_flow: number;
}


export type IRegisterEntry = Omit<IEntry, 'id'>;
