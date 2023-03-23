import {React, useEffect} from "react";
import { useSelector, useDispatch, } from "react-redux";
import { useContext } from "react";
// import {getFavorites} from "../Actions/Index";
import { deleteFavorites } from "../Redux/Actions/Index";
import {createElement} from "react";
import imgProvisoria from "../Assets/god-of-war-ragnarok-ps5-retro.jpg";
import imgProvisoria2 from "../Assets/a-way-out-ps5-retro.jpg";
import { Avatar, List, Space } from 'antd';


import "./Favorites.css"
import StarOutlined from "@ant-design/icons/StarOutlined";
import LikeOutlined from "@ant-design/icons/LikeOutlined";
import MessageOutlined from "@ant-design/icons/MessageOutlined";
import {AiFillHeart} from "react-icons/ai";
import {AiOutlineDelete} from "react-icons/ai";
import {HeartFilled} from "@ant-design/icons"
import {DeleteOutlined} from "@ant-design/icons"
 


const IconText = ({ icon, text }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
); 


function Favorites (props){
    const {id} = props

    const allFavorites = useSelector(state => state.allFavorites);
    
    const dispatch = useDispatch();


      useEffect(()=>{
        console.log(allFavorites)
      },[allFavorites])


/*       useEffect(() => {
        dispatch(deleteFavorites(id));
      }, [id, dispatch]); */
      
    
      const deleteFavorite = (id)=>{
        dispatch(deleteFavorites(id))
      }
   
    return(
        
                    <div className="favorites-component">
                    <List
                        
                        itemLayout="vertical"
                        size="large"
                        
                        pagination={{
                        className:"paginationFavorite",
                        onChange: (page) => {
                            console.log(page);
                        },
                        
                        pageSize: 5,
                        }}
                        dataSource={allFavorites}

                        renderItem={(item) => (

                        <div className="listFavoritesCard">
                        <List.Item
                            
                            key={item.title}
                            actions={[
                            <div className="iconsFavCard">
                              <AiFillHeart/>
                              <AiOutlineDelete
                              className="deleteFav"
                              onClick={()=>{
                                console.log(id)
                                deleteFavorite(item.id)
                              }}/>
                            
                            </div>
                            ]}  

                            
                            extra={
                            <img
                                width={250}
                                alt="logo"
                                src= {item.img}
                            />
                            }
                        >
                            <List.Item.Meta
                            title={item.title}
                            description={item.description}
                            />
                            <div className="priceFavCard">
                            {item.price}
                            </div>
                        </List.Item>
                        </div>
                        
                        )}
                        />
                    </div>
                                 
                
                
        

    )
}

export {Favorites}

  