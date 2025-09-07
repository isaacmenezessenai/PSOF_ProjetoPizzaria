# 👨‍💻BRANCH RELEASE
---
  Este documento serve como um guia para a equipe Ártemis, explicando o propósito da branch release e como preparar o projeto para uma nova versão.
  A branch release é criada a partir da branch dev quando um conjunto de funcionalidades está completo, testado e pronto para o lançamento. Ela é usada para testes finais, correções de bugs de última hora e preparação para a implantação em produção.

### O que fazer nesta branch:
* Não adicione novas funcionalidades nesta branch.
* Foco em correções de bugs (hotfixes) e ajustes finais para garantir que a versão seja estável.
* Adicione as notas de lançamento (release notes) que descrevem as mudanças, funcionalidades e correções desta nova versão.

### Quando fazer um merge:
* As alterações da dev só devem ser mescladas na branch main quando um conjunto de funcionalidades estiver completo, testado e pronto para o lançamento.

## ♟️Fluxo de Trabalho

    A[Branch Dev] -->|Criação da release| B[Branch Release]
    B --> C[Testes e Hotfixes]
    C --> D[Merge na Main]
    D --> E[Criar Tag da Versão]
    E --> F[Deploy em Produção]
    B --> G[Merge de Volta para Dev]

#### 1. Crie a branch release a partir da branch dev.
```bash
git checkout -b release/v1.0.0 dev
```  
#### 2. Faça os ajustes finais e correções na branch release.

#### 3. Faça o merge para a main quando a versão estiver pronta para ser lançada.
```bash
git checkout main
git merge release/v1.0.0
```

#### 4. Crie a tag da versão na branch main.
```bash
git tag -a v1.0.0 -m "Release da Versão 1.0.0"
```

#### 5. Envie a tag para o GitHub.
```bash
git push origin --tags
```

#### 6. Faça o merge para a dev para manter o histórico de commits sincronizado.
```bash
git checkout dev
git merge release/v1.0.0
``` 

### ⚙️ Backend

#### Instalação das Dependências
Para começar, abra o terminal na pasta `backend` e instale todas as dependências necessárias:
```bash
npm install
```
#### Configuração do Banco de Dados
Para criar e aplicar migrações na branch de desenvolvimento, use o arquivo .env com o comando do Prisma:
```bash
npm run prisma:main
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

* GUIA RELEASE
```bash
https://g.co/gemini/share/5a5b14256cc2
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


