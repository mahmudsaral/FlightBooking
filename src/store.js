import { createStore } from 'vuex';

export default createStore({
  state: {
    flights: [],
    departureFlights: [],
    returnFlights: [], 
  },
  mutations: {
    setDepartureFlights(state, departureFlights) {
        state.departureFlights = departureFlights;
        },
    setReturnFlights(state, returnFlights) {
        state.returnFlights = returnFlights;
        },
  },
  actions: {
    async fetchFlights({ commit }, { selectedDeparture, selectedArrival, departureDate, arrivalDate }) {
      try {
        const response = await fetch('https://65b9f917b4d53c066551bb96.mockapi.io/api/Flights', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();

          var departureFlights = data.filter(flight =>
            flight.Where === selectedDeparture &&
            flight.To === selectedArrival &&
            flight.Departure_date === departureDate    
          );

          var returnFlights = data.filter(flight =>
            flight.Where === selectedArrival &&
            flight.To === selectedDeparture &&
            flight.Departure_date === arrivalDate &&
            flight.Arrival_date === departureDate  
    
          );

          commit('setDepartureFlights', departureFlights);
          commit('setReturnFlights', returnFlights);


          console.log("setDepartureFlights",departureFlights)
          console.log("setReturnFlights",returnFlights)

          return { success: true, message: 'Flights fetched successfully.' };
        } else {
          console.error('Failed to fetch flights:', response.statusText);
          return { success: false, message: 'Failed to fetch flights.' };
        }
      } catch (error) {
        console.error('Error fetching flights:', error);
        return { success: false, message: 'Error fetching flights.' };
      }
    },
  },
});