<template>
    <main>

        <nav class="navbar navbar-expand-lg bg-light fixed-top shadow-lg">
            <div class="container">
                <a class="navbar-brand mx-auto d-lg-none" href="index.html">
                    Adonai
                    <strong class="d-block">Eye Care Clinic</strong>
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#hero">Home</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#about">About</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#eyewear">EyeWear</a>
                        </li>

                        <a class="navbar-brand d-none d-lg-block" href="index.html">
                            Adonai
                            <strong class="d-block">EyeCare Clinic</strong>
                        </a>

                        <li class="nav-item">
                            <a class="nav-link" href="#reviews">Testimonials</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#booking">Booking</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#contact">Contact</a>
                        </li>
                    </ul>

                </div>

                <div class="navbar-icons">
                    <a href="#" class="profile-icon"><i class="bi-person"></i></a>
                    <div class="cart-icon" @click="toggleCartModal">
                        <i class="bi-cart"></i>
                        <span class="cart-count">{{ cart.length }}</span>
                    </div>
                    
                                        
                </div>

            </div>
        </nav>

        <section class="hero" id="hero">
            <div class="container">
                <div class="row">

                    <div class="col-12">
                        <div id="myCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="images/slider/portrait-successful-mid-adult-doctor-with-crossed-arms.jpg" class="img-fluid" alt="">
                                </div>

                                <div class="carousel-item">
                                    <img src="images/slider/young-asian-female-dentist-white-coat-posing-clinic-equipment.jpg" class="img-fluid" alt="">
                                </div>

                                <div class="carousel-item">
                                    <img src="images/slider/doctor-s-hand-holding-stethoscope-closeup.jpg" class="img-fluid" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="heroText d-flex flex-column justify-content-center">

                            <h1 class="mt-auto mb-2">
                                Better
                                <div class="animated-info">
                                    <span class="animated-item">health</span>
                                    <span class="animated-item">days</span>
                                    <span class="animated-item">lives</span>
                                </div>
                            </h1>

                            <p class="mb-4">Medic Care is a Bootstrap 5 Template provided by TemplateMo website. Credits go to FreePik and RawPixel for images used in this template.</p>

                            <div class="heroLinks d-flex flex-wrap align-items-center">
                                <a class="custom-link me-4" href="#about" data-hover="Learn More">Learn More</a>

                                <p class="contact-phone mb-0"><i class="bi-phone"></i> 010-020-0340</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section class="section-padding" id="about">
            <div class="container">
                <div class="row">

                    <div class="col-lg-6 col-md-6 col-12">
                        <h2 class="mb-lg-3 mb-3">Meet Dra. Cabudsan</h2>

                        <p>Protect yourself and others by wearing masks and washing hands frequently. Outdoor is safer than indoor for gatherings or holding events. People who get sick with Coronavirus disease (COVID-19) will experience mild to moderate symptoms and recover without special treatments.</p>

                        <p>You can feel free to use this CSS template for your medical profession or health care related websites. You can <a rel="nofollow" href="http://paypal.me/templatemo" target="_blank">support us a little</a> via PayPal if this template is good and useful for your work.</p>
                    </div>

                    <div class="col-lg-4 col-md-5 col-12 mx-auto">
                        <div class="featured-circle bg-white shadow-lg d-flex justify-content-center align-items-center">
                            <p class="featured-text"><span class="featured-number">3</span> Years<br> of Experiences</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section class="gallery">
            <div class="container">
                <div class="row">

                    <div class="col-lg-6 col-6 ps-0">
                        <img :src="require('../../public/img/pic_1.jpg')" class="img-fluid galleryImage" alt="get a vaccine" title="get a vaccine for yourself">
                    </div>

                    <div class="col-lg-6 col-6 pe-0">
                        <img :src="require('../../public/img/pic_2.jpg')" class="img-fluid galleryImage" alt="wear a mask" title="wear a mask to protect yourself">
                    </div>

                </div>
            </div>
        </section>

        <section id="eyewear">
        <v-app>
            <v-container>

            <h2 class="text-center mb-lg-5 mb-4">Eyewear Collection</h2>
        
              <!-- Product Cards -->
              <v-row>
                <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
                  <v-card class="product-card">
                    <v-img class="product-image" :src="product.image" height="250" contain></v-img>
                    <v-card-title class="product-title">{{ product.name }}</v-card-title>
                    <v-card-subtitle class="product-price">{{ formatPrice(product.price) }}</v-card-subtitle>
                    <v-card-actions class="product-actions">
                      <v-btn @click="addToCart(product)" class="add-to-cart-btn" :disabled="product.type === 'glasses' && !frameInCart">Add to Cart</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
        
              <!-- Cart Modal -->
              <v-dialog v-model="showCartModal" max-width="600">
                <v-card>
                  <v-card-title class="cart-title">Shopping Cart</v-card-title>
                  <v-list>
                    <v-list-item v-for="item in cart" :key="item.product.id">
                      <v-list-item-content>
                        <v-list-item-title>{{ item.product.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ formatPrice(item.product.price) }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn @click="removeFromCart(item.product)" icon>
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                  <v-card-actions>
                    <span class="total-text">Total: {{ formatPrice(totalPrice) }}</span>
                    <v-btn color="primary" @click="showCartModal = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-container>
          </v-app>
        </section>
        

        <section class="section-padding pb-0" id="reviews">
            <div class="container">
                <div class="row">

                    <div class="col-12">
                        <h2 class="text-center mb-lg-5 mb-4">Our Patients</h2>

                        <div class="owl-carousel reviews-carousel">

                            <figure class="reviews-thumb d-flex flex-wrap align-items-center rounded">
                                <div class="reviews-stars">
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star"></i>
                                </div>

                                <p class="text-primary d-block mt-2 mb-0 w-100"><strong>Best Health Care</strong></p>

                                <p class="reviews-text w-100">Phasellus ligula ante, tempus ac imperdiet ut, mattis ac nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

                                <img src="images/reviews/beautiful-woman-face-portrait-brown-background.jpeg" class="img-fluid reviews-image" alt="">

                                <figcaption class="ms-4">
                                    <strong>Marie</strong>

                                    <span class="text-muted">Patient</span>
                                </figcaption>
                            </figure>

                            <figure class="reviews-thumb d-flex flex-wrap align-items-center rounded">
                                <div class="reviews-stars">
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star"></i>
                                </div>

                                <p class="text-primary d-block mt-2 mb-0 w-100"><strong>Doctor cares everyone!</strong></p>

                                <p class="reviews-text w-100">Donec in elementum orci, nec posuere ligula. Quisque vulputate diam et ullamcorper ullamcorper. Pellentesque vestibulum neque at leo fermentum mattis.</p>

                                <img src="images/reviews/senior-man-wearing-white-face-mask-covid-19-campaign-with-design-space.jpeg" class="img-fluid reviews-image" alt="">

                                <figcaption class="ms-4">
                                    <strong>Ben Walker</strong>

                                    <span class="text-muted">Recovered</span>
                                </figcaption>
                            </figure>

                            <figure class="reviews-thumb d-flex flex-wrap align-items-center rounded">
                                <div class="reviews-stars">
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star-fill"></i>
                                </div>

                                <p class="text-primary d-block mt-2 mb-0 w-100"><strong>Great services!</strong></p>

                                <p class="reviews-text w-100">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec sit amet velit vitae purus aliquam efficitur.</p>

                                <img src="images/reviews/portrait-british-woman.jpeg" class="img-fluid reviews-image" alt="">

                                <figcaption class="ms-4">
                                    <strong>Laura Zono</strong>

                                    <span class="text-muted">New Patient</span>
                                </figcaption>
                            </figure>

                            <figure class="reviews-thumb d-flex flex-wrap align-items-center rounded">
                                <div class="reviews-stars">
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star-fill"></i>
                                    <i class="bi-star"></i>
                                    <i class="bi-star"></i>
                                </div>

                                <p class="text-primary d-block mt-2 mb-0 w-100"><strong>Best Advices</strong></p>

                                <p class="reviews-text w-100">Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla.</p>

                                <img src="images/reviews/woman-wearing-mask-face-closeup-covid-19-green-background.jpeg" class="img-fluid reviews-image" alt="">

                                <figcaption class="ms-4">
                                    <strong>Rosey</strong>

                                    <span class="text-muted">Almost Recovered</span>
                                </figcaption>
                            </figure>
                           
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section class="section-padding" id="booking">
            <div class="container">
                <div class="row">
                
                    <div class="col-lg-8 col-12 mx-auto">
                        <div class="booking-form">
                            
                            <h2 class="text-center mb-lg-3 mb-2">Book an appointment</h2>
                        
                            <form role="form" @submit.prevent="submitBooking">
                                <div class="row">
                                    
                                <div class="col-lg-6 col-12">
                                    <input type="text" v-model="firstname" id="firstname" class="form-control" placeholder="First name" @input="validateName" required>
                                </div>

                                <div class="col-lg-6 col-12">
                                    <input type="text" v-model="lastname" id="lastname" class="form-control" placeholder="Last name" @input="validateName" required>
                                </div>

                                    <div class="col-lg-6 col-12">
                                        <input type="email" v-model="email" id="email" pattern="[^ @]*@[^ @]*" class="form-control" placeholder="Email address" required>
                                    </div>

                                <div class="col-lg-6 col-12">
                                    <input type="tel" v-model="phone" id="phone" class="form-control" placeholder="+63 123-456-7890" maxlength="14" @input="formatPhoneNumber" required>
                                </div>

                                <!-- Date picker -->
                        <div class="col-lg-6 col-12">
                        <input type="date" v-model="selectedDate" id="date" class="form-control" :style="{ borderBottom: isDateBooked(selectedDate) ? '2px solid red' : '' }">    
                        </div>
                                
                                <!-- Available time slots -->
                                <div class="col-lg-6 col-12">
                                  <h3>Available Time Slots:</h3>
                                  <ul v-if="availableTimeSlots.length > 0">
                                    <li v-for="timeSlot in availableTimeSlots" :key="timeSlot">{{ timeSlot }}</li>
                                  </ul>
                                  <p v-else>No available time slots for selected date.</p>
                                </div>

                                    <div class="col-lg-6 col-12">
                                        <select v-model="selectedPurpose" class="form-control" required>
                                          <option value="" disabled selected>Select purpose of visit</option>
                                          <option value="General Eye Check">General Eye Check</option>
                                          <option value="Cataract">Cataract</option>
                                          <option value="Laser Vision Correction">Laser Vision Correction</option>
                                          <option value="Follow Up Checkup">Follow Up Checkup</option>
                                          <!-- Add more options as needed -->
                                        </select>
                                    </div>

                                    <div class="col-lg-6 col-12">
                                        <select v-model="selectedDoctor" class="form-control" required>
                                          <option value="" disabled selected>Select Doctor</option>
                                          <option value="Dra. Ashley Shane Cabudsan">Dra. Ashley Shane Cabudsan</option>
                                          <option value="Dra. Rachel Jane Cabudsan">Dra. Rachel Jane Cabudsan</option>
                                          <!-- Add more options as needed -->
                                        </select>
                                    </div>

                                    <div class="col-lg-6 col-12">
                                        <select v-model="selectedLocation" class="form-control" required>
                                          <option value="" disabled selected>Select Location</option>
                                          <option value="Sitio 2, Pinagsabangan, Curva, Naujan, Oriental Mindoro">Sitio 2, Pinagsabangan, Curva, Naujan, Oriental Mindoro</option>
                                          <option value="Poblacion, Mansalay, Oriental Mindoro">Poblacion, Mansalay, Oriental Mindoro</option>
                                          <option value="Xentro Mall, Lumang Bayan, Calapan City, Oriental Mindoro">Xentro Mall, Lumang Bayan, Calapan City, Oriental Mindoro</option>
                                          <!-- Add more options as needed -->
                                        </select>
                                    </div>


                                    <div class="col-12">
                                        <textarea class="form-control" rows="5" id="message" v-model="message" placeholder="Additional Message"></textarea>
                                    </div>

                                    <div class="col-lg-3 col-md-4 col-6 mx-auto">
                                        <button type="submit" class="form-control" id="submit-button">Book Now</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </section>

    </main>

    <footer class="site-footer section-padding" id="contact">
        <section>
            <div class="container">
                <div class="row">
    
                    <div class="col-lg-5 me-auto col-12">
                        <h5 class="mb-lg-4 mb-3">Opening Hours</h5>
    
                        <ul class="list-group list-group-flush">

                            <li class="list-group-item d-flex">
                                Monday - Saturday
                                <span>8:00 AM - 5:00 PM</span>
                            </li>

                            <li class="list-group-item d-flex">
                                Sunday : Closed
                            </li>
    
                        </ul>
                    </div>
    
                    <div class="col-lg-2 col-md-6 col-12 my-4 my-lg-0">
                        <h5 class="mb-lg-4 mb-3">Our Clinic</h5>
    
                        <p><a href="mailto:hello@company.co">hello@company.co</a></p>
    
                        <p>123 Digital Art Street, San Diego, CA 92123</p>
                    </div>
    
                    <div class="col-lg-3 col-md-6 col-12 ms-auto">
                        <h5 class="mb-lg-4 mb-2">Socials</h5>
    
                        <ul class="social-icon">
                            <li><a href="#" class="social-icon-link bi-facebook"></a></li>
    
                            <li><a href="#" class="social-icon-link bi-twitter"></a></li>
    
                            <li><a href="#" class="social-icon-link bi-instagram"></a></li>
    
                            <li><a href="#" class="social-icon-link bi-youtube"></a></li>
                        </ul>
    
                        <div>
                            <p class="copyright-text">Copyright © Medic Care 2021 <br><br>Design: <a href="https://templatemo.com" target="_parent">TemplateMo</a></p>
                            <p class="copyright-text">Distributed By: <a href="https://themewagon.com" target="_parent">Themewagon</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </footer>
    
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        selectedPurpose: '',
        selectedDoctor: '',
        selectedLocation: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        date: '',
        message: '',
        //
        PatientID: null,
        //
        selectedDate: '', // Selected date by the user
      bookedDates: [], // Array to hold already booked dates
      availableTimeSlots: [], // Array to hold available time slots
        //
        drawer: false,
      products: [
        { id: 1, name: 'Aviator Sunglasses', type: 'frames', price: 50, image: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/447020/item/goods_09_447020.jpg?width=750' },
        { id: 2, name: 'Wayfarer Sunglasses', type: 'frames', price: 80, image: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/463724/item/goods_09_463724.jpg?width=750' },
        { id: 3, name: 'Round Sunglasses', type: 'frames', price: 120, image: 'https://via.placeholder.com/300x400' },
        { id: 4, name: 'Polarized Lens', type: 'glasses', price: 30, image: 'https://via.placeholder.com/300x400' },
        { id: 5, name: 'Transition Lens', type: 'glasses', price: 40, image: 'https://via.placeholder.com/300x400' },
        { id: 6, name: 'Blue Light Filter Lens', type: 'glasses', price: 20, image: 'https://via.placeholder.com/300x400' },
        { id: 7, name: 'Eyewear Case', type: 'accessories', price: 10, image: 'https://via.placeholder.com/300x400' },
        { id: 8, name: 'Cleaning Cloth', type: 'accessories', price: 5, image: 'https://via.placeholder.com/300x400' },
      ],
      cart: [],
      frameInCart: false,
      showCartModal: false,
      };
  },

  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.product.price, 0);
    }
  },

  created(){
    this.PatientID = sessionStorage.getItem('PatientID');
    this.fetchBookedDates();
  },

  watch: {
    selectedDate: function(newDate) {
      this.updateAvailableTimeSlots(newDate);
    }
  },

  methods: {
    async submitBooking() {
        try {
          const response = await axios.post(`patient/insertBooking/${this.PatientID}`, {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            phone: this.phone,
            pref_date: this.date,
            pref_doctor: this.selectedDoctor,
            purpose: this.selectedPurpose,
            pref_location: this.selectedLocation,
            add_message: this.message,
          });
  
          console.log(response.data);
          // Optionally, you can handle the response here, e.g., show a success message
          window.location.reload();
        } catch (error) {
          console.error(error);
          // Optionally, you can handle errors here, e.g., show an error message
        }
      },

    
    //ecom
    addToCart(product) {
        if (product.type === 'frames') {
          this.cart.push({ product });
          this.frameInCart = true;
        } else {
          if (!this.frameInCart) {
            alert('Please add frames first.');
            return;
          }
          this.cart.push({ product });
        }
      },
      removeFromCart(product) {
        const index = this.cart.findIndex(item => item.product.id === product.id);
        if (index !== -1) {
          if (this.cart[index].product.type === 'frames') {
            this.frameInCart = false;
          }
          this.cart.splice(index, 1);
        }
      },
      toggleCartModal() {
        this.showCartModal = !this.showCartModal;
      },
      formatPrice(price) {
        return '$' + price.toFixed(2);
      },

      //

      formatPhoneNumber() {
        // Remove any non-digit characters from the input
        let cleaned = this.phone.replace(/\D/g, '');
        
        // Check if the input length is 11 digits
        if (cleaned.length === 11) {
            // Replace the leading '0' with '+63' and format the number
            cleaned = '+63 ' + cleaned.substring(1, 4) + '-' + cleaned.substring(4, 7) + '-' + cleaned.substring(7);
        }

        // Update the phone number value with the formatted number
        this.phone = cleaned;
    },

    validateName() {
        // Remove any non-letter characters from the input
        this.firstname = this.firstname.replace(/[^a-zA-Z]/g, '');
        this.lastname = this.lastname.replace(/[^a-zA-Z]/g, '');
    },
    
    //
    async fetchBookedDates() {
        try {
          const response = await axios.get('booked-dates');
          this.bookedDates = response.data;
        } catch (error) {
          console.error('Error fetching booked dates:', error);
        }
      },

      //
      // Method to check if a date is booked
    isDateBooked(date) {
      return this.bookedDates.includes(date);
    },

      // Method to fetch available time slots from backend
      async updateAvailableTimeSlots(selectedDate) {
        try {
          const response = await axios.get('available-time-slots', { params: { date: selectedDate } });
          this.availableTimeSlots = response.data;
        } catch (error) {
          console.error('Error fetching available time slots:', error);
        }
      }


  }
};
</script>

<style>

.navbar-icons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 200px;
    bottom: 0;
    right: 50px;
}

.navbar-icons a {
    font-size: 24px;
    color: #333;
    margin: 10px 0;
    background-color: white; /* Add white background */
    width: 40px; /* Set width and height to create a circle */
    height: 40px;
    border-radius: 50%; /* Make it circular */
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none; /* Remove underline */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add shadow */
}



/* Adjust the size and color of icons as needed */

.cart-count {
    position: absolute;
    top: -2px;
    right: -4px;
    background-color: red;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
}


</style>        