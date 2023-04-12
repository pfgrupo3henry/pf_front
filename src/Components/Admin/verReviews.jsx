import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from 'antd';
import { Input, Card, Rate } from 'antd';
import { Avatar, Button, List, Form } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import "./Admin.css";



function VerReviews() {

    const [games, setGames] = useState([]);
    const [games2, setGames2] = useState([]);
    const [gameInfo, setGamesInfo] = useState([]);
    const [reviews2, setReviews2] = useState([]);
    const [prom, setProm] = useState(0);
    const [state, setState] = useState("data");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Cambia aquí para ajustar la cantidad de elementos por página
    const { Search } = Input;
    const { Meta } = Card;

    if (games.length === 0) {
        axios.get("https://pfservidor-production.up.railway.app/videogames")
            .then((res) => {
                setGames(res.data);
                setGames2(res.data);
            })
            .catch((err) => console.log(err))
    };

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const handleSearchNombre = (e) => {

        let filterUser = games2.filter((game) => {
            return game.name.toLowerCase().includes(e.target.value.toLowerCase())
        })

        console.log(filterUser);
        setGames(filterUser);

    };

    const onCLick = (item) => {

        console.log(item)

        axios.get(`https://pfservidor-production.up.railway.app/review/${item.id}`)
            .then((res) => {

                var number = 0;
                for (let i = 0; i < res.data.length; i++) {
                    number = number + Number(res.data[i].rate);
                }
                number = number / res.data.length;

                setProm(number);
                setReviews2(res.data);
                setState("gameInfo");

            })
            .catch((err) => console.log(err));

        axios.get(`https://pfservidor-production.up.railway.app/videogames/${item.id}`)
            .then((res) => {
                setGamesInfo(res.data);
                setState("gameInfo");
            })
            .catch((err) => console.log(err));

    };

    const deleteReview = (id) => {

        const body = {
            status: "Disabled"
        }

        console.log(body);
        console.log(id);

        axios.put(`https://pfservidor-production.up.railway.app/review/${id}`, body)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err));

    };

    const goBack = () => {
        setState("data");
    };

    console.log(games);
    console.log(gameInfo);
    console.log(reviews2);

    return (

        <div className="body-review-admin">

            {state === "data" ?

                <div>

                    <Search
                        className="buttonSearch"
                        placeholder="Search user" onChange={(e) => handleSearchNombre(e)} enterButton
                        enterButtonStyle={{ background: 'rgba(9, 22, 29, 0.712)' }}
                        style={{ width: 480 }}
                    />

                    <List

                        itemLayout="horizontal"
                        dataSource={games.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta

                                    avatar={<Avatar src={item.img[0]} />}
                                    title={item.name}
                                    description={
                                        <div className=''>
                                            <span>${item.price}</span>
                                            <div className='role'>
                                                <p>{item.platform}</p>
                                                <p>{item.genre}</p>
                                            </div>
                                        </div>
                                    }
                                />

                                <Button type='primary' htmlType='submit' onClick={() => onCLick(item)}>
                                    Ver Reviews
                                </Button>

                            </List.Item>

                        )}

                    />

                    <div className='pagination'>
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={games.length}
                            onChange={handlePageChange}
                        />
                    </div>

                </div>

                :
                null
            }

            {state === "gameInfo" && gameInfo.length !== 0 ?

                <div className="game-card-admin">

                    <Card
                        style={{ width: 360, height: 580 }}
                        cover={
                            <img
                                style={{ width: 360, height: 460 }}
                                alt="Among Us"
                                src={gameInfo ? gameInfo.image[0] : ""}
                            />
                        }>
                        <Meta
                            title={gameInfo.name}
                            description="Henry Game Store, the best console games, at the best market price"
                        />
                        <br></br>
                        <br></br>
                        <Button type='primary' htmlType='submit' onClick={() => goBack()}>
                            Go Back
                        </Button>
                    </Card>

                    <div className="reviews-card-admin">

                        <Card title="PROMEDIO DEL JUEGO">
                            <Rate
                                className="rateProm"
                                disabled
                                bordered={true}
                                allowHalf
                                value={prom}
                            />
                        </Card>

                        {reviews2.length !== 0 ? reviews2.map((r) => {

                            return (

                                <Card title="" bordered={false}>
                                    <div className="nameComment">
                                        <div className="imgRate">
                                            <img>{r.img}</img>
                                            <Rate
                                                className="rate"
                                                disabled
                                                allowHalf
                                                value={Number(r.rate)}
                                            />
                                        </div>
                                        <p className="comment">{r.comment}</p>
                                        <Button
                                            type="submit"
                                            onClick={() => deleteReview(r.id)}
                                            icon={<DeleteOutlined />}
                                        >
                                        </Button>
                                    </div>
                                </Card>

                            );

                        })
                            : null}

                    </div>

                </div>

                :
                null
            }

        </div>

    );

};

export default VerReviews;