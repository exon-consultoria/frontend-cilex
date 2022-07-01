import React, { createContext, useContext, useState } from 'react';

interface HasUserCompanyContextData {
  hasUserCompany: boolean;
  setHasUserCompany: React.Dispatch<React.SetStateAction<boolean>>;
}

const HasUserCompanyContext = createContext<HasUserCompanyContextData>(
  {} as HasUserCompanyContextData,
);

interface HasUserCompanyProviderProps {
  children: React.ReactNode;
}

export const HasUserCompanyProvider: React.FC<HasUserCompanyProviderProps> = ({ children }) => {
  const [hasUserCompany, setHasUserCompany] = useState(false);

  return (
    <HasUserCompanyContext.Provider
      value={{
        hasUserCompany,
        setHasUserCompany,
      }}
    >
      {children}
    </HasUserCompanyContext.Provider>
  );
};

export function useHasUserCompany(): HasUserCompanyContextData {
  const context = useContext(HasUserCompanyContext);

  return context;
}
