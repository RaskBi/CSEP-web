import { createSlice } from "@reduxjs/toolkit"

export const packagesSlice = createSlice({
  name: "packages",
  initialState: {
    isLoading: false,
    active: null,
    packages: [],
    confirm: false,
    errorMessage: null,
    serverMessage: null,
  },
  reducers: {
    onIsLoading: (state) => {
      state.isLoading = true
    },

    onSetActivePackage: (state, { payload }) => {
      state.active = payload
    },
    onLoadPackages: (state, { payload = [] }) => {
      state.isLoading = false
      state.packages = payload
    },

    onAddNewPackage: (state, { payload }) => {
      if (payload.id === 0) return
      state.packages.push(payload)
      state.active = null
    },

    onUpdatePackage: (state, { payload }) => {
      state.packages = state.packages.map((item) => {
        if (item.id === payload.id) {
          return payload
        }
        return item
      })
    },

    onConfirmDelete: (state) => {
      state.confirm = true
    },
    onSendErrorMessage: (state, { payload }) => {
      state.isLoading = false
      state.errorMessage = payload
    },
    onSendServerErrorMessage: (state, { payload }) => {
      state.isLoading = false
      state.serverMessage = payload
    },
    onClearMessage: (state) => {
      state.errorMessage = null
      state.serverMessage = null
      state.confirm = false
    },

    onDeletePackage: (state) => {
      if (state.active) {
        state.packages = state.packages.filter(
          (event) => event.id !== state.active.id
        )
        state.active = null
      }
      
    },
  },
})

export const {
  onIsLoading,
  onSetActivePackage,
  onLoadPackages,
  onAddNewPackage,
  onUpdatePackage,
  onConfirmDelete,
  onSendErrorMessage,
  onDeletePackage,
  onSendServerErrorMessage,
  onClearMessage,
} = packagesSlice.actions
