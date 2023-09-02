import React, { useState,useEffect } from 'react'
import { Button, Container, Form, FormLabel, Modal, Row, Table } from 'react-bootstrap'
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
import { getBoards } from '../api/auth';
import { deleteBoard ,createBoard,updateBoard,getBoardData,restrictBoard} from '../api/auth'



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
    
    funcLink: {
        textDecoration: 'none',
        color: 'gray',
    },
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

const Createboard = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState('');
    const [boards, setBoards] = useState([]);
    const [createdBoard, setCreatedBoard] = useState(null);
    const[updateName,setUpdateName]=useState('');
    const[showUpdate,setShowUpdate]=useState(false)
    const[selectedId,setSelectedId]=useState('')
    const[blockedStatus,setBlockedStatus]=useState('');


  useEffect(() => {
    const fetchBoards = async () => {
      try {

        const boardsData = await getBoards();

        setBoards(boardsData);
      } catch (error) {
        console.error('Error fetching boards:', error.message);
      }
    };

    fetchBoards();
  }, []);
  const fetchUserForUpdate = async (Id,isBlocked) => {
    try {
        if(!isBlocked)
      {const response = await getBoardData(Id);
      setSelectedId(Id);
      setUpdateName(response.name);
      setShowUpdate(true);}
      else{
        alert("cann't update as board is blocked");
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
        const response=await updateBoard(updatedData,selectedId);
        console.log(response);
        setBoards((prevUsers) => prevUsers.map((user) => (user._id === selectedId ? response.data : user)));
        setShowUpdate(false);
    }
    catch(err){
        console.log(err)
    }

  }



  const handleDeleteBoard = async (Id) => {
    try {

      await deleteBoard(Id);
      setBoards((prevBook) => prevBook.filter((x) => x._id !== Id));
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };


  const handleCreateBoard = async () => {
    try {
        const exists = await checkNameExist(name);
        
     if(exists){
        alert('board already exist');
        setName('')
        handleClose();
     }
     else{
        const userData = {
            name,
          };
          setName('')
          handleClose();
          const createdBoard = await createBoard(userData);
           console.log("created from fronted board");
           
           setBoards((prevBoards) => [createdBoard,...prevBoards]);
           
     }
      
      
    } catch (error) {
      console.error('Error creating board:', error.message);
    }
  };

  const checkNameExist=async(name)=>{
    return new Promise((resolve, reject) => {
        // Assuming "users" is an array of user objects
        const Exists = boards.some((b) => b.name.toLowerCase() == name.toLowerCase());
        console.log("userExist",Exists)
        resolve(Exists);
    });
}

const handleRestrict=async(id)=>{
    const res=await restrictBoard(id);
    console.log("board is ",res.blocked);
}


    return (
        <Container>
            <Adminsidenav>
                <Row style={styles.userBody}>
                    <Row style={styles.link}>
                        <a href='#000' style={styles.createLink} onClick={handleShow}>Create Board</a>
                        
                        {show && (<div style={adding}>
                            <div style={addOuter}>
                            
                                <div style={modalBorder}>
                                    <button style={closeButton} onClick={handleClose}> X</button>
                                     <div style={{ textAlign: 'center', marginBottom: '10px' ,fontSize:'24px',marginTop:'-1px'}}>
                                         Board
                                     </div>
                                    <div style={modalBorder}>
                                        <Form.Control type="text" placeholder="Board Name" style={inputField} value={name} onChange={(e) => setName(e.target.value)}/>
                                    </div>
                                    
                                    <div style={modalBorder}>
                                        <Button variant="primary"  onClick={handleCreateBoard} style={submitBtn}>
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
                                    <button style={closeButton} onClick={()=>setShowUpdate(false)}> X</button>
                                     <div style={{ textAlign: 'center', marginBottom: '10px' ,fontSize:'24px',marginTop:'-1px'}}>
                                         Board
                                     </div>
                                    <div style={modalBorder}>
                                        <Form.Control type="text" placeholder="Board Name" style={inputField} value={updateName} onChange={(e) => setUpdateName(e.target.value)}/>
                                    </div>
                                    
                                    <div style={modalBorder}>
                                        <Button variant="primary"  onClick={handleUpdate} style={submitBtn}>
                                             Update
                                         </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    <div className='userTable'>
                      
                      {boards.length>0 &&(
                        
                        <div>
                               {boards.map((b,index) => (
                                <div className='userRow' style={styles.rows } key={index}>
                               
                                {/* <div className='userCol1'><Form.Check inline label={index+1} name="group1"type="checkbox" id={`inline-checkbox-1`}/></div> */}
                                <div className='userCol1' style={{marginLeft:'23px'}}> <h6  className='admin'>{index+1}</h6></div>
                               <div className='userCol2'>
                                   <h6  className='admin'>{b.name}</h6>
                                   <p>Board Name</p>
                               </div>
                               <div className='userCol3' style={{width:'30vh',marginLeft:'-6vh'}}>
                                   <h6  className='admin'>{b._id}</h6>
                                   <p>Board Id</p>
                               </div>
                               <div className='userCol4'><a  style={{ ...styles.funcLink ,color: b.blocked ? 'red' : 'grey', }} onClick={()=>handleRestrict(b._id)}>
                                   <BiBlock />&nbsp;&nbsp;&nbsp;
                                    </a>
                               <a style={styles.funcLink} onClick={() => handleDeleteBoard(b._id)}>
                                   <AiFillDelete />
                               </a>
                               <a style={{ ...styles.funcLink, marginLeft: '15px' }}  onClick={()=>fetchUserForUpdate(b._id,b.blocked)}>
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

export default Createboard