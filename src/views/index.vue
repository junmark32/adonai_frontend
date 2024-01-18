<template>
    <div>
      <Index />
      <!-- Your other template content goes here -->
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  // Components
  import Index from '@/components/index_comp.vue';
  
  export default defineComponent({
    name: 'index',
  
    components: {
      Index,
    },
  
    mounted() {
      this.loadScripts();
    },
  
    methods: {
      loadScripts() {
        const scriptUrls = [
          '/assets/js/jquery.min.js',
          '/assets/js/bootstrap.bundle.min.js',
          '/assets/js/owl.carousel.min.js',
          '/assets/js/scrollspy.min.js',
          '/assets/js/custom.js',
        ];
  
        const head = document.head;
  
        const loadScript = (url) => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            head.appendChild(script);
          });
        };
  
        // Load scripts sequentially
        scriptUrls.reduce((chain, scriptUrl) => {
          return chain.then(() => loadScript(scriptUrl));
        }, Promise.resolve())
          .then(() => {
            // All scripts loaded successfully
            this.initializeOwlCarousel();
          })
          .catch((error) => {
            console.error('Error loading scripts:', error);
          });
      },
  
      initializeOwlCarousel() {
        // Initialize Owl Carousel here
        $(document).ready(function () {
          if ($.fn.owlCarousel) {
            // Ensure owlCarousel is available
            $('.owl-carousel').owlCarousel({
              // Owl Carousel configuration options
            });
          } else {
            console.error('Owl Carousel not loaded!');
          }
        });
      },
    },
  });
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com');
  @import url('https://fonts.gstatic.com');
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
  @import '../../public/assets/css/bootstrap.min.css';
  @import '../../public/assets/css/bootstrap-icons.css';
  @import '../../public/assets/css/owl.carousel.min.css';
  @import '../../public/assets/css/owl.theme.default.min.css';
  @import '../../public/assets/css/templatemo-medic-care.css';
  </style>
  