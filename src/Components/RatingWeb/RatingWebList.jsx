import React, { useSelector } from "react";
import { List, Rate, Avatar } from "antd";

const ratingsWeb = useSelector((state) => state.ratingsWeb);

const RatingWebList = () => {
  return (
    <div>
      {ratingsWeb.length !== 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={ratingsWeb}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  item.status !== "Disabled" ? (
                    <Avatar src={item.userInfo.img[0]} />
                  ) : null
                }
                title={
                  item.status !== "Disabled" ? (
                    <Rate
                      className="rate"
                      disabled
                      allowHalf
                      value={Number(item.rate)}
                    />
                  ) : null
                }
                description={
                  item.status !== "Disabled" ? (
                    <div>
                      <p className="comment">{item.comment}</p>
                    </div>
                  ) : null
                }
              />
            </List.Item>
          )}
        />
      ) : null}
    </div>
  );
};

export default RatingWebList;
