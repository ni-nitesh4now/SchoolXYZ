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
import {
  getPublications,
  createPublication,
  deletePublication,
  getPublicationByName,
  getPublicationData,
  updatePublications,
  restrictPublication,
} from "../api/auth";

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
  tableData: {
    display: "flex",
    padding: "25px",
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
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
    borderRadius: "26px",
    marginTop: "4vh",
  },
  column: {
    marginLeft: "20px",
    marginTop: "4px",
  },
  col2: {
    marginLeft: "5vh",
    marginTop: "-3px",
    marginRight: "7vh",
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
  marginTop: "10px",
  color: "grey",
};

const Createpublications = () => {
  const [show, setShow] = useState(false);
  const [publications, setPublications] = useState([]);
  const [publicationName, setPublicationName] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [updateName, setUpdateName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPublications();
        console.log(response);
        setPublications(response);
      } catch (error) {
        console.error("Error fetching users:", error);
        setPublications([]);
      }
    };
    fetchData();
  }, []);

  const handleCreatePublication = async () => {
    try {
      const exists = await checkNameExist(publicationName);
      if (exists) {
        alert("Publication already exist");
        setPublicationName("");
        handleClose();
      } else {
        const Data = {
          name: publicationName,
        };

        handleClose();
        setPublicationName("");
        const createdPublic = await createPublication(Data);
        const ihd = await getPublicationByName(publicationName);
        console.log(Data, ihd);
        //setPublications((prev) => [...prev, ihd]);
        console.log("Newly created publication:", createdPublic);
        setPublications((prev) => [createdPublic, ...prev]);
      }
    } catch (error) {
      console.error("Error creating publication:", error.message);
    }
  };

  const checkNameExist = async (name) => {
    return new Promise((resolve, reject) => {
      // Assuming "users" is an array of user objects
      const Exists = publications.some(
        (b) => b.name.toLowerCase() == name.toLowerCase()
      );
      console.log("Exist", Exists);
      resolve(Exists);
    });
  };

  const handleDeletePublication = async (pubId) => {
    try {
      await deletePublication(pubId);
      setPublications((prevPublications) =>
        prevPublications.filter((publication) => publication._id !== pubId)
      );
    } catch (error) {
      console.error("Error deleting publication:", error);
    }
  };

  const fetchUserForUpdate = async (Id, isBlocked) => {
    try {
      if (!isBlocked) {
        const response = await getPublicationData(Id);
        setSelectedId(Id);
        setUpdateName(response.name);
        setShowUpdate(true);
      } else {
        alert("Cann't update as it is restricted");
      }
    } catch (error) {
      console.error("Error fetching classes for update:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        name: updateName,
      };
      const response = await updatePublications(updatedData, selectedId);
      console.log(response);
      setPublications((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedId ? response.data : user
        )
      );
      setShowUpdate(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestrict = async (id) => {
    const res = await restrictPublication(id);
    console.log("board is ", res.blocked);
  };

  return (
    <Container>
      <Adminsidenav>
        <Row style={styles.userBody}>
          <Row style={styles.link}>
            <a href="#000" style={styles.createLink} onClick={handleShow}>
              Create
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
                        marginBottom: "4px",
                        fontSize: "24px",
                        marginTop: "-2px",
                      }}
                    >
                      Publication
                    </div>
                    <div style={modalBorder}>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        style={inputField}
                        value={publicationName}
                        onChange={(e) => setPublicationName(e.target.value)}
                      />
                    </div>
                    <div style={modalBorder}>
                      <Button
                        variant="primary"
                        onClick={handleCreatePublication}
                        style={submitBtn}
                      >
                        Create
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showUpdate && (
              <div style={adding}>
                <div style={addOuter}>
                  <div style={modalBorder}>
                    <button style={closeButton} onClick={handleClose}>
                      x
                    </button>
                    <div
                      style={{
                        textAlign: "center",
                        marginBottom: "4px",
                        fontSize: "24px",
                        marginTop: "-2px",
                      }}
                    >
                      Publication
                    </div>
                    <div style={modalBorder}>
                      <Form.Control
                        type="text"
                        placeholder="Name"
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
          </Row>

          {publications && publications.length > 0 && (
            <div style={styles.table}>
              {publications.map((publication, index) => (
                <div className="rows" style={styles.rows} key={index}>
                  <div className="col" style={styles.column}>
                    <Form.Check
                      inline
                      label={index + 1}
                      name="group1"
                      type="checkbox"
                      id={`inline-checkbox-1`}
                    />
                  </div>
                  <div className="col" style={styles.col2}>
                    <h6
                      className="admin"
                      style={{
                        fontSize: "15px",
                        marginBottom: "-2px",
                        marginTop: "6px",
                        fontStyle: "bold",
                      }}
                    >
                      {publication.name}
                    </h6>
                    <p style={{ fontSize: "10px", textAlign: "left" }}>
                      Publication Name
                    </p>
                  </div>
                  <div className="col3" style={styles.col3}>
                    <a
                      style={{
                        ...styles.funcLink,
                        color: publication.blocked ? "red" : "grey",
                      }}
                      onClick={() => handleRestrict(publication._id)}
                    >
                      <BiBlock />
                      &nbsp;&nbsp;&nbsp;
                    </a>
                    <a
                      style={styles.funcLink}
                      onClick={() => handleDeletePublication(publication._id)}
                    >
                      <AiFillDelete />
                    </a>
                    <a
                      style={{ ...styles.funcLink, marginLeft: "15px" }}
                      onClick={() =>
                        fetchUserForUpdate(publication._id, publication.blocked)
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
      </Adminsidenav>
    </Container>
  );
};

export default Createpublications;
