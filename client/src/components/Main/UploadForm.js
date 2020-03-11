import React, { useState, useRef } from 'react';
import axios from 'axios';
// import axios from 'axios';

// function uploadDocumentRequest({ file, name }) {
//   let data = new FormData();
//   data.append('file', document);
//   data.append('name', name);

//   return (dispatch) => {
//     axios.post('/files', data)
//       .then(response => dispatch(uploadSuccess(response))
//       .catch(error => dispatch(uploadFail(error));
//   };
// }

function UploadForm() {
    const [file, setFile] = useState(null);
    const fileRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', file);
        axios.post('/api/upload', data, {})
            .then((res) => {
                console.log(res.statusText);
            });
    };

    // when input changes
    const onChange = (e) => {
        const vcfFile = e.target.files[0];

        // cancelled
        if (vcfFile !== undefined) {
            setFile(vcfFile);
        }
    };

    // for styling the file input
    const openFileOption = () => {
        fileRef.current.click();
    }

    return (
        <form className="main-submit" onSubmit={onSubmit}>
            <input
                type="file"
                ref={fileRef}
                className="input"
                onChange={onChange}
                name={file}
            />
            <a className="choose-file" onClick={openFileOption} >Choose a File</a>
            <div className="file-uploaded">
                {file === null || file === undefined ? "No file chosen" : file.name}
            </div>
            <button type="submit" onSubmit={onSubmit}>Upload</button>
        </form>
    );
}

export default UploadForm;
