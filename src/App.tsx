import { useEffect } from 'react'

import { SomeoneIsTyping } from './components/SomeoneIsTyping'
import { StorageLoading } from './components/StorageLoading'
import { WhoIsHere } from './components/WhoIsHere'
import useStore from './store'

import './App.css'

const roomId = 'zustand-todo-list'

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

   if (isStorageLoading) return <StorageLoading />

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
