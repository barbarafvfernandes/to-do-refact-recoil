import {atom} from "recoil";

const userState = atom(
    {
        key: "userState",
        default: { nome: null, estaLogado: false }
    }
);

export default userState;