import { Avatar, List } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

function ModifyUser  (){
    return(
        <div>
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="ejemplo"
        />
      </List.Item>
    )}
  />
  </div>
  )
}
export {ModifyUser};