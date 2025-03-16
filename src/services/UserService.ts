import router from '@/router'
import type { LoginCredentials } from '@/types'

const baseURL = import.meta.env.VITE_AUTH_SERVER_URL

interface StorageData {
  auth_token: string | null;
  username: string | null;
}

export default {
  login(credentials: LoginCredentials): Promise<{ token: string }> {
    const url = baseURL
    const options: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(credentials)
    };

    return fetch(url, options)
            .then(response => response.json())
            .catch(error => {
                console.error('API Error for login, ' + error)
                return Promise.reject(error)
            })
  },

  logout(): void {
    this.clearLocalStorage()
    router.push({ name: "home" })
  },

  isInLocalStorage(): boolean {
    return localStorage.getItem('auth_token') != null && localStorage.getItem('username') != null
  },

  saveToLocalStorage(auth_token: string | null, username: string | null): void {
    localStorage.setItem('auth_token', JSON.stringify(auth_token))
    localStorage.setItem('username', JSON.stringify(username))
  },

  getFromLocalStorage(): StorageData {
    const auth_token = JSON.parse(localStorage.getItem('auth_token') || 'null')
    const username = JSON.parse(localStorage.getItem('username') || 'null')

    return {
      auth_token,
      username
    }
  },

  clearLocalStorage(): void {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("username")
  }
}