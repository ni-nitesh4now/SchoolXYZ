import React, { useState,useEffect,useCallback,useRef } from 'react'
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import Usersidebar from './Usersidebar';
import './css/lessonplan.css';
import {addLesson,getLesson,createLesson,updateLesson, assigned,getClassData,getBook,getPublicationData,getBoardData,getBookName} from '../api/auth';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
// import ReactQuill,{Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
// import  { useState } from 'react';
import Draggable from 'react-draggable';

const ResizableImage = ({ src }) => {
    const [dimensions, setDimensions] = useState({ width: 200, height: 200 });
    const [selectedImage, setSelectedImage] = useState(false); // <-- Add this line

    const resizeHandle = (cursor, position, onMouseDown) => (
        <div
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            background: 'white',
            border: '1px solid gray',
            cursor: cursor,
            ...position,
          }}
          onMouseDown={onMouseDown}
        />
      );

      const handleResizeTopLeft = () => {
        // Handle resize logic for top left corner
        setDimensions({
          width: dimensions.width - 10,
          height: dimensions.height - 10,
        });
      };
    
      const handleResizeTopRight = () => {
        // Handle resize logic for top right corner
        setDimensions({
          width: dimensions.width + 10,
          height: dimensions.height - 10,
        });
      };
    
      const handleResizeBottomLeft = () => {
        // Handle resize logic for bottom left corner
        setDimensions({
          width: dimensions.width - 10,
          height: dimensions.height + 10,
        });
      };
    
      const handleResizeBottomRight = () => {
        // Handle resize logic for bottom right corner
        setDimensions({
          width: dimensions.width + 10,
          height: dimensions.height + 10,
        });
      };

      const handleDrag = (e, data) => {
        // Update image position
        const newPosition = {
          top: dimensions.top + data.deltaY,
          left: dimensions.left + data.deltaX,
        };
        setDimensions((prevDimensions) => ({
          ...prevDimensions,
          ...newPosition,
        }));
      };

      const handleImageClick = () => {
        setSelectedImage(!selectedImage);
      };
    return (
        <Draggable onDrag={handleDrag}>
            <div 
                style={{ 
                    position: 'relative', 
                    width: dimensions.width, 
                    height: dimensions.height,
                    cursor: 'move',
                    border: selectedImage ? '1px dashed gray' : 'none'  // <-- Add a border when selected
                }}
                onClick={() => setSelectedImage(!selectedImage)}  // <-- Toggle selected state when image container is clicked
            >
                <img src={src} alt="Resizable" style={{ ...dimensions,pointerEvents: 'none' }} />
                {/* onclick={handleImageClick}/> */}
                {selectedImage && ( 
                    <>
                        {resizeHandle('nwse-resize', { top: 0, left: 0 }, handleResizeTopLeft)}
                        {resizeHandle('nesw-resize', { top: 0, right: 0 }, handleResizeTopRight)}
                        {resizeHandle('nesw-resize', { bottom: 0, left: 0 }, handleResizeBottomLeft)}
                        {resizeHandle('nwse-resize', { bottom: 0, right: 0 }, handleResizeBottomRight)}
                    </>
                )}
            </div>
        </Draggable>
    );
}
export default ResizableImage