import "./search.css";
import { Input, Space } from "antd";
const { Search } = Input;

const onSearch = (value) => console.log(value);
const SearchBar = () => (
  <Space direction="vertical">
    <Search
      placeholder="input search text"
      allowClear
      onSearch={onSearch}
      style={{
        width: 250,
      }}
    />
  </Space>
);
export default SearchBar;
