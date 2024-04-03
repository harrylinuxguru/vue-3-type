<template>
  <div class="card">
    <div class="card-header">
     Login Page
    </div>
    <div class="card-body">
      <form @submit.prevent="loginAction">
        <label>email</label>
        <input
          type="text"
          v-model="user.email"
          name="email"
          id="email"
          class="form-control"
        />
        <label>Password</label>
        <input
          type="password"
          v-model="user.password"
          name="password"
          id="password"
          class="form-control"
        />
        <input type="submit" value="Login" class="btn btn-success" />
      </form>
    </div>
    <!-- <div>
        <button @click="goBack">Go back home page</button>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface User {
  email: string;
  password: string;
}

export default defineComponent({
  name: "Login",
  data() {
    return {
      user: {
        email: '',
        password: ''
      } as User
    };
  },
  methods: {
    async loginAction() {
      try {
        const response = await axios.post(
          "http://localhost:3001/auth/login",
          this.user
        );
        const data = response.data;
        console.log(data)
        if (data.accessToken) {
          alert(`Logged in successfully as ${data.email}`);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("userId", data.userId);
          this.$router.push('/tutorials');
          
        } else {
          alert('Invalid email or password');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login. Please try again later.');
      }
    },
    goBack() {
      this.$router.push('/tutorials');
    }
  }
});
</script>

<style scoped>
.card {
  background-image: url("/assets/1.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.card-body {
  background-color: rgba(255, 255, 255, 0.38);
  padding: 20px;
  border-radius: 8px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  margin-bottom: 10px;
}

button {
  width: 100%;
}
</style>
