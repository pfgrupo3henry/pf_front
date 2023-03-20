import React from "react";
import {
    Card, CardBody, ButtonGroup, Image, Stack, Heading, Text, Box
} from '@chakra-ui/react';
import "./CardDetail.css";
import { Rate } from 'antd';




function CardDetail() {



    return (

        <Box>

            <Card
                padding="20px"
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
            >
                <Image
                    padding="20px"
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src='https://sm.ign.com/ign_es/game/a/among-us/among-us_crsm.jpg'
                    alt='Among Us'
                />

                <Stack padding="20px">

                    <CardBody>

                        <Heading fontSize='40px'>Among Us</Heading>

                        <br></br>

                        <Heading fontSize='30px'>Desde 1.950 $</Heading>

                        <br></br>

                        <Heading fontSize='25px'>Rating: <Rate disabled allowHalf defaultValue={3.5} /></Heading>

                        <br></br>
                        <br></br>

                        <Text fontSize='20px'>
                            Among Us es un juego multijugador en línea con clasificación PEGI 7+
                            que permite que un máximo de 10 jugadores asuman los roles de
                            'Compañero de tripulación' o 'Impostor'. El objetivo del juego es que
                            los Crewmates identifiquen a los jugadores que son los impostores en el juego.
                        </Text>

                        <br></br>
                        <br></br>

                        <ButtonGroup>
                            <button className="card-button">COMPRAR</button>
                            <button className="card-button">AÑADIR AL CARRO</button>
                        </ButtonGroup>

                    </CardBody>

                </Stack>

            </Card>

            <Stack padding="20px">

                <Heading fontSize='40px'>Valoracion y reseña</Heading>
                <button className="card-button">Valorar</button>

                <br></br>

                <Image
                    maxW="35px"
                    src='https://img.freepik.com/vector-premium/perfil-hombre-dibujos-animados_18591-58482.jpg?w=2000'
                    alt='Imagen Perfil'
                />

                <Text fontSize="20px">Pedro Perez <Rate disabled allowHalf defaultValue={3.5} /></Text>

                <Text>
                    De mi top 10 a no jugarlo.
                    El juego siempre estuvo bien, tu manera de "comunicarte" hasta cierto punto definía
                    partidas y era bastante entretenido.Yo al menos conseguí una habilidad escribiendo con el móvil gracias a
                    Among Us. Pero hace un tiempo sacaron una maravillosa actualización donde implementavan el chat rápido
                    cuya función era hacer más rápida la respuesta de los jugadores..
                    La magia murió paso de jugar con alguien a poder ser perfectamente un bot , ya no había interacción,
                    ponerse nervioso absolutamente nada paso a ser frío y un juego donde si no eres impostor es mejor
                    abandonar la partida dado que no hay nada interesante que hacer.
                    En fin sus propios creadores destruyeron el juego más popular del 2020.
                </Text>

                <br></br>

                <Image
                    maxW="35px"
                    src='https://img.freepik.com/vector-gratis/silueta-perfil-mujer_23-2147502125.jpg?w=2000    '
                    alt='Imagen Perfil'
                />

                <Text fontSize="20px">Marta Rodriguez <Rate disabled allowHalf defaultValue={3.5} /></Text>

                <Text>
                    Ta bien.
                    Trama: Eres un astronauta cualquiera en una nave, y entre tantos deberás encontrar al impostor que
                    querrá matar a todos.
                    Jugabilidad: Tienes que hacer tareas simples para verificar que la nave este bien, también tienes
                    opciones de mirar cámaras (Esto por alguna razón me recordó a FNaF) si encuentras un cuerpo tienes que
                    reportarlo y tendras que discutir con los demas por el chat para descifrar quien es el impostor,si
                    crees que alguien lo es solo vota por el,si los votos de 2 llegan a empatar no se expulsara a nadie,y
                    si eres impostor tu tienes que ser sigiloso y tratar de matar a todos lo posible,tambien puedes
                    esconderte usando las ventilaciones.
                    Graficos: Se ve cutre y la interfaz es aberrante
                    Sonido: Esta meh,aunque a veces llega a sonar mal,tipico de un juego flash
                    Innovación: Que pensaban? que iba a ponerle 5 por eso de que encontrar al malo es nuevo?
                    PUES NO,esta tematica ya estaba en otros juegos tales como Trouble Terrorist Town de GMOD,hasta
                    tambien ya existia un juego en Roblox llamado Muder Mystery que me entretiene mas que esto.
                    El juego esta bien,aunque llega a ser repetitivo,la mejor experiencia es cuando juegas con amigos
                    en Discord,chulisimo.
                </Text>

            </Stack>

        </Box>

    );

};

export default CardDetail;