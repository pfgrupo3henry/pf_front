import { useState } from "react";
import "./reviewsPagina.css";
import axios from "axios";
import { Rate, Avatar, List } from "antd";


function ReviewsPagina() {

    const [reviews, setReviews] = useState([]);


    if (reviews.length === 0) {

        axios.get("https://pfservidor-production.up.railway.app/webreview")
            .then((res) => {
                console.log(res)
                setReviews(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    };

    console.log(reviews);

    if (reviews.length !== 0) {

        return (

            <div className="body-reviews-pagina">
                <List
                    itemLayout="horizontal"
                    dataSource={reviews}
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar
                                    src="data:image/png;base64,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"
                                />
                                }
                                title={
                                    <Rate
                                        className="rate"
                                        disabled
                                        allowHalf
                                        value={Number(item.rate)}
                                    />
                                }
                                description={
                                    <div>
                                        <p>{item.comment}</p>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>

        )

    } else {

        return (

            <div>
                <div>Loading...</div>
            </div>

        );

    };

};

export default ReviewsPagina;