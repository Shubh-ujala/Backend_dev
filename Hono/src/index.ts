import { Context, Hono } from 'hono'
import { BlankEnv, BlankInput } from 'hono/types';

const app = new Hono()

async function authMiddleware(c: Context<BlankEnv, "/", BlankInput >,next:any){
  if(c.req.header("Authorization")){
    // type Ntype = typeof next

    await next();
  }else{
    return c.text("You dont have access")
  }
}

// app.use(authMiddleware)


app.post('/',authMiddleware, async (c) => {
  console.log(typeof(c));
  
  const body = await c.req.json();
  console.log(body); // Removed to fix syntax error
  // console.log(c.req.header("Authorization"));
  // console.log(c.req.query("param"));
  // return c.text('Hello Hono!')
  
})

export default app
