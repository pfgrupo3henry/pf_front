import { Avatar, Col, Divider, Drawer, List, Row } from 'antd';
import { useState } from 'react';
import { getOrders } from '../../Redux/Actions/Index';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';




const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const PaymentsViws = () => {
    const allOrders = useSelector(state => state.allOrders);
    const allProducts = useSelector(state => state.allOrders)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
        console.log("estado lobal",allOrders)
      }, []);

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
  return (
    <>
      <List
      style={{
        marginTop: "5rem",
        marginLeft: "10rem",

        width: 700,
      }}
        dataSource={allOrders.All_Orders}
        bordered
        renderItem={(item) => ( 
          <List.Item
            key={item.id}
            actions={[
              <a onClick={showDrawer} key={`a-${item.id}`}>
                Todas las compras
              </a>,
/*               onclick(handleID)
 */              
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src={item.userId.img} />
              }
              title={item.userId.firstname}
              description={item.userId.email  }
            />
          </List.Item>
        )}
      />
      <Drawer 

      width={640} placement="right" closable={false} onClose={onClose} open={open}>
        <p
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}
        >
          Perfil del usuario
        </p>
        <p className="site-description-item-profile-p">Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Nombre completo" content="Dylan Marcote" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Mi cuenta" content="Henry Games Store" />
          </Col>
        </Row>

        <Divider />
        <p className="site-description-item-profile-p">Compras Realizadas</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="ID del carrito" content="2" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Fecha de compra" content="11/04/2023 16:24" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Estado del pago" content="Finalizado correctamente" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Total abonado" content="$50400.00" />
          </Col>
        </Row>
         <Row>
          <Col span={24}>
            <DescriptionItem
              title="Productos"
              content={
                <div>
                {!allOrders.orders?.cartId?.videogames ? null : allOrders.orders?.cartId?.videogames.length === 0 ? (
                  <p>No hay productos disponibles.</p>
                ) : (
                  allOrders.orders?.cartId?.videogames.map((e) => (
                    <p key={e.name}>
                      Nombre: {e.name}, Precio: {e.price}
                    </p>
                  ))
                )}
              </div>
              }
            />
          </Col>
        </Row> 
        <Divider />
        <p className="site-description-item-profile-p">Contacto</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content="AntDesign@example.com" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Teléfono" content="+86 181 0000 0000" />
          </Col>
        </Row>
    {/*     <Row>
          <Col span={24}>
            <DescriptionItem
              title="Github"
               content={
                <a href="http://github.com/ant-design/ant-design/">
                  github.com/ant-design/ant-design/
                </a>
              }
            /> 
            
          </Col>
        </Row> */}
      </Drawer>
    </>
  );
};
export  {PaymentsViws};