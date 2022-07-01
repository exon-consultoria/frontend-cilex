import React, { createContext, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

interface HandleDeleteParams {
  route: string;
  id: string;
  routePush: string;
}

interface CrudModulesContextData {
  deleteDataFromModule: (data: HandleDeleteParams) => Promise<void>;
}

const CrudModulesContext = createContext<CrudModulesContextData>(
  {} as CrudModulesContextData,
);

interface CrudModulesProviderProps {
  children: React.ReactNode;
}

export const CrudModulesProvider: React.FC<CrudModulesProviderProps> = ({ children }) => {
  let navigate = useNavigate();

  async function deleteDataFromModule({
    id,
    route,
    routePush,
  }: HandleDeleteParams) {
    api
      .delete(`/${route}/${id}`)
      .then(() => {
        toast.success('Deletado com Sucesso');
        navigate(`/${routePush}`);
      })
      .catch(() => {
        toast.error('Erro ao deletar');
        navigate(`/${routePush}`);
      });
  }

  return (
    <CrudModulesContext.Provider value={{ deleteDataFromModule }}>
      {children}
    </CrudModulesContext.Provider>
  );
};

export function useCrudModules(): CrudModulesContextData {
  const context = useContext(CrudModulesContext);

  return context;
}
