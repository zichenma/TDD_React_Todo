import { CHANGE_INPUT_VALUE } from './constants';

const initalState = {
    inputValue: ''
}

export default (state = initalState, action) => {
    switch(action.type) {
        case CHANGE_INPUT_VALUE: 
           return {
               inputValue: action.value
           }
        default:
          return state;
    }
}