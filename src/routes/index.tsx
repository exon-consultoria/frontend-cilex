import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ForgotPassword from '../pages/ForgotPassword';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import ChoseCompany from '../pages/ChoseCompany';
import Menu from '../pages/Menu';

import Module from '../pages/Module';

import GeneralParams from '../pages/GeneralParams';

import MenuUsers from '../pages/MenuUsers';
import ListUserActive from '../pages/UserActive/ListUserActive';
import EditUserActive from '../pages/UserActive/EditUserActive';
import ListUserPending from '../pages/UserPending/ListUserPending';
import EditUserPending from '../pages/UserPending/EditUserPending';

import ListCompany from '../pages/Company/ListCompany';
import RegisterCompany from '../pages/Company/RegisterCompany';
import EditCompany from '../pages/Company/EditCompany';

import ListPeople from '../pages/People/ListPeople';
import RegisterPeople from '../pages/People/RegisterPeople';
import EditPeople from '../pages/People/EditPeople';

import ListUserGroup from '../pages/UserGroup/ListUserGroup';
import RegisterUserGroup from '../pages/UserGroup/RegisterUserGroup';
import EditUserGroup from '../pages/UserGroup/EditUserGroup';

import ListRole from '../pages/Role/ListRole';
import RegisterRole from '../pages/Role/RegisterRole';
import EditRole from '../pages/Role/EditRole';

import Financial from '../pages/Financial';

import Inventory from '../pages/Inventory';

import ConsultStorage from '../pages/Inventory/Storage/ConsultStorage';

import RegisterTransaction from '../pages/Inventory/Transaction/RegisterTransaction';
import ListTransaction from '../pages/Inventory/Transaction/ListTransaction';
import EditTransaction from '../pages/Inventory/Transaction/EditTransaction';

import RegisterStorage from '../pages/Inventory/Storage/RegisterStorage';
import ListStorage from '../pages/Inventory/Storage/ListStorage';
import EditStorage from '../pages/Inventory/Storage/EditStorage';

import RegisterProduct from '../pages/Inventory/Product/RegisterProduct';
import ListProduct from '../pages/Inventory/Product/ListProduct';
import EditProduct from '../pages/Inventory/Product/EditProduct';

import ListType from '../pages/Inventory/Type/ListType';
import RegisterType from '../pages/Inventory/Type/RegisterType';
import EditType from '../pages/Inventory/Type/EditType';

import ListGroup from '../pages/Inventory/Group/ListGroup';
import RegisterGroup from '../pages/Inventory/Group/RegisterGroup';
import EditGroup from '../pages/Inventory/Group/EditGroup';

import ListSubGroup from '../pages/Inventory/SubGroup/ListSubGroup';
import RegisterSubGroup from '../pages/Inventory/SubGroup/RegisterSubGroup';
import EditSubGroup from '../pages/Inventory/SubGroup/EditSubGroup';

import ListFamily from '../pages/Inventory/Family/ListFamily';
import RegisterFamily from '../pages/Inventory/Family/RegisterFamily';
import EditFamily from '../pages/Inventory/Family/EditFamily';

import ListSubFamily from '../pages/Inventory/SubFamily/ListSubFamily';
import RegisterSubFamily from '../pages/Inventory/SubFamily/RegisterSubFamily';
import EditSubFamily from '../pages/Inventory/SubFamily/EditSubFamily';

import ListApplication from '../pages/Inventory/Application/ListApplication';
import RegisterApplication from '../pages/Inventory/Application/RegisterApplication';
import EditApplication from '../pages/Inventory/Application/EditApplication';

import ListDimension from '../pages/Inventory/Dimension/ListDimension';
import RegisterDimension from '../pages/Inventory/Dimension/RegisterDimension';
import EditDimension from '../pages/Inventory/Dimension/EditDimension';

import ListUnitMeasure from '../pages/Inventory/UnitMeasure/ListUnitMeasure';
import RegisterUnitMeasure from '../pages/Inventory/UnitMeasure/RegisterUnitMeasure';
import EditUnitMeasure from '../pages/Inventory/UnitMeasure/EditUnitMeasure';

import Pet from '../pages/Pet';

import ListPet from '../pages/Pet/Pets/ListPet';
import RegisterPet from '../pages/Pet/Pets/RegisterPet';
import EditPet from '../pages/Pet/Pets/EditPet';

import ListVaccine from '../pages/Pet/Vaccine/ListVaccine';
import RegisterVaccine from '../pages/Pet/Vaccine/RegisterVaccine';
import EditVaccine from '../pages/Pet/Vaccine/EditVaccine';

import ListEnclosure from '../pages/Pet/Enclosure/ListEnclosure';
import RegisterEnclosure from '../pages/Pet/Enclosure/RegisterEnclosure';
import EditEnclosure from '../pages/Pet/Enclosure/EditEnclosure';
import SeeAllEnclosures from '../pages/Pet/Enclosure/SeeAllEnclosures';

import ListWork from '../pages/Work/ListWork';
import RegisterWork from '../pages/Work/RegisterWork';
import EditWork from '../pages/Work/EditWork';

import Schedule from '../pages/Schedule';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/chosecompany" element={<ChoseCompany />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/menu" element={<Menu />} />

      <Route path="/module" element={<Module />} />

      <Route path="/generalParams" element={<GeneralParams />} />

      <Route path="/menu/users" element={<MenuUsers />} />
      <Route path="/users/active" element={<ListUserActive />} />
      <Route path="/users/pending" element={<ListUserPending />} />
      <Route path="/user/:id" element={<EditUserActive />} />
      <Route path="/user/pending/:id" element={<EditUserPending />} />

      <Route path="/company" element={<ListCompany />} />
      <Route path="/company/register" element={<RegisterCompany />} />
      <Route path="/company/:id" element={<EditCompany />} />

      <Route path="/people" element={<ListPeople />} />
      <Route path="/people/register" element={<RegisterPeople />} />
      <Route path="/people/:id" element={<EditPeople />} />

      <Route path="/group" element={<ListUserGroup />} />
      <Route path="/group/register" element={<RegisterUserGroup />} />
      <Route path="/group/:id" element={<EditUserGroup />} />

      <Route path="/role" element={<ListRole />} />
      <Route path="/role/register" element={<RegisterRole />} />
      <Route path="/role/:id" element={<EditRole />} />

      {/* ---------------------- INÍCIO FINANCEIRO ---------------------- */}
      <Route path="/financial" element={<Financial />} />
      {/* ---------------------- FIM FINANCEIRO ---------------------- */}

      {/* ---------------------- INÍCIO LOGÍSTICA ---------------------- */}
      <Route path="/inventory" element={<Inventory />} />

      <Route path="/inventory/consult/:id" element={<ConsultStorage />} />
      <Route path="/inventory/transaction" element={<ListTransaction />} />
      <Route
        path="/inventory/transaction/register"
      
        element={<RegisterTransaction />}
      />
      <Route path="/inventory/transaction/:id" element={<EditTransaction />} />

      <Route path="/inventory/storage" element={<ListStorage />} />
      <Route
        path="/inventory/storage/register"
      
        element={<RegisterStorage />}
      />
      <Route path="/inventory/storage/:id" element={<EditStorage />} />

      <Route path="/inventory/product" element={<ListProduct />} />
      <Route
        path="/inventory/product/register"
      
        element={<RegisterProduct />}
      />
      <Route path="/inventory/product/:id" element={<EditProduct />} />

      <Route path="/inventory/type" element={<ListType />} />
      <Route path="/inventory/type/register" element={<RegisterType />} />
      <Route path="/inventory/type/:id" element={<EditType />} />

      <Route path="/inventory/group" element={<ListGroup />} />
      <Route path="/inventory/group/register" element={<RegisterGroup />} />
      <Route path="/inventory/group/:id" element={<EditGroup />} />

      <Route path="/inventory/subgroup" element={<ListSubGroup />} />
      <Route
        path="/inventory/subgroup/register"
      
        element={<RegisterSubGroup />}
      />
      <Route path="/inventory/subgroup/:id" element={<EditSubGroup />} />

      <Route path="/inventory/family" element={<ListFamily />} />
      <Route
        path="/inventory/family/register"
      
        element={<RegisterFamily />}
      />
      <Route path="/inventory/family/:id" element={<EditFamily />} />

      <Route path="/inventory/subfamily" element={<ListSubFamily />} />
      <Route
        path="/inventory/subfamily/register"
      
        element={<RegisterSubFamily />}
      />
      <Route path="/inventory/subfamily/:id" element={<EditSubFamily />} />

      <Route path="/inventory/application" element={<ListApplication />} />
      <Route
        path="/inventory/application/register"
      
        element={<RegisterApplication />}
      />
      <Route path="/inventory/application/:id" element={<EditApplication />} />

      <Route path="/inventory/dimension" element={<ListDimension />} />
      <Route
        path="/inventory/dimension/register"
      
        element={<RegisterDimension />}
      />
      <Route path="/inventory/dimension/:id" element={<EditDimension />} />

      <Route path="/inventory/unitmeasure" element={<ListUnitMeasure />} />
      <Route
        path="/inventory/unitmeasure/register"
      
        element={<RegisterUnitMeasure />}
      />
      <Route path="/inventory/unitmeasure/:id" element={<EditUnitMeasure />} />
      {/* ---------------------- FIM LOGÍSTICA ---------------------- */}

      {/* ---------------------- INÍCIO PET ---------------------- */}
      <Route path="/pet" element={<Pet />} />

      <Route path="/pet/pets" element={<ListPet />} />
      <Route path="/pet/pets/register" element={<RegisterPet />} />
      <Route path="/pet/pets/:id" element={<EditPet />} />

      <Route path="/pet/vaccine" element={<ListVaccine />} />
      <Route path="/pet/vaccine/register" element={<RegisterVaccine />} />
      <Route path="/pet/vaccine/:id" element={<EditVaccine />} />

      <Route path="/pet/enclosure" element={<ListEnclosure />} />
      <Route
        path="/pet/enclosure/register"
      
        element={<RegisterEnclosure />}
      />
      <Route path="/pet/enclosure/all" element={<SeeAllEnclosures />} />
      <Route path="/pet/enclosure/:id" element={<EditEnclosure />} />
      {/* ---------------------- FIM PET ---------------------- */}

      <Route path="/work" element={<ListWork />} />
      <Route path="/work/register" element={<RegisterWork />} />
      <Route path="/work/:id" element={<EditWork />} />

      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  );
};

export default AppRoutes;
