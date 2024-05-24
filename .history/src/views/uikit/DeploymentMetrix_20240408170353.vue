<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
              <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedUser || !selectedUser.id" />
            </div>
          </template>
          <template v-slot:end>
            <InputText v-model="globalFilterValue" placeholder="Search" />
          </template>
        </Toolbar>

        <DataTable
          :value="filteredJobs"
          v-model:selection="selectedUser"
          dataKey="id"
          :paginator="true"
          :rows="10"
          size="small"
          :paginatorTemplate="paginatorTemplate"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
          :globalFilterFields="['jobId', 'spk', 'REPO', 'branchType', 'version', 'environment', 'build', 'initiator', 'duration', 'status', 'jobUrl']"
        >
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

        <!-- Add Dialogs here -->
        <Dialog v-model:visible="isAddUserDialogVisible" header="Edit User" :modal="true">
          <!-- Dialog content -->
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';

export default {
  setup() {
    const toast = useToast();
    
    const jobs = ref([]); // Array to hold job data
    const filteredJobs = ref([]); // Array to hold filtered job data
    const selectedUser = ref(null);
    const isAddUserDialogVisible = ref(false);
    const globalFilterValue = ref('');
    
    const API_URL = 'https://jsonplaceholder.typicode.com/users';
    
    const fetchJobs = async () => {
      try {
        const response = await axios.get(API_URL);
        jobs.value = response.data;
        filteredJobs.value = response.data;
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    
    const deleteUser = async () => {
      if (!selectedUser.value) return;
    
      try {
        await axios.delete(`${API_URL}/${selectedUser.value.id}`);
        jobs.value = jobs.value.filter(job => job.id !== selectedUser.value.id);
        filteredJobs.value = filteredJobs.value.filter(job => job.id !== selectedUser.value.id);
        selectedUser.value = null;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
    
    const openNew = () => {
      isAddUserDialogVisible.value = true;
    };

    const closeAddUserDialog = () => {
      isAddUserDialogVisible.value = false;
      // Reset new user data
      // ...
    };
    
    const confirmDeleteSelected = () => {
      deleteUser();
    };
    
    fetchJobs();
    
    // Watch for changes in global filter value and update filteredJobs accordingly
    watch(globalFilterValue, (newValue, oldValue) => {
      filterJobs(newValue);
    });
    
    const filterJobs = (searchTerm) => {
      if (!searchTerm) {
        filteredJobs.value = jobs.value;
        return;
      }
    
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredJobs.value = jobs.value.filter(job => {
        return (
          job.jobId.toLowerCase().includes(lowerCaseSearchTerm) ||
          job.spk.toLowerCase().includes(lowerCaseSearchTerm) ||
          job.REPO.toLowerCase().includes(lowerCaseSearchTerm) ||
          job.branchType.toLowerCase().includes(lowerCaseSearchTerm) ||
          job.version.toLowerCase().includes(lowerCaseSearchTerm) ||
          job.environment.toLowerCase().includes(lowerCaseSearchTerm) ||
          job.build.toLowerCase().includes(lowerCaseSearchTerm) ||
          job.initiator.toLowerCase().includes(lowerCaseSearchTerm) ||
          job.duration.toLowerCase().includes(lowerCaseSearchTerm) ||
          job.status.toLowerCase().includes(lowerCaseSearchTerm) ||
          job.jobUrl.toLowerCase().includes(lowerCaseSearchTerm)
        );
      });
    };
    
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
    
    return {
      jobs,
      filteredJobs,
      selectedUser,
      isAddUserDialogVisible,
      globalFilterValue,
      openNew,
      closeAddUserDialog,
      confirmDeleteSelected,
      badgeClass
    };
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>