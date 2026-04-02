import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import type { Activity, DayOfWeek } from '../types';
import { ALL_DAYS } from '../types';

type ActivityFormData = Omit<Activity, 'id'>;

const COLORS = [
  { label: 'Blue', value: '#1976d2' },
  { label: 'Green', value: '#2e7d32' },
  { label: 'Orange', value: '#e65100' },
  { label: 'Purple', value: '#6a1b9a' },
  { label: 'Red', value: '#c62828' },
  { label: 'Teal', value: '#00695c' },
];

interface Props {
  defaultValues?: ActivityFormData;
  onSubmit: (data: ActivityFormData) => void;
  onCancel: () => void;
}

const EMPTY: ActivityFormData = {
  title: '',
  description: '',
  color: COLORS[0].value,
  days: [],
  startTime: '09:00',
  endTime: '10:00',
};

export default function ActivityForm({ defaultValues, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ActivityFormData>({ defaultValues: defaultValues ?? EMPTY });

  useEffect(() => {
    reset(defaultValues ?? EMPTY);
  }, [defaultValues, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        label="Activity title"
        fullWidth
        inputProps={{ 'aria-label': 'Activity title' }}
        error={!!errors.title}
        helperText={errors.title?.message}
        {...register('title', { required: 'Title is required' })}
      />

      <TextField
        label="Description"
        fullWidth
        multiline
        rows={2}
        inputProps={{ 'aria-label': 'Description' }}
        {...register('description')}
      />

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Start time"
          type="time"
          InputLabelProps={{ shrink: true }}
          inputProps={{ 'aria-label': 'Start time' }}
          error={!!errors.startTime}
          helperText={errors.startTime?.message}
          {...register('startTime', { required: 'Start time is required' })}
        />
        <TextField
          label="End time"
          type="time"
          InputLabelProps={{ shrink: true }}
          inputProps={{ 'aria-label': 'End time' }}
          error={!!errors.endTime}
          helperText={errors.endTime?.message}
          {...register('endTime', { required: 'End time is required' })}
        />
      </Box>

      <FormControl sx={{ minWidth: 160 }}>
        <FormLabel>Color</FormLabel>
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <Select {...field} inputProps={{ 'aria-label': 'Color' }}>
              {COLORS.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      bgcolor: c.value,
                      mr: 1,
                      verticalAlign: 'middle',
                    }}
                  />
                  {c.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <FormControl component="fieldset" error={!!errors.days}>
        <FormLabel component="legend">Repeats on</FormLabel>
        <FormGroup row>
          <Controller
            name="days"
            control={control}
            rules={{ validate: (v) => v.length > 0 || 'Select at least one day' }}
            render={({ field }) => (
              <>
                {ALL_DAYS.map((day) => (
                  <FormControlLabel
                    key={day}
                    label={day}
                    control={
                      <Checkbox
                        checked={field.value.includes(day)}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...field.value, day]
                            : field.value.filter((d: DayOfWeek) => d !== day);
                          field.onChange(next);
                        }}
                      />
                    }
                  />
                ))}
              </>
            )}
          />
        </FormGroup>
        {errors.days && <FormHelperText>{errors.days.message}</FormHelperText>}
      </FormControl>

      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save activity
        </Button>
      </Box>
    </Box>
  );
}
