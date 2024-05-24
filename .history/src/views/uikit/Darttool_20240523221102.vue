<template>
  <div class="container mt-5">
    <!-- Dart Tool Panel -->
    <div class="row justify-content-center">
      <div class="col-md-12">
         <div class="card">
                <h5>Devlopments Monitoring</h5>
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
                  <li>
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown1', 'Option 1')">Option 1</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown1', 'Option 2')">Option 2</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown1', 'Option 3')">Option 3</a>
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
                  <li>
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown2', 'Option 1')">Option 1</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown2', 'Option 2')">Option 2</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown2', 'Option 3')">Option 3</a>
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
                  <li>
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown3', 'Option 1')">Option 1</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown3', 'Option 2')">Option 2</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" @click="updateDropdown('dropdown3', 'Option 3')">Option 3</a>
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
              <div class="alert alert-info" id="priorityDetails" v-if="priorityDetails.visible" @click="showModal">
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
          <div class="modal-body" id="modalBody">
            <table class="table">
              <thead>
                <tr>
                  <th>Priority</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody id="modalBodyContent">
                <tr v-for="(item, index) in modalContent" :key="index">
                  <td>{{ item.label }}</td>
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
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'ChartExample',
  setup() {
    const dropdown1 = ref('Select AIT');
    const dropdown2 = ref('Select SPK');
    const dropdown3 = ref('Select Component');
    const allDropdownsSelected = ref(false);
    const priorityDetails = reactive({ visible: false, label: '', value: '' });
    const showTrendsButton = ref(false);
    const showLineChartPanel = ref(false);
    const modalContent = ref([]);
    const lineCharts = ref([1, 2, 3, 4, 5]);

    const updateDropdown = (dropdown, value) => {
      if (dropdown === 'dropdown1') dropdown1.value = value;
      if (dropdown === 'dropdown2') dropdown2.value = value;
      if (dropdown === 'dropdown3') dropdown3.value = value;
      validateDropdowns();
    };

    const validateDropdowns = () => {
      allDropdownsSelected.value = dropdown1.value !== 'Select AIT' &&
                                    dropdown2.value !== 'Select SPK' &&
                                    dropdown3.value !== 'Select Component';
    };

    const showChart = () => {
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

      const config = {
        type: 'pie',
        data: data,
        options: {
          onClick: function (event, elements) {
            if (elements.length > 0) {
              const clickedElement = elements[0];
              const label = data.labels[clickedElement.index];
              const value = data.datasets[0].data[clickedElement.index];
              priorityDetails.label = label;
              priorityDetails.value = value;
              priorityDetails.visible = true;
              showTrendsButton.value = true;
            }
          }
        }
      };

      new Chart(document.getElementById('myChart'), config);
    };

    const showTrends = () => {
      showLineChartPanel.value = true;
    };

    const goBack = () => {
      showLineChartPanel.value = false;
    };

    const showModal = () => {
      const modal = new bootstrap.Modal(document.getElementById('priorityModal'));
      modal.show();
    };

    onMounted(() => {
      const exampleModal = document.getElementById('priorityModal');
      exampleModal.addEventListener('show.bs.modal', event => {
        const button = event.relatedTarget;
        const recipient = button.getAttribute('data-bs-whatever');
      });
    });

    return {
      dropdown1,
      dropdown2,
      dropdown3,
      allDropdownsSelected,
      priorityDetails,
      showTrendsButton,
      showLineChartPanel,
      modalContent,
      lineCharts,
      updateDropdown,
      showChart,
      showTrends,
      goBack,
      showModal
    };
  }
};
</script>

<style scoped>
/* Add custom styles here */
</style>