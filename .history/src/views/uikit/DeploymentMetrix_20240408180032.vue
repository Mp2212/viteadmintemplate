<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <!-- Toolbar code remains the same -->
        </Toolbar>

        <!-- Add spacing to the DataTable -->
        <DataTable
          class="mt-4"
          :value="filteredJobs"
          v-model:selection="selectedJob"
          dataKey="id"
          :paginator="true"
          :rows="10"
          size="small"
          :paginatorTemplate="paginatorTemplate"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} jobs"
          :globalFilterFields="['spk', 'REPO', 'branchtype', 'version', 'Enviroment', 'Build', 'Initiator', 'Duration', 'Status', 'Progress', 'JobUrl']"
        >
          <!-- SPK column -->
          <Column field="spk" header="SPK" sortable></Column>

          <!-- Repo column -->
          <Column field="REPO" header="Repo" sortable></Column>

          <!-- Branch Type column -->
          <Column field="branchtype" header="Branch Type" sortable></Column>

          <!-- Version column -->
          <Column field="version" header="Version" sortable></Column>

          <!-- Environment column -->
          <Column field="Enviroment" header="Environment" sortable></Column>

          <!-- Build column -->
          <Column field="Build" header="Build" sortable></Column>

          <!-- Initiator column -->
          <Column field="Initiator" header="Initiator" sortable></Column>

          <!-- Duration column -->
          <Column field="Duration" header="Duration" sortable></Column>

          <!-- Status column -->
          <Column field="Status" header="Status">
            <template #body="{ data }">
              <span :class="getStatusClass(data.Status)">{{ data.Status }}</span>
            </template>
          </Column>

          <!-- Progress column -->
          <Column field="Progress" header="Progress">
            <template #body="{ data }">
              <div role="progressbar" class="p-progressbar p-component p-progressbar-determinate" :aria-valuenow="getProgressValue(data.Progress)" aria-valuemin="0" aria-valuemax="100" style="height: 0.5rem;">
                <div class="p-progressbar-value p-progressbar-value-animate" :style="{ width: getProgressValue(data.Progress) + '%', display: 'flex' }"></div>
              </div>
            </template>
          </Column>

          <!-- Job URL column -->
          <Column field="JobUrl" header="Job URL">
            <template #body="{ data }">
              <a :href="data.JobUrl" target="_blank" rel="noopener noreferrer">
                <i class="pi pi-link"></i>
              </a>
            </template>
          </Column>
        </DataTable>

        <!-- Add Dialogs here -->
        <!-- Removed for brevity -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, watch, computed } from 'vue';
import { useToast } from 'primevue/usetoast';

export default {
  setup() {
    const toast = useToast();

    const jobs = ref([]);
    const filteredJobs = ref([]);
    const selectedJob = ref(null);
    const isAddJobDialogVisible = ref(false);
    const newJob = ref({
      spk: '',
      REPO: '',
      branchtype: '',
      version: '',
      Enviroment: '',
      Build: '',
      Initiator: '',
      Duration: '',
      Status: '',
      Progress: '',
      JobUrl: ''
    });
    const globalFilterValue = ref('');

    const API_URL = 'YOUR_API_ENDPOINT_HERE'; // Update with your API endpoint

    const fetchJobs = async () => {
      try {
        // Mock data for demonstration, replace this with actual API call
        const mockData = generateMockData(20); // Function to generate 20 random entries
        jobs.value = mockData;
        filteredJobs.value = mockData;
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    // Function to generate mock data with 20 random entries
    const generateMockData = (count) => {
      const mockData = [];
      for (let i = 1; i <= count; i++) {
        mockData.push({
          spk: `SPK-${i}`,
          REPO: `Repo-${i}`,
          branchtype: `Branch-${i}`,
          version: `Version-${i}`,
          Enviroment: `Env-${i}`,
          Build: `Build-${i}`,
          Initiator: `Initiator-${i}`,
          Duration: `${Math.floor(Math.random() * 100)} mins`,
          Status: Math.random() < 0.5 ? 'Success' : Math.random() < 0.75 ? 'Fail' : 'Running', // Randomly assign status
          Progress: Math.floor(Math.random() * 100), // Random progress value
          JobUrl: `http://example.com/job-${i}`
        });
      }
      return mockData;
    };

    // Computed property to determine badge class based on status
    const getStatusClass = (status) => {
      return {
        'p-tag p-component p-tag-success': status === 'Success',
        'p-tag p-component p-tag-danger': status === 'Fail',
        'p-tag p-component p-tag-warning': status === 'Running',
      };
    };

    // Method to calculate progress value as a percentage
    const getProgressValue = (progress) => {
      return Math.min(100, Math.max(0, progress)); // Ensure progress is between 0 and 100
    };

    // Fetch jobs on component mount
    fetchJobs();

    // Watch for changes in global filter value and update filteredJobs accordingly
    watch(globalFilterValue, (newValue, oldValue) => {
      filterJobs(newValue);
    });

    // Other methods and returns remain the same as in your original code

    return {
      jobs,
      filteredJobs,
      selectedJob,
      isAddJobDialogVisible,
      newJob,
      globalFilterValue,
      getStatusClass,
      getProgressValue
    };
  }
};
</script>

<style scoped>
/* Styles remain the same as in your original code */
</style>