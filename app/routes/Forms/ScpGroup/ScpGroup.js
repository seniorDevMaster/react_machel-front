import React, { useState, useEffect } from "react"

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Button,
    InputGroup,
    InputGroupAddon,
    Form,
    FormGroup,
    Label,
    Input,
} from "../../../components"
import { HeaderMain } from "../../components/HeaderMain"

import User from "../../../model/User"

export default function ScpGroup(props) {
    const [scpData, setScpData] = useState({
        scpId: "",
        scpPort: "",
        scpTitle: "",
        scpLocalPath: "",
        scpModalityIgnore: "",
    })
    const [connectionStatus, setConnectionStatus] = useState(true)
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const _scpConnectionStatus = await User.getSCPStatus()
        if (_scpConnectionStatus.error === 0)
            setConnectionStatus(_scpConnectionStatus.status)

        const _scpData = await User.getSCP()
        if (_scpData.error === 0) {
            setScpData({
                scpId: _scpData.id,
                scpPort: _scpData.port,
                scpTitle: _scpData.ae_title,
                scpLocalPath: _scpData.local_path,
                scpModalityIgnore: _scpData.modality_ignore,
            })
        }
    }

    const handleSCPStart = async () => {
        const _scpStatus1 = await User.handleSCPStart()
        if (_scpStatus1.error === 0) setConnectionStatus(_scpStatus1.status)
    }

    const handleSCPStop = async () => {
        const _scpStatus2 = await User.handleSCPStop()
        if (_scpStatus2.error === 0) setConnectionStatus(_scpStatus2.status)
    }

    const handleSCPUpdate = async () => {
        const ret = await User.handleSCPUpdate({
            id: scpData.scpId,
            port: scpData.scpPort,
            ae_title: scpData.scpTitle,
            local_path: scpData.scpLocalPath,
            modality_ignore: scpData.scpModalityIgnore,
        })
        if (ret.error === 0) 
            alert('Update Success.')
        else 
            alert('Update Failed.')
    }
    const handleSCPData = (e, type) => {
        const re = /^[0-9\b]+$/

        if (
            type === 0 &&
            (e.target.value === "" || re.test(parseInt(e.target.value)))
        )
            setScpData({
                scpId: parseInt(e.target.value),
                scpPort: scpData.scpPort,
                scpTitle: scpData.scpTitle,
                scpLocalPath: scpData.scpLocalPath,
                scpModalityIgnore: scpData.scpModalityIgnore,
            })
        else if (type === 1)
            setScpData({
                scpId: scpData.scpId,
                scpPort: scpData.scpPort,
                scpTitle: e.target.value,
                scpLocalPath: scpData.scpLocalPath,
                scpModalityIgnore: scpData.scpModalityIgnore,
            })
        else if (type === 2)
            setScpData({
                scpId: scpData.scpId,
                scpPort: scpData.scpPort,
                scpTitle: scpData.scpTitle,
                scpLocalPath: e.target.value,
                scpModalityIgnore: scpData.scpModalityIgnore,
            })
        else if (type === 3)
            setScpData({
                scpId: scpData.scpId,
                scpPort: scpData.scpPort,
                scpTitle: scpData.scpTitle,
                scpLocalPath: scpData.scpLocalPath,
                scpModalityIgnore: e.target.value,
            })
        else if (
            type === 4 &&
            (e.target.value === "" || re.test(parseInt(e.target.value)))
        )
            setScpData({
                scpId: scpData.scpId,
                scpPort: parseInt(e.target.value),
                scpTitle: scpData.scpTitle,
                scpLocalPath: scpData.scpLocalPath,
                scpModalityIgnore: scpData.scpModalityIgnore,
            })
    }

    return (
        <React.Fragment>
            <Container>
                <div className="d-flex">
                    <div>
                        <HeaderMain title="SCP Groups" className="mb-5 mt-4" />
                    </div>
                    {connectionStatus ? (
                        <span
                            className="fs-20 badge-success ml-auto align-self-center"
                            style={{
                                borderRadius: '5px',
                                padding: '0 5px'
                            }}
                        >
                            Connected
                        </span>
                    ) : (
                        <span
                            className="fs-20 badge-danger ml-auto align-self-center"
                            style={{
                                borderRadius: '5px',
                                padding: '0 5px'
                            }}
                        >
                            Connection Lost
                        </span>
                    )}
                </div>

                <Row>
                    <Col lg={12}>
                        <div style={{ float: "right", marginBottom: "1rem" }}>
                            <Button
                                color="primary"
                                className="mr-2"
                                onClick={handleSCPStart}
                            >
                                SCP Start
                            </Button>
                            <Button
                                color="primary"
                                className="mr-2"
                                onClick={handleSCPStop}
                            >
                                SCP Stop
                            </Button>
                            <Button color="primary" onClick={handleSCPUpdate}>
                                SCP Update
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Card className="mb-3">
                            <CardBody>
                                <Form>
                                    <FormGroup row>
                                        <Label for="scpId" sm={3}>
                                            ID
                                        </Label>
                                        <Col sm={9}>
                                            <InputGroup>
                                                <InputGroupAddon addonType="append">
                                                    SCP
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="81..."
                                                    id="scpId"
                                                    value={scpData.scpId}
                                                    onChange={() =>
                                                        handleSCPData(event, 0)
                                                    }
                                                />
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="scpTitle" sm={3}>
                                            Title
                                        </Label>
                                        <Col sm={9}>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    SCP
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="SERVIDOR..."
                                                    id="scpTitle"
                                                    value={scpData.scpTitle}
                                                    onChange={() =>
                                                        handleSCPData(event, 1)
                                                    }
                                                />
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="scpLocalPath" sm={3}>
                                            LocalPath
                                        </Label>
                                        <Col sm={9}>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    www.maciel.com
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="/files/store"
                                                    id="urlAddon"
                                                    value={scpData.scpLocalPath}
                                                    onChange={() =>
                                                        handleSCPData(event, 2)
                                                    }
                                                />
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="scpModalityIgnore" sm={3}>
                                            MondalityIgnore
                                        </Label>
                                        <Col sm={9}>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    SCP
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="SR..."
                                                    id="scpModalityIgnore"
                                                    value={
                                                        scpData.scpModalityIgnore
                                                    }
                                                    onChange={() =>
                                                        handleSCPData(event, 3)
                                                    }
                                                />
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="scpPort" sm={3}>
                                            Port
                                        </Label>
                                        <Col sm={9}>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    SCP
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="1111..."
                                                    id="scpPort"
                                                    value={scpData.scpPort}
                                                    onChange={() =>
                                                        handleSCPData(event, 4)
                                                    }
                                                />
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
