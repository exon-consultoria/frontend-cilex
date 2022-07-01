export interface IProduct {
  id: string;
  code: string;
  description: string;

  standard_storage: string;
  type_id: string;

  group_id: string;
  subgroup_id: string;

  family_id: string;
  subfamily_id: string;

  application_id: string;
  dimensions_id: string;

  umc_id: string;
  umu_id: string;

  technical_description: string;
  technical_picture: any;
  picture: any;
}

export type IRegisterProduct = Omit<IProduct, 'id'>;
