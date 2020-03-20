import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

// TODO update chart when categories get updated
export default {
  extends: Doughnut,
  mixins: [reactiveProp],

  props: {
    categories: Object
  },

  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {

          callbacks: {
            label: function(tooltipItem, data) {
              const label = data.labels[tooltipItem.index];
              const percent = data.datasets[0].data[tooltipItem.index].toFixed(2);
              return `${label} ${percent}%`;
            }
          }

        }
      }
    }
  },

  mounted () {
    console.log(mapData(this.categories));
    this.renderChart(mapData(this.categories), this.options)
  }
}

const mapData = (categories) => {
  const labels = [];
  const backgroundColor = [];
  const data = [];

  Object.entries(categories).forEach((entry) => {
    labels.push(entry[0]);
    backgroundColor.push(getRandomHexColor());
    data.push(entry[1].percent);
  });

  return {
    labels,
    datasets: [{
      backgroundColor,
      data
    }]
  }
}

const getRandomHexColor = () => {
  return '#'+Math.random().toString(16).slice(2, 8);
}
