<template>
  <v-app>
    <!-- Navigation Drawer (Sidebar) -->
    <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" permanent>
      <v-list dense>
        <!-- Sidebar Content -->
        <v-list-item-group>
          <v-list-item @click="navigateTo('dashboard')">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="navigateTo('appointments')">
            <v-list-item-icon>
              <v-icon>mdi-calendar-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Appointments</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="navigateTo('patients')">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Patients</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="navigateTo('eyewear')">
            <v-list-item-icon>
              <v-icon>mdi-glasses</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Eyewear</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <!-- Logout Button -->
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="white--text">Doctor Panel</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="editProfile">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-main>
      <v-container>
        <!-- Dashboard Content -->
        <v-row v-if="currentView === 'dashboard'">
          <v-col>
            <v-card>
              <v-card-title class="headline">Doctor Information</v-card-title>
              <v-card-subtitle>{{ doctor.firstName }} {{ doctor.lastName }}</v-card-subtitle>
              <v-divider></v-divider>
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Email:</v-list-item-title>
                      <v-list-item-subtitle>{{ doctor.email }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Phone:</v-list-item-title>
                      <v-list-item-subtitle>{{ doctor.phone }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Specialization:</v-list-item-title>
                      <v-list-item-subtitle>{{ doctor.specialization }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Appointments Content -->
  <v-row v-if="currentView === 'appointments'">
    <v-col>
      <v-card>
        <v-card-title class="headline">Upcoming Appointments</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <!-- Filter options -->
          <v-row class="mb-2">
            <v-col>
              <v-select v-model="perPage" :items="[5, 10, 20]" label="Items per page"></v-select>
            </v-col>
            <v-col>
              <v-select v-model="statusFilter" :items="['All', 'Approved', 'Pending']" label="Status"></v-select>
            </v-col>
            <v-col>
              <v-text-field v-model="search" label="Search"></v-text-field>
            </v-col>
          </v-row>

          <!-- Table -->
          <div class="table-container">
            <table class="elevation-1 appointment-table">
              <thead>
                <tr>
                  <th v-for="header in appointmentsTableHeaders" :key="header.value">
                    {{ header.text }}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filteredAppointments" :key="item.AppointmentID">
                  <td v-for="header in appointmentsTableHeaders" :key="header.value">
                    {{ item[header.value] }}
                  </td>
                  <td>
                    <v-btn @click="openModal(item)" class="action-button">View</v-btn>
                    <v-btn v-if="item.status === 'Scheduled'" @click="approveAppointment(item)" class="action-button">
                      Approve
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>


        <!-- Patients Content -->
        <v-row v-if="currentView === 'patients'">
          <v-col>
            <v-card>
              <v-card-title class="headline">Patient Records</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-data-table
                  :headers="patientTableHeaders"
                  :items="patients"
                  :items-per-page="5"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Patients</v-toolbar-title>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-btn @click="viewPatientDetails(item)">
                      View Details
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Eyewear Content -->
        <v-row v-if="currentView === 'eyewear'">
          <v-col>
            <v-card>
              <v-card-title class="headline">Eyewear Inventory</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-data-table
                  :headers="eyewearTableHeaders"
                  :items="eyewear"
                  :items-per-page="5"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Eyewear</v-toolbar-title>
                    </v-toolbar>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Modal for detailed appointment information -->
        <v-dialog v-model="showModal" max-width="600">
          <v-card>
            <v-card-title class="headline">{{ modalAppointment.Fullname }}</v-card-title>
            <v-card-title class="headline">{{ modalAppointment.PatientID }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <!-- Display detailed information here -->
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Appointment_ID:</v-list-item-title>
                    <v-list-item-subtitle>{{ modalAppointment.AppointmentID }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Email:</v-list-item-title>
                    <v-list-item-subtitle>{{ modalAppointment.Email }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Phone:</v-list-item-title>
                    <v-list-item-subtitle>{{ modalAppointment.Phone }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Date:</v-list-item-title>
                    <v-list-item-subtitle>{{ modalAppointment.Pref_Date }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Doctor:</v-list-item-title>
                    <v-list-item-subtitle>{{ modalAppointment.Pref_Doctor }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Purpose:</v-list-item-title>
                    <v-list-item-subtitle>{{ modalAppointment.Purpose }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Message:</v-list-item-title>
                    <v-list-item-subtitle>{{ modalAppointment.Add_message }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Status:</v-list-item-title>
                    <v-list-item-subtitle>{{ modalAppointment.Status }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <!-- Add more details as needed -->
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="approveAppointmentInModal">Approve Appointment</v-btn>
              <v-btn @click="closeModal">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      
      //search,filtere
      perPage: 5,
      statusFilter: 'All',
      search: '',

      //
      drawer: true,
      mini: false,
      currentView: 'dashboard', // Default view

      // Sample Doctor Data
      doctor: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        specialization: 'Ophthalmologist',
      },

      // Sample Appointments Data
      appointments: [
      ],
      appointmentsTableHeaders: [
        { text: 'Appointment ID', value: 'AppointmentID' },
        { text: 'Patient ID', value: 'PatientID' },
        { text: 'Fullname', value: 'Fullname' },
        { text: 'Email', value: 'Email' },
        { text: 'Phone', value: 'Phone' },
        { text: 'Date', value: 'Pref_Date' },
        { text: 'Doctor', value: 'Pref_Doctor' },
        { text: 'Purpose', value: 'Purpose' },
        { text: 'Message', value: 'Add_message' },
        { text: 'Status', value: 'Status' },
      ],

      // Sample Patients Data
      patients: [
        {
          patientID: 1,
          firstName: 'Alice',
          lastName: 'Smith',
          email: 'alice.smith@example.com',
          phone: '987-654-3210',
          gender: 'Female',
          dateOfBirth: '1990-05-15',
          address: '123 Main St, Cityville',
        },
        // Add more sample patients as needed
      ],

      // Sample Eyewear Data
      eyewear: [
        {
          eyewearID: 1,
          name: 'Sunset Shades',
          brand: 'Fashion Eyewear Co.',
          type: 'Sunglasses',
          price: 49.99,
          stockQuantity: 20,
        },
        // Add more sample eyewear as needed
      ],

      // Table Headers for Patients
      patientTableHeaders: [
        { text: 'ID', value: 'patientID' },
        { text: 'First Name', value: 'firstName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Gender', value: 'gender' },
        { text: 'Date of Birth', value: 'dateOfBirth' },
        { text: 'Address', value: 'address' },
      ],

      // Table Headers for Eyewear
      eyewearTableHeaders: [
        { text: 'ID', value: 'eyewearID' },
        { text: 'Name', value: 'name' },
        { text: 'Brand', value: 'brand' },
        { text: 'Type', value: 'type' },
        { text: 'Price', value: 'price' },
        { text: 'Stock Quantity', value: 'stockQuantity' },
      ],

      //modals
      // Modal state and appointment data
      showModal: false,
      modalAppointment: {},


      //

      doctorUsername: null,
      doctorID: null,
    };
  },

  //filter search
  computed: {
    filteredAppointments() {
      let filtered = this.appointments;

      // Apply status filter
      if (this.statusFilter !== 'All') {
        filtered = filtered.filter(item => item.status === this.statusFilter);
      }

      // Apply search filter
      if (this.search) {
        const searchTerm = this.search.toLowerCase();
        filtered = filtered.filter(item =>
          Object.values(item).some(value => String(value).toLowerCase().includes(searchTerm))
        );
      }

      return filtered.slice(0, this.perPage);
    },
  },

  created (){

    this.doctorUsername = sessionStorage.getItem('Username');
    this.doctorID = sessionStorage.getItem('DoctorID');

    //
    this.getAppointmentsbyDoctorUsername();
    this.approveAppointmentInModal();

  },

  methods: {
    // Method to navigate to different views
    navigateTo(view) {
      this.currentView = view;
    },

    //modals
    // Method to open the modal and set the modalAppointment data
    openModal(appointment) {
      this.modalAppointment = appointment;
      this.showModal = true;
    },

    // Method to close the modal
    closeModal() {
      this.showModal = false;
      this.modalAppointment = {};
    },

    //show appoitments
    async getAppointmentsbyDoctorUsername() {
      try {
        const response = await axios.get(`getAppointmentsByDoctorUsername/${this.doctorUsername}`);
        
        this.appointments = response.data;
        
        
      } catch (error) {
        console.error('Error fetching subjects by studentId:', error);
      }
    },

    //approveapppinemt
    async approveAppointmentInModal() {
      try {
        // Make an Axios request to approve the appointment
        const response = await axios.post(`approveAppointment/${this.doctorID}/${this.modalAppointment.AppointmentID}`);
        
        console.log(response.data.message);
    
        // Assuming you want to update the status locally in Vue.js
        this.modalAppointment.Status = 'Approved';
    
        // Send an email to the client
        this.sendApprovalEmail(this.modalAppointment);
    
        // Close the modal after approval
        this.closeModal();
      } catch (error) {
        console.error('Error approving appointment:', error);
      }
    },
    
    async sendApprovalEmail(appointment) {
      try {
        // Make an Axios request to send the approval email
        const response = await axios.post(`sendApprovalEmail`, appointment);
        
        console.log(response.data.message);
      } catch (error) {
        console.error('Error sending approval email:', error);
      }
    },
    

    async openConfirmationDialog() {
      const confirmed = await this.$confirm('Are you sure you want to approve this appointment?', 'Confirmation', {
        confirmButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        type: 'info',
      });
    
      if (confirmed) {
        this.approveAppointmentInModal();
      }
    },
    
    

    // Method to mark appointment as completed
    completeAppointment(appointment) {
      console.log(`Completing appointment: ${appointment.appointmentID}`);
      appointment.status = 'Completed';
    },

    // Method to view patient details
    viewPatientDetails(patient) {
      console.log(`Viewing details of patient: ${patient.patientID}`);
      // You can add logic to navigate to a detailed patient view
    },

    // Method to edit profile
    editProfile() {
      console.log('Editing profile...');
      // You can add logic to open a profile editing dialog or navigate to a profile editing page
    },

    // Method to logout
    logout() {
      console.log('Logging out...');
      // You can add logic to perform logout actions
    },

    // Method to retrieve appointments from the database
    async fetchAppointments() {
      try {
        // Assuming you have an API endpoint to fetch appointments
        const response = await fetch('/api/appointments');
        if (response.ok) {
          this.appointments = await response.json();
        } else {
          console.error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    },

    // Method to view appointment details
    viewAppointment(appointment) {
      console.log(`Viewing details of appointment: ${appointment.appointmentID}`);
      // You can add logic to navigate to a detailed appointment view
    },

    // Method to approve appointment
    approveAppointment(appointment) {
      console.log(`Approving appointment: ${appointment.appointmentID}`);
      // You can add logic to update the appointment status in the database
    },
  },

  mounted() {
    // Fetch appointments when the component is mounted
    
  },
};
</script>

<style scoped>
.appointment-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.appointment-table th, .appointment-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.appointment-table th {
  background-color: #f2f2f2;
}

.action-button {
  margin-right: 5px;
}

.table-container {
  overflow-x: auto;
}
</style>
