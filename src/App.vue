

<template>
  <div class="main-app">
    <Header @disableReservation="handleDisableReservation" />
    <div class="main-content">
      <div class="conatiner">
        <GenericTable
          title="Branches"
          :columns="columns"
          :rows="branches"
          @updateBranchSettings="handleUpdateBranchSettings"
        >
          <!-- Slot for actions -->
          <template #actions>
            <Button type="button" class="neutral compact" @click="showAddModal = true">Add Branch</Button>
          </template>
        </GenericTable>
      </div>
    </div>

    <AddBranchModal
      :visible="showAddModal"
      :branches="allBranches.filter(b => !b.accepts_reservations)"
      @close="showAddModal = false"
      @save="HandleAddBranch"
    />

    <BranchSettingsModal :visible="showSettingsModal" :branch="settingModalBranch" @close="showSettingsModal = false" />
  </div>
</template>

<script setup>
import Header from './components/layout/Header.vue';
import GenericTable from './components/Form/GenericTable.vue';
import Button from './components/Form/Button.vue';
import AddBranchModal from './components/Modal/AddBranchModal.vue';
import BranchSettingsModal from './components/Modal/BranchSettingsModal.vue';
import { onMounted, ref } from 'vue';
import { getBranches, updateBranch } from './services/reservation.js';

const columns = [
  { key: 'name', label: 'Branch'},
  {key: 'reference', label: 'Reference'},
  {key: 'number_of_tables', label: 'Number of Tables'},
  {key: 'reservation_duration', label: 'Reservation Duration'},
]
const allBranches = ref([])
const branches = ref([])
let showAddModal = ref(false)
let showSettingsModal = ref(false);
let settingModalBranch = ref(null);

async function fetchBranches() {
  try {
    const res = await getBranches();
    allBranches.value = res.data.data.map(branch => {
      // count enabled tables
      let tablesCount = 0;
      if (Array.isArray(branch.sections)) {
        branch.sections.forEach(section => {
          if (Array.isArray(section.tables)) {
            tablesCount += section.tables.filter(t => t.accepts_reservations).length;
          }
        });
      }

      return {
        ...branch,
        number_of_tables: tablesCount,
      };
    });

    // Branches that accept reservations
    branches.value = allBranches.value.filter(b => b.accepts_reservations);
  } catch (error) {
    console.error('Error fetching branches:', error);
  }
}

function handleDisableReservation() {
  allBranches.value = allBranches.value.map(branch => ({
    ...branch,
    accepts_reservations: false
  }));

  branches.value = allBranches.value.filter(b => b.accepts_reservations);
}

async function HandleAddBranch(branchId) {
  try {
    await updateBranch(branchId, { accepts_reservations: true});
    await fetchBranches();
    showAddModal.value = false;
  } catch (error) {
    console.log("Update branch Error", error);
  }
}

function handleUpdateBranchSettings(branch) {
  settingModalBranch.value = branch;
  showSettingsModal.value = true;
}

onMounted(async () => {
  // Fetch branches
  fetchBranches()
})
</script>
