import { useState } from "react";
import "./Admin.css";
import { PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    Upload,
    Select
} from 'antd';



function FromularioCrearJuego() {

    const { TextArea } = Input;

    const [inputJuego, setInputJuego] = useState({
        nombre: "",
        precio: "",
        rating: "",
        descripcion: "",
        imagen: "",
        genero: "",
        consola: ""
    });

    const onClickSubmit = () => {
        setInputJuego({
            nombre: "",
            precio: "",
            rating: "",
            descripcion: "",
            imagen: "",
            genero: "",
            consola: ""
        })
    };

    const onChangeInputJuego = (e) => {
        setInputJuego({
            ...inputJuego,
            [e.target.name]: e.target.value
        });

        console.log(inputJuego);
    };

    const onChangeInputImage = (e) => {
        setInputJuego({
            ...inputJuego,
            imagen: e.name
        });

        console.log(inputJuego);
        console.log(e);
    };

    const onChangeSelectGenero = (e) => {

        const selectGeneros = document.getElementById('select-generos');


        setInputJuego({
            ...inputJuego,
            [e.target.name]: `${inputJuego.genero} ${e.target.value}`
        });

        console.log(inputJuego);

        selectGeneros.value = "Encontra tu genero";
    };

    const onChangeSelectConsola = (e) => {

        const selectConsolas = document.getElementById('select-consolas');


        setInputJuego({
            ...inputJuego,
            [e.target.name]: `${inputJuego.consola} ${e.target.value}`
        });

        console.log(inputJuego);

        selectConsolas.value = "Encontra tu consola";
    };

    if (inputJuego.nombre.length >= 1 && inputJuego.nombre.length <= 3) {
        var errorName = "error";
    };

    if (inputJuego.precio.length !== 0) {

        if (isNaN(inputJuego.precio) || inputJuego.precio.length <= 2 || inputJuego.precio.length >= 5) {
            var errorPrecio = "error";
        }

    };

    if (inputJuego.rating.length !== 0) {

        if (isNaN(inputJuego.rating) || inputJuego.rating.length >= 2 || inputJuego.rating < 1
            || inputJuego.rating >= 6) {
            var errorRating = "error";
        }

    };

    if (inputJuego.descripcion.length >= 1 && inputJuego.descripcion.length <= 9) {
        var errorDescripcion = "error";
    };

    if (inputJuego.imagen.length >= 1 && inputJuego.imagen.length <= 9) {
        var errorImagen = "error";
    };

    return (

        <div className="form-ant">

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >

                <h1>Crear Juego</h1>

                <Form.Item label="Nombre">
                    <Input onChange={onChangeInputJuego} name="nombre" placeholder="escriba el nombre" value={inputJuego.nombre} />
                    {errorName === "error" ? <p className="parrafo-juego">Nombre debe tener minimo 3 letras</p> : <p></p>}
                </Form.Item>

                <Form.Item label="Precio">
                    <Input onChange={onChangeInputJuego} name="precio" placeholder="escriba el precio" value={inputJuego.precio} />
                    {errorPrecio === "error" ? <p className="parrafo-juego">Precio debe tener 3 o 4 numeros</p> : <p></p>}
                </Form.Item>

                <Form.Item label="Rating">
                    <Input onChange={onChangeInputJuego} name="rating" placeholder="escriba el rating" value={inputJuego.rating} />
                    {errorRating === "error" ? <p className="parrafo-juego">Rating debe ser mayor a 0 y menor a 6</p> : <p></p>}
                </Form.Item>

                <Form.Item label="Genero">
                    <Select name="genero" id="select-generos" onChange={onChangeSelectGenero} className="select-form">
                        <option>Encontra tu genero</option>
                        <option>Carreras</option>
                        <option>Multijugador</option>
                        <option>Pelas</option>
                        <option>Aventuras</option>
                    </Select>
                </Form.Item>

                {inputJuego.genero ? <p className="parrafo-juego-select">{inputJuego.genero}</p> : <p></p>}

                <Form.Item label="Consola">
                    <select name="consola" id="select-consolas" onChange={onChangeSelectConsola} className="select-form">
                        <option>Encontra tu consola</option>
                        <option>Play Station</option>
                        <option>Sega</option>
                        <option>Nintendo</option>
                        <option>X-Box</option>
                    </select>
                </Form.Item>

                {inputJuego.consola ? <p className="parrafo-juego-select">{inputJuego.consola}</p> : <p></p>}

                <Form.Item label="Descripcion">
                    <TextArea rows={4} onChange={onChangeInputJuego} name="descripcion" placeholder="descripcion" value={inputJuego.descripcion} />
                    {errorDescripcion === "error" ? <p className="parrafo-juego">Descripcion debe minimo 10 letras</p> : <p></p>}
                </Form.Item>

                <Form.Item label="Imagen" valuePropName="fileList">
                    <Upload action={onChangeInputImage} listType="picture-card" name="imagen">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item label="Buttons">
                    <Button onClick={onClickSubmit}>Submit</Button>
                </Form.Item>

            </Form>

        </div >

    );

};

export default FromularioCrearJuego;