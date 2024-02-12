<template>
  <v-app>
    <v-container>
      <!-- Navbar -->
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Eyewear Emporium</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="toggleCartModal">
          <v-icon>mdi-cart</v-icon>
          <span class="badge" v-if="cart.length > 0">{{ cart.length }}</span>
        </v-btn>
      </v-app-bar>

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
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      products: [
        { id: 1, name: 'Aviator Sunglasses', type: 'frames', price: 50, image: 'https://via.placeholder.com/300x400' },
        { id: 2, name: 'Wayfarer Sunglasses', type: 'frames', price: 80, image: 'https://via.placeholder.com/300x400' },
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
  methods: {
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
    }
  },
};
</script>

<style scoped>
.product-card {
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.product-title {
  font-size: 20px;
  font-weight: bold;
}

.product-price {
  color: #666;
}

.product-actions {
  text-align: center;
}

.add-to-cart-btn {
  background-color: #007bff;
  color: white;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 14px;
}

.add-to-cart-btn:hover {
  background-color: #0056b3;
}

.cart-title {
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 16px;
}

.total-text {
  font-size: 18px;
  font-weight: bold;
}
</style>
