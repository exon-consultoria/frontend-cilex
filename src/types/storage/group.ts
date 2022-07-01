export interface IGroup {
  id: string;
  code: string;
  description: string;
}

export type IRegisterGroup = Omit<IGroup, 'id'>;
