export interface IType {
  id: string;
  code: string;
  accept_structure: boolean;
  description: string;
}

export type IRegisterType = Omit<IType, 'id'>;
