import logo from '../logo.svg';
import pPic from '../profile.svg';
import '../App.css';
import { Button, Icon, Modal, TextArea, Checkbox, Form } from 'semantic-ui-react'
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import React, { useRef, useState, useEffect, useContext } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';


// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';


function Profile() {
  const location = useLocation()
  // console.log(location.state.jwtToken);
  const [firstOpen, setFirstOpen] = React.useState(false)
  const [secondOpen, setSecondOpen] = React.useState(false)
  const navigator = useNavigate();
  const [name, setName] = useState();
  const [companyName, setCompanyName] = useState();
  const [password, setPassword] = useState();
  const [jwtToken, setJwtToken] = useState();
  const [question, setQuestion] = useState('');
  const [candname, setCandname] = useState('');
  // setJwtToken(location.state.jwtToken);
  // setPassword(location.state.jwtToken);
  // setJwtToken(location.state.jwtToken);

  const handleChangeName = event => {
    setName(event.target.value);
  }
  const handleChangeCName = event => {
    setCompanyName(event.target.value);
  }
  useEffect(() => {
    setJwtToken(location.state.jwtToken);
    setName(location.state.name);
    setCompanyName(location.state.companyName);
    console.log(name + " " + companyName);
    //start();
  })

  const start = () => {
    const response = axios.get('http://localhost:8080/v1/user', {
      headers: {
        'Authorization': `Bearer ${location.state.jwtToken}`
      }
    })
      .then(res => {
        setName(res?.data?.name)
        setCompanyName(res?.data?.companyName)
        console.log('Our response:')
        console.log(res)
      })
  }
  const routeChange = () => {
    let path = "/HackerTime-Frontend/profile";
    navigator(path);
  }
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinish = () => {
    axios.post('http://localhost:8080/hostroom', {"question": question})
      .then(res => {
        navigator(`/HackerTime-Frontend/interview/${res.data.roomCode}`,
        {state:{jwtToken: jwtToken, name: name, candname: candname, companyName: companyName, question: question}})
      }
    )

  }

  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value);
  }
  const handleChangeCandname = (e) => {
    setCandname(e.target.value);
  }

  return (
    <div className="App">
      <Button align='right' variant="outlined" onClick={handleClickOpen}>
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your password must be at least 6 characters and should include combinations of numbers, letters and special characters (!$@%)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Current password"
            label="Current password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="New password"
            label="New password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="New password"
            label="New password, again"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>

      <header className="App-header">

        <img src={pPic} className="Profile-Pic" alt="pPic" width="100" />
        <p >

        </p>
        <p align='center'>{name}<br></br>Company: {companyName}</p>
        
        <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Interview 3 - Jen R" secondary="Jan 9, 2014" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Interview 2 - Ben B" secondary="Jan 7, 2014" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Interview 1 - Ryan N" secondary="July 20, 2014" />
      </ListItem>
    </List>

    <>
      <Button onClick={() => setFirstOpen(true)}>Start An Interview</Button>

      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Modal.Header>Question Details</Modal.Header>
        <Modal.Content image>
          <div className='image'>
            <Icon name='right arrow' />
          </div>
          <Modal.Description>
            <Form>
              <TextArea
                placeholder='Please provide the name of the interviewee...'
                style={{ minWidth: 600, maxHeight: 40 }}
                value={candname}
                onChange={handleChangeCandname}
              />
              <TextArea 
                placeholder='Please provide the coding question...' 
                style={{ minWidth: 600, minHeight:500 }}
                value={question}
                onChange={handleChangeQuestion}
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setSecondOpen(true)} primary>
            Create room <Icon name='right chevron' />
          </Button>
        </Modal.Actions>

        <Modal
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
          size='small'
        >
          <Modal.Header>Room Created!</Modal.Header>
          <Modal.Content>
            <p>Clicking "Finish" will take you to the room, Please copy and provide the invitation link in the room to the interviewer. </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              icon='check'
              content='Finish'
              onClick={handleFinish}
            />
          </Modal.Actions>
        </Modal>
      </Modal>
    </>
      </header>
    </div>
  );
}

export default Profile;
