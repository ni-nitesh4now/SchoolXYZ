import React from "react";
import Usersidebar from "./Usersidebar";
import { Container, Form, FormLabel, Table } from "react-bootstrap";
import { BiColumns } from "react-icons/bi";
import { useState, useEffect } from "react";
import {
  assigned,
  getUser,
  getBookByUserId,
  getAssignLessonByUserId,
  getBookByName,
  getLessonByUserIdAndBookIDAssign,
  getBookName,
} from "../api/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const styles = {
  table: {
    display: "flex",
    flexWrap: "wrap",
    paddingright: "2px",
    borderColapse: "separate",
    marginTop: "10vh",
    marginLeft: "15px",
    paddingBottom: "2px",
  },
  rows: {
    marginLeft: "90px",
    display: "flex",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
    borderRadius: "26px",
    marginTop: "6vh",
  },
  column: {
    marginLeft: "20px",
    marginTop: "5px",
  },
  col2: {
    marginLeft: "-4vh",
    marginTop: "-3px",
    marginRight: "7vh",
    fontSize: "15px",
    textAlign: "center",

    marginBottom: "2px",
    width: "250px",
  },
  col3: {
    marginRight: "3vh",
    marginTop: "4px",
    color: "blue",
    textDecoration: "none",
  },
};

const Assignedplan = () => {
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [bookNames, setBookNames] = useState([]);

  const checkHover = (event) => {
    if (event.type === "mouseenter") {
      event.target.style.backgroundColor = "#8546e3";
    } else if (event.type === "mouseleave") {
      event.target.style.backgroundColor = "transparent";
    }
  };
  const handleAdd = async (v) => {
    console.log("here add", v);

    const findBookId = await getBookByName(v);
    const lesson = await getLessonByUserIdAndBookIDAssign(
      Cookies.get("id"),
      findBookId[0]._id
    );

    // navigate(`/lessonplan/1`)
    // console.log(findBookId[0]._id)
    console.log(lesson.data);
    console.log(lesson.data.questions);
    navigate(`/lessonplan?data=${encodeURIComponent(
      JSON.stringify(lesson.data)
    )}&application=${encodeURIComponent(lesson.data.application)}
   &objective=${encodeURIComponent(
     lesson.data.objective
   )}&title=${encodeURIComponent(lesson.data.title)}
   &content=${encodeURIComponent(
     lesson.data.content
   )}&releText=${encodeURIComponent(lesson.data.relevance_to_subject)}
   &skill_gained=${encodeURIComponent(
     lesson.data.skill_gained
   )}&events=${encodeURIComponent(
      lesson.data.events_problem
    )}&career_path=${encodeURIComponent(lesson.data.career_path)}
   &question=${encodeURIComponent(
     lesson.data.questions
   )}&problem=${encodeURIComponent(lesson.data.problem)}
   &id=${encodeURIComponent(lesson.data._id)}&name=${encodeURIComponent(
      v
    )}&operation=assign&informativeQues=${encodeURIComponent(
      lesson.data.informativeQues
    )}&bk=${encodeURIComponent(lesson.data.book_id)}`);

    //navigate(`/lessonplan?bookId=${encodeURIComponent(findBookId[0]._id)}&name=${v}`);
  };
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        if (Cookies.get("id")) {
          console.log(Cookies.get("id"));
          const getlessons = await getAssignLessonByUserId(Cookies.get("id"));
          console.log("--", getlessons.data);
          console.log(getlessons.status);
          const bookIds = getlessons.data.map((lesson) => lesson.book_id);
          console.log("lesson");
          console.log(bookIds);
          let c = 0;
          const allResponses = await Promise.all(
            bookIds.map(async (bookId) => {
              const ans = await getBookName(bookId);
              const names = ans.name;
              console.log(ans);
              return names;
            })
          );
          //  // const data = await assigned(Cookies.get('id'));
          const flattenedResponses = allResponses.flat();
          //setLessons(allResponses.flat())
          setLessons(flattenedResponses);
          console.log("hh", flattenedResponses);
        }
      } catch (error) {
        console.error("Error fetching lessons:", error.message);
      }
    };
    fetchLesson();
  }, []);

  useEffect(() => {
    console.log("lessons updated:", lessons);
  }, [lessons]);
  return (
    <Container>
      <Usersidebar>
        <div style={styles.table}>
          {lessons.length > 0 && (
            <div>
              {lessons.map((l, index) => (
                <div className="rows" style={styles.rows}>
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
                        textAlign: "center",
                      }}
                    >
                      {l}
                    </h6>
                    <p style={{ fontSize: "10px" }}>Book name</p>
                    {console.log("shhs")}
                  </div>
                  <div className="col3" style={styles.col3}>
                    <a
                      style={{ textDecoration: "none", color: "blue" }}
                      onClick={() => handleAdd(l)}
                    >
                      Start
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Usersidebar>
    </Container>
  );
};

export default Assignedplan;
