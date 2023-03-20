import React from "react";
import { Avatar, Card } from 'antd';




function CardDetail() {

    const { Meta } = Card;


    return (

        <div>


            <Card
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
            >
                <Meta
                    title="Card title"
                    description="This is the description"
                />
            </Card>

            <br></br>

            <Meta
                avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                description="This is the description"
            />

        </div>
    );

};

export default CardDetail;