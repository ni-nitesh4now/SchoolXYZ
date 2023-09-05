import React, { useState, useEffect } from "react";
import {
  Button,
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

import "./css/createuser.css";
import { getUser, getUsers } from "../api/auth";
import { deleteUser, getUserData, updateUser, restrictUser } from "../api/auth";
import { createUser } from "../api/auth";

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
    marginLeft: "25px",
  },
  table: {
    borderCollapse: "separate", // Use 'separate' to enable border spacing
    borderSpacing: "0 15px",
    marginTop: "2vh",
  },
  funcLink: {
    textDecoration: "none",
    color: "gray",
  },
  rows: {
    textAlign: "center",
    justifyContent: "center",
    boxShadow: "0 2px 2px lightgrey",
    margin: "2px 0",
    borderRadius: "4px",
    paddingTop: "1px",
  },
  cell1: {
    paddingTop: "9px",
  },
  cell2: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: "12px",
  },
  cell3: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: "12px",
    paddingRight: "50px",
  },
  createBox: {
    width: "90%",
    marginLeft: "14vh",
    padding: "20px",
  },
  createBody: {
    width: "60%",
    marginLeft: "20%",
    marginBottom: "1vh",
    paddingLeft: "3vh",
    fontSize: "12px",
    borderRadius: "60vh",
  },
  modalBody: {
    borderBottom: "none",
    borderTop: "none",
  },
  createButton: {
    marginRight: "40%",
    marginTop: "-6px",
    borderRadius: "2vh",
    padding: "3px 3vh",
    backgroundColor: "#8546e3",
    borderColor: "#8546e3",
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

const Createuser = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState({});
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        console.log(response);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  const fetchUserForUpdate = async (userId, isBlocked) => {
    try {
      if (!isBlocked) {
        const response = await getUserData(userId);
        setSelectedUserId(userId);
        setUpdateName(response.name);
        setUpdatePassword(response.password);
        setUpdateEmail(response.email);
        setShowUpdate(true);
      } else {
        alert("Cann't update as user is restricted");
      }
    } catch (error) {
      console.error("Error fetching user for update:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((x) => x._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (updatePassword.length < 8) {
        alert("password is too short (minimum length is 8)");
        return;
      }
      const updatedUserData = {
        name: updateName,
        email: updateEmail,
        password: updatePassword,
      };
      const response = await updateUser(updatedUserData, selectedUserId);
      console.log(response);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUserId ? response.data : user
        )
      );
      setShowUpdate(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleRestrict = async (id) => {
    const rres = await restrictUser(id);
    //console.log("here fronted restrict",rres);
  };
  const handleCreateUser = async () => {
    try {
      const userExists = await checkUSernameExist(name);

      if (userExists) {
        alert("User already exists!");
        setEmail("");
        setName("");
        setPassword("");
        handleClose();
      } else {
        if (password.length < 8) {
          alert("password is too short (minimum length is 8)");
          return;
        }
        const userData = {
          name,
          password,
          email,
        };

        handleClose();

        const createdUser = await createUser(userData);
        console.log("hhdns", createdUser);
        setEmail("");
        setName("");
        setPassword("");
        setUsers((prev) => [createdUser, ...prev]);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };
  const checkUSernameExist = async (name) => {
    if (users.length > 0) {
      const exists = users.some(
        (user) => user.name.toLowerCase() == name.toLowerCase()
      );
      console.log("exits", exists);
      return new Promise((resolve, reject) => {
        // Assuming "users" is an array of user objects
        const userExists = users.some(
          (user) => user.name.toLowerCase() == name.toLowerCase()
        );
        console.log("userExist", userExists);
        resolve(userExists);
      });
    } else {
      return false;
    }
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
                      Create User
                    </div>
                    <div style={modalBorder}>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        style={inputField}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div style={modalBorder}>
                      <Form.Control
                        type="email"
                        placeholder="User Id"
                        style={inputField}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div style={modalBorder}>
                      <Form.Control
                        type="Password"
                        placeholder="Password"
                        style={inputField}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div style={modalBorder}>
                      <Button
                        variant="primary"
                        onClick={handleCreateUser}
                        style={submitBtn}
                      >
                        Create
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Row>
          <div>
            {showUpdate && (
              <div style={adding}>
                <div style={addOuter}>
                  <div style={modalBorder}>
                    <button
                      style={closeButton}
                      onClick={() => setShowUpdate(false)}
                    >
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
                      Update User
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
                      <Form.Control
                        type="Password"
                        placeholder="Password"
                        style={inputField}
                        value={updatePassword}
                        onChange={(e) => setUpdatePassword(e.target.value)}
                      />
                    </div>

                    <div style={modalBorder}>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        style={inputField}
                        value={updateEmail}
                        onChange={(e) => setUpdateEmail(e.target.value)}
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
          </div>

          <div className="userTable">
            {users.length > 0 && (
              <div>
                {users.map((user, index) => (
                  <div className="userRow" key={index}>
                    {/* <div className='userCol1'><Form.Check inline label={index+1} name="group1"type="checkbox" id={`inline-checkbox-1`} /></div> */}
                    <div className="userCol1" style={{ marginLeft: "23px" }}>
                      {" "}
                      <h6 className="admin">{index + 1}</h6>
                    </div>
                    <div className="userCol2">
                      <h6 className="admin">{user.name}</h6>
                      <p>User Name</p>
                    </div>
                    <div
                      className="userCol3"
                      style={{ width: "30vh", marginLeft: "-10vh" }}
                    >
                      <h6 className="admin">{user.email}</h6>
                      <p>User Id</p>
                    </div>
                    <div className="userCol4">
                      <a
                        style={{
                          ...styles.funcLink,
                          marginLeft: "15px",
                          color: user.blocked ? "red" : "grey",
                        }}
                        onClick={() => handleRestrict(user._id)}
                      >
                        <BiBlock />
                        &nbsp;&nbsp;&nbsp;
                      </a>
                      <a
                        style={styles.funcLink}
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <AiFillDelete />
                      </a>
                      <a
                        style={{ ...styles.funcLink, marginLeft: "15px" }}
                        onClick={() =>
                          fetchUserForUpdate(user._id, user.blocked)
                        }
                      >
                        <RxUpdate />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Row>
      </Adminsidenav>
    </Container>
  );
};

export default Createuser;
