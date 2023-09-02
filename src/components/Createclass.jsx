import React, { useState,useEffect } from 'react'
import { Button, Col, Container, Form, FormLabel, Modal, Row, Table } from 'react-bootstrap'
import Adminsidenav from './Adminsidenav'
import {
    BiBlock,
} from 'react-icons/bi'
import {
    AiFillDelete,
} from 'react-icons/ai'
import {
  RxUpdate,
} from 'react-icons/rx'

import './css/createuser.css';

import { getClasses } from '../api/auth';
import  { createClass,deleteClass,getClassData,updateClass,restrictClass} from '../api/auth';


const styles = {
    container: {
        width: '100%',
    },
    userBody: {
        alignItems: 'center',
        padding: '15px'
    },
    link: {
        marginBottom: '5px',
        marginTop:'40px',
        marginLeft:'90px',
    },
    createLink: {
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        color: '#712CF9'
    },
    table: {
        display:'flex',
        flexWrap:'wrap',
        paddingright:'2px', // Should be 'paddingRight' instead of 'paddingright'
    borderColapse:'separate', // Should be 'borderCollapse' instead of 'borderColapse'
  marginTop:'-4px',
  marginLeft:'-9vh',
  paddingBottom:'2px'
    },
    rows:{
        
        marginLeft:'90px',
        display:'flex',
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        borderRadius:'26px',
        marginTop:'4vh',
        paddingBottom:'-20px',
    },
    column:{
        marginLeft:'20px',
        marginTop:'4px'
    },
    col2:{
        marginLeft:'7vh',
        marginTop:'-3px',
        marginRight:'1vh',
        fontSize:'15px',
        textAlign:'left',
        marginBottom:'2px',
        width:'150px'
    },
    col3:{
        marginRight:'3vh',
        marginTop:'4px'
    },
    funcLink: {
        textDecoration: 'none',
        color: 'gray',
    },
    colCenter: {
        textAlign: 'center',
        justifyContent: 'center',
    }
};
const modalBorder={
    borderBottom:'none',
    borderTop:'none',
}

const submitBtn={
    marginLeft:'18vh',
    padding:'1vh 8vh',
    borderRadius:'5vh',
    marginBottom:'10px',
    backgroundColor:' #8546e3',
    borderColor:' #8546e3',
    marginTop:'7px'
}
const inputField={
    width:'60%',
    marginLeft:'90px',
    borderRadius:'30vh',
    paddingLeft:'20px',
    marginTop:'25px',
    marginBottom:'20px',
    boxShadow: '0 0 5px #ccc',
    outline: 'none',

}

const addOuter={
    borderRadius:'10vh',
    backgroundColor:"white",
    width:'60vh',
    padding:'10px 3px 40px 5px',
   
}
const adding={
    position: 'fixed',
     top: 0,
    left: 0,
     width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}
const closeButton={
    justifyContent:'right',
    marginLeft:'50vh',
    border:'none',
    backgroundColor:'white',
    fontSize:'20px',
    marginBottom:'0px',
    color:'grey',
    marginTop:'10px',
}

const Createclass = () => {

    const [show, setShow] = useState(false);
    const [classes,setClasses]=useState([]);
    const [name, setName] = useState('');
    const[showUpdate,setShowUpdate]=useState(false)
    const[updateName,setUpdateName]=useState('');
    const[t,setT]=useState('')
    const[selectedId,setSelectedId]=useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        setName(event.target.value);
      };

    const handleCreateClass = async() => {

        try {
            const userExists = await checkNameExist(name);
        
            if (userExists) {
              alert("Class already exists!");
              setName('');
              handleClose();
            } else {
                const Data={
                    name,
                }
                handleClose();
              const create = await createClass(Data);
              setName('');
              setClasses((prev) => [create,...prev]);
               console.log("created from fronted  class");
               handleClose();
            }
          } catch (error) {
            console.error('Error creating user:', error.message);
          }
        
      };

      const checkNameExist=async(name)=>{
        return new Promise((resolve, reject) => {
            // Assuming "users" is an array of user objects
            const Exists = classes.some((b) => b.name.toLowerCase() == name.toLowerCase());
            console.log("Exist",Exists)
            resolve(Exists);
        });
    }

      const handleDelete = async (classId) => {
        try {
          await deleteClass(classId); // Call the deleteClass function with the classId.
          // Handle any further actions after successful deletion if needed.
          setClasses((prev) => prev.filter((x) => x._id !== classId));
          setName('');
        } catch (error) {
          // Handle errors if the deletion fails.
          console.error('Error deleting class:', error);
        }
      };
      
    const fetchUserForUpdate = async (Id,isBlocked) => {
      try {
        if(!isBlocked)
        {const response = await getClassData(Id);
        setSelectedId(Id);
        setUpdateName(response.name);
        setShowUpdate(true);}
        else{
          alert("cann't update as it is restricted")
        }
      } catch (error) {
        console.error('Error fetching classes for update:', error);
      }
    };
    const handleUpdate=async()=>{
      try{
          const updatedData = {
              name: updateName,
          };
          const response=await updateClass(updatedData,selectedId);
          console.log(response);
          setClasses((prevUsers) => prevUsers.map((user) => (user._id === selectedId ? response.data : user)));
          setShowUpdate(false);
      }
      catch(err){
          console.log(err)
      }

    }
    const handleRestrict=async(id)=>{
        const res=await restrictClass(id);
        console.log("is class restricted",res.blocked);
    }
     
    useEffect(() => {
        const fetchBoards = async () => {
          try {
            const classData = await getClasses();
            setClasses(classData)
          } catch (error) {
            console.log('Error fetching class:', error.stack);
          }
        };
    
        fetchBoards();
      }, []);

    return (
        <Container>
            <Adminsidenav>
                <Row style={styles.userBody} className='rowHead'>
                    <Row style={styles.link}>
                        <a href='#000' style={styles.createLink} onClick={handleShow}>Create Class</a>
                        
                        {show && (<div style={adding}>
                            <div style={addOuter}>
                            
                                <div style={modalBorder}>
                                    <button style={closeButton} onClick={handleClose}>X</button>
                                     <div style={{ textAlign: 'center', marginBottom: '6px' ,fontSize:'24px',marginTop:'-1px'}}>
                                         Class
                                     </div>
                                    <div style={modalBorder}>
                                        <Form.Control type="text" placeholder="Class" style={inputField}  value={name}  onChange={handleChange} />
                                    </div>
                                    <div style={modalBorder}>
                                        <Button variant="primary" onClick={handleCreateClass} style={submitBtn}>
                                             Create
                                         </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}

                    </Row>
                   
                    {showUpdate && (<div style={adding}>
                            <div style={addOuter}>
                            
                                <div style={modalBorder}>
                                    <button style={closeButton} onClick={handleClose}>X</button>
                                     <div style={{ textAlign: 'center', marginBottom: '6px' ,fontSize:'24px',marginTop:'-1px'}}>
                                         Class
                                     </div>
                                    <div style={modalBorder}>
                                        <Form.Control type="text" placeholder="Class" style={inputField} value={updateName}  onChange={(e)=>{setUpdateName(e.target.value)}} />
                                    </div>
                                    <div style={modalBorder}>
                                        <Button variant="primary" onClick={handleUpdate} style={submitBtn}>
                                             Update Class
                                         </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}

                   
                    
                    <div  className='userTable'>
                       
                    {classes.length > 0 && (
                <div style={styles.table}>
                {classes.map((cl,index)=>(
                    <div  key={index} style={{ ...styles.rows, marginRight: '50px' }}>
                    <div style={styles.column}>
                      {/* <Form.Check
                        inline
                        label={index + 1}
                        name="group1"
                        type="checkbox"
                        id={`inline-checkbox-1`}
                      /> */}
                      <h6 className='admin'>{index+1}</h6>
                    </div>
                    
                    <div style={styles.col2}>
                      <h6  className='admin'>{cl.name}</h6>
                      <p style={{textAlign:'left'}}>CLASS</p>
                    </div>

                    <div style={styles.col3}>
                      <a style={{ ...styles.funcLink ,color: cl.blocked ? 'red' : 'grey', }}  onClick={() => handleRestrict(cl._id)}>
                        <BiBlock />
                        &nbsp;&nbsp;&nbsp;
                      </a>
                      <a  style={styles.funcLink} onClick={() => handleDelete(cl._id)}>
                        <AiFillDelete />
                      </a>
                      <a style={{ ...styles.funcLink, marginLeft: '15px' }}  onClick={()=>fetchUserForUpdate(cl._id,cl.blocked)}>
                                            <RxUpdate />
                        </a>
                    </div>
                    </div>
                ))}
              </div>
            )}
                    </div>

                </Row>

            </Adminsidenav>
        </Container>
    )
}

export default Createclass