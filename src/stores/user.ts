import { defineStore } from "pinia"
import UserService from "@/services/UserService"
import type { UserState, LoginCredentials } from '@/types'

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    username: null,
    token: null,
  }),
  getters: {
    isLoggedIn(state): boolean {
      return !!state.token;
    },
  },
  actions: {
    login(credentials: LoginCredentials) {
      return UserService.login(credentials).then(data => {
        this.token = data.token
        this.username = credentials.username
        UserService.saveToLocalStorage(this.token, this.username)
      });
    },
    logout() {
        this.token = null
        this.username = null
        UserService.logout()
    },
    checkPreviousLogin() {
      if (UserService.isInLocalStorage()) {
        const user = UserService.getFromLocalStorage()
        this.token = user.auth_token
        this.username = user.username
      }
    },
  },
});