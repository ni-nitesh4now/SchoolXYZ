import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Usersidebar from "./Usersidebar";
import { useNavigate } from "react-router-dom";
import {
  getUserByEmail,
  getBoards,
  getPublications,
  getBooks,
  getClasses,
  getBookNames,
  createBookName,
  createLesson,
} from "../api/auth";
import Cookies from "js-cookie";
import { useEffect } from "react";
// import './css/createplan'

const Createplan = () => {
  const [board, setBoard] = useState("");
  const [id, setId] = useState("");
  const [classValue, setClassValue] = useState("");
  const [stream, setStream] = useState("");
  const [publisher, setPublisher] = useState("");
  const [show, setShow] = useState(false);
  const [boardsArray, setBoardsArray] = useState([]);
  const [publicationArray, setPublicationArray] = useState([]);
  const [streamArray, setStreamArray] = useState([]);
  const [classArray, setClassArray] = useState([]);
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const isAllFieldsSelected =
    selectedClass &&
    selectedClass !== "Class" &&
    selectedPublisher &&
    selectedPublisher !== "Publisher" &&
    selectedStream &&
    selectedStream !== "Stream";
  const findingId = async () => {
    const tempId = await getUserByEmail(Cookies.get("umail"));

    setId(tempId._id);
    Cookies.set("id", tempId._id);
    console.log("userid is ", Cookies.get("id"));
  };
  const findingBoards = async () => {
    const bData = await getBoards();
    setBoardsArray(bData);
    console.log("here is bdata", boardsArray);
    // console.log(bData)
  };
  const findPublication = async () => {
    const bData = await getPublications();
    setPublicationArray(bData);
  };
  const findClasses = async () => {
    const Data = await getClasses();
    setClassArray(Data);
  };

  const findStream = async (Id) => {
    const stream = await getBooks();
    setStreamArray(stream);
    console.log("inside getStream", streamArray);
    console.log(stream);
    return stream;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bookName, setBookName] = useState("");

  const handleBookNameChange = (event) => {
    setBookName(event.target.value);
  };

  const handleAdd = async () => {
    handleClose();
    console.log(
      "here handleAdd",
      selectedBoard,
      selectedPublisher,
      selectedStream
    );

    const d = {
      name: bookName,
      class_id: selectedClass,
      publication_id: selectedPublisher,
      stream_id: selectedStream,
    };
    const addB = await createBookName(d);
    console.log(addB._id);
    // if(selectedBoard!=="Board"){
    //     navigate(`/lessonplan?bookName=${encodeURIComponent(bookName)}&BoardID=${encodeURIComponent(selectedBoard)}&PubID=${encodeURIComponent(selectedPublisher)}
    //     &ClassID=${encodeURIComponent(selectedClass)}&StreamID=${encodeURIComponent(selectedStream)}`);
    // }
    // else{

    //     navigate(`/lessonplan?bookName=${encodeURIComponent(bookName)}&PubID=${encodeURIComponent(selectedPublisher)}
    //     &ClassID=${encodeURIComponent(selectedClass)}&StreamID=${encodeURIComponent(selectedStream)}`);
    // }
    //navigate(`/lessonplan?bookName=${encodeURIComponent(bookName)}`);
    const lesson = {
      status: "assigned",
      days: [],
      user_id: Cookies.get("id"),
      book_id: addB._id,
    };
    const createdLesson = await createLesson(lesson);
    if (createLesson) {
      navigate("/assignedplan");
    }
  };
  useEffect(() => {
    findingId();
    findingBoards();
    findPublication();
    findStream();
    findClasses();
  }, []);

  const body = {
    // background: 'lightgray',

    alignItems: "center",
    justifyContent: "center",
    // padding: '10px 10px',
    display: "flex",
  };

  const addbook = {
    display: "flex",

    width: "auto",
    marginLeft: "7vh",
    marginTop: "8vh",
  };
  const eachColumn = {
    padding: "1.5vh",
    width: "20vh",
    border: "1px solid #949494",
    paddingLeft: "3vh",
    borderRadius: "10vh",
    color: "grey",
    fontSize: "12px",
    fontWeight: "bold",
  };
  const eachColumnFocus = {
    outline: "none",
    border: "1px solid grey" /* Add a border to show focus */,
    boxShadow: " 0 0 0 0px grey",
  };

  const modalBorder = {
    borderBottom: "none",
    borderTop: "none",
  };
  const btn = {
    width: "20vh",
    padding: "1vh 2vh",
    borderRadius: "4vh",
    backgroundColor: "#8546e3",
    border: " #8546e3",
  };
  const submitBtn = {
    marginLeft: "20vh",
    padding: "1vh 8vh",
    borderRadius: "5vh",
    marginBottom: "10px",
    backgroundColor: " #8546e3",
    borderColor: " #8546e3",
    marginTop: "7px",
  };
  const inputField = {
    width: "60%",
    marginLeft: "90px",
    borderRadius: "30vh",
    paddingLeft: "20px",
    marginTop: "25px",
    marginBottom: "20px",
    boxShadow: "0 0 5px #ccc",
    outline: "none",
  };

  const addOuter = {
    borderRadius: "10vh",
    backgroundColor: "white",
    width: "60vh",
    padding: "10px 3px 40px 5px",
  };
  const adding = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const closeButton = {
    justifyContent: "right",
    marginLeft: "50vh",
    border: "none",
    backgroundColor: "white",
    fontSize: "30px",
    marginBottom: "0px",
    marginTop: "10px",
  };

  return (
    <Container style={body} className="add_book">
      <Usersidebar>
        <Row style={addbook}>
          <Col>
            <Form.Select
              className="custom-dropdown form"
              style={eachColumn}
              aria-label="Default select example"
              required
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
            >
              <option>Board</option>
              {boardsArray &&
                boardsArray.length > 0 &&
                boardsArray.map((bd, index) => (
                  <option value={bd._id} key={index}>
                    {bd.name}
                  </option>
                ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Select
              className="custom-dropdown form"
              style={eachColumn}
              aria-label="Default select example"
              required
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option>Class</option>
              {classArray &&
                classArray.length > 0 &&
                classArray.map((c, index) => (
                  <option value={c._id} key={index}>
                    {c.name}
                  </option>
                ))}
            </Form.Select>
          </Col>

          <Col>
            <Form.Select
              className="custom-dropdown form"
              style={eachColumn}
              aria-label="Default select example"
              required
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
            >
              <option>Stream</option>
              {streamArray &&
                streamArray.length > 0 &&
                streamArray.map((s, index) => (
                  <option value={s._id} key={index}>
                    {s.name}
                  </option>
                ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Select
              className="custom-dropdown form"
              style={eachColumn}
              aria-label="Default select example"
              required
              value={selectedPublisher}
              onChange={(e) => setSelectedPublisher(e.target.value)}
            >
              <option>Publisher</option>
              {publicationArray &&
                publicationArray.length > 0 &&
                publicationArray.map((pb, index) => (
                  <option value={pb._id} key={index}>
                    {pb.name}
                  </option>
                ))}
            </Form.Select>
          </Col>
          <Col>
            <Button
              variant="primary"
              onClick={handleShow}
              disabled={!isAllFieldsSelected}
              style={btn}
            >
              Add book
            </Button>

            {show && (
              <div style={adding}>
                <div style={addOuter}>
                  <div style={modalBorder}>
                    <button style={closeButton} onClick={handleClose}>
                      {" "}
                      X
                    </button>
                    <div
                      style={{
                        textAlign: "center",
                        marginBottom: "6px",
                        fontSize: "24px",
                        marginTop: "-1px",
                      }}
                    >
                      Book
                    </div>
                    <div style={modalBorder}>
                      <Form.Control
                        type="text"
                        placeholder="Book Name"
                        style={inputField}
                        value={bookName}
                        onChange={handleBookNameChange}
                      />
                    </div>
                    <div style={modalBorder}>
                      <Button
                        variant="primary"
                        onClick={handleAdd}
                        style={submitBtn}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Usersidebar>
    </Container>
  );
};

export default Createplan;
