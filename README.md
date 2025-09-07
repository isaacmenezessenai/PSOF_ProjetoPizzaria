# 👨‍💻BRANCH MAIN
---
Este documento serve como um guia para a equipe Ártemis, explicando o propósito da branch main e como configurar e rodar o projeto no ambiente de produção.
A branch main é a nossa branch de produção. Ela representa a versão mais recente e estável do código. O que está na main deve ser sempre um código funcional, testado e pronto para ser executado.

### O que fazer nesta branch:
* Todos os novos recursos e funcionalidades devem ser adicionados aqui.
* Os commits nesta branch devem vir somente de merges de outras branches (como a dev). Nunca faça commits diretos na main.
* O código nesta branch pode não estar finalizado ou livre de erros, pois é um ambiente de trabalho em andamento.

### Quando fazer um merge:
* As alterações da branch dev só devem ser mescladas na main quando um conjunto de funcionalidades estiver completo, testado e validado pela equipe.

## Guia de Execução do Projeto na Branch Main

Este documento serve como um guia para a equipe Ártemis, explicando como configurar e rodar a aplicação no ambiente main.
---

### ⚙️ Backend

#### Instalação das Dependências
Para começar, abra o terminal na pasta backend e instale todas as dependências necessárias:
```bash
npm install
```
#### Configuração do Banco de Dados
Para criar e aplicar migrações na branch de desenvolvimento, use o arquivo .env com o comando Prisma:
```bash
npm run prisma:main
```
#### Geração do Prisma Client
Após rodar a migração, você precisa gerar o Prisma Client para que o código do backend se comunique com o banco de dados.
```bash
npm run generate:main
```

#### Rodando o Servidor
Para iniciar o servidor com hot-reload (ele reinicia automaticamente a cada alteração no código):
```bash
npm run main
```
---
### 🎨Frontend
O frontend usa o gerenciador de pacotes yarn. As instruções abaixo são para a pasta frontend do projeto.

#### Instalação das Dependências
Abra o terminal na pasta frontend e instale as dependências com o seguinte comando:
```bash
yarn install
```

####  Rodando a Aplicação
Para iniciar o servidor do frontend no modo de desenvolvimento, use este comando:
```bash
yarn dev
```
---

## 🧩 LINKS DE ACESSO PARA A EQUIPE
* TRELLO
```bash
https://trello.com/invite/b/6899d2ed03578d24b61cc5cc/ATTI7328772765621f981f9df7b37a373c6f818D7EB9/meu-quadro-do-trello
```

* DRIVE
```bash
https://drive.google.com/drive/folders/1drXdtO_6WGATiyN_OAckakWQ8f8SizQf?usp=sharing
```

* INSTRUÇÕES SUPABASE
```bash
https://gemini.google.com/share/239a013e4d29
```

* SUPABASE LINK PizzariaDEV
```bash
https://supabase.com/dashboard/project/xrjnmkgwxfgokuzvbwfd/editor/18360?schema=public
```

* GUIA TERMINAL
```bash
https://g.co/gemini/share/bed710356921
```
