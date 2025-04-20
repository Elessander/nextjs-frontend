FROM node:20-alpine

WORKDIR /app

# Cache de dependências
COPY package*.json ./
RUN npm install

# Copia o resto do código
COPY . .

# Build da aplicação
RUN npm run build

# Porta exposta
EXPOSE 4000

# Comando de inicialização
CMD ["npm", "start"]