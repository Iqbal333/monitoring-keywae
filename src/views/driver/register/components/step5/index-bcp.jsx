import { Button, Card, message } from 'antd'
import React from 'react'
import FormStep from '@/components/Form'
import { useForm } from 'antd/es/form/Form'
import { useEffect } from 'react'
import { useState } from 'react'
import { getBrand } from '@/api/master/brand'
import { getSubBrand } from '@/api/master/subBrand'
import { addVehicle, getVehicle } from '@/api/register'
import { IS_EMPTY_OBJECT, getYearMake } from '@/utils/global'

export default function Step5(props) {

    const [formRef] = useForm()
    const [messageApi, contextHandler] = message.useMessage()

    const [vehicleRegNumberPreview, setVehicleRegNumberPreview] = useState(null)
    const [brand, setBrand] = useState([])
    const [subBrand, setSubBrand] = useState([])
    const [yearMake, setYearMake] = useState([])

    const [selectedBrand, setSelectedBrand] = useState("")
    const [isEdit, setIsEdit]               = useState(false)

    useEffect(() => {
        getBrand()
            .then((results) => {
                if (results.data.success) {
                    setBrand(results.data.results)
                }
            })
        
        setYearMake(getYearMake())

        getVehicle()
            .then((results) => {
                if (results.data.success) {
                    if (IS_EMPTY_OBJECT(results.data.results) === false) {
                        let data = results.data.results
                        data.subBrandId = {
                            label: data.subBrandName,
                            value: data.subBrandId
                        }
                        setIsEdit(true)
                        formRef.setFieldsValue(data)
                    }
                }
            })

        return () => {
            return false
        }
    },[])

    useEffect(() => {
        if (selectedBrand != "") {
            getSubBrand(selectedBrand)
                .then((results) => {
                    if (results.data.success) {
                        setSubBrand(results.data.results)
                    }
                })
        }

        return () => {
            return false
        }
    },[selectedBrand])

    const validateNumber = async (_,values) => {
        if (!isNaN(parseInt(values))) {
            return Promise.resolve(values)
        }
        return Promise.reject(new Error('Invalid Number'))
    }

    const inputs = [
        {
            name: 'vehicleRegNumberFile',
            key: 'vehicleRegNumberFile',
            type: 'file',
            onFileChange: (value) => {
                setVehicleRegNumberPreview(URL.createObjectURL(value))
            },
            preview: vehicleRegNumberPreview,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'plateNumber',
            key: 'plateNumber',
            label: 'Plate Number',
            labelCol: { span: 6 },
            rules: [
                {
                    required: true,
                    validator: validateNumber
                }
            ]
        },
        {
            name: 'plateNumber',
            key: 'plateNumber',
            label: 'Plate Number',
            labelCol: { span: 6 },
            rules: [
                {
                    required: true,
                    validator: validateNumber
                }
            ]
        },
        {
            name: 'brandId',
            key: 'brandId',
            label: 'Brand',
            labelCol: { span: 6 },
            fieldNames: {
                label: 'brandName',
                value: 'brandId'
            },
            onChange: (value) => {
                setSelectedBrand(value)
            },
            type: 'select',
            options: brand,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'subBrandId',
            key: 'subBrandId',
            label: 'Sub Brand',
            labelCol: { span: 6 },
            fieldNames: {
                label: 'subBrandName',
                value: 'subBrandId'
            },
            type: 'select',
            options: subBrand,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'yearMake',
            key: 'yearMake',
            label: 'Year Make',
            labelCol: { span: 6 },
            type: 'select',
            options: yearMake,
            rules: [
                {
                    required: true,
                    validator: validateNumber
                }
            ]
        }
    ]

    const onSubmit = () => {
        formRef.validateFields()
            .then((values) => {
                if (isEdit) {
                    values.subBrandId = values.subBrandId?.value
                }
                addVehicle(values)
                    .then((results) => {
                        if (results.data.success) {
                            messageApi.success({
                                content: results.data.message,
                                duration: 1
                            })
                            props.refresh()
                        } else {
                            messageApi.error({
                                content: results.data.message,
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
            .catch((err) => {
                messageApi.error({
                    content: err.message,
                    duration: 1
                })
            })
    }

  return (
    <Card>
        {contextHandler}
        <FormStep formRef={formRef} inputs={inputs} />
        <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <Button type="default" onClick={props.prevStep}>
                Previous
            </Button>
            <Button type="primary" onClick={onSubmit}>
                Next
            </Button>
        </div>
    </Card>
  )
}