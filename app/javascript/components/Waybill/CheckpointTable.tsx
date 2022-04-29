import * as React from 'react';

interface checkpointsTableFormProps {
  checkpoints: any;
}

const checkpointsTable: React.FC<checkpointsTableFormProps> = (props: checkpointsTableFormProps) => {
  const { checkpoints } = props;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '10px',
    }}
    >
      <strong>Checkpoints</strong>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {checkpoints.map((checkpoint) => (
          <p key={checkpoint.id}>
            {`${checkpoint.city_name} `}
            &nbsp;
          </p>
        ))}
      </div>
    </div>
  );
};

export default checkpointsTable;
