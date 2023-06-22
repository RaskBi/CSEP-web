import { createSlice } from "@reduxjs/toolkit";

export const deliveryAgentsSlice = createSlice({
    name: 'deliveryAgents',
    initialState: {
        isLoading: false,
        active: null,
        deliveryAgents: [],
        confirm: false,
        errorMessage: null,
        serverMessage: null,
    },
    reducers: {
        onIsLoading: (state) => {
            state.isLoading = true;
        },

        onSetActiveDeliveryAgent: (state, { payload }) => {
            state.active = payload;
        },
        onLoadDeliveryAgents: (state, { payload = [] }) => {
            state.isLoading = false;
            state.deliveryAgents = payload
        },

        onAddNewDeliveryAgent: (state, { payload }) => {
            if (payload.id === 0) return;
            state.deliveryAgents.push(payload);
            state.active = null;
        },

        onUpdateDeliveryAgent: (state, { payload }) => {
            state.deliveryAgents = state.deliveryAgents.map(item => {
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
    onSetActiveDeliveryAgent,
    onLoadDeliveryAgents,
    onAddNewDeliveryAgent,
    onUpdateDeliveryAgent,
    onConfirmDelete,
    onSendErrorMessage,
    onSendServerErrorMessage,
    onClearMessage,
} = deliveryAgentsSlice.actions;