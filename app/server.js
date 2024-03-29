const express = require('express')
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors'); 
const { AllRoutes } = require('./routers/router');
const CreateHttpError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');

module.exports = class Application{
    #app = express();
    #PORT;
    #DB_URI;

    constructor(PORT , DB_URI){
        this.#DB_URI = DB_URI;
        this.#PORT = PORT;
        this.configApplication();
        this.initRedis();
        this.connectToMongoDB();
        this.configServer();
        this.createRoutes();
        this.errorHandler();
    }

    configApplication(){
        this.#app.use(cors())
        this.#app.use(morgan('dev'))
        //ارسال اطلاعات از طریق جیسون
        this.#app.use(express.json());
        //ارسال اطلاعات از طریق www-form
        this.#app.use(express.urlencoded({extended : true}))
        this.#app.use(bodyParser.json());
        this.#app.use(bodyParser.urlencoded({extended: true,}),);
        this.#app.use(express.static(path.join(__dirname , '..' , 'public')))
        this.#app.use("/api-doc" , swaggerUI.serve , swaggerUI.setup(
            swaggerJsDoc({
                swaggerDefinition : {
                openapi : "3.0.0" ,
                info : {
                    title : "Frontioun" ,
                    version : "1.0.0" ,
                    description : "Be an expert developer at home!"
                } ,
                servers : [
                    {
                        url : "http://localhost:3000"
                    }
                ] ,
                
                components : {
                    securitySchemes : {
                      BearerAuth : {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                        
                      }
                    }
                  },
                  security : [{BearerAuth : [] }]
                },
            apis : [ "./app/routers/**/*.js" ]
        })
        ,
        {
            explorer : true ,
            
        },
        
        ))
    }

    configServer(){
        const http = require('http');
        http.createServer(this.#app).listen(this.#PORT , ()=>{
            console.log(`Server is running on http://localhost:${this.#PORT}`);
        })
    }

    connectToMongoDB(){
        mongoose.connect(this.#DB_URI)
        mongoose.connection.on('error', err => {
            return(err);
          });
        
        process.on('SIGINT' , async() => {
            await mongoose.connection.close();
            process.exit(0);
        })
    }

    initRedis(){
        require("./utils/init-redis")
    }


    createRoutes(){
        this.#app.use(AllRoutes)
    }

    errorHandler(){
        this.#app.use((req, res , next) => {
            next(CreateHttpError.NotFound("Page not found!"));
        })

        this.#app.use((error , req , res , next) => {
            const serverError = CreateHttpError.InternalServerError();
            const statusCode = error?.status || serverError.status;
            const message = error?.message ||serverError.message;

            return res.status(statusCode).json({
                error : {
                    statusCode , 
                    success : false ,
                    message
                }
            })
        })
    }
}

