export interface IDimension {
  id: string;
  code: string;
  description: string;
}

export type IRegisterDimension = Omit<IDimension, 'id'>;
