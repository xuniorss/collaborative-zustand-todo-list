import { Fragment, useEffect } from 'react'
import './App.css'
import useStore from './store'

const roomId = 'zustand-todo-list'

const WhoIsHere = () => {
   const othersUsersCount = useStore((state) => state.liveblocks.others.length)

   return (
      <div className="who_is_here">
         Existem {othersUsersCount} outros usuários on-line
      </div>
   )
}

const SomeoneIsTyping = () => {
   const others = useStore((state) => state.liveblocks.others)
   const someoneIsTyping = others.some((user) => user.presence?.isTyping)

   return (
      <Fragment>
         {someoneIsTyping && (
            <div className="someone_is_typing">Alguém está digitando</div>
         )}

         {!someoneIsTyping && null}
      </Fragment>
   )
}

export default function App() {
   const {
      draft,
      setDraft,
      todos,
      addTodo,
      deleteTodo,
      liveblocks: { enterRoom, leaveRoom, isStorageLoading },
   } = useStore()

   useEffect(() => {
      enterRoom(roomId)

      return () => leaveRoom(roomId)
   }, [enterRoom, leaveRoom])

   if (isStorageLoading) {
      return (
         <div className="loading">
            <img src="https://liveblocks.io/loading.svg" alt="Loading" />
         </div>
      )
   }

   return (
      <div className="container">
         <WhoIsHere />

         <input
            className="input"
            type="text"
            placeholder="O que precisa ser feito ?"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
               if (e.key === 'Enter') {
                  addTodo()
               }
            }}
         />

         <SomeoneIsTyping />

         {todos.map((todo, index) => {
            return (
               <div className="todo_container" key={index}>
                  <div className="todo">{todo.text}</div>
                  <button
                     className="delete_button"
                     onClick={() => {
                        deleteTodo(index)
                     }}
                  >
                     ✕
                  </button>
               </div>
            )
         })}
      </div>
   )
}

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */

//  function overrideRoomId() {
//    const query = new URLSearchParams(window?.location?.search);
//    const roomIdSuffix = query.get("roomId");

//    if (roomIdSuffix) {
//      roomId = `${roomId}-${roomIdSuffix}`;
//    }
//  }
