import { createSlice } from "@reduxjs/toolkit";

export const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        isLoading: false,
        active: null,
        employees: [],
        confirm: false,
        errorMessage: null,
        serverMessage: null,
    },
    reducers: {
        onIsLoading: (state) => {
            state.isLoading = true;
        },

        onSetActiveEmployee: (state, { payload }) => {
            state.active = payload;
        },
        onLoadEmployees: (state, { payload = [] }) => {
            state.isLoading = false;
            state.employees = payload
        },

        onAddNewEmployee: (state, { payload }) => {
            if (payload.id === 0) return;
            state.employees.push(payload);
            state.active = null;
        },

        onUpdateEmployee: (state, { payload }) => {
            state.employees = state.employees.map(item => {
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
    onSetActiveEmployee,
    onLoadEmployees,
    onAddNewEmployee,
    onUpdateEmployee,
    onConfirmDelete,
    onSendErrorMessage,
    onSendServerErrorMessage,
    onClearMessage,
} = employeesSlice.actions;