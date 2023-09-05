import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Button} from "react-bootstrap";
import { ToastContainer } from 'react-toastify';

const ShowApp = ({
  showApp,
  setShowApp,
  showLinkInput,
  setShowLinkInput,
  applicationLinkUrl,
  handleLinkInputKeyDown,
  setApplicationLinkUrl,
  imageUploadedApp,
  selectedApp,
  applicationImage,
  fileInputRefC,
  handleImageChange,
  applicationTitle,
  setApplicationTitle,
  applicationContent,
  setApplicationContent,
  isapplicationUpdate,
  handleApplication,
  handleAddItem,
  handleUpdateApplication,
  setCurrentlyEditingIndex,
  application,
  handleEditApplication,
}) => {
  return (
    <><div className="showApp">
      <h5>Application</h5>
      {showApp && (
        <button className="showicon" onClick={() => setShowApp(false)}>
          -
        </button>
      )}
      {!showApp && (
        <button className="showicon" onClick={() => setShowApp(true)}>
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
                  onChange={(e) => setApplicationLinkUrl(e.target.value)}
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
                    onClick={() => fileInputRefC.current.click()}
                  >
                    +
                  </Button>

                  <input
                    ref={fileInputRefC} // Attach the ref to the input element
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
                    inputText.charAt(0).toUpperCase() + inputText.slice(1);

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
                          "Added Item Image"+{i},
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
                          <h5 className="application-title">{i.title}</h5>
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
    </>
  );
};

export default ShowApp;
