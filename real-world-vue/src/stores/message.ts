import { defineStore } from 'pinia'
export const useMeesageStore = defineStore('meesage', {
    state: () => ({
        message: '' as string
    })
})