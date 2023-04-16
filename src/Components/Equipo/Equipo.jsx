import { Divider, List, Typography } from "antd";
import { CodeOutlined } from "@ant-design/icons";

const data = [
  "Dylan Marcote - FRONT - https://github.com/dylansebastianm",
  "Felipe Blaksley - FRONT - https://github.com/Molli1992",
  "Rocio Alday - BACK - https://github.com/RocioAlday",
  "Javier Rodriguez - BACK - https://github.com/javlucky",
  "Matias Tazza - BACK - https://github.com/1Tazza",
  "Leandro Milia - BACK/FRONT - https://github.com/Leancba",
  "Celina de la Cruz -  FRONT - https://github.com/celinadelacruzriz",
];

const Equipo = () => (
  <>
    <Divider orientation="left"></Divider>
    <List
      header={
        <div>
          <h2>Equipo</h2>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text style={{ level: 1, fontSize: 40 }}>
            {<CodeOutlined style={{ fontSize: 20 }} />}
          </Typography.Text>
          {"  "}
          {item}
        </List.Item>
      )}
    />
  </>
);
export default Equipo;
