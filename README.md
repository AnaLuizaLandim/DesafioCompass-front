# Desafio-Compass-2
challengeback/: é o arquivo que possui o back-end.

desafioCompass-Front/: é o arquivo front-end.

O banco de dados utilizado é o SQLITE. 

Recomendo a extensão MySQL do VSCODE que é um gerenciador de banco de dados.

Use o Insomia, Postman ou uma extensão para visualizar as rotas de GET, PUT, DELETE e POST
.
# NPM INSTALL- FAÇA ISSO NA PASTA CHALLENGEBACK TAMBÉM.

Para instalar as dependências do projeto listadas no arquivo "package.json" e baixar os pacotes do "node_modules", siga os seguintes passos:

Certifique-se de ter o Node.js instalado em sua máquina. Você pode verificar se o Node.js está instalado digitando "node -v" no terminal. Se o Node.js estiver instalado, ele exibirá a versão instalada. Caso contrário, baixe e instale o Node.js em sua máquina.

Abra o terminal na pasta raiz do projeto onde o arquivo "package.json" está localizado.

Digite "npm install" no terminal e pressione Enter. Isso iniciará o processo de instalação das dependências do projeto.

Após a conclusão da instalação, você pode executar o projeto usando "npm start" ou outro comando de execução especificado no arquivo "package.json".

#ROTAS PARA FACILITAR


CommentsbyID - Post
http://localhost:8080/api/v1/posts/2/comments/

DeleteCommentById - Delete
http://localhost:8080/api/v1/posts/comments/30

DeleteUser - Delete
http://localhost:8080/api/v1/users/32

DeletePost - Delete
http://localhost:8080/api/v1/posts/40

UpdatePost - Update
http://localhost:8080/api/v1/posts/32

UpdateUser - Update
http://localhost:8080/api/v1/users/5

UserById - Get
http://localhost:8080/api/v1/users/30

SaveUser -  Post
http://localhost:8080/api/v1/users

All comments - Get
http://localhost:8080/api/v1/comments/

CommentsbyPost_id_ID - Get
http://localhost:8080/api/v1/posts/9/comments/12

PostById - Get
http://localhost:8080/api/v1/posts/16

Login - Post
http://localhost:8080/api/v1/users/login

SavePost  - Post
http://localhost:8080/api/v1/posts

getAllUser - Get
http://localhost:8080/api/v1/users

getAllPosts - Get
http://localhost:8080/api/v1/posts

