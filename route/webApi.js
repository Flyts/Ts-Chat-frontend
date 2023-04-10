const linkApi = "https://naledi-api.onrender.com"

export const routeApi = 
{
    register: `${linkApi}/auth/signup`,
    create_conversation: `${linkApi}/conversations`,
    send_message: `${linkApi}/conversations/new-message`
}


export const configHeader = {
    headers:{
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    }
}


// export const configHeaderAuth = {
//     headers:{
//         "Content-Type": "application/json",
//         "X-Requested-With": "XMLHttpRequest",
//         "Authorization": token
//     }
// }