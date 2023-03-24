import { useState } from "react";
import "./Admin.css";
import { PlusOutlined } from '@ant-design/icons';
import {
    Menu
} from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import FromularioCrearJuego from "./FormCrearJuego";
import {FormCreateProduct} from "./FormCreateProduct"


function getItem(label, key, icon, children, type) {

    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Dashboard', null, <MailOutlined />, [
        getItem('Analytics finance', '1'),
    ]),

    getItem('Articles', 'sub2', <AppstoreOutlined />, [
        getItem('New Product', '1'),
        getItem('Modify User', '2'),
        getItem('Modify Games', '3'),
        getItem('List Products', '4'),
        getItem('See Payments ', '5'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ])

];



function Admin() {

    const [theme, setTheme] = useState('ligth');
    const [current, setCurrent] = useState('1');
    const [state, setState] = useState("");


    const onClick = (e) => {

        console.log('click ', e);
        setCurrent(e.key);

        if (e.key === "1") {
            setState("crear-juego");
        }

        if (e.key === "2") {
            setState("modify-user");
        }

        if (e.key === "3") {
            setState("modify-games");
        }

        if (e.key === "4") {
            setState("list-products");
        }

        if (e.key === "5") {
            setState("see-payments");
        }

    };

    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };


    if (true) {

        return (

        <div className="admin-component">

            <div className="userInfoContainer">

                    <div className="menuOptions">

                        <br />
                        <br />
                        <Menu
                            theme={theme}
                            onClick={onClick}
                            style={{
                                width: 256,
                            }}
                            defaultOpenKeys={['sub1']}
                            selectedKeys={[current]}
                            mode="inline"
                            items={items}
                        />
                    </div>

               

                {state === "crear-juego" ?

                    <div><FormCreateProduct/></div>

                    :

                    <div></div>

                }
                {state === "modify-user" ?

                    <div>Form Modify User</div>

                    :

                    <div></div>

                }

                {state === "modify-games" ?

                    <div></div>

                    :

                    <div></div>

                }

                {state === "list-products" ?

                    <div>Form Modify List Products</div>

                    :

                    <div></div>

                }

                {state === "see-payments" ?

                    <div>Form Modify See Payments</div>

                    :

                    <div></div>

                }

            </div>

            </div>

        );

    }

};

export default Admin;
