import React, { useState, useRef, useContext } from "react";
import { Switch } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Context from "../../Context/Context";

function OwnerIdentity({
  uploadedimages,
  setUploadedimages,
  isReadOnly,
  shouldUploadOwner,
  setshouldUploadOwner,
  show,
}) {
  const fileInputRef1 = useRef();
  const fileInputRef2 = useRef();

  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [uploadedPhotos1, setUploadedPhotos1] = useState([]);
  const [uploadedPhotos2, setUploadedPhotos2] = useState([]);

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

  const handleThumbnailClick = (index, container) => {
    if (container === 1) {
      setPreviewPhoto(uploadedPhotos1[index]);
    } else {
      setPreviewPhoto(uploadedPhotos2[index]);
    }
    setPreviewIndex(index);
  };

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

  const handleClosePreview = () => {
    setPreviewPhoto(null);
  };

  const handleDeletePhoto = () => {
    if (previewIndex !== null) {
      if (previewIndex < uploadedPhotos1.length) {
        const updatedPhotos1 = [...uploadedPhotos1];
        updatedPhotos1.splice(previewIndex, 1);
        setUploadedPhotos1(updatedPhotos1);
      } else {
        const updatedPhotos2 = [...uploadedPhotos2];
        updatedPhotos2.splice(previewIndex - uploadedPhotos1.length, 1);
        setUploadedPhotos2(updatedPhotos2);
      }

      const updatedImages = [...uploadedimages];
      updatedImages.splice(previewIndex, 1);
      setUploadedimages(updatedImages);

      setPreviewPhoto(null);
      setPreviewIndex(null);
    }
  };

  return (
    <div className="heading-section">
      <label className="label">Owner Identity:</label>
      <div className="input">
        <div className="photo-cont">
          <div className="photoContainer">
            <div
              className="upload"
              style={{ display: uploadedPhotos1.length ? "none" : "block" }}
            >
              <label htmlFor="identity-upload-1" className="upload-label">
                <FileUploadOutlinedIcon
                  className="upload-icon"
                  style={{ fontSize: "50px" }}
                />
                <br />
                <u>Upload front side of identity</u>
              </label>
            </div>
            <input
              id="identity-upload-1"
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
              {uploadedPhotos1.map((photo, index) => (
                <div key={index} className="thumbnail-container">
                  <img
                    src={shouldUploadOwner ? photo : `${Context}/${photo}`}
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
          <div className="photoContainer">
            <div
              className="upload"
              style={{ display: uploadedPhotos2.length ? "none" : "block" }}
            >
              <label htmlFor="identity-upload-2" className="upload-label">
                <FileUploadOutlinedIcon
                  className="upload-icon"
                  style={{ fontSize: "50px" }}
                />
                <br />
                <u>Upload back side of identity</u>
              </label>
            </div>
            <input
              id="identity-upload-2"
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
            <div className="uploaded-photos">
              {uploadedPhotos2.map((photo, index) => (
                <div key={index} className="thumbnail-container">
                  <img
                    src={shouldUploadOwner ? photo : `${Context}/${photo}`}
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
      {previewPhoto && (
        <div className="preview-container">
          <div className="preview-content">
            <img src={previewPhoto} alt="Preview" className="preview-image" />
            <div className="preview-actions">
              {!isReadOnly && (
                <div className="deleteicon" onClick={handleDeletePhoto}>
                  <i className="material-icons">
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

export default OwnerIdentity;
