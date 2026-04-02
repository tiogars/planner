import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

const NAV_TABS = [
  { label: 'Setup', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Print', path: '/print' },
];

export default function Layout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentTab = NAV_TABS.findIndex((t) => t.path === pathname);

  const handleTabChange = (_: React.SyntheticEvent, idx: number) => {
    const tab = NAV_TABS[idx];
    if (tab) navigate(tab.path);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <CalendarMonthIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Planner
          </Typography>
        </Toolbar>
        <Tabs
          value={currentTab === -1 ? 0 : currentTab}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
          aria-label="navigation tabs"
        >
          {NAV_TABS.map((tab) => (
            <Tab key={tab.path} label={tab.label} />
          ))}
        </Tabs>
      </AppBar>
      <Container component="main" sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
