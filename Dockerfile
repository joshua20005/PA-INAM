# 1. Elegimos nuestra imagen base
FROM nginx:alpine

# 2. Eliminamos los archivos por defecto que trae Nginx para evitar conflictos
RUN rm -rf /usr/share/nginx/html/*

# 3. Copiamos todos los archivos de tu frontend a la carpeta pública de Nginx
COPY . /usr/share/nginx/html/

# 4. Exponemos el puerto 80 (el estándar de internet)
EXPOSE 80

# 5. Instrucción para mantener a Nginx ejecutándose en primer plano
CMD ["nginx", "-g", "daemon off;"]