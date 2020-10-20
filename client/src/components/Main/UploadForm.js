import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Popup } from 'semantic-ui-react';
import colors from '../../styles/colors';
import AnalysisContext from '../Context/AnalysisContext';
import 'semantic-ui-css/semantic.min.css'

const StyledForm = styled.div`
	background-color: ${colors.pink_main};
	border-radius: 25px;
	width: 60%;
	min-width: 300px;
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
			outline: none;
			transition: all ease-out 0.25s;
			margin: 0 5px;
			min-height: 40px;

			&:hover {
				color: ${colors.pink_main};
				background: ${colors.darkblue_text};
			};

			&.disabled {
				cursor: default;
				background: #778899;
				&:hover {
					color: ${colors.pink_main};
				}
			}
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
		flex-grow: 1;
		margin-left: 20px;
	}
`;

const StyledDescription = styled.div`
	margin-top: 10px;
	padding-top: 5px;
	border-top: 2px solid ${colors.darkblue_text};
	p {
		color: ${colors.darkblue_text}
	}
`;


function UploadForm() {
	const [ file, setFile ] = useState(null);
	const fileRef = useRef(null);
	const { analysisState, setAnalysisState } = useContext(AnalysisContext);
	const { error } = analysisState;

	const getExampleData = () => {
		setAnalysisState({data: null, loading: true});
		axios.get('/api')
			.then((res) => {
				setAnalysisState({data: res.data, loading: false});
			});
	};

	const getExampleVCF = () => {
		axios.get('/api/exampleVCF')
			.then((res) => {
				const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
				const link = document.createElement('a');
				link.href = downloadUrl;
				link.setAttribute('download', 'exampleVCF.vcf'); //any other extension
				document.body.appendChild(link);
				link.click();
				link.remove();

			});

	}

	const onSubmit = (e) => {
		e.preventDefault();
		if (file) {
			setAnalysisState({ data: null, loading: true });
			const data = new FormData();
			data.append('file', file);
			axios.post('/api/upload', data, {})
			// axios.get('/api/upload')
				.then((res) => {
					setFile(null)
					setAnalysisState({ data: res.data, loading: false });
				})
				.catch((err) => {
					console.log(err.response);
					setFile(null)
					if (err.response.status >= 400) {
						const { message } = err.response.data;
						setAnalysisState({ data: null, loading: false, error: message });
					} else {
						setAnalysisState({ data: null, loading: false, error: 'Something went wrong' });
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
				<button type="button" className="choose-file" onClick={openFileOption}>Choose VCF File</button>
				<div className="file-uploaded">
					{file === null || file === undefined ? 'No file chosen' : file.name}
				</div>
				<button type="submit" onSubmit={onSubmit} disabled={!file} className={!file ?'disabled' : null}>Analyze</button>
				<Popup hoverable trigger={<button type="button" onClick={getExampleData}>Test</button>}>
					<Popup.Content>
						<p>Provides example analysis output to showcase CCLid functionality</p>
					</Popup.Content>
				</Popup>
			</form>
			<StyledDescription>
				<p>VCF’s are the text-file standards for presenting single-site genomic information.
				<br />CCLid is tested on single sample VCFs generated from standard mutation callers such as samtools, varscan2, Mutect, and Mutect2.
				Example downloadable file <a href="#" className="dl_link" onClick={getExampleVCF}>here</a>.</p>
			</StyledDescription>
			{error ? <p className="error">{error}</p> : null }
		</StyledForm>


	);
}

export default UploadForm;
