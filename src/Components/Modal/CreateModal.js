import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputMask from 'react-input-mask';
import Container from '@material-ui/core/Container';
import "./Modal.css"
import api from "../../Services/api"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
}));

export default function UserCreate({setOpenModal, setPatients, props}) {
  const classes = useStyles();
  
  const handleSubmit = event => {
    event.preventDefault();
    var data = {
      "id": name + email,
      "name": name,
      "email": email,
      "birth": birth,
      "address": address
    }

    api.put('/patient', data)
    .then(res => {
      return res.data.Items
    })
    .then(
      (result) => {
        setPatients(result)
      }
    ).catch((err) => {
      console.log(err)
    })
  }


  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [birth, setBirth] = useState(props.birth);
  const [address, setAddress] = useState(props.address);

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Paciente
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
            <InputMask
              mask="**/**/****"
              value={birth}
              disabled={false}
              maskChar=" "
              onChange={(e) => setBirth(e.target.value)}
            >
              {() => <TextField variant="outlined"
                required
                fullWidth
                label="Data de nascimento"
                />}
            </InputMask>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Endereço"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Adicionar
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancelar
          </Button>
        </form>
        
      </div>
    </Container>
  );
}