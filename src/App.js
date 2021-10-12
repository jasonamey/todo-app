import React, { useEffect } from "react";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/Themes";
import { IoSunny, IoMoonSharp } from "react-icons/io5";

import styled from "styled-components";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [viewFilter, setViewFilter] = useState("all");
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    setTodos([
      {
        id: new Date(),
        text: todo.trim(),
        completed: false,
      },
      ...todos,
    ]);
    setTodo("");
  };

  const handleCompleteStatus = (id, value) => {
    const completedTodo = todos.find((item) => item.id === id);
    const idx = todos.findIndex((item) => item.id === id);
    const updatedTodos = [...todos];
    updatedTodos[idx].completed = value;
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const newItems = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newItems);
  };

  const handleTodosToView = (viewFilterSet) => {
    const todosToView = [...todos];

    switch (viewFilterSet) {
      case "all":
        return todosToView;
      case "completed":
        return todosToView.filter((item) => {
          if (item.completed === true) {
            return item;
          }
        });

      case "active":
        return todosToView.filter((item) => {
          if (item.completed === false) {
            return item;
          }
        });
      default:
        return todosToView;
    }
  };

  const handleClearCompleted = () => {
    const newTodos = todos.filter((item) => item.completed !== true);
    setTodos(newTodos);
  };

  const todosToViewContent = handleTodosToView(viewFilter);
  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppWrapper>
        <header>
          <h1>todo</h1>
          {mode === "light" && (
            <IoMoonSharp onClick={() => setMode("dark")} className="sun-icon" />
          )}
          {mode === "dark" && (
            <IoSunny onClick={() => setMode("light")} className="sun-icon" />
          )}
        </header>
        <TodoForm
          onFormSubmit={handleAddFormSubmit}
          onInputChange={handleChange}
          todo={todo}
        />
        <section className="todo-content">
          <ul className="todo-list">
            {todosToViewContent.map(({ text, id, completed }) => (
              <TodoItem
                key={id}
                todoItemContent={text}
                id={id}
                onDeleteClick={handleDelete}
                setComplete={handleCompleteStatus}
                completed={completed}
              />
            ))}
          </ul>
        </section>
        <section className="todo-footer">
          <div className="left">
            {todos.length > 0 ? `${todos.length} items left` : "no items"}
          </div>
          <div className="center">
            <span
              className={`view-filter ${
                viewFilter === "all" && "active-filter"
              }`}
              onClick={() => setViewFilter("all")}
            >
              All
            </span>
            <span
              className={`view-filter ${
                viewFilter === "active" && "active-filter"
              }`}
              onClick={() => setViewFilter("active")}
            >
              Active
            </span>
            <span
              className={`view-filter ${
                viewFilter === "completed" && "active-filter"
              }`}
              onClick={() => setViewFilter("completed")}
            >
              Completed
            </span>
          </div>
          <div className="right" onClick={handleClearCompleted}>
            Clear Completed
          </div>
        </section>
      </AppWrapper>
    </ThemeProvider>
  );
}

const AppWrapper = styled.div`
  width: 476px;
  margin-top: 68px;
  display: flex;
  flex-direction: column;
  header {
    color: ${({ theme }) => theme.appHeadlineColor};
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      text-transform: uppercase;
      font-size: 34px;
      letter-spacing: 16px;
      font-weight: 700;
    }
    .sun-icon {
      font-size: 22px;
      cursor: pointer;
    }
  }

  .todo-content {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    overflow: hidden;
    margin-top: 24px;
  }

  .todo-footer {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    background-color: ${({ theme }) => theme.appBackgroundColor};
    color: ${({ theme }) => theme.appDiminishedColor};
    padding: 16px 20px;
    .view-filter {
      cursor: pointer;
    }
    .left {
      flex: 0.25;
    }

    .center {
      flex: 0.35;
      display: flex;
      justify-content: space-around;
      span:hover {
        color: ${({ theme }) => theme.appColor};
      }
      .active-filter {
        color: dodgerblue;
      }
    }

    .right {
      display: flex;
      justify-content: space-around;
      flex: 0.25;
      cursor: pointer;
      :hover {
        color: ${({ theme }) => theme.appColor};
      }
    }
  }
`;
export default App;

// import React, { useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import TodoItem from "./components/TodoItem";
// import TodoForm from "./components/TodoForm";
// import { ThemeProvider } from "styled-components";
// import { useState } from "react";
// import { GlobalStyles } from "./styles/GlobalStyles";
// import { lightTheme, darkTheme } from "./styles/Themes";
// import { IoSunny } from "react-icons/io5";

// import styled from "styled-components";

// function App() {
//   const [todo, setTodo] = useState("");
//   const [todos, setTodos] = useState(() => {
//     const savedTodos = localStorage.getItem("todos");
//     if (savedTodos) {
//       return JSON.parse(savedTodos);
//     } else {
//       return [];
//     }
//   });
//   const [viewFilter, setViewFilter] = useState("all");

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   const handleChange = (e) => {
//     setTodo(e.target.value);
//   };

//   const handleAddFormSubmit = (e) => {
//     e.preventDefault();
//     setTodos([
//       {
//         id: new Date(),
//         text: todo.trim(),
//         completed: false,
//       },
//       ...todos,
//     ]);
//     setTodo("");
//   };

//   function handleOnDragEnd(result) {
//     if (!result.destination) return;
//     const items = Array.from(handleTodosToView(viewFilter));
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     setTodos(items);
//   }

//   const handleCompleteStatus = (id, value) => {
//     const completedTodo = todos.find((item) => item.id === id);
//     const idx = todos.findIndex((item) => item.id === id);
//     const updatedTodos = [...todos];
//     updatedTodos[idx].completed = value;
//     setTodos(updatedTodos);
//   };

//   const handleDelete = (id) => {
//     const newItems = todos.filter((todo) => {
//       return todo.id !== id;
//     });
//     setTodos(newItems);
//   };

//   const handleTodosToView = (viewFilterSet) => {
//     const todosToView = [...todos];

//     switch (viewFilterSet) {
//       case "all":
//         return todosToView;
//       case "completed":
//         return todosToView.filter((item) => {
//           if (item.completed === true) {
//             return item;
//           }
//         });

//       case "active":
//         return todosToView.filter((item) => {
//           if (item.completed === false) {
//             return item;
//           }
//         });
//       default:
//         return todosToView;
//     }
//   };

//   const handleClearCompleted = () => {
//     const newTodos = todos.filter((item) => item.completed !== true);
//     setTodos(newTodos);
//   };

//   const todosToViewContent = handleTodosToView(viewFilter);
//   console.log("the viewable to-doables!", todosToViewContent);
//   return (
//     <ThemeProvider theme={lightTheme}>
//       <GlobalStyles />
//       <AppWrapper>
//         <header>
//           <h1>todo</h1>
//           <IoSunny className="sun-icon" />
//         </header>
//         <TodoForm
//           onFormSubmit={handleAddFormSubmit}
//           onInputChange={handleChange}
//           todo={todo}
//         />
//         <section className="todo-content">
//           <DragDropContext onDragEnd={handleOnDragEnd}>
//             <Droppable droppableId="todo-list">
//               {(provided) => (
//                 <ul
//                   className="todo-list"
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                 >
//                   {todosToViewContent.map(({ text, id, completed }, index) => {
//                     return (
//                       <Draggable key={id} draggableId={id} index={index}>
//                         {(provided) => (
//                           <TodoItem
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             key={id}
//                             todoItemContent={text}
//                             id={id}
//                             onDeleteClick={handleDelete}
//                             setComplete={handleCompleteStatus}
//                             completed={completed}
//                           />
//                         )}
//                       </Draggable>
//                     );
//                   })}
//                   {provided.placeholder}
//                 </ul>
//               )}
//             </Droppable>
//           </DragDropContext>
//         </section>
//         <section className="todo-footer">
//           <div className="left">
//             {todos.length > 0 ? `${todos.length} items left` : "no items"}
//           </div>
//           <div className="center">
//             <span
//               className={`view-filter ${
//                 viewFilter === "all" && "active-filter"
//               }`}
//               onClick={() => setViewFilter("all")}
//             >
//               All
//             </span>
//             <span
//               className={`view-filter ${
//                 viewFilter === "active" && "active-filter"
//               }`}
//               onClick={() => setViewFilter("active")}
//             >
//               Active
//             </span>
//             <span
//               className={`view-filter ${
//                 viewFilter === "completed" && "active-filter"
//               }`}
//               onClick={() => setViewFilter("completed")}
//             >
//               Completed
//             </span>
//           </div>
//           <div className="right" onClick={handleClearCompleted}>
//             Clear Completed
//           </div>
//         </section>
//       </AppWrapper>
//     </ThemeProvider>
//   );
// }

// const AppWrapper = styled.div`
//   width: 476px;
//   margin-top: 68px;
//   header {
//     color: white;
//     background-color: transparent;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     h1 {
//       text-transform: uppercase;
//       font-size: 34px;
//       letter-spacing: 16px;
//       font-weight: 700;
//     }
//     .sun-icon {
//       font-size: 22px;
//     }
//   }

//   .todo-content {
//     background-color: var(--very-dark-grey);
//     color: var(--grey);
//     border-radius: 3px;
//     overflow: hidden;
//     margin-top: 24px;
//   }

//   .todo-footer {
//     display: flex;
//     justify-content: space-between;
//     font-size: 12px;
//     background-color: var(--very-dark-grey);
//     color: var(--dark-grey);
//     padding: 16px 20px;
//     .view-filter {
//       cursor: pointer;
//     }
//     .left {
//       flex: 0.25;
//     }

//     .center {
//       flex: 0.35;
//       display: flex;
//       justify-content: space-around;
//       span:hover {
//         color: var(--grey);
//       }
//       .active-filter {
//         color: dodgerblue;
//       }
//     }

//     .right {
//       display: flex;
//       justify-content: space-around;
//       flex: 0.25;
//       cursor: pointer;
//       :hover {
//         color: var(--grey);
//       }
//     }
//   }
// `;
// export default App;
