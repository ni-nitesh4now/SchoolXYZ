import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import Usersidebar from "./Usersidebar";
import "./css/lessonplan.css";
import {
  createLesson,
  updateLesson,
  getClassData,
  getBook,
  getPublicationData,
  getBoardData,
  getBookName,
} from "../api/auth";
import { useFetcher, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Lessonplan = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookName = searchParams.get("bookName");
  const data = searchParams.get("data");
  const [selectedImage, setSelectedImage] = useState(null);
  const bookId = searchParams.get("bookId");
  const name = searchParams.get("name");
  const bk = searchParams.get("bk");
  const classID = searchParams.get("ClassID");
  const pubID = searchParams.get("PubID");
  const streamID = searchParams.get("StreamID");
  const boardID = searchParams.get("BoardID");
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [activeButton, setActiveButton] = useState("Informative");
  const [activeQButton, setActiveQButton] = useState(0);
  const [selectedQuestionType, setSelectedQuestionType] = useState(""); // State to track the selected question type
  const [selectedAnswerType, setSelectedAnswerType] = useState("");
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [savedAnswer, setSavedAnswer] = useState(null);
  const [application, setApplication] = useState("");
  const [title, setTitle] = useState("");
  const [objective, setObjective] = useState("");
  const [content, setContent] = useState("");
  const [releText, setReleText] = useState("");
  const [skillGain, setSkillGain] = useState("");
  const [events, setEvents] = useState("");
  const [problem, setProblem] = useState("");
  const [careerPath, setCareerPath] = useState("");
  const [txtQuestion, setTxtQuestion] = useState("");
  const [bookid, setBookid] = useState("");
  const [className, setClassName] = useState("");
  const [boardName, setBoardName] = useState("");
  const [streamName, setStreamName] = useState("");
  const [pubName, setPubName] = useState("");
  const [serviceIndex, setServiceIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [txtAnswer, setTxtAnswer] = useState("");
  const [option1Text, setOption1Text] = useState("");
  const [option2Text, setOption2Text] = useState("");
  const [option3Text, setOption3Text] = useState("");
  const [option4Text, setOption4Text] = useState("");
  const [informativeQuestionList, setInformativeQuestionList] = useState([]);
  const [conceptualQuestionList, setConceptualQuestionList] = useState([]);
  const [colearningQuestionList, setColearningQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const [isManualUpdate, setIsManualUpdate] = useState(false);
  const [label, setLabel] = useState("");
  const [serviceQList, setServiceQList] = useState([{ qservice: "" }]);
  const [isNewContent, setIsNewContent] = useState(false);
  const [isSaveClick, setIsSaveClick] = useState(false);
  const [days, setDays] = useState("");
  const [daysData, setDaysData] = useState([]);
  // const[contentTxt,setContentTxt]=useState('')
  const [lid, setLid] = useState("");
  const [editorInstance, setEditorInstance] = useState(null);
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const [trueOrFalse, setTrueOrFalse] = useState("");

  useEffect(() => {
    if (data) {
      const lessonData = JSON.parse(urlParams.get("data"));
      setLid(lessonData._id);
      console.log("dayssss", lessonData.days);
      setDaysData(lessonData.days);
      console.log("lesson days  ", daysData.length);

      //  if(daysData.length>=1 && activeButtonIndex==0){

      //       setTitle(daysData[0].day1.title)
      //       setApplication(daysData[0].day1.application)
      //       setCareerPath(daysData[0].day1.career_path)
      //       setObjective(daysData[0].day1.objective)
      //       setReleText(daysData[0].day1.relevance_to_subject)
      //       setSkillGain(daysData[0].day1.skill_gained)
      //       setEvents(daysData[0].day1.events_problem)
      //       setColearningQuestionList(daysData[0].day1.colearningQues)
      //       setConceptualQuestionList(daysData[0].day1.conceptualQues)
      //       setInformativeQuestionList(daysData[0].day1.informativeQues)
      //       console.log("title of day0 is",title)
      //       setContent(daysData[0].day1.content)
      //       if(daysData[0].day1.informativeQues.length>0){
      //         const newServiceList = daysData.map((day, index) => {
      //           return {'qservice':' '};
      //         });
      //         setServiceQList(newServiceList)
      //         console.log("intiall new",newServiceList)
      //       }

      //  }
    }
  }, [data]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
      [{ image: "true" }],
      [{ size: ["small", false, "large", "huge"] }], // Add size options for images
    ],
  };

  //   useEffect(()=>{
  //     const len=informativeQuestionList.length;
  //    // console.log("len is in    ",len);
  //     //console.log(len==0)
  //     setServiceQList([]);
  //     if (len === 0) {
  //         setServiceQList([{ 'qservice': '0000' }]);
  //     } else {
  //         const newServiceQList = [];
  //         for (let i = 0; i < len; i++) {
  //             newServiceQList.push({ 'qservice': i });
  //         }
  //         setServiceQList(newServiceQList);
  //     }
  //    // console.log("serbhbf",serviceQList)
  //   },[])

  useEffect(() => {
    handleServiceQAdd();
  }, [informativeQuestionList]);

  useEffect(() => {
    handleServiceQAdd();
  }, [conceptualQuestionList]);

  useEffect(() => {
    handleServiceQAdd();
  }, [conceptualQuestionList]);

  useEffect(() => {
    if (activeButton === "Conceptual") {
      const len = conceptualQuestionList.length;
      console.log("len is in    ", len);
      console.log(len == 0);
      if (len === 0) {
        setServiceQList([{ qservice: "0000" }]);
      } else {
        const newServiceQList = [];
        for (let i = 0; i < len; i++) {
          newServiceQList.push({ qservice: i });
        }
        setServiceQList(newServiceQList);
      }
      console.log("serbhbf", serviceQList);
      setActiveQButton(0);
    } else if (activeButton === "Colearning") {
      const len = colearningQuestionList.length;
      console.log("len is in    ", len);
      console.log(len == 0);

      if (len === 0) {
        setServiceQList([{ qservice: "0000" }]);
      } else {
        const newServiceQList = [];
        for (let i = 0; i < len; i++) {
          newServiceQList.push({ qservice: i });
        }
        setServiceQList(newServiceQList);
      }
      console.log("serbhbf", serviceQList);
      setActiveQButton(0);
    } else if (activeButton === "Informative") {
      const len = informativeQuestionList.length;
      // console.log("len is in    ",len);
      //console.log(len==0)
      setServiceQList([]);
      if (len === 0) {
        setServiceQList([{ qservice: "0000" }]);
      } else {
        const newServiceQList = [];
        for (let i = 0; i < len; i++) {
          newServiceQList.push({ qservice: i });
        }
        setServiceQList(newServiceQList);
      }
      setActiveQButton(0);
    }
  }, [activeButton]);

  const handleFilePicker = (callback, value, meta) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const dataURL = reader.result;
        callback(dataURL, { alt: file.name });
      };

      reader.readAsDataURL(file);
    };

    input.click();
  };

  // useEffect(() => {
  //   const autosaveInterval = setInterval(() => {
  //     if (!saving) {
  //       setIsManualUpdate(false)
  //       saveFormData();
  //       showToast();
  //       setIsSaveClick(true)
  //     }
  //   }, 1000);

  //   return () =>{
  //       clearInterval(autosaveInterval);
  //       toast.dismiss();

  //     };
  // }, [application,content,title,objective,events,problem,careerPath,releText,skillGain,serviceList]);

  const showToast = () => {
    toast.success("Autosaved!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(() => {
    if (bookId) {
      setBookid(bookId);
    }

    const fetchClass = async () => {
      const cl = await getClassData(classID);
      setClassName(cl.name);
    };

    const fetchStream = async () => {
      const cl = await getBook(streamID);
      setStreamName(cl);
    };

    const fetchPublication = async () => {
      const cl = await getPublicationData(pubID);

      setPubName(cl.name);
    };
    const fetchBoard = async () => {
      const cl = await getBoardData(boardID);
      setBoardName(cl.name);
    };

    if (classID && streamID && pubID) {
      fetchClass();
      fetchStream();
      fetchPublication();
    }
    if (boardID) {
      fetchBoard();
    }

    const fetchBookname = async () => {
      const bookdata = await getBookName(bk);
      console.log("bookdata", bookdata);
      const pub = await getPublicationData(bookdata.publication_id);
      setPubName(pub.name);
      const classss = await getClassData(bookdata.class_id);
      setClassName(classss.name);
      const strm = await getBook(bookdata.stream_id);
      setStreamName(strm);
    };

    if (bk) {
      fetchBookname();
    }
  }, []);

  useEffect(() => {
    console.log("hgff", daysData);
    if (daysData.length > 0) {
      const newServiceList = daysData.map((day, index) => {
        return { qservice: " " };
      });

      setServiceList(newServiceList);
    }
    if (daysData.length >= 1 && activeButtonIndex === 0) {
      const d = "day1";
      const allValue = daysData[0][d];
      console.log("alrady have values", allValue);
      setApplication(allValue.application);
      setTitle(allValue.title);
      setObjective(allValue.objective);
      setContent(allValue.content);
      setReleText(allValue.releText);
      setSkillGain(allValue.skillGain);
      setEvents(allValue.events_problem);
      setCareerPath(allValue.career_path);
      setTxtQuestion();
      setProblem(allValue.problem);
      setInformativeQuestionList(allValue.informativeQues);
      setConceptualQuestionList(allValue.conceptualQues);
      setColearningQuestionList(allValue.colearningQues);
      if (allValue.informativeQues.length > 0) {
        const newServiceList = allValue.informativeQues.map((day, index) => {
          return { qservice: " " };
        });
        setServiceQList(newServiceList);
        console.log("intiall new", newServiceList);
      }
    }

    // if (isSaveClick) {
    //   handleSaveLesson();
    //   setIsSaveClick(false);
    // }
  }, [daysData, isSaveClick]);

  useEffect(() => {
    console.log("info", informativeQuestionList);
    console.log("col", colearningQuestionList);
    console.log("con", conceptualQuestionList);
  }, [informativeQuestionList, conceptualQuestionList, colearningQuestionList]);

  const handleIsCorrectAnswerChange = (event) => {
    setIsCorrectAnswer(event.target.value);
    setOptionsDisabled(event.target.value != "NO");
  };

  const handleOptionChange = (event) => {
    setOptionsDisabled(true);
    if (isCorrectAnswer === "NO") {
      setSavedAnswer(event.target.value);
    }
  };

  // const handleQuestionTxt = (event) => {
  //   console.log("questio",event.target.value)
  //   setTxtQuestion(event.target.value);
  // };

  const handleAnwerType = (event) => {
    setSelectedAnswerType(event.target.value);
  };

  const handleQuestionTypeChange = (event) => {
    setSelectedQuestionType(event.target.value);
  };
  useEffect(() => {
    if (activeButtonIndex < daysData.length) {
      const d = "day" + (activeButtonIndex + 1);
      console.log(activeButtonIndex, ",", d);
      const allValue = daysData[activeButtonIndex][d];
      console.log("alrady have values", allValue.application);
      setApplication(allValue.application);
      setTitle(allValue.title);
      setObjective(allValue.objective);
      setContent(allValue.content);
      setReleText(allValue.releText);
      setSkillGain(allValue.skillGain);
      setEvents(allValue.events_problem);
      setCareerPath(allValue.career_path);
      setTxtQuestion();
      setProblem(allValue.problem);
      setInformativeQuestionList(allValue.informativeQues);
      // console.log("inside usefffect",searchParams.get('informativeQues'))
      setConceptualQuestionList(allValue.conceptualQues);
      setColearningQuestionList(allValue.colearningQues);
      if (allValue.informativeQues.length > 0) {
        const newServiceList = allValue.informativeQues.map((day, index) => {
          return { qservice: " " };
        });
        setServiceQList(newServiceList);
        // console.log("intiall new",newServiceList)
      }
    } else {
      setApplication("");
      setTitle("");
      setObjective("");
      setContent("");
      setReleText("");
      setSkillGain("");
      setEvents("");
      setCareerPath("");
      setTxtQuestion("");
      setProblem("");
      setInformativeQuestionList([]);
      setConceptualQuestionList([]);
      setColearningQuestionList([]);
      handleServiceAdd();
      setServiceQList([{ qserv: "0" }]);
    }
  }, [activeButtonIndex]);

  const handleButtonClick = (index) => {
    setActiveButtonIndex(index);
  };

  const handleQCLick = (index) => {
    setActiveQButton(index);
    let dataArray = [];
    console.log(activeButton);
    if (activeButton === "Informative") {
      dataArray = informativeQuestionList;
    } else if (activeButton === "Conceptual") {
      dataArray = conceptualQuestionList;
    } else if (activeButton === "Colearning") {
      dataArray = colearningQuestionList;
    }
    if (index >= dataArray.length) {
      setTxtQuestion("");
      setOption1Text("");
      setOption2Text("");
      setOption3Text("");
      setOption4Text("");
      setTxtAnswer("");
      setSelectedAnswerType("");
      setTrueOrFalse("");
      setSelectedQuestionType("");
    }
    if (index >= 0 && index < dataArray.length) {
      const item = dataArray[index];
      setSelectedQuestionType(item.aType);
      setTxtQuestion(item.ques);
      if (item.aType === "mcq") {
        const answerArray = item.options;
        console.log(answerArray.option1);
        setOption1Text(answerArray.option1);
        setOption2Text(answerArray.option2);
        setOption3Text(answerArray.option3);
        setOption4Text(answerArray.option4);
        setLabel(item.label);
      }
      if (item.aType === "text") {
        const answerArray = item.ans;
        console.log("--", answerArray);
        setTxtAnswer(item.ans);
        setSelectedAnswerType(item.selectedAns);
        setSelectedQuestionType(item.aType);
        setLabel(item.label);
      }
      if (item.aType === "truenfalse") {
        setTrueOrFalse(item.ans);
        setTxtQuestion(item.ques);
        setSelectedQuestionType(item.aType);
        setLabel(item.label);
      }
    }
  };

  const moveNextDay = (e) => {
    e.preventDefault();
    setActiveButton("Informative");

    console.log(activeButtonIndex);
    let c = "Days" + activeButtonIndex;
    const newDay = {
      title: title,
      objective: objective,
      content: content,
      application: application,
      relevance_to_subject: releText,
      events_problem: events,
      career_path: careerPath,
      skill_gained: skillGain,
      problem: problem,
      questions: selectedQuestionType === "text" ? txtQuestion : "",
      colearningQues: colearningQuestionList,
      informativeQues: informativeQuestionList,
      conceptualQues: conceptualQuestionList,

      // Replace with the actual appl value
    };
    if (activeButtonIndex < daysData.length) {
      //   console.log("already exist")
      const newObj = "day" + (activeButtonIndex + 1);
      setDaysData((prev) => {
        const updatedDaysData = prev.map((day) => {
          if (day.hasOwnProperty(newObj)) {
            return { [newObj]: newDay }; // Replace with the new data you want to set
          }
          return day;
        });

        return updatedDaysData;
      });
    } else {
      setDaysData((prev) => {
        const newObjectKey = "day" + (prev.length + 1);
        const newDayObject = { [newObjectKey]: newDay };
        return [...prev, newDayObject];
      });
    }
    console.log("daysdata", daysData);

    setActiveButtonIndex((prev) => prev + 1);
    handleQCLick(0);
  };

  const handleButtonActiveClick = (event) => {
    handleButtonClick(activeButtonIndex);
    //setActiveButton(buttonType);
    event.preventDefault();
    const buttonType = activeButton;
    if (buttonType === "Colearning") {
      //setServiceQList(colearningQuestionList)

      setActiveQButton(informativeQuestionList.length);

      setActiveButton("Informative");
      console.log(activeButtonIndex);
      let c = "Days" + activeButtonIndex;
      const newDay = {
        title: title,
        objective: objective,
        content: content,
        application: application,
        relevance_to_subject: releText,
        events_problem: events,
        career_path: careerPath,
        skill_gained: skillGain,
        problem: problem,
        questions: selectedQuestionType === "text" ? txtQuestion : "",
        colearningQues: colearningQuestionList,
        informativeQues: informativeQuestionList,
        conceptualQues: conceptualQuestionList,

        // Replace with the actual appl value
      };
      if (activeButtonIndex < daysData.length) {
        //   console.log("already exist")
        const newObj = "day" + (activeButtonIndex + 1);
        setDaysData((prev) => {
          const updatedDaysData = prev.map((day) => {
            if (day.hasOwnProperty(newObj)) {
              return { [newObj]: newDay }; // Replace with the new data you want to set
            }
            return day;
          });

          return updatedDaysData;
        });
      } else {
        setDaysData((prev) => {
          // Create a new object with a dynamic key based on the length of the array
          const newObjectKey = "day" + (prev.length + 1);

          // Create the new day object
          const newDayObject = { [newObjectKey]: newDay };

          // Merge the new day object with the previous array
          return [...prev, newDayObject];
        });
      }
      console.log("daysdata", daysData);
      setActiveButtonIndex((prev) => prev + 1);
      setApplication("");
      setTitle("");
      setObjective("");
      setContent("");
      setReleText("");
      setSkillGain("");
      setEvents("");
      setCareerPath("");
      setTxtQuestion("");
      setProblem("");
      setInformativeQuestionList("");
      // console.log("inside usefffect",searchParams.get('informativeQues'))
      setConceptualQuestionList("");
      setColearningQuestionList("  ");
    } else if (buttonType === "Conceptual") {
      //  setServiceQList(conceptualQuestionList)
      setActiveButton("Colearning");
      setActiveQButton(colearningQuestionList.length);
    } else if (buttonType === "Informative") {
      //   setServiceQList(informativeQuestionList)
      setActiveButton("Conceptual");
      setActiveQButton(conceptualQuestionList.length);
    }
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  const handleServiceQAdd = () => {
    setServiceQList([...serviceQList, { qservice: "" }]);
  };
  const checkIfAllFieldsAreCompleted = () => {
    console.log(
      title,
      objective,
      content,
      application,
      releText,
      careerPath,
      events,
      skillGain,
      problem
    );
    if (
      title === "" ||
      objective === "" ||
      content === "" ||
      application === "" ||
      releText === "" ||
      careerPath === "" ||
      events === "" ||
      skillGain === "" ||
      problem === ""
    ) {
      return false;
    }
    // if(selectedQuestionType==="text" ){
    //     return false;
    // }

    return true;
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      const isCompleted = checkIfAllFieldsAreCompleted();

      let newLessonData = {};
      if (!isCompleted) {
        if (
          searchParams.get("userName") &&
          searchParams.get("operation") === "admin"
        ) {
          const newD = {
            title: title ? title : "",
            objective: objective ? objective : "",
            content: content ? content : "",

            application: "",
            relevance_to_subject: "",
            skill_gained: "",
            events_problem: "",
            career_path: "",
            last_interaction_with: Cookies.get("umail")
              ? Cookies.get("umail")
              : "",
            user_id: searchParams.get("userName"),
            book_id: bookName ? bookName : "",
            questions: selectedQuestionType === "text" ? txtQuestion : "",
            informativeQues: informativeQuestionList,
            conceptualQues: conceptualQuestionList,
            colearningQues: colearningQuestionList,
          };
          newLessonData = {
            last_interaction_with: Cookies.get("umail")
              ? Cookies.get("umail")
              : "",
            user_id: searchParams.get("userName"),
            book_id: bookName ? bookName : "",
            questions: selectedQuestionType === "text" ? txtQuestion : "",
            days: newD,
            status: "assigned",
            bookName: "",
          };
        } else {
          newLessonData = {
            title: "",
            objective: "",
            content: "",
            application: "",
            relevance_to_subject: "",
            skill_gained: "",
            events_problem: "",
            career_path: "",
            last_interaction_with: Cookies.get("umail")
              ? Cookies.get("umail")
              : "",
            user_id: Cookies.get("id") ? Cookies.get("id") : "",
            book_id: streamID ? streamID : "",
            questions: selectedQuestionType === "text" ? txtQuestion : "",
            status: "assigned",
            bookName: bookName ? bookName : "",
            informativeQues: informativeQuestionList,
            conceptualQues: conceptualQuestionList,
            colearningQues: colearningQuestionList,
          };
        }
      } else {
        if (
          searchParams.get("userName") &&
          searchParams.get("operation") === "admin"
        ) {
          newLessonData = {
            title: title,
            objective: objective,
            content: content,
            application: application,
            relevance_to_subject: releText,
            skill_gained: skillGain,
            events_problem: events,
            career_path: careerPath,
            last_interaction_with: Cookies.get("umail")
              ? Cookies.get("umail")
              : "",
            user_id: searchParams.get("userName"),
            book_id: bookName,
            questions: selectedQuestionType === "text" ? txtQuestion : "",
            status: "resume",
            bookName: "",
            informativeQues: informativeQuestionList,
            conceptualQues: conceptualQuestionList,
            colearningQues: colearningQuestionList,
          };
        } else if (
          searchParams.get("userName") &&
          searchParams.get("operation") === "complete"
        ) {
          newLessonData = {
            title: title,
            objective: objective,
            content: content,
            application: application,
            relevance_to_subject: releText,
            skill_gained: skillGain,
            events_problem: events,
            career_path: careerPath,
            last_interaction_with: Cookies.get("umail")
              ? Cookies.get("umail")
              : "",
            user_id: searchParams.get("userName"),
            book_id: bookName,
            questions: selectedQuestionType === "text" ? txtQuestion : "",
            status: "resume",
            bookName: "",
            informativeQues: informativeQuestionList,
            conceptualQues: conceptualQuestionList,
            colearningQues: colearningQuestionList,
          };
        } else {
          newLessonData = {
            title: title,
            objective: objective,
            content: content,
            application: application,
            relevance_to_subject: releText,
            skill_gained: skillGain,
            events_problem: events,
            career_path: careerPath,
            last_interaction_with: Cookies.get("umail")
              ? Cookies.get("umail")
              : "",
            user_id: Cookies.get("id") ? Cookies.get("id") : "",
            book_id: streamID ? streamID : "",
            questions: selectedQuestionType === "text" ? txtQuestion : "",
            status: "resume",
            bookName: bookName ? bookName : "",
            informativeQues: informativeQuestionList,
            conceptualQues: conceptualQuestionList,
            colearningQues: colearningQuestionList,
          };
        }
        //await createLesson(newLessonData);
      }
      await createLesson(newLessonData);
      alert("lesson added");
      if (
        searchParams.get("operation") &&
        searchParams.get("operation") === "admin"
      ) {
        navigate("/createlessonplan");
      } else {
        navigate("/assignedplan");
      }
    } catch (error) {
      console.error("Error adding lesson:", error);
    }
  };

  const handleUpdate = async (manual = true, event) => {
    event.preventDefault();

    setIsManualUpdate(manual);
    console.log(manual);
    handleUpdateLesson(manual);
  };

  const handleUpdateLesson = async (isManual) => {
    setIsManualUpdate(isManual);

    let Lid = decodeURIComponent(searchParams.get("id"));
    if (Lid.endsWith("}")) {
      Lid = Lid.slice(0, -1);
    }
    console.log("hh", Lid);
    let c = "Days" + activeButtonIndex;

    const newDay = {
      title: title,
      objective: objective,
      content: content,
      application: application,
      relevance_to_subject: releText,
      events_problem: events,
      career_path: careerPath,
      skill_gained: skillGain,
      problem: problem,
      questions: selectedQuestionType === "text" ? txtQuestion : "",
      colearningQues: colearningQuestionList,
      informativeQues: informativeQuestionList,
      conceptualQues: conceptualQuestionList,

      // Replace with the actual appl value
    };

    if (
      daysData.length == 0 ||
      (activeButtonIndex == 0 && daysData.length == 1)
    ) {
      const newObjectKey = "day" + (activeButtonIndex + 1);

      // Create the new day object
      const newDayObject = { [newObjectKey]: newDay };
      setDaysData(newDayObject);
    } else if (activeButtonIndex < daysData.length) {
      //   console.log("already exist")
      const newObj = "day" + (activeButtonIndex + 1);
      setDaysData((prev) => {
        const updatedDaysData = prev.map((day) => {
          if (day.hasOwnProperty(newObj)) {
            return { [newObj]: newDay }; // Replace with the new data you want to set
          }
          return day;
        });

        return updatedDaysData;
      });
    } else {
      setDaysData((prev) => {
        // Create a new object with a dynamic key based on the length of the array
        const newObjectKey = "day" + (prev.length + 1);

        // Create the new day object
        const newDayObject = { [newObjectKey]: newDay };

        // Merge the new day object with the previous array
        return [...prev, newDayObject];
      });
    }
  };
  // setTimeout(() => {
  //   setIsSaveClick(false);
  // }, 2000);

  useEffect(() => {
    const func = async () => {
      let Lid = decodeURIComponent(searchParams.get("id"));
      if (Lid.endsWith("}")) {
        Lid = Lid.slice(0, -1);
      }
      console.log("hh", Lid);

      if (searchParams.get("operation") === "assign") {
        console.log("ismanual in ", isManualUpdate);
        const update = {
          status: isManualUpdate ? "resume" : "assigned",
          started: "Yes",
          completed: "No",
          days: daysData,
        };
        //  console.log("here assigned by assign",isManualUpdate)
        const res = await updateLesson(update, Lid);
        console.log("hello", res.data);
        if (isManualUpdate) {
          navigate("/resumework");
        } else {
          setActiveQButton(activeQButton - 1);
        }
      } else if (searchParams.get("operation") === "resume") {
        console.log("days inside check", daysData);
        const update = {
          status: isManualUpdate ? "completed" : "resume",
          started: "Yes",
          completed: isManualUpdate ? "Yes" : "No",
          days: daysData,
        };

        const res = await updateLesson(update, Lid);
        console.log("hellooooo", res.data);
        if (isManualUpdate) {
          navigate("/completed");
        } else {
          setActiveQButton(activeQButton - 1);
        }
      } else if (searchParams.get("operation") === "complete") {
        console.log("ismanual in ", isManualUpdate);
        const update = {
          status: "resume",
          days: daysData,
          started: "Yes",
          completed: "No",
        };

        const res = await updateLesson(update, Lid);
        console.log("hello", res.data);
        if (isManualUpdate) {
          navigate("/resumework");
        } else {
          setActiveQButton(activeQButton - 1);
        }
      }
    };

    func();
  }, [daysData]);

  const saveFormData = async () => {
    if (!isManualUpdate) {
      console.log("form update", daysData);
      try {
        setSaving(true);
        handleUpdateLesson(false);
        setSaving(false);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
  };

  useEffect(() => {
    if (
      activeButton === "Conceptual" &&
      activeQButton > serviceQList.length &&
      serviceQList.length < conceptualQuestionList.length
    ) {
      setServiceQList([...serviceQList, { qservice: "" }]);
    } else if (
      activeButton === "Informative" &&
      activeQButton > serviceQList.length - 1 &&
      serviceQList.length < informativeQuestionList.length
    ) {
      setServiceQList([...serviceQList, { qservice: "" }]);
    } else if (
      activeButton === "Colearning" &&
      activeQButton > serviceQList.length - 1 &&
      serviceQList.length < colearningQuestionList.length
    ) {
      setServiceQList([...serviceQList, { qservice: "" }]);
    }
  }, [activeQButton]);

  const handleNextQuestion = useCallback((e) => {
    e.preventDefault();
    if (selectedQuestionType === "text") {
      const q = txtQuestion;
      const a = txtAnswer;
      const data = {
        ques: q,
        ans: a,
        aType: selectedQuestionType,
        selectedAns: selectedAnswerType,
        label: label,
      };
      if (activeButton === "Informative") {
        console.log("check", activeQButton < informativeQuestionList.length);
        if (activeQButton < informativeQuestionList.length) {
          const updatedInformativeQuestionList = [...informativeQuestionList];
          updatedInformativeQuestionList[activeQButton] = data;
          setInformativeQuestionList(updatedInformativeQuestionList);
          setActiveQButton((prevValue) => prevValue + 1);
        } else {
          setInformativeQuestionList([...informativeQuestionList, data]);
          console.log("info", informativeQuestionList);
          setActiveQButton((prevValue) => prevValue + 1);
        }
      } else if (activeButton === "Conceptual") {
        if (activeQButton < conceptualQuestionList.length) {
          const updated = [...conceptualQuestionList];
          updated[activeQButton] = data;
          setConceptualQuestionList(updated);
          setActiveQButton((prevValue) => prevValue + 1);
        } else {
          setConceptualQuestionList([...conceptualQuestionList, data]);
          console.log("con", conceptualQuestionList);
          setActiveQButton((prevValue) => prevValue + 1);
        }
      } else if (activeButton === "Colearning") {
        if (activeQButton < colearningQuestionList.length) {
          const updated = [...colearningQuestionList];
          updated[activeQButton] = data;
          setColearningQuestionList(updated);
          setActiveQButton((prevValue) => prevValue + 1);
        } else {
          setColearningQuestionList([...colearningQuestionList, data]);
          console.log("col", colearningQuestionList);
          setActiveQButton((prevValue) => prevValue + 1);
        }
      }
      setTxtQuestion("");
      setTxtAnswer("");
      setLabel("");
    } else if (selectedQuestionType === "truenfalse") {
      const q = txtQuestion;
      const ans = trueOrFalse;
      const data = {
        ques: q,
        ans: ans,
        aType: selectedQuestionType,
        label: label,
      };

      if (activeButton === "Informative") {
        console.log("check", activeQButton < informativeQuestionList.length);
        if (activeQButton < informativeQuestionList.length) {
          const updatedInformativeQuestionList = [...informativeQuestionList];
          updatedInformativeQuestionList[activeQButton] = data;
          setInformativeQuestionList(updatedInformativeQuestionList);
          setActiveQButton((prevValue) => prevValue + 1);
        } else {
          setInformativeQuestionList([...informativeQuestionList, data]);
          console.log("info", informativeQuestionList);
          setActiveQButton((prevValue) => prevValue + 1);
        }
      } else if (activeButton === "Conceptual") {
        setConceptualQuestionList([...conceptualQuestionList, data]);
        console.log("con", conceptualQuestionList);
        setActiveQButton((prevValue) => prevValue + 1);
        //  handleServiceQAdd()
        //  handleQCLick(conceptualQuestionList.length)
      } else if (activeButton === "Colearning") {
        setColearningQuestionList([...colearningQuestionList, data]);
        console.log("col", colearningQuestionList);
        setActiveQButton((prevValue) => prevValue + 1);
        //  handleServiceQAdd()
        //  handleQCLick(colearningQuestionList.length)
      }
      setTxtQuestion("");
      setTrueOrFalse("");
      setTxtAnswer("");
      setLabel("");
      setSelectedQuestionType("");
    } else {
      const q = txtQuestion;
      const opt1 = option1Text;
      const opt2 = option2Text;
      const opt3 = option3Text;
      const opt4 = option4Text;
      const data = {
        ques: q,
        options: {
          option1: opt1,
          option2: opt2,
          option3: opt3,
          option4: opt4,
        },
        aType: selectedQuestionType,
        label: label,
      };

      if (activeButton === "Informative") {
        if (activeQButton < informativeQuestionList.length) {
          const updatedInformativeQuestionList = [...informativeQuestionList];
          updatedInformativeQuestionList[activeQButton] = data;
          setInformativeQuestionList(updatedInformativeQuestionList);
          setActiveQButton((prevValue) => prevValue + 1);
        } else {
          setInformativeQuestionList([...informativeQuestionList, data]);
          console.log("info", informativeQuestionList);
          setActiveQButton((prevValue) => prevValue + 1);
        }
      } else if (activeButton === "Conceptual") {
        if (activeQButton < informativeQuestionList.length) {
          const updatedInformativeQuestionList = [...conceptualQuestionList];
          updatedInformativeQuestionList[activeQButton] = data;
          setConceptualQuestionList(updatedInformativeQuestionList);
          setActiveQButton((prevValue) => prevValue + 1);
        } else {
          setConceptualQuestionList([...informativeQuestionList, data]);
          console.log("info", informativeQuestionList);
          setActiveQButton((prevValue) => prevValue + 1);
        }
        //  handleServiceQAdd()
        //  handleQCLick(conceptualQuestionList.length)
      } else if (activeButton === "Colearning") {
        if (activeQButton < colearningQuestionList.length) {
          const updated = [...colearningQuestionList];
          updated[activeQButton] = data;
          setColearningQuestionList(updated);
          setActiveQButton((prevValue) => prevValue + 1);
        } else {
          setColearningQuestionList([...colearningQuestionList, data]);
          console.log("col", colearningQuestionList);
          setActiveQButton((prevValue) => prevValue + 1);
        }
      }
      setTxtQuestion("");
      setOption1Text("");
      setOption2Text("");
      setOption3Text("");
      setOption4Text("");
      setTxtAnswer("");
      setLabel("");
    }
  });

  const handleTextAreaChange = (event, setter) => {
    const { value } = event.target;
    const lines = value.split("\n");

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === "•") {
        lines[i] = ""; // Remove bullet point if no text after it
      } else if (!lines[i].startsWith("• ")) {
        lines[i] = "• " + lines[i];
      }
    }

    setter(lines.join("\n"));
  };
  const handleLabel = (event) => {
    setLabel(event.target.value);
  };

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
    }
  };

  const handleSaveLesson = async () => {
    setIsSaveClick(true);

    let Lid = decodeURIComponent(searchParams.get("id"));
    if (Lid.endsWith("}")) {
      Lid = Lid.slice(0, -1);
    }
    console.log("hh", Lid);
    let c = "Days" + activeButtonIndex;
    const newDay = {
      title: title,
      objective: objective,
      content: content,
      application: application,

      relevance_to_subject: releText,
      events_problem: events,
      career_path: careerPath,
      skill_gained: skillGain,
      problem: problem,
      questions: selectedQuestionType === "text" ? txtQuestion : "",
      colearningQues: colearningQuestionList,
      informativeQues: informativeQuestionList,
      conceptualQues: conceptualQuestionList,

      // Replace with the actual appl value
    };
    if (activeButtonIndex < daysData.length) {
      //   console.log("already exist")
      const newObj = "day" + (activeButtonIndex + 1);
      setDaysData((prev) => {
        const updatedDaysData = prev.map((day) => {
          if (day.hasOwnProperty(newObj)) {
            return { [newObj]: newDay }; // Replace with the new data you want to set
          }
          return day;
        });

        return updatedDaysData;
      });
    } else {
      setDaysData((prev) => {
        // Create a new object with a dynamic key based on the length of the array
        const newObjectKey = "day" + (prev.length + 1);

        // Create the new day object
        const newDayObject = { [newObjectKey]: newDay };

        // Merge the new day object with the previous array
        return [...prev, newDayObject];
      });
    }

    console.log("inside save", daysData);
    if (searchParams.get("operation") === "assign") {
      console.log("ismanual in ", isManualUpdate);
      const update = {
        status: "assigned",
        started: "Yes",
        completed: "No",
        days: daysData,
      };
      //  console.log("here assigned by assign",isManualUpdate)
      const res = await updateLesson(update, Lid);
      console.log("hello", res.data);
    } else if (searchParams.get("operation") === "resume") {
      const update = {
        status: "resume",
        started: "Yes",
        completed: "No",
        days: daysData,
      };

      const res = await updateLesson(update, Lid);
      console.log("hello", res.data);
    } else if (searchParams.get("operation") === "complete") {
      const update = {
        status: "resume",
        started: "Yes",
        completed: "No",
        days: daysData,
      };

      const res = await updateLesson(update, Lid);
      console.log("hello", res.data);
    }
    setTimeout(() => {
      setIsSaveClick(false);
    }, 2000);
  };

  return (
    <Container>
      <div className="lesson-wrapper">
        <Usersidebar>
          <Form>
            <div className="lessonTable">
              <div className="lessonRow1">
                {boardID && <div className="r1c">{boardName}</div>}
                {(classID || bk) && <div className="r1c">{className}</div>}
                {(streamID || bk) && <div className="r1c">{streamName}</div>}
                {(pubID || bk) && <div className="r1c">{pubName}</div>}
                {boardID && <div className="r1c">{bookName}</div>}
                {name && <div className="r1c">{name}</div>}
              </div>
              <div className="lessonRow2">
                {serviceList.map((singleService, index) => (
                  <div key={index} className="services">
                    <div className="second-div">
                      <button
                        type="button"
                        className={`days ${
                          activeButtonIndex === index ? "active" : ""
                        }`}
                        onClick={() => handleButtonClick(index)}
                      >
                        <span>Day {index + 1}</span>
                      </button>
                    </div>
                    {serviceList.length - 1 == index && (
                      <div className="first-div">
                        {serviceList.length - 1 === index &&
                          serviceList.length < 300 && (
                            <button
                              type="button"
                              className="add-btn"
                              onClick={handleServiceAdd}
                            >
                              <span>+</span>
                            </button>
                          )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="box2">
                <div className="lessonRow3">
                  <div className="r3c">
                    <InputGroup className="mb-3">
                      <textarea
                        rows={1}
                        style={{ resize: "none" }}
                        placeholder="Add title"
                        className="txtDetail"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <div className="r3c">
                    <InputGroup className="mb-3">
                      <textarea
                        rows={1}
                        style={{ resize: "none" }}
                        placeholder="Objective"
                        className="txtDetail"
                        value={objective}
                        onChange={(event) =>
                          handleTextAreaChange(event, setObjective)
                        }
                      />
                    </InputGroup>
                  </div>
                </div>
                <div className="lessonRow4">
                  <ReactQuill
                    className="custom-textarea"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    placeholder="Content"
                  />

                  {/* <Button
                                className='content_btn' onClick={() => fileInputRef.current.click()}>+</Button> */}
                </div>
                <div className="lessonRow5">
                  <div className="r5c">
                    <InputGroup className="mb-5">
                      <textarea
                        rows={1}
                        style={{ resize: "none" }}
                        placeholder="Application"
                        value={application}
                        onChange={(event) =>
                          handleTextAreaChange(event, setApplication)
                        }
                      />
                    </InputGroup>
                  </div>
                  <div className="r5c">
                    <InputGroup className="mb-5">
                      <textarea
                        rows={1}
                        style={{ resize: "none" }}
                        placeholder="Relevance to text"
                        value={releText}
                        onChange={(event) =>
                          handleTextAreaChange(event, setReleText)
                        }
                      />
                    </InputGroup>
                  </div>
                  <div className="r5c">
                    <InputGroup className="mb-5">
                      <textarea
                        rows={1}
                        style={{ resize: "none" }}
                        placeholder="Skill gained"
                        value={skillGain}
                        onChange={(event) =>
                          handleTextAreaChange(event, setSkillGain)
                        }
                      />
                    </InputGroup>
                  </div>
                </div>
                <div className="lessonRow5">
                  <div className="r5c">
                    <InputGroup className="mb-5">
                      <textarea
                        rows={1}
                        style={{ resize: "none" }}
                        placeholder="Events"
                        value={events}
                        onChange={(event) =>
                          handleTextAreaChange(event, setEvents)
                        }
                      />
                    </InputGroup>
                  </div>
                  <div className="r5c">
                    <InputGroup className="mb-5">
                      <textarea
                        rows={1}
                        style={{ resize: "none" }}
                        placeholder="Problems"
                        value={problem}
                        onChange={(event) =>
                          handleTextAreaChange(event, setProblem)
                        }
                      />
                    </InputGroup>
                  </div>
                  <div className="r5c">
                    <InputGroup className="mb-5">
                      <textarea
                        rows={1}
                        style={{ resize: "none" }}
                        placeholder="Career path"
                        value={careerPath}
                        onChange={(event) =>
                          handleTextAreaChange(event, setCareerPath)
                        }
                      />
                    </InputGroup>
                  </div>
                </div>
              </div>
              <div className="box2">
                <div className="b2row1">
                  <div className="row1c">
                    <Button
                      variant={
                        activeButton === "Informative"
                          ? "primary"
                          : "outline-primary"
                      }
                      // onClick={() => handleButtonActiveClick('Informative')}

                      className="mb-2"
                    >
                      Informative
                    </Button>
                  </div>
                  <div className="row1c">
                    <Button
                      variant={
                        activeButton === "Conceptual"
                          ? "primary"
                          : "outline-primary"
                      }
                      //    onClick={() => handleButtonActiveClick('Conceptual')}
                      className="mb-2"
                    >
                      Conceptual
                    </Button>
                  </div>
                  <div className="row1c">
                    <Button
                      variant={
                        activeButton === "Colearning"
                          ? "primary"
                          : "outline-primary"
                      }
                      //    onClick={() => handleButtonActiveClick('Colearning')}

                      className="mb-2"
                    >
                      Colearning
                    </Button>
                  </div>
                </div>
                <div className="b2row2">
                  {serviceQList.map((singleService, index) => (
                    <div key={index} className="services">
                      <div className="second-div">
                        <button
                          type="button"
                          className={`days ${
                            activeQButton === index ? "active" : ""
                          }`}
                          onClick={() => handleQCLick(index)}
                        >
                          <span>Q {index + 1}</span>
                        </button>
                      </div>
                      {serviceQList.length - 1 == index && (
                        <div className="first-div">
                          {serviceQList.length - 1 === index &&
                            serviceQList.length < 15 && (
                              <button
                                type="button"
                                className="add-btn"
                                onClick={handleServiceQAdd}
                              >
                                <span>+</span>
                              </button>
                            )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="b2row3">
                  <div className="row3c">
                    <Form.Select
                      aria-label="Default select example"
                      id="option"
                      style={{ outline: "none" }}
                      className="form custom-dropdown"
                      onChange={handleQuestionTypeChange}
                    >
                      <option>Question type</option>
                      <option className="optins" value="text">
                        Rich Text
                      </option>
                      <option value="mcq">MCQ</option>
                      <option value="truenfalse">T/F</option>
                    </Form.Select>
                  </div>

                  {selectedQuestionType === "text" && (
                    <div className="row3c">
                      <Form.Select
                        aria-label="Default select example"
                        className="form custom-dropdown"
                        onChange={handleAnwerType}
                      >
                        <option>Answer type</option>

                        <option value="para">Paragraph</option>
                        <option value="fillup">Fill Ups</option>
                        <option value="onesentence">One Sentence</option>
                      </Form.Select>
                    </div>
                  )}
                  <div className="row3c">
                    <Form.Select
                      aria-label="Default select example"
                      style={{ outline: "none" }}
                      className="form custom-dropdown"
                      onChange={handleLabel}
                    >
                      <option>Label</option>
                      <option value="fun">Fun</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="tough">Tough</option>
                      <option value="expert">Expert</option>
                    </Form.Select>
                  </div>
                </div>
                {(selectedQuestionType === "text" ||
                  selectedQuestionType === "mcq") && (
                  <div className="b2row4">
                    <ReactQuill
                      value={txtQuestion}
                      onChange={setTxtQuestion}
                      placeholder="Write question"
                      className="writetxt"
                      modules={modules}
                    />
                  </div>
                )}

                {selectedQuestionType === "text" &&
                  selectedAnswerType === "para" && (
                    <div className="b2row5">
                      <textarea
                        className="textarea"
                        rows={3} /* Adjust the number of rows as needed */
                        value={txtAnswer}
                        onChange={(event) => setTxtAnswer(event.target.value)}
                        placeholder="Answer text type"
                      />
                    </div>
                  )}
                {selectedQuestionType === "text" &&
                  selectedAnswerType === "onesentence" && (
                    <div className="b2row5">
                      <textarea
                        className="textarea"
                        rows={1} /* Adjust the number of rows as needed */
                        value={txtAnswer}
                        onChange={(event) => setTxtAnswer(event.target.value)}
                        placeholder="Answer text type"
                      />
                    </div>
                  )}

                {selectedQuestionType === "truenfalse" && (
                  <div className="b2row5">
                    <textarea
                      className="textarea"
                      rows={1} /* Adjust the number of rows as needed */
                      value={txtQuestion}
                      onChange={(e) => setTxtQuestion(e.target.value)}
                      placeholder="Write question"
                    />
                    <div className="mb-3">
                      <div className="row6rightcol">
                        <input
                          type="radio"
                          name="group1"
                          id="inline-radio-true"
                          className="custom-radio-input"
                          value="true"
                          checked={trueOrFalse === "true"}
                          onChange={(e) => setTrueOrFalse(e.target.value)}
                        />
                        <label>True</label>
                        <br />
                        <input
                          type="radio"
                          name="group1"
                          id="inline-radio-false"
                          className="custom-radio-input"
                          value="false"
                          checked={trueOrFalse === "false"}
                          onChange={(e) => setTrueOrFalse(e.target.value)}
                        />
                        <label>False</label>
                      </div>
                    </div>
                  </div>
                )}

                {selectedQuestionType === "text" &&
                  selectedAnswerType == "fillup" && (
                    <div className="b2row4">
                      <Form.Control
                        type="text"
                        placeholder="Answer"
                        className="filluptxt"
                        value={txtAnswer}
                        onChange={(event) => setTxtAnswer(event.target.value)}
                      />
                    </div>
                  )}
                {selectedQuestionType == "mcq" && (
                  <div className="b2row6">
                    <div className="row6left">
                      <h5>Options : </h5>
                    </div>
                    <div className="row6right">
                      <div className="mb-3">
                        <div className="row6rightcol">
                          <input
                            type="radio"
                            name="group1"
                            id="inline-radio-1"
                            className="custom-radio-input"
                            value="option1"
                            onChange={handleOptionChange}
                            disabled={optionsDisabled}
                          />
                          {/* <label htmlFor="inline-radio-1" className="custom-radio-label">option 1</label> */}
                          <input
                            type="text"
                            className="custom-radio-label"
                            placeholder=" option1"
                            value={option1Text}
                            onChange={(e) => setOption1Text(e.target.value)}
                          ></input>
                        </div>
                        <div className="row6rightcol">
                          <input
                            type="radio"
                            name="group1"
                            id="inline-radio-2"
                            className="custom-radio-input"
                            value="option2"
                            onChange={handleOptionChange}
                            disabled={optionsDisabled}
                          />
                          <input
                            type="text"
                            className="custom-radio-label"
                            placeholder=" option2"
                            value={option2Text}
                            onChange={(e) => setOption2Text(e.target.value)}
                          ></input>
                        </div>
                        <div className="row6rightcol">
                          <input
                            type="radio"
                            name="group1"
                            id="inline-radio-3"
                            className="custom-radio-input"
                            value="option3"
                            onChange={handleOptionChange}
                            disabled={optionsDisabled}
                          />
                          <input
                            type="text"
                            className="custom-radio-label"
                            placeholder=" option3"
                            value={option3Text}
                            onChange={(e) => setOption3Text(e.target.value)}
                          ></input>
                        </div>
                        <div className="row6rightcol">
                          <input
                            type="radio"
                            name="group1"
                            id="inline-radio-4"
                            className="custom-radio-input"
                            value="option4"
                            onChange={handleOptionChange}
                            disabled={optionsDisabled}
                          />
                          <input
                            type="text"
                            className="custom-radio-label"
                            placeholder=" option4"
                            value={option4Text}
                            onChange={(e) => setOption4Text(e.target.value)}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {selectedQuestionType === "mcq" && (
                  <div className="b2row7">
                    <div className="row7left">
                      <h5>Answer Is Correct ?</h5>
                    </div>
                    <div className="row7right">
                      <div className="row7rightcol">
                        <input
                          type="radio"
                          name="group1"
                          id="inline-radio-4"
                          className="custom-radio-input"
                          value="YES"
                          onChange={handleIsCorrectAnswerChange}
                        />
                        <label
                          htmlFor="inline-radio-4"
                          className="custom-radio-label"
                        >
                          YES
                        </label>
                      </div>
                      <div className="row7rightcol">
                        <input
                          type="radio"
                          name="group1"
                          id="inline-radio-4"
                          className="custom-radio-input"
                          value="NO"
                          onChange={handleIsCorrectAnswerChange}
                        />
                        <label
                          htmlFor="inline-radio-4"
                          className="custom-radio-label"
                        >
                          NO
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                {selectedQuestionType == "mcq" && (
                  <div className="b2row8">
                    <div className="row8left">
                      <h5>Answer type blanks : </h5>
                    </div>
                    <div className="row8right">
                      <div className="row8rightcol">
                        <input
                          type="text"
                          name="group1"
                          id="inline-radio-4"
                          className="customInput"
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="b2row9">
                  <div className="row9c">
                    <button
                      className="next-button"
                      onClick={handleNextQuestion}
                    >
                      Next
                    </button>
                  </div>
                  <div className="row9c">
                    <button
                      className="finishbutton"
                      onClick={handleButtonActiveClick}
                    >
                      Finish
                    </button>
                  </div>
                </div>
              </div>
              {!data && (
                <div className="row10">
                  <button className="complete" onClick={handleAddLesson}>
                    Complete
                  </button>
                </div>
              )}

              {data && (
                <div className="row10">
                  <button
                    className="complete"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the default form submission
                      handleUpdateLesson(false);
                    }}
                    style={{ marginBottom: "-50px" }}
                  >
                    Save
                  </button>
                </div>
              )}

              {/* { data &&<div className='row10'> 
                    <button className='complete' onClick={moveNextDay} style={{marginBottom:'-50px'}}>Move to next Day</button>
                    </div>} */}

              {isSaveClick && <div className="saving-message">Saving...</div>}

              {data && (
                <div className="row10">
                  <button
                    className="complete"
                    onClick={(event) => handleUpdate(true, event)}
                    style={{
                      backgroundColor: "darkred",
                      border: "2px solid darkred",
                    }}
                  >
                    Complete
                  </button>
                </div>
              )}
            </div>
          </Form>
        </Usersidebar>
      </div>
    </Container>
  );
};

export default Lessonplan;
