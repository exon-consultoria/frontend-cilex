export interface EditForm {
  date: string;
  hour: string;
  pet_id: string;
  work_id: string;
  done: boolean;
  dayInWeek: never[];
  recurrence: string | undefined;
  endDate: string;
}

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
  recurrence?: string;
  recurrence_id?: string;
}

export interface RegisterCompromiseForm {
  date: string;
  hour: string;
  pet_id: string;
  work_id: string;
  recurrence: boolean;
  dayInWeek: string[],
  endDate: string
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