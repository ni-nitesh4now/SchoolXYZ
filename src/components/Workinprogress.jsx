import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import "./css/createuser.css";
import { getIncompleteAdmin, getBookName, getUser } from "../api/auth";

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
    marginTop: "10vh",
    marginLeft: "15vh",
  },
  createLink: {
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    color: "#712CF9",
  },
  tableData: {},
  table: {},
  funcLink: {
    textDecoration: "none",
    color: "gray",
  },
};

const Workinprogress = () => {
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState("");
  const [bookName, setBookName] = useState("");
  useEffect(() => {
    const fetch = async () => {
      try {
        const Data = await getIncompleteAdmin();
        setData(Data.data);
      } catch (error) {
        console.error("Error fetching boards:", error.message);
        setData("");
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetchBookNamesAndUserNames = async () => {
      try {
        const bookPromises = data.map((l) => getBookName(l.book_id));
        const userPromises = data.map((l) => getUser(l.user_id));

        const fetchedBookNames = await Promise.all(bookPromises);
        setBookName(fetchedBookNames); // Set the book names

        const userNames = await Promise.all(userPromises);
        setUserName(userNames);
      } catch (error) {
        console.error("Error fetching book names and user names:", error);
      }
    };
    console.log("lessons updated complete :", data);
    fetchBookNamesAndUserNames();
  }, [data]);

  return (
    <Container>
      <Adminsidenav>
        <div style={styles.link}>
          <div className="userTable">
            {data.length > 0 && (
              <div>
                {data.map((user, index) => (
                  <div className="userRow"  key={user.name}>
                    <div className="userCol1">
                      <Form.Check
                        inline
                        label={index + 1}
                        name="group1"
                        type="checkbox"
                        id={`inline-checkbox-1`}
                      />
                    </div>
                    <div className="userCol2">
                      <h6 className="admin">{bookName[index]?.name}</h6>
                      <p>Book Name</p>
                    </div>
                    <div
                      className="userCol3"
                      style={{ marginLeft: "-20px", marginRight: "10px" }}
                    >
                      <h6 className="admin">{userName[index]}</h6>
                      <p>User Name</p>
                    </div>
                    <div className="userCol5">
                      <Link
                        to="/lessonplan"
                        style={{
                          textDecoration: "none",
                          color: "blue",
                          marginLeft: "22px",
                        }}
                      >
                        View
                      </Link>
                    </div>
                    <div className="userCol4">
                      <a href="£0000" style={styles.funcLink}>
                        <BiBlock />
                        &nbsp;&nbsp;&nbsp;
                      </a>
                      <a style={styles.funcLink}>
                        <AiFillDelete />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Adminsidenav>
    </Container>
  );
};

export default Workinprogress;
