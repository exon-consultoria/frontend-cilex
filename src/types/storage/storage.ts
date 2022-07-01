export interface IStorage {
  id: string;
  code: string;
  description: string;
}

export type IRegisterStorage = Omit<IStorage, 'id'>;
