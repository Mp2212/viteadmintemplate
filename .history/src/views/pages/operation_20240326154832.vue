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
            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
            <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
          </template>
        </Toolbar>

        <DataTable
          :value="users"
          v-model:selection="selectedUser"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :paginatorTemplate="paginatorTemplate"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
        >
          <Column selectionMode="single" headerStyle="width: 3rem"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="username" header="Username"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="address.city" header="City"></Column>
          <Column field="phone" header="Phone"></Column>
          <Column field="website" header="Website"></Column>
        </DataTable>

        <!-- Dialog Component for Adding New User -->
        <AddUserDialog :visible="isAddUserDialogVisible" @close="closeAddUserDialog" />

      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import AddUserDialog from './AddUserDialog.vue'; // Import the dialog component

const toast = useToast();

const users = ref([]);
const selectedUser = ref(null);
const isAddUserDialogVisible = ref(false);

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const deleteUser = async () => {
  if (!selectedUser.value) return;

  try {
    await axios.delete(`${API_URL}/${selectedUser.value.id}`);
    users.value = users.value.filter(user => user.id !== selectedUser.value.id);
    selectedUser.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

const openNew = () => {
  isAddUserDialogVisible.value = true;
};

const confirmDeleteSelected = () => {
  // Implement logic for confirming deletion of selected user (optional)
};

const exportCSV = () => {
  // Implement export functionality (optional)
};

// Fetch users on component mount
fetchUsers();
</script>