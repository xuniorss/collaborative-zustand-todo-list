import useStore from '../../store'

export const WhoIsHere = () => {
   const othersUsersCount = useStore((state) => state.liveblocks.others.length)

   return (
      <div className="who_is_here">
         Existem {othersUsersCount} outros usuários on-line
      </div>
   )
}
