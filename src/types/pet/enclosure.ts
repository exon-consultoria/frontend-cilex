export interface IEnclosure {
  id: string;
  code: string;
  description: string;
  size: string;
  enclosure_size_big: string
  enclosure_size_big_available: string
  enclosure_size_medium: string
  enclosure_size_medium_available: string
  enclosure_size_small: string
  enclosure_size_small_available: string
}

export type IRegisterEnclosure = Omit<IEnclosure, 'id'>;
