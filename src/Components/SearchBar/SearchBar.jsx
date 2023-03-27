import "./search.css";
import { Input, Space } from "antd";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName, setNameFilter } from "../../Redux/Actions/Index";

function SearchBar() {
  const { Search } = Input;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const onSearch = (value) => {
    dispatch(searchByName(value));
    dispatch(setNameFilter(value));
    setValue("");
  };

  return (
    <Space direction="vertical">
      <Search
        placeholder="Buscar juego"
        allowClear
        onSearch={onSearch}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        style={{
          width: 250,
        }}
      />
    </Space>
  );
}

export default SearchBar;
