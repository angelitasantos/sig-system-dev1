# PROJETO SIG SYSTEM
## Sistema Integrado de Gestão

Sistema para gerenciar atividades operacionais e financeiras, construído com a stack **Node.js**, **Express**, **PostgreSQL** e tecnologias frontend tradicionais, seguindo a arquitetura MVC.

### 🛠️ Tecnologias Utilizadas

- **Backend:**
  - Node.js
  - Express
  
- **Frontend:**
  - HTML
  - CSS
  - JavaScript

- **Banco de Dados:**
  - PostgreSQL

---

### 🚀 Como Criar um novo Projeto

- Instalar dependências
  ```bash
    npm init -y
    npm install express pg dotenv bcrypt jsonwebtoken cors morgan multer date-fns
    npm install --save-dev nodemon
  ```

- Configurar variáveis de ambiente (.env)

- Rodar o servidor localmente
  - npm run dev

#### 🔑 Explicação rápida:
    - express → framework web para o backend.
    - pg → conexão com PostgreSQL.
    - dotenv → variáveis de ambiente.
    - bcrypt → criptografia de senhas.
    - jsonwebtoken → tokens JWT (autenticação).
    - cors → habilitar requisições de origens diferentes.
    - morgan → log de requisições HTTP.
    - multer → upload seguro de arquivos.
    - nodemon (dev) → reiniciar o servidor automaticamente em mudanças.
