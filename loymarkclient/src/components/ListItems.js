import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  useNavigate,
} from 'react-router-dom';


export default function MainListItems() {

  const history = useNavigate();

  const goToUsers = () => {
    history('users');
  };
  const goToActivities = () => {
    history('activities');
  };

  return (<React.Fragment>
    <ListItemButton onClick={() => goToActivities()}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Actividades" />
    </ListItemButton>
    <ListItemButton onClick={() => goToUsers()}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItemButton>
  </React.Fragment>)
}
  
