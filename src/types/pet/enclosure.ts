export interface IEnclosureSizes {
  size: string;
  capacity: string;
  available: string
}

export interface IEnclosure {
  id: string;
  code: string;
  description: string;
  size: string;
  enclosure_size: IEnclosureSizes[]
}

export type IRegisterEnclosure = Omit<IEnclosure, 'id'>;
