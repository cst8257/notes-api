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
        text: ''
      },
      editForm: {
        title: '',
        text: ''
      }
    }
  },
  created: async function () { 
    
  },
  methods: {
    login: async function () {
    
    },
    getNotes: async function () {
      
    },
    addNote: async function () {
      
    },
    editNote: function (note) {
      
    },
    updateNote: async function () {

    },
    deleteNote: async function (note) {
      
    },
    logout: async function () {
      
    }

  }
})

app.mount('#app')