<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-card-title class="primary darken-1 white--text text-center">
            <h2>Login</h2>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="username"
                label="Username"
                outlined
                required
                type="username"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                outlined
                required
                type="password"
              ></v-text-field>

              <v-btn type="submit" color="primary" class="mr-4">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '@/router';
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('login', {
          username: this.username,
          password: this.password,
        });
    
        if (response.data.msg === 'okay') {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('UserID', response.data.UserID);
          sessionStorage.setItem('Username', response.data.Username);
    
          // Check the role and route accordingly
          switch (response.data.Role) {
            case 'user':
              sessionStorage.setItem('PatientID', response.data.PatientID);
              router.push('/');
              break;
    
            case 'doctor':
              sessionStorage.setItem('DoctorID', response.data.DoctorID);
              router.push('/Doctor/Dashboard');
              break;
    
            case 'admin':
              router.push('/Admin/Dashboard');
              break;
    
            default:
              // Unknown role
              console.error('Invalid role:', response.data.Role);
              break;
          }
        } else {
          // Handle other response scenarios, e.g., display error messages to the user
          console.error('Login failed:', response.data.msg);
        }
      } catch (error) {
        console.error('Login failed:', error);
        // Handle other error scenarios, e.g., display a generic error message to the user
      }
    },
    
    logout() {
      // Clear sessionStorage on logout
      sessionStorage.clear();
      router.push('/login'); // Redirect to login page after logout
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
