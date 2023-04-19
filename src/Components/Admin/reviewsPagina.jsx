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
                                    src={item.userInfo ? item.userInfo.img[0] : "https://img2.freepng.es/20180323/pww/kisspng-computer-icons-clip-art-profile-cliparts-free-5ab5a47b02ff75.0880050915218535630123.jpg"}
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
                                        <p>Comentario: {item.comment}</p>
                                        <p>Usuario: {item.userInfo ? item.userInfo.firstname : "no tiene nombre"}</p>
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