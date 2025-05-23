const fs = require('fs');
const { Command } = require('commander');
const { log } = require('console');
const program = new Command();

program
  .name('todo-app')
  .description('Todo application using CLI')
  .version('0.8.0');

program.command('add-todo')
  .description('adds the todo to the list')
  .argument('<String>', 'todo to add')
  .action((str)=>{
        fs.readFile("data.json","utf-8",(err,data)=>{
            if(err){
                console.log("error: reading file!");
            }else{
                let todos = [];
                if(data){
                    todos = JSON.parse(data);
                }
                let id = todos.length>0 ? todos.length +1 : 1;
                todos.push({id,todo:str});
                fs.writeFile("data.json",JSON.stringify(todos,null,2),(err)=>{
                    if(err){console.log("issue while adding the data!");
                    }else{
                        console.log("added!");
                    }
                })
            }
        })
  })
program.command('view-list')
  .description('shows the list of items present in the todo list')
  .action(()=>{
      fs.readFile("data.json","utf-8",(err,data)=>{
          if(!err && data){
              if(data.length >0){
                console.log("✅ Here is your Todo List");
              }else{
                console.log("Nothing to see here!");
              }
            
            let todos = JSON.parse(data);
            // let todos = JSON.stringify(data);
            // console.log(todos);
            let ctr = 1;
            todos.forEach(ele => {
                console.log(`${ctr} => ${ele.todo}`);
                ctr++;
            });           
           }
    })
  })
program.command('delete-todo')
    .description("this will delete the specific todo")
    .argument("<String>","Todo to delete")
    .action((str)=>{
        fs.readFile("data.json","utf-8",(err,data)=>{
            if(!err && data){
                let todos = JSON.parse(data);
                // console.log(todos);
                let found = false;
                todos.forEach((ele)=>{
                    if(ele.todo === str){
                        found = true;
                    }
                })
                if(!found){
                    console.log("given todo not found!");
                    return;
                }
                todos = todos.filter((e)=>{
                    return e.todo!== str;
                })
                 fs.writeFile("data.json", JSON.stringify(todos, null, 2), (err) => {
                    if (err) {
                    console.log("Error writing file!");
                    } else {
                    console.log("Todo deleted successfully.");
                    }
                });
            }else{
                console.log("please add the data first!");
                
            }
        })
    })
program.parse();