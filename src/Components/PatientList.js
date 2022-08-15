import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import api from "../Services/api";
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function PatientList() {
  const classes = useStyles();

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    PatientsGet()
  }, [])
  
  const PatientsGet = () => {

    api.get("/patient")
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

  const UpdatePatient = id => {
    window.location = '/update/'+id
  }

  const PatientDelete = id => {
    
    api.delete(`/patient/${id}`)
    .then(res => {
        return res
    })
    .then(
      (result) => {
        alert(`Paciente de id ${id} foi excluído`)
        if (result.status === 200) {
          PatientsGet();
        }
      }
    )
  }


  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Pacientes
              </Typography>
            </Box>
            <Box>
            <Link to="/create">
                <Button variant="contained" color="primary">
                  Adicionar paciente
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Data de nascimento</TableCell>
                <TableCell align="center">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.ID}>

                  <TableCell align="center">{patient.id}</TableCell>
                  <TableCell align="center">{patient.name}</TableCell>
                  <TableCell align="center">{patient.email}</TableCell>
                  <TableCell align="center">{patient.birth}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button onClick={() => UpdatePatient(patient.id)}>Edit</Button>
                      <Button onClick={() => PatientDelete(patient.id)}>Del</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </div>
    
  );
}