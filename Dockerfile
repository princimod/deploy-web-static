# --- imagem base com nginx leve
FROM nginx:stable-alpine

# --- copia os arquivos estáticos gerados para o diretório padrão do nginx
COPY ./src /usr/share/nginx/html

# --- (opcional) substitui o default.conf por um personalizado
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# --- meta-informação: container "ouve" a porta 80
EXPOSE 80

# --- comando padrão (nginx em foreground)
CMD ["nginx", "-g", "daemon off;"]
