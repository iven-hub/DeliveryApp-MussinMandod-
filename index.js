import  express  from "express"

import { graphqlHTTP } from "express-graphql"
import {connectionDataBase} from './database/db.js'
import { schema } from './schema.js'


const app = express()

connectionDataBase()

app.use(express.json())

app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }),
  )

app.listen(8002,()=> console.log("Na porta 8002"))

export default app
