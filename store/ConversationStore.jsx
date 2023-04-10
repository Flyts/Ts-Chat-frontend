import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'


export const conversationStore = create((set) => 
({
    conversationSelected: {
        _id: 0,
        messages: []
    },
    setConversationSelected: (data) => set({conversationSelected: data}),

    conversations: [],
    setConversations: (data) => set({conversations: data}),

    conversationIndex: null,
    setConversationIndex: (data) => set({conversationIndex: data}),
}))


// export const conversationStore = create(
//   persist(
//     (set, get) => (
//     {
//         bears: 0,
//         addABear: () => set({ bears: get().bears + 1 }),
        
//         conversationSelected: {
//             id: 1,
//             messages: []
//         },
//         setConversationSelected: (data) => set({conversationSelected: data}),

//         conversations: [{
//             _id: 2,
//             title: "Mon titre",
//             messages: []
//         }],
//         setConversations: (data) => set({conversations: [...get().conversations, data]})
//     }),
//     {
//       name: 'conversation-storage',
//       storage: createJSONStorage(() => sessionStorage), 
//     }
//   )
// )
