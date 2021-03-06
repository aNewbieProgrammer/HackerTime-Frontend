import logo from '../logo.svg';
import '../App.css';
import * as React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import IDE from './IDE';
import Topbar from './Topbar';
import QuestionBar from './Layout/QuestionBar/QuestionBar';
import Videochat from './Videochat'
import Editor from './Editor'
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';


export function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // TODO: question need to be fetched here
  const {jwtToken, name, companyName, question, candname, identity} = location.state;
  const { roomcode } = useParams();

  const [curCode, setCurCode] = React.useState('');
  const [curOutput, setCurOutput] = React.useState('');


  
  return (
      
    <div className="Main">
      <Topbar output = {curOutput} code={curCode} tempCode={roomcode} IntervieweeName={candname} Identity={identity}/>  
      <p></p>
      <p>.</p>
      <p>.</p>  
      <div className='d-flex '>
        <QuestionBar question={question}/>
        <IDE setCurOutput = {setCurOutput} setCurCode = {setCurCode} tempCode={roomcode}/>
        <Videochat enabled={true}/>
      </div>
    </div>
  );
}

export default Main;
