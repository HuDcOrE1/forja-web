# FORJA - Resumo Atual do Projeto

## ✅ Backend

### Segurança
- JWT
- Spring Security
- AuthController
- AuthInterceptor Angular integrado
- Logout automático por expiração do token
- AuthGuard validando JWT expirado

### Dashboard
#### Executivo
- Clientes ativos
- Produtos ativos
- Receita hoje
- Receita mês
- Ticket médio

#### Analítico
- Faturamento diário
- Faturamento mensal
- Top produtos
- Top clientes
- Receita por categoria
- Receita por forma de pagamento
- Ocupação das raias

#### Estratégico
- Saúde do estoque
- Conversão operacional
- Comparativo de faturamento
- Metas

### Clientes
- CRUD completo
- Endereço
- ViaCEP
- ClienteRequest/Response
- Controller e Service

### Produtos
- Código
- Nome
- Descrição
- Categoria
- Marca
- Unidade de Medida
- Estoque Atual
- Estoque Mínimo
- Valor Custo
- Valor Venda
- Ativo
- CRUD Backend concluído

### Categorias de Produto
- CRUD Backend concluído
- Controller
- Service
- Request
- Response

### Raias
- CRUD Backend concluído
- Controller
- Service
- Request
- Response

---

## ✅ Frontend

### Infraestrutura
- Angular Material
- JWT
- Guard
- Interceptor
- Toast Global
- Sidebar
- Layout principal
- Rotas protegidas

### Dashboard
- KPIs
- Analytics
- Strategic
- Componentizado
- Gráficos integrados

### Clientes
- Listar
- Detalhar
- Novo
- Editar
- Inativar
- Pesquisa
- Paginação
- ViaCEP
- Máscaras
- Toast

### Categorias de Produto
- Listagem
- Detalhes
- Cadastro
- Edição
- Rotas
- Service
- Models

### Produtos
- Listagem
- Detalhes
- Cadastro
- Edição
- Integração com Categorias
- Service
- Models

### Raias
- Listagem
- Detalhes
- Cadastro
- Edição
- Pesquisa
- Paginação
- Service
- Models

---

## ✅ Utilitários Compartilhados

- cpf.validator.ts
- cpf.util.ts
- telefone.util.ts
- cep.util.ts
- cpf-mask.util.ts
- telefone-mask.util.ts
- cep-mask.util.ts
- moeda-mask.util.ts

---

## ✅ Git

- forja-api
- forja-web

---

## ✅ Roadmap Atual

- Clientes ✅
- Categorias ✅
- Produtos ✅
- Raias ✅
- Agendamentos ⏳
- Estoque ⏳
- Vendas ⏳
- Relatórios ⏳
- Acervo ⏳

---

## 🎯 Próxima Sprint Recomendada

### Agendamentos

Integração entre:
- Cliente
- Raia
- Calendário
- Dashboard

### Depois

- Estoque
- Vendas
- Relatórios
- Acervo de Armas

---

## Observações Registradas

- Trabalhar um arquivo por vez quando necessário.
- Sempre preferir arquivos completos.
- Sugerir automações, scripts, Angular CLI e atalhos para acelerar o desenvolvimento.
- Manter arquitetura modular e evolutiva.
