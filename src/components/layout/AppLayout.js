import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from '../listItems';
import { Auth } from 'aws-amplify'
import { Button } from '@material-ui/core';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));



const AppLayout = (props) => {
  const history = useHistory();
  const [user, setUser] = useState('');
  
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    useEffect(() => {
      async function getUser() {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user.username);
      }
      getUser();
    }, []);
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const signOut = async () => {
      await Auth.signOut();
      history.push("/")
    }
    return (
    <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
            <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
            <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {props.pageName}
            </Typography>
            <IconButton color="inherit">
              <Typography>
                Welcome {user}
              </Typography>
            </IconButton>
            <Button variant="text" color="default" onClick={signOut}>Sign out</Button>
        </Toolbar>
        </AppBar>
        <Drawer
        variant="permanent"
        classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
        >
        <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
            </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        </Drawer>
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {props.children}
        </main>
    </div>
    )
}

export default AppLayout;
