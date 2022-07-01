import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { transparentize } from 'polished';
import { toast } from 'react-toastify';

import { useToggleTheme } from '../../hooks/useToggleTheme';

import camera from '../../assets/camera.svg';
import cilexLogo from '../../assets/cilex-logo.png';

import Header from '../../components/Header';
import Button from '../../components/Button';
import ButtonBack from '../../components/ButtonBack';
import InputFormik from '../../components/InputFormik';

import {
  Container,
  ContainerActions,
  ContainerInputFile,
  Main,
  Section,
} from './styles';
import api from '../../services/api';
import { Company, useCompany } from '../../hooks/useCompany';

const GeneralParams: React.FC = () => {
  const { theme, toggleTheme } = useToggleTheme();
  const { company, setCompany } = useCompany();
  let navigate = useNavigate();

  const [mainColor, setMainColor] = useState(theme.colors.main);
  const [stateLogo, setStateLogo] = useState<any>();

  // useEffect(() => {
  //   setMainColor(company.company_color);

  //   if (company.company_logo) {
  //     fetch(`http://localhost:3333/api/v1/files/${company.company_logo}`)
  //       .then(responsePic => {
  //         return responsePic.blob();
  //       })
  //       .then(myBlob => {
  //         const objectUrl = URL.createObjectURL(myBlob);
  //         setStateLogo(objectUrl);
  //       });
  //   }
  // }, []);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    setStateLogo(e.target.files[0]);
  };

  const previewLogo = useMemo(() => {
    return stateLogo ? URL.createObjectURL(stateLogo) : null;
  }, [stateLogo]);

  const handleSaveParams = async () => {
    let newParams = {
      color: '',
      logo: '',
    };

    if (mainColor) {
      toggleTheme({
        title: 'customized',
        colors: {
          main: mainColor,
          mainHover: transparentize(0.8, mainColor),
          green: '#8DC73E',
        },
      });

      const response = await api.patch(`/company/${company.id}/updateColor`, {
        company_color: mainColor,
      });

      newParams = {
        ...newParams,
        color: response.data.company_color,
      };
    }

    if (stateLogo) {
      const formData = new FormData();
      formData.append('company_logo', stateLogo);

      const response = await api.patch(`/company/${company.id}`, formData);

      newParams = {
        ...newParams,
        logo: `http://localhost:3333/api/v1/files/${response.data.company_logo}`,
      };
    }

    setCompany({
      ...company,
      company_color: newParams.color,
      company_logo: newParams.logo,
    });

    toast.success('Parâmetros atualizados!');
    navigate('/menu');
  };

  const handleResetParams = () => {
    api.get(`/company/${company.id}/reset`).then(response => {
      toggleTheme({
        title: 'orange',
        colors: {
          main: response.data.company_color,
          mainHover: transparentize(0.8, response.data.company_color),
          green: '#8DC73E',
        },
      });

      setCompany({
        ...company,
        company_color: response.data.company_color,
        company_logo: `http://localhost:3333/api/v1/files/${response.data.company_logo}`,
      });

      toast.success('Reiniciado com sucesso');
      navigate('/menu');
    });
  };

  return (
    <Container>
      <Header pageName="Parâmetros Gerais" />
      <ButtonBack destinationBack="/menu" />
      <Main>
        <Section>
          <h3>Cores do Sistema</h3>

          <div className="box-input">
            <span>Cor Principal</span>
            <input
              type="color"
              name="main"
              value={mainColor}
              onChange={e => setMainColor(e.target.value)}
            />
            <span>{mainColor}</span>
          </div>
        </Section>
        <Section>
          <h3>Imagens</h3>

          <div className="box-input">
            <ContainerInputFile
              style={{
                backgroundImage: `url(${previewLogo})`,
              }}
              hasThumb={stateLogo}
            >
              <span>Logo</span>
              <input type="file" name="logo" onChange={onSelectFile} />
              <img src={camera} alt="Select img" />
            </ContainerInputFile>
          </div>
        </Section>
        <ContainerActions>
          <Button onClick={handleResetParams} layoutColor="button-outline">
            Reiniciar
          </Button>
          <Button onClick={handleSaveParams} layoutColor="button-green">
            Salvar
          </Button>
        </ContainerActions>
      </Main>
    </Container>
  );
};

export default GeneralParams;
