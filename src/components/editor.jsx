
/*

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import uploadImage   from '../api/auth';
import { useEffect } from 'react';
import {getDayContent} from '../api/auth'



function Extra() {
  const [content, setContent] = useState('');
  useEffect(()=>{

    const fetc=async()=>{
      const res=await getDayContent("64d4b8437530a546a67954a7","0","day1")
    console.log(res.content)
       setContent(res.content)
    }


    fetc()
  },[])

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
   
    setContent(data);
  //  console.log(data);
  };


  

  
  useEffect(()=>{
    if (content) {
      const uploadContent = async () => {
        if (content) {
          const formData = new FormData();
          
          formData.append('text', content);
          formData.append('day_index', 0);
          formData.append('daynomber', 'day1');

          console.log("formdata",content)
          try {
            axios
            .put('http://127.0.0.1:5000/lesson/image/64d4b8437530a546a67954a7', formData)
            .then((response) => {
              const re="http://127.0.0.1:5000/get_image/"+response.data.url;
              console.log("return",re.data)
             
            })
            .catch((error) => {
              console.log(error)
            });
  
          } catch (error) {
            // Handle the error
          }
        }
      };
  
      // Call the function to upload content
      uploadContent();
    }
  },[content])

  class UploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then((file) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('text',content)
          formData.append('day_index',0)
          formData.append('daynomber','day1')
          console.log("form",content)
          
          axios
            .put('http://127.0.0.1:5000/lesson/image/64d4b8437530a546a67954a7', formData)
            .then((response) => {
              console.log("succesful uploaded image")
             
            })
            .catch((error) => {
           
            });
        });
      });
    }

    abort() {
      // No need to implement this for simple usage
    }
  }

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onReady={(editor) => {
          editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader);
          };
        }}  
        onChange={handleEditorChange}
        
        
      />
    </div>
  );
}

export default Extra;*/
// import React, { useState, useEffect } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import axios from 'axios';
// import { getDayContent } from '../api/auth';

// function Extra() {
//   const [content, setContent] = useState('');
//   const[isContentUpdate,setIsContentUpdate]=useState(true)

//   useEffect(() => {
//     const fetc = async () => {
//       const res = await getDayContent("64d4b8437530a546a67954a7", "0", "day1");
//       console.log(res.content);
//       setContent(res.content);
//     };


//     if(isContentUpdate)
//    { fetc();
//     setIsContentUpdate(false)
//   }
    
//   }, [isContentUpdate]);

//   const handleEditorChange = (content) => {
//     const formData = new FormData();
//     formData.append('text', content);
    
//     formData.append('daynomber', 'day1');

//     axios
//       .put('http://127.0.0.1:5000/lesson/image/64d4b8437530a546a67954a7', formData)
//       .then((response) => {
//         console.log("successful uploaded text",response);
//         setIsContentUpdate(true)
//         //success("http://127.0.0.1:5000/get_image/" + response.data.url);
//       })
//       .catch((error) => {
//         console.error(error);
//       });

      
    
//   };




//   const handleEditorUpload = (blobInfo, success, failure) => {
//     const formData = new FormData();
//     formData.append('file', blobInfo.blob());
//     formData.append('text', content);
//     formData.append('day_index', 0);
//     formData.append('daynomber', 'day1');

//     axios
//       .put('http://127.0.0.1:5000/lesson/image/64d4b8437530a546a67954a7', formData)
//       .then((response) => {
//         console.log("successful uploaded image",response);
//         setIsContentUpdate(true)
//         //success("http://127.0.0.1:5000/get_image/" + response.data.url);
//       })
//       .catch((error) => {
//         console.error(error);
//         failure("Failed to upload image");
//       });
//   };

//   return (
//     <div>
//       <Editor
//         initialValue={content}
//         init={{
//           height: 500,
//           plugins: 'image advimage', // Include the advimage plugin
//           toolbar: 'undo redo | bold italic | image | advimage', // Add the advimage button to the toolbar
//           images_upload_handler: handleEditorUpload,
//         }}
//         onEditorChange={handleEditorChange}
//       />
//     </div>
//   );
// }

// export default Extra;