import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';

import api from '../../../../services/api';

import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import InputFormik from '../../../../components/InputFormik';
import ButtonBack from '../../../../components/ButtonBack';
import Select from '../../../../components/Select';

import { Container, Main, FormCustom } from './styles';

interface Product {
  id: string;
  code: string;
  description: string;
}

interface Storage {
  id: string;
  code: string;
  description: string;
}

interface RegisterMovementForm {
  type: string;
  product_id: string;
  quantity: string;
}

interface RegisterTransferForm {
  product_id: string;
  storageOrigin: string;
  storageDestination: string;
  quantity: string;
}

const formSchemaMovement = Yup.object().shape({
  type: Yup.string().required('Tipo Obrigatório'),
  product_id: Yup.string().required('Produto Obrigatório'),
  quantity: Yup.string().required('Quantidade Obrigatória'),
});

const formSchemaTransfer = Yup.object().shape({
  product_id: Yup.string().required('Produto Obrigatório'),
  storageOrigin: Yup.string().required('Estoque de Origem Obrigatório'),
  storageDestination: Yup.string().required('Estoque de Destino Obrigatório'),
  quantity: Yup.string().required('Quantidade Obrigatória'),
});

const RegisterTransaction: React.FC = () => {
  let navigate = useNavigate();
  const { colors } = useContext(ThemeContext);

  const [typeTransaction, setTypeTransaction] = useState<
    'movement' | 'transfer'
  >('movement');
  const [products, setProducts] = useState<Product[]>([]);
  const [storages, setStorages] = useState<Storage[]>([]);

  useEffect(() => {
    api.get('/product').then(response => {
      setProducts(response.data);
    });
    api.get('/storage').then(response => {
      setStorages(response.data);
    });
  }, []);

  const handleSubmitForm = useCallback(
    async data => {
      try {
        if (typeTransaction === 'movement') {
          const { type, product_id, quantity } = data as RegisterMovementForm;

          api
            .post('/transaction', {
              type,
              product_id,
              quantity,
            })
            .then(() => {
              toast.success('Movimentação realizada com sucesso');
              navigate('/inventory/transaction');
            });
        } else {
          const { product_id, quantity, storageOrigin, storageDestination } =
            data as RegisterTransferForm;

          api
            .post('/transaction', {
              product_id,
              quantity,
              origin_id: storageOrigin,
              destination_id: storageDestination,
              type: 'transfer',
            })
            .then(() => {
              toast.success('Transferência realizada com sucesso');
              navigate('/inventory/transaction');
            });
        }
      } catch (err) {
        toast.error('Ocorreu um erro no registro da Transação!');
      }
    },
    [history, typeTransaction],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Transação" />

        <Main>
          <Formik
            initialValues={{
              type: '',
              product_id: '',
              quantity: '',
              storageOrigin: '',
              storageDestination: '',
            }}
            validationSchema={
              typeTransaction === 'movement'
                ? formSchemaMovement
                : formSchemaTransfer
            }
            onSubmit={handleSubmitForm}
          >
            {({ handleChange, touched, values, errors, handleSubmit }) => (
              <FormCustom onSubmit={handleSubmit}>
                <div id="align-switch">
                  <ButtonBack destinationBack="/inventory/transaction" />
                  <div id="container-switch">
                    <p>Transferência</p>
                    <Switch
                      onChange={() => {
                        if (typeTransaction === 'movement') {
                          setTypeTransaction('transfer');
                        } else {
                          setTypeTransaction('movement');
                        }
                      }}
                      checked={typeTransaction === 'movement'}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor={colors.main}
                      offColor={colors.main}
                    />
                    <p>Movimentação</p>
                  </div>
                  <div />
                </div>
                <div id="align-inputs">
                  {typeTransaction === 'movement' ? (
                    <>
                      <Select
                        name="product_id"
                        value={values.product_id}
                        onChange={handleChange('product_id')}
                        messageError={
                          errors.product_id && touched.product_id
                            ? errors.product_id
                            : ''
                        }
                      >
                        <option value="">Produto</option>
                        {products.map(product => (
                          <option value={product.id}>
                            {product.description}
                          </option>
                        ))}
                      </Select>
                      <Select
                        name="type"
                        value={values.type}
                        onChange={handleChange('type')}
                        messageError={
                          errors.type && touched.type ? errors.type : ''
                        }
                      >
                        <option value="">Entrada/Saída</option>
                        <option value="In">Entrada</option>
                        <option value="Out">Saída</option>
                      </Select>
                      <InputFormik
                        name="quantity"
                        type="text"
                        placeholder="Quantidade"
                        value={values.quantity}
                        onChange={handleChange('quantity')}
                        messageError={
                          errors.quantity && touched.quantity
                            ? errors.quantity
                            : ''
                        }
                      />
                    </>
                  ) : (
                    <>
                      <Select
                        name="storageOrigin"
                        value={values.storageOrigin}
                        onChange={handleChange('storageOrigin')}
                        messageError={
                          errors.storageOrigin && touched.storageOrigin
                            ? errors.storageOrigin
                            : ''
                        }
                      >
                        <option value="">Estoque Origem</option>
                        {storages.map(storage => (
                          <option value={storage.id}>
                            {storage.description}
                          </option>
                        ))}
                      </Select>
                      <Select
                        name="storageDestination"
                        value={values.storageDestination}
                        onChange={handleChange('storageDestination')}
                        messageError={
                          errors.storageDestination &&
                          touched.storageDestination
                            ? errors.storageDestination
                            : ''
                        }
                      >
                        <option value="">Estoque Destino</option>
                        {storages.map(storage => (
                          <option value={storage.id}>
                            {storage.description}
                          </option>
                        ))}
                      </Select>
                      <Select
                        name="product_id"
                        value={values.product_id}
                        onChange={handleChange('product_id')}
                        messageError={
                          errors.type && touched.type ? errors.type : ''
                        }
                      >
                        <option value="">Produto</option>
                        {products.map(product => (
                          <option value={product.id}>
                            {product.description}
                          </option>
                        ))}
                      </Select>
                      <InputFormik
                        name="quantity"
                        type="text"
                        placeholder="Quantidade"
                        value={values.quantity}
                        onChange={handleChange('quantity')}
                        messageError={
                          errors.quantity && touched.quantity
                            ? errors.quantity
                            : ''
                        }
                      />
                    </>
                  )}
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
        </Main>
      </Container>
    </>
  );
};

export default RegisterTransaction;
