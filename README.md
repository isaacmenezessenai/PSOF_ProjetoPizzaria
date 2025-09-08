# 👨‍💻BRANCH DEV
---
A branch dev (desenvolvimento) é a nossa principal linha de trabalho para a implementação de novas funcionalidades e a correção de bugs que ainda não foram testados ou considerados estáveis.

### O que fazer nesta branch:
* O código da main deve ser usado para implantar a aplicação no ambiente de produção.
* A branch deve ser usada para testes de integração e validação das funcionalidades.
* Os únicos commits diretos permitidos são pequenas correções de emergência (hotfixes).

### Quando fazer um merge:
* As alterações da dev só devem ser mescladas na branch main quando um conjunto de funcionalidades estiver completo, testado e pronto para o lançamento.

## Guia de Execução do Projeto na Branch Dev
Este documento serve como um guia para a equipe Ártemis, explicando como configurar e rodar a aplicação no ambiente dev (desenvolvimento).
---

### ⚙️ Backend

#### Instalação das Dependências
Para começar, abra o terminal na pasta `backend` e instale todas as dependências necessárias:
```bash
npm install
```
#### Configuração do Banco de Dados
Para criar e aplicar migrações na branch de desenvolvimento, use o arquivo .env.dev com o comando do Prisma:
```bash
npm run prisma:dev
```
#### Geração do Prisma Client
Após rodar a migração, você precisa gerar o Prisma Client para que o código do backend se comunique com o banco de dados.
```bash
npm run generate:dev
```

#### Rodando o Servidor
Para iniciar o servidor com hot-reload (ele reinicia automaticamente a cada alteração no código):
```bash
npm run dev
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

* GUIA TERMINAL
```bash
https://g.co/gemini/share/bed710356921
```
