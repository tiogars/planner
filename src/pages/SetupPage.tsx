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
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import { usePlanner } from '../context/PlannerContext';
import { ALL_DAYS } from '../types';
import type { PlannerSettings, DayOfWeek } from '../types';

export default function SetupPage() {
  const { settings, updateSettings } = usePlanner();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm<PlannerSettings>({ defaultValues: settings });

  useEffect(() => {
    if (isSubmitSuccessful) reset(settings);
  }, [isSubmitSuccessful, settings, reset]);

  const onSubmit = (data: PlannerSettings) => {
    updateSettings(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h5" gutterBottom>
        Planner Setup
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          General
        </Typography>
        <TextField
          label="Planner title"
          fullWidth
          margin="normal"
          inputProps={{ 'aria-label': 'Planner title' }}
          error={!!errors.title}
          helperText={errors.title?.message}
          {...register('title', { required: 'Title is required' })}
        />
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Time Range
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 160 }} error={!!errors.startHour}>
            <FormLabel>Start hour</FormLabel>
            <Controller
              name="startHour"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} inputProps={{ 'aria-label': 'Start hour' }}>
                  {Array.from({ length: 24 }, (_, i) => (
                    <MenuItem key={i} value={i}>
                      {String(i).padStart(2, '0')}:00
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl sx={{ minWidth: 160 }} error={!!errors.endHour}>
            <FormLabel>End hour</FormLabel>
            <Controller
              name="endHour"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} inputProps={{ 'aria-label': 'End hour' }}>
                  {Array.from({ length: 24 }, (_, i) => (
                    <MenuItem key={i} value={i}>
                      {String(i).padStart(2, '0')}:00
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl sx={{ minWidth: 200 }} error={!!errors.slotDuration}>
            <FormLabel>Slot duration</FormLabel>
            <Controller
              name="slotDuration"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  inputProps={{ 'aria-label': 'Slot duration' }}
                >
                  <MenuItem value={15}>15 minutes</MenuItem>
                  <MenuItem value={30}>30 minutes</MenuItem>
                  <MenuItem value={60}>1 hour</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <FormControl
          component="fieldset"
          error={!!errors.days}
          fullWidth
        >
          <FormLabel component="legend">Days of week</FormLabel>
          <FormGroup row>
            <Controller
              name="days"
              control={control}
              rules={{
                validate: (v) =>
                  v.length > 0 || 'Select at least one day',
              }}
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
          {errors.days && (
            <FormHelperText>{errors.days.message}</FormHelperText>
          )}
        </FormControl>
      </Paper>

      <Button
        type="submit"
        variant="contained"
        disabled={!isDirty}
        startIcon={<SaveIcon />}
      >
        Save settings
      </Button>
    </Box>
  );
}
