import { defineStore } from 'pinia'

export interface Settings {
  maxContentWidth: number
  talkStored: boolean
  draftStored: boolean
}

export const useSettings = defineStore('settings', {
  state: (): Settings => ({
    maxContentWidth: 500,
    talkStored: true,
    draftStored: true
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'settings',
        storage: localStorage
      }
    ]
  }
})
