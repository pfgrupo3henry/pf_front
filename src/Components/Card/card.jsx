import { Card } from 'antd';
import "../Card/card.css"
const { Meta } = Card;



const imgProvisoria = require("../Assets/god-of-war-ragnarok-ps5-retro.jpg")


function CardElement ({title, imgProvisoria, description}) {
    return (
    <div className="individualCard">
    <Card
    
    hoverable
    style={{
      width: 180,
    }}
    cover={<img alt="example" src={imgProvisoria} />}
  >
    <Meta title={title} description={description} 
    
    />
  </Card>
  </div>
  )
};
export {CardElement};

