// @flow

import type { CanvasState } from '../../flowtype/states/canvas-state'
import type { CanvasAction } from '../../flowtype/actions/canvas-actions'

import {
    GET_CANVASES_REQUEST,
    GET_CANVASES_SUCCESS,
    GET_CANVASES_FAILURE,
    GET_CANVAS_REQUEST,
    GET_CANVAS_SUCCESS,
    GET_CANVAS_FAILURE,
} from './actions'

const initialState = {
    byId: {},
    list: [],
    error: null,
    fetching: false,
}

export default function (state: CanvasState = initialState, action: CanvasAction): CanvasState {
    switch (action.type) {
        case GET_CANVAS_REQUEST:
        case GET_CANVASES_REQUEST:
            return {
                ...state,
                fetching: true,
            }
        case GET_CANVASES_SUCCESS:
            return {
                ...state,
                list: action.canvases,
                fetching: false,
                error: null,
            }
        case GET_CANVASES_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.error,
            }
        case GET_CANVAS_SUCCESS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.canvas.id]: action.canvas,
                },
                fetching: false,
                error: null,
            }
        case GET_CANVAS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.error,
            }

        default:
            return state
    }
}
