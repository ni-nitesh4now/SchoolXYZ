import axios from "axios";



const url="http://127.0.0.1:5000";



export const login = async (data) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/login', data);

    

    const responseData = response.data;

    if (responseData.message === 'admin') {
      console.log('Admin login successful');
     
      return 'admin';
    } else if (responseData.message === 'user') {
      console.log('User login successful');
      return 'user';
    } else {
      console.log('Invalid ');
    
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const addLesson = (lessonData) => {
    return axios.post(`${url}/lesson`, lessonData);
  };

  export const getUsers = () => {
    
    return axios.get(`${url}/user`);
  };
  export const deleteUser = async (user_id) => {
    try {
      const response = await axios.delete(`${url}/user/${user_id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  };

  export const deleteBook = async (bookId) => {
    try {
      const response = await axios.delete(`${url}/book/${bookId}`);
      // Handle any further actions after successful deletion if needed.
      console.log('Book deleted successfully:', response.data);
    } catch (error) {
      // Handle errors if the deletion fails.
      console.error('Error deleting book:', error);
    }
  };

  export const getBooks = async () => {
    try {
      const response = await axios.get(`${url}/book`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching classes:', error.message);
      throw error; 
    }
  };

  


  export const deleteBoard=(boardID)=>{
     return axios.delete(`${url}/board/${boardID}`)
  }

  export const createBoard = async (data) => {
    try {
      const response = await axios.post(`${url}/board`, data);
      console.log("board created");
      return response.data;
    } catch (error) {
      console.error('Error creating board:', error);
      throw new Error('Failed to create board');
    }
  };
  export const createUser = async (userData) => {
    try {
      const response = await axios.post(`${url}/user`, userData);
      console.log("user created");
      return response.data;
    } catch (error) {
      console.error('Error creating board:', error);
      throw new Error('Failed to create board');
    }

  };
  export const createBook = async (bookData) => {
    try {
      const response = await axios.post(`${url}/book`, bookData);
      return response.data;
    } catch (error) {
      console.error('Error creating book:', error);
      throw new Error('Failed to create book');
    }
  };
  export const updateUser=async(data,id)=>{
    try {
      // Make the PUT request to update the user
      const response = await axios.put(`${url}/user/${id}`, data);
      console.log('Updated user:', response);
      return response;
      // Do something with the updated user data if needed
    } catch (error) {
      if (error.response) {
        console.error('Error updating user:', error.response.data);
      } else {
        console.error('Error updating user:', error.message);
      }
    }
  }
  export const updateClass=async(data,id)=>{
    try {
      // Make the PUT request to update the user
      const response = await axios.put(`${url}/class/${id}`, data);
      console.log('Updated :', response);
      return response;
      // Do something with the updated user data if needed
    } catch (error) {
      if (error.response) {
        console.error('Error updating class:', error.response.data);
      } else {
        console.error('Error updating class:', error.message);
      }
    }

  }

  export const updateBoard=async(data,id)=>{
    try {
      // Make the PUT request to update the user
      const response = await axios.put(`${url}/board/${id}`, data);
      console.log('Updated :', response);
      return response;
      // Do something with the updated user data if needed
    } catch (error) {
      if (error.response) {
        console.error('Error updating :', error.response.data);
      } else {
        console.error('Error updating:', error.message);
      }
    }
  }


  export const updatePublications=async(data,id)=>{
    try {
      // Make the PUT request to update the user
      const response = await axios.put(`${url}/publication/${id}`, data);
      console.log('Updated :', response);
      return response;
      // Do something with the updated user data if needed
    } catch (error) {
      if (error.response) {
        console.error('Error updating ', error.response.data);
      } else {
        console.error('Error updating :', error.message);
      }
    }
  }

  export const updateLesson=async(data,id)=>{
    try {
      const response = await axios.put(`${url}/lesson/${id}`, data);
      console.log('Updated :', response);
      return response;
    } catch (error) {
      if (error.response) {
        console.error('Error updating :', error.response.data);
      } else {
        console.error('Error updating:', error.message);
      }
    }
  }

  export const updateBook=async(data,id)=>{
    try {
      const response = await axios.put(`${url}/book/${id}`, data);
      console.log('Updated :', response);
      return response;
    } catch (error) {
      if (error.response) {
        console.error('Error updating :', error.response.data);
      } else {
        console.error('Error updating:', error.message);
      }
    }
  }

  export const getBoards = async () => {
    try {
      const response = await axios.get(`${url}/board`);
      return response.data;
    } catch (error) {
      console.error('Error fetching boards:', error);
      throw new Error('Failed to fetch boards');
    }
  };
  
  export const getBoardData = async (Id) => {
    try {
      const response = await axios.get(`${url}/board/${Id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw new Error('Failed to fetch book');
    }
  };


  export const getDayContent = async (Id,day_index,day_number) => {
    try {
      const response = await axios.get(`${url}/lessons/content/${Id}/${day_index}/${day_number}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw new Error('Failed to fetch book');
    }
  };



  export const getPublications = async () => {
    try {
      const response = await axios.get(`${url}/publication`);
      return response.data;
    } catch (error) {
      console.error('Error fetching publications:', error);
      throw new Error('Failed to fetch publications');
    }
  
  };

  export const deletePublication=(publicationID)=>{
    return axios.delete(`${url}/publication/${publicationID}`);
 }
  export const createPublication = async (publicationData) => {
    try {
      
      const response = await axios.post(`${url}/publication`, publicationData);

      console.log('Publication created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating publication:', error);
    }
  };
  export const getLesson = (lessonId) => {
    return axios.get(`${url}/lesson/${lessonId}`);
  };
  
  export const getAllLessons = () => {
    return axios.get(`${url}/lesson`);
  };
  export const getSKills = (lessonid) => {
    return axios.get(`${url}/lesson/skill/${lessonid}`);
    
  };

  export const getSKillContent = (lessonid,title) => {
    return axios.get(`${url}/lesson/skill/content/${lessonid}/${title}`);
    
  };

  export const getCareer = (lessonid) => {
    return axios.get(`${url}/lesson/careerpath/${lessonid}`);
    
  };
  
  export const getInformativeQuestions = async (id, dayvalue) => {
    try {
      const response = await axios.get(`${url}/lesson/question/informative/${id}/${dayvalue}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getColearningQuestions = async (id, dayvalue) => {
    try {
      const response = await axios.get(`${url}/lesson/question/colearning/${id}/${dayvalue}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getConceptualQuestions = async (id, dayvalue) => {
    try {
      const response = await axios.get(`${url}/lesson/question/conceptual/${id}/${dayvalue}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getCareerContent = (lessonid,title) => {
    return axios.get(`${url}/lesson/careerpath/content/${lessonid}/${title}`);
    
  };

  
  export const getBook = async (bookId) => {
    try {
      const response = await axios.get(`${url}/book/${bookId}`);
      return response.data.name;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw new Error('Failed to fetch book');
    }
  };

  
  export const getBookData = async (bookId) => {
    try {
      const response = await axios.get(`${url}/book/${bookId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw new Error('Failed to fetch book');
    }
  };


  export const getUser=async(userId)=>{
    try{
      const response=await axios.get(`${url}/user/${userId}`);
      return response.data.name;
    }
    catch(error){
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }

  export const getUserData=async(userId)=>{
    try{
      const response=await axios.get(`${url}/user/${userId}`);
      return response.data;
    }
    catch(error){
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }
  export const getClassData=async(Id)=>{
    try{
      const response=await axios.get(`${url}/class/${Id}`);
      return response.data;
    }
    catch(error){
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }

  export const getClassDataByName=async(name)=>{
    try{
      const response=await axios.get(`${url}/class/names/${name}`);
      return response.data;
    }
    catch(error){
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }
  
  
  export const getPublicationData=async(Id)=>{
    try{
      const response=await axios.get(`${url}/publication/${Id}`);
      return response.data;
    }
    catch(error){
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }

  export const getUserByEmail =async (email) => {
    return axios.get(`${url}/user/email/${email}`)
      .then(
        response =>
           response.data
        ) 
      .catch(error => {
        console.error('Error:', error);
        return null; 
      });
  };


  export const getBoadByUserId = async (u_id) => {
    try {
      const response = await axios.get(`${url}/board/userid/${u_id}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  export const getBookByUserId = async (user_id) => {
    try {
      const response = await axios.get(`${url}/books/bookname/${user_id}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching book name:', error.message);
      throw new Error('Failed to fetch book name');
    }
  };

  
  export const getBookByName = async (name) => {
    try {
      const decode=decodeURIComponent(name)
      const response = await axios.get(`${url}/book/name/${decode}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  export const getPublicationByUserId = async (u_id) => {
    try {
      const response = await axios.get(`${url}/publication/userid/${u_id}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  export const getPublicationByName = async (name) => {
    try {
      const response = await axios.get(`${url}/publication/name/${name}`);
      console.log(response.data);
      return response.data; 
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  export const getIdBybookName=async(name)=>{
    try {
      const response = await axios.get(`${url}/books/findid/${name}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }

  export const getLessonByUserIdAndBookID=async(user_id,book_id)=>{
    try{
      const res=await axios.get(`${url}/lessons/findlesson/${user_id}/${book_id}`);
      console.log(res.data);
      return res;
    }
    catch(error){
      console.error('Error fetching lesson data:', error);
      return null;
    }

  }

  export const getLessonByUserIdAndBookIDAssign=async(user_id,book_id)=>{
    try{
      const res=await axios.get(`${url}/lessons/forassign/${user_id}/${book_id}`);
      console.log(res.data);
      return res;
    }
    catch(error){
      console.error('Error fetching lesson data:', error);
      return null;
    }
  }

  export const fetchLesson = async (id) => {
    try {
      const response = await axios.get(`${url}/lesson/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lesson:', error);
      throw error;
    }
  };

  export const getLessonByUserIdAndBookIDResume=async(user_id,book_id)=>{
    try{
      const res=await axios.get(`${url}/lessons/forresume/${user_id}/${book_id}`);
      console.log(res.data);
      return res;
    }
    catch(error){
      console.error('Error fetching lesson data:', error);
      return null;
    }
  }

  export const getLessonByUserIdAndBookIDCompletd=async(user_id,book_id)=>{
    try{
      const res=await axios.get(`${url}/lessons/forcomplete/${user_id}/${book_id}`);
      console.log(res.data);
      return res;
    }
    catch(error){
      console.error('Error fetching lesson data:', error);
      return null;
    }
  }
  
  export const getStream= async (bookId) => {
    try {
      const response = await axios.get(`${url}/book/${bookId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw new Error('Failed to fetch book');
    }
  };


  
  export const startLesson = ( userId) => {
    return axios.put(`${url}/lesson/${userId}/start`);
  };

  export const assigned=(id)=>{
    return axios.get(`${url}/books/bookname/${id}`)
  }



  export const getAssignLessonByUserId=(userId)=>{
    return axios.get(`${url}/lessons/assign/${userId}`)
  }

  export const getcompleteLessonByUserId=(userId)=>{
    return axios.get(`${url}/lessons/complete/${userId}`)
  }

  export const getResumeLessonByUserId=(userId)=>{
    return axios.get(`${url}/lessons/resume/${userId}`)
  }
 

  export const completedLesson=(userId)=>{
    return axios.get(`${url}/lessons/complete/${userId}`)
  }
  
  export const getUserID=(userName)=>{
        return axios.get(`${url}/user?user_id=${userName}`);
  }
  
 
  export const resumeLesson = (userId) => {
    return axios.get(`${url}/lessons/resume/${userId}`);
  };
  
  
  export const completeLesson = (lessonId, userId) => {
    return axios.put(`${url}/lesson/${lessonId}/complete?user_id=${userId}`);
  };
  
  
  export const getCompletedLessons = (userId) => {
    return axios.get(`${url}/user/${userId}/completed_lessons`);

  };
  
  export const getIncompleteAdmin=()=>{
    return axios.get(`${url}/lesson/incomplete`)
  }
  
  export const getCompletedAdmin=()=>{
    return axios.get(`${url}/lesson/completed`);
  }

  export const createClass = async (data) => {
    try {
      const response = await axios.post(`${url}/class`,data );
      console.log("class created");
      return response.data; 
    } catch (error) {
      console.error('Error creating class:', error);
      throw new Error('Failed to create class');// Rethrow the error to handle it further if needed
    }
  };

  export const getClasses = async () => {
    try {
      const response = await axios.get(`${url}/class`);
      console.log("inside class");
      return response.data; // The response data contains the classes
    } catch (error) {
      console.error('Error fetching classes:', error.message);
      throw error; // Rethrow the error to handle it further if needed
    }
  };


  export const deleteClass = async (class_id) => {
    try {
      const response = await axios.delete(`${url}/class/${class_id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting class:', error);
      throw new Error('Failed to delete class');
    }
  };

 

  export const createLesson =async (lessonData) => {

    try {
      const response = await axios.post(`${url}/lesson`, lessonData);
      console.log("lesson created");
      return response.data;
    } catch (error) {
      console.error('Error creating lesson:', error);
      throw new Error('Failed to create lesson');
    }
  };

  export const deleteLesson = async (id) => {
    try {
      const response = await axios.delete(`${url}/lesson/${id}`);
      console.log('Book deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  export const restrictUser=async(id)=>{
     const res=await axios.put(`${url}/block/user/${id}`);
     console.log(res);
     return res.data;
  }

  export const restrictBoard=async(id)=>{
    const res=await axios.put(`${url}/block/board/${id}`);
    console.log(res);
    return res.data;
 }

 
 export const restrictClass=async(id)=>{
  const res=await axios.put(`${url}/block/class/${id}`);
  console.log(res);
  return res.data;
}

export const restrictBook=async(id)=>{
  const res=await axios.put(`${url}/block/book/${id}`);
  console.log(res);
  return res.data;
}
export const restrictPublication=async(id)=>{
  const res=await axios.put(`${url}/block/publication/${id}`);
  console.log(res);
  return res.data;
}


export const getBookNames=async()=>{
  const res=await axios.get(`${url}/bookname`);
  return res.data;
}

export const getBookName=async(id)=>{
  const res=await axios.get(`${url}/bookname/${id}`);
  return res.data;
}

export const createBookName=async(data)=>{
  const res=await axios.post(`${url}/bookname`,data);
  return res.data
}

export const deleteBookName = async (id) => {
  try {
    const response = await axios.delete(`${url}/bookname/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};


export const updateBookName=async(data,id)=>{
  try {
    const response = await axios.put(`${url}/bookname/${id}`, data);
    console.log('Updated user:', response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error('Error updating :', error.response.data);
    } else {
      console.error('Error updating book:', error.message);
    }
  }
}



export const updateImage=async(data,id)=>{
  try {
    const response = await axios.put(`${url}/lesson/image/${id}`, data);
    console.log('Updated user:', response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error('Error updating :', error.response.data);
    } else {
      console.error('Error updating book:', error.message);
    }
  }
}

export const restrictBookname=async(id)=>{
  const res=await axios.put(`${url}/block/bookname/${id}`);
  console.log(res);
  return res.data;
}