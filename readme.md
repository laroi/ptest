# Ptest
Ptest is a small application  which asks you some basic questions and collection the answers. You can view the answers submitted by others as well.
# Features!

  - View all the question
  - Submit your answers
  - View submitted answers



### Installation

Ptest requires [Docker] And [Docker-compose] (and only those ;)).  You can find install instructions [here](https://www.digitalocean.com/comamunity/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04) and [here](https://docs.docker.com/compose/install/)

After that, you will need to configure a couple of parameters. Open docker-compose.yml
- Update **API_HOST** to IP of your machine
- update **API_PORT** to the port your backend is running (defaults to 3000)
- Update **PORT** to port on which you wanna run the backend
- Update **MONGO_HOST** to IP where you Database is bound to
- Update **MONGO_PORT** to port which your Database is bound to

and it just couple of commands
```sh
$ cd ptest
$ docker-compose build
$ docker-compose up
```

If everthing went well, you should be able to access the application [here](http://localhost:8085)





### Todos

 - Write MORE Tests
 - Make UI better

License
----

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Docker]: <https://www.docker.com/>
   [Docker-compose]: <https://docs.docker.com/compose/>



