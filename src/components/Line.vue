<script>
import { Bar } from "vue-chartjs";
import format from "date-fns/format";

export default {
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        // labels: this.$store.getters.closeDateDataset,
        datasets: [
          {
            label: "Stock Price",
            borderColor: "#F3487B",
            backgroundColor: "white",
            fill: false,
            data: this.$store.getters.combinedStockDataSet,
            type: "line",
            yAxisID: "A"
          },
          {
            label: "Tweets",
            type: "line",
            backgroundColor: "white",
            borderColor: "lightgrey",
            borderWidth: "1",
            fill: true,
            data: this.$store.state.tweets,
            yAxisID: "B"
          }
        ]
      },
      { legend: {
          position: 'right'
      },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              },
              type: "time",
              distribution: 'series',
              time: {
                unit: 'day'
              }
            }
          ],
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "left",
              gridLines: {
                display: false
              }
            },
            {
              id: "B",
              type: "linear",
              position: "right",
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    );
  }
};
</script>

