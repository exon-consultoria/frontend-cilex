export interface Compromise {
  id: string;
  date: string;
  hour: string;
  done: boolean;
  work: {
    id: string;
    color: string;
    description: string;
  };
  pet: {
    id: string;
    name: string;
  };
  owner: {
    id: string;
    nome?: string;
    razao_social?: string;
    endereco: string;
  };
  recurrence?: boolean | undefined;
  recurrence_id?: string;
}

export interface DataForm {
  date: string;
  hour: string;
  pet_id: string;
  work_id: string;
  done?: boolean;
  dayInWeek: string[];
  recurrence: boolean | undefined;
  endDate: string;
}

export interface RegisterCompromiseForm {
  compromise?: Compromise
  data: DataForm
}

export interface Works {
  id: string;
  description: string;
  color: string;
}

export interface Pets {
  id: string;
  name: string;
}