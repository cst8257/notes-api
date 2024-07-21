const baseUrl = 'http://127.0.0.1:8000'

const app = Vue.createApp({
  data: function () {
    return {
      title: 'Notes - API',
      token: '',
      notes: [],
      showNewNote: false,
      showEditNote: false,
      loginForm: {
        email: '',
        password: ''
      },
      noteForm: {
        title: '',
        content: ''
      },
      editForm: {
        title: '',
        content: ''
      }
    }
  },
  created: async function () { 
    this.token = sessionStorage.getItem('token') || ''
    
    if (this.token) {
      this.getNotes()
    }
  },
  methods: {
    login: async function () {
      try {
        const response = await fetch(`${baseUrl}/login`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.loginForm)
        })
    
        const json = await response.json()
        this.token = json.token
        sessionStorage.setItem('token', this.token)
        this.getNotes()
      } catch (error) {
        console.error(error)
      }
    },
    getNotes: async function () {
      try {
        const response = await fetch(`${baseUrl}/api/notes`, {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json'
          }
        })
        
        this.notes = await response.json()
      } catch (error) {
        console.error(error)
      }
    },
    addNote: async function () {
      try {
        const response = await fetch(`${baseUrl}/api/notes`, {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.noteForm)
        })

        const json = await response.json()
        this.notes.push(json)
        this.showNewNote = false
      } catch (error) {
        console.error(error)
      }
    },
    editNote: function (note) {
      this.editForm = {
        id: note.id,
        title: note.title,
        text: note.text
      }
      this.showEditNote = true
    },
    updateNote: async function () {
      try {
        const response = await fetch(`${baseUrl}/api/notes/${this.editForm.id}`, {
          method: 'put',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.editForm)
        })

        const json = await response.json()
        const index = this.notes.findIndex(note => note.id === this.editForm.id)
        this.notes[index] = json
        this.showEditNote = false
      } catch (error) {
        console.error(error)
      }
    },
    deleteNote: async function (note) {
      try {
        const response = await fetch(`${baseUrl}/api/notes/${note.id}`, {
          method: 'delete',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json'
          },
        })
        const json = await response.json()
        const index = this.notes.findIndex(note => note.id === json.id)
        this.notes.splice(index, 1)
      } catch (error) {
        console.error(error)
      }
    },
    logout: async function () {
      try {
        const response = await fetch(`${baseUrl}/logout`, {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json'
          },
        })
        sessionStorage.removeItem('token')
        this.token = ''
        this.notes = []
      } catch (error) {
        console.error(error)
      }
    }

  }
})

app.mount('#app')