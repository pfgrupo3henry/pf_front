import { useState } from "react";
import "./Admin.css";
import { Button } from 'antd';



function CrearJuego() {

    const [state, setState] = useState("buttons");
    const [inputJuego, setInputJuego] = useState({
        nombre: "",
        precio: "",
        rating: "",
        descripcion: "",
        imagen: "",
        genero: "",
        consola: ""
    });

    const onClickCrearJuego = () => {
        setState("crear-juego")
    };

    const onClickModificarJuego = () => {
        setState("modificar-juego")
    };

    const onClickModificarUsuario = () => {
        setState("modificar-usuario")
    };

    const onClickVerPagos = () => {
        setState("ver-pagos")
    };

    const onClickReturn = () => {
        setInputJuego({
            nombre: "",
            precio: "",
            rating: "",
            descripcion: "",
            imagen: "",
            genero: "",
            consola: ""
        })
        setState("buttons")
    };

    if (state === "buttons") {

        return (

            <div className="admin-body">

                <div className="button-admin-body">

                    <Button type="primary" block onClick={onClickCrearJuego}>
                        Crear Juego
                    </Button>

                </div>

                <div className="button-admin-body">

                    <Button type="primary" block onClick={onClickModificarJuego}>
                        Modificar Juego
                    </Button>

                </div>

                <div className="button-admin-body">

                    <Button type="primary" block onClick={onClickModificarUsuario}>
                        Desabilitar / Habilitar , Usuario
                    </Button>

                </div>

                <div className="button-admin-body">

                    <Button type="primary" block onClick={onClickVerPagos}>
                        Ver Compras
                    </Button>

                </div>

            </div>

        );

    } else if (state === "crear-juego") {

        const onChangeInputJuego = (e) => {
            setInputJuego({
                ...inputJuego,
                [e.target.name]: e.target.value
            });

            console.log(inputJuego);
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

            <div className="body-color-admin">

                <section className="form-admin">

                    <h4>Crear Juego</h4>

                    <input onChange={onChangeInputJuego} className="controls" type="text" name="nombre" placeholder="escriba el nombre" value={inputJuego.nombre} />
                    {errorName === "error" ? <p className="parrafo-juego">Nombre debe minimo 3 letras</p> : <p></p>}

                    <input onChange={onChangeInputJuego} className="controls" type="text" name="precio" placeholder="escriba el precio" value={inputJuego.precio} />
                    {errorPrecio === "error" ? <p className="parrafo-juego">Precio debe tener 3 o 4 numeros</p> : <p></p>}

                    <input onChange={onChangeInputJuego} className="controls" type="text" name="rating" placeholder="escriba el rating" value={inputJuego.rating} />
                    {errorRating === "error" ? <p className="parrafo-juego">Rating debe ser mayor a 0 y menor a 6</p> : <p></p>}

                    <input onChange={onChangeInputJuego} className="controls" type="text" name="descripcion" placeholder="descripcion" value={inputJuego.descripcion} />
                    {errorDescripcion === "error" ? <p className="parrafo-juego">Descripcion debe minimo 10 letras</p> : <p></p>}

                    <input onChange={onChangeInputJuego} className="controls" type="text" name="imagen" placeholder="imagen" value={inputJuego.imagen} />
                    {errorImagen === "error" ? <p className="parrafo-juego">Imagen debe minimo 10 letras</p> : <p></p>}

                    <select className="controls" onChange={onChangeSelectGenero} name="genero" id="select-generos">

                        <option>Encontra tu genero</option>
                        <option>Accion</option>
                        <option>Aventura</option>
                        <option>Multijugador</option>
                        <option>Carreras</option>

                    </select>

                    {inputJuego.genero ? <p className="parrafo-juego">{inputJuego.genero}</p> : <p></p>}

                    <select className="controls" onChange={onChangeSelectConsola} name="consola" id="select-consolas">

                        <option>Encontra tu consola</option>
                        <option>PlayStation 1</option>
                        <option>PlayStation 2</option>
                        <option>PlayStation 3</option>
                        <option>PlayStation 4</option>
                        <option>PlayStation 5</option>

                    </select>

                    {inputJuego.consola ? <p className="parrafo-juego">{inputJuego.consola}</p> : <p></p>}

                    <button className="buttons-form" onClick={onClickReturn}>Sumbit</button>

                    <button className="buttons-return" onClick={onClickReturn}>Return</button>

                </section>

            </div>

        )

    } else if (state === "modificar-juego") {

        return (

            <div>

                modificar-juego

            </div>

        )

    } else if (state === "modificar-usuario") {

        return (

            <div>

                modificar-usuario

            </div>

        )

    } else if (state === "ver-pagos") {

        return (

            <div>

                ver-pagos

            </div>

        )

    }

};

export default CrearJuego;