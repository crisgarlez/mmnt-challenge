# Momentu Challeng: Cristhian García Vélez

Este repositorio fue desarrollado en base a los requerimientos de Momentu y consta de:

* Ambiente configurado mediante docker-compose
* Base de datos PostgreSQL 
* Cliente de Base de datos pgadmin4 http://localhost:5050/
* Backend con NodeJS http://localhost:8080/
* Frontend con ReactJS http://localhost/
* Integración de pagos con PayPal

## Instalación

Para instalar, ejecute los siguientes comandos:

1. Clonar el repositorio usando el comando:  `git clone https://github.com/crisgarlez/mmnt-challenge.git`
2. Entrar al directorio del proyecto 'mmnt-challenge' `cd mmnt-challenge`
3. Entrar al directorio del frontend del proyecto 'mmnt-challenge' `cd frontend`
4. Crear el archivo .env `touch .env`
5. Dentro del archivo .env, agregar las siguientes variables:
    - REACT_APP_API_URL=http://localhost:8080/
6. Regresar a la carpeta raiz del proyecto `cd ..`
7. Construir el backend del proyecto `docker-compose -f ./docker/docker-compose.yml build backend`
8. Construir el frontend del proyecto `docker-compose -f ./docker/docker-compose.yml build frontend`
9. Levantar el ambiente usando docker-compose `docker-compose -f ./docker/docker-compose.yml up -d`
10. Inicializar la base de datos `docker exec mmnt-challenge-backend npm run migrations:run`
11. Obtener la IP de la base de datos `docker inspect mmnt-challenge-db`
    - Al final del resultado del comando se mostrar algo como:
    - ``` "Networks": {
                "docker_app-network": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": [
                        "postgres",
                        "4a270f7c3d53"
                    ],
                    "NetworkID": "d9a7dbf56b19fd7dbf769abeeb4096740fe7114c16fa081879389ba65e3bc30e",
                    "EndpointID": "e5899ecaa715618cea4088fb8eb8a42fdbf85a15afbd557dfcfbba2ad001357e",
                    "Gateway": "172.18.0.1",
                    "IPAddress": "172.18.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:12:00:02",
                    "DriverOpts": null
                }
            }
    - Copiar la IP`"IPAddress": "172.18.0.2",`
    - Esta IP la usaremos para gestionar la BD con pgadmin4
12. Abrir pgadmin4 en el browser `http://localhost:5050/`
13. Inicia sesión con el usuario `admin@mail.com` y la contraseña `root`
14. Registra el servidor con los siguientes datos:
    1. Nombre: `mmnt-challenge`
    2. Host: `172.18.0.2` (La IP que copiaste anteriormente en el paso 11)
    3. Puerto: `5432`
    4. Base de datos: `mmnt_challenge_db`
    5. Usuario: `admin`
    6. Contraseña: `admin123`
15. Crear un usuario administrador usando Postman
    1. POTS a la url `http://localhost:8080/api/v1/users`
    2. Enviar el siguiente body:
    3. ```
       {
       "email": "admin@admin.com",
       "password": "admin123",
       "role": "admin"
       }
    4. Verificar que el usuario se ha creado correctamente
       1. GET a la url `http://localhost:8080/api/v1/users`

## USO

1. Abrir el frontend en el navegador `http://localhost/`
2. Iniciar sesión con el usuario creado anteriormente en el paso 15
3. AL ser un usuario administrador podrás crear categorías y productos
4. Crea al menos una categoría y un producto
5. Cierra sesión
6. En la pantalla de login podrás ver el link de registro de clientes
7. Registra un cliente
8. Accede a la pantalla de login con las credenciales del cliente creado
9. Podrás ver el listado de productos, agrega al menos uno al carrito
10. En el menú superior, podrás ver el carrito de compras, dale clieck para continuar con la compra
11. Dale clieck en el boton de pagar
12. Podrás ver el boton de pagos de PayPal
13. Inicia sesión en PayPal o crea una cuenta nueva (el ambiente es Sandbox)
14. Puedes usar la tarjeta 4242 4242 4242 4242 con una cvv de 123 y una fecha de expiración de 01/24
15. Dale click en el boton de pagar
16. Podrás ver el mensaje de confirmación de la compra
17. Dale click en el boton de 'mis órdenes' en el menú superior
18. Podrás ver el listado de órdenes y seleccionar una para ver su detalle

## NOTAS

Con esto se cubre los puntos del requerimiento

1. Desarrollo de un servicio en NodeJS
   1. Registro de un usuario
   2. Login de un usuario.
   3. Registro de productos en una plataforma de compras.
2. Bono por el backup de la base de datos (en este caso se agregaron las migraciones)
   1. Registro de pedidos (en este caso el pedido se registra luego del pago con paypal)
   2. Usar alguna plataforma de pagos en modo sandbox 
