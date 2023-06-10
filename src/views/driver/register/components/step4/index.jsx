import { getGender } from '@/api/master/gender'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Button, Card, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import FormStep from '@/components/Form'
import { getRegion } from '@/api/master/region'
import { getDistrict } from '@/api/master/district'
import { getSubDistrict } from '@/api/master/subDistrict'
import { getVillage } from '@/api/master/village'
import { addIdNumber, getDocs, getIdNumber, uploadIdNumber } from '@/api/register'
import dayjs from 'dayjs'
import { IS_EMPTY_OBJECT } from '@/utils/global'

export default function Step4(props) {

    const [formRef] = useForm()
    const [messageApi, contextHandler] = message.useMessage()

    const [isEdit, setIsEdit] = useState(false)

    const [idNumberPreview, setIdNumberPreview] = useState(null)
    const [gender, setGender] = useState([])

    const [regionId, setRegionId] = useState(null)
    const [region, setRegion] = useState([])

    const [districtId, setDistrictId] = useState(null)
    const [district, setDistrict] = useState([])

    const [subDistrictId, setSubDistrictId] = useState(null)
    const [subDistrict, setSubDistrict] = useState([])

    const [village, setVillage] = useState([])

    useEffect(() => {
        getGender()
            .then((res) => {
                if (res.data.success) {
                    setGender(res.data.results)
                }
            })
        
        getRegion()
            .then((res) => {
                if (res.data.success) {
                    setRegion(res.data.results)
                }
            })

        getIdNumber()
            .then((res) => {
                if (res.data.success) {
                    let data = res.data.results
                    data.birthDate = data.birthDate ? dayjs(data.birthDate,'YYYY-MM-DD') : dayjs()
                    setRegionId(data.regionId)
                    setDistrictId(data.districtId)
                    setSubDistrictId(data.subDistrictId)
                    formRef.setFieldsValue(res.data.results)
                }
            })

        getDocs()
            .then((res) => {
                if (res.data.success) {
                    if (IS_EMPTY_OBJECT({
                        idNumberFile: res.data.results.idNumberFile
                    }) === false) {
                        setIdNumberPreview(res.data.results.idNumberFile)
                        setIsEdit(true)
                    }
                }
            })
    },[])

    useEffect(() => {
        if (regionId !== null) {
            setDistrictId(null)
            setDistrict([])
            setSubDistrictId(null)
            setSubDistrict([])
            setVillage([])

            getDistrict(regionId)
                .then((res) => {
                    if (res.data.success) {
                        setDistrict(res.data.results)
                    }
                })
        }
    },[regionId])

    useEffect(() => {
        if (districtId !== null) {
            setSubDistrictId(null)
            setSubDistrict([])
            setVillage([])

            getSubDistrict(districtId)
                .then((res) => {
                    if (res.data.success) {
                        setSubDistrict(res.data.results)
                    }
                })
        }
    },[districtId])

    useEffect(() => {
        if (subDistrictId !== null) {
            setVillage([])

            getVillage(subDistrictId)
                .then((res) => {
                    if (res.data.success) {
                        setVillage(res.data.results)
                    }
                })
        }
    },[subDistrictId])

    const inputs = [
        {
            name: 'idNumberFile',
            key: 'idNumberFile',
            type: 'file',
            accept: 'image/png, image/jpeg',
            onFileChange: (values) => {
                setIdNumberPreview(URL.createObjectURL(values))
            },
            preview: idNumberPreview,
            rules: [
                {
                    required: !isEdit
                }
            ]
        },
        {
            name: 'idNumber',
            key: 'idNumber',
            label: 'Nomor Identitas',
            labelCol: { span: 6 },
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'birthPlace',
            key: 'birthPlace',
            label: 'Tempat Lahir',
            labelCol: { span: 6 },
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'birthDate',
            key: 'birthDate',
            label: 'Tanggal Lahir',
            labelCol: { span: 6 },
            type: 'datepicker',
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'genderId',
            key: 'genderId',
            label: 'Jenis Kelamin',
            labelCol: { span: 6 },
            type: 'select',
            fieldNames: {
                label: 'gender',
                value: 'genderId'
            },
            options: gender
        },
        {
            name: 'address',
            key: 'address',
            label: 'Alamat',
            labelCol: { span: 6 },
            type: 'textarea',
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'regionId',
            key: 'regionId',
            label: 'Provinsi',
            type: 'select',
            labelCol: { span: 6 },
            fieldNames: {
                label: 'name',
                value: 'regionId'
            },
            onChange: (values) => {
                setRegionId(values)
            },
            rules: [
                {
                    required: true
                }
            ],
            options: region
        },
        {
            name: 'districtId',
            key: 'districtId',
            label: 'Kabupaten/Kota',
            type: 'select',
            labelCol: { span: 6 },
            fieldNames: {
                label: 'name',
                value: 'districtId'
            },
            onChange: (values) => {
                setDistrictId(values)
            },
            rules: [
                {
                    required: true
                }
            ],
            options: district
        },
        {
            name: 'subDistrictId',
            key: 'subDistrictId',
            label: 'Kecamatan',
            type: 'select',
            labelCol: { span: 6 },
            fieldNames: {
                label: 'name',
                value: 'subDistrictId'
            },
            onChange: (values) => {
                setSubDistrictId(values)
            },
            rules: [
                {
                    required: true
                }
            ],
            options: subDistrict
        },
        {
            name: 'villageId',
            key: 'villageId',
            label: 'Kelurahan',
            type: 'select',
            labelCol: { span: 6 },
            fieldNames: {
                label: 'name',
                value: 'villageId'
            },
            rules: [
                {
                    required: true
                }
            ],
            options: village
        },
        {
            name: 'postalCode',
            key: 'postalCode',
            label: 'Kode Pos',
            labelCol: { span: 6 },
            rules: [
                {
                    required: true
                }
            ]
        }
    ]

    const onSubmit = () => {
        formRef.validateFields()
            .then((values) => {
                values.birthDate = values.birthDate.format('YYYY-MM-DD')
                Promise.all([uploadIdNumber(values),addIdNumber(values)])
                    .then((res) => {
                        if (res[0].data.success) {
                            messageApi.success({
                                content: res[0].data.message,
                                duration: 1
                            })
                            props.refresh()
                        } else {
                            messageApi.error({
                                content: res[0].data.message,
                                duration: 1
                            })
                        }
                    })
                    .catch((err) => {
                        messageApi.error({
                            content: err.message,
                            duration: 1
                        })
                    })
            })
    }

  return (
    <Card>
        {contextHandler}
        <FormStep formRef={formRef} inputs={inputs} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type='default' onClick={props.prevStep} icon={<ArrowLeftOutlined />}>
            Prev
          </Button>
          <Button type="primary" onClick={onSubmit}>
                Next
                <ArrowRightOutlined />
            </Button>
        </div>
    </Card>
  )
}
