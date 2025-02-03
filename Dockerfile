# Usa una imagen base de Node.js para compilar la aplicación
FROM node:18 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Definir un argumento para seleccionar la configuración de compilación
ARG CONFIGURATION=production

# Construye la aplicación Angular con la configuración recibida
RUN npm run build -- --configuration=$CONFIGURATION

# Usa una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos a la carpeta predeterminada de Nginx
COPY --from=build /app/dist/drivers-web/browser /usr/share/nginx/html

# Configuración personalizada de NGINX para asegurar el puerto correcto
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
