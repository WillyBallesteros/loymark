import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import { Button, Grid } from '@mui/material';
import RegistrarUsuario from '../components/Users/UserForm';
import { deleteUserAsync, getUsersAsync } from '../actions/user-actions';
import { countries } from "./../data/Countries";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const Users = (props) => {
  const history = useNavigate();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);

  const getFormattedDateyyyyMMdd = (dateString, separator) => {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return year + separator + month + separator + day;
  };

  useEffect(() => {
    const getAllUsersAsync = async () => {
      const response = await getUsersAsync();
      console.log(response.data);
      setUsers(response.data);
    };
    getAllUsersAsync();
  }, []);
  
  const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const editUser = (id) => {
      setUserId(id);
      setOpen(true);
    }

    const deleteUser = (id) => {
      const deleteAsync = async () => {
        const response = await deleteUserAsync(id);
        if (response?.status === 200 || response?.status === 201) {
          handleClose();
          Swal.fire(
            'Registro',
            `Usuario eliminado correctamente`,
            'success',
          );
          history('/activities');
  
        } else {
          Swal.fire(
            'Atención',
            '',
            'error',
            'Vuelva a intentarlo',
          );
        }
      };
      deleteAsync();
    }

  return (
    <React.Fragment>
      <Grid container spacing={2} style={{padding: "15px"}}>
        <Grid xs={10}>
          <Title>Usuarios</Title>
        </Grid>
        <Grid xs={2} align="right">
          <Button variant="outlined" onClick={handleClickOpen}>Crear</Button>
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Fecha Nacimiento</TableCell>
            <TableCell align="center">Teléfono</TableCell>
            <TableCell>Pais de Residencia</TableCell>
            <TableCell>Recibe Información?</TableCell>
            <TableCell align="center">Editar</TableCell>
            <TableCell align="center">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.lastname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{getFormattedDateyyyyMMdd(row.birthDate,"/")}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{countries && countries.find((x) => x.code === row.residenceCountry)?.fullName}</TableCell>
              <TableCell>{row.receiveInformation ? "SI" : "NO"}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" onClick={() => editUser(row.id)}><EditIcon/></Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="outlined" onClick={() => deleteUser(row.id)}><DeleteIcon/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {open && <RegistrarUsuario open={open} handleClose={handleClose} userId={userId}/>}
    </React.Fragment>
  );
}

export default Users;