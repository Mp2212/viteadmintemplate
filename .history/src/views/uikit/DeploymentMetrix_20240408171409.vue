<template>
  <div>
    <div class="datatable-controls">
      <label for="globalSearch">Global Search:</label>
      <input type="text" v-model="globalFilter" id="globalSearch" />

      <label for="statusFilter">Status:</label>
      <Dropdown v-model="selectedStatus" :options="statusOptions" optionLabel="name" placeholder="Select a status" />

      <Button @click="clearFilters" label="Clear Filters" />

    </div>

    <DataTable :value="filteredJobs" :paginator="true" :rows="10">
      <Column field="jobId" header="Job ID" sortable />
      <Column field="spk" header="SPK" sortable />
      <Column field="REPO" header="Repo" sortable />
      <Column field="branchType" header="Branch Type" sortable />
      <Column field="version" header="Version" sortable />
      <Column field="environment" header="Environment" sortable />
      <Column field="build" header="Build" sortable />
      <Column field="initiator" header="Initiator" sortable />
      <Column field="duration" header="Duration" sortable />
      <Column field="status" header="Status" sortable>
        <template #body="{ rowData }">
          <span :class="badgeClass(rowData.status)">{{ rowData.status }}</span>
        </template>
      </Column>
      <Column field="jobUrl" header="Job URL" />
    </DataTable>
  </div>
</template>

<script>
import { ref } from 'vue';
import { DataTable, Column, Button, Dropdown } from 'primevue/datatable';

export default {
  components: {
    DataTable,
    Column,
    Button,
    Dropdown,
  },
  setup() {
    const jobs = ref([]);
    const filteredJobs = ref([]);
    const globalFilter = ref('');
    const selectedStatus = ref(null);
    const statusOptions = [
      { name: 'Success', value: 'Success' },
      { name: 'Fail', value: 'Fail' },
      { name: 'Running', value: 'Running' }
    ];

    const fetchJobs = async () => {
      try {
        const mockJobs = [];
        for (let i = 0; i < 20; i++) {
          const randomJob = {
            jobId: Math.floor(Math.random() * 1000), // Generate a random job ID
            spk: `SPK${i}`,
            REPO: `Repo${i}`,
            branchType: `BranchType${i}`,
            version: `Version${i}`,
            environment: `Environment${i}`,
            build: `Build${i}`,
            initiator: `Initiator${i}`,
            duration: `${Math.floor(Math.random() * 100)} minutes`,
            status: ['Success', 'Fail', 'Running'][Math.floor(Math.random() * 3)],
            jobUrl: `http://example.com/job/${i}`
          };
          mockJobs.push(randomJob);
        }
        jobs.value = mockJobs;
        filteredJobs.value = mockJobs;
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();

    const badgeClass = (status) => {
      switch (status) {
        case 'Success':
          return 'p-tag p-component p-tag-success';
        case 'Fail':
          return 'p-tag p-component p-tag-danger';
        case 'Running':
          return 'p-tag p-component p-tag-info';
        default:
          return 'p-tag p-component';
      }
    };

    const clearFilters = () => {
      globalFilter.value = '';
      selectedStatus.value = null;
    };

    return {
      jobs,
      filteredJobs,
      globalFilter,
      selectedStatus,
      statusOptions,
      badgeClass,
      clearFilters
    };
  }
};
</script>

<style scoped>
.datatable-controls {
  margin-bottom: 20px;
}

.datatable-controls > * {
  margin-right: 10px;
}
</style>