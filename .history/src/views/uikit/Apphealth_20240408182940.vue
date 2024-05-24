<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <template v-slot:start>
            <!-- Global search input -->
            <div class="my-2 mr-2">
              <InputText v-model="globalFilterValue" placeholder="Global Search" />
            </div>
          </template>
          <template v-slot:end>
            <!-- Group filter -->
            <div class="my-2">
              <Dropdown v-model="selectedGroupFilter" :options="groupFilterOptions" optionLabel="label" placeholder="Group Filter" />
            </div>
          </template>
        </Toolbar>

        <DataTable
          :value="filteredSummaries"
          dataKey="spk"
          :paginator="true"
          :rows="10"
          size="small"
          :paginatorTemplate="paginatorTemplate"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} summaries"
          :globalFilterFields="['spk', 'total', 'pass', 'fail']"
        >
          <Column field="spk" header="SPK" sortable></Column>
          <Column field="total" header="Total" sortable></Column>
          <Column field="pass" header="Pass" sortable></Column>
          <Column field="fail" header="Fail" sortable></Column>
          <Column field="Status" header="Status" sortable>
            <template #body="{ data }">
              <span :class="getStatusClass(data.Status)">{{ data.Status }}</span>
            </template>
          </Column>
          <Column field="overallStatus" header="Overall Status" :body="overallStatusTemplate"></Column>
        </DataTable>

        <!-- Add Dialogs here -->
        <!-- Removed for brevity -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, watch, computed } from 'vue';

export default {
  components: {
   },
  setup() {
    const summaries = ref([]);

    // Generate random summaries
    const generateSummaries = () => {
      const mockData = [];
      for (let i = 1; i <= 20; i++) {
        const total = Math.floor(Math.random() * 100);
        const pass = Math.floor(Math.random() * total);
        const fail = total - pass;
        const overallStatus = pass / total >= 0.6 ? 'Pass' : 'Fail';

        mockData.push({
          spk: `SPK-${i}`,
          total: total,
          pass: pass,
          fail: fail,
          overallStatus: overallStatus
        });
      }
      return mockData;
    };

    // Load summaries
    summaries.value = generateSummaries();

    // Filtered summaries
    const globalFilterValue = ref('');
    const selectedGroupFilter = ref(null);
    const groupFilterOptions = ref([
      { label: 'Group 1', value: 'group1' },
      { label: 'Group 2', value: 'group2' },
      { label: 'Group 3', value: 'group3' },
      // Add more options as needed
    ]);
    const filteredSummaries = computed(() => {
      let filtered = summaries.value;
      if (globalFilterValue.value) {
        const filterText = globalFilterValue.value.toLowerCase();
        filtered = filtered.filter(summary =>
          summary.spk.toLowerCase().includes(filterText) ||
          summary.total.toString().toLowerCase().includes(filterText) ||
          summary.pass.toString().toLowerCase().includes(filterText) ||
          summary.fail.toString().toLowerCase().includes(filterText)
        );
      }
      if (selectedGroupFilter.value) {
        // Filter logic based on selected group filter
      }
      return filtered;
    });

    // Paginator template
    const paginatorTemplate = {
      currentPageReportTemplate: 'Showing {first} to {last} of {totalRecords} summaries',
      firstPageLabel: 'First',
      lastPageLabel: 'Last',
      rowsPerPageLabel: 'Rows per page',
      paginatorDropdownAppendTo: 'self'
    };

  // Overall status template
const overallStatusTemplate = (rowData) => {
  const badgeClass = rowData.overallStatus === 'Pass' ? 'p-tag p-component p-tag-success' : 'p-tag p-component p-tag-danger';
  return `<span :class="[badgeClass]">${rowData.overallStatus}</span>`;
};

    return {
      summaries,
      globalFilterValue,
      selectedGroupFilter,
      groupFilterOptions,
      filteredSummaries,
      paginatorTemplate,
      overallStatusTemplate
    };
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>