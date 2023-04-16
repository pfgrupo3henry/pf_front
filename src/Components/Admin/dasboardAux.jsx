import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../Redux/Actions/Index";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.allOrders);

  const [selectedWeek, setSelectedWeek] = useState("");
  const [totalSell, setTotalSell] = useState({});
  const [fechasEspanol, setFechasEspanol] = useState([]);
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    // Actualizar el estado de totalSell cuando allOrders cambie
    if (allOrders && allOrders.All_Orders) {
      const newTotalSell = {};
      allOrders.All_Orders.forEach((user) => {
        user.orders.forEach((order) => {
          const createdAt = new Date(order.createdAt).toLocaleDateString();
          const videogamesSold = order.videogames
          if (newTotalSell[createdAt]) {
            newTotalSell[createdAt] += videogamesSold;
          } else {
            newTotalSell[createdAt] = videogamesSold;
          }
        });
      });
      setTotalSell(newTotalSell);
    }
  }, [allOrders]);

  useEffect(() => {
    // Obtener las fechas y ventas como arrays separados
    const fechas = Object.keys(totalSell);
    const ventas = Object.values(totalSell);

    // Mapear las fechas a nombres de días de la semana en español
    const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const fechasEspanol = fechas.map((fecha) => {
      return nombresDias[new Date(fecha).getDay()];
    });

    setFechasEspanol(fechasEspanol);
    setVentas(ventas);
  }, [totalSell]);

  const data2 = {
    series: [
      {
        name: "Ventas por día de la semana",
        data: ventas,
      },
    ],
    options: {
      chart: {
        width: 500,
        height: 350,
        type: "bar",
      },
      xaxis: {
        categories: fechasEspanol,
      },
      fill: {
        opacity: 0.6, // Opacidad del área
      },
    },
  };

  const handleChange = (value) => {
    setSelectedWeek(value);
  };

  return (
    <div className="dashboard-component">
      <div>
        <Select placeholder="Filtro ejemplo 1" className="selectores-dash">
          <Select.Option value="demo">Opcion 1</Select.Option>
          <Select.Option value="demo">Opcion 2</Select.Option>
          <Select.Option value="demo">Opcion 3</Select.Option>
        </Select>
        {fechasEspanol  ? (
          <ReactApexChart
            options={data2.options}
            series={data2.series}
            type="bar"
            width={500}
            height={350}
          />
        ) : (
          <div>Cargando datos...</div>
        )}
      </div>
    </div>
    );
};
export default Dashboard;