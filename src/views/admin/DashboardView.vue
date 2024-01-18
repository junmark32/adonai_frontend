<template>
    <v-app>
      <!-- Navigation Drawer (Sidebar) -->
      <v-navigation-drawer app v-model="drawer" color="primary">
        <v-list>
          <v-list-item v-for="item in sidebarItems" :key="item.text" @click="navigateTo(item.view)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <!-- App Bar -->
      <v-app-bar app color="primary">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="white--text">Admin Panel</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
  
      <!-- Main Content Area -->
      <v-main>
        <v-container>
          <v-row>
            <v-col>
              <v-card>
                <v-card-title class="headline">Manage {{ currentView }}</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <!-- Display relevant data tables based on current view -->
                  <v-data-table
                    v-if="currentView === 'doctors'"
                    :headers="doctorTableHeaders"
                    :items="doctors"
                    :items-per-page="5"
                    class="elevation-1"
                  ></v-data-table>
  
                  <v-data-table
                    v-if="currentView === 'patients'"
                    :headers="patientTableHeaders"
                    :items="patients"
                    :items-per-page="5"
                    class="elevation-1"
                  ></v-data-table>
  
                  <v-data-table
                    v-if="currentView === 'appointments'"
                    :headers="appointmentTableHeaders"
                    :items="appointments"
                    :items-per-page="5"
                    class="elevation-1"
                  ></v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
  
          <!-- Add Doctor Dialog -->
          <v-dialog v-model="addDoctorDialog" max-width="600px">
            <v-card>
              <v-card-title class="headline">Add New Doctor</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="addDoctor">
                  <v-row>
                    <v-col>
                      <v-text-field v-model="newDoctor.firstName" label="First Name"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="newDoctor.lastName" label="Last Name"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field v-model="newDoctor.email" label="Email"></v-text-field>
                  <v-text-field v-model="newDoctor.phone" label="Phone"></v-text-field>
                  <v-text-field v-model="newDoctor.specialization" label="Specialization"></v-text-field>
                  <v-btn type="submit" color="primary">Add Doctor</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
  
          <!-- Add Patient Dialog -->
          <v-dialog v-model="addPatientDialog" max-width="600px">
            <v-card>
              <v-card-title class="headline">Add New Patient</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="addPatient">
                  <v-row>
                    <v-col>
                      <v-text-field v-model="newPatient.firstName" label="First Name"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="newPatient.lastName" label="Last Name"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field v-model="newPatient.email" label="Email"></v-text-field>
                  <v-text-field v-model="newPatient.phone" label="Phone"></v-text-field>
                  <v-text-field v-model="newPatient.gender" label="Gender"></v-text-field>
                  <v-btn type="submit" color="primary">Add Patient</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
  
          <!-- Schedule Appointment Dialog -->
          <v-dialog v-model="scheduleAppointmentDialog" max-width="600px">
            <v-card>
              <v-card-title class="headline">Schedule New Appointment</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="scheduleAppointment">
                  <v-text-field v-model="newAppointment.doctor" label="Doctor"></v-text-field>
                  <v-text-field v-model="newAppointment.patient" label="Patient"></v-text-field>
                  <v-text-field v-model="newAppointment.date" label="Date"></v-text-field>
                  <v-text-field v-model="newAppointment.time" label="Time"></v-text-field>
                  <v-btn type="submit" color="primary">Schedule Appointment</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: true,
        currentView: 'doctors',
        sidebarItems: [
          { text: 'Doctors', icon: 'mdi-doctor', view: 'doctors' },
          { text: 'Patients', icon: 'mdi-account', view: 'patients' },
          { text: 'Appointments', icon: 'mdi-calendar', view: 'appointments' },
        ],
  
        // Doctor Data
        doctors: [
          // Sample data, replace with actual data from your backend
          // ...
        ],
        doctorTableHeaders: [
          // Define table headers for doctors
          // ...
        ],
  
        // Patient Data
        patients: [
          // Sample data, replace with actual data from your backend
          // ...
        ],
        patientTableHeaders: [
          // Define table headers for patients
          // ...
        ],
  
        // Appointment Data
        appointments: [
          // Sample data, replace with actual data from your backend
          // ...
        ],
        appointmentTableHeaders: [
          // Define table headers for appointments
          // ...
        ],
  
        // Add Doctor Dialog
        addDoctorDialog: false,
        newDoctor: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          specialization: '',
        },
  
        // Add Patient Dialog
        addPatientDialog: false,
        newPatient: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          gender: '',
        },
  
        // Schedule Appointment Dialog
        scheduleAppointmentDialog: false,
        newAppointment: {
          doctor: '',
          patient: '',
          date: '',
          time: '',
        },
      };
    },
  
    methods: {
      navigateTo(view) {
        this.currentView = view;
      },
  
      // Doctor Methods
      addDoctor() {
        // Add logic to handle adding a new doctor
        console.log('Adding new doctor:', this.newDoctor);
        this.doctors.push(this.newDoctor); // Replace with actual API call
        this.addDoctorDialog = false;
        this.resetNewDoctor();
      },
  
      resetNewDoctor() {
        this.newDoctor = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          specialization: '',
        };
      },
  
      // Patient Methods
      addPatient() {
        // Add logic to handle adding a new patient
        console.log('Adding new patient:', this.newPatient);
        this.patients.push(this.newPatient); // Replace with actual API call
        this.addPatientDialog = false;
        this.resetNewPatient();
      },
  
      resetNewPatient() {
        this.newPatient = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          gender: '',
        };
      },
  
      // Appointment Methods
      scheduleAppointment() {
        // Add logic to handle scheduling a new appointment
        console.log('Scheduling new appointment:', this.newAppointment);
        this.appointments.push(this.newAppointment); // Replace with actual API call
        this.scheduleAppointmentDialog = false;
        this.resetNewAppointment();
      },
  
      resetNewAppointment() {
        this.newAppointment = {
          doctor: '',
          patient: '',
          date: '',
          time: '',
        };
      },
  
      logout() {
        // Add logic for logging out
        console.log('Logging out');
        // Redirect to login or perform other logout actions
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  