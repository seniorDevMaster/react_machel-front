import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import {
    Col,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
    CustomInput,
} from "../../../components"
import System from "../../../model/System"

const TrTableSystemList = (props) => {
    const [stList, setSTList] = useState([])
    const [path, setPath] = useState()
    const [s3Id, setS3Id] = useState()
    const [downPath, setDownPath] = useState()
    const [modal, setModal] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const ret = await System.listAll()
        console.log("fetchdata : ", ret)
        if (ret.error === 0) {
            setSTList(ret.list)
        }
    }

    const toggle = (path) => {
        setDownPath('')
        setPath(path)
        setModal(!modal)
    }
    const handleDownload = async () => {
        console.log("handleDownload 1111 : ", s3Id, path)
        if (!s3Id || s3Id === '-1') {
            alert('Please select the UserID.')
            return
        }
        const ret = await System.download({s3_id: s3Id, file_name: path})
        console.log("handleDownload : ", ret)
        if (ret.error === 0) {
            setDownPath(ret.url)
        }
    }
    const handleSTIDChange = (e) => {
        console.log( e.target.value)
        if (e.target.value === '-1') {
            alert('Please select the UserID.')
            return
        } else {
            setS3Id(e.target.value)
        }
    }
    return (
        <React.Fragment>
            {props.data.map((element, index) => {
                return (
                    <tr key={index}>
                        <td className="align-middle">
                            {element.accession_number}
                        </td>
                        <td className="align-middle">
                            {element.cloud_file_path}
                        </td>
                        <td className="align-middle">{element.image_type}</td>
                        <td className="align-middle">
                            {element.institution_name}
                        </td>
                        <td className="align-middle">{element.manufacturer}</td>
                        <td className="align-middle">
                            {element.manufacturer_model_name}
                        </td>
                        <td className="align-middle">{element.modality}</td>
                        <td className="align-middle">{element.patient_age}</td>
                        <td className="align-middle">
                            {element.patient_birthday}
                        </td>
                        <td className="align-middle">{element.patient_id}</td>
                        <td className="align-middle">{element.patient_name}</td>
                        <td className="align-middle">{element.patient_sex}</td>
                        <td className="align-middle">{element.record_time}</td>
                        <td className="align-middle">
                            {element.sop_class_uid}
                        </td>
                        <td className="align-middle">
                            {element.sop_instance_uid}
                        </td>
                        <td className="align-middle">{element.station_name}</td>
                        <td className="align-middle">{element.study_date}</td>
                        <td className="align-middle">
                            {element.study_description}
                        </td>
                        <td className="align-middle">
                            {element.study_instance_uid}
                        </td>
                        <td className="align-middle">{element.study_time}</td>
                        <td className="align-middle">{element.study_uid}</td>
                        <td className="align-middle">
                            <Button
                                color="primary"
                                onClick={() => toggle(element.cloud_file_path)}
                            >
                                Download
                            </Button>
                        </td>
                    </tr>
                )
            })}
            <Modal
                isOpen={modal}
                toggle={toggle}
                className="modal-outline-info"
            >
                <ModalHeader toggle={toggle}>Bucket Update</ModalHeader>
                <ModalBody>
                    <Card className="mb-3">
                        <CardBody>
                            <Form>
                                <FormGroup row>
                                    <Label for="s3UId" sm={3}>
                                        S3ID
                                    </Label>
                                    <Col sm={9}>
                                        <InputGroup>
                                            <CustomInput
                                                type="select"
                                                id="s3Id"
                                                
                                                onChange={handleSTIDChange}
                                            >
                                                <option key='-1' value='-1'>Select ID...</option>
                                                {stList.map((ele) => {
                                                    return (
                                                        <option
                                                            key={ele.id}
                                                            value={ele.id}
                                                        >
                                                            {ele.bucket_name}
                                                        </option>
                                                    )
                                                })}
                                            </CustomInput>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}>FileName</Label>
                                    <Col sm={9}>
                                        <InputGroup>
                                            <Input
                                                placeholder="filename..."
                                                defaultValue={path}
                                            />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    {/* <Label sm={3}>DownloadURL</Label> */}
                                    <Col sm={12}>
                                        {downPath}
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleDownload}>
                        Download
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}
TrTableSystemList.propTypes = {
    id: PropTypes.node,
}
TrTableSystemList.defaultProps = {
    id: "1",
}

export { TrTableSystemList }
