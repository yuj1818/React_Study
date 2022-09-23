import React, { useState } from "react";
import { Typography, Button, Form, message, Input } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"}
]

const CategoryOptions = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"},
]

function VideoUploadPage() {

    const navigate = useNavigate();

    //redux 사용하여 state에서 user 정보를 가져옴
    const user = useSelector(state => state.user);
    const [VideoTitle, setVideoTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState('Film & Animation');
    const [FilePath, setFilePath] = useState('');
    const [Duration, setDuration] = useState('');
    const [ThumbnailPath, setThumbnailPath] = useState('');

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)

                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }

                    setFilePath(response.data.url)

                    axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if(response.data.success) {

                                setDuration(response.data.fileDuration)
                                setThumbnailPath(response.data.url)

                            } else {
                                alert('썸네일 생성 실패')
                            }
                        })
                } else {
                    alert('비디오 업로드 실패')
                }
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath,
        }

        axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if(response.data.success) {
                    message.success('업로드 성공')

                    setTimeout(() => {
                        navigate('/')
                    },3000)
                } else {
                    alert('비디오 업로드 실패')
                }
            })
    }

    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display:'flex', justifyContent:'space-between'}}>
                    {/*DropZone*/}
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={1000000000}
                    >
                        {({ getRootProps, getInputProps}) => (
                            <div style={{ width:'300px', height:'240px', border:'1px solid lightgray', display:'flex',
                            alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <PlusOutlined style={{ fontSize:'3rem' }} />
                            </div>
                    )}
                    </Dropzone>

                    {/*Thumbnail*/}
                    {ThumbnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail"/>
                        </div>
                    }
                </div>
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />
                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br />
                <br />
                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage