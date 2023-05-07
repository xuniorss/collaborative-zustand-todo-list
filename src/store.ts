import { createClient } from '@liveblocks/client'

import type { WithLiveblocks } from '@liveblocks/zustand'
import { create } from 'zustand'
import { liveblocks } from '@liveblocks/zustand'

const PUBLIC_KEY =
   'pk_dev_hpcVOCQ_mkff-ywZGtjdUdna5iKoRuUFjucx6nEjWSkUCifVG-M1czirNVuHIOnP'

// overrideApiKey();

const client = createClient({ publicApiKey: PUBLIC_KEY })

type Todo = { text: string }

type State = {
   draft: string
   isTyping: boolean
   todos: Todo[]
   setDraft: (draft: string) => void
   addTodo: () => void
   deleteTodo: (index: number) => void
}

type Presense = { isTyping: boolean }

const useStore = create<WithLiveblocks<State, Presense>>()(
   liveblocks(
      (set) => ({
         draft: '',
         isTyping: false,
         todos: [],
         setDraft: (draft: string) =>
            set({ draft, isTyping: draft === '' ? false : true }),
         addTodo: () =>
            set((state) => ({
               todos: state.todos.concat({ text: state.draft }),
               draft: '',
            })),
         deleteTodo: (index: number) =>
            set((state) => ({
               todos: state.todos.filter((_, i) => index !== i),
            })),
      }),
      {
         client,
         presenceMapping: { isTyping: true },
         storageMapping: { todos: true },
      }
   )
)

export default useStore

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */

// const overrideApiKey = () => {
//    const query = new URLSearchParams(window?.location?.search)
//    const apiKey = query.get('apiKey')

//    if (apiKey) {
//       PUBLIC_KEY = apiKey
//    }
// }
