import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Header, Sidebar } from 'components/Common';
import CircularProgress from '@mui/material/CircularProgress';
import Student from 'features/student';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

const theme = createTheme();

const Dashboard = React.lazy(() => import('features/dashboard'));

const useStyles = makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: '100vh',
  },

  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  },
}));

export function AdminLayout() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>

      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>

      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <React.Suspense fallback={<CircularProgress />}>
              <Dashboard />
            </React.Suspense>
          </Route>

          <Route path="/admin/students">
            <Student />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
