<template>
  <div class="container mt-5">
    <!-- Dart Tool Panel -->
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="panel">
          <h2 class="text-center mb-4">Dart Tool</h2>
          <!-- Dropdowns inside the panel -->
          <div class="row">
            <div class="col">
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ dropdown1 }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li v-for="option in dropdown1Options" :key="option">
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown1', option)">{{ option }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col">
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ dropdown2 }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                  <li v-for="option in dropdown2Options" :key="option">
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown2', option)">{{ option }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col">
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton3"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ dropdown3 }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                  <li v-for="option in dropdown3Options" :key="option">
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown3', option)">{{ option }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-auto">
              <button class="btn btn-outline-success mt-1" id="viewBtn" @click="showChart" :disabled="!allDropdownsSelected">
                View
              </button>
            </div>
          </div>
          <!-- End of dropdowns -->

          <!-- Priority details and Pie chart side by side -->
          <div class="row mt-3">
            <div class="col-md-6">
              <div class="position-relative" id="chart-container">
                <canvas id="myChart" width="300" height="300"></canvas>
              </div>
              <div id="trendsBtnContainer" class="mt-3 text-center" :class="{ active: showTrendsButton }">
                <button id="trendsBtn" class="btn btn-outline-primary" @click="showTrends">TRENDS</button>
              </div>
            </div>
            <div class="col-md-6">
              <div class="alert alert-info" id="priorityDetails" v-if="priorityDetails.visible" @click="showModal" :style="{ backgroundColor: priorityDetails.color }">
                <strong>{{ priorityDetails.label }}:</strong> {{ priorityDetails.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Dart Tool Panel -->

    <!-- Line Chart Panel -->
    <div id="lineChartPanel" class="container mt-5" v-if="showLineChartPanel">
      <div class="panel">
        <button class="btn btn-primary" id="lineChartPanelButton" @click="goBack">Back</button>
        <h2 class="text-center mb-4">Priority Trends</h2>
        <!-- Line charts for each priority -->
        <div class="row">
          <div class="col-md-4" v-for="(chart, index) in lineCharts" :key="index">
            <canvas :id="'priorityChart' + (index + 1)" width="300" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Line Chart Panel -->

    <!-- Modal -->
    <div class="modal fade" id="priorityModal" tabindex="-1" aria-labelledby="priorityModalLabel" aria-hidden="true" ref="priorityModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="priorityModalLabel">Priority Details</h5>
            <button type="button" class="btn-close" data



pls share whole code
ChatGPT
Sure, here's the complete Vue 3 code with the corrections:

vue
Copy code
<template>
  <div class="container mt-5">
    <!-- Dart Tool Panel -->
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="panel">
          <h2 class="text-center mb-4">Dart Tool</h2>
          <!-- Dropdowns inside the panel -->
          <div class="row">
            <div class="col">
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ dropdown1 }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li v-for="option in dropdown1Options" :key="option">
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown1', option)">{{ option }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col">
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ dropdown2 }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                  <li v-for="option in dropdown2Options" :key="option">
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown2', option)">{{ option }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col">
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton3"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ dropdown3 }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                  <li v-for="option in dropdown3Options" :key="option">
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown3', option)">{{ option }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-auto">
              <button class="btn btn-outline-success mt-1" id="viewBtn" @click="showChart" :disabled="!allDropdownsSelected">
                View
              </button>
            </div>
          </div>
          <!-- End of dropdowns -->

          <!-- Priority details and Pie chart side by side -->
          <div class="row mt-3">
            <div class="col-md-6">
              <div class="position-relative" id="chart-container">
                <canvas id="myChart" width="300" height="300"></canvas>
              </div>
              <div id="trendsBtnContainer" class="mt-3 text-center" :class="{ active: showTrendsButton }">
                <button id="trendsBtn" class="btn btn-outline-primary" @click="showTrends">TRENDS</button>
              </div>
            </div>
            <div class="col-md-6">
              <div class="alert alert-info" id="priorityDetails" v-if="priorityDetails.visible" @click="showModal" :style="{ backgroundColor: priorityDetails.color }">
                <strong>{{ priorityDetails.label }}:</strong> {{ priorityDetails.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Dart Tool Panel -->

    <!-- Line Chart Panel -->
    <div id="lineChartPanel" class="container mt-5" v-if="showLineChartPanel">
      <div class="panel">
        <button class="btn btn-primary" id="lineChartPanelButton" @click="goBack">Back</button>
        <h2 class="text-center mb-4">Priority Trends</h2>
        <!-- Line charts for each priority -->
        <div class="row">
          <div class="col-md-4" v-for="(chart, index) in lineCharts" :key="index">
            <canvas :id="'priorityChart' + (index + 1)" width="300" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Line Chart Panel -->

    <!-- Modal -->
    <div class="modal fade" id="priorityModal" tabindex="-1" aria-labelledby="priorityModalLabel" aria-hidden="true" ref="priorityModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="priorityModalLabel">Priority Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Priority</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in modalContent" :key="index">
                  <td>{{ item.priority }}</td>
                  <td>{{ item.source }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Modal -->
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import * as bootstrap from 'bootstrap'; // Import Bootstrap JS library
import { Chart } from 'chart.js'; // Import Chart.js library

export default {
  name: 'App',
  setup() {
    const dropdown1 = ref('Select AIT');
    const dropdown2 = ref('Select SPK');
    const dropdown3 = ref('Select Component');
    const dropdown1Options = ['Option 1', 'Option 2', 'Option 3'];
    const dropdown2Options = ['Option 1', 'Option 2', 'Option 3'];
    const dropdown3Options = ['Option 1', 'Option 2', 'Option 3'];
    const allDropdownsSelected = ref(false);
    const showTrendsButton = ref(false);
    const showLineChartPanel = ref(false);
    const priorityDetails = reactive({
      label: '',
      value: '',
      color: '',
      visible: false,
    });
    const modalContent = reactive([
      { priority: 'Priority 1', source: 'Add some random text' },
      { priority: 'Priority 2', source: 'Add another random text' },
    ]);
   const lineCharts = ['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4', 'Priority 5'];

    function updateDropdown(dropdown, option) {
      if (dropdown === 'dropdown1') {
        dropdown1.value = option;
      } else if (dropdown === 'dropdown2') {
        dropdown2.value = option;
      } else if (dropdown === 'dropdown3') {
        dropdown3.value = option;
      }
      validateDropdowns();
    }

    function validateDropdowns() {
      if (dropdown1.value !== 'Select AIT' && dropdown2.value !== 'Select SPK' && dropdown3.value !== 'Select Component') {
        allDropdownsSelected.value = true;
      } else {
        allDropdownsSelected.value = false;
      }
    }

    function showChart() {
      // Dummy data for pie chart
      const data = {
        labels: ['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4', 'Priority 5'],
        datasets: [{
          label: 'Priority Distribution',
          data: [30, 20, 10, 25, 15],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      };

      // Chart configuration
      const config = {
        type: 'pie',
        data: data,
        options: {
          plugins: {
            legend: {
              display: false // Hide legends
            }
          },
          onClick: function (event, elements) {
            if (elements.length > 0) {
              const clickedElement = elements[0];
              const label = data.labels[clickedElement.index];
              const value = data.datasets[0].data[clickedElement.index];
              const color = data.datasets[0].backgroundColor[clickedElement.index];
              priorityDetails.label = label;
              priorityDetails.value = value;
              priorityDetails.color = color;
              priorityDetails.visible = true;
              showModal();
              showTrendsButton.value = true;
            }
          }
        }
      };

      // Create the chart
      var myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
    }

    function showModal() {
      var myModal = new bootstrap.Modal(document.getElementById('priorityModal'), {
        keyboard: false
      });
      myModal.show();
    }

    function showTrends() {
      showLineChartPanel.value = true;
    }

    function goBack() {
      showLineChartPanel.value = false;
    }

    return {
      dropdown1,
      dropdown2,
      dropdown3,
      dropdown1Options,
      dropdown2Options,
      dropdown3Options,
      allDropdownsSelected,
      showTrendsButton,
      showLineChartPanel,
      priorityDetails,
      modalContent,
      lineCharts,
      updateDropdown,
      showChart,
      showModal,
      showTrends,
      goBack
    };
  }
};
</script>
    