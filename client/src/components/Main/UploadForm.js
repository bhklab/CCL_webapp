import React, { useState } from 'react';
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

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', file);
        axios.post('/api/upload', data, {})
            .then((res) => {
                console.log(res.statusText);
            });
    };

    const onChange = (e) => {
        const vcfFile = e.target.files[0];
        console.log(vcfFile);
        setFile(vcfFile);
    };


    return (
        <form onSubmit={onSubmit}>
            <input
                type="file"
                onChange={onChange}
                name={file}
            />
            <button type="submit" onSubmit={onSubmit}>Upload</button>
        </form>
    );
}

export default UploadForm;
