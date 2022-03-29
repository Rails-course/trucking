import * as React from 'react';

import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';

import httpClient from '../api/httpClient';
import WriteOffActTable from './WriteOffAct/WriteOffActTable';
import CreateWriteOffActForm from './WriteOffAct/CreateWriteOffActForm';

const WriteOffActs = () => {
  const [isActiveModal, setModalActive] = React.useState(false);
  const [writeOffActs, setWriteOffActs] = React.useState([]);

  const handleClose = () => setModalActive(false);

  React.useEffect(() => {
    httpClient.writeOffActs.getAll().then((response) => {
      setWriteOffActs(response.data);
    });
  }, []);

  const handleSubmit = async (writeOffAct) => {
    await httpClient.writeOffActs.create(writeOffAct)
      .then((response) => setWriteOffActs((prev) => [...prev, response.data]));
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', rowGap: '20px', maxWidth: '70%',
      }}
      >
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          <Button variant="contained" color="success" size="large" onClick={() => setModalActive(true)}>
            Create Write-off Act
          </Button>
        </Grid>
        <Grid item xs={12}>
          <WriteOffActTable
            writeOffActs={writeOffActs}
            setWriteOffActs={setWriteOffActs}
          />
        </Grid>
      </Box>
      <CreateWriteOffActForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default WriteOffActs;
