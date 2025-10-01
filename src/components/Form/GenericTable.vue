<template>
  <div class="card">
    <!-- Header -->
    <div class="card__header">
      <div class="card__header--action">
        <slot name="actions"></slot>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table class="table align-middle">
        <thead class="table-light">
          <tr>
            <th v-for="col in columns" :key="col.key">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in rows" :key="i">
            <td
              v-for="col in columns"
              :key="col.key"
              :class="{ 'clickable': col.key === 'name' }"
              @click="col.key === 'name' ? $emit('updateBranchSettings', row) : null"
            >
              {{ row[col.key] }}
            </td>
          </tr>
          <tr v-if="rows.length === 0">
            <td :colspan="columns.length" class="text-center text-muted">
              No Branchs available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: "Data Table" },
  columns: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
});
</script>
