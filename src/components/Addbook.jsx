import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Row} from 'react-bootstrap'
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

import './css/addbook.css'
import { getClasses ,getBookNames,getBooks,getPublications,createBookName,getClassData,getPublicationData
    ,getStream,deleteBookName,updateBookName,getBookName,getPublicationByName,getBookByName,getClassDataByName,restrictBookname} from '../api/auth'
import { useAsyncError } from 'react-router-dom'


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
    tableData: {

    },
    table: {

    },
    funcLink: {
        textDecoration: 'none',
        color: 'gray',
    },
};

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

const Addbook = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[allClasses,setAllClasses]=useState([])
    const[allStreams,setAllStreams]=useState([])
    const[allPublications,setAllPublications]=useState([])
    const[books,setBooks]=useState('');
    const [selectedClass, setSelectedClass] = useState('Class');
    const [selectedStream, setSelectedStream] = useState('Stream');
    const [classNames, setClassNames] = useState([]);
    const [publisherName, setPublisherName] = useState([]);
    const [streamName, setStreamName] = useState([]);
    const[name,setName]=useState('');
    const[updateName,setUpdateName]=useState('')
    const[updateStreamId,setUpdateStreamId]=useState('');
    const[updatePublisherId,setUpdatePublisherId]=useState('')
    const[updateClassId,setUpdateClassId]=useState('')
    const[selectedPublisher,setSelectedPublisher]=useState('publisher')
    const[showUpdate,setShowUpdate]=useState(false)
    const[updateId,setUpdateId]=useState('');
    



  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };


    const allClass=async()=>{
        const response=await getClasses();
        console.log(response);
        setAllClasses(response);
    }
    const allStream=async()=>{
        const res=await getBooks();
        console.log("streams",res);
        setAllStreams(res)
    }
    const allPublisher=async()=>{
        const res=await getPublications();
        console.log("streams",res);
        setAllPublications(res)
    }
    const addBookName=async()=>{
       
        console.log(selectedClass,selectedPublisher,selectedStream);
        // name=encodeURIComponent(name.trim());
        // console.log("--after removing space",name)
        const data={
            "name":name,
            "stream_id":selectedStream,
            "class_id": selectedClass,
            "publication_id": selectedPublisher,
        }
        const res=await createBookName(data);
        // console.log("bookname created",res)
        setBooks((prev) => [ res,...prev]);
        setSelectedClass('Class')
        setSelectedPublisher('publisher')
        setSelectedStream('stream');
        setName('')
         handleClose();
    }
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await getBookNames(); 
            //   console.log(response);
              setBooks(response);
            } catch (error) {
              console.error('Error fetching users:', error);
              setBooks([]);
            }
          };
          fetchData();
          allClass();
          allStream();
          allPublisher();

        }, []);

    const getClassName=async(id)=>{
        const res=await getClassData(id);
        // console.log(res.name);
        return res.name;
    }
    const getPublicationName=async(id)=>{
        const res=await getPublicationData(id);
        // console.log(res.name);
        return res.name;
    }
    const getStreamNames=async(id)=>{
        const res=await getStream(id);
        // console.log(res.name);
        return res.name;
    }

    const handleUpdate=async()=>{
        // console.log("inside upate",updateName,updateClassId,updatePublisherId,updateStreamId);
        let pub=await getPublicationByName(updatePublisherId)
        
        let str=await getBookByName(updateStreamId)
        // console.log("pub is ",str[0]._id)
        let cla=await getClassDataByName(updateClassId);
        // console.log("inside upate",updateName,pub[0]._id,str[0]._id,cla._id);
        
        const Data={
            "name":updateName,
            "stream_id":str[0]._id,
            "class_id":cla._id,
            "publication_id":pub[0]._id

        }
        console.log("id is",updateId)
       const res=await updateBookName(Data,updateId);
       console.log(res)
       if(res)
      { setBooks((prevUsers) => prevUsers.map((user) => (user._id === updateId ? res.data : user)));}
        setUpdateId('')
        setUpdateName('')
        setUpdateClassId('')
        setUpdatePublisherId('')
        setUpdateStreamId('');
        setShowUpdate(false)


    }
    const fetchUpdateData=async(id,isBlocked)=>{
        try{
            if(!isBlocked){
                const data = await getBookName(id);
                const cName = await getClassName(data.class_id);
                const pName = await getPublicationName(data.publication_id);
                const sName = await getStreamNames(data.stream_id);
              
                setUpdateId(id);
                setUpdateName(data.name);
                setUpdateClassId(cName);
                setUpdatePublisherId(pName);
                setUpdateStreamId(sName);
                setShowUpdate(true);
            }
            else{
                alert("cann't update as user is blocked");
                return
            }

        }
        catch(err){
            console.log("error fetching user for update",err)
        }
       
       

    }

    useEffect(() => {
        
        const fetchClassNames = async () => {
          const classNames = await Promise.all(books.map((book) => getClassName(book.class_id)));
          console.log(classNames)
          setClassNames(classNames)
        };

        const fetchPublisherNames = async () => {
            const publisherNames = await Promise.all(books.map((book) => getPublicationName(book.publication_id)));
            // console.log(publisherNames)
            setPublisherName(publisherNames)
        };

        const fetchStreamNames = async () => {
            const streamNames = await Promise.all(books.map((book) => getStreamNames(book.stream_id)));
            // console.log(streamNames)
            setStreamName(streamNames)
        };
      
    
        if (books.length > 0) {
          fetchClassNames();
          fetchPublisherNames()
          fetchStreamNames();
        }
      }, [books]);


      const handleDeleteBook = async (bookId) => {
        try {
          await deleteBookName(bookId);
          setBooks((prevBook) => prevBook.filter((x) => x._id !== bookId));
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };
      const handleRestrict=async(id)=>{
        console.log("inside restrict",id);
        const rres=await restrictBookname(id);
        console.log("here fronted restrict",rres);
      }

    return (
        <Container>
            <Adminsidenav>
                <Row style={styles.userBody}>
                    <Row style={styles.link}>
                        <a href='#000' style={styles.createLink} onClick={handleShow}>Add book</a>
                        
                        {show&&(<div>
                             <div className='adding'>
                             <div className='addOuter'>
                                    <button onClick={handleClose} style={closeButton}>x</button>
                                     <div style={{ textAlign: 'center', marginBottom: '10px' ,fontSize:'24px',marginTop:'-1px',color:'grey',fontWeight:'bold'}}>
                                         Books
                                     </div>
                                    <div>
                                            <input type="text" placeholder="Name" className='inputField' value={name} onChange={(e)=>setName(e.target.value)}/><br />
                                            <select className='dropDownOptions' value={selectedClass} onChange={handleClassChange}>
                                            <option value='Class'>Class</option>
                                            {allClasses.map((cls) => (
                                                    <option key={cls._id} value={cls._id}>
                                                         {cls.name}
                                                        </option>))}
                                            </select>
<br />

                                    <select className='dropDownOptions' value={selectedStream} onChange={(e)=>setSelectedStream(e.target.value)}>
                                     <option value='Stream'>Stream</option>
                                     {allStreams.map((stream,index) => (
                                            <option key={index} value={stream._id}>
                                                     {stream.name}
                                            </option>
                                            ))}
                                        </select><br />
                                        <select className='dropDownOptions' value={selectedPublisher} onChange={(e)=>setSelectedPublisher(e.target.value)}>
                                     <option value='Publisher'>Publisher</option>
                                     {allPublications.map((p,index) => (
                                            <option key={index} value={p._id}>
                                                     {p.name}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div >
                                        <Button variant="primary"  onClick={addBookName} className='submitBtn'>
                                             Add
                                         </Button>
                                    </div>
                                </div>
                             </div>

                        </div>

                        )}

                        {showUpdate&&(<div>
                             <div className='adding'>
                             <div className='addOuter'>
                                    <button onClick={()=>setShowUpdate(false)} style={closeButton}>x</button>
                                     <div style={{ textAlign: 'center', marginBottom: '10px' ,fontSize:'24px',marginTop:'-1px',color:'grey',fontWeight:'bold'}}>
                                         Books
                                     </div>
                                    <div>
                                            <input type="text" placeholder="Name" className='inputField' value={updateName} onChange={(e)=>setUpdateName(e.target.value)}/><br />
                                            <select className='dropDownOptions' value={updateClassId} onChange={(e) => setUpdateClassId(e.target.value)}>
                                            
                                                     {allClasses.map((cls) => (
                                                     <option key={cls._id} value={cls.name}>
                                                    {cls.name}
                                            </option>))}
                                            </select>
<br />

                                            <select className='dropDownOptions' value={updateStreamId} onChange={(e) => setUpdateStreamId(e.target.value)}>
                                             
                                             {allStreams.map((stream) => (
                                               <option key={stream._id} value={stream.name}>
                                                 {stream.name}
                                                 </option> ))}
                                            </select><br />
                                            <select className='dropDownOptions' value={updatePublisherId} onChange={(e) => setUpdatePublisherId(e.target.value)}>
                                          
                                                {allPublications.map((p) => (
                                                 <option key={p._id} value={p.name}>
                                                        {p.name}
                                                </option>
                                                 ))}
                                             </select>
                                    </div>
                                    <div >
                                        <Button variant="primary"  onClick={handleUpdate} className='submitBtn'>
                                             Update
                                         </Button>
                                    </div>
                                </div>
                             </div>

                        </div>

                        )}
                    </Row>
                    

                    <div>

                       {books&&books.length>0 &&( <div className='userTable'>
                          {books.map((b,index)=>(
                            <div className='userRow' key={index}>
                            <div className='userCol1' style={{marginLeft:'20px'}}><h6  className='admin'>{index+1}</h6></div>
                            <div className='userCol2' style={{marginLeft:"20px"}}>
                            <h6  className='admin'>{b.name}</h6>
                            <p>Book Name</p>
                            </div>
                            <div className='userCol3' style={{marginLeft:"-30px"}}>
                                <h6  className='admin'>{classNames[index]}</h6>
                                <p>Class</p>
                          </div> 
                          <div className='userCol3' style={{marginLeft:"20px"}}>
                                <h6  className='admin'>{streamName[index]}</h6>
                                <p>Book Stream</p>
                          </div>
                          <div className='userCol3' style={{marginLeft:"20px"}}>
                                <h6  className='admin'>{publisherName[index]}</h6>
                                <p>Publisher</p>
                          </div>
                         
                          <div className='userCol4' style={styles.col3}>
                                        <a  style={{ ...styles.funcLink ,color: b.blocked ? 'red' : 'grey' }}   onClick={()=>handleRestrict(b._id)}>
                                            <BiBlock />&nbsp;&nbsp;&nbsp;
                                         </a>
                                        <a style={styles.funcLink} onClick={()=>handleDeleteBook(b._id)}>
                                            <AiFillDelete />
                                        </a>
                                        <a style={{ ...styles.funcLink, marginLeft: '15px' }}  onClick={()=>fetchUpdateData(b._id,b.blocked)}>
                                            <RxUpdate />
                                 </a>
                                    </div>
                            </div>
                       ))}

                       </div>)}
                       
                       
                    </div>
                </Row>

            </Adminsidenav>
        </Container>
    )
}

export default Addbook