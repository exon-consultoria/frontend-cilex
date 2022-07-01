export interface IUnitMeasure {
  id: string;
  code: string;
  description: string;
}

export type IRegisterUnitMeasure = Omit<IUnitMeasure, 'id'>;
