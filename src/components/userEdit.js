import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Grid, Typography, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';


export default function UserEdit() {

    const { id } = useParams();

        useEffect(() => {
            var requestOptions = {
            method: 'GET',
            redirect: 'follow'
            };

            fetch("https://www.mecallapi.com/api/users/"+id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result['status'] === 'ok') {
                    setFname(result['user']['fname'])
                    setLname(result['user']['lname'])
                    setUsername(result['user']['username'])
                    setEmail(result['user']['email'])
                    setAvatar(result['user']['avatar'])
                }
            })
            .catch(error => console.log('error', error));
    }, [id])

    const handleSubmit = event => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id,
            "fname": fname,
            "lname": lname,
            "username": username,
            "email": email,
            "avatar": avatar
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.mecallapi.com/api/users/update", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result['message'])
            if (result['status'] === 'ok') {
                window.location.href = "/"
            }
        })
        .catch(error => console.log('error', error));
    }

    
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p : 2 }}>
      <Typography variant="h6" gutterBottom component="div">
        Edit User
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <TextField id="fname"  label="First Name" variant="outlined" fullWidth required  onChange={(e) => setFname(e.target.value)} value={fname}/>    
             </Grid>          
            <Grid item xs={12} >
                <TextField id="lname" value={lname} label="Last Name" variant="outlined" fullWidth required onChange={(e) => setLname(e.target.value)}/>    
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField id="username" value={username} label="Username" variant="outlined" fullWidth required onChange={(e) => setUsername(e.target.value)}/>    
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField id="email" value={email} label="Email" variant="outlined" fullWidth required onChange={(e) => setEmail(e.target.value)}/>    
            </Grid>
            <Grid item xs={12} >
                <TextField id="avatar" value={avatar} label="Avatar" variant="outlined" fullWidth required onChange={(e) => setAvatar(e.target.value)}/>    
            </Grid>
            <Grid item xs={12} >
                <Button type="submit" color="error" variant="contained" fullWidth>Update</Button>
            </Grid>
        </Grid>
      </form>

      </Container>
    </React.Fragment>
  );
}
