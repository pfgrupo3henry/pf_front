import React, { useState } from "react";
import { Pie } from "@nivo/pie";
import { Col, Row, Statistic } from "antd";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Select } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Progress } from "antd";
import { getAllRatingsWeb, getOrders, getUsers } from "../../Redux/Actions/Index";
import "./Dashboard.css";
import Chart from "react-apexcharts";

import moment from 'moment';


const Dashboard = () => {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.allReviews);
  const allOrders = useSelector((state) => state.allOrders);
  const allUsers = useSelector((state)=> state.allUsers)

  const [selectedWeek, setSelectedWeek] = useState("");
  const [totalCash, settotalCash] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersByDate, setUsersByDate] = useState({});
  const allRatingWeb = useSelector((state) => state.allRatingsWeb);

  console.log(
    "rating",
    allRatingWeb.map((objeto) => objeto.rate)
  );
 

  const [totalSell, settotalSell] = useState(0);


//USEEFFECT PARA CANTIDAD DE VENTAS POR DIA RANGO SEMANAL
useEffect(() => {
  dispatch(getOrders());
  dispatch(getAllRatingsWeb());
}, []);

  useEffect(() => {         
    // Actualizar el estado de salesByDay cuando allOrders cambie
    if (allOrders && allOrders.All_Orders) {
      const newSalesByDay = {};
      allOrders.All_Orders.forEach((user) => {
        user.orders.forEach((order) => {
          const createdAt = new Date(order.createdAt).toLocaleDateString();
          const videogamesSold = order.videogames.length;
          if (newSalesByDay[createdAt]) {
            newSalesByDay[createdAt] += videogamesSold;
          } else {
            newSalesByDay[createdAt] = videogamesSold;
          }
        });
      });
      settotalSell(newSalesByDay);
    }
  }, [allOrders]);

  console.log("VENTAS POR DIA",totalSell)


  //USEEFFECT PARA TOTAL FACTURADO EN PESOS
  useEffect(() => {
    // Calcular la suma de todos los totalAmount de las compras
    const sumTotal = () => {
      // Verificar si allOrders existe y tiene la propiedad All_Orders
      if (allOrders && allOrders.All_Orders) {
        // Obtener todas las órdenes de todos los usuarios
        const allUserOrders = allOrders.All_Orders.reduce(
          (acc, user) => acc.concat(user.orders),
          []
        );

        // Sumar los totalAmount de todas las órdenes
        const totalAmounts = allUserOrders.reduce((acc, order) => {
          const orderTotal = parseFloat(order.totalAmount);
          return acc + orderTotal;
        }, 0);

        return totalAmounts;
      }

      return 0;
    };

    // Actualizar el estado con el total facturado
    const totalFacturado = sumTotal();
    settotalCash(totalFacturado);
  }, [allOrders]); // Ejecutar el efecto solo cuando allOrders cambie


  //USEEFFECT PARA TOTAL USUARIOS POR DIA

  useEffect(()=>{
    dispatch(getUsers())
    const cantidad = allUsers.length;
    setTotalUsers(cantidad)
  },[])


  useEffect(()=>{
    
  },[totalUsers])


useEffect(() => {
  const sumUsersByDate = () => {
    const usersByDate = {};
    const allDates = allUsers.map(user => user.createdAt.substring(0, 10)); // Obtener todas las fechas en el rango de fechas
    const uniqueDates = [...new Set(allDates)]; // Obtener las fechas únicas

    // Crear todas las fechas con contador inicial de 0
    for (const date of uniqueDates) {
      usersByDate[date] = 0;
    }

    // Contar los usuarios por fecha
    for (const user of allUsers) {
      const date = user.createdAt.substring(0, 10); // Obtener la fecha en formato YYYY-MM-DD
      usersByDate[date] += 1; // Sumar 1 al contador por cada usuario en esa fecha
    }

    // Ordenar las fechas en orden ascendente
    const sortedDates = Object.keys(usersByDate).sort();
    const sortedUsersByDate = {};
    for (const date of sortedDates) {
      sortedUsersByDate[date] = usersByDate[date];
    }

    return sortedUsersByDate;
  };

  const usersByDateData = sumUsersByDate();
  setUsersByDate(usersByDateData);
}, [allUsers]);

console.log("TOTAL DE USUARIOS POR DIA", usersByDate);

  
  

  const dartsyrta = [
    // datos de ejemplo para los gráficos
    { x: "Enero", y: 10 },
    { x: "Febrero", y: 20 },
    { x: "Marzo", y: 15 },
    { x: "Abril", y: 25 },
    { x: "Mayo", y: 30 },
  ];

  const data2 = {
    series: [
      {
        name: "Area 1",
        data: Object.values(totalSell),
      },
    ],
    options: {
      chart: {
        with: 500,
        height: 350,
        type: "area",
      },
      xaxis: {
        categories: ["Mier", "Jue", "Vie", "Sab", "Dom", "Lun", "Mar"],
      },
      fill: {
        opacity: 0.6, // Opacidad del área
      },
    },
  };





  const data_area = {
    series: [
    {
    name: "Area 1",
    data: Object.values(usersByDate),
    },
    ],
    options: {
    chart: {
    with: 500,
    height: 350,
    type: "area",
    },
    xaxis: {
      categories: ["Mier", "Jue", "Vie", "Sab", "Dom", "Lun", "Mar"],
    },
    fill: {
    opacity: 0.6,
    },
    },
    };


  const colors = ["#003785", "#1465bb", "#2196f3", "#81c9fa"];
  const formatter = (value) => <CountUp end={value} separator="," />;
  const formatter2 = (value) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleChange = (value) => {
    setSelectedWeek(value);
  };



  //grafico de las reseñas web :D

  const ratings = allRatingWeb.map((objeto) => objeto.rate);

  const ratingCounts = {};

  for (let i = 0; i < ratings.length; i++) {
    const rating = ratings[i];
    ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
  }

  const chartData = [];

  for (const rating in ratingCounts) {
    chartData.push({
      label: rating,
      value: ratingCounts[rating],
    });
  }

  function DonutChart({ chartData }) {

    chartData.sort((a, b) => parseFloat(a.label) - parseFloat(b.label));

   const options = {
  labels: chartData.map((data) => "Value " + data.label),
};
  
    const series = chartData.map((data) => data.value)
  
    return (
      <Chart
        options={options}
        series={series}
        type="donut"
        width="380"
      />
    );
  }

  console.log("RATINGSSS", chartData);

  //grafico de las reseñas web :D
  


  return (
    <div className="stadisticas-dashboard-component">
      <div className="estadisticas">
        <Row className="stadisticas" gutter={16}>
          <Col span={12}>
            <Statistic
              title="Total de ventas"
              value={Object.values(totalSell).reduce(
                (acc, curr) => acc + curr,
                0
              )}
              formatter={formatter}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total facturado"
              value={totalCash}
              precision={2}
              formatter={formatter2}
            />
          </Col>
        </Row>
      </div>

      <div className="dashboard-component">
        <div className="pie">
          <Select placeholder="Consola" className="selectores-dash">
            <Select.Option value="demo">PS5</Select.Option>
            <Select.Option value="demo">PS4</Select.Option>
            <Select.Option value="demo">PS3</Select.Option>
          </Select>

          <Pie
            data={[
              {
                id: "Accion",
                value: 10,
              },
              {
                id: "Deportes",
                value: 10,
              },
              {
                id: "Aventura",
                value: 10,
              },
              {
                id: "Conduccion",
                value: 20,
              },
              {
                id: "Multijugador",
                value: 7,
              },
              {
                id: "Combos",
                value: 3,
              },
              {
                id: "Estrategia",
                value: 4,
              },
              {
                id: "Infantiles",
                value: 5,
              },
            ]}
            width={500}
            height={300}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: "blues" }}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "ruby",
                },
                id: "dots",
              },
              {
                match: {
                  id: "c",
                },
                id: "dots",
              },
              {
                match: {
                  id: "go",
                },
                id: "dots",
              },
              {
                match: {
                  id: "python",
                },
                id: "dots",
              },
              {
                match: {
                  id: "scala",
                },
                id: "lines",
              },
              {
                match: {
                  id: "lisp",
                },
                id: "lines",
              },
              {
                match: {
                  id: "elixir",
                },
                id: "lines",
              },
              {
                match: {
                  id: "javascript",
                },
                id: "lines",
              },
            ]}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </div>

        <div>
          <Select placeholder="Filtro ejemplo 1" className="selectores-dash">
            <Select.Option value="demo">Opcion 1</Select.Option>
            <Select.Option value="demo">Opcion 2</Select.Option>
            <Select.Option value="demo">Opcion 3</Select.Option>
          </Select>
          <ReactApexChart
            options={data2.options}
            series={data2.series}
            type="bar"
            height={350}
            width={500}
          />
        </div>
        <div className="total-area">
          <div className="">
            <Select placeholder="Filtro ejemlo 2" className="selectores-dash">
              <Select.Option value="demo">Rates mayor a 3</Select.Option>
              <Select.Option value="demo">Opcion 2</Select.Option>
              <Select.Option value="demo">Opcion 3</Select.Option>
            </Select>

            <div className="progress">
            <Progress
                title="Total de usuarios registrados"
                strokeColor="rgba(0, 143, 251, 0.6)"
                strokeLinecap="butt"
                type="circle"
                percent={totalUsers}
                format={() => totalUsers}
            />  
              <div className="donut">
               <DonutChart chartData={chartData} />
              </div>

            </div>
          </div>

          <div>
            <Select placeholder="Filtro ejemplo 3" className="selectores-dash">
              <Select.Option value="demo">Opcion 1</Select.Option>
              <Select.Option value="demo">Opcion 2</Select.Option>
              <Select.Option value="demo">Opcion 3</Select.Option>
            </Select>
            <ReactApexChart
              options={data_area.options}
              series={data_area.series}
              type="area"
              height={300}
              width={500}
            />
          </div>
        </div>

        <Progress
          strokeColor="rgba(0, 143, 251, 0.6)"
          strokeLinecap="butt"
          percent={62}
        />
      </div>
    </div>
  );
};

export default Dashboard;

/* 
   // Objeto para llevar el registro de ventas por día
// Utilizar una promesa para esperar a que allOrders esté completamente cargado
const waitForAllOrders = () => {
    return new Promise((resolve) => {
      const checkAllOrders = () => {
        if (typeof allOrders !== 'undefined' && typeof allOrders === 'object' && allOrders.All_Orders) {
          resolve();
        } else {
          setTimeout(checkAllOrders, 100);
        }
      };
      checkAllOrders();
    });
  };
  
  // Esperar a que allOrders esté completamente cargado
  waitForAllOrders().then(() => {
    const salesByDay = {};
  
    // Iterar sobre el objeto allOrders
    allOrders.All_Orders.forEach((user) => {
      user.orders.forEach((order) => {
        const createdAt = new Date(order.createdAt).toLocaleDateString(); // Obtener la fecha de creación de la orden en formato de fecha local (dd/mm/yyyy)
        const videogamesSold = order.videogames.length; // Obtener la cantidad de juegos vendidos en la orden
  
        // Agregar la cantidad de juegos vendidos al registro de ventas por día
        if (salesByDay[createdAt]) {
          salesByDay[createdAt] += videogamesSold;
        } else {
          salesByDay[createdAt] = videogamesSold;
        }
  
      });
    });
  
    // Mostrar el registro de ventas por día en la consola
    console.log("Registro de ventas por día:", salesByDay);
  
    // Establecer el estado local con la data de salesByDay
  }); */
