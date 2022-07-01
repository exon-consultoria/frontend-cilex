export interface IEnclosure {
  id: string;
  code: string;
  description: string;
}

export type IRegisterEnclosure = Omit<IEnclosure, 'id'>;
