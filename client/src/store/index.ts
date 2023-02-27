import { create } from "zustand"
import { userData } from "../types"


type State = {
    user: userData | null
    setUser: (payload: userData | null) => void
  }

const useUserStore = create<State>((set) => ({
    user: null,
    setUser: (payload) => set({user: payload})
}))

export default useUserStore