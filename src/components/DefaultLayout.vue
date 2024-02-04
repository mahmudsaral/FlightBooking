<template>
  <div>
    <loading-animation :loading="loading"></loading-animation>

      <nav class="navbar navbar-expand-lg bg-light px-3 fixed-top">
        <div class="container-fluid">
          <router-link :to="links[0].path"
            ><img src="../assets/logo/sitelogo.png" class="brand"
          /></router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav mx-auto gap-2">
              <li class="nav-item" v-for="(link, i) in links" :key="i">
                <router-link class="nav-link" :to="link.path">{{
                  link.name
                }}</router-link>
              </li>
            </ul>
            <a
              class="search-link"
              data-bs-toggle="offcanvas"
              href="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <i class="bi bi-search"></i>
            </a>
          </div>
        </div>
      </nav>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">
            Search Flight
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <form class="row g-3" novalidate v-show="searchForm">
            <div class="col-md-12">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="singleDirectionCheckbox"
                    v-model="singleDirection"
                  />
                  <label class="form-check-label" for="singleDirectionCheckbox">
                    Single Direction
                  </label>
                </div>
              </div>
              <div class="col-md-6">
                <label for="validationCustom01" class="form-label">Departure Date</label>
                <input type="date" class="form-control" required v-model="departureDate" @change="handleDateChange" />
              </div>

              <div class="col-md-6">
                <label class="form-label">Arrival Date</label>
                <input type="date" class="form-control" required v-model="arrivalDate" :disabled="singleDirection" @change="handleDateChange" />
              </div>

              <div class="col-md-6">
                <label class="form-label">Departure Airport</label>
                <select class="form-select" required v-model="departureAirport" @change="handleDepartureAirportChange">
                  <option selected disabled>Select</option>
                  <option v-for="airport in departureAirports" :key="airport.id" :value="airport.name">{{ airport.name }}</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label">Arrival Airport</label>
                <select class="form-select" required v-model="arrivalAirport" @change="handleArrivalAirportChange">
                  <option selected disabled>Select</option>
                  <option v-for="airport in filteredArrivalAirports" :key="airport.id" :value="airport.name">{{ airport.name }}</option>
                </select>
              </div>
           
            
            <div class="col-12 mt-4 d-grid">
              <button class="btn btn-primary" type="button" @click="redirectToFlightsPage()">
                <i class="bi bi-search me-2"></i>Search
              </button>
            </div>
          </form>

  
        </div>
      </div>
      <router-view></router-view>
  
  
      <div v-if="loading" class="loading-animation">
      Loading...
    </div>
  </div>
</template>

<script>

import { mapActions } from "vuex";

import LoadingAnimation from '../components/LoadingAnimation.vue'

export default {
  name: "DefaultLayout",
  components: {
    LoadingAnimation
  },
  data() {
    return {
      links: [
        {
          name: "Home",
          path: "/",
          loading: true
        },
       
      ],
      loading: false,
      activeNav: "",
      arrivalDate: "",
      departureDate: "",
      searchDepartures: "",
      searchArrival: "",
      departureAirports: [], 
      arrivalAirports: [],   
      filteredArrivalAirports: [], 
      selectedDeparture: "", 
      selectedArrival: "", 
      searchForm: true,
      singleDirection: false,
    
    };
  },
  
  methods: {
   
    ...mapActions(["fetchFlights"]),


    handleDepartureAirportClick() {
      fetch('https://65b9f917b4d53c066551bb96.mockapi.io/api/Countries', {
        method: 'GET',
        headers: {'content-type':'application/json'},
      }).then(res => {
        if (res.ok) {
          return res.json(); 
        }
      }).then(data => {
        this.departureAirport = data

        console.log("Received data:", data);

      })
    },

    handleArrivalAirportClick() {
      fetch('https://65b9f917b4d53c066551bb96.mockapi.io/api/Countries', {
        method: 'GET',
        headers: {'content-type':'application/json'},
      }).then(res => {
        if (res.ok) {
          return res.json(); 
        }
      }).then(data => {
        this.arrivalAirport = data
        console.log("Received data:", data);

      })
    },

    handleDepartureAirportChange() {
      this.selectedDeparture = this.departureAirport;
      this.filteredArrivalAirports = this.arrivalAirports.filter(airport => airport.name !== this.selectedDeparture);
      this.selectedArrival = "";
      this.checkSameCountry();
    },
    
    handleArrivalAirportChange() {
      this.selectedArrival = this.arrivalAirport;
      this.checkSameCountry();
    },
    
    checkSameCountry() {
      if (this.selectedDeparture === this.selectedArrival) {
        alert("Departure and Arrival countries cannot be the same.");
      }
    },

    handleDateChange() {
      if (this.departureDate === this.arrivalDate) {
        alert("Departure and Arrival dates cannot be the same.");
        this.arrivalDate = "";
      }

      if (this.departureDate && this.arrivalDate && this.departureDate > this.arrivalDate) {
        alert("Departure Date cannot be later than Arrival Date.");
        this.arrivalDate = "";
      }
    },
  
    fetchAirports() {
      fetch('https://65b9f917b4d53c066551bb96.mockapi.io/api/Countries')
        .then(response => response.json())
        .then(data => {
          this.departureAirports = data;
        });

      fetch('https://65b9f917b4d53c066551bb96.mockapi.io/api/Countries')
        .then(response => response.json())
        .then(data => {
          this.arrivalAirports = data;
          this.filteredArrivalAirports = data; 
        });
    },

    async redirectToFlightsPage() {
      this.loading = false;

      if (this.departureDate == "") {
        alert("please select flight date");
        return;
      }

      if (this.departureAirport == "") {
        alert("please select Departure Airport");
        return;
      }

      if (this.arrivalAirport == "") {
        alert("please select Arrival Airport");
        return;
      }


      this.$store.dispatch('fetchFlights', {
        
      selectedDeparture: this.selectedDeparture,
      selectedArrival: this.selectedArrival,
      departureDate: this.departureDate,
      arrivalDate: this.arrivalDate,
      }).then(result => {
        if (result.success) {
          
          this.$router.push({ name: "flightsPage" });
          this.loading = false;

        } else {
          console.error(result.message);
        }
      });
    },
  },


mounted() {
    this.fetchAirports();
    
  },

};
</script>

<style lang="scss" scoped>
.navbar {
  background: transparent !important;
  padding-block: 0.5rem;

  .brand {
    width: 4rem;
  }
  .navbar-nav {
    .nav-link {
      text-transform: uppercase;
      font-family: "Fira Sans", sans-serif;
      font-weight: 500;
      font-size: 1rem;
      color: white;
      letter-spacing: 1px;
    }
    .nav-link:hover {
      color: #ff00fb;
    }
  }
}

.active,
.router-link-exact-active {
  color: #ff00fb !important;
}
.search-link {
  color: white;
}
.search-link:hover {
  color: #ff00fb;
}

.offcanvas {
  h5 {
    font-family: "Fira Sans", sans-serif;
    text-transform: uppercase;
  }
  .offcanvas-body {
    form {
      label {
        font-family: "Fira Sans", sans-serif;
        font-weight: 500;
      }
      input,
      select {
        font-family: "Fira Sans", sans-serif;
        border: 1px solid #8d0ad485;
      }

      button {
        background: #8e0ad4;
        font-family: "Fira Sans", sans-serif;
        border-radius: 25px;
        border: none;
        padding: 10px 30px;
        color: white;
        transition: background 800ms linear;
      }
      button:hover {
        background: #c319c9;
      }
    }
  }

  .searchResult {
    button {
      background: #8e0ad4;
      font-family: "Fira Sans", sans-serif;
      border-radius: 25px;
      border: none;
      padding: 10px 30px;
      color: white;
      transition: background 800ms linear;
    }
    button:hover {
      background: #c319c9;
    }

    .card {
      width: auto;
      height: 15rem;
      margin-bottom: 22px;
      background: rgba(105, 0, 105, 0.956);
      border: none;
      transition: background 500ms linear;

      .card-body {
        .card-title {
          color: white;
          font-family: "Fira Sans", sans-serif;
          font-size: 18px;
        }
        .card-text {
          display: grid;
          grid-template-columns: 1fr;
          font-family: "Fira Sans", sans-serif;
          margin-top: 20px;

          h6 {
            color: rgba(255, 255, 255, 0.719);
            font-size: 15px;
            span {
              color: rgb(255, 0, 179);
            }
          }

          .geoloc {
            display: grid;
            margin-top: 10px;

            span {
              color: rgba(255, 255, 255, 0.719);
              font-weight: 700;
            }
          }
        }
      }
    }
    .card:hover {
        cursor: pointer;
        background: rgba(42, 0, 42, 0.849);
      }
  }
}

@media (max-width: 768px) {
  .navbar {
    padding-inline: 0 !important;
    padding-block: 0.5rem;
  }
  .brand {
    width: 2rem;
    height: auto;
  }
}

.mobileBlock {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-image: url("../../public/img/normal-bg.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.mobileBlock h2 {
  font-size: 62px;
  text-align: center;
  color: white;
}
.mobileBlock i {
  font-size: 62px;
  text-align: center;
  color: white;
}

footer {
  text-transform: uppercase;
  font-family: "Fira Sans", sans-serif;
  background: rgba(117, 8, 131, 0.76) !important;

  div {
    span {
      color: white;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.5px;
    }
  }
}
</style>
