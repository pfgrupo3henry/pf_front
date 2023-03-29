import { useState, React } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import "./Login.css"
import FormItem from "antd/es/form/FormItem";

function LoginForm (){

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };


      const [state, setState] = useState("login");
      const [input, setInput] = useState({
          name: "",
          lastName: "",
          email: "",
          password: "",
          mobile: "",
          nacionalidad: ""
      });
  
      const onClickState = () => {
  
          if (state === "login") {
              setState("sing-up")
          } else if (state === "sing-up") {
              setState("login")
              setInput({
                  name: "",
                  lastName: "",
                  email: "",
                  password: "",
                  mobile: "",
                  nacionalidad: ""
              })
          }
      };
  


    return(
        <div className="loginForm-component">
            <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <div className="buttonOrRegister">
        <Button 
        type="primary" 
        htmlType="submit" 
        onClick={onClickState}
        className="login-form-button button">
          Log in
        </Button>
        </div>
      </Form.Item>
      <FormItem>
      Or  <a href="">register now!</a>
      </FormItem>
        
    </Form>
        </div>
    )

}

export {LoginForm}