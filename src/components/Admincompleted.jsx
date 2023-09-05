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
import { getCompletedAdmin, getBook, getUser } from "../api/auth";

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

const Admincompleted = () => {
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState("");
  const [bookName, setBookName] = useState("");
  useEffect(() => {
    const fetch = async () => {
      try {
        const Data = await getCompletedAdmin();
        setData(Data.data);
      } catch (error) {
        console.error("Error fetching boards:", error.message);
        setData("");
      }
    };

    fetch();
    // if(data.length>0){
    //   fetchBookNamesAndUserNames();
    //   }
  }, []);

  useEffect(() => {
    const fetchBookNamesAndUserNames = async () => {
      try {
        const bookPromises = data.map((l) => getBook(l.book_id));
        const userPromises = data.map((l) => getUser(l.user_id));

        const arr2 = [];
        const fetchedBookNames = await Promise.all(bookPromises);
        fetchedBookNames.forEach((user) => {
          console.log(user);
          arr2.push(user);
        });
        console.log(arr2);
        setBookName(arr2);

        const arr = [];
        const fetchedUserNames = await Promise.all(userPromises);
        fetchedUserNames.forEach((user) => {
          console.log(user);
          arr.push(user);
        });
        setUserName(arr);
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
                  <div className="userRow">
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
                      <h6 className="admin">{bookName[index]}</h6>
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

export default Admincompleted;
