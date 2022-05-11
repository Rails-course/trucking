import * as React from 'react';
import { Button, Grid } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CreateIcon from '@mui/icons-material/Create';
import { checkpointsTableFormProps } from '../../common/interfaces_types';

const checkpointsTable:
    React.FC<checkpointsTableFormProps> = (props: checkpointsTableFormProps) => {
      const {
        checkpoints, setCheckpoints, setEditCheckpoint, setCreateCheckpoints,
      } = props;

      const deleteCheckpoint = (id) => {
        setCheckpoints(checkpoints.filter((checkpoint) => id !== checkpoint.id));
      };

      const EditCheckpoint = (checkpoint) => {
        setEditCheckpoint(checkpoint);
        setCreateCheckpoints(true);
      };
      return (
        <div style={{
          display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '10px 24px',
        }}
        >
          <strong>Checkpoints</strong>
          {checkpoints.map((checkpoint) => (
            <div key={checkpoint.id} style={{ width: '100%', display: 'list-item', listStyleType: 'decimal' }}>
              <Grid container spacing={2} sx={{ margin: '1px auto' }}>
                <Grid item xs={8}>
                  {`${checkpoint.city_name} `}
                </Grid>
                <Grid item xs={2}>
                  <Button onClick={() => EditCheckpoint(checkpoint)}>
                    <CreateIcon sx={{ fontSize: 22 }} />
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button onClick={() => deleteCheckpoint(checkpoint.id)}>
                    <DeleteOutlinedIcon sx={{ fontSize: 22 }} />
                  </Button>
                </Grid>
              </Grid>

            </div>
          ))}
        </div>
      );
    };

export default checkpointsTable;
