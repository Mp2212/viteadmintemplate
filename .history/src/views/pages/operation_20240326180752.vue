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
          :value="filteredUsers"
          v-model:selection="selectedUser"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :paginatorTemplate="paginatorTemplate"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
          :globalFilterFields="['name', 'username', 'email', 'address.city', 'phone', 'website']"
        >
          <Column headerStyle="width: 3rem"></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="username" header="Username" sortable></Column>
          <Column field="email" header="Email" sortable></Column>
          <Column field="address.city" header="City" sortable></Column>
          <Column field="phone" header="Phone" sortable></Column>
          <Column field="website" header="Website" sortable></Column>
          <Column header="" style="width: 3rem">
            <template #body="{ data }">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-secondary" @click="editUser(data)" />
            </template>
          </Column>
        </DataTable>

        <!-- Add Dialogs here -->
        <Dialog v-model:visible="isAddUserDialogVisible" header="Edit User" :modal="true">
          <div class="p-grid p-fluid">
            <div class="p-col-4">
              <label for="name">Name</label>
            </div>
            <div class="p-col-8">
              <InputText id="name" v-model="newUser.name" />
            </div>
            <div class="p-col-4">
              <label for="username">Username</label>
            </div>
            <div class="p-col-8">
              <InputText id="username" v-model="newUser.username" />
            </div>
            <div class="p-col-4">
              <label for="email">Email</label>
            </div>
            <div class="p-col-8">
              <InputText id="email" v-model="newUser.email" />
            </div>
            <div class="p-col-4">
              <label for="city">City</label>
            </div>
            <div class="p-col-8">
              <InputText id="city" v-model="newUser.address.city" />
            </div>
            <div class="p-col-4">
              <label for="phone">Phone</label>
            </div>
            <div class="p-col-8">
              <InputText id="phone" v-model="newUser.phone" />
            </div>
            <div class="p-col-4">
              <label for="website">Website</label>
            </div>
            <div class="p-col-8">
              <InputText id="website" v-model="newUser.website" />
            </div>
            <!-- Repeat the above pattern for other input fields -->
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
import { ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const users = ref([]);
const filteredUsers = ref([]);
const selectedUser = ref(null);
const isAddUserDialogVisible = ref(false);
const newUser = ref({
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  address: {
    city: ''
  }
});
const globalFilterValue = ref('');

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
    website: '',
    address: {
      city: ''
    }
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

fetchUsers();

// Watch for changes in global filter value and update filteredUsers accordingly
watch(globalFilterValue, (newValue, oldValue) => {
  filterUsers(newValue);
});

const filterUsers = (searchTerm) => {
  if (!searchTerm) {
    filteredUsers.value = users.value;
    return;
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  filteredUsers.value = users.value.filter(user => {
    return (
      user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.username.toLowerCase().includes(lowerCaseSearchTerm) ||
       user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.address.city.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.phone.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.website.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });
};

const editUser = (user) => {
  // Set the user details to be edited
  newUser.value = { ...user };
  // Open the edit user dialog
  isAddUserDialogVisible.value = true;
};

</script>

<style scoped>
.p-grid .p-col-4 label {
  text-align: right;
  padding-top: 7px;
}
.p-grid .p-col-8 {
  margin-bottom: 1rem;
}
.p-button-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.p-button-rounded {
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
}
.grid .p-col-8,
.grid .p-field label {
  font-size: 0.875rem; /* Adjust the font size as needed */
}
</style>