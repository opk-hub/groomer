import React, { useState, useRef } from "react";
import { Switch } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import Context from "../../Context/Context";
import "./index.css";
function Photos({
  uploadedimages,
  setUploadedimages,
  isReadOnly,
  shouldUpload,
  setshouldUpload,
  show,
}) {
  const fileInputRef1 = useRef(); // Create a reference for the first file input element
  const fileInputRef2 = useRef(); // Create a reference for the second file input element

  // States for previewing uploaded photos and their indexes
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [uploadedPhotos1, setUploadedPhotos1] = useState([]);
  const [uploadedPhotos2, setUploadedPhotos2] = useState([]);

  // Function to handle photo upload for the first container
  const handlePhotoUpload1 = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setUploadedPhotos1((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });

    setUploadedimages((old) => [...old, ...files]);
  };

  // Function to handle photo upload for the second container
  const handlePhotoUpload2 = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setUploadedPhotos2((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });

    setUploadedimages((old) => [...old, ...files]);
  };

  // Function to handle thumbnail click, showing the preview of a photo
  const handleThumbnailClick = (index, container) => {
    if (container === 1) {
      setPreviewPhoto(uploadedPhotos1[index]);
    } else {
      setPreviewPhoto(uploadedPhotos2[index]);
    }
    setPreviewIndex(index);
  };

  // Function to handle the deletion of an uploaded photo
  const handleDeleteClick = (index, container) => {
    if (container === 1) {
      const updatedPhotos = [...uploadedPhotos1];
      updatedPhotos.splice(index, 1);
      setUploadedPhotos1(updatedPhotos);
    } else {
      const updatedPhotos = [...uploadedPhotos2];
      updatedPhotos.splice(index, 1);
      setUploadedPhotos2(updatedPhotos);
    }

    const updatedImages = [...uploadedimages];
    updatedImages.splice(index, 1);
    setUploadedimages(updatedImages);
  };

  // Function to close the photo preview
  const handleClosePreview = () => {
    setPreviewPhoto(null);
  };

  // Function to delete a photo from the preview
  const handleDeletePhoto = () => {
    if (previewIndex !== null) {
      if (previewIndex !== null) {
        const updatedPhotos1 = [...uploadedPhotos1];
        const updatedPhotos2 = [...uploadedPhotos2];
        if (previewIndex < uploadedPhotos1.length) {
          updatedPhotos1.splice(previewIndex, 1);
          setUploadedPhotos1(updatedPhotos1);
        } else {
          updatedPhotos2.splice(previewIndex - uploadedPhotos1.length, 1);
          setUploadedPhotos2(updatedPhotos2);
        }
      }
      setPreviewPhoto(null);
      setPreviewIndex(null);
    }
  };

  return (
    <div className="heading-section">
      <label className="label">Cover Image:</label>
      <div className="input">
        <div className="photo-cont">
          {/* First photo container */}
          <div className="photoContainer">
            <div className="upload">
              {!uploadedPhotos1.length && (
                <label htmlFor="photo-upload-1" className="upload-label">
                  <FileUploadOutlinedIcon
                    className="upload-icon"
                    style={{ fontSize: "50px" }}
                  />
                  <br />
                  <u>Upload salon image and out side</u>
                </label>
              )}
            </div>
            <input
              id="photo-upload-1"
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef1}
              onChange={handlePhotoUpload1}
              onClick={(e) => {
                e.target.value = null;
              }}
              style={{ display: "none" }}
            />
            <div className="uploaded-photos">
              {/* Display uploaded photo thumbnails for the first container */}
              {uploadedPhotos1.map((photo, index) => (
                <div key={index} className="thumbnail-container">
                  <img
                    src={shouldUpload ? photo : `${Context}/${photo}`}
                    alt={`Uploaded ${index + 1}`}
                    className="thumbnail"
                    onClick={() => handleThumbnailClick(index, 1)}
                  />
                  {!isReadOnly && (
                    <div
                      className="delete-icon"
                      onClick={() => handleDeleteClick(index, 1)}
                    >
                      <span>
                        <DeleteIcon />
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Second photo container */}
          <div className="photoContainer">
            <div className="upload">
              {!uploadedPhotos2.length && (
                <label htmlFor="photo-upload-2" className="upload-label">
                  <FileUploadOutlinedIcon
                    className="upload-icon"
                    style={{ fontSize: "50px" }}
                  />
                  <br />
                  <u>Upload another image</u>
                </label>
              )}
            </div>
            <input
              id="photo-upload-2"
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef2}
              onChange={handlePhotoUpload2}
              onClick={(e) => {
                e.target.value = null;
              }}
              style={{ display: "none" }}
            />
            {/* Display uploaded photo thumbnails for the second container */}
            <div className="uploaded-photos">
              {uploadedPhotos2.map((photo, index) => (
                <div key={index} className="thumbnail-container">
                  <img
                    src={shouldUpload ? photo : `${Context}/${photo}`}
                    alt={`Uploaded ${index + 1}`}
                    className="thumbnail"
                    onClick={() => handleThumbnailClick(index, 2)}
                  />
                  {!isReadOnly && (
                    <div
                      className="delete-icon"
                      onClick={() => handleDeleteClick(index, 2)}
                    >
                      <span>
                        <DeleteIcon />
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Display the preview of an uploaded photo */}
      {previewPhoto && (
        <div className="preview-container">
          <div className="preview-content">
            <img src={previewPhoto} alt="Preview" className="preview-image" />

            <div className="preview-actions">
              {/* Display delete and close icons for the photo preview */}
              {!isReadOnly && (
                <div className="deleteicon" onClick={handleDeletePhoto}>
                  <i class="material-icons">
                    <DeleteIcon />
                  </i>
                </div>
              )}
              <div className="close-icon" onClick={handleClosePreview}>
                <span>&times;</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Photos;
