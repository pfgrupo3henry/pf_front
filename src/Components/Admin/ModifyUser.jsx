import { Avatar, Button, List, Form, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getUsers, modificarUser } from '../../Redux/Actions/Index';
import { Pagination } from 'antd';
import { Select, Input } from 'antd';
import "./Admin.css"

const { Search } = Input;

function ModifyUser() {
  const allUsers = useSelector(state => state.allUsers);
  const [user_id, setuser_id] = useState("")
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Cambia aquí para ajustar la cantidad de elementos por página
  const [allUsers2, setAllUsers2] = useState(allUsers);
  const Swal = require('sweetalert2');

  useEffect(() => {
    dispatch(getUsers());
  }, [currentPage, pageSize]); // Asegúrate de actualizar la lista de usuarios cuando cambie la página o la cantidad de elementos por página

  const handlePageChange = page => {
    setCurrentPage(page);
  };


  const handleSelectChange = (id) => {
    setuser_id(id)
  }

  const handleForm = (values) => {

    let data =
    {
      promote: values.typeUser,
      block: values.ban
    }
    console.log("data", data)
    console.log("id", user_id)
    dispatch(modificarUser(user_id, data))
    /*   Swal.fire({
        title: "Success!",
        text: 'Usuario Modificado',
        icon: "success",
        confirmButtonText: 'Ok'
      }) */
    message.success("¡La operación se realizó con éxito!", 5);
  }

  console.log(allUsers2);

  const handleSearchNombre = (e) => {

    let filterUser = allUsers.filter((user) => {
      return user.firstname.toLowerCase().includes(e.target.value.toLowerCase())
    })

    console.log(filterUser);
    setAllUsers2(filterUser);

  };

  if (allUsers2.length === 0 && allUsers.length !== 0) {
    setAllUsers2(allUsers)
  };

  return (
    <div className='lista-selects-user'>

      <Search
        className="buttonSearch"
        placeholder="Buscar usuario..." onChange={(e) => handleSearchNombre(e)} enterButton
        enterButtonStyle={{ background: 'rgba(9, 22, 29, 0.712)' }}
        style={{ width: 480 }} />

      <List
        itemLayout="horizontal"
        dataSource={allUsers2.slice((currentPage - 1) * pageSize, currentPage * pageSize)} // Aplica la paginación en la lista de usuarios
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.img ? item.img[0] : ""} />}
              title={item.firstname}
              description={
                <div className=''>
                  <span>{item.email}</span>
                  <div className='role'>
                    <p>{item.role}</p>
                    <p>{item.status}</p>
                  </div>
                </div>
              }
            />


            <div className='selected-modifyUsers'>
              <Form
                className='selected-modifyUsers'
                onFinish={handleForm}
              >
                <Form.Item
                  name="typeUser"
                >
                  <Select
                    onChange={() => handleSelectChange(item.id)}
                    placeholder="Rol definido"
                    style={{
                      width: 120,
                    }}>
                    <Select.Option
                      value={false}>Usuario por defecto</Select.Option>
                    <Select.Option value={true}>Administrador</Select.Option>

                  </Select>
                </Form.Item>

                <Form.Item
                  name="ban"
                >
                  <Select
                    placeholder="Estado"
                    style={{
                      width: 90,
                    }}>
                    <Select.Option value={false} >Activo</Select.Option>
                    <Select.Option value={true}>Inactivo</Select.Option>

                  </Select>
                </Form.Item>

                <Button type='primary' htmlType='submit' >Actualizar</Button>
              </Form>
            </div>
          </List.Item>

        )}
      />
      <div className='pagination'>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={allUsers.length}
          onChange={handlePageChange}
        />
      </div>
    </div>

  );
}

export { ModifyUser };