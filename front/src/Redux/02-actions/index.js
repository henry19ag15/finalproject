import axios from "axios"

export function postUser(payload) {

    return async function () {
        await axios.post("http://localhost:3001/register", { payload});
        return {
            type: "POST_USER"
        }
    }



}
