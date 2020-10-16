import React, { useState, useEffect } from "react"

import {
    Container,
    Card,
    CardFooter,
    Row,
    Col,
    Table,
} from "../../../components"
import { HeaderMain } from "../../components/HeaderMain"

import { TrTableSystemList } from "./TrTableSystemList"
import CustomSizePerPageButton from "../../components/CustomSizePerPageButton"
import { CustomPaginationTotal } from "../../components/CustomPaginationTotal"

import { Paginations } from "../../components/Paginations"

import System from "../../../model/System"

export default function SystemList() {
    const [data, setData] = useState([])
    const [dataCount, setDataCount] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [currSizePerPage, setCurrSizePerPage] = useState(5)
    const options = [{ page: 5 }, { page: 10 }, { page: 20 }]

    const [sysData, setSysData] = useState({
        modality: "",
        record_time: "",
        study_uid: "",
        study_instance_uid: "",
        patient_name: "",
        institution_name: "",
    })

    useEffect(() => {
        fetchData(currPage, currSizePerPage)
    }, [])

    const fetchData = async (_currPage, _currSizePerPage) => {
        const ret2 = await System.list({
            page_index: _currPage,
            page_size: _currSizePerPage,
        })

        if (ret2.error === 0) {
            setData(ret2.list)
            setDataCount(ret2.history_count)
        }
    }
    const handleActionResult = (ret) => {
        if (ret.error === 0) fetchData(currPage, currSizePerPage)
    }
    const handlePageSelection = (_currPage) => {
        setCurrPage(_currPage)
        fetchData(_currPage, currSizePerPage)
    }
    const handleSizePerPageChange = (_currSizePerPage) => {
        setCurrSizePerPage(_currSizePerPage)
        fetchData(currPage, _currSizePerPage)
    }
    const handleSearch = (e, type) => {
        if (type === 0)
            setSysData({
                institution_name: e.target.value,
                modality: sysData.modality,
                patient_name: sysData.patient_name,
                record_time: sysData.record_time,
                study_instance_uid: sysData.study_instance_uid,
                study_uid: sysData.study_uid,
            })
        if (type === 1)
            setSysData({
                institution_name: sysData.institution_name,
                modality: e.target.value,
                patient_name: sysData.patient_name,
                record_time: sysData.record_time,
                study_instance_uid: sysData.study_instance_uid,
                study_uid: sysData.study_uid,
            })
        if (type === 2)
            setSysData({
                institution_name: sysData.institution_name,
                modality: sysData.modality,
                patient_name: e.target.value,
                record_time: sysData.record_time,
                study_instance_uid: sysData.study_instance_uid,
                study_uid: sysData.study_uid,
            })
        if (type === 3)
            setSysData({
                institution_name: sysData.institution_name,
                modality: sysData.modality,
                patient_name: sysData.patient_name,
                record_time: e.target.value,
                study_instance_uid: sysData.study_instance_uid,
                study_uid: sysData.study_uid,
            })
        if (type === 4)
            setSysData({
                institution_name: sysData.institution_name,
                modality: sysData.modality,
                patient_name: sysData.patient_name,
                record_time: sysData.record_time,
                study_instance_uid: e.target.value,
                study_uid: sysData.study_uid,
            })
        if (type === 5)
            setSysData({
                institution_name: sysData.institution_name,
                modality: sysData.modality,
                patient_name: sysData.patient_name,
                record_time: sysData.record_time,
                study_instance_uid: sysData.study_instance_uid,
                study_uid: e.target.value,
            })
    }
    const handleCheckEnter = async (e) => {
        console.log(e.keyCode )
        if (e.keyCode === 13) {
            const ret2 = await System.search({
                page_index: currPage,
                page_size: currSizePerPage,
                modality: sysData.modality,
                record_time: sysData.record_time,
                study_uid: sysData.study_uid,
                study_instance_uid: sysData.study_instance_uid,
                patient_name: sysData.patient_name,
                institution_name: sysData.institution_name,
            })
            console.log("ret2 : ', ", ret2)

            if (ret2.error === 0) {
                setData(ret2.list)
                setDataCount(ret2.history_count)
            }
            // event.preventDefault();
            // return false;
            // e.preventDefault();
        }
    }
    return (
        <React.Fragment>
            <Container style={{ maxWidth: "1550px" }}>
                <HeaderMain title="System Logs" className="mb-5 mt-4" />
                <Row>
                    <Col lg={ 12 }>
                        <Card className="mb-3">
                            <div className="table-responsive">
                                <Table className="mb-0" hover>
                                    <thead>
                                        <tr>
                                        <th className="align-middle bt-0 text-center">
                                            accession_number
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            cloud_file_path
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            image_type
                                            </th>
                                            <th className="align-middle bt-0 text-center sortable">
                                                <div className="d-flex align-items-baseline">
                                                institution_name
                                                    <i className="fa fa-fw fa-sort text-muted"></i>
                                                </div>
                                                <div>
                                                    <input placeholder="institution_name..." type="text" className="bg-white form-control-sm form-control" value={sysData.institution_name} onKeyDown={handleCheckEnter} onChange={()=>handleSearch(event, 0)} />
                                                </div>
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            manufacturer
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            manufacturer_model_name
                                            </th>
                                            <th className="align-middle bt-0 text-center sortable">
                                                <div className="d-flex align-items-baseline">
                                                modality
                                                    <i className="fa fa-fw fa-sort text-muted"></i>
                                                </div>
                                                <div>
                                                    <input placeholder="modality..." type="text" className="bg-white form-control-sm form-control" value={sysData.modality} onKeyDown={handleCheckEnter} onChange={()=>handleSearch(event, 1)} />
                                                </div>
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            patient_age
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            patient_birthday
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            patient_id
                                            </th>
                                            <th className="align-middle bt-0 text-center sortable">
                                                <div className="d-flex align-items-baseline">
                                                patient_name
                                                    <i className="fa fa-fw fa-sort text-muted"></i>
                                                </div>
                                                <div>
                                                    <input placeholder="patient_name..." type="text" className="bg-white form-control-sm form-control" value={sysData.patient_name} onKeyDown={handleCheckEnter} onChange={()=>handleSearch(event, 2)} />
                                                </div>
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            patient_sex
                                            </th>
                                            <th className="align-middle bt-0 text-center sortable">
                                                <div className="d-flex align-items-baseline">
                                                record_time
                                                    <i className="fa fa-fw fa-sort text-muted"></i>
                                                </div>
                                                <div>
                                                    <input placeholder="record_time..." type="text" className="bg-white form-control-sm form-control" value={sysData.record_time} onKeyDown={handleCheckEnter} onChange={()=>handleSearch(event, 3)} />
                                                </div>
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            sop_class_uid
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            sop_instance_uid
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            station_name
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            study_date
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            study_description
                                            </th>
                                            <th className="align-middle bt-0 text-center sortable">
                                                <div className="d-flex align-items-baseline">
                                                study_instance_uid
                                                    <i className="fa fa-fw fa-sort text-muted"></i>
                                                </div>
                                                <div>
                                                    <input placeholder="study_instance_uid..." type="text" className="bg-white form-control-sm form-control" value={sysData.study_instance_uid} onKeyDown={handleCheckEnter} onChange={()=>handleSearch(event, 4)} />
                                                </div>
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            study_time
                                            </th>
                                            <th className="align-middle bt-0 text-center sortable">
                                                <div className="d-flex align-items-baseline">
                                                study_uid
                                                    <i className="fa fa-fw fa-sort text-muted"></i>
                                                </div>
                                                <div>
                                                    <input placeholder="study_uid..." type="text" className="bg-white form-control-sm form-control" value={sysData.study_uid} onKeyDown={handleCheckEnter} onChange={()=>handleSearch(event, 5)} />
                                                </div>
                                            </th>
                                            <th className="align-middle bt-0 text-center">
                                            Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <TrTableSystemList
                                            data={data}
                                            onActionResult={handleActionResult}
                                        />
                                    </tbody>
                                </Table>
                            </div>
                            <CardFooter className="d-flex justify-content-between pb-0">
                                <div>
                                    <CustomSizePerPageButton currSizePerPage={currSizePerPage} options={options} onSizePerPageChange={handleSizePerPageChange} />
                                    <CustomPaginationTotal from={currPage*currSizePerPage} to={currPage*currSizePerPage+currSizePerPage} size={dataCount} />
                                </div>
                                <Paginations count={dataCount} currPage={currPage} currSizePerPage={currSizePerPage} onPageResult={handlePageSelection} />
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
