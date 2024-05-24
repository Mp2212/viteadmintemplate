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
              <div id="trendsBtnContainer" class="mt-3 text-center">
                <button id="trendsBtn" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#trendModal" @click="showTrendsModal">TRENDS</button>
              </div>
            </div>
            <div class="col-md-6">
              <div class="alert alert-info" id="priorityDetails" v-if="priorityDetails.visible" data-bs-toggle="modal" data-bs-target="#priorityModal" :style="{ backgroundColor: priorityDetails.color }">
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
    <div class="modal fade" id="priorityModal" tabindex="-1" aria-labelledby="priorityModalLabel" aria-hidden="true">
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
    <!-- Trend Modal -->
    <div class="modal fade" id="trendModal" tabindex="-1" aria-labelledby="trendModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="trendModalLabel">Priority Trends</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Line charts for each priority -->
            <div class="container">
              <div class="row">
                <div class="col-md-4" v-for="(chart, index) in lineCharts" :key="index">
                  <canvas :id="'priorityChart' + (index + 1)" width="300" height="300"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary
share remain code
ChatGPT
vue
Copy code
" data-bs-dismiss="modal">Close</button>