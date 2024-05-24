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

        <div class="p-input-icon-left mb-4">
          <i class="pi pi-search"></i>
          <InputText v-model="globalFilter" placeholder="Search..." class="mr-2" @input="searchUsers" />
        </div>

        <DataTable
          :value="filteredUsers"
          v-model:selection="selectedUser"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :paginatorTemplate="paginatorTemplate"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
          :sortOrder="sortOrder"
          :sortField="sortField"
          @sort="onSort"
        >
          <Column selectionMode="single" headerStyle="width: 3rem"></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="username" header="Username" sortable></Column>
          <Column field="email" header="Email" sortable></Column>
          <Column field="address.city" header="City" sortable></Column>
          <Column field="phone" header="Phone" sortable></Column>
          <Column field="website" header="Website" sortable></Column>
        </DataTable>

        <!-- Add Dialogs here -->
        <Dialog v-model:visible="isAddUserDialogVisible" header="Add New User" :modal="true">
          <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model="newUser.name" />
          </div>
          <div class="field">
            <label for="username">Username</label>
            <InputText id="username" v-model="newUser.username" />
          </div>
          <div class="field">
            <label for="email">Email</label>
            <InputText id="email" v-model="newUser.email" />
          </div>
          <div class="field">
            <label for="phone">Phone</label>
            <InputText id="phone" v-model="newUser.phone" />
          </div>
          <div class="field">
            <label for="website">Website</label>
            <InputText id="website" v-model="newUser.website" />
          </div>
          <template #footer>
            <Button label="Cancel" icon="pi pi-times" text="" @click="closeAddUserDialog" />
            <Button label="Save" icon="pi pi-check" text="" @click="saveNewUser" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const users = ref([]);
const filteredUsers = ref([]);
const selectedUser = ref(null);
const sortOrder = ref(1);
const sortField = ref(null);
const isAddUserDialogVisible = ref(false);
const newUser = ref({
  name: '',
  username: '',
  email: '',
  phone: '',
  website: ''
});
const globalFilter = ref('');

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    users.value = response.data;
    filteredUsers.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const deleteUser = async () => {
  if (!selectedUser.value) return;

  try {
    await axios.delete(`${API_URL}/${selectedUser.value.id}`);
    users.value = users.value.filter(user => user.id !== selectedUser.value.id);
    filteredUsers.value = filteredUsers.value.filter(user => user.id !== selectedUser.value.id);
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
  newUser.value = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: ''
  };
};

const saveNewUser = async () => {
  try {
    const response = await axios.post(API_URL, newUser.value);
    users.value.push(response.data);
    filteredUsers.value.push(response.data);
    closeAddUserDialog();
    toast.add({ severity: 'success', summary: 'Success', detail: 'New user added successfully', life: 3000 });
  } catch (error) {
    console.error('Error saving new user:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to add new user', life: 3000 });
  }
};

const confirmDeleteSelected = () => {
  deleteUser();
};

const exportCSV = () => {
  // Implement export functionality (optional)
};

const searchUsers = () => {
  const value = globalFilter.value.toLowerCase();
  filteredUsers.value = users.value.filter(user =>
    user.name.toLowerCase().includes(value) ||
    user.username.toLowerCase().includes(value) ||
    user.email.toLowerCase().includes(value) ||
    user.address.city.toLowerCase().includes(value) ||
    user.phone.toLowerCase().includes(value) ||
    user.website.toLowerCase().includes(value)
  );
};

const onSort = (event) => {
  sortOrder.value = event.order;
  sortField.value = event.field;
  filteredUsers.value.sort((data1, data2) => {
    let value1 = data1[event.field],
        value2 = data2[event.field];
    let result = null;

    if (typeof value1 === 'string' && typeof value2 === 'string') {
      result = value1.localeCompare(value2);
    } else {
      result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
    }

    return (sortOrder.value * result);
  });
};

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

const closeAddUserDialog = () => {
  isAddUserDialogVisible.value = false;
  // Reset new user data
  newUser.value = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: ''
  };
};

const saveNewUser = async () => {
  try {
    const response = await axios.post(API_URL, newUser.value);
    users.value.push(response.data);
    closeAddUserDialog();
    toast.add({ severity: 'success', summary: 'Success', detail: 'New user added successfully', life: 3000 });
  } catch (error) {
    console.error('Error saving new user:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to add new user', life: 3000 });
  }
};

// Fetch users on component mount
fetchUsers();
</script>

<style scoped>
.custom-dialog {
  max-width: 400px;
}

.dialog-content {
  margin: 0 auto;
}
</style>