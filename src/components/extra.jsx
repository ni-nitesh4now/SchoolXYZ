import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import Usersidebar from "./Usersidebar";
import "./css/extra.css";
import {
  createLesson,
  updateLesson,
  getClassData,
  getBook,
  getPublicationData,
  getBoardData,
  getBookName,
  getSKills,
  getCareer,
  getSKillContent,
  getCareerContent,
  getConceptualQuestion,
} from "../api/auth";
import { useFetcher, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faImage, faL, faLink } from "@fortawesome/free-solid-svg-icons";

const Extra = () => {
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
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [selectedAnswerType, setSelectedAnswerType] = useState([]);
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [savedAnswer, setSavedAnswer] = useState(null);
  const [application, setApplication] = useState([]);
  const [title, setTitle] = useState("");
  const [objective, setObjective] = useState("");
  const [content, setContent] = useState("");
  const [releText, setReleText] = useState([]);
  const [skillGain, setSkillGain] = useState([]);
  const [events, setEvents] = useState([]);
  const [problem, setProblem] = useState([]);
  const [careerPath, setCareerPath] = useState([]);
  const [txtQuestion, setTxtQuestion] = useState("");
  const [bookid, setBookid] = useState("");
  const [className, setClassName] = useState("");
  const [boardName, setBoardName] = useState("");
  const [streamName, setStreamName] = useState("");
  const [pubName, setPubName] = useState("");
  const [serviceIndex, setServiceIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [txtAnswer, setTxtAnswer] = useState("");
  const [txtQuestionImg, setTxtQuestionImg] = useState("");
  const [option1Text, setOption1Text] = useState("");
  const [option2Text, setOption2Text] = useState("");
  const [option3Text, setOption3Text] = useState("");
  const [option4Text, setOption4Text] = useState("");
  const [option1Image, setOption1Image] = useState("");
  const [op1im, setOp1im] = useState("");
  const [op2im, setOp2im] = useState("");
  const [option2Image, setOption2Image] = useState("");
  const [informativeQuestionList, setInformativeQuestionList] = useState([]);
  const [conceptualQuestionList, setConceptualQuestionList] = useState([]);
  const [colearningQuestionList, setColearningQuestionList] = useState([]);
  const [selectedQuestionList, setSelectedQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const [isManualUpdate, setIsManualUpdate] = useState(false);
  const [label, setLabel] = useState("");
  const [marks, setMarks] = useState("");
  const [serviceQList, setServiceQList] = useState([{ qservice: "" }]);
  const [isNewContent, setIsNewContent] = useState(false);
  const [isSaveClick, setIsSaveClick] = useState(false);
  const [days, setDays] = useState("");
  const [daysData, setDaysData] = useState([]);
  const [lid, setLid] = useState("");
  const [editorInstance, setEditorInstance] = useState(null);
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const [trueOrFalse, setTrueOrFalse] = useState("");

  const [selectedApp, setSelectedApp] = useState(false);
  const [applicationTitle, setApplicationTitle] = useState("");
  const [applicationContent, setApplicationContent] = useState("");
  const [applicationImage, setApplicationImage] = useState(null);
  const [releTitle, setReleTitle] = useState("");
  const [releContent, setReleContent] = useState("");
  const [isreleUpdate, setIsReleUpdate] = useState(true);
  const [currentlyEditingIndexRele, setCurrentlyEditingIndexRele] =
    useState(-1);
  const [skillTitle, setSkillTitle] = useState("");
  const [skillContent, setSkillContent] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [skillSet, setSkillSet] = useState([]);
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [callSkillApi, setCallSkillApi] = useState(false);

  const [careerSet, setCareerSet] = useState(["medical", "technical"]);
  const [suggestedCareer, setSuggestedCareer] = useState([]);
  const [careerStep, setCareerStep] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [callCareerApi, setCallCareerApi] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [applicationLinkUrl, setApplicationLinkUrl] = useState("");
  const [editorAppLink, setEditorAppLink] = useState("");

  const [eventTitle, setEventTitle] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [eventLinkUrl, setEventLinkUrl] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [currentlyEditingIndexEvent, setCurrentlyEditingIndexEvent] =
    useState(-1);
  const [iseventUpdate, setIsEventUpdate] = useState(true);

  const [editorEventLink, setEditorEventLink] = useState("");
  const [problemAbout, setProblemAbout] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [problemContent, setProblemContent] = useState("");
  const [problemImage, setProblemImage] = useState("");
  const [selectedProblem, setSelectedProblem] = useState(null);

  const [careerDescription, setCareerDescription] = useState("");
  const [careerInputStep1, setCareerInputStep1] = useState("");
  const [careerInputStep2, setCareerInputStep2] = useState("");
  const [careerInputYear1, setCareerInputYear1] = useState("");
  const [careerInputYear2, setCareerInputYear2] = useState("");
  const [careerTitle, setCareerTitle] = useState("");
  const [careerImage, setCareerImage] = useState(null);
  const [careerSteps, setCareerSteps] = useState([]);
  const [careerStepsData, setCareerStepsData] = useState([]);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);

  const [isapplicationUpdate, setIsApplicationUpdate] = useState(true);
  const [currentlyEditingIndex, setCurrentlyEditingIndex] = useState(-1);
  const [showApp, setShowApp] = useState(false);
  const [imageUploadedApp, setImageUploadedApp] = useState(false);
  const [imageUploadedEvent, setImageUploadedEvent] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showRele, setShowRele] = useState(false);
  const [showCareer, setShowCareer] = useState(false);
  const [showProblem, setShowProblem] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [mcqQues, setMcqQues] = useState("");
  const [txtQuestionImage, setTxtQuestionImage] = useState("");
  const [uploadedImageFilename, setUploadedImageFilename] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (data) {
      const lessonData = JSON.parse(urlParams.get("data"));
      setLid(lessonData._id);
      console.log(lessonData._id);
      console.log("dayssss", lessonData.days);
      setDaysData(lessonData.days);
      console.log("lesson days  ", daysData.length);
    }
  }, [data]);
  useEffect(() => {
    console.log("lisgdg", lid);
  }, [lid]);

  useEffect(() => {
    if (activeButton === "Conceptual" && activeQButton >= serviceQList.length) {
      setServiceQList([...serviceQList, { qservice: "" }]);
    } else if (
      activeButton === "Informative" &&
      activeQButton >= serviceQList.length
    ) {
      setServiceQList([...serviceQList, { qservice: "" }]);
    } else if (
      activeButton === "Colearning" &&
      activeQButton >= serviceQList.length
    ) {
      setServiceQList([...serviceQList, { qservice: "" }]);
    }
  }, [activeQButton]);

  useEffect(() => {
    if (activeButtonIndex >= serviceList.length) {
      setServiceList([...serviceQList, { qservice: "" }]);
    }
  });

  useEffect(() => {
    console.log("careerstep", careerStep);
  }, [careerStep]);
  useEffect(() => {
    console.log("application is ", application);
    console.log("events", events);
    console.log("problems", problem);
    console.log("rele is ", releText);
    console.log("career ", careerPath);
    console.log("skills", skillGain);
  }, [application, events, problem, releText, careerPath, skillGain]);

  useEffect(() => {
    console.log("hgff", daysData.day1);
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
      setReleText(allValue.relevance_to_subject);
      setSkillGain(allValue.skill_gained);
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
  }, [daysData, isSaveClick]);
  useEffect(() => {
    const fetchhh = async () => {
      console.log("lid", lid);
      const res = await getSKills(lid);
      console.log("-get skiils snbhbh", res.data);
      setSkillSet(res.data);
    };
    const fetchCareer = async () => {
      console.log("lid", lid);
      const res = await getCareer(lid);
      console.log("-get careersnbhbh", res.data);
      setCareerSet(res.data);
    };

    if (lid) {
      fetchhh();
      fetchCareer();
    }
  }, [lid]);

  useEffect(() => {
    const fetchhh = async () => {
      try {
        console.log("lid", lid);
        const res = await getSKills(lid);
        console.log("-get skills", res.data);
        setSkillSet(res.data);
      } catch (error) {
        console.log("erro fetching skill set ");
      }
    };

    if ((skillGain && lid) || callSkillApi) {
      fetchhh();
      setCallSkillApi(false);
    }
  }, [skillGain, callSkillApi]);

  useEffect(() => {
    //     // setSkillSet([])
    const fetchhh = async () => {
      try {
        // console.log("lid", lid);
        const res = await getCareer(lid);
        console.log("-get career", res.data);
        setCareerSet(res.data);
      } catch (error) {
        console.log("erro fetching skill set ");
      }
    };

    if ((careerPath && lid) || callCareerApi) {
      fetchhh();
      setCallCareerApi(false);
    }
  }, [careerPath, callCareerApi]);

  useEffect(() => {
    if (activeButton === "Informative") {
      setSelectedQuestionList(informativeQuestionList);
    } else if (activeButton === "Conceptual") {
      setSelectedQuestionList(conceptualQuestionList);
    } else if (activeButton === "Colearning") {
      setSelectedQuestionList(colearningQuestionList);
    }
  }, [
    activeButton,
    informativeQuestionList,
    colearningQuestionList,
    conceptualQuestionList,
    activeButtonIndex,
  ]);

  const handleCareerPath = async (e) => {
    e.preventDefault();
    if (!careerImage) {
      toast.error("Please add an image");
      return;
    } else {
      toast.success("Item added successfully");
    }
    const formData = new FormData();

    formData.append("image", careerImage);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload_career", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        const filename = responseData.filename;
        const app = {
          title: careerTitle,
          description: careerDescription,
          careerStep: careerSteps,
          image: filename,
        };

        setCareerPath([...careerPath, app]);
        console.log(app);
        setCareerTitle("");
        setCareerDescription("");
        setCareerImage("");
        setCareerSteps([]);
        setCareerInputYear1("");
        setCareerInputStep1("");
        setSelectedCareer(null);
        setSuggestedCareer([]);
      } else {
        console.error("Failed to upload application.");
      }
    } catch (error) {
      console.error("Error uploading application:", error);
    }
  };

  const handleButtonClick = (index) => {
    setActiveButtonIndex(index);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
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
  // }, [application,content,title,objective,events,problem,careerPath,releText,skillGain]);
  const showToast = () => {
    toast.success("Autosaved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

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

  const modules2 = {
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
      [{ size: ["small", false, "large", "huge"] }], 
    ],
  };

  const handleInsertLink = () => {
    const linkTag = `<a href="${applicationLinkUrl}" target="_blank">${applicationLinkUrl}</a>`;
    setEditorAppLink(linkTag);
    setShowLinkInput(false);
  };
  const handleLinkInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInsertLink();
    }
  };

  const handleInsertEventLink = () => {
    const linkTag = `<a href="${eventLinkUrl}" target="_blank">${eventLinkUrl}</a>`;
    setEditorEventLink(linkTag);
    setShowLinkInput(false);
  };
  const handleLinkKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInsertEventLink();
    }
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    if (applicationImage) {
      const formData = new FormData();
      formData.append("image", applicationImage);
      console.log("Application image ase hori :", formData);

      try {
        const response = await fetch(
          "http://127.0.0.1:5000/upload_application",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          const filename = responseData.filename;
          console.log("application response:", response);
          console.log("Application filename:::", filename);
          setUploadedImageFilename(filename);
          const app = {
            title: applicationTitle,
            content: applicationContent,
            image: filename,
            url: applicationLinkUrl,
          };

          setApplication([...application, app]);
          setApplicationTitle("");
          setApplicationContent("");
          setApplicationImage("");
          setApplicationLinkUrl("");
          setImageUploadedApp(false);
        } else {
          console.error("Failed to upload application.");
        }
      } catch (error) {
        console.error("Error uploading application:", error);
      }
    } else {
      const app = {
        title: applicationTitle,
        content: applicationContent,
        url: applicationLinkUrl,
      };
      setApplication([...application, app]);
      setApplicationTitle("");
      setApplicationContent("");
      setApplicationLinkUrl("");
    }
  };

  const handleEditApplication = (i, index) => {
    const clickedItem = application[index];
    const im = "http://127.0.0.1:5000/static/" + clickedItem.image;
    if (clickedItem.image) setApplicationImage(im);
    else setApplicationImage("");

    setSelectedApp(true);
    setApplicationTitle(clickedItem.title);
    setApplicationContent(clickedItem.content);

    setApplicationLinkUrl(clickedItem.url);
    setIsApplicationUpdate(false);
    setCurrentlyEditingIndex(index);
    setImageUploadedApp(true);
  };
  const handleUpdateApplication = (e) => {
    const imageFilename = applicationImage.split("/").pop();
    e.preventDefault();

    const updatedApp = {
      title: applicationTitle,
      content: applicationContent,
      image: imageFilename,
      url: applicationLinkUrl,
    };

    const updatedApplication = [...application];
    updatedApplication[currentlyEditingIndex] = updatedApp;

    setApplication(updatedApplication);
    setApplicationTitle("");
    setApplicationContent("");
    setApplicationImage(null);
    setApplicationLinkUrl("");
    setIsApplicationUpdate(true);
    setImageUploadedApp(false);
    setSelectedApp(false);
  };

  const handleRelevance = (e) => {
    e.preventDefault();
    const data = {
      title: releTitle,
      content: releContent,
    };
    setReleText([...releText, data]);
    setReleContent("");
    setReleTitle("");
  };
  const handleEditRelevance = (index) => {
    const clickedItem = releText[index];
    setReleTitle(clickedItem.title);
    setReleContent(clickedItem.content);
    setIsReleUpdate(false);
    setCurrentlyEditingIndexRele(index);
  };

  const handleUpdateRele = (e) => {
    e.preventDefault();
    const updatedApp = {
      title: releTitle,
      content: releContent,
    };

    const updatedApplication = [...releText];
    updatedApplication[currentlyEditingIndexRele] = updatedApp;

    setReleText(updatedApplication);
    setReleTitle("");
    setReleContent("");
    setIsReleUpdate(true);
  };

  const handleEvents = async (e) => {
    e.preventDefault();
    if (eventImage) {
      const formData = new FormData();
      formData.append("image", eventImage);

      try {
        const response = await fetch("http://127.0.0.1:5000/upload_event", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          const filename = responseData.filename;
          const eventData = {
            title: eventTitle,
            content: eventContent,
            image: filename,
            url: eventLinkUrl,
            date: eventDate,
          };

          setEvents([...events, eventData]);
          setEventContent("");
          setEventTitle("");
          setEventLinkUrl("");
          setEventImage("");
          setEventDate("");

          setImageUploadedEvent(false);
        } else {
          console.error("Failed to upload application.");
        }
      } catch (error) {
        console.error("Error uploading application:", error);
      }
    } else {
      const eventData = {
        title: eventTitle,
        content: eventContent,
        date: eventDate,
        url: eventLinkUrl,
      };

      setEvents([...events, eventData]);
      setEventContent("");
      setEventTitle("");
      setEventLinkUrl("");
      setEventDate("");
      setImageUploadedEvent(false);
    }
  };

  const handleEditEvents = (index) => {
    const clickedItem = events[index];
    const img = "http://127.0.0.1:5000/static/" + clickedItem.image;
    if (clickedItem.image) setEventImage(img);
    else setEventImage("");
    setImageUploadedEvent(true);
    setSelectedEvent(true);
    setEventTitle(clickedItem.title);
    setEventContent(clickedItem.content);
    setEventDate(clickedItem.date);

    setEventLinkUrl(clickedItem.url);
    setSelectedDate(clickedItem.date);
    setIsEventUpdate(false);
    setCurrentlyEditingIndexEvent(index);
    console.log(img);

    // console.log("index is:", currentlyEditingIndex);
  };
  const handleUpdateEvents = (e) => {
    const imageFilename = eventImage.split("/").pop();
    e.preventDefault();
    const updatedApp = {
      title: eventTitle,
      content: eventContent,
      image: imageFilename,
      url: eventLinkUrl,
      date: eventDate,
    };

    const updatedApplication = [...events];
    updatedApplication[currentlyEditingIndexEvent] = updatedApp;

    setEvents(updatedApplication);
    setEventTitle("");
    setEventContent("");
    setEventImage(null);
    setEventLinkUrl("");
    setIsEventUpdate(true);
    setEventDate("");
    setImageUploadedEvent(false);
    setSelectedEvent(false);
  };

  const handleProblem = async (e) => {
    e.preventDefault();
    console.log(selectedProblem);
    if (selectedProblem) {
      console.log("Seletec dprnjnd");
      const updated = problem.map((item) =>
        item === selectedProblem
          ? {
              ...item,
              about: problemAbout,
              content: problemContent,
              description: problemDescription,
              ...(problemImage ? { image: problemImage } : {}),
            }
          : item
      );
      // Update the application list with the modified item
      setProblem(updated);
      setSelectedProblem(null); // Clear the selected item
    } else {
      if (problemImage) {
        const formData = new FormData();

        formData.append("image", problemImage);

        try {
          const response = await fetch("http://127.0.0.1:5000/upload_problem", {
            method: "POST",
            body: formData,
          });
          if (response.ok) {
            const responseData = await response.json();
            const filename = responseData.filename;
            const data = {
              about: problemAbout,
              content: problemContent,
              description: problemDescription,
              image: filename,
            };
            setProblem([...problem, data]);
            setProblemAbout("");
            setProblemContent("");
            setProblemDescription("");
            setProblemImage("");
          } else {
            console.error("Failed to upload application.");
          }
        } catch (error) {
          console.error("Error uploading application:", error);
        }
      } else {
        const data = {
          about: problemAbout,
          content: problemContent,
          description: problemDescription,
        };
        setProblem([...problem, data]);
      }
    }
  };

  const handleItemClickProblem = (index) => {
    setSelectedProblem(problem[index]);
    setProblemAbout(problem[index].about);
    setProblemContent(problem[index].content);
    setProblemDescription(problem[index].description);
    setProblemImage(problem[index].image);
  };

  const handleItemClickSkill = (index) => {
    setSelectedSkill(skillGain[index]);
    setSkillTitle(skillGain[index].point);
    setSkillContent(skillGain[index].content);
    setSkillDescription(skillGain[index].description);
  };

  const handleSkills = (e) => {
    e.preventDefault();

    if (selectedSkill) {
      console.log("Seletec dprnjnd");
      const updated = skillGain.map((item) =>
        item === selectedSkill
          ? {
              ...item,
              point: skillTitle,
              content: skillContent,
              description: skillDescription,
            }
          : item
      );
      // Update the application list with the modified item
      setSkillGain(updated);
      setSelectedSkill(null);
      setSuggestedSkills([]);
      handleAddItem("update");
      // Clear the selected item
    } else {
      const data = {
        point: skillTitle,
        content: skillContent,
        description: skillDescription,
      };

      setSkillGain([...skillGain, data]);
    }
    setSkillContent("");
    setSkillDescription("");
    setSkillTitle("");
    handleAddItem("add");
  };

  const handleSkillTitle = (e) => {
    e.preventDefault();
    const inputText = e.target.value;
    const capitalizedText =
      inputText.charAt(0).toUpperCase() + inputText.slice(1);

    setSkillTitle(capitalizedText);

    const suggestions = skillSet.filter((skill) =>
      skill.toLowerCase().includes(inputText.toLowerCase())
    );
    setSuggestedSkills(suggestions);
  };

  const handleSuggestedSkillSelect = (suggestedSkill) => {
    setSkillTitle(suggestedSkill);
    setSuggestedSkills([]);

    try {
      const fetcContent = async () => {
        const response = await getSKillContent(lid, suggestedSkill);

        // Update state with fetched skill content
        setSkillDescription(response.data.description);
        setSkillContent(response.data.content);
      };
      fetcContent();
    } catch (error) {
      console.error("Error fetching skill content:", error);
    }
  };

  const handleSuggestedCareerSelect = (suggested) => {
    setCareerTitle(suggested);
    setSuggestedCareer([]);

    try {
      const fetcContent = async () => {
        const response = await getCareerContent(lid, suggested);
        // Update state with fetched skill content
        setCareerDescription(response.data.description);
        setCareerSteps(response.data.careerStep);
        // console.log("carrerStepppp",response.data.careerStep)
        // setSkillContent(response.data.content);
      };
      fetcContent();
    } catch (error) {
      console.error("Error fetching skill content:", error);
    }
  };
  const handleImageChangeCareer = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setCareerImage(selectedFile);
      fileInputRef.current.value = null;
    }
  };

  useEffect(() => {
    if (option1Image) {
      const formData = new FormData();

      formData.append("image", option1Image);

      try {
        const upload = async () => {
          const response = await fetch("http://127.0.0.1:5000/upload_mcq", {
            method: "POST",
            body: formData,
          });
          if (!response.ok) {
            toast.error("Image ");
            return;
          } else {
            const data = await response.json();
            const filePath = data.file_path;

            setOp1im(filePath);
          }
        };
        upload();
      } catch {
        toast.error("Please add an image");
      }
    }
  }, [option1Image]);

  useEffect(() => {
    if (option2Image) {
      const formData = new FormData();

      formData.append("image", option2Image);

      try {
        const upload = async () => {
          const response = await fetch("http://127.0.0.1:5000/upload_mcq", {
            method: "POST",
            body: formData,
          });
          if (!response.ok) {
            toast.error("Please add an image");
            return;
          } else {
            const data = await response.json(); // Parse the JSON response
            const filePath = data.file_path; // Extract the "file_path" field

            // Do something with the file path, like displaying it

            setOp2im(filePath);
          }
        };
        upload();
      } catch {
        toast.error("Please add an image");
      }
    }
  }, [option2Image]);
  useEffect(() => {
    if (txtQuestionImage) {
      const formData = new FormData();

      formData.append("image", txtQuestionImage);

      try {
        const upload = async () => {
          const response = await fetch("http://127.0.0.1:5000/upload_quesimg", {
            method: "POST",
            body: formData,
          });
          if (!response.ok) {
            toast.error("Please add an image");
            return;
          } else {
            const data = await response.json(); // Parse the JSON response
            const filePath = data.file_path; // Extract the "file_path" field
            // Do something with the file path, like displaying it

            setTxtQuestionImg(filePath);
          }
        };
        upload();
      } catch {
        toast.error("Please add an image");
      }
    }
  }, [txtQuestionImage]);
  const handleImageChangeMcqQues = (e) => {
    console.log("MCQ ki horii idr to vro");
    const selectedFile = e.target.files[0];
    // console.log("Quesssss");
    // console.log("here is image for ques", selectedFile);
    if (selectedFile) {
      setTxtQuestionImage(selectedFile);
      fileInputRef3.current.value = null;
    }
  };

  const handleImageChangeMcqOption1 = (e) => {
    const selectedFile = e.target.files[0];
    console.log("here is image for option1", selectedFile);
    if (selectedFile) {
      setOption1Image(selectedFile);
      fileInputRef.current.value = null;
    }
  };

  const handleImageChangeMcqOption2 = (e) => {
    console.log("dekh idr to hora hai yee");
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setOption2Image(selectedFile);
      fileInputRef.current.value = null;
    }
  };
  const handleImageChangeProblem = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setProblemImage(selectedFile);
      //setImageUploadedCareer(true); // Set the imageUploaded state to true
      fileInputRef.current.value = null; // Reset the input value
    }
  };
  const handleImageChangeShortAnsQues = (e) => {
    console.log("dekh call to hora hai ye");
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setTxtQuestionImage(selectedFile);

      fileInputRef3.current.value = null; // Reset the input value
    }
  };
  const handleImageChangeTrueNFalseQues = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setTxtQuestionImage(selectedFile);

      fileInputRef3.current.value = null; // Reset the input value
    }
  };

  const handleCareerTitle = (e) => {
    e.preventDefault();
    const inputText = e.target.value;
    const capitalizedText =
      inputText.charAt(0).toUpperCase() + inputText.slice(1);

    setCareerTitle(capitalizedText);

    const suggestions = careerSet.filter((c) =>
      c.toLowerCase().includes(inputText.toLowerCase())
    );
    setSuggestedCareer(suggestions);
  };

  const handleUpdate = async (manual = true, event) => {
    event.preventDefault();

    setIsManualUpdate(manual);
    console.log(manual);
    handleUpdateLesson(manual);
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
      toast.success("lesson added");
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
    // if(daysData.length==0 || activeButtonIndex==0){
    //   const newObjectKey = "day" + (activeButtonIndex + 1);

    //   // Create the new day object
    //   const newDayObject = { [newObjectKey]: newDay };
    //   setDaysData(newDayObject)
    // }

    // else
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

      setCallSkillApi(true);
      setCallCareerApi(true);
    };

    func();
  }, [daysData]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setApplicationImage(selectedFile);
      setImageUploadedApp(true);
      fileInputRef.current.value = null;
    }
  };

  const handleImageChangeEvent = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setEventImage(selectedFile);
      setImageUploadedEvent(true);
      fileInputRef.current.value = null;
    }
  };

  const handleTextAreaChange = (event, setter) => {
    const { value } = event.target;
    const inputText = value;
    const capitalizedText =
      inputText.charAt(0).toUpperCase() + inputText.slice(1);

    const lines = capitalizedText.split("\n");

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === "•") {
        lines[i] = ""; // Remove bullet point if no text after it
      } else if (!lines[i].startsWith("• ")) {
        lines[i] = "• " + lines[i];
      }
    }

    setter(lines.join("\n"));
  };

  const handleCheckboxChange = (index) => {
    // Create a new array to modify the selectedAns array without mutating it
    const updatedSelectedAns = [...selectedAnswerType];

    if (!selectedAnswerType.includes(index)) {
      updatedSelectedAns.push(index);
    } else {
      const indexToRemove = updatedSelectedAns.indexOf(index);
      updatedSelectedAns.splice(indexToRemove, 1);
    }

    setSelectedAnswerType(updatedSelectedAns);
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
      setTxtQuestionImage("");
      setSelectedAnswerType([]);
      setTrueOrFalse("");
      setSelectedQuestionType("");
    }
    if (index >= 0 && index < dataArray.length) {
      const item = dataArray[index];
      setSelectedQuestionType(item.aType);
      setTxtQuestion(item.ques);
      setTxtQuestionImage(item.image);
      if (item.aType === "mutlipleChoice") {
        const answerArray = item.options;
        console.log(answerArray.option1);
        setOption1Text(answerArray.option1);
        setOption2Text(answerArray.option2);
        if (answerArray.option3) {
          setOption3Text(answerArray.option3);
        }

        if (answerArray.option5) {
          setOption4Text(answerArray.option4);
        }
        setLabel(item.label);
        setMarks(item.marks);
      }
      if (item.aType === "text") {
        const answerArray = item.ans;
        console.log("--", answerArray);
        setTxtAnswer(item.ans);
        setTxtQuestionImage(item.image);
        setSelectedQuestionType(item.aType);
        setLabel(item.label);
      }
      if (item.aType === "trueNFalse") {
        setTrueOrFalse(item.ans);
        setTxtQuestion(item.ques);
        setTxtQuestionImage(item.image);
        setSelectedQuestionType(item.aType);
        setLabel(item.label);
        setMarks(item.marks);
      }
    }
  };
  const handleServiceQAdd = () => {
    setServiceQList([...serviceQList, { qservice: "" }]);
  };
  const handleQuestionTypeChange = (event) => {
    setSelectedQuestionType(event.target.value);
  };
  const handleAnwerType = (event) => {
    setSelectedAnswerType(event.target.value);
  };
  const handleLabel = (event) => {
    setLabel(event.target.value);
  };
  const handleMarks = (event) => {
    setMarks(event.target.value);
  };

  const handleOptionChange = (event) => {
    setOptionsDisabled(true);
    if (isCorrectAnswer === "NO") {
      setSavedAnswer(event.target.value);
    }
  };
  const handleIsCorrectAnswerChange = (event) => {
    setIsCorrectAnswer(event.target.value);
    setOptionsDisabled(event.target.value != "NO");
  };

  const handleNextQuestion = useCallback((e) => {
    e.preventDefault();
    toast.success("MOVED TO NEXT");
    if (selectedQuestionType === "shortAnswer") {
      const q = txtQuestion;
      const img = txtQuestionImage;
      const a = txtAnswer;
      const data = {
        ques: q,
        image: img,
        ans: a,
        aType: selectedQuestionType,

        label: label,
        marks: marks,
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
      setTxtQuestionImage("");
      setTxtAnswer("");
      setLabel("");
      setMarks("");
      setSelectedQuestionType("");
    } else if (selectedQuestionType === "trueNFalse") {
      const q = txtQuestion;
      // const img = txtQuestionImage;
      const ans = trueOrFalse;
      const data = {
        ques: q,
        image: txtQuestionImg,
        ans: ans,
        aType: selectedQuestionType,
        label: label,
        marks: marks,
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
      setTxtQuestionImage("");
      setTrueOrFalse("");
      setTxtAnswer("");
      setLabel("");
      setSelectedQuestionType("");
    } else if (
      selectedQuestionType === "mutlipleChoice" ||
      selectedQuestionType === "arrangeOrdering"
    ) {
      const q = txtQuestion;
      // const img = txtQuestionImage;
      const opt1 = option1Text;
      const opt2 = option2Text;

      console.log("image uhsj", option1Image);

      const data = {
        ques: q,
        image: txtQuestionImg,
        options: {
          option1: opt1,
          option2: opt2,
          option1Image: op1im,
          option2Image: op2im,
        },
        aType: selectedQuestionType,
        label: label,
        marks: marks,
        selectedAns: selectedAnswerType,
      };
      console.log("data  for mcq is", data);

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
      setTxtQuestionImage("");
      setOption1Text("");
      setOption2Text("");
      setOption3Text("");
      setOption4Text("");
      setTxtAnswer("");
      setLabel("");
      setSelectedAnswerType([]);
      setSelectedQuestionType("");
      setMarks("");
    }

    if (selectedQuestionType === "fillup") {
      const q = txtQuestion;
      // const img = txtQuestionImage;
      const a = txtAnswer;
      const data = {
        ques: q,
        image: txtQuestionImg,
        ans: a,
        aType: selectedQuestionType,
        label: label,
        marks: marks,
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
      setTxtQuestionImage("");
      setTxtAnswer("");
      setLabel("");
      setMarks("");
      setSelectedQuestionType("");
    }
  });
  const handleAddItem = (text) => {
    toast.success(`Item ${text} successfully!`);
  };
  const handleTitleChange = (event) => {
    const inputText = event.target.value;
    const capitalizedText =
      inputText.charAt(0).toUpperCase() + inputText.slice(1);
    setTitle(capitalizedText);
  };
  const handleButtonActiveClick = (event) => {
    handleButtonClick(activeButtonIndex);
    //setActiveButton(buttonType);
    event.preventDefault();
    toast.success("FINISHED");
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

  const handleSteps = (e) => {
    e.preventDefault();
    const data = {
      step: careerInputStep1,
      year: careerInputYear1,
    };
    setCareerStepsData([...careerSteps, data]);
    setCareerInputYear1("");
    setCareerInputStep1("");
    setCareerSteps([...careerSteps, data]);
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
                      <input
                        style={{ resize: "none" }}
                        placeholder="Add title"
                        className="txtDetail"
                        value={title}
                        onChange={handleTitleChange}
                      />
                    </InputGroup>
                  </div>
                </div>
                <div className="lessonRow4">
                  <ReactQuill
                    className="custom-textarea"
                    value={objective}
                    onChange={setObjective}
                    modules={modules2}
                    placeholder="Objective"
                  />
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

                <div className="showApp">
                  <h5>Application</h5>
                  {showApp && (
                    <button
                      className="showicon"
                      onClick={() => setShowApp(false)}
                    >
                      -
                    </button>
                  )}
                  {!showApp && (
                    <button
                      className="showicon"
                      onClick={() => setShowApp(true)}
                    >
                      +
                    </button>
                  )}
                </div>
                {showApp && (
                  <div className="lessonRow5">
                    <div className="row1">
                      <h4>Application </h4>

                      <FontAwesomeIcon
                        icon={faLink}
                        className="linkIcon"
                        onClick={() => setShowLinkInput(true)}
                      />
                      {showLinkInput && (
                        <div className="r5c2">
                          <input
                            id="linkInput"
                            type="text"
                            placeholder="Enter Link URL"
                            value={applicationLinkUrl}
                            onKeyDown={handleLinkInputKeyDown}
                            onChange={(e) =>
                              setApplicationLinkUrl(e.target.value)
                            }
                          />
                        </div>
                      )}
                    </div>
                    <div className="row2">
                      <div className="r5c1">
                        {imageUploadedApp ? (
                          <img
                            src={
                              selectedApp
                                ? applicationImage
                                : URL.createObjectURL(applicationImage)
                            } // Use createObjectURL to generate a URL for the image
                            alt="Uploaded"
                            className="uploaded-image"
                            style={{
                              width: "17vh",
                              height: "20vh",
                              marginLeft: "-16px",
                              marginTop: "-15px",
                              borderRadius: "20px",
                            }}
                          />
                        ) : (
                          <label htmlFor="fileInput">
                            <Button
                              className="addFileApp"
                              onClick={() => fileInputRef.current.click()}
                            >
                              +
                            </Button>

                            <input
                              ref={fileInputRef} // Attach the ref to the input element
                              type="file"
                              style={{ display: "none" }}
                              onChange={handleImageChange}
                            />
                          </label>
                        )}
                      </div>

                      <div className="r5c2">
                        <input
                          type="text"
                          placeholder="title"
                          className="application-title"
                          value={applicationTitle}
                          onChange={(e) => {
                            const inputText = e.target.value;
                            const capitalizedText =
                              inputText.charAt(0).toUpperCase() +
                              inputText.slice(1);

                            setApplicationTitle(capitalizedText);
                          }}
                        />
                        <textarea
                          placeholder="Content"
                          rows={3}
                          value={applicationContent}
                          onChange={(e) => {
                            setApplicationContent(e.target.value);
                          }}
                        ></textarea>
                        <button
                          className="applicationAdd js-application-button"
                          onClick={(e) => {
                            if (isapplicationUpdate) {
                              handleApplication(e);
                              handleAddItem("add");
                            } else {
                              handleUpdateApplication(e);
                              setCurrentlyEditingIndex(-1);
                              handleAddItem("update");
                            }
                          }}
                        >
                          {isapplicationUpdate ? "Add" : "Update"}
                        </button>
                        <ToastContainer autoClose={3000} position="top-right" />
                      </div>
                      <div className="r5c3">
                        <h5>Added Item</h5>

                        <div className="outer">
                          <div className="skillRow">
                            {application &&
                              application.map((i, index) => (
                                <div
                                  className="eachCol"
                                  onClick={() => {
                                    handleEditApplication(i, index);
                                  }}
                                >
                                  {console.log(
                                    "saxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyyyyyyy",
                                    i.image
                                  )}
                                  {i.image && (
                                    <img
                                      src={`http://127.0.0.1:5000/static/${i.image}`}
                                      style={{
                                        width: "70px",
                                        height: "70px",
                                        borderRadius: "20px",
                                      }}
                                    />
                                  )}
                                  <div className="description">
                                    <h5 className="application-title">
                                      {i.title}
                                    </h5>
                                    <p>{i.content}</p>
                                    <p style={{ color: "blue" }}>
                                      <u>{i.url}</u>
                                    </p>
                                  </div>
                                </div>
                              ))}
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="showApp">
                  <h5>Relevance to subject</h5>
                  {showRele && (
                    <button
                      className="showiconRele"
                      onClick={() => setShowRele(false)}
                    >
                      -
                    </button>
                  )}
                  {!showRele && (
                    <button
                      className="showiconRele"
                      onClick={() => setShowRele(true)}
                    >
                      +
                    </button>
                  )}
                </div>

                {showRele && (
                  <div className="lessonRow6">
                    <div className="row1">
                      <h4>Relevance to subject</h4>
                    </div>
                    <div className="row2">
                      <div className="r6c2">
                        <input
                          type="text"
                          placeholder="Point"
                          value={releTitle}
                          onChange={(e) =>
                            handleTextAreaChange(e, setReleTitle)
                          }
                        />
                        <textarea
                          placeholder="Content"
                          rows={3}
                          value={releContent}
                          onChange={(e) => setReleContent(e.target.value)}
                        ></textarea>
                        <button
                          className="applicationAdd"
                          onClick={(e) => {
                            if (isreleUpdate) {
                              handleRelevance(e);
                              handleAddItem("add");
                            } else {
                              handleUpdateRele(e);
                              setCurrentlyEditingIndexRele(-1);
                              handleAddItem("update");
                            }
                          }}
                        >
                          {isreleUpdate ? "Add" : "Update"}
                        </button>
                        <ToastContainer autoClose={3000} position="top-right" />
                      </div>
                      <div className="r6c3">
                        <h5>Added Item</h5>
                        <div className="outer">
                          {releText &&
                            releText.map((ele, index) => (
                              <div
                                className="eachCol"
                                onClick={() => {
                                  handleEditRelevance(index);
                                }}
                              >
                                <div className="description">
                                  <h5>{ele.title}</h5>
                                  <p style={{ marginLeft: "0px" }}>
                                    {ele.content}
                                  </p>
                                </div>
                              </div>
                            ))}

                          {/*
          <div className='eachCol'>
            <div className='description'>
              <h5>Point</h5>
              <p style={{marginLeft:"0px"}}>dbhbvhdbhvbhvghvg fff vgh hghf</p>
            </div>
          </div>
          <div className='eachCol'>
            <div className='description'>
              <h5>Point</h5>
              <p style={{marginLeft:"0px"}}>dbhbvhdbhvbhvghvg fff vgh hghf</p>
            </div>
          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="showApp">
                  <h5>Skill</h5>
                  {showSkills && (
                    <button
                      className="showiconSkills"
                      onClick={() => setShowSkills(false)}
                    >
                      -
                    </button>
                  )}
                  {!showSkills && (
                    <button
                      className="showiconSkills"
                      onClick={() => setShowSkills(true)}
                    >
                      +
                    </button>
                  )}
                </div>

                {showSkills && (
                  <div className="lessonRow7">
                    <div className="row1">
                      <h4>Skill</h4>
                    </div>
                    <div className="row2">
                      <div className="r7c2">
                        <input
                          type="text"
                          value={skillTitle}
                          className="form custom-dropdown"
                          onChange={handleSkillTitle}
                          placeholder="Search for a skill"
                          style={{ outline: "none" }}
                        />
                        <div className="suggestions">
                          {suggestedSkills.map((suggestedSkill, index) => (
                            <p
                              key={index}
                              onClick={() =>
                                handleSuggestedSkillSelect(suggestedSkill)
                              }
                              className="suggestionOption"
                            >
                              {suggestedSkill}
                            </p>
                          ))}
                        </div>

                        <input
                          type="text"
                          placeholder="Description"
                          value={skillDescription}
                          onChange={(e) => {
                            setSkillDescription(e.target.value);
                          }}
                        />
                        <textarea
                          placeholder="Content"
                          rows={3}
                          value={skillContent}
                          onChange={(e) =>
                            handleTextAreaChange(e, setSkillContent)
                          }
                        ></textarea>
                        <button
                          className="applicationAdd"
                          onClick={(e) => {
                            handleSkills(e);
                          }}
                        >
                          {selectedSkill ? "Update" : "Add"}
                        </button>
                        <ToastContainer autoClose={3000} position="top-right" />
                      </div>
                      <div className="r9c3">
                        <h5>Added Skills</h5>
                        <div className="outer">
                          <div className="skillRow">
                            {skillGain &&
                              skillGain.map((idx, index) => (
                                <div
                                  className="eachCol"
                                  key={index}
                                  onClick={() => handleItemClickSkill(index)}
                                >
                                  <div className="description">
                                    <h5>{idx.point}</h5>
                                    <p>{idx.description}</p>
                                    <div className="skills-content">
                                      {idx.content
                                        .split("\n")
                                        .map((line, lineIndex) => (
                                          <div key={lineIndex}>{line}</div>
                                        ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="showApp">
                  <h5>Events</h5>
                  {showEvents && (
                    <button
                      className="showiconEvents"
                      onClick={() => setShowEvents(false)}
                    >
                      -
                    </button>
                  )}
                  {!showEvents && (
                    <button
                      className="showiconEvents"
                      onClick={() => setShowEvents(true)}
                    >
                      +
                    </button>
                  )}
                </div>

                {showEvents && (
                  <div className="lessonRow5">
                    <div className="row1">
                      <h4>Events </h4>

                      <FontAwesomeIcon
                        icon={faLink}
                        className="linkIcon"
                        onClick={() => setShowLinkInput(true)}
                      />
                      {showLinkInput && (
                        <div className="r5c2">
                          <input
                            id="linkInput"
                            type="text"
                            placeholder="Enter Link URL"
                            value={eventLinkUrl}
                            onKeyDown={handleLinkKeyDown}
                            onChange={(e) => setEventLinkUrl(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                    <div className="row2">
                      <div className="r5c1">
                        {imageUploadedEvent ? (
                          <img
                            src={
                              selectedEvent
                                ? eventImage
                                : URL.createObjectURL(eventImage)
                            }
                            alt="Uploaded"
                            className="uploaded-image"
                            style={{
                              width: "17vh",
                              height: "20vh",
                              marginLeft: "-16px",
                              marginTop: "-15px",
                              borderRadius: "20px",
                            }}
                          />
                        ) : (
                          <label htmlFor="fileInput">
                            <Button
                              className="addFileApp"
                              onClick={() => fileInputRef.current.click()}
                            >
                              +
                            </Button>
                            <input
                              ref={fileInputRef} // Attach the ref to the input element
                              type="file"
                              style={{ display: "none" }}
                              onChange={handleImageChangeEvent}
                            />
                          </label>
                        )}
                      </div>

                      <div className="r5c2">
                        <input
                          type="text"
                          placeholder="title"
                          value={eventTitle}
                          onChange={(e) => {
                            const inputText = e.target.value;
                            const capitalizedText =
                              inputText.charAt(0).toUpperCase() +
                              inputText.slice(1);

                            setEventTitle(capitalizedText);
                          }}
                        />
                        <textarea
                          placeholder="Content"
                          rows={3}
                          value={eventContent}
                          onChange={(e) => {
                            setEventContent(e.target.value);
                          }}
                        ></textarea>
                        <div className="event-date">
                          <input
                            type="text"
                            placeholder="Event Date"
                            value={eventDate}
                            onChange={(e) => {
                              setEventDate(e.target.value);
                            }}
                          />
                        </div>
                        <button
                          className="applicationAdd"
                          onClick={(e) => {
                            if (iseventUpdate) {
                              handleEvents(e);
                              handleAddItem("add");
                            } else {
                              handleUpdateEvents(e);
                              setCurrentlyEditingIndexEvent(-1);
                              handleAddItem("update");
                            }
                          }}
                        >
                          {iseventUpdate ? "Add" : "Update"}
                        </button>
                        <ToastContainer autoClose={3000} position="top-right" />
                      </div>
                      <div className="r5c3">
                        <h5>Added Item</h5>

                        <div className="outer">
                          <div className="skillRow">
                            {events &&
                              events.map((i, index) => (
                                <div
                                  className="eachCol"
                                  key={index}
                                  onClick={() => {
                                    handleEditEvents(index);
                                  }}
                                >
                                  {i.image && (
                                    <img
                                      src={`http://127.0.0.1:5000/static/${i.image}`}
                                      style={{
                                        width: "70px",
                                        height: "70px",
                                        borderRadius: "20px",
                                      }}
                                    />
                                  )}
                                  <div className="description">
                                    <h5>{i.title}</h5>
                                    <p>{i.content}</p>
                                    <p>{i.date}</p>
                                    <p style={{ color: "blue" }}>
                                      <u>{i.url}</u>
                                    </p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="showApp">
                  <h5>Problem</h5>
                  {showProblem && (
                    <button
                      className="showiconProb"
                      onClick={() => setShowProblem(false)}
                    >
                      -
                    </button>
                  )}
                  {!showProblem && (
                    <button
                      className="showiconProb"
                      onClick={() => setShowProblem(true)}
                    >
                      +
                    </button>
                  )}
                </div>

                {showProblem && (
                  <div className="lessonRow7">
                    <div className="row1">
                      <h4>Problem</h4>
                      <label htmlFor="fileInput">
                        <FontAwesomeIcon
                          icon={faImage}
                          style={{ marginLeft: "40vh" }}
                          className="imageIcon"
                          onClick={() => fileInputRef.current.click()}
                        />

                        <input
                          ref={fileInputRef} // Attach the ref to the input element
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleImageChangeProblem}
                        />
                      </label>
                    </div>
                    <div className="row2">
                      <div className="r7c2">
                        <input
                          type="text"
                          placeholder="About"
                          value={problemAbout}
                          onChange={(e) => {
                            const inputText = e.target.value;
                            const capitalizedText =
                              inputText.charAt(0).toUpperCase() +
                              inputText.slice(1);

                            setProblemAbout(capitalizedText);
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Description"
                          value={problemDescription}
                          onChange={(e) => {
                            const inputText = e.target.value;
                            const capitalizedText =
                              inputText.charAt(0).toUpperCase() +
                              inputText.slice(1);

                            setProblemDescription(capitalizedText);
                          }}
                        />
                        <textarea
                          placeholder="Content"
                          rows={3}
                          value={problemContent}
                          onChange={(e) =>
                            handleTextAreaChange(e, setProblemContent)
                          }
                        ></textarea>
                        <button
                          className="applicationAdd"
                          onClick={(e) => {
                            handleProblem(e);
                            if (selectedProblem) {
                              handleAddItem("update");
                            } else {
                              handleAddItem("add");
                            }
                          }}
                        >
                          {selectedProblem ? "Update" : "Add"}
                        </button>
                        <ToastContainer autoClose={3000} position="top-right" />
                      </div>
                      <div className="r7c3">
                        <h5>Added Item</h5>

                        <div className="outer">
                          <div className="skillRow">
                            {problem &&
                              problem.map((i, index) => (
                                <div
                                  className="eachCol"
                                  key={index}
                                  onClick={() => handleItemClickProblem(index)}
                                >
                                  {i.image && (
                                    <img
                                      src={`http://127.0.0.1:5000/static/${i.image}`}
                                      style={{
                                        width: "70px",
                                        height: "70px",
                                        borderRadius: "20px",
                                      }}
                                    />
                                  )}
                                  {/* <img src="https://media.istockphoto.com/id/1148635445/photo/abstract-black-grainy-paper-texture-background-or-backdrop-empty-asphalt-road-surface-for.webp?b=1&s=170667a&w=0&k=20&c=SsSK-YbyIA9JkT9_v3btSjc2y__mAoCn6uYJ8LKx9PI=" style={{width:'70px',height:'70px',borderRadius:'20px'}}/> */}
                                  <div className="description">
                                    <h5>{i.about}</h5>
                                    <h6>{i.description}</h6>
                                    <div className="problem-content">
                                      {i.content
                                        .split("\n")
                                        .map((line, lineIndex) => (
                                          <div key={lineIndex}>{line}</div>
                                        ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="showApp">
                  <h5>Career</h5>
                  {showCareer && (
                    <button
                      className="showiconEvents"
                      onClick={() => setShowCareer(false)}
                    >
                      -
                    </button>
                  )}
                  {!showCareer && (
                    <button
                      className="showiconEvents"
                      onClick={() => setShowCareer(true)}
                    >
                      +
                    </button>
                  )}
                </div>

                {showCareer && (
                  <div className="lessonRow10">
                    <div className="row1">
                      <h4>Career path </h4>
                      <label htmlFor="fileInput">
                        <FontAwesomeIcon
                          icon={faImage}
                          style={{ marginLeft: "40vh" }}
                          className="imageIcon"
                          onClick={() => fileInputRef.current.click()}
                        />

                        <input
                          ref={fileInputRef} // Attach the ref to the input element
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleImageChangeCareer}
                        />
                      </label>
                    </div>
                    <div className="row2">
                      <div className="r7c2">
                        <input
                          type="text"
                          value={careerTitle}
                          className="form custom-dropdown"
                          onChange={handleCareerTitle}
                          placeholder="Search for a skill"
                          style={{ outline: "none" }}
                        />
                        <div className="suggestions">
                          {suggestedCareer.map((suggested, index) => (
                            <p
                              key={index}
                              onClick={() =>
                                handleSuggestedCareerSelect(suggested)
                              }
                              className="suggestionOption"
                            >
                              {suggestedCareer}
                            </p>
                          ))}
                        </div>

                        <textarea
                          placeholder="Description"
                          rows={3}
                          value={careerDescription}
                          onChange={(e) => setCareerDescription(e.target.value)}
                        ></textarea>
                        <div className="career-info">
                          <div className="career-grid">
                            {/* <input
                            type="text"
                            value={careerInputStep1}
                            placeholder="Step 1"
                            className="input1"
                            onChange={(e) => setCareerInputStep1(e.target.value)}
                          />
                          <input
                            type="text"
                            value={careerInputYear1}
                            placeholder="Years Needed"
                            className="input2"
                            onChange={(e) => setCareerInputYear1(e.target.value)}
                          />
                            <input
                            type="text"
                            placeholder="Step 2 "
                            value={careerInputStep2}
                            className="input1"
                            onChange={(e) => setCareerInputStep2(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Years Needed"
                            value={careerInputYear2}
                            className="input2"
                            onChange={(e) => setCareerInputYear2(e.target.value)}
                          />  */}

                            {careerSteps &&
                              careerSteps.map((item, index) => (
                                <div key={index}>
                                  <input
                                    type="text"
                                    value={item.step}
                                    placeholder="Step"
                                    className="input1"
                                  />
                                  <input
                                    type="text"
                                    value={item.year}
                                    placeholder="Years Needed"
                                    className="input2"
                                  />
                                </div>
                              ))}
                            <div>
                              {/* {careerStep.length > 0 && <h1>dghghyg</h1>}
{careerStep.map((ele, index) => (
  <div key={index}>
    <input
      type="text"
      value={ele.step}
      placeholder="Step"
      className="input1"
      onChange={(e) => setCareerInputStep1(e.target.value)}
    />
    <input
      type="text"
      value={ele.year}
      placeholder="Years Needed"
      className="input2"
      onChange={(e) => setCareerInputYear1(e.target.value)}
    />
  </div>
))} */}
                              <input
                                type="text"
                                value={careerInputStep1}
                                placeholder="Step"
                                className="input1"
                                onChange={(e) =>
                                  setCareerInputStep1(e.target.value)
                                }
                              />
                              <input
                                type="text"
                                value={careerInputYear1}
                                placeholder="Years Needed"
                                className="input2"
                                onChange={(e) =>
                                  setCareerInputYear1(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="image">
                            <button
                              className="career-image-button fa-6x"
                              onClick={(e) => handleSteps(e)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          className="applicationAdd"
                          onClick={(e) => {
                            handleCareerPath(e);
                          }}
                        >
                          Add
                        </button>
                        <ToastContainer autoClose={3000} position="top-right" />
                      </div>
                      <div className="r8c3">
                        <h5>Added Career path</h5>
                        <div className="outer">
                          <div
                            className="skillRow"
                            style={{ marginTop: "4vh", marginLeft: "0.5vh" }}
                          >
                            {careerPath.map((career, index) => (
                              <div key={index} className="careerRight">
                                {" "}
                                {/* Added key attribute */}
                                {/* <img src="https://media.istockphoto.com/id/1443022226/photo/black-leather-texture-background.webp?b=1&s=170667a&w=0&k=20&c=JluczfcCJXPyUSgATnnnuA33X2Rma_pOfDif9LdTb9Y=" style={{width:'40px',height:'40px',borderRadius:'50%'}}/> */}
                                <div className="you">You</div>
                                {career.careerStep.map((e, stepIndex) => (
                                  // Added stepIndex as a second argument
                                  <div style={{ display: "flex" }}>
                                    <div className="carrerRightInside">
                                      <h6 style={{ marginTop: "-0.3vh" }}>
                                        {e.step}
                                      </h6>
                                      <p
                                        style={{
                                          marginTop: "-0.5vh",
                                          paddingTop: "-1px",
                                          marginBottom: "0.5vh",
                                          marginLeft: "-1vh",
                                          marginRight: "-1vh",
                                        }}
                                      >
                                        {" "}
                                        <div
                                          style={{
                                            display: "flex",
                                            marginTop: 5 + "px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              width: 7 + "px",
                                              height: 3 + "px",
                                              backgroundColor: "blue",
                                              marginTop: 4 + "px",
                                              marginLeft: 6 + "px",
                                            }}
                                          ></div>
                                          <div
                                            style={{
                                              width: 10 + "px",
                                              height: 10 + "px",
                                              borderRadius: 50 + "%",
                                              backgroundColor: "blue",
                                            }}
                                          ></div>
                                          <div
                                            style={{
                                              width: 7 + "px",
                                              height: 3 + "px",
                                              backgroundColor: "blue",
                                              marginTop: 4 + "px",
                                              marginRight: 5 + "px",
                                            }}
                                          ></div>
                                        </div>{" "}
                                      </p>
                                      <h6
                                        style={{
                                          marginTop: "-0.5vh",
                                          paddingTop: "-1px",
                                          marginLeft: "-1vh",
                                        }}
                                      >
                                        {e.year}
                                      </h6>
                                    </div>
                                  </div>
                                ))}
                                <img
                                  src={`http://127.0.0.1:5000/static/${career.image}`}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* <div className='box2'>
                         <div className='b2row1'>

                              <div className='row1c'>
                              <Button
                                variant={activeButton === 'Informative' ? 'primary' : 'outline-primary'}
                                // onClick={() => handleButtonActiveClick('Informative')}

                                className='mb-2'>Informative</Button>
                              </div>
                              <div className='row1c'>
                              <Button
                               variant={activeButton === 'Conceptual' ? 'primary' : 'outline-primary'}
                            //    onClick={() => handleButtonActiveClick('Conceptual')}
                                className='mb-2'>Conceptual</Button>
                              </div>
                              <div className='row1c'>
                              <Button
                                variant={activeButton === 'Colearning' ? 'primary' : 'outline-primary'}
                            //    onClick={() => handleButtonActiveClick('Colearning')}

                                className='mb-2'>Colearning</Button>
                              </div>

                         </div>
                         </div> */}

                <div className="question-info-box">
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
                        <option className="optins" value="shortAnswer">
                          Short Answer
                        </option>
                        <option value="mutlipleChoice">MCQ</option>
                        <option value="trueNFalse">T/F</option>
                        <option value="fillup">Fill in the Blanks</option>
                        <option value="arrangeOrdering">
                          {" "}
                          Arrange Ordering
                        </option>
                      </Form.Select>
                    </div>

                    {/* {selectedQuestionType === "text" && (
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
                    )} */}
                    <div className="row3c">
                      <Form.Select
                        aria-label="Default select example"
                        style={{ outline: "none" }}
                        className="form custom-dropdown"
                        onChange={handleLabel}
                      >
                        <option>Question Level</option>
                        <option value="fun">Fun</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="tough">Tough</option>
                        <option value="expert">Expert</option>
                      </Form.Select>
                    </div>
                    <div className="row3c">
                      <Form.Select
                        aria-label="Default select example"
                        style={{ outline: "none" }}
                        className="form custom-dropdown"
                        onChange={handleMarks}
                      >
                        <option>Assign Marks</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </Form.Select>
                    </div>
                  </div>
                  {selectedQuestionType === "shortAnswer" && (
                    <div className="short-ans-div">
                      <div className="short-ans-ques">
                        <input
                          type="text"
                          className="short-answer-title"
                          placeholder="Add title"
                          value={txtQuestion}
                          onChange={(e) => {
                            const inputText = e.target.value;
                            const capitalizedText =
                              inputText.charAt(0).toUpperCase() +
                              inputText.slice(1);

                            setTxtQuestion(capitalizedText);
                          }}
                        />
                        <label htmlFor="fileInput">
                          <FontAwesomeIcon
                            icon={faImage}
                            onClick={() => fileInputRef3.current.click()}
                          />

                          <input
                            ref={fileInputRef3} // Attach the ref to the input element
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleImageChangeShortAnsQues}
                          />
                        </label>
                      </div>

                      <ReactQuill
                        value={txtAnswer}
                        onChange={setTxtAnswer}
                        placeholder="Answer"
                        className="short-ans-desc"
                        modules={modules2}
                        rows={4}
                      />
                    </div>
                  )}

                  {(selectedQuestionType === "mutlipleChoice" ||
                    selectedQuestionType === "arrangeOrdering") && (
                    <div className="MCQ-ques">
                      <input
                        type="text"
                        value={txtQuestion}
                        onChange={(e) => {
                          const inputText = e.target.value;
                          const capitalizedText =
                            inputText.charAt(0).toUpperCase() +
                            inputText.slice(1);

                          setTxtQuestion(capitalizedText);
                        }}
                        placeholder="Add question"
                        className="MCQ-ques-input"
                        style={{ color: "gray" }}
                      />
                      <label htmlFor="fileInput">
                        <FontAwesomeIcon
                          icon={faImage}
                          onClick={() => fileInputRef3.current.click()}
                        />

                        <input
                          ref={fileInputRef3} // Attach the ref to the input element
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleImageChangeMcqQues}
                        />
                      </label>
                      <div className="MCQ-option">
                        <h5>Answer Type :</h5>
                        <div className="option-grid">
                          <div>
                            <input
                              type="checkbox"
                              onChange={() => handleCheckboxChange(option1Text)}
                            />
                            <input
                              type="text"
                              className="MCQ-grid-input"
                              placeholder="Option 1"
                              value={option1Text}
                              onChange={(e) => setOption1Text(e.target.value)}
                            />
                            <label htmlFor="fileInput">
                              <FontAwesomeIcon
                                icon={faImage}
                                onClick={() => fileInputRef2.current.click()}
                              />

                              <input
                                ref={fileInputRef2} // Attach the ref to the input element
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleImageChangeMcqOption1}
                              />
                            </label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              onChange={() => handleCheckboxChange(option2Text)}
                            />
                            <input
                              type="text"
                              className="MCQ-grid-input"
                              placeholder="Option 2"
                              value={option2Text}
                              onChange={(e) => setOption2Text(e.target.value)}
                            />
                            <label htmlFor="fileInput">
                              <FontAwesomeIcon
                                icon={faImage}
                                onClick={() => fileInputRef.current.click()}
                              />

                              <input
                                ref={fileInputRef} // Attach the ref to the input element
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleImageChangeMcqOption2}
                              />
                            </label>
                          </div>
                        </div>

                        <button className="MCQ-button">
                          +Additional Option
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedQuestionType === "trueNFalse" && (
                    <div className="b2row5">
                      <div className="truefalse-ques-div">
                        <input
                          className="truefalse-ques-input"
                          value={txtQuestion}
                          onChange={(e) => {
                            const inputText = e.target.value;
                            const capitalizedText =
                              inputText.charAt(0).toUpperCase() +
                              inputText.slice(1);

                            setTxtQuestion(capitalizedText);
                          }}
                          placeholder="Add question"
                        />
                        <label htmlFor="fileInput">
                          <FontAwesomeIcon
                            icon={faImage}
                            onClick={() => fileInputRef3.current.click()}
                          />

                          <input
                            ref={fileInputRef3} // Attach the ref to the input element
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleImageChangeTrueNFalseQues}
                          />
                        </label>
                      </div>

                      <div className="mb-3">
                        <div className="truefalse-ans-section">
                          <div className="left-section">
                            <h5>Answer Type:</h5>
                          </div>
                          <div className="middle-section">
                            <input
                              type="radio"
                              name="group1"
                              id="inline-radio-true"
                              className="custom-radio-input"
                              value="true"
                              checked={trueOrFalse === "true"}
                              onChange={(e) => setTrueOrFalse(e.target.value)}
                              style={{
                                borderBottom: "2px solid gray",
                                color: "gray",
                              }}
                            />
                            <label className="true">True</label>
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
                            <label className="false">False</label>
                          </div>
                          {/* <div className="right-section">
                            <button>+Additional Option</button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedQuestionType === "fillup" && (
                    <div>
                      <div className="fillup-ques-div">
                        <input
                          value={txtQuestion}
                          onChange={(e) => {
                            const inputText = e.target.value;
                            const capitalizedText =
                              inputText.charAt(0).toUpperCase() +
                              inputText.slice(1);

                            setTxtQuestion(capitalizedText);
                          }}
                          className="fillup-ques-input"
                          placeholder="Add question"
                        />
                        <label htmlFor="fileInput">
                          <FontAwesomeIcon
                            icon={faImage}
                            onClick={() => fileInputRef.current.click()}
                          />

                          <input
                            ref={fileInputRef} // Attach the ref to the input element
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleImageChangeTrueNFalseQues}
                          />
                        </label>
                      </div>

                      <input
                        value={txtAnswer}
                        onChange={(e) => setTxtAnswer(e.target.value)}
                        className="fillup-ans-input"
                        placeholder="Add answer separate with “|”"
                      />
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
                      <ToastContainer autoClose={3000} position="top-right" />
                    </div>
                    <div className="row9c">
                      <button
                        className="finishbutton"
                        onClick={handleButtonActiveClick}
                      >
                        Finish
                      </button>
                      <ToastContainer autoClose={3000} position="top-right" />
                    </div>
                  </div>
                </div>

                <div className="question-view">
                  {selectedQuestionList &&
                    selectedQuestionList.map((item, index) => (
                      <div>
                        <div className="question-view-upper">
                          <h5 className="questionViewQuestion">
                            {console.log(item)}
                            <FontAwesomeIcon icon={faCircle} /> {item.ques}
                          </h5>
                          <span>
                            {item.image && (
                              <img
                                src={`http://127.0.0.1:5000/static/${item.image}`}
                                alt="Uploaded"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                          </span>
                        </div>

                        {(item.aType === "shortAnswer" ||
                          item.aType === "fillup" ||
                          item.aType === "text" ||
                          item.aType === "trueNFalse") && (
                          <div
                            className="answerCss"
                            dangerouslySetInnerHTML={{ __html: item.ans }}
                          />
                        )}
                        {(item.aType === "mutlipleChoice" ||
                          item.aType === "arrangeOrdering") && (
                          <div>
                            <h5>Options</h5>
                            <li
                              className="answerCss"
                              dangerouslySetInnerHTML={{
                                __html: item.options.option1,
                              }}
                            />
                            {item.options.option1Image && (
                              <img
                                src={`http://127.0.0.1:5000/static/${item.options.option1Image}`}
                                style={{ height: "80px", width: "80px" }}
                              />
                            )}
                            <li
                              className="answerCss"
                              dangerouslySetInnerHTML={{
                                __html: item.options.option2,
                              }}
                            />
                            {item.options.option2Image && (
                              <img
                                src={`http://127.0.0.1:5000/static/${item.options.option2Image}`}
                                style={{ height: "80px", width: "80px" }}
                              />
                            )}
                            {item.options.option3 && (
                              <div
                                className="answerCss"
                                dangerouslySetInnerHTML={{
                                  __html: item.options.option3,
                                }}
                              />
                            )}
                            {item.options.option4 && (
                              <div
                                className="answerCss"
                                dangerouslySetInnerHTML={{
                                  __html: item.options.option4,
                                }}
                              />
                            )}

                            <div
                              className="answerCss"
                              dangerouslySetInnerHTML={{
                                __html: item.selectedAns,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {data && (
                  <div className="row10">
                    <button
                      className="completesave"
                      onClick={(e) => {
                        e.preventDefault();
                        setTimeout(() => {
                          handleUpdateLesson(false);
                        }, 1000);
                      }}
                      style={{ marginBottom: "-20px" }}
                    >
                      Save
                    </button>
                  </div>
                )}

                {!data && (
                  <div className="row10">
                    <button className="complete" onClick={handleAddLesson}>
                      Complete
                    </button>
                  </div>
                )}

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
            </div>
          </Form>
        </Usersidebar>
      </div>
    </Container>
  );
};

export default Extra;
