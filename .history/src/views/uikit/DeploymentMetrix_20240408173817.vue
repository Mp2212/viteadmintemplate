<template>
  <div>
    <DataTable
      v-model:filters="filters"
      :value="jobs"
      paginator
      showGridlines
      :rows="10"
      dataKey="jobid"
      filterDisplay="menu"
      :loading="loading"
      :globalFilterFields="['jobid', 'spk', 'REPO', 'branchtype', 'version', 'Enviroment', 'Build', 'Initiator', 'Duration', 'Status']"
    >
      <template #header>
        <div class="flex justify-content-between">
          <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
          <IconField iconPosition="left">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </IconField>
        </div>
      </template>
      <template #empty> No jobs found. </template>
      <template #loading> Loading jobs data. Please wait. </template>
      <Column field="jobid" header="Job ID" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.jobid }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Job ID" />
        </template>
      </Column>
      <Column field="spk" header="SPK" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.spk }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by SPK" />
        </template>
      </Column>
      <Column field="REPO" header="Repository" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.REPO }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Repository" />
        </template>
      </Column>
      <Column field="branchtype" header="Branch Type" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.branchtype }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Branch Type" />
        </template>
      </Column>
      <Column field="version" header="Version" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.version }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Version" />
        </template>
      </Column>
      <Column field="Enviroment" header="Environment" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.Enviroment }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Environment" />
        </template>
      </Column>
      <Column field="Build" header="Build" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.Build }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Build" />
        </template>
      </Column>
      <Column field="Initiator" header="Initiator" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.Initiator }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Initiator" />
        </template>
      </Column>
      <Column field="Duration" header="Duration" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.Duration }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Duration" />
        </template>
      </Column>
      <Column field="Status" header="Status" style="min-width: 12rem">
        <template #body="{ data }">
          <span :class="getStatusBadgeClass(data.Status)">{{ data.Status }}</span>
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Status" />
        </template>
      </Column>
      <Column field="JobUrl" header="Job URL" style="min-width: 12rem">
        <template #body="{ data }">
          <a :href="data.JobUrl" target="_blank" rel="noopener noreferrer"><i class="pi pi-link"></i></a>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref } from 'vue';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

export default {
  components: {
    DataTable,
    Column,
    InputText,
    InputIcon,
    IconField,
    Button,
  },
  setup() {
    const jobs = ref([]); // Initialize with your data
    const filters = ref({ global: { value: '' } }); // Initialize filters
    const loading = ref(false); // Loading state

    // Function to clear filters
    const clearFilter = () => {
      filters.value = { global: { value: '' } };
    };

    // Load jobs data, replace this with your API call
    const loadJobs = async () => {
      loading.value = true;
      try {
        // Simulate API call
        const response = await fetch('YOUR_API_ENDPOINT');
        jobs.value = await response.json();
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        loading.value = false;
      }
    };

    // Load jobs on component mount
    loadJobs();

    // Function to determine badge class based on status
    const getStatusBadgeClass = (status) => {
      return {
        'badge-success': status === 'success',
        'badge-danger': status === 'fail',
        'badge-primary': status === 'Running',
      };
    };

    return {
      jobs,
      filters,
      loading,
      clearFilter,
      getStatusBadgeClass,
    };
  },
};
</script>