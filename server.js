'use strict' // força o JS a ser mais criterioso e avalia o código

console.log("Teste");

//importa os módulos: //tudo que tiver sem caminho, ele importa do node_modules
//importar alguma coisa pessoal começar com 'require(./caminho...)'
const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

//precisa de novas constantes:
const app = express();
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//criando servidor e rotas:
const server = http.createServer(app);
const router = express.Router();

//criando prinmeira rota:

//-get: métodos de crud -- req, res, nex = request, response, next
const route = router.get('/', (req, res, next) => {
    res.status(200).send({//status 200 = Tudo ok
        title: "Node Store API",
        version: "0.0.1"
    });
});

app.use('/', route);

//com isso já temos um servidor http ouvindo a porta 300
//e uma rota MVC

//precisamos deixar o servidor ouvindo a porta:

server.listen(port);

server.on('error', onError);
console.log('API rodando na porta ' + port);

// executa o node .\server.js

function normalizePort(val) {
    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }
    if(port >= 0 ){
        return port;
    }

    return false;
}

function onError(error){//tratamento de erros - documentação do node tem muitas outras formas para tratar
    if(error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port : 
        'Port ' + port;

    switch (error.code) {
        case 'EACES' : // verifica se é erro na permissão
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE': //verifica se é erro no endereço em uso
            console.error(bind + ' is alread in use');
            process.exit(1);
            break;
        default: throw error;
    }

}