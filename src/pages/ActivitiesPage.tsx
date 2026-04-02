import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { usePlanner } from '../context/PlannerContext';
import ActivityForm from '../components/ActivityForm';
import type { Activity } from '../types';

type FormData = Omit<Activity, 'id'>;

export default function ActivitiesPage() {
  const { activities, addActivity, updateActivity, removeActivity } = usePlanner();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Activity | null>(null);

  const handleOpen = (activity?: Activity) => {
    setEditing(activity ?? null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
  };

  const handleSubmit = (data: FormData) => {
    if (editing) {
      updateActivity({ ...data, id: editing.id });
    } else {
      addActivity(data);
    }
    handleClose();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Recurrent Activities</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add activity
        </Button>
      </Box>

      {activities.length === 0 ? (
        <Typography color="text.secondary">
          No activities yet. Click "Add activity" to get started.
        </Typography>
      ) : (
        <List>
          {activities.map((activity, idx) => (
            <Box key={activity.id}>
              {idx > 0 && <Divider />}
              <ListItem
                secondaryAction={
                  <Box>
                    <IconButton
                      aria-label={`Edit ${activity.title}`}
                      onClick={() => handleOpen(activity)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label={`Delete ${activity.title}`}
                      onClick={() => removeActivity(activity.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: activity.color,
                    mr: 2,
                    flexShrink: 0,
                  }}
                />
                <ListItemText
                  primary={activity.title}
                  secondary={`${activity.startTime}–${activity.endTime} · ${activity.days.join(', ')}`}
                />
              </ListItem>
            </Box>
          ))}
        </List>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'Edit activity' : 'Add activity'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <ActivityForm
              defaultValues={editing ?? undefined}
              onSubmit={handleSubmit}
              onCancel={handleClose}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
