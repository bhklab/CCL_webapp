import React, { useState } from 'react';
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
const onChange = (e) => {
    // event to update state when form inputs change
    console.log(e);
};

const onSubmit = (e) => {
    e.preventDefault();
    // event to submit the data to the server
    console.log(e);
};

function UploadForm() {
    const [file, setFile] = useState('');
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
