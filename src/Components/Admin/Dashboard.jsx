import React, { useState } from "react";
import { Pie } from "@nivo/pie";
import { Statistic } from "antd";
import CountUp from "react-countup";
import { Area } from '@ant-design/plots';
import { Select } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllRatingsWeb,
  getOrders,
  getUsers,
} from "../../Redux/Actions/Index";
import "./Dashboard.css";
import { Column } from '@ant-design/plots';



const Dashboard = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.allOrders);

  const allUsers = useSelector((state) => state.allUsers);

  const [selectedWeek, setSelectedWeek] = useState("");
  const [totalCash, settotalCash] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersByDate, setUsersByDate] = useState({});
  const allRatingWeb = useSelector((state) => state.allRatingsWeb);

  const [selectedPlatform, setSelectedPlatform] = useState("All");

  const [totalSell, settotalSell] = useState(0);
  const [totalSell2, settotalSell2] = useState(0);

  //USEEFFECT PARA CANTIDAD DE VENTAS POR DIA RANGO SEMANAL
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getAllRatingsWeb());
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    // Actualizar el estado de salesByDay cuando allOrders cambie

    if (allOrders && allOrders.All_Orders) {
      const mapeoDeOrdenesCompletadas = allOrders.All_Orders?.map((orden) =>
        orden.orders?.filter(
          (ordenDetail) =>
            ordenDetail.status === "Completed Pay" && ordenDetail.totalAmount
        )
      );

      const result = mapeoDeOrdenesCompletadas.flat().reduce((acc, curr) => {

        let createdAt = new Date(curr.createdAt).toLocaleDateString();
        let videogamesSold = curr.videogames.length;
        if (acc[createdAt]) {
          acc[createdAt] += videogamesSold;
        } else {
          acc[createdAt] = videogamesSold;
        }

        return acc;
      }, {});

      settotalSell(result);

    }
  }, [allOrders]);

  console.log("que traigo?", totalSell);

  // console.log("VENTAS POR DIA", totalSell);

  //USEEFFECT PARA TOTAL FACTURADO EN PESOS
  useEffect(() => {
    // Calcular la suma de todos los totalAmount de las compras
    const sumTotal = () => {
      // Verificar si allOrders existe y tiene la propiedad All_Orders
      // if (allOrders && allOrders.All_Orders) {
      //   // Obtener todas las órdenes de todos los usuarios
      //   const allUserOrders = allOrders.All_Orders.reduce(
      //     (acc, user) => acc.concat(user.orders),
      //     []
      //   );

      //   // Sumar los totalAmount de todas las órdenes
      //   const totalAmounts = allUserOrders.reduce((acc, order) => {
      //     const orderTotal = parseFloat(order.totalAmount);
      //     return acc + orderTotal;
      //   }, 0);

      //   return totalAmounts;
      // }

      // return 0;

      const totalSellCompleted = mapeoDeOrdenesCompletadas
        ?.map((orden) => orden)
        .reduce((total, { totalAmount }) => total + totalAmount, 0);

      return totalSellCompleted;
    };

    // Actualizar el estado con el total facturado
    const totalFacturado = sumTotal();
    // console.log("total", totalFacturado);
    settotalCash(totalFacturado);
  }, [allOrders]); // Ejecutar el efecto solo cuando allOrders cambie

  useEffect(() => {
    const sumUsersByDate = () => {
      const usersByDate = {};
      const allDates = allUsers.map((user) => user.createdAt.substring(0, 10)); // Obtener todas las fechas en el rango de fechas
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

  // console.log("TOTAL DE USUARIOS POR DIA", usersByDate);

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

      fill: {
        opacity: 0.6, // Opacidad del área
      },
    },
  };

  const formatter = (value) => <CountUp end={value} separator="," />;
  const formatter2 = (value) => {
    return `$${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleChange = (value) => {
    setSelectedWeek(value);
  };

  //GRAFICO DE LAS RESEÑAS WEBS/////////////////////////////////////////////////////////////////

  const ratings = allRatingWeb.map((objeto) => objeto.rate);

  const ratingCounts = {};

  for (let i = 0; i < ratings.length; i++) {
    const rating = ratings[i];
    ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
  }

  const chartData = [];

  for (const rating in ratingCounts) {
    chartData.push({
      id: "⭐ " + rating,
      value: ratingCounts[rating],
    });
  }

  // console.log('lo que llega', chartData)

  // console.log("RATINGSSS", chartData);

  //GRAFICO DE LAS RESEÑAS WEBS/////////////////////////////////////////////////////////////////

  //GRAFICO DE LOS GENEROS, CANTIDADES Y FILTROS POR PLATAFORMAS///////////////////////////////

  const ordenes = allOrders.All_Orders;

  const mapeoDeOrdenesCompletadas = ordenes
    ?.map((orden) =>
      orden.orders
        ?.filter(
          (ordenDetail) =>
            ordenDetail.status === "Completed Pay" && ordenDetail.totalAmount
        )
        .map(({ id, status, totalAmount, videogames }) => ({
          id,
          status,
          totalAmount: Number(totalAmount),
          videogames: videogames.map(({ name, platforms, genres }) => ({
            name,
            platforms: platforms && platforms.length ? platforms[0].name : null,
            genres: genres && genres.length ? genres[0].name : null,
          })),
        }))
    )
    .flat();

  // console.log("array original", ordenes);
  // console.log("las ordenes", mapeoDeOrdenesCompletadas);

  const genresByPlatforms = mapeoDeOrdenesCompletadas?.map((game) => {
    return game.videogames;
  });

  const genresByPlatformsPS5 = genresByPlatforms
    ?.map((game) => {
      if (selectedPlatform === "All") {
        return game;
      } else {
        return game.filter((v) => v.platforms === selectedPlatform);
      }
    })
    .flat();

  const generos = {};

  genresByPlatformsPS5?.forEach((game) => {
    if (!generos[game.genres]) {
      generos[game.genres] = 1;
    } else {
      generos[game.genres]++;
    }
  });

  const arrayGeneros = Object.keys(generos).map((genero) => {
    return { id: genero, value: generos[genero] };
  });

  // console.log('arrays generos' , arrayGeneros)

  const handlePlatformChange = (value) => {
    setSelectedPlatform(value);
  };

  // console.log("PREPARANDO EL OBJETO", genresByPlatformsPS5);
  // console.log("FILTRADO", arrayGeneros);


  ///AREA DEL GRAFICO DE BARRAS DE DIAS//////////////

  console.log('lo que tengo', totalSell)

  const transformado = Object.entries(totalSell).map(([fecha, videojuegos]) => {
    return { fecha, videojuegos };
  });

  const ordenado = transformado.sort((a, b) => {
    const fechaA = new Date(a.fecha.split('/').reverse().join('-'));
    const fechaB = new Date(b.fecha.split('/').reverse().join('-'));
    return fechaA - fechaB;
  }).slice(-7)

  console.log('probando', ordenado.slice(-7));

  const data = ordenado

  //---------------------------------------------------- Felipe && Lean

  const usersByDatex = allUsers.reduce((acc, curr) => {
    const createdAt = new Date(curr.createdAt).toLocaleDateString();

    if (!acc[createdAt]) {
      acc[createdAt] = 1;
    } else {
      acc[createdAt]++;
    }

    return acc;
  }, {});


  const transformadox = Object.entries(usersByDatex).map(([fecha, usuario]) => {
    return { fecha, usuario };
  });

  const ordenadox = transformadox
    .sort((a, b) => {
      const fechaA = new Date(a.fecha.split("/").reverse().join("-"));
      const fechaB = new Date(b.fecha.split("/").reverse().join("-"));
      return fechaA - fechaB;
    })
    .slice(-7);

  const datax = ordenadox;

  console.log('los usuarios', allUsers)
  console.log('pruebita', usersByDatex)

  //--------------------------------------------------------------- Felipe && Lean

  ///AREA DEL GRAFICO DE BARRAS DE DIAS//////////////

  const porcentajeFormat = (value) => `${value}%`;

  const config = {
    data,
    xField: 'fecha',
    yField: 'videojuegos',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  //GRAFICO DE LOS GENEROS, CANTIDADES Y FILTROS POR PLATAFORMAS///////////////////////////////

  const config2 = {
    data: datax,
    xField: 'fecha',
    yField: 'usuario',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };

  return (
    <div className="stadisticas-dashboard-component">
      <div className="estadisticas">
        <Statistic
          title="Total de ventas:"
          value={Object.values(totalSell).reduce((acc, curr) => acc + curr, 0)}
          formatter={formatter}
        />
        <Statistic
          title="Total facturado:"
          value={totalCash}
          precision={2}
          formatter={formatter2}
        />
        <Statistic
          title="Total de usuarios registrados:"
          value={allUsers.length}
          formatter={formatter}
        />
      </div>
      <div className="dashboard-component">
        <div className="pie-bars">
            <div className="pie">
              <p className="titulooosspie" >Porcentaje de ventas por genero</p>
              <Select
                placeholder="Consola"
                className="selectores-dash"
                value={selectedPlatform}
                onChange={handlePlatformChange}
              >
                <Select.Option value="All">Todos</Select.Option>
                <Select.Option value="PS5">PS5</Select.Option>
                <Select.Option value="PS4">PS4</Select.Option>
                <Select.Option value="PS3">PS3</Select.Option>
              </Select>           
              <Pie
                data={arrayGeneros}
                valueFormat={porcentajeFormat}

                width={450}
                height={280}
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
                    asd: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    size: 2,
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
         <div className="grafico1">
          <p >Total de ventas por día</p>
          <Column {...config} style={{ width: "23rem", height: "18rem" }} />


          </div>
            
        </div>

        <div className="total-area">
          <div className="grafico1">
            <p className="tituloooss" >Total de usuarios registrados pro día</p>
            <Area {...config2} style={{ width: "23rem", height: "18rem" }} />
          </div>
          <div className="donut">
              <p className="tituloooss">Rating</p>
              <Pie
                data={chartData}
                valueFormat={porcentajeFormat}

                width={450}
                height={280}
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
                    asd: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    size: 2,
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
          </div>
      </div>
    </div>
  );
};

export default Dashboard;







    {/* <div className="grafico3" >
            <Select placeholder="Filtro ejemplo 3" className="selectores-dash">
              <Select.Option value="demo">Opcion 1</Select.Option>
              <Select.Option value="demo">Opcion 2</Select.Option>
              <Select.Option value="demo">Opcion 3</Select.Option>
            </Select>
            <ReactApexChart
              options={data_area.options}
              series={data_area.series}
              type="area"
              height={280}
              width={450}
            />
          </div> */}