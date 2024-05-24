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
        <template #body="{rowData}">
          <span :class="badgeClass(rowData.status)">{{ rowData.status }}</span>
        </template>
      </Column>
      <Column field="jobUrl" header="Job URL" />
    </DataTable>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { DataTable, Column } from 'primevue/datatable';
//import { Button } from 'primevue/button';
import { Dropdown } from 'primevue/dropdown';

export default {
  components: {
    DataTable,
    Column,
    Button,
    Dropdown,
  },
  data() {
    return {
      jobs: [], // Array to hold job data
      globalFilter: '', // Global search term
      selectedStatus: null, // Selected status for filtering
      statusOptions: [ // Options for status filtering dropdown
        { name: 'Success', value: 'success' },
        { name: 'Fail', value: 'fail' },
        { name: 'Running', value: 'running' }
      ]
    };
  },
  computed: {
    filteredJobs() {
      let filtered = this.jobs;

      // Global search filter
      if (this.globalFilter) {
        const searchTerm = this.globalFilter.toLowerCase();
        filtered = filtered.filter(job => {
          return Object.values(job).some(val => {
            return String(val).toLowerCase().includes(searchTerm);
          });
        });
      }

      // Status filter
      if (this.selectedStatus) {
        filtered = filtered.filter(job => job.status === this.selectedStatus);
      }

      return filtered;
    }
  },
  methods: {
    badgeClass(status) {
      switch (status) {
        case 'success':
          return 'p-tag p-component p-tag-success';
        case 'fail':
          return 'p-tag p-component p-tag-danger';
        case 'running':
          return 'p-tag p-component p-tag-info';
        default:
          return 'p-tag p-component';
      }
    },
    clearFilters() {
      this.globalFilter = '';
      this.selectedStatus = null;
    }
  },
  mounted() {
    // Fetch your job data here and assign it to this.jobs
    // Example:
    // this.jobs = [ { jobId: '1', spk: 'SPK1', ... }, { jobId: '2', spk: 'SPK2', ... }, ... ];
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