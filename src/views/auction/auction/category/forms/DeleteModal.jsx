import React from 'react';
import { Button, Modal } from 'antd';
import { message } from 'antd';
import { deleteCategory } from '@/api/auction/auction/deleteCategory';

export default function DeleteCategory(props) {
    const [messageApi, contextHandler] = message.useMessage();

    const handleBtnDelete = () => {
        deleteCategory({"auctionCategoryId" : props.datas.auctionCategoryId})
            .then((results) => {
                if (results.data.success) {
                    messageApi.success({
                        content: 'Kategori Berhasil Dihapus!',
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
                title='Hapus Kategori'
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
                <p style={{fontSize: '16px'}}>Apakah Anda akan menghapus Kategori "{props.datas.name}" ?.</p>
            </Modal>
        </>
    );
}
