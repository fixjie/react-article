import actionTypes from '../actions/actionTypes'

const initState = {
    isLoading : false,
    list:[]   
}

export default ( state=initState,action ) =>{
    switch(action.type){
        case actionTypes.START_MARK_AS_READ:
            return {
                ...state,
                isLoading : true
            }
        case actionTypes.SUCCESS_MARK_AS_READ:
            return {
                ...state,
                isLoading : false
            }
        case actionTypes.GET_ALL_NOTIFICATION:
            return {
                ...state,
                list : action.payload.list
            }
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
            let newList = state.list.map(item =>{
                if(item.id===action.payload.id){
                    item.hasRead=true;
                }
                return item
            })
            return {
                ...state,
                list : newList
            }
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_All:
            let newList2 = state.list.map(item =>{
                item.hasRead=true;
                return item
            })
            return {
                ...state,
                list : newList2
            }
        default:
            return state
    }
}