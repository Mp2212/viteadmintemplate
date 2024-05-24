<template>
  <div class="job-summary-container">
    <div class="job-summary">
      <div class="summary-info">
        <div class="summary-item">
          <span class="label">SPK:</span>
          <span class="value">{{ summary.spk }}</span>
        </div>
        <div class="summary-item">
          <span class="label">Total:</span>
          <span class="value">{{ summary.total }}</span>
        </div>
        <div class="summary-item">
          <span class="label">Pass:</span>
          <span class="value">{{ summary.pass }}</span>
        </div>
        <div class="summary-item">
          <span class="label">Fail:</span>
          <span class="value">{{ summary.fail }}</span>
        </div>
        <div class="summary-item">
          <span class="label">Overall Status:</span>
          <span :class="getOverallStatusClass(summary.pass, summary.total)">{{ getOverallStatus(summary.pass, summary.total) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      summary: this.generateRandomSummary()
    };
  },
  methods: {
    generateRandomSummary() {
      const total = 20;
      const pass = Math.floor(Math.random() * total);
      const fail = total - pass;

      return {
        spk: 'SPK Summary',
        total: total,
        pass: pass,
        fail: fail
      };
    },
    getOverallStatus(pass, total) {
      const passPercentage = (pass / total) * 100;
      return passPercentage >= 60 ? 'Pass' : 'Fail';
    },
    getOverallStatusClass(pass, total) {
      const passPercentage = (pass / total) * 100;
      return passPercentage >= 60 ? 'p-tag p-component p-tag-success' : 'p-tag p-component p-tag-danger';
    }
  }
};
</script>

<style scoped>
.job-summary-container {
  /* Add styling as needed */
}

.job-summary {
  margin-bottom: 20px;
}

.summary-info {
  display: flex;
  flex-wrap: wrap;
}

.summary-item {
  margin-right: 20px;
}

.label {
  font-weight: bold;
}

.value {
  margin-left: 5px;
}
</style>