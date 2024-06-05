<template>
    <div class="container mt-5">
        <!-- Dart Tool Panel -->
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="panel">
                    <h2 class="text-center mb-4">Dart Tool</h2>
                    <!-- Dropdowns inside the panel -->
                    <div class="row">
                        <div class="col">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {{ dropdown1 }}
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li v-for="option in dropdown1Options" :key="option">
                                        <a class="dropdown-item" href="#" @click="updateDropdown('dropdown1', option)">{{ option }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                    {{ dropdown2 }}
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                    <li v-for="option in dropdown2Options" :key="option">
                                        <a class="dropdown-item" href="#" @click="updateDropdown('dropdown2', option)">{{ option }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
                                    {{ dropdown3 }}
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                                    <li v-for="option in dropdown3Options" :key="option">
                                        <a class="dropdown-item" href="#" @click="updateDropdown('dropdown3', option)">{{ option }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-outline-success mt-1" id="viewBtn" @click="showChart" :disabled="!allDropdownsSelected">View</button>
                        </div>
                    </div>
                    <!-- End of dropdowns -->

                    <!-- Priority details and Pie chart side by side -->
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <div id="chartContainer" class="position-relative">
                                <canvas id="myChart" width="300" height="300"></canvas>
                            </div>
                            <div id="trendsBtnContainer" class="mt-3 text-center">
                                <button id="trendsBtn" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#trendModal" @click="showTrendsModal">TRENDS</button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="alert alert-info" id="priorityDetails" v-if="priorityDetails.visible" data-bs-toggle="modal" data-bs-target="#priorityModal" :style="{ backgroundColor: priorityDetails.color }">
                                <strong>{{ priorityDetails.label }}:</strong> {{ priorityDetails.value }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of Dart Tool Panel -->

        <!-- Line Chart Panel -->

        <!-- End of Line Chart Panel -->

        <!-- Modal -->
        <div class="modal fade" id="priorityModal" tabindex="-1" aria-labelledby="priorityModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="priorityModalLabel">Priority Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Priority</th>
                                    <th>Source</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in modalContent" :key="index">
                                    <td>{{ item.label }}</td>
                                    <td>{{ item.source }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Trend Modal -->
        <div class="modal fade" id="trendModal" tabindex="-1" aria-labelledby="trendModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="trendModalLabel">Priority Trends</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Line charts for each priority -->
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6 chart-column" v-for="(chart, index) in selectedOptions" :key="index">
                                    <canvas :id="'barChart' + index" width="600" height="300"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of Trend Modal -->
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);
export default {
    name: 'ChartExample',
    setup() {
        const barCharts = ref([]);
        const dropdown1 = ref('Select AIT');
        const dropdown2 = ref('Select SPK');
        const dropdown3 = ref('Select Component');
        const allDropdownsSelected = ref(false);
        const selectedOptions = ref([]);
        const priorityDetails = reactive({ visible: false, label: '', value: '', color: '' });
        const showLineChartPanel = ref(false);
        const modalContent = ref([]);
        const lineCharts = ref([1, 2, 3, 4, 5]);

        const chartData = {
            'AIT Option 1': [0, 3, 5, 7, 7],
            'AIT Option 2': [1, 2, 5, 7, 9],
            'AIT Option 3': [0, 6, 5, 7, 10],
            ADFW: [2, 4, 6, 8, 10],
            ABPA: [1, 3, 5, 7, 9],
            ACTWF: [0, 2, 4, 6, 8],
            BANKLINK: [3, 6, 9, 12, 15],
            Adfw: [5, 10, 15, 20, 25],
            Actwf: [4, 8, 12, 16, 20],
            Banklink: [3, 6, 9, 12, 15],
            Creditcard: [2, 4, 6, 8, 10],
            DMZ_DEV3_MAY: [7, 14, 21, 28, 35],
            BARONET_DEV4_MAY: [6, 12, 18, 24, 30],
            BARONET_DEV1_FEB: [5, 10, 15, 20, 25]
        };

        const dropdown1Options = ref(['AIT Option 1', 'AIT Option 2', 'AIT Option 3']);
        const dropdown2Options = ref(['ADFW', 'ABPA', 'ACTWF']);
        const dropdown3Options = ref(['Banklink', 'Creditcard', 'DMZ_DEV3_MAY']);

        const updateDropdown = (dropdown, value) => {
            if (dropdown === 'dropdown1') dropdown1.value = value;
            if (dropdown === 'dropdown2') dropdown2.value = value;
            if (dropdown === 'dropdown3') dropdown3.value = value;
            validateDropdowns();
            showChart();
        };

        const validateDropdowns = () => {
            allDropdownsSelected.value = dropdown1.value !== 'Select AIT' && dropdown2.value !== 'Select SPK' && dropdown3.value !== 'Select Component';
            selectedOptions.value = [dropdown1.value, dropdown2.value, dropdown3.value].filter((option) => option !== 'Select AIT' && option !== 'Select SPK' && option !== 'Select Component');
            console.log(selectedOptions);
        };

        const showChart = () => {
            const selectedOption = selectedOptions.value[selectedOptions.value.length - 1]; // Get the last selected dropdown value
            const newData = chartData[selectedOption];

            let chart = barCharts.value.find((chart) => chart.canvas && chart.canvas.id === 'myChart');

            // Destroy existing chart if it exists
            if (chart) {
                chart.destroy();
            }

            const ctx = document.getElementById('myChart');
            if (!ctx) {
                console.error('Canvas element not found');
                return;
            }

            // Get the parent element of the canvas (the card)
            const card = ctx.parentElement;

            // Set the width and height of the canvas to match the card's dimensions
            ctx.width = card.clientWidth;
            ctx.height = card.clientHeight;

            // Create new chart with updated size
            chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4', 'Priority 5'],
                    datasets: [
                        {
                            label: 'Priority Distribution',
                            data: newData,
                            backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)'],
                            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: false, // Disable responsiveness
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Chart Title'
                        }
                    },
                    onClick: function (event, elements) {
                        if (elements.length > 0) {
                            const clickedElement = elements[0];
                            const label = this.data.labels[clickedElement.index];
                            const value = this.data.datasets[0].data[clickedElement.index];
                            const color = this.data.datasets[0].backgroundColor[clickedElement.index];
                            priorityDetails.label = label;
                            priorityDetails.value = value;
                            priorityDetails.color = color;
                            priorityDetails.visible = true;
                            modalContent.value = priorityData[label].map((item) => ({
                                label: label,
                                source: item
                            }));
                        }
                    }
                }
            });

            // Store the new chart in the barCharts array
            barCharts.value.push(chart);
        };

        const showTrendsModal = () => {
            showLineChartPanel.value = true;
            selectedOptions.value = [dropdown1.value, dropdown2.value, dropdown3.value].filter((option) => option !== 'Select AIT' && option !== 'Select SPK' && option !== 'Select Component');
            const modal = document.getElementById('trendModal');
            modal.classList.add('show');
            modal.style.display = 'block';
            renderBarCharts();
        };

        const renderLineCharts = () => {
            const labels = ['Build 1', 'Build 2', 'Build 3'];
            const randomData = () => Array.from({ length: 3 }, () => Math.floor(Math.random() * 100));

            const lineChartConfigs = [];
            for (let i = 0; i < lineCharts.value.length; i++) {
                const config = {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Priority ' + (i + 1),
                                data: randomData(),
                                fill: false,
                                borderColor: getRandomColor(),
                                tension: 0.1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                grid: { display: false }
                            },
                            y: {
                                grid: { display: false }
                            }
                        }
                    }
                };
                lineChartConfigs.push(config);
            }

            for (let i = 0; i < lineCharts.value.length; i++) {
                new Chart(document.getElementById('priorityChart' + (i + 1)), lineChartConfigs[i]);
            }
        };
        const renderBarCharts = () => {
            const labels = ['P1', 'P2', 'P3', 'P4', 'P5'];

            // Clear existing charts
            barCharts.value.forEach((chart) => {
                if (chart) {
                    chart.destroy();
                }
            });

            barCharts.value = [];
            const container = document.querySelector('#trendModal .modal-body');
            container.innerHTML = '';

            // Iterate over selected options
            selectedOptions.value.forEach((option, index) => {
                const data = chartData[option];

                // Skip if data is not available
                if (!data) return;

                const datasets = [];
                for (let j = 0; j < 3; j++) {
                    const barData = data.map(() => Math.floor(Math.random() * 10)); // Replace with your actual data logic
                    const backgroundColor = getRandomColor();

                    datasets.push({
                        label: `${option} - Bar ${j + 1}`,
                        data: barData,
                        backgroundColor: backgroundColor
                    });
                }

                const config = {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: datasets
                    },
                    options: {
                        responsive: false,
                        width: 800,
                        height: 300,

                        scales: {
                            x: {
                                grid: { display: false }
                            },
                            y: {
                                grid: { display: false }
                            }
                        },
                        plugins: {
                            datalabels: {
                                anchor: 'end',
                                align: 'top',
                                formatter: (value) => value,
                                font: {
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                };

                // Render the chart
                const canvas = document.createElement('canvas');
                canvas.id = `barChart${index}`;
                canvas.width = 800;
                canvas.height = 300;
                canvas.style.marginBottom = '20px';
                container.appendChild(canvas);
                const chart = new Chart(canvas, config);
                barCharts.value.push(chart);
            });
        };

        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        const goBack = () => {
            showLineChartPanel.value = false;
        };

        return {
            dropdown1,
            dropdown2,
            dropdown3,
            allDropdownsSelected,
            priorityDetails,
            showLineChartPanel,
            selectedOptions,
            modalContent,
            lineCharts,
            dropdown1Options,
            dropdown2Options,
            dropdown3Options,
            updateDropdown,
            showChart,
            showTrendsModal,
            barCharts,
            renderBarCharts,
            goBack
        };
    }
};
</script>

<style scoped>
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal.show {
    display: block;
}
/* Add custom styles here */

/* Set a max-width for the canvas inside the modal */
canvas {
    max-width: 100%;
    height: auto;
}
.container {
    max-width: 1000px;
}
.dropdown-toggle {
    width: 100%;
}
.chart-column {
    display: inline-block;
    margin-right: 10px;
}
</style>
