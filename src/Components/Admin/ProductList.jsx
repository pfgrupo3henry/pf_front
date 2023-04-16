import { Form, InputNumber, Popconfirm, Table, Typography, Input, Field } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCards } from '../../Redux/Actions/Index';
import "./Dashboard.css"




const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const ProductList = () => {

  useEffect(() => {
    dispatch(getCards())
  }, [])

  const dispatch = useDispatch()
  const allProducts = useSelector(state => state.cards)
  const { Search } = Input;
  const [form] = Form.useForm();
  const [data, setData] = useState(allProducts);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.id === editingKey;
  const [input, setInput] = useState({
    name: "",
    platform: "",
    genre: "",
    description: "",
    price: ""
  })

  const edit = (record) => {

    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });

    setEditingKey(record.id);
    console.log("key", record.id)

  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (record, e) => {

    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => record.id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }

  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      width: 300,
      editable: true,
    },

    {
      title: "Categoria",
      dataIndex: 'platform',
      width: 50,
      editable: true,
    },

    {
      title: 'Sub categoria',
      dataIndex: 'genre',
      width: 200,
      editable: true,
    },

    {
      title: 'Descripcion',
      dataIndex: 'description',
      width: 400,
      editable: true,
    },
    /*{
      title: 'Imagen',
      dataIndex: 'imagen',
      width: 200,
      editable: true,
    },*/
    {
      title: 'Price',
      dataIndex: 'price',
      width: 200,
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: 125,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={(e) => save(record, e)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleSearchNombre = (e) => {

    let filterUser = allProducts.filter((game) => {
      return game.name.toLowerCase().includes(e.target.value.toLowerCase())
    })

    console.log(filterUser);
    setData(filterUser);

  };

  console.log(data);

  return (

    <div>

      <div className='serach-list'>

        <Search
          placeholder="Search user" onChange={(e) => handleSearchNombre(e)} enterButton
          enterButtonStyle={{ background: 'rgba(9, 22, 29, 0.712)' }}
          style={{ width: 480 }}
        />

      </div>

      <div className='tabla-componente'>

        <Form form={form} component={false}>

          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />

        </Form>

      </div>

    </div>
  );
};
export default ProductList;