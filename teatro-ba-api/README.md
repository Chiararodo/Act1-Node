# 🎭 API Teatro BA

API REST de obras de teatro en Buenos Aires.  
Proyecto desarrollado en **Node.js + Express + MongoDB**, como parte del parcial de la materia **Aplicaciones Híbridas**.

o Alumnas: Chiara Rodó y Morena Castro
o Materia: Aplicaciones Híbridas
o Docente: Jonathan Emanuel Cruz
o Comisión: DWM4AP

---

## 🚀 Tecnologías
- Node.js  
- Express  
- MongoDB + Mongoose  
- Dotenv (manejo de variables de entorno)  
- Morgan (logs HTTP)  
- Cors (soporte para clientes externos)  

---

## ⚙️ Instalación y uso

1. Clonar el repositorio o descargarlo en tu máquina:
   ```bash
   git clone <URL_DEL_REPO>
   cd teatro-ba-api
   ```

2. Instalar dependencias:
   ```bash
   npm install express mongoose dotenv morgan cors nodemon
   ```

3. Configurar las variables de entorno en un archivo `.env`:
   ```ini
   PORT=4000
   MONGODB_URI=mongodb://127.0.0.1:27017/teatroBA
   ```

4. Levantar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

   O en modo producción:
   ```bash
   npm start
   ```

5. Abrir en el navegador [http://localhost:4000](http://localhost:4000) para ver la página de inicio con los links a las rutas.

---

## 📌 Endpoints principales

### 🎭 Teatros (`/api/teatros`)
- **GET** `/api/teatros` → Lista todos los teatros  
- **POST** `/api/teatros` → Crea un nuevo teatro  
- **PUT** `/api/teatros/:id` → Actualiza un teatro existente  
- **DELETE** `/api/teatros/:id` → Elimina un teatro  

Ejemplo JSON (POST → crear teatro):
```json
{
  "nombre": "Teatro Gran Rex",
  "barrio": "San Nicolás",
  "direccion": "Av. Corrientes 857",
  "capacidad": 3200,
  "web": "https://www.teatro-granrex.com.ar",
  "telefono": "011-4325-7300"
}
```

---

### 🎟️ Obras (`/api/obras`)
- **GET** `/api/obras` → Lista todas las obras  
- **POST** `/api/obras` → Crea una nueva obra  
- **PUT** `/api/obras/:id` → Actualiza una obra existente  
- **DELETE** `/api/obras/:id` → Elimina una obra  

Ejemplo JSON (POST → crear obra):
```json
{
  "titulo": "La Sirenita",
  "genero": "Musical",
  "teatro": "ID_DEL_TEATRO",
  "duracionMin": 90,
  "elenco": ["Albana Fuentes", "Jose Maria Listorti"],
  "director": "Ariel Del Mastro",
  "precioDesde": 30000,
  "estreno": "2025-06-05",
  "funciones": ["Vie 20:00", "Sáb 21:00"],
  "edad": "+6",
  "descripcion": "Versión acortada del musical de Broadway."
}
```

---

### 👤 Usuarios (/api/usuarios)
- **GET** `/api/usuarios` → Lista todos los usuarios  
- **POST** `/api/usuarios` → Crea un nuevo usuario  
- **PUT** `/api/usuarios/:id` → Actualiza un usuario existente  
- **DELETE** `/api/usuarios/:id` → Elimina un usuario  

Ejemplo JSON (POST → crear usuario):
```json
{
  "nombre": "Chiara",
  "email": "chiara@example.com",
  "password": "123456",
  "foto": "perfil1.png"
}

```

---

## 🛠️ Herramientas de prueba
Se recomienda usar **Postman** para probar los endpoints con los métodos GET, POST, PUT y DELETE.

---

## 👩‍💻 Autoras
Proyecto realizado por **Chiara Rodo** y **Morena Castro** para la materia **Aplicaciones Híbridas**.  
Docente: **Jonathan Emanuel Cruz**.
