![image](https://github.com/user-attachments/assets/d4815f96-4505-4c10-b1b9-3a175b60c170)

# Payment Checker System

Este projeto é um sistema de apuração de pagamentos para professores, desenvolvido com Node.js no backend e React no frontend. Permite verificar se um professor possui valores a receber por módulo de curso e atualizar seu status de pagamento.

## Funcionalidades

- **Listagem de Cursos**: Ao iniciar, o frontend recebe a lista de cursos disponíveis do backend.
- **Seleção de Professor e Módulo**: Após escolher um curso, o usuário seleciona um professor e módulo.
- **Verificação de Pagamento**:
  - Exibe se o professor possui valores pendentes.
  - Habilita o botão "Pagar Professor" caso haja pendências.
- **Atualização de Status**: Altera o status de pagamento após confirmação.

## Pré-requisitos

- Node.js (v14+)
- NPM

## Instalação

### Backend (Node.js)

1. Acesse a pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   PORT=5000
   MYSQL_HOST = "127.0.0.1"
   MYSQL_USER = "seu usuario"
   MYSQL_PASSWORD = "sua senha"
   MYSQL_DATABASE = "seu banco de dado"

   ```

### Frontend (React)

1. Acesse a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Executando o Projeto
Inicializando ambos de uma vez:
  ```bash
   npm start
   ```
  ou se preferir inicializar um por vez 
1. Inicie o servidor backend:
   ```bash
   cd backend && node server.js
   ```
2. Inicie o aplicativo frontend:
   ```bash
   cd frontend && npm start
   ```
   
Ou execute ambos simultaneamente (recomendado instalar `concurrently` globalmente):
```bash
npm install -g concurrently
concurrently "cd backend && npm start" "cd frontend && npm start"
```

## Uso

1. **Seleção de Curso**:
   - Ao acessar a página, escolha um curso na lista carregada automaticamente.

2. **Seleção de Professor/Módulo**:
   - Após selecionar o curso, escolha um professor e módulo na lista retornada.

3. **Verificar Pagamento**:
   - Clique em **"Ver Professor"** para checar se há valores pendentes.
   - Se houver, o valor será exibido e o botão **"Pagar Professor"** será habilitado.

4. **Confirmar Pagamento**:
   - Clique em **"Pagar Professor"** para atualizar o status de pagamento no sistema.

## Estrutura do Projeto

```
payment-checker/
├── backend/               # Servidor Node.js
│   ├── src/
│   │   ├── services/     # funcionalidades do servidor
│   └── .env              # Variáveis de ambiente
│   └── server.js         
└── frontend/             # Aplicativo React
    ├── src/
    │   ├── components/   # Componentes reutilizáveis
    │   ├── services/     # Comunicação com a API
    └── └── App.js        # Componente principal
```

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, MySQL
- **Frontend**: React

## Endpoints da API (Backend)

- `GET /search`: retorna os dados do professor.
- `GET /courses`: Retorna a lista de cursos.
- `GET /teachers`: Retorna a lista de professores e seus Módulos.



## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## Contato

Se tiver dúvidas ou sugestões, entre em contato por [victorvalim1@gmail.com](mailto:seu-email@exemplo.com).

