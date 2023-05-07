import { Fragment } from 'react'
import useStore from '../../store'

export const SomeoneIsTyping = () => {
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
