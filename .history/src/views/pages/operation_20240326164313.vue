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
          :value="filteredUsers"
          v-model:selection="selectedUser"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :paginatorTemplate="paginatorTemplate"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
          :sortOrder="sortOrder"
          :sortField="sortField"
        >
          <Column selectionMode="single" headerStyle="width: 3rem"></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="username" header="Username" sortable></Column>
          <Column field="email" header="Email" sortable></Column>
          <Column field="address.city" header="City" sortable></Column>
          <Column field="phone" header="Phone" sortable></Column>
          <Column field="website" header="Website" sortable></Column>
        </DataTable>

        <!-- Dialog Component for Adding New User -->
        <Dialog v-model:visible="isAddUserDialogVisible" header="Add New User" :modal="true" class="custom-dialog">
          <div class="dialog-content">
            <Fieldset legend="New User">
              <div class="p-fluid p-formgrid p-grid">
                <div class="p-field p-col-12 p-md-6">
                  <label for="name">Name</label>
                  <InputText id="name" v-model="newUser.name" />
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="username">Username</label>
                  <InputText id="username" v-model="newUser.username" />
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="email">Email</label>
                  <InputText id="email" v-model="newUser.email" />
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="phone">Phone</label>
                  <InputText id="phone" v-model="newUser.phone" />
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="website">Website</label>
                  <InputText id="website" v-model="newUser.website" />
                </div>
              </div>
            </Fieldset>
          </div>
          <template #footer>
            <div class="p-d-flex p-jc-end">
              <Button label="Cancel" icon="pi pi-times" text="" @click="closeAddUserDialog" />
              <Button label="Save" icon="pi pi-check" text="" @click="saveNewUser" />
            </div>
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
const selectedUser = ref(null);
const isAddUserDialogVisible = ref(false);
const newUser = ref({
  name: '',
  username: '',
  email: '',
  phone: '',
  website: ''
});
const sortOrder = ref(1); // 1 for ascending, -1 for descending
const sortField = ref('');

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

const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.name.toLowerCase().includes(globalFilter.value.toLowerCase()) ||
    user.username.toLowerCase().includes(globalFilter.value.toLowerCase()) ||
    user.email.toLowerCase().includes(globalFilter.value.toLowerCase()) ||
    (user.address && user.address.city.toLowerCase().includes(globalFilter.value.toLowerCase())) ||
    user.phone.toLowerCase().includes(globalFilter.value.toLowerCase()) ||
    user.website.toLowerCase().includes(globalFilter.value.toLowerCase())
  );
});

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