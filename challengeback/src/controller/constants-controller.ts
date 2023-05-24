// import { openDb } from "../repository/configdb";
// import { PostsData } from "../constants/posts.constant";
// import { UserData } from "../constants/user-data.constant";

export async function InsertTable() {
    //Inserindo Comentários - POR FAVOR N DE ERRADO DE NOVOOOOOOOOOO
    //     try {
    //       const db = await openDb();
      
    //       for (let i = 0; i < PostsData.posts.length; i++) {
    //         const post = PostsData.posts[i];
      
    //         if (post.comments) {
    //           for (let j = 0; j < post.comments.length; j++) {
    //             const comment = post.comments[j];
      
                // db.run(
                //   `
                //   INSERT INTO comments (post_id, user, comment)
                //   VALUES (?, ?, ?)
                // `,
                //   [post.id, comment.user, comment.comment]
                // );
    //           }
    //         }
    //       }
      
    //       await db.close();
    //       console.log('Dados inseridos com sucesso!');
    //     } catch (error) {
    //       console.error('Erro ao inserir os dados:', error);
    //     }
    //   }


    // Inserindo Posts
    // try {
    //   const db = await openDb();
      
    //   PostsData.posts.forEach((post) => {
        // db.run(`
        //   INSERT INTO posts (id, user, post_date, description, likes, url_imagem)
        //   VALUES (?, ?, ?, ?, ?, ?)
        // `, [post.id, post.user, post.post_date, post.description, post.likes, post.url_imagem]);
    //   });
      
    //   await db.close();
    //   console.log('Dados inseridos com sucesso!');
    // } catch (error) {
    //   console.error('Erro ao inserir os dados:', error);
    // }

    // try {
    //   const db = await openDb();
      
    //   UserData.users.forEach((user) => {
    //     db.run(`
    //       INSERT INTO users (id, name, user, birthdate, email, password, profile_photo)
    //       VALUES (?, ?, ?, ?, ?, ?,?)
    //     `, [user.id, user.name, user.user, user.birthdate, user.email, user.password, user.profile_photo]);
    //   });
      
    //   await db.close();
    //   console.log('Dados inseridos com sucesso!');
    // } catch (error) {
    //   console.error('Erro ao inserir os dados:', error);
    // }

}
 
  
  
  
  
  
  