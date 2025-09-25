# --- imagem base com nginx leve
FROM nginx:stable-alpine

# Atualiza os pacotes para corrigir vulnerabilidades
RUN apk update && apk upgrade --no-cache

# Copia os arquivos estáticos para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# --- meta-informação: container "ouve" a porta 80
EXPOSE 80

# --- comando padrão (nginx em foreground)
CMD ["nginx", "-g", "daemon off;"]

