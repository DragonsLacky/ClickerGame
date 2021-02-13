import express from 'express';
import { error, success } from 'consola';
import { PORT, IN_PROD, DATABASE } from './config';
import mongoose from 'mongoose';
import { gql, ApolloServer } from 'apollo-server-express';
import {typeDefs, resolvers} from './graphql';
import * as AppModels from './models';
import { join } from 'path';
import AuthMiddleware from './middlewares/auth';
import bodyParser from 'body-parser'
import { schemaDirectives } from './graphql/directives'

const app = express();
app.use(AuthMiddleware);
app.use(bodyParser.json());
app.use(express.static(join(__dirname, './uploads')))

app.get('/posts', async (req, res) => {
    let { Post } = AppModels;

    let {page, limit} = req.query

    const labels = {
        totalDocs: 'itemCount',
        docs: 'items',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'pageCount',
        pagingCounter: 'slNo',
        meta: 'paginator'
    };
    const options = {
        page: page || 1,
        limit: limit || 10,
        customLabels: labels
    };
    let posts = await Post.paginate({}, options);
    return res.json(posts);
})

console.log()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    playground : IN_PROD,
    context : ({req}) => {
        let { isAuth, user} = req;
        return {
            req,
            isAuth,
            user,
            ...AppModels
        }
    }
})


const startApp = async () => {

    try {
        await mongoose.connect(DATABASE, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        success({
            badge:true,
            message: 'Succesfuly conected to database',
        });

        server.applyMiddleware({app})
        app.listen(PORT, () => success({
            badge : true,
            message : 'Server conected on PORT ' + PORT
        }));
    }
    catch( err) {
        error({
            message:err.message, 
            badge: true
        })
    }
}

startApp();
