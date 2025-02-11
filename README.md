# API PAGE TREE COMO USAR? #
## PUBLICAS ##

1 - (GET) `/site/{id or name}` (example: `site/1` OR `/site/mysite`).
    Essa req recebe o id ou o nome do site assim retornando o mesmo.

2 - (POST) `/login` `body: user = TOKEN JWT`.
    Essa req envia o Token JWT gerado pelo frontend assim passando pelo auth e retornando outro token privado.

## PRIVADAS ##
### As rotas a seguir são para o user criar, editar e excluir seus sites ###
`TODAS AS ROTAS PROVADAS PRECISAM DE UM TOKEN JWT NO HEADER AUTHORIZATION`

* ### SITE 

1 - (POST) `/admin/id_user/site` .
    Essa req recebe no body os campos: name, descripton, logo e cria o site identifier.

2 - (PUT) `/admin/id_user/site/id_site`.
    Essa req recebe o id do site e altera as informações enviadas pelo body: name, description, logo. 

3 - (GET) `/admin/id_user/site`.
    Essa req retorna todos os sites do id do usuario

4 - (GET) `/admin/id_user/site/id_site`.
    Essa req retorna o site com base no id_site e no id_user

5 - (DELETE) `/admin/id_user/site/id_site`.
    Essa req deleta o site pelo id

* ### SECTIONS

1 - (POST) `/admin/id_user/site/id_site/section`.
    Essa req é a que cria uma section no site, ela recebe no body como padrão o type e o order, o resto é variavel para que o front end leia o conteudo e organize do jeito desejado, exemplo: HEADER E BANNER tem estruturas diferentes logo os dois receber type e order como padrão porem os outros campos são adptaveis e de sua escolha

2 - (PUT) `/admin/id_user/site/id_site/section/id_section`.
    Essa req recebe o id do site e da sessão e com base nesses dois id ele muda o conteudo da section, seguindo a mesma regra da criação, porém se enviar sem nenhum campo ou faltando 1 ele refaz a sessão somente com os novos elementos

3 - (GET) `/admin/id_user/site/id_site/section`.
    Essa req retorna todas as sessões do id_site.

4 - (GET) `/admin/id_user/site/id_site/section/id_section`.
    Essa req retorna a sessão com base no id_section e no id_site

5 - (DELETE) `/admin/id_user/site/id_site/section/id_section`.
    Essa req deleta a sessão com base no id_site e no id_section

* ### IMAGENS

1 - (POST) `/admin/id_user/image`
    Essa req recebe um arquivo(foto) dos tipos: JPG, PNG, JPEG e faz o upload para o firestore e ao banco de dados com o id_user como ref

2 - (GET) `/admin/id_user/image`
    Essa req receber o id_user e retorna todas as imagens do user

3 - (DELETE) `/admin/id_user/image/id_image`.
    Essa req recebe o id_user e id_image e deleta a imagem do firestore e do banco de dados

### STRIPE 
1 - (POST) `/admin/create-checkout-session`
    Essa req recebe o token no header, e no body recebe priceId, success_url, cancel_url

### USER INFOS

1 - (GET) `/admin/id_user/user-info`
    Recebe o token no header, e retorna as infos do user na stripe