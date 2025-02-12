import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import publicRouter from "./router";
import PrivateRoutersrs from "./router/PrivateRouters";

interface LayoutProps {
  children: React.ReactNode;
}

interface RouteType {
  path: string;
  component: React.ComponentType<LayoutProps>;
  layout?: React.FC<{ children: React.ReactNode }> | null;
  children?: RouteType[];
  isPrivate?: boolean;
}

const App: React.FC = () => {
  const renderRoutes = (routes: RouteType[]) => {
    return routes.map((route, index) => {
      const Page = route.component;
      const Layout = route.layout;
      const isPrivate = route.isPrivate || false;

      const element = Layout ? (
        <Layout>
          <Page children={null} />
        </Layout>
      ) : (
        <Page children={null} />
      );

      return (
        <Route
          key={index}
          path={route.path}
          element={
            isPrivate ? <PrivateRoutersrs>{element}</PrivateRoutersrs> : element
          }
        />
      );
    });
  };

  return (
    <Router>
      <Routes>{renderRoutes(publicRouter)}</Routes>
    </Router>
  );
};

export default App;
