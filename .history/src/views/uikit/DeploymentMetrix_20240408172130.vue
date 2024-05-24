<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
              <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedJob || !selectedJob.id" />
            </div>
          </template>
          <template v-slot:end>
            <InputText v-model="globalFilterValue" placeholder="Search" />
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
          :globalFilterFields="['spk', 'REPO', 'branchtype', 'version', 'Enviroment', 'Build', 'Initiator', 'Duration']"
        >
          <Column field="spk" header="SPK" sortable></Column>
          <Column field="REPO" header="Repo" sortable></Column>
          <Column field="branchtype" header="Branch Type" sortable></Column>
          <Column field="version" header="Version" sortable></Column>
          <Column field="Enviroment" header="Environment" sortable></Column>
          <Column field="Build" header="Build" sortable></Column>
          <Column field="Initiator" header="Initiator" sortable></Column>
          <Column field="Duration" header="Duration" sortable></Column>
          <Column field="Progress" header="Progress">
            <template #body="{ data }">
              <ProgressBar :value="getProgress(data.Duration)" :showValue="false" />
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
import { ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { ProgressBar } from 'primevue/progressbar';

export default {
  components: {
    ProgressBar
  },
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
          JobUrl: `http://example.com/job-${i}`
        });
      }
      return mockData;
    };

    // Function to determine badge severity based on status
    const getStatusBadgeSeverity = (status) => {
      switch (status) {
        case 'Success':
          return 'success';
        case 'Fail':
          return 'danger';
        case 'Running':
          return 'warning';
        default:
          return 'info';
      }
    };

    // Function to calculate progress based on duration
    const getProgress = (duration) => {
      // Assuming duration is in minutes, and you want to show progress based on some criteria
      // Here, I'm simply dividing the duration by a constant value as an example
      return Math.min((parseInt(duration) / 60) * 100, 100); // Assuming duration is in minutes, convert it to hours for the progress calculation
    };

    // Other methods (openNew, closeAddJobDialog, saveNewJob, confirmDeleteSelected, filterJobs) remain the same as in your original code

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
      getStatusBadgeSeverity,
      getProgress
      // Other returned methods remain the same as in your original code
    };
  }
};
</script>

<style scoped>
/* Styles remain the same as in your original code */
</style>