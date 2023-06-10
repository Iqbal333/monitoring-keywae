import React from 'react';
import { Button, Modal } from 'antd';
import { message } from 'antd';
import { deleteCategory } from '@/api/auction/auction/deleteCategory';
import { deleteCategoryType } from '@/api/auction/auction/deleteCategoryType';

export default function DeleteCategoryType(props) {
    const [messageApi, contextHandler] = message.useMessage();

    const handleBtnDelete = () => {
        deleteCategoryType({"auctionTypeId" : props.datas.auctionTypeId})
            .then((results) => {
                if (results.data.success) {
                    messageApi.success({
                        content: 'Sub Kategori Berhasil Dihapus!',
                        duration: 1,
                    });
                    props.refresh();

                } else {
                    messageApi.error({
                      content: results.data.message,
                      duration: 1,
                    });
                }
            })
            .catch((errorInfo) => {
                messageApi.error({
                    content: errorInfo.message,
                    duration: 1,
                });
            });
    }

    return (
        <>
            {contextHandler}
            <Modal
                title='Hapus Sub Kategori'
                open={props.open}
                onCancel={props.onCancel}
                okText='Add'
                confirmLoading={props.confirmLoading}
                destroyOnClose={true}
                footer={[
                    <Button key="reject" onClick={handleBtnDelete} style={{ backgroundColor: 'red', color: 'white'}}>
                        Hapus
                    </Button>
                ]}
            >
                <p style={{fontSize: '16px'}}>Apakah Anda akan menghapus Sub Kategori "{props.datas.name}" ?.</p>
            </Modal>
        </>
    );
}
