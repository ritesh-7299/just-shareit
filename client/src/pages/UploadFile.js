import axios from "axios";
import React, { useState } from "react";

export default function UploadFile() {
  const [imgPath, setImgPath] = useState(null);
  const [formData, setFormData] = useState({
    jpg: false,
    jpeg: false,
    png: false,
    file: null,
  });

  function handleCheckboxChange(e) {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      file: file,
    }));
  }

  // const [selectedFile, setSelectedFile] = useState(null);
  // const [allChecked, setAllChecked] = useState([]);

  // function handleChange(event) {
  //   if (event.target.files) {
  //     setSelectedFile(event.target.files[0]);
  //   }

  //   if (event.target.checked) {
  //     setAllChecked([...allChecked, event.target.value]);
  //   } else {
  //     setAllChecked([allChecked.filter((item) => item !== event.target.value)]);
  //   }
  // }

  // function handleeChange(e) {}

  function handleUpload(e) {
    console.log(formData);
    e.preventDefault();
    const url = `${process.env.REACT_APP_BACKENDURL}/user/upload-file`;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formDataToSend = new FormData();
    let format = [];
    if (formData.jpg) {
      format.push("jpg");
    }
    if (formData.jpeg) {
      format.push("jpeg");
    }
    if (formData.png) {
      format.push("png");
    }
    formDataToSend.append("format", format);
    formDataToSend.append("file", formData.file);

    axios
      .post(url, formDataToSend, config)
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
      <input
        type="checkbox"
        name="jpg"
        checked={formData.jpg}
        onChange={handleCheckboxChange}
      />
      jpg
      <input
        type="checkbox"
        name="jpeg"
        checked={formData.jpeg}
        onChange={handleCheckboxChange}
      />
      jpeg
      <input
        type="checkbox"
        name="png"
        checked={formData.png}
        onChange={handleCheckboxChange}
      />
      png
      <br />
      <br />
      <input
        className=""
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>upload</button>
      <img src={imgPath} className="h-56" alt="img.jpg" />
    </div>
  );
}
