export interface ISubGroup {
  id: string;
  code: string;
  description: string;
  product_group_id: string;
}

export type IRegisterSubGroup = Omit<ISubGroup, 'id'>;
