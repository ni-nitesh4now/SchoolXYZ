import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormLabel,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import Adminsidenav from "./Adminsidenav";
import { BiBlock } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";

import { useNavigate } from "react-router-dom";
import {
  deleteBook,
  getBooks,
  createBook,
  getBookData,
  updateBook,
  restrictBook,
} from "../api/auth";
import axios from "axios";

const styles = {
  container: {
    width: "100%",
  },
  userBody: {
    alignItems: "center",
    padding: "15px",
  },
  link: {
    marginBottom: "5px",
    marginTop: "40px",
    marginLeft: "90px",
  },
  createLink: {
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    color: "#712CF9",
  },
  table: {
    display: "flex",
    flexWrap: "wrap",
    paddingright: "2px",
    borderColapse: "separate",
    marginTop: "10px",
    marginLeft: "15px",
    paddingBottom: "2px",
  },
  rows: {
    marginLeft: "90px",
    display: "flex",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
    borderRadius: "26px",
    marginTop: "4vh",
  },
  column: {
    marginLeft: "25vh",
    marginTop: "4px",
  },
  col2: {
    marginLeft: "8vh",
    marginTop: "-3px",
    marginRight: "1vh",
    fontSize: "15px",
    textAlign: "left",
    marginBottom: "2px",

    width: "150px",
  },
  col3: {
    marginRight: "3vh",
    marginTop: "4px",
  },

  funcLink: {
    textDecoration: "none",
    color: "gray",
  },
  colCenter: {
    textAlign: "center",
    justifyContent: "center",
  },
};

const modalBorder = {
  borderBottom: "none",
  borderTop: "none",
};

const submitBtn = {
  marginLeft: "18vh",
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
  fontSize: "20px",
  marginBottom: "0px",
  color: "grey",
  marginTop: "10px",
};

const Createbooks = () => {
  const [show, setShow] = useState(false);
  const [showUpdateBook, setShowUpdateBook] = useState(false);
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bookName, setBookName] = useState("");
  const [selectedBookId, setSelectedBookId] = useState("");

  const [updateName, setUpdateName] = useState("");
  const [blockedStatus, setBlockedStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBooks();
        console.log("---", response);
        setBooks(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, [blockedStatus]);

  const handleCreateBook = async (event) => {
    event.preventDefault();
    try {
      const data = {
        name: bookName,
      };
      const response = await createBook(data);
      console.log(response); // Handle the response from the backend
      const responseData = response;
      console.log("Book created:", responseData);

      // Handle success and update the books state if needed
      setBooks((prev) => [...prev, responseData]);
      handleClose();
      setBookName("");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const updatedData = {
        name: updateName,
      };
      console.log(selectedBookId, "----", updatedData);

      const response = await updateBook(updatedData, selectedBookId);
      console.log(response.data);
      setBooks((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedBookId ? response.data : user
        )
      );
      setShowUpdateBook(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleRestrict = async (id) => {
    const res = await restrictBook(id);
    setBlockedStatus(res.blocked);
    console.log("board is ", res.blocked);
  };
  const fetchUserForUpdate = async (Id, isBlocked) => {
    try {
      if (!isBlocked) {
        const response = await getBookData(Id);
        setSelectedBookId(Id);
        setUpdateName(response.name);
        setShowUpdateBook(true);
      } else {
        alert("cann't update as book is blocked");
      }
    } catch (error) {
      console.error("Error fetching user for update:", error);
    }
  };
  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      setBooks((prevBook) => prevBook.filter((x) => x._id !== bookId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container>
      <Adminsidenav>
        <Row style={styles.userBody}>
          <Row style={styles.link}>
            <a href="#000" style={styles.createLink} onClick={handleShow}>
              Add Streams
            </a>

            {show && (
              <div style={adding}>
                <div style={addOuter}>
                  <div style={modalBorder}>
                    <button style={closeButton} onClick={handleClose}>
                      x
                    </button>
                    <div
                      style={{
                        textAlign: "center",
                        marginBottom: "6px",
                        fontSize: "24px",
                        marginTop: "-1px",
                      }}
                    >
                      Streams
                    </div>
                    <div style={modalBorder}>
                      <Form.Control
                        type="text"
                        placeholder="Stream"
                        style={inputField}
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                      />
                    </div>
                    <div style={modalBorder}>
                      <Button
                        variant="primary"
                        onClick={handleCreateBook}
                        style={submitBtn}
                      >
                        Create
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showUpdateBook && (
              <div style={adding}>
                <div style={addOuter}>
                  <div style={modalBorder}>
                    <button style={closeButton} onClick={handleClose}>
                      x
                    </button>
                    <div
                      style={{
                        textAlign: "center",
                        marginBottom: "6px",
                        fontSize: "24px",
                        marginTop: "-1px",
                      }}
                    >
                      Books
                    </div>
                    <div style={modalBorder}>
                      <Form.Control
                        type="text"
                        placeholder="Book"
                        style={inputField}
                        value={updateName}
                        onChange={(e) => setUpdateName(e.target.value)}
                      />
                    </div>
                    <div style={modalBorder}>
                      <Button
                        variant="primary"
                        onClick={handleUpdate}
                        style={submitBtn}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {books && books.length > 0 && (
              <div style={styles.table}>
                {books.map((book, index) => (
                  <div
                    className="rows"
                    style={{ ...styles.rows, marginRight: "50px" }}
                    key={index}
                  >
                    {/* <div className='userCol1'><Form.Check inline label={index+1} name="group1"type="checkbox" id={`inline-checkbox-1`}/></div> */}
                    <div className="userCol1" style={{ marginLeft: "23px" }}>
                      {" "}
                      <h6 className="admin">{index + 1}</h6>
                    </div>
                    <div className="col" style={styles.col2}>
                      <h6
                        style={{
                          fontSize: "15px",
                          marginBottom: "-2px",
                          marginTop: "6px",
                          fontStyle: "bold",
                        }}
                        className="admin"
                      >
                        {book.name}
                      </h6>
                      <p style={{ fontSize: "10px", textAlign: "left" }}>
                        Book Stream
                      </p>
                    </div>
                    <div className="col3" style={styles.col3}>
                      <a
                        style={{
                          ...styles.funcLink,
                          color: book.blocked ? "red" : "grey",
                        }}
                        onClick={() => handleRestrict(book._id)}
                      >
                        <BiBlock />
                        &nbsp;&nbsp;&nbsp;
                      </a>
                      <a
                        style={styles.funcLink}
                        onClick={() => handleDeleteBook(book._id)}
                      >
                        <AiFillDelete />
                      </a>
                      <a
                        style={{ ...styles.funcLink, marginLeft: "15px" }}
                        onClick={() =>
                          fetchUserForUpdate(book._id, book.blocked)
                        }
                      >
                        <RxUpdate />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Row>
        </Row>
      </Adminsidenav>
    </Container>
  );
};

export default Createbooks;
