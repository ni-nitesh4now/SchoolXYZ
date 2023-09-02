import React, { useState ,useEffect} from 'react'
import { Button, CloseButton, Container, Form, FormLabel, Modal, Row, Table } from 'react-bootstrap'
import Adminsidenav from './Adminsidenav'
import {
    BiBlock,
} from 'react-icons/bi'
import {
    AiFillDelete,
} from 'react-icons/ai'

import './css/createuser.css';
import { getBook ,getAllLessons,getUser,getLesson,getUsers, getBooks,deleteLesson,getBookNames,getBookName,createLesson} from '../api/auth';
import { useNavigate } from 'react-router-dom';





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
    table:{
        display:'flex',
        flexWrap:'wrap',
        paddingright:'2px',
        borderColapse:'separate',
        marginTop:'10px',
        marginLeft:'70px',
        
    },
    column:{
        marginLeft:'20px',
        marginTop:'4px'
    },
    col2:{
        marginLeft:'2vh',
        marginTop:'-3px',
        marginRight:'1vh',
        fontSize:'15px',
        textAlign:'center',
        marginBottom:'2px',
        width:'150px',
       
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
  marginTop:'4vh'
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
const eachColumn={
  padding:'1.5vh',
  width:'35vh',
 paddingLeft:'3vh',
 borderRadius:'10vh',
  color:'grey',
  fontSize:'15px',
  // fontWeight:'bold',
  marginLeft:'12vh',
  marginTop:'3vh',
  boxShadow: '0 0 5px #ccc',
    outline: 'none',
    border:'none'


}
const eachColumnFocus={
  outline:'none',
  border: '1px solid grey', /* Add a border to show focus */
  boxShadow:' 0 0 0 0px grey'

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

const Createlessonplan = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const[lesson,setLesson]=useState([]);
    const[bookList,setBookList]=useState([]);
    const[userName,setUserName]=useState('')
    const[bookName,setBookName]=useState('');
    const[bookDropDown,setBookDropDown]=useState('');
    const[userDropDown,setUserDropDown]=useState('')
    const [selectedBook, setSelectedBook] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleAdd=async()=>{
      const selectedBookId = document.getElementById('bookDropdown').value;
      const selectedUserId = document.getElementById('userDropdown').value;
     console.log(selectedBookId,selectedUserId);

     
     const newLessonData = {
     
      user_id:selectedUserId,
      book_id:selectedBookId,
  
      status: 'assigned', 
      bookName:'',
      days:[]
    }
    const res=await createLesson(newLessonData);
    console.log("created",res)
    setLesson((prev) => [...prev,res]);

   // navigate(`/lessonplan?bookName=${selectedBookId}&userName=${selectedUserId}&operation=admin`);
      handleClose();
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getAllLessons(); 
            console.log(response);
            setLesson(response.data);
            console.log("lesson is",lesson)
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };

        
        fetchData();
        
    
      }, []);

      useEffect(() => {
        const fetchDropdown=async()=>{
              const arr2copy=[]
              const coprUser=await getUsers();
              console.log("users ar",coprUser)
              for (const user of coprUser.data) {
                arr2copy.push(user);
              }
              setUserDropDown(arr2copy);
              const arrcopy=[]
              const copyBook=await getBookNames();
               for (const b of copyBook) {
                 arrcopy.push(b);
               }
              // console.log("--users",arrcopy);
             setBookDropDown(arrcopy);
        }

        const fetchBookNamesAndUserNames = async () => {
            try {
              const bookPromises = lesson.map((l) => getBookName(l.book_id));
              const userPromises = lesson.map((l) => getUser(l.user_id));

              const arr2=[]
              const arr2copy=[]
               const coprUser=await getUsers();
              // console.log("users ar",coprUser)
             // console.log("--users",coprUser.data);
              for (const user of coprUser.data) {
                arr2copy.push(user);
              }
              console.log(arr2copy)
              // setUserDropDown(arr2copy);
              const fetchedBookNames = await Promise.all(bookPromises);
              //console.log("boooks are",bookPromises)
              fetchedBookNames.forEach((user) => {
                const bookExists = arr2copy.some((existing) => existing === user);
                arr2.push(user.name);
              });
              setBookName(arr2)
              const arrcopy=[]
              const copyBook=await getBookNames();
               for (const b of copyBook) {
                 arrcopy.push(b);
               }
              // console.log("--users",arrcopy);
             setBookDropDown(arrcopy);

             // setBookDropDown(arr2copy)
             // console.log("book",bookName)

              const arr=[]
              
              const fetchedUserNames = await Promise.all(userPromises);
              fetchedUserNames.forEach((user) => {
                const userExists = arrcopy.some((existingUser) => existingUser === user);
               
               // console.log("user chec",userExists);
                arr.push(user);
              });
              setUserName(arr);
             
            } catch (error) {
              console.error('Error fetching book names and user names:', error);
            }
          };
        if (lesson.length > 0) {
          fetchBookNamesAndUserNames();
        }
        fetchDropdown();
      }, [lesson]);

   

      const handleViewClick = async(id) => {
        const lesson=await getLesson(id);
        //console.log(lesson.data.colearningQues)


        navigate(`/lessonplan?data=${encodeURIComponent(JSON.stringify(lesson.data))}&application=${encodeURIComponent(lesson.data.application)}
 &objective=${encodeURIComponent(lesson.data.objective)}&title=${encodeURIComponent(lesson.data.title)}
 &content=${encodeURIComponent(lesson.data.content)}&releText=${encodeURIComponent(lesson.data.relevance_to_subject)}
 &skill_gained=${encodeURIComponent(lesson.data.skill_gained)}&events=${encodeURIComponent(lesson.data.events_problem)}&career_path=${encodeURIComponent(lesson.data.career_path)}
 &question=${encodeURIComponent(lesson.data.questions)}&problem=${encodeURIComponent(lesson.data.problem)}
 &id=${encodeURIComponent(lesson.data._id)}}&informativeQues=${encodeURIComponent(lesson.data.informativeQues)}&conceptualQues=${encodeURIComponent(lesson.data.conceptualQues)}
 &colearningQues=${encodeURIComponent(lesson.data.colearningQues)}&operation=admin`);

  
        // navigate(`/lessonplan/${id}`);
      };

      const handleDeleteLessonPlan=async(id)=>{

          const res=await deleteLesson(id);
          setLesson((prev) => prev.filter((x) => x._id !== id));
          alert("lesson deleted");
      }



    return (
        <Container>
            <Adminsidenav>
                <Row style={styles.userBody}>
                    <Row style={styles.link}>
                        <a href='#000' style={styles.createLink} onClick={handleShow}>Create Lesson</a>
                        
                        {show&&(<div>
                             <div style={adding}>
                             <div style={addOuter}>
                                    <button onClick={handleClose} style={closeButton}> X</button>
                                     <div style={{ textAlign: 'center', marginBottom: '6px' ,fontSize:'24px',marginTop:'-1px'}}>
                                         Lesson Plan
                                     </div>
                                    <div>     
                                                 <select className='dropDownOptions' id='bookDropdown' style={eachColumn} onChange={(e)=>setSelectedBook(e.target.value)}>
                                                <option>Book</option>

                                                {bookDropDown&& bookDropDown.map((book, index) => (
                                                    
                                                    <option key={index} value={book._id}> {book.name} </option>
                                                ))}
                                                </select><br/> 

                                             <select className='dropDownOptions' id='userDropdown' style={eachColumn} onChange={(e)=>setSelectedUser(e.target.value)}>
                                                <option>User</option>
                                                {userDropDown&&userDropDown.map((user, index) => (
                                                
                                                    <option key={index} value={user._id}> {user.name} </option>
                                                ))}
                                            </select><br/> 
                                                
                                    </div>
                                    <div >
                                        <Button variant="primary"  onClick={handleAdd} style={submitBtn}>
                                             Add
                                         </Button>
                                    </div>
                                </div>
                             </div>

                        </div>

                        )}


                    </Row>

                    
                       {lesson.length>0 && (
                           <div style={styles.table}>
                             {lesson.map((l,index)=>(
                                <div className='userRow' key={index} style={{paddingTop:'2px',paddingBottom:'1px'}}>
                                <div className='userCol1' style={{marginLeft:'23px'}} >
                                     {/* <Form.Check
                                    inline
                                    label={index+1}
                                    name="group1"
                                     type="checkbox"
                                     id={`inline-checkbox-1`}/>  */}
                                     <h6  className='admin'>{index+1}</h6>
                                </div>
                               
                                <div style={styles.col2}>
                                    <h6  className='admin'>{bookName[index]}</h6>
                                    <p>Book Name</p>
                                </div>
                             
                                <div className='userCol3'style={{marginLeft:'-1px',marginRight:'2vh',padding:'0px 10px'}}>
                                    <h6  className='admin'>{userName[index]}</h6>
                                    <p>User Name</p>
                                </div>
                                <div className='userCol5'>
                                     <a style={{ textDecoration: 'none' }} onClick={()=>handleViewClick(l._id)}>View</a>
                                </div>
                                <a style={{ ...styles.funcLink ,marginRight: '20px',marginTop:'5px',marginLeft:'-10px' }} onClick={()=>handleDeleteLessonPlan(l._id)} >
                                            <AiFillDelete />
                                </a>

                                </div>
                             ))}
                           </div>
                       )}
                       
                </Row>

            </Adminsidenav>
        </Container>
    )
}

export default Createlessonplan