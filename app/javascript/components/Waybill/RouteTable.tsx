import * as React from 'react';

interface RoutesTableFormProps {
  routes: any;
}

const RouteTable: React.FC<RoutesTableFormProps> = (props: RoutesTableFormProps) => {
  const { routes } = props;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '10px',
    }}
    >
      <strong>Checkpoints</strong>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {routes.map((route) => (
          <p key={route.id}>
            {`${route.city_name} `}
            &nbsp;
          </p>
        ))}
      </div>
    </div>
  );
};

export default RouteTable;
