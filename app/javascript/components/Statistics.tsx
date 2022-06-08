import * as React from 'react';
import { Box, Grid } from '@mui/material';
import { UserLogs } from '../common/interfaces_types';
import StatisticsTable from './Statistics/StatisticsTable';
import FilterBar from './Statistics/FilterBar';

const Statistics = () => {
  const [userLogs, setUserLogs] = React.useState<UserLogs[]>([]);

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
            <FilterBar
              setUserLogs={setUserLogs}
            />
          </Grid>
          <Grid item xs={12}>
            <StatisticsTable userLogs={userLogs} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Statistics;
