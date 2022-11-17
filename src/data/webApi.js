const linkApi = "http://localhost:5000"

export const routeApi = {
    getFriends: `${linkApi}/api/friends`,
    getSearchFriend: `${linkApi}/api/friend`,
    getuser: `${linkApi}/api/user`,
    createUser: `${linkApi}/api/register`,
    SignIn: `${linkApi}/api/login`,
    sendMessage: `${linkApi}/api/message`,
    getMessages: `${linkApi}/api/messages`,
    createConversation: `${linkApi}/api/conversation`,
    editInfoUserImg: `${linkApi}/api/edit-my-account-photo`,
    editInfoUserInfo: `${linkApi}/api/edit-my-account-info`
}

export const configAuthHeader = {
    headers:{
        "Content-Type" : "application/json",
        "Authorization": localStorage.getItem("token")
    }
}

export const configHeader = {
    headers:{
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    }
}

export const configAuthFormDataHeader = {
    headers:{
        "Content-Type": "multipart/form-data",
        "Authorization": localStorage.getItem("token")
    }
}