<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
              <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
            </div>
          </template>
          <template v-slot:end>
            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
            <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
          </template>
        </Toolbar>

        <DataTable
          :value="products"
          v-model:selection="selectedProducts"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        >
          <!-- Define DataTable columns here -->
          <Column field="name" header="Name"></Column>
          <Column field="username" header="Username"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="Phone"></Column>
          <Column field="website" header="Website"></Column>
        </DataTable>

        <!-- Add Dialogs here -->
        <Dialog v-model:visible="productDialog" header="Add New User" :modal="true">
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
            <Button label="Cancel" icon="pi pi-times" text="" @click="closeDialog" />
            <Button label="Save" icon="pi pi-check" text="" @click="saveNewUser" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const products = ref([]);
const productDialog = ref(false);
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const newUser = ref({
  name: '',
  username: '',
  email: '',
  phone: '',
  website: ''
});

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const openNew = () => {
  productDialog.value = true;
};

const closeDialog = () => {
  productDialog.value = false;
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
    products.value.push(response.data);
    closeDialog();
    toast.add({ severity: 'success', summary: 'Success', detail: 'New user added successfully', life: 3000 });
  } catch (error) {
    console.error('Error saving new user:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to add new user', life: 3000 });
  }
};

const confirmDeleteSelected = () => {
  // Implement functionality to confirm and delete selected products
};

const exportCSV = () => {
  // Implement functionality to export CSV
};

fetchProducts();
</script>