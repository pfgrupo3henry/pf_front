import { Avatar, Col, Divider, Drawer, List, Row, Button,Spin } from 'antd';
import { useState } from 'react';
import { getOrders, getOrdersId } from '../../Redux/Actions/Index';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

function PaymentsViews () {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const allOrders = useSelector(state => state.allOrders);
  const ordersId = useSelector(state => state.ordersID)
  const [isLoading, setisLoading] = useState(true)
  const [loading,setLoading] = useState(true)
  const [ver,setVer] =useState(false)
  const [verPersonal,setVerPersonal] =useState(false)
  const [verProducts,setVerProducts] =useState(false)
  const [drawerData, setDrawerData] = useState({
    userOrder: [],
    userId: "",
    userInfo: {
      createdAt: "",
      email: "",
      firstname: "",
      id: "",
      img: null,
      lastname: "",
      mobile: "",
      nationality: "",
      password: "",
      refreshToken: "",
      role: "",
      status: "",
      updatedAt: ""
    }
  });
 

  
  
  
  
  const [open, setOpen] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {setisLoading(false);
    }, 1000);
    dispatch(getOrders());
    console.log("estado lobal",allOrders.All_Orders)
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Simulación de una función asincrónica con un retardo de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setisLoading(false);
    };
    console.log("data para mapeo",drawerData)
    fetchData();
  }, [ordersId,drawerData]);


  if (isLoading) {
    return <div>Cargando usuario...</div>;
  }

  const onClose = () => {
    setOpen(false);
  };

/*   const showDrawer = (userId) => {
    setTimeout(() => {setisLoading(false);
    }, 3000);
    console.log("ID_USER", userId)
    console.log("ORDENES DEL USUARIO" ,ordersId)
    setDrawerData(ordersId);
    dispatch(getOrdersId(userId))
    dispatch(getOrdersId(userId)).then(() => {
      setDrawerData(ordersId);
      setOpen(true);
    });
  }  */

  const showDrawer = async (userId) => {
    // Primera función: setea el estado local isLoading
    setisLoading(false);
  
    // Espera 2 segundos (2000 milisegundos)
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Obtén los datos de las órdenes del usuario
    const ordersData = await dispatch(getOrdersId(userId));
    setDrawerData(ordersData.payload); // Setea los datos en el estado local drawerData
    setLoading(false);
  
    // Segunda función: abre el componente
    setOpen(true);
  };

  function showOrders(){
    setVer(!ver)
  }
  function showPersonal(){
    setVerPersonal(!verPersonal)
  }




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
            key={item.userId}
            actions={[
              <a onClick={()=>showDrawer(item.userId)} key={`a-${item.userId}`}>
                Todas las compras
              </a>, 
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src={item.userInfo.img} />
              }
              title={item.userInfo.firstname}
              description={item.userInfo.email  }
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
      
        {/* <Button onClick={()=>showPersonal()}>Ver</Button> */}
        {loading ? (
        <div><Spin/></div>
      ) : (<div>
          <Row>
          <Col span={12}>
         
          <DescriptionItem title="Nombre" content={drawerData.userOrder[0].userInfo.firstname} />
       
          </Col>
          <Col span={12}>
            <DescriptionItem title="Mi cuenta" content="Henry Games Store" />
          </Col>
        </Row>
        </div>
      )}
        
        <Divider />
        <p className="site-description-item-profile-p">Compras Realizadas</p>
        {loading ? (
        <div><Spin/></div>
      ) : (<div>
          {drawerData.userOrder[0]?.orders.map(order => (
            <div key={order.id}> {/* Asegúrate de tener una clave única para cada elemento en el bucle de mapeo */}
              <Row>
                <Col span={12}>
            <DescriptionItem title="ID del carrito" content={drawerData.userOrder[0]?.userId} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Fecha de compra" content="" />
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
                  ARRAY DE PRODUCTOS
                </div>
              }
            />
          </Col>
        </Row>
      </div>
          ))}
            </div>
          )}
            
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
      </Drawer>
    </>
  );
};
export  {PaymentsViews};











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