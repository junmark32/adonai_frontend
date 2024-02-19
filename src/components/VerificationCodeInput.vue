<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-12 custom-card">
            <v-card-title class="primary darken-1 white--text text-center">
              <h2>Verify Email</h2>
            </v-card-title>
  
            <v-card-text>
              <v-form @submit.prevent="verifyCode">
                <v-text-field
                  v-model="verificationCode"
                  label="Verification Code"
                  outlined
                  required
                ></v-text-field>
  
                <v-row justify="center">
                  <v-btn @click="verifyCode" color="primary" class="custom-btn">Verify</v-btn>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import router from '@/router';
  
  export default {
    data() {
      return {
        verificationCode: '',
      };
    },
    methods: {
      async verifyCode() {
        try {
          // Make an HTTP POST request to your server endpoint to verify the code
          const response = await axios.post(`verify-code/${this.verificationCode}`);
  
          // Log the full response for debugging
          console.log('Full response:', response);
  
          // Handle the response from the server
          if (response.data.msg === 'okay') {
            console.log('Verification successful');
            // Optionally, you can redirect the user to another page or show a success message.
          } else {
            console.error('Verification failed');
            // Handle the case where verification failed, e.g., show an error message.
          }

          router.push('/Login');
        } catch (error) {
          console.error('Error during verification:', error);
          // Handle any errors that occurred during the verification process.
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .custom-btn {
    margin-top: 20px;
    width: 100%;
  }
  </style>
  