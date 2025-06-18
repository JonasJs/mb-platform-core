# mb-monorepo

Monorepo com estrutura organizada para desenvolvimento fullstack utilizando Vue.js no frontend e Node.js no backend. Gerenciado com `npm workspaces`.

---

## 🧭 Navegação

- [🚀 Como Executar](#-como-executar)
- [🛠 Tecnologias e Ferramentas](#-tecnologias-e-ferramentas)
- [🎯 Decisões Técnicas](#-decisões-técnicas)
- [📦 Estrutura do Monorepo](#-estrutura-do-monorepo)
- [📦 Pacotes Desenvolvidos](#-pacotes-desenvolvidos)
  - [@mb-platform/design-system](#mb-platformdesign-system)
  - [@mb-platform/form-guard](#mb-platformform-guard)

---

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** (versão 8 ou superior)

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/JonasJs/mb-platform-core
cd mb-platform-core
```

2. Instale as dependências:

```bash
npm install
```

3. Executar tudo de uma vez

```bash
npm run dev
```

---

## 🛠 Tecnologias e Ferramentas

### Core

- **Vue.js 3**
- **Vite**
- **Node.js**
- **Express**
- **npm Workspaces**

### Frontend

- Vue 3 Composition API
- Vite Plugin Vue
- Vue DevTools
- Vitest
- Vue Test Utils
- JSDOM
- Coverage V8

### Backend

- Express 5
- CORS
- HTTP Proxy Middleware

### Design System e Componentes

- Storybook
- Design System próprio
- Vite Library Mode

### Qualidade de Código

- ESLint
- Prettier
- Husky
- Lint-staged
- Commitlint
- Neostandard

### Ferramentas de Desenvolvimento

- npm-run-all
- Node --watch

---

## 🎯 Decisões Técnicas

### Arquitetura Monorepo

- `npm Workspaces` pela simplicidade e leveza
- Evita complexidade de ferramentas como Turborepo/Nx em projetos pequenos
- Estrutura pronta para futura migração, se necessário

### Testes e Qualidade

- **Vitest** com hot reload, cobertura integrada e zero-config
- **Vue Test Utils** para testes de componentes
- Cobertura mínima em todos os pacotes

### Frontend

- Vue 3 + Composition API
- Vite como bundler e dev server
- Design System próprio
- Testes com Vitest

### Backend

- Express 5 com middlewares modernos
- Proxy reverso para serviços externos
- Estrutura escalável e direta

### Qualidade e Padronização

- ESLint compartilhado entre workspaces
- Prettier para formatação
- Husky + lint-staged + Commitlint para garantir boas práticas

---

## 📦 Estrutura do Monorepo

```
mb-platform-core/
├── apps/
│   └── auth-front/        # Frontend (Vue.js)
│
├── services/
│   └── auth-service/      # Backend (Node.js + Express)
│
└── packages/
    ├── design-system/     # Biblioteca de componentes Vue
    ├── eslint-config/     # ESLint compartilhado
    └── form-guard/        # Utilitários de validação de formulário
```

---

## 📦 Pacotes Desenvolvidos

### @mb-platform/design-system

**Biblioteca de componentes Vue.js reutilizáveis**

#### Componentes:

- Button
- Input
- RadioButton
- Step
- Stepper
- Steps

#### Destaques:

- Documentação via Storybook
- Tokens CSS customizáveis
- Scoped styles
- Composition API
- Build via Vite Library Mode

---

### @mb-platform/form-guard

**Validação de formulários baseada em schema**

#### Funcionalidades:

- `validateSchema`: valida dados a partir de schemas
- `extractErrors`: formatação estruturada dos erros
- Enum de validações (`VALIDATIONS_ENUM`)

#### Validações disponíveis:

- Email
- CPF
- CNPJ
- NotEmpty

#### Exemplo de uso:

```js
import { validateSchema, VALIDATIONS_ENUM } from "@mb-platform/form-guard";

const schema = {
  fields: {
    email: {
      type: "string",
      required: true,
      validations: [VALIDATIONS_ENUM.EMAIL],
    },
    cpf: {
      type: "string",
      required: true,
      validations: [VALIDATIONS_ENUM.IS_CPF],
    },
  },
};

const result = validateSchema({ schema, data: formData });
```
