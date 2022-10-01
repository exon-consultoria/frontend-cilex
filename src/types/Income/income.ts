export interface IIncome {
  id: string;
  code: string;
  account: string;
  type: 'receita' | 'Custo' | 'Despesa';
}

export type IRegisterIncome = Omit<IIncome, 'id'>;
