export interface IEntry {
  id: string;
  date_income: string;
  type: string;
  financial_entity: string;
  description: string;
  value: string;
  date_to_pay: string;
  value_payed: string;
  date_payed: string;
  title_status: string;
  payed_status: string;
  cash_flow: string;
  income_id?: string;
}


export type IRegisterEntry = Omit<IEntry, 'id'>;
