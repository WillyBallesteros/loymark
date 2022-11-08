import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import Stack from '@mui/material/Stack';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { createUserAsync, getUserByIdAsync, updateUserAsync } from "../../actions/user-actions";
import { countries } from "./../../data/Countries";
import { green } from "@mui/material/colors";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';



const RegistrarUsuario = ({ open, handleClose, userId}) => {
  const isEdit = userId !== 0;
  const [user, setUser] = useState({});
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const validateDates = () => {
    const currentyear = moment().year() - 1;
    return moment(currentyear + "-12-31").toDate();
  }



  const REQUIRED_MESSAGE = "El dato es requerido";

  const schema = yup.object().shape({
    name: yup.string()
      .required(REQUIRED_MESSAGE)
      .min(3, "Ingrese mínimo 3 caracteres")
      .max(80, "Ingrese máximo 80 caracteres")
      .matches(
        /^(([A-Za-zÀ-ÿ])+[ ]?)*$/g,
        "Ingrese un nombre válido"
      ),
    lastname: yup
      .string()
      .required(REQUIRED_MESSAGE)
      .min(3, "Ingrese mínimo 3 caracteres")
      .max(80, "Ingrese máximo 80 caracteres")
      .matches(
        /^(([A-Za-zÀ-ÿ])+[ ]?)*$/g,
        "Ingrese un apellido válido"
      ),
    email: yup
      .string()
      .required(REQUIRED_MESSAGE)
      .email("Ingrese un correo electrónico válido")
      .typeError("Ingrese un correo electrónico válido")
      .min(8, "Ingrese mínimo 8 caracteres")
      .max(100, "Ingrese máximo 100 caracteres"),

    birthDate: yup
      .date()
      .required(REQUIRED_MESSAGE)
      .min(
        new Date(1899, 11, 31, 23, 59, 29),

        `No puede ser menor a la fecha de 1900`
      )
      .max(validateDates(), `La fecha debe ser menor al año actual`)
      .nullable()
      .typeError("Ingrese un formato de fecha válido"),
    phone: yup
      .string()
      .nullable()
      .notRequired()
      .min(10, "Ingrese mínimo 10 dígitos")
      .max(15, "Ingrese máximo 15 dígitos"),
    residenceCountry: yup.string()
      .required(REQUIRED_MESSAGE)
      .max(3, "Ingrese máximo 3 dígitos"),

    receiveInformation: yup.bool().required(
    REQUIRED_MESSAGE)
    .typeError(REQUIRED_MESSAGE),
    
    
    
  });

  const defaultValues = {
    name: "",
    lastname: "",
    email: "",
    birthDate: null,
    phone: "",
    residenceCountry: "",
    receiveInformation: "",
  };

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const getUserAsync = async () => {
      const response = await getUserByIdAsync(userId);
      debugger;
      let user = response.data;
      setUser(response.data);
      setValue("name",user.name);
      setValue("lastname",user.lastname);
      setValue("email",user.email);
      setValue("birthDate",user.birthDate);
      setValue("phone",user.phone);
      setValue("residenceCountry",user.residenceCountry);
      setValue("receiveInformation",user.receiveInformation);
      
    };
    if (isEdit) {
      getUserAsync();
    }
  }, []);


  const onSubmit = (data) => {
    setLoading(true);
    const user = {
      name: data.name,
      lastname: data.lastname,
      birthDate: moment(data.birthDate).format("YYYY-MM-DDTHH:mm"),
      email: data.email,
      phone: data.phone ? data.phone : null,
      residenceCountry: data.residenceCountry,
      receiveInformation: data.receiveInformation,
    };
    const createPerson = async () => {
      let response = null;
      if (isEdit) {
        user.id = userId;
        response = await updateUserAsync(user);
      } else {
        response = await createUserAsync(user);
      }
      
      
      if (response?.status === 200 || response?.status === 201) {
        handleClose();
        Swal.fire(
          'Registro',
          `Usuario ${isEdit ? "editado" : "creado"} correctamente`,
          'success',
        );
        history('/users');

      } else {
        Swal.fire(
          'Atención',
          '',
          'error',
          'Vuelva a intentarlo',
        );
      }
      setLoading(false);
    };
    createPerson();
  };




  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle align="center">Registro Usuario</DialogTitle>
      <DialogContent>


        <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: "500px" }}>
          <div style={{ marginBottom: 15 }}>
            <Stack spacing={3}>
              <Controller
                name="name"
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    label="Nombres" {...field}
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors?.name && <p>{errors?.name?.message}</p>} />
                )}
              />

            </Stack>
          </div>
          <div style={{ marginBottom: 15 }}>
            <Stack spacing={3}>
              <Controller
                name="lastname"
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    label="Apellidos" {...field}
                    variant="outlined"
                    error={!!errors.lastname}
                    helperText={errors?.lastname && <p>{errors?.lastname?.message}</p>} />
                )}
              />
            </Stack>
          </div>
          <div style={{ marginBottom: 15 }}>
            <Stack spacing={3}>
              <Controller
                name="email"
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    label="Correo eléctronico" {...field}
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors?.email && <p>{errors?.email?.message}</p>} />
                )}
              />
            </Stack>
          </div>
          <div style={{ marginBottom: 15 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <Controller
                  name="birthDate"
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <DesktopDatePicker
                      label="Fecha de Nacimiento"
                      inputFormat="MM/DD/YYYY"
                      {...field}
                      renderInput={(params) => <TextField type="text" {...params} error={!!errors.birthDate} helperText={errors?.birthDate && <p>{errors?.birthDate?.message}</p>} />}
                    />
                  )}
                />
              </Stack>
            </LocalizationProvider>
          </div>
          <div style={{ marginBottom: 15 }}>
            <Stack spacing={3}>
              <Controller
                name="phone"
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    label="Teléfono" {...field}
                    variant="outlined"
                    error={!!errors.phone}
                    helperText={errors?.phone && <p>{errors?.phone?.message}</p>} />
                )}
              />
            </Stack>
          </div>
          <div style={{ marginBottom: 15 }}>
            <Stack spacing={3}>
              <Controller
                name="residenceCountry"
                control={control}
                defaultValue='COL'
                render={({ field }) => (
                  <TextField
                    select
                    label="Pais de residencia" {...field}
                    variant="outlined"
                    error={!!errors.residenceCountry}
                    helperText={errors?.residenceCountry && <p>{errors?.residenceCountry?.message}</p>}>
                    <MenuItem value="">Select...</MenuItem>
                    {countries && countries.map((country) => (
                      <MenuItem value={country.code}>{country.fullName}</MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Stack>
          </div>
          <div style={{ marginBottom: 15 }}>
            <Stack spacing={3}>
              <Controller
                name="receiveInformation"
                control={control}
                defaultValue='0'
                render={({ field }) => (
                  <TextField
                    select
                    label="¿Desea recibir información?" {...field}
                    variant="outlined"
                    error={!!errors.receiveInformation}
                    helperText={errors?.receiveInformation && <p>{errors?.receiveInformation?.message}</p>}>
                    <MenuItem value={true}>Si</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </TextField>
                )}
              />
            </Stack>

          </div>
          <Button variant="outlined" disabled={loading} type="submit">Guardar</Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrarUsuario;
