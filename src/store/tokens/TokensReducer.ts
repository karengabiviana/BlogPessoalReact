import { CallToActionSharp } from "@material-ui/icons";
import { Action } from "./Actions";

export interface TokenState //model
{
    tokens: string // única propriedade
}

const initialState = 
{
    tokens:""
}

export const tokenReducer = (state: TokenState= initialState, action: Action) => {
    switch (action.type)
    {
        case "ADD_TOKEN":
            {
                return{tokens: action.payload}
            }
            default: 
                return state
    }
}