import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';

// @mui
import { TextField, Autocomplete } from '@mui/material';

// ----------------------------------------------------------------------

export default function RHFAutocomplete({ name, label, helperText, ...other }) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
RHFAutocomplete.propTypes = {
  name: PropTypes.any,
  label: PropTypes.any,
  helperText: PropTypes.any,
};
