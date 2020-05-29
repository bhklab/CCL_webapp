import React, { useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledForm = styled.div`
    background-color: ${colors.pink_main};
    border-radius: 25px;
    width: 50%;
    height: 100%;
    margin: 50px 0px 80px 0px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .error {
        color: ${colors.red_error};
        font-weight: 700;
    }

    .main-submit {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: 'Open Sans', sans-serif;
        font-size: calc(0.5vw + 0.5em);
        
        .input {
            display:none;
        }
        button {
            background: ${colors.darkblue_bg};
            color: white;
            border: none;
            cursor: pointer;
            padding: 8px 10px;
            border-radius:10px;
            font-weight: 600;
        }
        .choose-file {
            background: ${colors.darkblue_bg};
            color: white;
            cursor: pointer;
            padding: 8px 10px;
            border-radius:10px;
            font-weight: 600;
        }
        .file-uploaded {
            color: ${colors.darkblue_text};
            font-size: calc(0.5vw + 0.6em);
        }
    }
`;


function UploadForm() {
    const [uploadResult, setUploadResult] = useState({ data: null, loading: false, error: null });
    const [file, setFile] = useState(null);
    const fileRef = useRef(null);

    const getExampleData = () => {
        axios.get('/api')
            .then((res) => {
                console.log(res);
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (file) {
            setUploadResult({ data: null, loading: true, error: null });
            const data = new FormData();
            data.append('file', file);
            axios.post('/api/upload', data, {})
                .then((res) => {
                    console.log(res);
                    setUploadResult({ data: null, loading: false, error: null });
                })
                .catch((err) => {
                    console.log(err.response);
                    if (err.response.status === 400) {
                        const { message } = err.response.data;
                        setUploadResult({ data: null, loading: false, error: message });
                    } else {
                        setUploadResult({ data: null, loading: false, error: 'Something went wrong' });
                    }
                });
        }
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
    };

    return (
        <StyledForm>

            <form className="main-submit" onSubmit={onSubmit}>
                <input
                    type="file"
                    ref={fileRef}
                    className="input"
                    onChange={onChange}
                    name={file}
                />
                <button type="button" className="choose-file" onClick={openFileOption}>Choose a File</button>
                <div className="file-uploaded">
                    {file === null || file === undefined ? 'No file chosen' : file.name}
                </div>
                <button type="submit" onSubmit={onSubmit}>Upload</button>
                <button type="button" onClick={getExampleData}>Test Data</button>
            </form>
            {uploadResult.error ? <p className="error">{uploadResult.error}</p> : null }
        </StyledForm>


    );
}

export default UploadForm;
