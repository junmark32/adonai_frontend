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
  
  <style>
/* Eyewear Timeline Styles */
#eyewear {
    background-color: #f8f9fa;
    padding: 60px 0;
}

.timeline {
    position: relative;
    margin-top: 30px;
}

.timeline-content {
    padding: 20px;
    border-radius: 10px;
}

.timeline-icon {
    font-size: 1.5rem;
    color: #007bff;
}

.timeline-date {
    text-align: right;
}

/* Eyewear Image Styles */
.timeline-content img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 15px;
}

/* Eyewear Entry Heading Styles */
.timeline-content h3 {
    color: #343a40;
}

/* Eyewear Entry Text Styles */
.timeline-content p {
    color: #6c757d;
}

/* Eyewear Entry Date Styles */
.timeline-date time {
    font-size: 14px;
    color: #868e96;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .timeline-date {
        text-align: left;
    }

    .timeline-content img {
        margin-bottom: 0;
    }
}


</style>