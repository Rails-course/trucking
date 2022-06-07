import * as React from 'react';
import { Box, Container, Grid } from '@mui/material';
import httpClient from '../api/httpClient';
import { UserLogs } from '../common/interfaces_types';
import StatisticsTable from './Statistics/StatisticsTable';
import FilterBar from './Statistics/FilterBar';
import Search from './Search';

const mainContainerStyle = { pt: 3 };

const Statistics = () => {
  const [userLogs, setUserLogs] = React.useState<UserLogs[]>([]);

  React.useEffect(() => {
    httpClient.statistics.getAll().then((response) => {
      setUserLogs(response.data);
    });
  }, []);

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', rowGap: '20px', flexDirection: 'column',
      }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="center"
        >
          <Grid item sx={{ display: 'flex', columnGap: '30px' }}>
            <FilterBar setUserLogs={setUserLogs} />
          </Grid>
          <Grid item xs={12}>
            <StatisticsTable userLogs={userLogs} />
          </Grid>
        </Grid>
      </Box>
      {/* <div style={{ display: 'flex', columnGap: '30px' }}> */}
      {/* </div> */}
    </div>
  );
};

export default Statistics;
