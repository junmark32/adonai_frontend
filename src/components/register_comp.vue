<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-12 custom-card">
            <v-card-title class="primary darken-1 white--text text-center">
              <h2>Register</h2>
            </v-card-title>
  
            <v-card-text>
              <v-form @submit.prevent="register">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="firstName"
                      label="First Name"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="lastName"
                      label="Last Name"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
  
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="email"
                      label="Email"
                      outlined
                      required
                      type="email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="phone"
                      label="Phone Number"
                      outlined
                      required
                      type="tel"
                    ></v-text-field>
                  </v-col>
                </v-row>
  
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="dateOfBirth"
                      label="Date of Birth"
                      outlined
                      required
                      type="date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="gender"
                      label="Gender"
                      outlined
                      required
                      :items="['Male', 'Female', 'Other']"
                    ></v-select>
                  </v-col>
                </v-row>
  
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="address"
                      label="Address"
                      outlined
                      required
                      rows="3"
                    ></v-textarea>
                  </v-col>
                </v-row>
  
                <v-divider></v-divider>

                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="username"
                      label="Username"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="password"
                      label="Password"
                      outlined
                      required
                      type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
  
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="confirmPassword"
                      label="Confirm Password"
                      outlined
                      required
                      type="password"
                      :rules="[() => password === confirmPassword || 'Passwords do not match']"
                    ></v-text-field>
                  </v-col>
                </v-row>
  
                <v-row justify="center">
                  <v-btn @click="register" color="primary" class="custom-btn">Register</v-btn>
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
  
  export default {
    data() {
      return {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      async register() {
        try {
          // Validate passwords
          if (this.password !== this.confirmPassword) {
            console.error('Passwords do not match');
            return;
          }
  
          // Prepare data to be sent to the server
          const userData = {
            username: this.username,
            firstname: this.firstName,
            lastname: this.lastName,
            email: this.email,
            phone: this.phone,
            dateOfBirth: this.dateOfBirth,
            gender: this.gender,
            address: this.address,
            password: this.password,
          };
  
          // Make an HTTP POST request to your server endpoint
          const response = await axios.post('register', userData);
  
          // Log the full response for debugging
          console.log('Full response:', response);
  
          // Handle the response from the server
          if (response.data.msg === 'okay') {
            console.log('Registration successful');
            // Optionally, you can redirect the user to another page or show a success message.
          } else {
            console.error('Registration failed');
            // Handle the case where registration failed, e.g., show an error message.
          }
        } catch (error) {
          console.error('Error during registration:', error);
          // Handle any errors that occurred during the registration process.
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