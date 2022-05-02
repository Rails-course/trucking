import * as React from 'react';

interface checkpointsTableFormProps {
  checkpoints: any;
}

const checkpointsTable:
    React.FC<checkpointsTableFormProps> = (props: checkpointsTableFormProps) => {
      const { checkpoints } = props;

      return (
        <div style={{
          display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '10px 24px',
        }}
        >
          <strong>Checkpoints</strong>
          {checkpoints.map((checkpoint) => (
            <div key={checkpoint.id} style={{ width: '100%', display: 'list-item', listStyleType: 'decimal' }}>
              <p style={{ margin: '2px 0' }}>{`${checkpoint.city_name} `}</p>
            </div>
          ))}
        </div>
      );
    };

export default checkpointsTable;
