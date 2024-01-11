import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { DatePicker } from '@mui/x-date-pickers';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { backlog } from 'src/_mock/backlog';

import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function BacklogCreatePage() {
  const theme = useTheme();
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [assignee, setAssignee] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const STATUS_OPTIONS = ['In Progress', 'To Be Tested', 'To Be Merged', 'To Do'];
  const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'];

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleChangeAssignee = (event) => {
    setAssignee(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const renderForm = (
    <>
      <Stack spacing={3} sx={{ my: 3 }}>
        <TextField name="task" label="Task" type="textarea" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Select label="Status" value={status} onChange={handleChangeStatus} fullWidth>
          <MenuItem value="" disabled>
            Select Status
          </MenuItem>
          {STATUS_OPTIONS.map((options, i) => (
            <MenuItem key={i} value={options}>
              {options}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Select label="Priority" value={priority} onChange={handleChangePriority} fullWidth>
          <MenuItem value="" disabled>
            Select Priority
          </MenuItem>
          {PRIORITY_OPTIONS.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Select label="Assignee" value={assignee} onChange={handleChangeAssignee} fullWidth>
          <MenuItem value="" disabled>
            Select Assignee
          </MenuItem>
          {backlog.map((data, i) => (
            <MenuItem key={i} value={data.assigned}>
              {data.assigned}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <Stack sx={{ my: 3 }}>
        <DatePicker
          label="Start date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>

      <Stack sx={{ my: 3 }}>
        <DatePicker
          label="End date"
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>

      <LoadingButton
        fullWidth
        type="submit"
        variant="contained"
        size="large"
      >
        Create
      </LoadingButton>
    </>
  );

  return (
    <>
      <Helmet>
        <title> Backlog: Create a new Backlog </title>
      </Helmet>
      <Box>
        <Stack>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 620,
            }}
          >
            <Typography variant="h4">Create Backlog</Typography>

            {renderForm}
          </Card>
        </Stack>
      </Box>
    </>
  );
}
