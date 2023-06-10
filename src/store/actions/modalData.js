import * as types from "../action-types";

export const removeModalData = (dataFrom) => {
    return {
        type: types.MODAL_DATA_REMOVE,
        dataFrom 
    }
}

export const addModalData = (dataFrom) => {
    return {
        type: types.MODAL_DATA_ADD,
        dataFrom 
    }
}