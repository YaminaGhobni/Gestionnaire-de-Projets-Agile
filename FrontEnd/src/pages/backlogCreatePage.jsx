
import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { backlog } from 'src/_mock/backlog';
import { useNavigate } from 'react-router-dom';

export default function BacklogCreatePage() {
  const { handleSubmit, control, register, formState: { errors } } = useForm({
    defaultValues: {
      task: '',
      status: '',
      priority: '',
      assignee: '',
      startDate: null,
      endDate: null,
    },
  });
  const navigate = useNavigate();

  const STATUS_OPTIONS = ['In Progress', 'To Be Tested', 'To Be Merged', 'To Do'];
  const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'];

  const onSubmit = (data) => {
    console.log(data);
    // navigate('/backlog/list');
  };

  return (
    <>
      <Helmet>
        <title> Backlog: Create a new Backlog </title>
      </Helmet>
      <Container>
        <Stack>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 620,
            }}
          >
            <Typography variant="h4">Create Backlog</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3} sx={{ my: 3 }}>
                <TextField
                  name="task"
                  label="Task"
                  multiline
                  {...register('task', { required: 'Task is required' })}
                  error={!!errors?.task}
                  helperText={errors?.task?.message}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Status" fullWidth>
                      <MenuItem value="" disabled>
                        Select Status
                      </MenuItem>
                      {STATUS_OPTIONS.map((option, i) => (
                        <MenuItem key={i} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Priority" fullWidth>
                      <MenuItem value="" disabled>
                        Select Priority
                      </MenuItem>
                      {PRIORITY_OPTIONS.map((option, i) => (
                        <MenuItem key={i} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                <Controller
                  name="assignee"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Assignee" fullWidth>
                      <MenuItem value="" disabled>
                        Select Assignee
                      </MenuItem>
                      {backlog.map((data, i) => (
                        <MenuItem key={i} value={data.assigned}>
                          {data.assigned}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Stack>

              <Stack sx={{ my: 3 }}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Start date"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                />
              </Stack>

              <Stack sx={{ my: 3 }}>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="End date"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                />
              </Stack>

              <LoadingButton fullWidth type="submit" variant="contained" size="large">
                Create
              </LoadingButton>
            </form>
          </Card>
        </Stack>
      </Container>
    </>
  );
}