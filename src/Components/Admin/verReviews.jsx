import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "antd";
import { Input, Card, Rate } from "antd";
import { Avatar, Button, List, Form } from "antd";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import "./Admin.css";

function VerReviews() {
  const [games, setGames] = useState([]);
  const [games2, setGames2] = useState([]);
  const [gameInfo, setGamesInfo] = useState([]);
  const [reviews2, setReviews2] = useState([]);
  const [prom, setProm] = useState(0);
  const [state, setState] = useState("data");
 

  const { Search } = Input;
  const { Meta } = Card;


  if (games.length === 0) {
    axios
      .get("https://pfservidor-production.up.railway.app/videogames")
      .then((res) => {
        setGames(res.data);
        setGames2(res.data);
      })
      .catch((err) => console.log(err));
  }

  

  const handleSearchNombre = (e) => {
    let filterUser = games2.filter((game) => {
      return game.name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    console.log(filterUser);
    setGames(filterUser);
  };

  const onCLick = (item) => {
    console.log(item);

    axios
      .get(`https://pfservidor-production.up.railway.app/review/${item.id}`)
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

    axios
      .get(`https://pfservidor-production.up.railway.app/videogames/${item.id}`)
      .then((res) => {
        setGamesInfo(res.data);
        setState("gameInfo");
      })
      .catch((err) => console.log(err));
  };

  const deleteReview = (id, status) => {
    if (status === "Active") {
      var body = {
        status: "Disabled",
      };
    } else if (status === "Disabled") {
      var body = {
        status: "Active",
      };
    }

    console.log(body);
    console.log(id);

    axios
      .put(`https://pfservidor-production.up.railway.app/review/${id}`, body)
      .then((res) => {
        console.log(res);
        axios
          .get(
            `https://pfservidor-production.up.railway.app/review/${gameInfo.id}`
          )
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
      {state === "data" ? (
        <div className="lista-selects">
          <Search
            className="buttonSearch"
            placeholder="Buscar usuario..."
            onChange={(e) => handleSearchNombre(e)}
            enterButton
            enterButtonStyle={{ background: "rgba(9, 22, 29, 0.712)" }}
            style={{ width: 480 }}
          />

          <List
            style={{ width: 900 }}
            itemLayout="horizontal"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 5,
            }}
            dataSource={games}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  style={{ width: 450 }}
                  avatar={<Avatar src={item.img[0]} />}
                  title={item.name}
                  description={
                    
                      <div className="role">
                        <p className="description123">{item.description.length > 200 ? `${item.description.substring(0, 200)}...` : item.description}</p>
                        <div className="yanosenda">
                          <p>{item.platform}</p>
                          <p>{item.genre}</p>
                        </div>
                      </div>
                   
                  }
                />

                <div className="button-review-admin">
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => onCLick(item)}
                  >
                    Ver Reviews
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </div>
      ) : null}

      {state === "gameInfo" && gameInfo.length !== 0 ? (
        <div className="game-card-admin">
          <Card
            style={{ width: 360, height: 580 }}
            cover={
              <img
                style={{ width: 360, height: 460 }}
                alt="Among Us"
                src={gameInfo ? gameInfo.image[0] : ""}
              />
            }
          >
            <Meta
              title={gameInfo.name}
              description="Henry Game Store, los mejores juegos, al mejor precio del mercado"
            />
            <br></br>
            <br></br>
            <Button type="primary" htmlType="submit" onClick={() => goBack()}>
              Atras
            </Button>
          </Card>

          <div className="reviews-card-admin">
            <div className="carta-aux">
              <div className="aux7">
                <h4>Calificación y opiniones</h4>
                <div>
                  <Rate
                    className="rateProm"
                    disabled
                    bordered={false}
                    allowHalf
                    value={prom}
                  />
                </div>
              </div>
            </div>

            {reviews2.length !== 0 ? (
              <div className="listadereviews">
                <List
                  itemLayout="horizontal"
                  dataSource={reviews2}
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 3,
                  }}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item.userInfo.img[0]} />}
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
                            <p className="comment">{item.comment}</p>
                            <div className="status-buttonDelete">
                              <p className="status-review">
                                Estado de la calificación: {item.status}
                              </p>
                              {item.status === "Active" ? (
                                <div className="button-delete">
                                  <Button
                                    type="submit"
                                    onClick={() =>
                                      deleteReview(item.id, item.status)
                                    }
                                    icon={
                                      <DeleteOutlined className="button-delete" />
                                    }
                                  ></Button>
                                </div>
                              ) : (
                                <Button
                                  type="submit"
                                  onClick={() =>
                                    deleteReview(item.id, item.status)
                                  }
                                  icon={<CheckOutlined />}
                                ></Button>
                              )}
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default VerReviews;