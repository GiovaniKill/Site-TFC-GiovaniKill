# ⚽ Trybe Futebol Clube  
  O Site Trybe Futebol Clube tem o objetivo de disponibilizar uma visualização sobre um campeonato de futebol. O front-end foi criado pela equipe da Trybe, enquanto o back-end foi criado e implementado por mim, Giovani Kill.

# Saiba as classificações
![](https://github.com/GiovaniKill/Site-TFC-GiovaniKill/blob/main/homeTFC.gif)
  Todas os cálculos de classificação e ranqueamento são feitos automaticamente pelo back-end
  
# Faça o login
![](https://github.com/GiovaniKill/Site-TFC-GiovaniKill/blob/main/loginTFC.gif)
  Senhas são tranformadas em SHA-256 para maior segurança nos servidores
  
# Edite e adicione partidas
![](https://github.com/GiovaniKill/Site-TFC-GiovaniKill/blob/main/partidasTFC.gif)
  Após se autenticar, configure o campeonato conforme necessário
  
  Além disso, as funções do back-end são testadas 📋
  
# Tecnologias utilizadas

• JavaScript
• TypeScript
• MySQL
• mysql2
• Docker
• Express
• Sequelize
• Mocha
• Sinon
• Chai
• NodeJS
• JsonWebToken

## Para rodar o projeto em seu computador

Faça um clone desse repositório, para isso, execute esses comando em seu terminal:

```
git clone git@github.com:GiovaniKill/Site-TFC-GiovaniKill.git
cd Site-TFC-GiovaniKill
npm install
```

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />
Na sua máquina você deve ter:
 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2
➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`
➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
  * Use esse [link de referência para realizar a instalação corretamente no ubuntu](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/5987fa2d-0d04-45b2-9d91-1c2ffce09862/day/2f1a5c4d-74b1-488a-8d9b-408682c93724/lesson/b883b81d-21f6-4b60-aa62-8508f6017ea0);
  * Acesse o [link da documentação oficial com passos para desinstalar](https://docs.docker.com/compose/install/#uninstallation) caso necessário.
</details>
<details>
  <summary><strong>🐋 Rodando no Docker</strong></summary>
  
  <br/>
  > :information_source: Rode os serviços com o comando `docker-compose up -d --build`.
</details>

  Após seguir esses passos, o site deverá ser acessível em seu navegador através do link `localhost:3000`
  Para fazer o login:
  Email: admin@admin.com
  Senha: secret_admin
