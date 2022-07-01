import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import api from '../../../../services/api';
import camera from '../../../../assets/camera.svg';
import { useCrudModules } from '../../../../hooks/useCrudModules';
import { IRegisterProduct } from '../../../../types/storage/product';
import { IStorage } from '../../../../types/storage/storage';
import { IType } from '../../../../types/storage/type';
import { IGroup } from '../../../../types/storage/group';
import { IFamily } from '../../../../types/storage/family';
import { IUnitMeasure } from '../../../../types/storage/unitMeasure';
import { IApplication } from '../../../../types/storage/application';
import { IDimension } from '../../../../types/storage/dimension';
import { ISubGroup } from '../../../../types/storage/subGroup';
import { ISubFamily } from '../../../../types/storage/subFamily';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import InputFormik from '../../../../components/InputFormik';
import ButtonBack from '../../../../components/ButtonBack';
import ModalDelete from '../../../../components/ModalDelete';
import Select from '../../../../components/Select';

import {
  Container,
  Main,
  HeaderContent,
  ContainerProductData,
  InfoCard,
  FormCustom,
  ContainerInputFile,
  RemoveImageButton,
} from './styles';

const formSchemaProduct = Yup.object().shape({
  code: Yup.string().required('Código Obrigatório'),
  description: Yup.string().required('Descrição Obrigatória'),

  standard_storage: Yup.string().required(),
  type_id: Yup.string().nullable(),

  group_id: Yup.string().nullable(),
  subgroup_id: Yup.string().nullable(),

  family_id: Yup.string().nullable(),
  subfamily_id: Yup.string().nullable(),

  application_id: Yup.string().nullable(),
  dimensions_id: Yup.string().nullable(),

  umc_id: Yup.string().nullable(),
  umu_id: Yup.string().nullable(),

  technical_description: Yup.string().nullable(),
  technical_picture: Yup.mixed(),
  picture: Yup.mixed(),
});

const EditProduct: React.FC = () => {
  let navigate = useNavigate();
  const { colors } = useContext(ThemeContext);
  const { id }: any = useParams();
  const { deleteDataFromModule } = useCrudModules();

  const [statePhoto, setStatePhoto] = useState<any>(null);
  const [stateTechicalDrawing, setStateTechnicalDrawing] = useState<any>(null);

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [product, setProduct] = useState({} as IRegisterProduct);

  const [storages, setStorages] = useState<IStorage[]>([]);
  const [types, setTypes] = useState<IType[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [families, setFamilies] = useState<IFamily[]>([]);
  const [unitMeasures, setUnitMeasures] = useState<IUnitMeasure[]>([]);
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [dimensions, setDimensions] = useState<IDimension[]>([]);
  const [subGroups, setSubGroups] = useState<ISubGroup[]>([]);
  const [subFamilies, setSubFamilies] = useState<ISubFamily[]>([]);

  useEffect(() => {
    api.get<IRegisterProduct>(`/product/${id}`).then(response => {
      setProduct(response.data);

      if (response.data.picture) {
        fetch(`http://localhost:3333/api/v1/files/${response.data.picture}`)
          .then(responsePic => {
            return responsePic.blob();
          })
          .then(myBlob => {
            const objectUrl = URL.createObjectURL(myBlob);
            setProduct(prevState => ({
              ...prevState,
              picture: objectUrl,
            }));
          });
      }
      if (response.data.technical_picture) {
        fetch(
          `http://localhost:3333/api/v1/files/${response.data.technical_picture}`,
        )
          .then(responsePic => {
            return responsePic.blob();
          })
          .then(myBlob => {
            const objectUrl = URL.createObjectURL(myBlob);
            setProduct(prevState => ({
              ...prevState,
              technical_picture: objectUrl,
            }));
          });
      }
    });
    api.get('/storage').then(response => {
      setStorages(response.data);
    });
    api.get('/product_type').then(response => {
      setTypes(response.data);
    });
    api.get('/product_group').then(response => {
      setGroups(response.data);
    });
    api.get('/product_family').then(response => {
      setFamilies(response.data);
    });
    api.get('/product_um').then(response => {
      setUnitMeasures(response.data);
    });
    api.get('/product_application').then(response => {
      setApplications(response.data);
    });
    api.get('/product_dimension').then(response => {
      setDimensions(response.data);
    });
    api.get('/product_subgroup').then(response => {
      setSubGroups(response.data);
    });
    api.get('/product_subfamily').then(response => {
      setSubFamilies(response.data);
    });
  }, [id]);

  const previewPhoto = useMemo(() => {
    return statePhoto ? URL.createObjectURL(statePhoto) : null;
  }, [statePhoto]);

  const previewTechicalDrawing = useMemo(() => {
    return stateTechicalDrawing
      ? URL.createObjectURL(stateTechicalDrawing)
      : null;
  }, [stateTechicalDrawing]);

  const handleSubmitForm = useCallback(
    async (data: IRegisterProduct) => {
      try {
        const {
          code,
          description,
          standard_storage,
          type_id,
          group_id,
          subgroup_id,
          family_id,
          subfamily_id,
          application_id,
          dimensions_id,
          umc_id,
          umu_id,
          technical_description,
          technical_picture,
          picture,
        } = data;

        const formData = new FormData();
        formData.append('code', code);
        formData.append('description', description);
        formData.append('standard_storage', standard_storage);

        if (type_id) formData.append('type_id', type_id);
        if (group_id) formData.append('group_id', group_id);
        if (subgroup_id) formData.append('subgroup_id', subgroup_id);
        if (family_id) formData.append('family_id', family_id);
        if (subfamily_id) formData.append('subfamily_id', subfamily_id);
        if (application_id) formData.append('application_id', application_id);
        if (dimensions_id) formData.append('dimensions_id', dimensions_id);
        if (umc_id) formData.append('umc_id', umc_id);
        if (umu_id) formData.append('umu_id', umu_id);
        if (technical_description)
          formData.append('technical_description', technical_description);

        formData.append('picture', picture);
        formData.append('technical_picture', technical_picture);

        api
          .put(`/product/${id}`, formData)
          .then(() => {
            toast.success('Atualizado com sucesso');
            navigate('/inventory');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              "There's already an entity registered with the same code"
            ) {
              toast.error(
                'Já existe um produto cadastrado com o mesmo código!',
              );
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Produto!');
      }
    },
    [history, id],
  );

  // const handleRemoveImage = useCallback((field: 'picture' | 'technical') => {
  //   if (field === 'picture') {
  //     setProduct(prevState => ({
  //       ...prevState,
  //       picture: null,
  //     }));
  //     setStatePhoto(null);
  //   } else {
  //     setProduct(prevState => ({
  //       ...prevState,
  //       technical_picture: null,
  //     }));
  //     setStateTechnicalDrawing(null);
  //   }
  // }, []);

  console.log(product);

  return (
    <>
      <Container>
        <Header pageName="Editar Produto" />
        {product && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/inventory/product" />
              </div>
              <div id="container-titles">
                <h2>{product.code}</h2>
                <p>{product.description}</p>
              </div>
              <div id="container-buttons-actions">
                <Button
                  layoutColor="button-filled"
                  onClick={() => setEditting(!editting)}
                >
                  <HiOutlinePencilAlt size={24} color="#fefefe" />
                </Button>
                <Button
                  layoutColor="button-outline"
                  onClick={() => setShowModalDelete(true)}
                >
                  <HiOutlineTrash size={24} color={colors.main} />
                </Button>
              </div>
            </HeaderContent>

            <ContainerProductData>
              <InfoCard>
                <h4>Grupo</h4>
                <span> {product.group_id || 'Não há Grupo cadastrado'}</span>
                <span>
                  {product.subgroup_id || 'Não há Sub-Grupo cadastrado'}
                </span>
              </InfoCard>
              <InfoCard>
                <h4>Família</h4>
                <span>{product.family_id || 'Não há Família cadastrada'}</span>
                <span>
                  {product.subfamily_id || 'Não há Sub-Família cadastrada'}
                </span>
              </InfoCard>
              <InfoCard>
                <h4>Quantidades</h4>
                <span>
                  {product.application_id || 'Não há Aplicação cadastrada'}
                </span>
                <span>
                  {product.dimensions_id || 'Não há Dimensões cadastrado'}
                </span>
              </InfoCard>
              <InfoCard />
              <InfoCard>
                <h4>Medidas</h4>
                <span>{product.umc_id || 'Não há U.M de Compra'}</span>
                <span>{product.umu_id || 'Não há U.M de Uso'}</span>
              </InfoCard>
              <InfoCard />
            </ContainerProductData>

            {editting && (
              <Formik
                initialValues={{
                  code: product.code,
                  description: product.description,
                  standard_storage: product.standard_storage,
                  type_id: product.type_id,
                  group_id: product.group_id,
                  subgroup_id: product.subgroup_id,
                  family_id: product.family_id,
                  subfamily_id: product.subfamily_id,
                  application_id: product.application_id,
                  dimensions_id: product.dimensions_id,
                  umc_id: product.umc_id,
                  umu_id: product.umu_id,
                  technical_description: product.technical_description,
                  technical_picture: null,
                  picture: null,
                }}
                validationSchema={formSchemaProduct}
                onSubmit={handleSubmitForm}
              >
                {({
                  handleChange,
                  touched,
                  values,
                  errors,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <FormCustom onSubmit={handleSubmit}>
                    <div id="align-inputs">
                      <InputFormik
                        name="code"
                        type="text"
                        placeholder="Código"
                        value={values.code}
                        onChange={handleChange('code')}
                        messageError={
                          errors.code && touched.code ? errors.code : ''
                        }
                        maxLength={6}
                      />
                      <InputFormik
                        name="description"
                        type="text"
                        placeholder="Descrição"
                        value={values.description}
                        onChange={handleChange('description')}
                        messageError={
                          errors.description && touched.description
                            ? errors.description
                            : ''
                        }
                      />
                      <Select
                        name="standard_storage"
                        value={values.standard_storage}
                        onChange={handleChange('standard_storage')}
                        messageError={
                          errors.standard_storage && touched.standard_storage
                            ? errors.standard_storage
                            : ''
                        }
                      >
                        <option value="">Estoque Inicial</option>
                        {storages.map(storage => (
                          <option value={storage.id}>
                            {storage.description}
                          </option>
                        ))}
                      </Select>
                      <Select
                        name="type_id"
                        value={values.type_id}
                        onChange={handleChange('type_id')}
                        messageError={
                          errors.type_id && touched.type_id
                            ? errors.type_id
                            : ''
                        }
                      >
                        <option value="">Tipo</option>
                        {types.map(type => (
                          <option value={type.id}>{type.description}</option>
                        ))}
                      </Select>
                      <Select
                        name="group_id"
                        value={values.group_id}
                        onChange={handleChange('group_id')}
                        messageError={
                          errors.group_id && touched.group_id
                            ? errors.group_id
                            : ''
                        }
                      >
                        <option value="">Grupo</option>
                        {groups.map(group => (
                          <option value={group.id}>{group.description}</option>
                        ))}
                      </Select>
                      <Select
                        name="subgroup_id"
                        value={values.subgroup_id}
                        onChange={handleChange('subgroup_id')}
                        messageError={
                          errors.subgroup_id && touched.subgroup_id
                            ? errors.subgroup_id
                            : ''
                        }
                      >
                        <option value="">Sub-Grupo</option>
                        {subGroups.map(group => (
                          <option value={group.id}>{group.description}</option>
                        ))}
                      </Select>
                      <Select
                        name="family_id"
                        value={values.family_id}
                        onChange={handleChange('family_id')}
                        messageError={
                          errors.family_id && touched.family_id
                            ? errors.family_id
                            : ''
                        }
                      >
                        <option value="">Família</option>
                        {families.map(family => (
                          <option value={family.id}>
                            {family.description}
                          </option>
                        ))}
                      </Select>
                      <Select
                        name="subfamily_id"
                        value={values.subfamily_id}
                        onChange={handleChange('subfamily_id')}
                        messageError={
                          errors.subfamily_id && touched.subfamily_id
                            ? errors.subfamily_id
                            : ''
                        }
                      >
                        <option value="">Sub-Família</option>
                        {subFamilies.map(family => (
                          <option value={family.id}>
                            {family.description}
                          </option>
                        ))}
                      </Select>
                      <Select
                        name="application_id"
                        value={values.application_id}
                        onChange={handleChange('application_id')}
                        messageError={
                          errors.application_id && touched.application_id
                            ? errors.application_id
                            : ''
                        }
                      >
                        <option value="">Aplicação</option>
                        {applications.map(application => (
                          <option value={application.id}>
                            {application.description}
                          </option>
                        ))}
                      </Select>
                      <Select
                        name="dimensions_id"
                        value={values.dimensions_id}
                        onChange={handleChange('dimensions_id')}
                        messageError={
                          errors.dimensions_id && touched.dimensions_id
                            ? errors.dimensions_id
                            : ''
                        }
                      >
                        <option value="">Dimensão do Produto</option>
                        {dimensions.map(dimension => (
                          <option value={dimension.id}>
                            {dimension.description}
                          </option>
                        ))}
                      </Select>
                      <Select
                        name="umc_id"
                        value={values.umc_id}
                        onChange={handleChange('umc_id')}
                        messageError={
                          errors.umc_id && touched.umc_id ? errors.umc_id : ''
                        }
                      >
                        <option value="">Unidade de Medida de Compra</option>
                        {unitMeasures.map(unit => (
                          <option value={unit.id}>{unit.description}</option>
                        ))}
                      </Select>
                      <Select
                        name="umu_id"
                        value={values.umu_id}
                        onChange={handleChange('umu_id')}
                        messageError={
                          errors.umu_id && touched.umu_id ? errors.umu_id : ''
                        }
                      >
                        <option value="">Unidade de Medida de Uso</option>
                        {unitMeasures.map(unit => (
                          <option value={unit.id}>{unit.description}</option>
                        ))}
                      </Select>
                      <InputFormik
                        name="technical_description"
                        type="text"
                        placeholder="Descrição Técnica"
                        value={values.technical_description}
                        onChange={handleChange('technical_description')}
                        messageError={
                          errors.technical_description &&
                          touched.technical_description
                            ? errors.technical_description
                            : ''
                        }
                      />
                      <div />
                      <ContainerInputFile
                        style={{
                          backgroundImage: previewTechicalDrawing
                            ? `url(${previewTechicalDrawing})`
                            : `url(${product.technical_picture})`,
                        }}
                        hasThumb={
                          !!(
                            previewTechicalDrawing || product.technical_picture
                          )
                        }
                      >
                        {/* {previewTechicalDrawing || product.technical_picture ? (
                          <RemoveImageButton
                            type="button"
                            onClick={() => handleRemoveImage('technical')}
                          >
                            <HiOutlineTrash size={24} color={colors.main} />
                          </RemoveImageButton>
                        ) : (
                          <> */}
                        <p>Desenho Técnico</p>
                        <input
                          id="technical_picture"
                          name="technical_picture"
                          type="file"
                          onChange={e => {
                            if (e.target.files) {
                              setStateTechnicalDrawing(e.target.files[0]);
                              setFieldValue(
                                'technical_picture',
                                e.target.files[0],
                              );
                            }
                          }}
                        />
                        <img src={camera} alt="Select img" />
                        {/* </>
                        )} */}
                      </ContainerInputFile>
                      <ContainerInputFile
                        style={{
                          backgroundImage: previewPhoto
                            ? `url(${previewPhoto})`
                            : `url(${product.picture})`,
                        }}
                        hasThumb={!!(previewPhoto || product.picture)}
                      >
                        {/* {previewPhoto || product.picture ? (
                          <RemoveImageButton
                            type="button"
                            onClick={() => handleRemoveImage('picture')}
                          >
                            <HiOutlineTrash size={24} color={colors.main} />
                          </RemoveImageButton>
                        ) : (
                          <> */}
                        <p>Foto</p>
                        <input
                          id="picture"
                          name="picture"
                          type="file"
                          onChange={e => {
                            if (e.target.files) {
                              setStatePhoto(e.target.files[0]);
                              setFieldValue('picture', e.target.files[0]);
                            }
                          }}
                        />
                        <img src={camera} alt="Select img" />
                        {/* </>
                        )} */}
                      </ContainerInputFile>
                    </div>
                    <div id="align-button-save">
                      <Button layoutColor="button-green" type="submit">
                        <FiSave size={24} />
                        <span>Salvar</span>
                      </Button>
                    </div>
                  </FormCustom>
                )}
              </Formik>
            )}
          </Main>
        )}
      </Container>
      <ModalDelete
        visible={showModalDelete}
        setVisible={setShowModalDelete}
        actionToDelete={() => {
          deleteDataFromModule({
            id,
            route: 'product',
            routePush: 'inventory',
          });
        }}
      />
    </>
  );
};

export default EditProduct;
