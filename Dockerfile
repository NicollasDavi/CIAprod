# Usar uma imagem base oficial Node.js
FROM node:latest

WORKDIR /app

# Configurar npm para ignorar certificados SSL autoassinados
RUN npm config set strict-ssl false

# Copiar package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o projeto
COPY . .

# Construir o projeto Next.js
RUN npm run build

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
