### Program Strusture

├── root 
├── main.ts
    ├── Weather API (Service)
    ├── First Tab (Table)
    ├── Second-Tab (Graph)
    └── Third-Tab (Calculator)

### Explanation

- The Weather API service is used to fetch the weather data from the open-meteo.com API.
- The First Tab is a table that displays the weather data fetched from the API (7 days back and 7 days in advance).
- The Second Tab is a graph that displays the temperature data from the First Tab.
- The Third Tab is a calculator that calculates the Head Index (both in C and F) and displays last 5 results fetched from localStorage.

### Additional Features
- two-tone theme (grey and pink)
- interactive graph
- tab animations
- calculator with history (localStorage)

### Start the program
- Run `npm install` to install the dependencies.
- Run `ng server --open` to start the program.

### External Libraries Used
- ng-apexcharts (Second Tab)