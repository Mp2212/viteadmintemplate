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
          ref="dt"
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
          <!-- DataTable columns -->
        </DataTable>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true" class="p-fluid">
          <!-- Dialog content -->
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
          <!-- Delete product confirmation dialog content -->
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { Button } from 'primevue/button';
import { Toolbar } from 'primevue/toolbar';
import { FileUpload } from 'primevue/fileupload';
import { DataTable } from 'primevue/datatable';
import { Dialog } from 'primevue/dialog';

const toast = useToast();

const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const filters = ref({});

const API_URL = 'http://81.82.195.122:9003/api/Brands';

const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const createProduct = async () => {
  try {
    const newProduct = {
      name: 'New Product',
      isactive: 1 // Adjust properties according to your schema
    };

    const response = await axios.post(API_URL, newProduct);
    products.value.push(response.data);
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
  } catch (error) {
    console.error('Error creating product:', error);
  }
};

const updateProduct = async () => {
  try {
    const updatedProduct = { ...product.value };

    await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
    const index = products.value.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products.value.splice(index, 1, updatedProduct);
    }
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

const deleteProduct = async () => {
  try {
    await axios.delete(`${API_URL}/${product.value.id}`);
    products.value = products.value.filter(p => p.id !== product.value.id);
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

const openNew = () => {
  product.value = {};
  productDialog.value = true;
};

const confirmDeleteSelected = () => {
  deleteProductDialog.value = true;
};

const exportCSV = () => {
  // Implement export functionality
};
</script>