export interface IApplication {
  id: string;
  code: string;
  description: string;
}

export type IRegisterApplication = Omit<IApplication, 'id'>;
