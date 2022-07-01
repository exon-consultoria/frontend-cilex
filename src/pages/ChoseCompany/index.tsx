import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
// import { transparentize } from 'polished';
import { transparentize } from 'polished';
import cilexLogo from '../../assets/cilex-logo.png';

import chooseSvg from '../../assets/town.svg';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useHasUserCompany } from '../../hooks/useHasUserCompany';
// import { useToggleTheme } from '../../hooks/useToggleTheme';

import HeaderHome from '../../components/HeaderHome';

import { Container, Options, Main, Companies, Company } from './styles';
import { useCompany } from '../../hooks/useCompany';
import { useToggleTheme } from '../../hooks/useToggleTheme';

interface IUserCompany {
  id: string;
  code: string;
  razao_social: string;
  company_logo: string;
  company_color: string;
}

const ChoseCompany: React.FC = () => {
  let navigate = useNavigate();
  const { toggleTheme } = useToggleTheme();
  const { user } = useAuth();
  const { setCompany } = useCompany();

  const { setHasUserCompany } = useHasUserCompany();

  const [userCompanies, setUserCompanies] = useState<IUserCompany[]>([]);

  const handleChoice = useCallback(
    (company: IUserCompany) => {
      setCompany({
        ...company,
        company_logo: `http://localhost:3333/api/v1/files/${company.company_logo}`,
      });

      toggleTheme({
        title: 'customized',
        colors: {
          main: company.company_color,
          mainHover: transparentize(0.8, company.company_color),
          green: '#8DC73E',
        },
      });

      navigate('/home');
    },
    [history, toggleTheme, setCompany],
  );

  useEffect(() => {
    api.get<IUserCompany[]>(`/usercompany?user=${user.id}`).then(response => {
      if (response.data.length === 0) {
        setHasUserCompany(false);
        navigate('/company/register');
      } else {
        setHasUserCompany(true);
        setUserCompanies(response.data);
      }
    });
  }, [history, user.id, setHasUserCompany]);

  return (
    <>
      <Container>
        <HeaderHome message="Escolha a empresa" />
        <Main>
          <Options>
            <img src={chooseSvg} alt="" />
          </Options>
          <Companies>
            {userCompanies &&
              userCompanies.map(comp => (
                <Company
                  key={comp.id}
                  type="button"
                  onClick={() => handleChoice(comp)}
                >
                  <HiOutlineOfficeBuilding size={24} />
                  <span>
                    {comp.code} - {comp.razao_social}
                  </span>
                </Company>
              ))}
          </Companies>
        </Main>
      </Container>
    </>
  );
};

export default ChoseCompany;
