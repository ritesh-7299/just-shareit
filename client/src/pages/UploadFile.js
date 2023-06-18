import axios from "axios";
import React, { useState } from "react";

export default function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgPath, setImgPath] = useState(null);
  function handleChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  function handleUpload() {
    const formData = new FormData();

    formData.append("file", selectedFile);

    axios
      .post(`${process.env.REACT_APP_BACKENDURL}/user/upload-file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data.data.path);
        setImgPath(res.data.data.path);
        alert("Uploaded!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <input type="file" accept=".jpg, .png, .jpeg" onChange={handleChange} />
      <button onClick={handleUpload}>upload</button>
      <img src={imgPath} alt="img.jpg" />
    </div>
  );
}
