<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <template v-slot:start>
            <!-- Global search input -->
            <div class="my-2 mr-2">
              <InputText v-model="globalFilterValue" placeholder="Global Search" />
            </div>
          </template>
          <template v-slot:end>
            <!-- Group filter -->
            <div class="my-2">
              <Dropdown v-model="selectedGroupFilter" :options="groupFilterOptions" optionLabel="label" placeholder="Group Filter" />
            </div>
          </template>
        </Toolbar>

        <DataTable
          :value="filteredJobs"
          v-model:selection="selectedJob"
          dataKey="id"
          :paginator="true"
          :rows="10"
          size="small"
          :paginatorTemplate="paginatorTemplate"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} jobs"
          :globalFilterFields="['spk', 'REPO', 'branchtype', 'version', 'Enviroment', 'Build', 'Initiator', 'Duration', 'Status', 'JobUrl']"
        >
          <Column field="spk" header="SPK" sortable></Column>
          <Column field="REPO" header="Repo" sortable></Column>
          <Column field="branchtype" header="Branch Type" sortable></Column>
          <Column field="version" header="Version" sortable></Column>
          <Column field="Enviroment" header="Environment" sortable></Column>
          <Column field="Build" header="Build" sortable></Column>
          <Column field="Initiator" header="Initiator" sortable></Column>
          <Column field="Duration" header="Duration" sortable></Column>
          <Column field="Status" header="Status" sortable>
            <template #body="{ data }">
              <span :class="getStatusClass(data.Status)">{{ data.Status }}</span>
            </template>
          </Column>
          <Column field="Progress" header="Progress">
            <template #body="{ data }">
              <div class="p-progressbar p-component p-progressbar-determinate" role="progressbar" aria-valuemin="0" :aria-valuenow="getProgressValue(data.Progress)" aria-valuemax="100">
                <div class="p-progressbar-value p-progressbar-value-animate" :style="{ width: getProgressValue(data.Progress) + '%' }"></div>
              </div>
            </template>
          </Column>
          <Column field="JobUrl" header="Job URL">
            <template #body="{ data }">
              <i class="pi pi-link"></i>
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
    const selectedGroupFilter = ref(null);
    const groupFilterOptions = ref([
      { label: 'Group 1', value: 'group1' },
      { label: 'Group 2', value: 'group2' },
      { label: 'Group 3', value: 'group3' },
      // Add more options as needed
    ]);

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
      selectedGroupFilter,
      groupFilterOptions,
      getStatusClass,
      getProgressValue
    };
  }
};
</script>

<style scoped>
/* Styles remain the same as in your original code */
</style>