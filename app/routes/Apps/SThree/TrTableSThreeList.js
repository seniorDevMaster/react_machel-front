import React, { useState } from "react"
import PropTypes from "prop-types"

import {
    Col,
    Label,
    Input,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Modal,
    CustomInput,
    Button,
    Card,
    CardBody,
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
} from "../../../components"

import SThree from "../../../model/SThree"

const TrTableSThreeList = (props) => {
    const [modal, setModal] = useState(false)
    const [stdata, setSTData] = useState({
        stId: 10000,
        stUserName: "",
        stPass: "",
        stBkName: "",
        stPriKey: "",
        stPubKey: "",
        stConsole: "",
        stStatus: 0,
    })
    
    const toggle = (index) => {
        if (props.bucketList[index]) {
            setSTData({
                stId: props.bucketList[index].id,
                stUserName: props.bucketList[index].username,
                stBkName: props.bucketList[index].bucket_name,
                stPass: props.bucketList[index].passwd,
                stPriKey: props.bucketList[index].access_key_id,
                stPubKey: props.bucketList[index].secret_access_key,
                stConsole: props.bucketList[index].console,
                stStatus: props.bucketList[index].active,
            })
        }
        setModal(!modal)
    }
    const handleUpdate = async () => {
        if (stdata.stId) {
            const ret = await SThree.update({
                id: stdata.stId,
                username: stdata.stUserName,
                passwd: stdata.stPass,
                bucket_name: stdata.stBkName,
                access_key_id: stdata.stPriKey,
                secret_access_key: stdata.stPubKey,
                console: stdata.stConsole,
                active: stdata.stStatus,
            })

            if (ret.error === 0) {
                alert('Successfully updated')
                if (props.onActionResult) props.onActionResult(ret);
                setModal(!modal)
            }
            else 
                alert('Update Failed.')
        } else {
            const ret = await SThree.add({
                username: stdata.stUserName,
                passwd: stdata.stPass,
                bucket_name: stdata.stBkName,
                access_key_id: stdata.stPriKey,
                secret_access_key: stdata.stPubKey,
                console: stdata.stConsole,
                active: stdata.stStatus,
            })

            if (ret.error === 0) {
                alert('Successfully added.')
                if (props.onActionResult) props.onActionResult(ret);
                setModal(!modal)
            }
            else 
                alert('Add Failed.')
        }
    }
    const handleDelete = async (id) => {
        if(confirm("Are you sure?")) {
            const ret = await SThree.delete({ id: id })
            if (props.onActionResult) props.onActionResult(ret)
        }
    }
    const handleSTData = (e, type) => {
        if (type === 0)
            setSTData({
                stId: stdata.stId,
                stUserName: e.target.value,
                stPass: stdata.stPass,
                stBkName: stdata.stBkName,
                stPriKey: stdata.stPriKey,
                stPubKey: stdata.stPubKey,
                stConsole: stdata.stConsole,
                stStatus: stdata.stStatus,
            })
        else if (type === 1)
            setSTData({
                stId: stdata.stId,
                stUserName: stdata.stUserName,
                stPass: e.target.value,
                stBkName: stdata.stBkName,
                stPriKey: stdata.stPriKey,
                stPubKey: stdata.stPubKey,
                stConsole: stdata.stConsole,
                stStatus: stdata.stStatus,
            })
        else if (type === 2)
            setSTData({
                stId: stdata.stId,
                stUserName: stdata.stUserName,
                stPass: stdata.stPass,
                stBkName: e.target.value,
                stPriKey: stdata.stPriKey,
                stPubKey: stdata.stPubKey,
                stConsole: stdata.stConsole,
                stStatus: stdata.stStatus,
            })
        else if (type === 3)
            setSTData({
                stId: stdata.stId,
                stUserName: stdata.stUserName,
                stPass: stdata.stPass,
                stBkName: stdata.stBkName,
                stPriKey: e.target.value,
                stPubKey: stdata.stPubKey,
                stConsole: stdata.stConsole,
                stStatus: stdata.stStatus,
            })
        else if (type === 4)
            setSTData({
                stId: stdata.stId,
                stUserName: stdata.stUserName,
                stPass: stdata.stPass,
                stBkName: stdata.stBkName,
                stPriKey: stdata.stPriKey,
                stPubKey: e.target.value,
                stConsole: stdata.stConsole,
                stStatus: stdata.stStatus,
            })
        else if (type === 5)
            setSTData({
                stId: stdata.stId,
                stUserName: stdata.stUserName,
                stPass: stdata.stPass,
                stBkName: stdata.stBkName,
                stPriKey: stdata.stPriKey,
                stPubKey: stdata.stPubKey,
                stConsole: e.target.value,
                stStatus: stdata.stStatus,
            })
        else if (type === 6) {
            setSTData({
                stId: stdata.stId,
                stUserName: stdata.stUserName,
                stPass: stdata.stPass,
                stBkName: stdata.stBkName,
                stPriKey: stdata.stPriKey,
                stPubKey: stdata.stPubKey,
                stConsole: stdata.stConsole,
                stStatus: e.target.checked ? 0 : 1
            })
        }
            
    }

    return (
        <React.Fragment>
            
            {props.bucketList.map((element, index) => {
                return (
                    <tr key={index}>
                        <td className="align-middle">{element.username}</td>
                        <td className="align-middle">{element.passwd}</td>
                        <td className="align-middle">{element.bucket_name}</td>
                        <td className="align-middle">{element.access_key_id}</td>
                        <td className="align-middle">{element.secret_access_key}</td>
                        <td className="align-middle">{element.console}</td>
                        <td className="align-middle">
                            {element.active === 0 ? (
                                <span className="badge badge-success">
                                    Active
                                </span>
                            ) : (
                                <span className="badge badge-danger">
                                    Inactive
                                </span>
                            )}
                        </td>
                        <td className="align-middle">
                            <UncontrolledButtonDropdown>
                                <DropdownToggle color="link" className="pr-0">
                                    <i className="fa fa-bars"></i>
                                    <i className="fa fa-angle-down ml-2" />
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => toggle(index)}>
                                        <i className="fa fa-fw fa-edit mr-2"></i>
                                        Update
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={() => handleDelete(element.id)}
                                    >
                                        <i className="fa fa-fw fa-close mr-2"></i>
                                        Delete
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
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
                                        UserID
                                    </Label>
                                    <Col sm={9}>
                                        <InputGroup>
                                            <InputGroupAddon addonType="append">
                                                ID
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Userid..."
                                                id="s3UId"
                                                value={stdata.stUserName}
                                                onChange={()=>handleSTData(event, 0)}
                                            />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="s3Pass" sm={3}>
                                        Password
                                    </Label>
                                    <Col sm={9}>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                ****
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="password..."
                                                id="s3Pass"
                                                value={stdata.stPass}
                                                onChange={()=>handleSTData(event, 1)}
                                            />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="s3BkName" sm={3}>
                                    BucketName
                                    </Label>
                                    <Col sm={9}>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                            BKName
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="BucketName..."
                                                id="s3BkName"
                                                value={stdata.stBkName}
                                                onChange={()=>handleSTData(event, 2)}
                                            />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="s3prikey" sm={3}>
                                        PriKey
                                    </Label>
                                    <Col sm={9}>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                Private Key
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="uQeQCrIjt8w4lmwvhS9lUPuNjbbhtvZ3MRSuB..."
                                                id="s3prikey"
                                                value={stdata.stPriKey}
                                                onChange={()=>handleSTData(event, 3)}
                                            />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="s3pubkey" sm={3}>
                                        PubKey
                                    </Label>
                                    <Col sm={9}>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                Public Key
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="AKIAWYSW5YTGWCT..."
                                                id="s3pubkey"
                                                value={stdata.stPubKey}
                                                onChange={()=>handleSTData(event, 4)}
                                            />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="s3console" sm={3}>
                                        Console
                                    </Label>
                                    <Col sm={9}>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                Console
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="https://2msolutions.signin.aws.amazon.com/console..."
                                                id="s3console"
                                                value={stdata.stConsole}
                                                onChange={()=>handleSTData(event, 5)}
                                            />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="s3status" sm={3}>
                                        Status
                                    </Label>
                                    <Col sm={9}>
                                        <CustomInput
                                            type="checkbox"
                                            id="s3status"
                                            className="pt-2"
                                            label="Active"
                                            defaultChecked={
                                                stdata.stStatus === 0
                                                    ? true
                                                    : false
                                            }
                                            onChange={()=>handleSTData(event, 6)}
                                        />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdate}>
                        Update
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}
TrTableSThreeList.propTypes = {
    id: PropTypes.node,
}
TrTableSThreeList.defaultProps = {
    id: "1",
}

export { TrTableSThreeList }
