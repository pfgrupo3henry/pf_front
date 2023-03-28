import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function Loading (){
    return(
        <LoadingOutlined
            style={{
            fontSize: 24,
            }}
            spin
        />
    )
}
export {Loading};