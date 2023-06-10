import { Link } from "react-router-dom";
import { Button } from 'antd';
import { ArrowLeftOutlined } from "@ant-design/icons";

export const BtnBack = (props) => {
    return(
        <Link to={props.to}>
            <Button style={{fontSize: '16px', fontWeight: '500'}} type="text" icon={<ArrowLeftOutlined />}>{props.children}</Button>
        </Link>
    )
}