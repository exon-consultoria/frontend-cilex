export interface IFamily {
  id: string;
  code: string;
  description: string;
}

export type IRegisterFamily = Omit<IFamily, 'id'>;
