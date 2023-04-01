import { create } from "zustand";


export const conversationStore = create((set) => 
({
    conversationSelected: {
        id: 1,
        messages: []
    },
    setConversationSelected: (data) => set({conversationSelected: data}),

    conversations: [],
    setConversations: (data) => set({conversations: data})
}))