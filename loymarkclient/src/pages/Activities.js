import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import { Grid } from '@mui/material';
import { getActivitiesAsync } from '../actions/activities-actions';

const Activities = (props) => {

  const [activities, setActivities] = useState([]);

  const getFormattedDateTime = (dateString) => {
    let date = (new Date(dateString)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
    return date;
  };

  useEffect(() => {
    const getAllActivitiesAsync = async () => {
      const response = await getActivitiesAsync();
      console.log(response.data);
      setActivities(response.data);
    };
    getAllActivitiesAsync();
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={2} style={{padding: "15px"}}>
        <Grid xs={10}>
          <Title>Actividades</Title>
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha de Actividad</TableCell>
            <TableCell>Nombre Completo</TableCell>
            <TableCell>Detalle de Actividad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities && activities.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{getFormattedDateTime(row.creationDate)}</TableCell>
              <TableCell>{row.fullName}</TableCell>
              <TableCell>{row.observation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default Activities;