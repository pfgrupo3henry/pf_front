import { Form, InputNumber, Popconfirm, Table, Typography, Input, Field } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCards } from '../../Redux/Actions/Index';
import "./Dashboard.css"
import axios from "axios";
import "./Admin.css"
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Select,
  Upload,
} from 'antd';



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
const ProductList = (props) => {

  useEffect(() => {
    dispatch(getCards())
  }, [])

  const dispatch = useDispatch()
  const allProducts = useSelector(state => state.cards)
  const { Search } = Input;
  const [form] = Form.useForm();
  const [data, setData] = useState("");
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.id === editingKey;
  const Swal = require('sweetalert2');


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
      console.log(row);

      axios.put("https://pfservidor-production.up.railway.app/videogames/modify", row)
        .then((res) => {

          console.log(res);
          setEditingKey('');
          dispatch(getCards());

          Swal.fire({
            title: "¡Éxito!",
            text: 'Juego Modificado',
            icon: "success",
            confirmButtonText: 'Ok',
            customClass: {
              confirmButton: "swalButton"
            }
          }).then((res) => {
            dispatch(getCards());
            setData("")
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Error!",
            text: 'Error en la modificacion del juego',
            icon: "error",
            confirmButtonText: 'Ok',
            customClass: {
              confirmButton: "swalButton"
            }

          })
        })

    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }

  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 70,
      editable: true,
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      width: 250,
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
      width: 100,
      editable: true,
    },

    {
      title: 'Descripción',
      dataIndex: 'description',
      width: 300,
      editable: true,
    },
    /*{
      title: 'Imagen',
      dataIndex: 'imagen',
      width: 200,
      editable: true,
    },*/
    {
      title: 'Precio',
      dataIndex: 'price',
      width: 100,
      editable: true,
    },
    {
      title: 'Cantidad',
      dataIndex: 'stock',
      width: 50,
      editable: true,
    },
    {
      title: 'Operación',
      dataIndex: 'operation',
      width: 160,
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
              Guardar
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>.Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Editar
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

  if (data === "") {
    setData(allProducts)
  };

  console.log(data);

  return (

    <div className='hartisimo'>

      <div className='serach-list'>

        <Search
          placeholder="Buscar usuario..." onChange={(e) => handleSearchNombre(e)} enterButton
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