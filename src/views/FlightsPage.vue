<template>
  <div id="flights">
    <div class="container flights">
      <div class="row">
        <div class="col-md-6">
          <div class="sorting-buttons">
            <button @click="sortBy('price')">Price</button>
            <button @click="sortBy('departureTime')">Departure Time</button>
            <button @click="sortBy('arrivalTime')">Arrival Time</button>
            <button @click="sortBy('distance')">Distance</button>
          </div>

          <div class="card">
            <div class="card-header">
              <h5>Departure Flights</h5>
            </div>
            <div class="card-body">
              <div v-for="(flight, i) in sortedDepartureFlights" :key="i">
                <div class="card mb-4">
                  <div class="card-body ">
                    <div class="card-title">Date: {{ flight.Departure_date }}</div>
                    <div class="card-text">
                      <h6><span>Where:</span> {{ flight.Where }}</h6>
                      <h6><span>To:</span> {{ flight.To }}</h6>
                      <h6><span>Flight Date:</span> {{ flight.Departure_date }}</h6>
                      <h6><span>Duration:</span> {{ flight.Duration }}</h6>
                      <h6><span>Distance:</span> {{ flight.Distance }}</h6>
                      <h6><span>Price:</span> {{ flight.Price }}</h6>
                      <h6><span>Departure Time:</span> {{ flight.Departure_time }}</h6>
                      <h6><span>Arrival Time:</span> {{ flight.Arrival_time }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="sorting-buttons">
            <button @click="sortBy('price')">Price</button>
            <button @click="sortBy('departureTime')">Departure Time</button>
            <button @click="sortBy('arrivalTime')">Arrival Time</button>
            <button @click="sortBy('distance')">Distance</button>
          </div>

          <div class="card">
            <div class="card-header">
              <h5>Return Flights</h5>
            </div>
            <div class="card-body">
              <div v-for="(flight, i) in sortedReturnFlights" :key="i">
                <div class="card mb-4">
                  <div class="card-body ">
                    <div class="card-title">Date: {{ flight.Departure_date }}</div>
                    <div class="card-text">
                      <h6><span>Where:</span> {{ flight.Where }}</h6>
                      <h6><span>To:</span> {{ flight.To }}</h6>
                      <h6><span>Flight Date:</span> {{ flight.Departure_date }}</h6>
                      <h6><span>Duration:</span> {{ flight.Duration }}</h6>
                      <h6><span>Distance:</span> {{ flight.Distance }}</h6>
                      <h6><span>Price:</span> {{ flight.Price }}</h6>
                      <h6><span>Departure Time:</span> {{ flight.Departure_time }}</h6>
                      <h6><span>Arrival Time:</span> {{ flight.Arrival_time }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "flightsPlanes",
  data() {
    return { 

      myParamValue: "",
      arrivalDate: "",
      departureDate: "",
      arrivalCountry: "",
      departureCountry: "",
      flights: "",
      departureFlights: "",
      returnFlights: "",
      sortByKey: '', // Sıralama anahtarı
      sortDirection: 'asc', // Sıralama yönü (asc veya desc)


    };
  },
  computed: {
    sortedDepartureFlights() {
      if (this.sortByKey) {
        return this.sortDepartureFlights(this.departureFlights);
      } else {
        return this.departureFlights;
      }
    },

    sortedReturnFlights() {
      if (this.sortByKey) {
        return this.sortReturnFlights(this.returnFlights);
      } else {
        return this.returnFlights;
      }
    },
  },

  methods: {
    sortDepartureFlights(departureFlights) {
      return departureFlights.sort((a, b) => {
        // Sıralama yönüne göre karşılaştırma yap
        const multiplier = this.sortDirection === 'asc' ? 1 : -1;

        // Sıralama anahtarı üzerinden karşılaştırma yap
        if (this.sortByKey === 'departureTime') {
          return multiplier * (a.Departure_time.localeCompare(b.Departure_time));
        } else if (this.sortByKey === 'arrivalTime') {
          return multiplier * (a.Arrival_time.localeCompare(b.Arrival_time));
        } else if (this.sortByKey === 'duration') {
          return multiplier * (a.Duration.localeCompare(b.Duration));
        } else if (this.sortByKey === 'price') {
          return multiplier * (parseFloat(a.Price) - parseFloat(b.Price));
        } else if (this.sortByKey === 'distance') {
          return multiplier * (parseFloat(a.Distance) - parseFloat(b.Distance));
        }

        // Sıralama anahtarı tanımlı değilse sıralama yapma
        return 0;
      });
    },

    sortReturnFlights(returnFlights) {
      return returnFlights.sort((a, b) => {
        const multiplier = this.sortDirection === 'asc' ? 1 : -1;

        if (this.sortByKey === 'departureTime') {
          return multiplier * (a.Departure_time.localeCompare(b.Departure_time));
        } else if (this.sortByKey === 'arrivalTime') {
          return multiplier * (a.Arrival_time.localeCompare(b.Arrival_time));
        } else if (this.sortByKey === 'duration') {
          return multiplier * (a.Duration.localeCompare(b.Duration));
        } else if (this.sortByKey === 'price') {
          return multiplier * (parseFloat(a.Price) - parseFloat(b.Price));
        } else if (this.sortByKey === 'distance') {
          return multiplier * (parseFloat(a.Distance) - parseFloat(b.Distance));
        }

        // Sıralama anahtarı tanımlı değilse sıralama yapma
        return 0;
      });
    },


    // Sıralama anahtarını ayarlayan fonksiyon
    sortBy(key) {
      // Eğer zaten aynı anahtara tıklanıyorsa sıralama yönünü değiştir
      this.sortDirection = key === this.sortByKey ? (this.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
      this.sortByKey = key;
    },
    // Diğer metodlar (örneğin, viewFlight) buraya eklenebilir
  },

  mounted() {

  console.log("this.$store.state.",this.$store.state)
  this.flights = this.$store.state.flights;
  this.departureFlights = this.$store.state.departureFlights;
  this.returnFlights = this.$store.state.returnFlights;

  console.log("Flights:", this.flights);

}
};
</script>
<style lang="scss">

body {
  margin: 0;
  background-color: #49026E !important;
  min-height: 100vh !important;
}

.container {
  .row {
    padding-top: 5rem;

    .airportcards {
      display: flex;
      flex-wrap: wrap;

      .card {
        width: 13rem;
        height: 15rem;
        margin-bottom: 22px;
        background: rgba(54, 0, 54, 0.486);
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
        background: rgba(34, 0, 34, 0.74);
      }
    }
  }
}

.flights {
  background-image: url("../../public/img/normal-bg.png") !important;
  background-position: center center !important;
  background-size: cover !important;
  min-height: 100vh !important;
  height: 100%;
}

.slider-btn {
  background: rgba(53, 0, 58, 0.534);
  height: 30px;
  width: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  transition: background 400ms linear;

  position: absolute;

  i {
    color: white;
  }
}

.slider-btn:hover {
  background: rgba(0, 0, 0, 0.253);
  cursor: pointer;
}

.perv {
  top: 50%;
  left: 3%;
}

.next {
  top: 50%;
  right: 3%;
}

.pageNo {
  bottom: 2%;
  right: 2%;
  position: absolute;

  h6 {
    color: white;
    font-family: "Fira Sans", sans-serif;
  }
}

</style>
