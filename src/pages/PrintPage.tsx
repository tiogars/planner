import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PrintIcon from '@mui/icons-material/Print';
import { usePlanner } from '../context/PlannerContext';
import type { DayOfWeek } from '../types';

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

function minutesToLabel(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export default function PrintPage() {
  const { settings, activities } = usePlanner();

  const { startHour, endHour, slotDuration, days, title } = settings;
  const totalMinutes = (endHour - startHour) * 60;
  const slots = Math.max(0, totalMinutes / slotDuration);

  const getActivitiesForSlot = (day: DayOfWeek, slotStart: number) => {
    const slotEnd = slotStart + slotDuration;
    return activities.filter((a) => {
      if (!a.days.includes(day)) return false;
      const aStart = timeToMinutes(a.startTime) - startHour * 60;
      const aEnd = timeToMinutes(a.endTime) - startHour * 60;
      return aStart < slotEnd && aEnd > slotStart;
    });
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
        className="no-print"
      >
        <Typography variant="h5">Print Preview</Typography>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={() => window.print()}
        >
          Print
        </Button>
      </Box>

      <Paper
        sx={{ p: 2, overflowX: 'auto' }}
        id="planner-print"
        elevation={2}
      >
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Box
          component="table"
          sx={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.75rem',
            '& th, & td': {
              border: '1px solid',
              borderColor: 'divider',
              p: 0.5,
              verticalAlign: 'top',
            },
            '& th': { bgcolor: 'primary.main', color: 'primary.contrastText', textAlign: 'center' },
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 60 }}>Time</th>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: slots }, (_, i) => {
              const slotStart = i * slotDuration;
              const label = minutesToLabel(startHour * 60 + slotStart);
              return (
                <tr key={i}>
                  <td style={{ whiteSpace: 'nowrap', fontWeight: 'bold', textAlign: 'center' }}>
                    {label}
                  </td>
                  {days.map((day) => {
                    const matched = getActivitiesForSlot(day, slotStart);
                    return (
                      <td key={day}>
                        {matched.map((a) => (
                          <Box
                            key={a.id}
                            sx={{
                              bgcolor: a.color,
                              color: '#fff',
                              borderRadius: 0.5,
                              px: 0.5,
                              mb: 0.25,
                              fontSize: '0.7rem',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                            title={a.description || a.title}
                          >
                            {a.title}
                          </Box>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Box>
      </Paper>
    </Box>
  );
}
