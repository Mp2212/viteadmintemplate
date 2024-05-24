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
          size="small"
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
              <Dropdown v-model="newUser.username" :options="userNames" placeholder="Select a username"></Dropdown>
            </div>