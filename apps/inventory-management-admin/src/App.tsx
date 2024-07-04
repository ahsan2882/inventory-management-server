import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { ProductsList } from "./products/ProductsList";
import { ProductsCreate } from "./products/ProductsCreate";
import { ProductsEdit } from "./products/ProductsEdit";
import { ProductsShow } from "./products/ProductsShow";
import { CategoriesList } from "./categories/CategoriesList";
import { CategoriesCreate } from "./categories/CategoriesCreate";
import { CategoriesEdit } from "./categories/CategoriesEdit";
import { CategoriesShow } from "./categories/CategoriesShow";
import { OrdersList } from "./orders/OrdersList";
import { OrdersCreate } from "./orders/OrdersCreate";
import { OrdersEdit } from "./orders/OrdersEdit";
import { OrdersShow } from "./orders/OrdersShow";
import { SuppliersList } from "./suppliers/SuppliersList";
import { SuppliersCreate } from "./suppliers/SuppliersCreate";
import { SuppliersEdit } from "./suppliers/SuppliersEdit";
import { SuppliersShow } from "./suppliers/SuppliersShow";
import { jwtAuthProvider } from "./auth-provider/ra-auth-jwt";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"InventoryManagement"}
        dataProvider={dataProvider}
        authProvider={jwtAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="Products"
          list={ProductsList}
          edit={ProductsEdit}
          create={ProductsCreate}
          show={ProductsShow}
        />
        <Resource
          name="Categories"
          list={CategoriesList}
          edit={CategoriesEdit}
          create={CategoriesCreate}
          show={CategoriesShow}
        />
        <Resource
          name="Orders"
          list={OrdersList}
          edit={OrdersEdit}
          create={OrdersCreate}
          show={OrdersShow}
        />
        <Resource
          name="Suppliers"
          list={SuppliersList}
          edit={SuppliersEdit}
          create={SuppliersCreate}
          show={SuppliersShow}
        />
      </Admin>
    </div>
  );
};

export default App;
