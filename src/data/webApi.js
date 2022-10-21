const linkApi = "http://localhost:5000"

export const routeApi = {
    getFriends: `${linkApi}/api/friends`,
    getuser: `${linkApi}/api/user`,
    createUser: `${linkApi}/api/register`,
    SignIn: `${linkApi}/api/login`,
    sendMessage: `${linkApi}/api/message`,
    getMessages: `${linkApi}/api/messages`
}

export const configAuthHeader = {
    headers:{
        "Content-type" : "application/json",
        "Authorization": localStorage.getItem("token")
    }
}

export const configHeader = {
    headers:{
        "Content-type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    }
}