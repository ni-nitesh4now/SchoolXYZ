import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Image, ToggleButton, } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LOGO from './../image/logo.png';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
import {login,getUserByEmail} from '../api/auth'

const container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  marginTop: '0px'
}

const form = {
  padding: '20px',
  width: '400px',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop:'0',
  marginLeft:'30vh',
  paddingTop:'0',
  marginTop:'-30px'
}

const rowOne = {
  // color: 'gray',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // marginBottom: '0px',
  width: '100%',
  // paddingRight: '50px'
}

const logo = {
  height: '65px',
  transform: 'rotate(-15deg)',
 // marginTop:'-2px'
}

const title = {
  fontWeight: '600',
  marginTop: '40px',
  marginLeft: '-6px',
  fontSize:'30px',

}

const titlepen = {
  fontWeight: '400',
  marginTop: '40px', 
  fontSize:'30px'
}

const btn = {
  display:'flex',
  flexDirection:'row',

}

const outerbtn={

  display: 'inline-block',
  borderRadius: '30px',
  
  cursor: 'pointer',
  overflow: 'hidden',
  marginBottom: '10px',
  
}

const currbtn={
    width: '20vh',
    height: '50px',
    borderRadius: '14px',
    border:'none',
    outline: 'none',
    margin: '0 1px',
    cursor: 'pointer',
    fontFamily:"'adobe-clean', sans-serif"
}

const submit = {
  fontSize: '20px',
  color: 'white',
  borderRadius: '33px',
  width: '40%',
  marginBottom: '25px',
  padding:'4px 15px',
  fontFamily:"'adobe-clean', sans-serif"

}

const curvedInput={
  borderRadius: '10vh',
  padding: '15px', 
  border: '1px solid grey',
  paddingLeft:"5vh",
  fontWeight:"500",
  fontSize:"15px",
  '::placeholder': {
    color: 'blue', // Change this to your desired placeholder color
  },
  color:"grey",
  width:'40vh',
  fontFamily:"'adobe-clean', sans-serif",
  marginLeft:'3vh',
  marginTop:'1px',
  

}




const Login = () => {

  // const [uId, setUId] = useState('');
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRadioChange = (value) => {
    setRadioValue(value);
    setChecked(true);
  }; 
  const findingId=async(email)=>{
    const tempId=await getUserByEmail(email);      
     Cookies.set('id',tempId._id);
     console.log("findingID",tempId._id)
}

  const handlebutton=(id)=>{
    Cookies.set('umail', id);
     console.log(Cookies.get('umail'));
    setChecked(true);
   const loginSuccess = true; // You should replace this with the actual login status received from the server

  if (loginSuccess) {
    
    navigate('/user');
  } else {
    console.log('Login unsuccessful');
  }
    
  }

  const handleLogin = async () => {
    // Prepare the data to be sent to the server
    const data = {
      email: email,
      password: password,
      role: radioValue === '1' ? 'admin' : 'user'
    };
  
    try {
      const res = await login(data);
  
      if (res === 'Invalid credentials') {
        alert('Please enter correct email and password');
        return;
      }
  
      Cookies.set('umail', email);
      findingId(email);
      setChecked(true);
  
      if (res === 'admin') {
        navigate('/admin');
      } else if (res === 'user') {
        navigate('/user');
      } else {
        alert('Please enter correct email and password');
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Unauthorized access. Please enter correct email and password');
      } else {
        console.error('Error logging in:', error.message);
      }
    }
  };
  



  const radios = [
    { name: 'Admin', value: '1' },
    { name: 'User', value: '2' },
  ];

  return (
    <Container style={container}>
      <Form style={form}>
        <Form.Group className="mb-3" style={rowOne}>
          <Image src={LOGO} style={logo} ></Image>
          <h1 style={title}>School</h1>
          <h1 style={titlepen}>Pen</h1>
        </Form.Group>
        <br>

        </br>

        <Form.Group  >
          
          {radios.map((radio, index) => (
                                        <div key={index} className='services' style={{
                ...outerbtn,
                borderTopLeftRadius: (index === 0 ||(index===radios.length-1 && radioValue===radio.value)) ? '30px' : '0',
                borderBottomLeftRadius: (index === 0 ||(index===radios.length-1 && radioValue===radio.value))? '30px' : '0',
                borderTopRightRadius:( index === radios.length - 1||(index===0 && radioValue===radio.value) )? '30px' : '0',
                borderBottomRightRadius: ( index === radios.length - 1||(index===0 && radioValue===radio.value) )? '30px' : '0',
                borderLeft: index === 0 && radioValue === radio.value &&index!==radios.length-1? '3px solid #0d6efd' : 'none',
                borderLeft:index===radios.length-1&& radio.value!==radioValue?'none':'1px solid grey',
                borderRight: index === radios.length - 1 && radioValue === radio.value ? '3px solid #0d6efd' : 'none',
                borderRight:index===0&& radio.value!==radioValue?'none':'1px solid grey',
                borderTop:radio.value!==radioValue?'1px solid grey':'3px solid #0d6efd',
                borderBottom:radio.value!==radioValue?'1px solid grey':'3px solid #0d6efd',
                backgroundColor: radioValue === radio.value ? '#0d6efd' : 'white',
                fontFamily:"'adobe-clean', sans-serif",
                
                
                
              }}  onClick={() => handleRadioChange(radio.value)}>
                                            <div className='second-div'style={btn}>
                                                <button type='button' onChange={(e) => setRadioValue(e.currentTarget.value)} onClick={() => setChecked(true)} style={{
                    ...currbtn,
                    backgroundColor: radioValue === radio.value ? '#0d6efd' : 'white',
                    

                  }}>
                                                    <span style={{fontFamily:"'adobe-clean', sans-serif",
                                                     color: radioValue === radio.value ? 'white' : '#0d6efd',
                                                     
                                                    }}>{radio.name}</span>  
                                                </button>
                                            </div>
            </div>))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="User Id" style={curvedInput}  value={email} onChange={handleEmailChange}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Control type="password" placeholder="Password" style={curvedInput}  value={password} onChange={handlePasswordChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        </Form.Group>
        <Button variant="primary" type="button" style={submit} onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default Login;