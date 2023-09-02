import React from 'react'
import Usersidebar from './Usersidebar'
import { Container, Form, FormLabel, Table } from 'react-bootstrap'
import {resumeLesson,getUserID,assigned,getResumeLessonByUserId,getIdBybookName,getLessonByUserIdAndBookID,getBookByName,getLessonByUserIdAndBookIDResume,getBookName} from '../api/auth';
import { useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const styles={
  table: {
    display:'flex',
    flexWrap:'wrap',
    paddingright:'2px',
    borderColapse:'separate',
    marginTop:'10vh',
    marginLeft:'15px',
    paddingBottom:'2px'
},
rows:{
   
    marginLeft:'90px',
    display:'flex',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
    borderRadius:'26px',
    marginTop:'4vh'
},
column:{
    marginLeft:'20px',
    marginTop:'5px'
},
col2:{
  marginLeft:'-4vh',
  marginTop:'-3px',
  marginRight:'7vh',
  fontSize:'15px',
  textAlign:'center',
 
  marginBottom:'2px',
  width:'250px'
},
col3:{
    marginRight:'3vh',
    marginTop:'4px',
    color:'blue',
    textDecoration:'none'
},
}
const Resumework = () => {
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [count,setCount]=useState(1);
  const[bid,setBid]=useState('');

 const handleResume=async(name)=>{
    // console.log(name)
     const res=await getBookByName(name);
     

  const lesson=await getLessonByUserIdAndBookIDResume(Cookies.get('id'),res[0]._id)
  console.log(lesson.data);
//  console.log(lesson.data.questions)
 navigate(`/lessonplan?data=${encodeURIComponent(JSON.stringify(lesson.data))}&application=${encodeURIComponent(lesson.data.application)}
 &objective=${encodeURIComponent(lesson.data.objective)}&title=${encodeURIComponent(lesson.data.title)}
&releText=${encodeURIComponent(lesson.data.relevance_to_subject)}
 &skill_gained=${encodeURIComponent(lesson.data.skill_gained)}&events=${encodeURIComponent(lesson.data.events_problem)}&career_path=${encodeURIComponent(lesson.data.career_path)}
 &question=${encodeURIComponent(lesson.data.questions)}&problem=${encodeURIComponent(lesson.data.problem)}
 &id=${encodeURIComponent(lesson.data._id)}&name=${encodeURIComponent(name)}&operation=resume&bk=${encodeURIComponent(lesson.data.book_id)}&days=${encodeURIComponent(lesson.data.days)}`);

  

 }
 
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        if(Cookies.get('id'))
        {
          const getlessons=await getResumeLessonByUserId(Cookies.get('id'));
          console.log(getlessons)
          const bookIds = getlessons.data.map((lesson) => lesson.book_id);
          console.log(bookIds)
          let c=0;
          const allResponses = await Promise.all(bookIds.map(async (bookId) => {
            const ans = await getBookName(bookId);
            const names = ans.name
            console.log(ans)
           return names;
          }));
         // const data = await assigned(Cookies.get('id'));
         const flattenedResponses = allResponses.flat();
        setLessons(flattenedResponses);
      }
      } catch (error) {
        console.error('Error fetching lessons:', error.message);
      }
    };
    fetchLesson();
    
  }, []);

  useEffect(() => {
    console.log("lessons updated complete :", lessons);
  }, [lessons,bid]);

  const checkHover = (event) => {
    if (event.type === 'mouseenter') {
      event.target.style.backgroundColor = '#8546e3';
    } else if (event.type === 'mouseleave') {
      event.target.style.backgroundColor = 'transparent';
    }
  };

  return (
    <Container>
      <Usersidebar>
      <div style={styles.table}>
                  {lessons.length>=1 &&(lessons.map((lesson,index) => (
                              <div className='rows' style={styles.rows }>
                             <div className='col' style={styles.column}>
                            <Form.Check
                                    inline
                                    label={index+1}
                                    name="group1"
                                     type="checkbox"
                                     id={`inline-checkbox-1`}
                            />
                            </div>

                            <div className='col' style={styles.col2}>
                                <h6 className="admin" style={{fontSize:'15px',marginBottom:'-2px',marginTop:'6px',fontStyle:'bold'}}>{lesson}</h6>
                                <p style={{fontSize:'10px'}}>Book name</p>

                                </div>
                                <div className='col3' style={styles.col3}>
                                <a  id="resumeButton" style={{textDecoration:'none'}} onClick={()=>handleResume(lesson)}>Resume</a>
                            </div>
                       
                  </div>
                        )))}

        </div>
      </Usersidebar>
    </Container>

  )
}

export default Resumework