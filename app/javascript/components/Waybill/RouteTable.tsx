import * as React from 'react';

interface RoutesTableFormProps {
  routes: any
}

const RouteTable: React.FC<RoutesTableFormProps> = (props: RoutesTableFormProps) => {
  const { routes } = props;
  return (
    <>
      {routes.map((route) => (
        <p className="paragr">
          {' '}
          {route.city_name}
        </p>
      ))}
    </>
  );
};

export default RouteTable;
