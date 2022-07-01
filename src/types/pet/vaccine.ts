export interface IVaccine {
  id: string;
  code: string;
  description: string;
}

export type IRegisterVaccine = Omit<IVaccine, 'id'>;
