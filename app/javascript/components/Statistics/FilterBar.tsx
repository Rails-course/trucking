import * as React from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../api/httpClient';
import { SearchPanel } from '../../utils/style';

export default function BasicDateRangePicker({ setUserLogs }) {
  const [searchName, setSearchName] = React.useState('');
  const [actionData, setActionData] = React.useState('');
  const [startDate, setStartDate] = React.useState<Date | string>('');
  const [endDate, setEndDate] = React.useState<Date | string>(new Date());
  const [filters, setFilters] = React.useState({
    name: searchName,
    action: actionData,
  });

  // const navigate = useNavigate();
  // const routeStatisticsList = () => {
  //   navigate('/trucking_audit');
  // };

  React.useEffect(() => {
    if (searchName.length > 3 || actionData !== '' || startDate !== null) {
      httpClient.statistics
        .dataFilter(filters, String(startDate), String(endDate))
        .then((res) => {
          setUserLogs(res.data);
          // routeStatisticsList();
        });
    }
  }, [filters, startDate, endDate]);

  const handleInput = (field) => (event) => {
    const { value } = event.target;

    setFilters({
      ...filters,
      [field]: value,
    });

    switch (field) {
      case 'name':
        setSearchName(value);
        break;
      case 'action':
        setActionData(value);
        break;
      default:
        break;
    }
  };

  const handlerCancelBtn = () => {
    filters.name = '';
    filters.action = '';
    setEndDate(new Date());
    setStartDate(String(''));
    // routeStatisticsList();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: '10px',
        rowGap: '10px',
        marginBottom: '20px',
      }}
    >
      <SearchPanel>

      <TextField
        id="name"
        name="name"
        label="Name"
        value={filters.name}
        onChange={handleInput('name')}
      />

      <FormControl sx={{ width: '15%' }}>
        <InputLabel id="demo-simple-select-label">Action</InputLabel>
        <Select
          name="action"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filters.action}
          label="Action"
          onChange={handleInput('action')}
        >
          <MenuItem value="create">create</MenuItem>
          <MenuItem value="update">update</MenuItem>
        </Select>
      </FormControl>

      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        sx={{ display: 'flex', alignItems: 'center', mb: 3 }}
      >
        <DatePicker
          disableFuture
          label="from"
          openTo="day"
          views={['year', 'month', 'day']}
          value={startDate}
          onChange={(newDate) => setStartDate(newDate)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          disableFuture
          label="to"
          openTo="day"
          views={['year', 'month', 'day']}
          value={endDate}
          onChange={(newDate) => setEndDate(newDate)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <Button
        variant="outlined"
        color="error"
        sx={{ height: '56px' }}
        size="large"
        onClick={handlerCancelBtn}
      >
        Cancel
      </Button>
      </SearchPanel>

    </div>
  );
}
