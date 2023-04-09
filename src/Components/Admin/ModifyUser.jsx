import { Avatar, List } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getUsers } from '../../Redux/Actions/Index';
import { Pagination } from 'antd';
import { Select } from 'antd';
import "./Admin.css"

function ModifyUser() {
  const allUsers = useSelector(state => state.allUsers);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Cambia aquí para ajustar la cantidad de elementos por página

  useEffect(() => {
    dispatch(getUsers());
  }, [currentPage, pageSize]); // Asegúrate de actualizar la lista de usuarios cuando cambie la página o la cantidad de elementos por página

  const handlePageChange = page => {
    setCurrentPage(page);
  };


  const handleChange = (value) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };


  return (
    <div className='lista-selects'>
      <List
        itemLayout="horizontal"
        dataSource={allUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize)} // Aplica la paginación en la lista de usuarios
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.img[0]} />}
              title={item.firstname}
              description={item.email}
            />

            <div className='selected-modifyUsers'>
              <Select
                placeholder="Rol definido"
                style={{
                  width: 120,
                }}>
                <Select.Option value="usuario-por-defecto">Usuario por defecto</Select.Option>
                <Select.Option value="administrador">Administrador</Select.Option>

              </Select>

              <Select
                placeholder="Estado"
                style={{
                  width: 90,
                }}>
                <Select.Option value="status-active">Activo</Select.Option>
                <Select.Option value="status-inactive">Inactivo</Select.Option>

              </Select>
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