import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import { readTodos, createTodo, updateTodo, deleteTodo } from "./functions";

function App() {
  const [todo, setTodo] = useState({ title: '', content: '' })
  const [todos, setTodos] = useState(null)
  const [currentId, setCurrentId] = useState(0)
  useEffect(() => {
    let currentTodo = currentId!==0?todos.find(todo=>todo._id===currentId):{title:'',content:''}
    setTodo(currentTodo)
  }, [currentId])

  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      setTodos(result);
    }

    fetchData()
  }, [currentId]);
  const clear = ()=>{
    setCurrentId(0);
    setTodo({ title: '', content: ''});
  }
  useEffect(()=>{
    const clearField = (e)=> {
      if(e.keyCode ===27) {
        clear()
      }
    }
    window.addEventListener('keydown',clearField)
    return () => window.removeEventListener('keydown',clearField)
  },[])
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(currentId===0){
      const result = await createTodo(todo)
      setTodos([...todos, result])
      clear()
    }else{
      console.log(todo)
      const result = await updateTodo(currentId, todo)
      console.log(result)
      clear()
    }
  }
  const removeTodo = async(id) =>{
    await deleteTodo(id)
    const todosCopy = [...todos]
    todosCopy.filter(todo=>todo._id !== id);
    setTodos(todosCopy)
  }
  return (
    <div className="container">
      <div className="row">
        <pre> {JSON.stringify(todo)}</pre>
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input id="icon_prefix" value={todo.title} type="text" className="validate" onChange={e => setTodo({ ...todo, title: e.target.value })} />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="icon_telephone" value={todo.content} type="tel" className="validate" onChange={e => setTodo({ ...todo, content: e.target.value })} />
              <label htmlFor="icon_telephone">content</label>
            </div>
          </div>
          <div className="row right-align"><button className="waves-efect waves-light btn">Submit</button></div>
        </form>
        {!todos ? <Preloader /> : todos.length > 0 ? <ul className="collection">{todos.map(todo=>(
           <li key={todo._id} onClick={()=>setCurrentId(todo._id)} className="collection-item"><div><h5>{todo.title}</h5><p>{todo.content}<a href="#!" className="secondary-content"><i className="material-icons" onClick={()=>removeTodo(todo._id)}>delete</i></a></p></div></li>))}
           </ul> 
       : <div><h5>Nothing todo</h5></div>
        }

      </div>
    </div>
  );
}

export default App;
