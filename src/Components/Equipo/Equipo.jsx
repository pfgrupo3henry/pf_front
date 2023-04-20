import { Link } from "react-router-dom";
import { Divider, List, Typography, FloatButton } from "antd";
import { CodeOutlined, GithubOutlined } from "@ant-design/icons";
import "./Equipo.css";
import { useNavigate } from "react-router-dom";
import { CaretLeftOutlined } from "@ant-design/icons";

const data = [
  {
    user: "Dylan Marcote",
    role: "FRONT",
    link: "https://github.com/dylansebastianm",
  },
  {
    user: "Felipe Blaksley",
    role: "FRONT",
    link: "https://github.com/Molli1992",
  },
  {
    user: "Rocio Alday",
    role: "BACK",
    link: "https://github.com/RocioAlday",
  },
  {
    user: "Javier Rodriguez",
    role: "BACK",
    link: "https://github.com/javlucky",
  },
  {
    user: "Matias Tazza",
    role: "BACK",
    link: "https://github.com/1Tazza",
  },
  {
    user: "Leandro Milia",
    role: "BACK/FRONT",
    link: "https://github.com/Leancba",
  },
  {
    user: "Celina de la Cruz",
    role: "FRONT",
    link: "https://github.com/celinadelacruzriz",
  },
];

const Equipo = () => {
  const navigate = useNavigate();
  return (
    <div className="equipo-container">
      <FloatButton
        icon={<CaretLeftOutlined />}
        tooltip="Volver"
        onClick={() => navigate(-1)}>
        Volver
      </FloatButton>
      <Divider></Divider>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text style={{ fontFamily: "fantasy", fontSize: 20 }}>
              {<CodeOutlined style={{ fontSize: 20 }} />}
              {"    "}
              {item.user}
              {"     "}
              {item.role}
              {"     "}
              <Link to={item.link}>
                <GithubOutlined style={{ fontSize: 25 }} />
              </Link>
            </Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Equipo;
