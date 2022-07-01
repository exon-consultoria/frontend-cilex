export interface ISubFamily {
  id: string;
  code: string;
  description: string;
  product_family_id: string;
}

export type IRegisterSubFamily = Omit<ISubFamily, 'id'>;
