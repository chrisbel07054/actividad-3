# Integrantes

  - Luisiana Valeria Carreño Viloria
  - Chrisbel Alexandra Briceño Briceño
  - Luis Orlando Rodríguez Hernández
  - Francisco Javier Duran Mendez

# Profesor

  - Prof. Ing. Roberto di michele

# Funcionalidades
- Inicio de sesion
- Crear usuario (Siempre tendra el rol de editor, ya se creo uno con rol administrador)
- Obtener usuario
- Actualizar usuario
- Eliminar usuario
- Crear modalidad
- Obtener modalidad
- Actualizar modalidad
- Eliminar modalidad
- Crear categoria (Limitado a solo usuarios con rol administrador)
- Obtener categoria
- Actualizar categoria (Limitado a solo usuarios con rol administrador)
- Eliminar categoria (Limitado a solo usuarios con rol administrador)
- Agregar una categoria a una modalidad
- Eliminar una categoria a una modalidad
- Crear equipo
- Obtener equipo
- Obtener equipo por categoria
- Eliminar categoria de equipo
- Actualizar equipo
- Eliminar equipo
- Crear patrocinador
- Obtener patrocinador
- Actualizar patrocinador
- Eliminar patrocinador
- Vista para modalidad (http://localhost:8080/api/modalidad)
- Vista para patrocinador (http://localhost:8080/api/patrocinador)

# Instrucciones para utilizar los scripts de mongo-migrate

1. Crea un archivo con extension js
2. Importa la colecion y crea el index
3. utiliza el siguiente comando que esta agregado como un scripts npm run mongo-migrate:run y este 
ejecutara todos los scripts creados, si solo quiero ejecutar un script luego lo realizamos de esta forma
npm run mongo-migrate:run script.js

# Instrucciones

1. Descargar el repositorio
2. Extraer la carpeta
3. Abrir Visual Studio Code
4. Instalar los modulos de node con npm install
5. Correr el servidor con node index.js
6. Disfrutar ldel servidor