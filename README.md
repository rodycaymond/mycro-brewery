# mycro-brewery
Homebrewer's helper app. Create, Update, and Delete recipes so that you can better keep track of them while you're brewing.


TECH STACK ->
Front to Back:
-React
-Vanilla Css
-ExpressJS Server
-KnexJS middleware to database
-Postgres Database
-Docker-Compose

To start up your very own version of the app, first fork and then clone this repo, then simply run 'docker-compose up' in your command line while in the project repository. Finally, navigate to localhost:3000 in your prefered browser (I would recommend Chrome). There is a single sample recipe for you already in the app. You can create more recipes, view them all in a nice list, edit them as you please, and even remove recipes you no longer need. Additionally, you are able to calculate alcohol potential and final volume with the handy calculator function as well. Please have fun, and enjoy. If you have any suggestions, please let me know!


If the database doesnt exist when attempting to execute your docker-compose up command, try this ->

1. docker pull postgres
2. docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
3. docker exec -it pg-docker bash
4. psql -U postgres
5. CREATE DATABASE mycro_brewery;
6. Then try to run your 'docker-compose up' command


Creator: Cody Raymond
