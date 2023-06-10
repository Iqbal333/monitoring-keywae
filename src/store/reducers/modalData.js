import * as types from '../action-types';

const initialState = {
    dataFrom: []
}

export default function modalData(state = initialState, actions) {
    switch (actions.types) {
        case types.MODAL_DATA_ADD:
            return {
                ...state,
                dataFrom: actions.data
            }
    
        case types.MODAL_DATA_REMOVE:
            return {
                ...state,
                dataFrom: actions.data
            }
        
        default:
            return state
    }
}