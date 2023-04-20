import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import "./Admin.css";
import axios from "axios";
import { getCards } from '../../Redux/Actions/Index';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
} from 'antd';
import { useDispatch } from 'react-redux';

function ModificarJuego() {

    const dispatch = useDispatch()

    const [fileList, setFileList] = useState([]);
    const { TextArea } = Input;
    const Swal = require('sweetalert2');
    const handleFileListChange = ({ fileList }) => {
        setFileList(fileList);
    };
    const [formImage, setformImage] = useState(
        {
            img: "",
        }
    )

    const handleSubmit = (event) => {

        let data = {
            name: event.name,
            description: event.Description,
            stock: event.stock,
            img: [fileList[0].thumbUrl],
            price: event.price,
            genre: event.genre,
            platform: event.console,
        };

        let todasCompletas = true;

        for (const propiedad in data) {
            if (!data[propiedad]) {
                todasCompletas = false;
                break;
            }
        }

        if (todasCompletas) {

            console.log(data);
            console.log(data.img[0]);

            axios.put("https://pfservidor-production.up.railway.app/videogames/modify/img", data)
                .then((res) => {
                    console.log(res);
                    Swal.fire({
                        title: "Success!",
                        text: 'Juego Modificado',
                        icon: "success",
                        confirmButtonText: 'Ok'
                    }).then((res) => {
                        dispatch(getCards())
                        window.location.reload();
                    })
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        title: "Error!",
                        text: 'Error en la modificacion del juego',
                        icon: "error",
                        confirmButtonText: 'Ok'
                    })
                })

        } else {
            console.log("Faltan propiedades por completar");
            Swal.fire(
                'hmm wait a minute..',
                '¡All fields have to completed!',
                'warning'
            )
        }

    };

    const handleSubmit2 = (event) => {
        setFileList(event.fileList);
    }

    return (
        <>
            <div className='formCreateNewProduct'>
                <Form
                    onFinish={(event) => handleSubmit(event)}
                    name='basic'
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    style={{
                        maxWidth: 800,
                    }}

                >

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Choose a name for the new product' }]}

                    >
                        <Select placeholder="Choose Game  ">
                            <Select.Option value="A Way Out PS4">A Way Out PS4</Select.Option>
                            <Select.Option value="A Way Out PS5 Retro">A Way Out PS5 Retro</Select.Option>
                            <Select.Option value="Alien Isolation PS3">Alien Isolation PS3</Select.Option>
                            <Select.Option value="Alien Isolation PS5 Retro">Alien Isolation PS5 Retro</Select.Option>
                            <Select.Option value="Among Us">Among Us</Select.Option>
                            <Select.Option value="Among Us PS5">Among Us PS5</Select.Option>
                            <Select.Option value="Anthem">Anthem</Select.Option>
                            <Select.Option value="Anthem PS5 Retro">Anthem PS5 Retro</Select.Option>
                            <Select.Option value="ARK Survival Evolved">ARK Survival Evolved</Select.Option>

                            <Select.Option value="ARK Survival Evolved PS5 Retro">ARK Survival Evolved PS5 Retro</Select.Option>
                            <Select.Option value="Army of Two The Devils Cartel">Army of Two The Devils Cartel</Select.Option>
                            <Select.Option value="Assassins Creed">Assassins Creed</Select.Option>
                            <Select.Option value="Asassins Creed 3">Asassins Creed 3</Select.Option>
                            <Select.Option value="Assassins Creed 4 Black Flag">Assassins Creed 4 Black Flag</Select.Option>
                            <Select.Option value="Assassins Creed 4 Black Flag PS5 Retro">Assassins Creed 4 Black Flag PS5 Retro</Select.Option>
                            <Select.Option value="Back 4 Blood">Back 4 Blood</Select.Option>
                            <Select.Option value="Back 4 Blood PS5">Back 4 Blood PS5</Select.Option>
                            <Select.Option value="Batman Arkham City">Batman Arkham City</Select.Option>
                            <Select.Option value="Batman Arkham Knight">Batman Arkham Knight</Select.Option>

                            <Select.Option value="Batman Arkham Origins">Batman Arkham Origins</Select.Option>
                            <Select.Option value="Battlefield 5">Battlefield 5</Select.Option>
                            <Select.Option value="Bayonetta">Bayonetta</Select.Option>
                            <Select.Option value="Cal of Duty Black Ops 3">Cal of Duty Black Ops 3</Select.Option>
                            <Select.Option value="Call of Duty Black Ops 4 PS5 Retro">Call of Duty Black Ops 4 PS5 Retro</Select.Option>
                            <Select.Option value="Crash Bandicoot N Sane Trilogy">Crash Bandicoot N Sane Trilogy</Select.Option>
                            <Select.Option value="Cuphead PS5 Retro">Cuphead PS5 Retro</Select.Option>
                            <Select.Option value="Digimon World Next Order">Digimon World Next Order</Select.Option>
                            <Select.Option value="Devil May Cry HD Collection PS5 Retro">Devil May Cry HD Collection PS5 Retro</Select.Option>
                            <Select.Option value="Diablo 3 Reaper of Souls Ultimate Evil Edition">Diablo 3 Reaper of Souls Ultimate Evil Edition</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Console"
                        name="console"
                        rules={[
                            {
                                required: true,
                                message: "Enter the correct category"
                            },
                        ]}
                    >
                        <Select placeholder="PS5/PS4/PS3  ">
                            <Select.Option value="PS5">PS5</Select.Option>
                            <Select.Option value="PS4">PS4</Select.Option>
                            <Select.Option value="PS3">PS3</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Genere"
                        name="genre"
                        rules={[
                            {
                                required: true,
                                message: "Select an genere"
                            },
                        ]}>
                        <Select placeholder="Choose an genere">
                            <Select.Option value="Acción">Action</Select.Option>
                            <Select.Option value="Aventura">Adventure</Select.Option>
                            <Select.Option value="Conducción">Driving</Select.Option>
                            <Select.Option value="Deportes">Sports</Select.Option>
                            <Select.Option value="Infantiles">Children</Select.Option>
                            <Select.Option value="Multijugador">Multiplayer</Select.Option>
                            <Select.Option value="Rol">Role </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item

                        className=''
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Enter a price per unit' }]}

                    >
                        <InputNumber
                            className='priceInput'
                            placeholder="Price per unit" />
                    </Form.Item>

                    <Form.Item label="Upload" valuePropName="fileList"
                        name="upload"
                        getValueFromEvent={handleFileListChange}
                        initialValue={fileList[0]}
                        size={10}
                        rules={[
                            {
                                required: false,
                                message: "Upload a picture"
                            },
                        ]}>
                        <Upload
                            action="/upload.do"
                            listType="picture-card"
                            onChange={(event) => { handleSubmit2(event) }}
                        >

                            <div>
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Image
                                </div>
                            </div>
                        </Upload>

                    </Form.Item>

                    <Form.Item label="Stock"
                        name="stock"
                        rules={[
                            {
                                required: true,
                                message: "Please enter an quantity"
                            },
                        ]}>
                        <InputNumber placeholder="1,2,3" />
                    </Form.Item>

                    <Form.Item label="Description"
                        name="Description"
                        rules={[
                            {
                                required: true,
                                message: "Write some about the product"
                            },
                        ]}>
                        <TextArea placeholder="About product" rows={4} />
                    </Form.Item>

                    <Form.Item >
                        <Button
                            className='buttonFormCreateProduct'
                            htmlType="submit"
                        >Modificar Producto</Button>
                    </Form.Item>

                </Form>

            </div>

        </>

    );

};

export default ModificarJuego;