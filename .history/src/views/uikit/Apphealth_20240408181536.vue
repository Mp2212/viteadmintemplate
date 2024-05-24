<template>
  <div class="job-summary-container">
    <DataTable :value="summaries" :paginator="true" :rows="10" :paginatorTemplate="paginatorTemplate">
      <Column field="spk" header="SPK"></Column>
      <Column field="total" header="Total"></Column>
      <Column field="pass" header="Pass"></Column>
      <Column field="fail" header="Fail"></Column>
      <Column field="overallStatus" header="Overall Status" :body="overallStatusTemplate"></Column>
    </DataTable>
  </div>
</template>

<script>
import { ref } from 'vue';
import { DataTable, Column } from 'primevue/datatable';

export default {
  components: {
    DataTable,
    Column
  },
  data() {
    return {
      summaries: this.generateRandomSummaries()
    };
  },
  methods: {
    generateRandomSummaries() {
      const summaries = [];
      for (let i = 0; i < 20; i++) {
        const total = Math.floor(Math.random() * 100);
        const pass = Math.floor(Math.random() * total);
        const fail = total - pass;

        summaries.push({
          spk: `SPK-${i + 1}`,
          total: total,
          pass: pass,
          fail: fail
        });
      }
      return summaries;
    },
    getOverallStatus(pass, total) {
      const passPercentage = (pass / total) * 100;
      return passPercentage >= 60 ? 'Pass' : 'Fail';
    },
    getOverallStatusClass(pass, total) {
      const passPercentage = (pass / total) * 100;
      return passPercentage >= 60 ? 'p-tag p-component p-tag-success' : 'p-tag p-component p-tag-danger';
    },
    overallStatusTemplate(rowData) {
      return `<span class="${this.getOverallStatusClass(rowData.pass, rowData.total)}">${this.getOverallStatus(rowData.pass, rowData.total)}</span>`;
    }
  },
  computed: {
    paginatorTemplate() {
      return {
        currentPageReportTemplate: 'Showing {first} to {last} of {totalRecords} summaries',
        firstPageLabel: 'First',
        lastPageLabel: 'Last',
        rowsPerPageLabel: 'Rows per page',
        paginatorDropdownAppendTo: 'self'
      };
    }
  }
};
</script>

<style scoped>
.job-summary-container {
  /* Add styling as needed */
}
</style>