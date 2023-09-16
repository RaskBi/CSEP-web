import { createSlice } from "@reduxjs/toolkit";

export const changePaswordsSlice = createSlice({
    name: 'changePaswords',
    initialState: {
        isLoading: false,
        active: null,
        changePaswords: [],
        confirm: false,
        errorMessage: null,
        serverMessage: null,
    },
    reducers: {
        onIsLoading: (state) => {
            state.isLoading = true;
        },

        onSetActiveChangePasword: (state, { payload }) => {
            state.active = payload;
        },
        onLoadChangePaswords: (state, { payload = [] }) => {
            state.isLoading = false;
            state.changePaswords = payload
        },

        onAddNewChangePasword: (state, { payload }) => {
            if (payload.id === 0) return;
            state.changePaswords.push(payload);
            state.active = null;
        },

        onUpdateChangePasword: (state, { payload }) => {
            state.changePaswords = state.changePaswords.map(item => {
                if (item.id === payload.id) {
                    return payload;
                }
                return item;
            });
        },

        onConfirmDelete: (state,) => {
            state.confirm = true
        },
        onSendErrorMessage: (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        },
        onSendServerErrorMessage: (state, { payload }) => {
            state.isLoading = false;
            state.serverMessage = payload;
        },
        onClearMessage: (state) => {
            state.errorMessage = null;
            state.serverMessage = null;
            state.confirm = false;
        },

        onStopLoading:(state)=>{
            state.isLoading=false
        }

        /*       onDeleteEvent: ( state ) => {
       if ( state.activeEvent ) {
           state.events = state.events.filter( event => event.id !== state.activeEvent.id );
           state.activeEvent = null;
       }
   },
 
   onLogoutCalendar: ( state ) => {
       state.isLoadingEvents = true,
       state.events      = []
       state.activeEvent = null
   } */
    }
})

export const {
    onIsLoading,
    onSetActiveChangePasword,
    onLoadChangePaswords,
    onAddNewChangePasword,
    onUpdateChangePasword,
    onConfirmDelete,
    onSendErrorMessage,
    onSendServerErrorMessage,
    onClearMessage,
    onStopLoading,
} = changePaswordsSlice.actions;