<template>
  <div class="day-group">
    <div class="day-label">{{ dayName }}</div>

    <!-- Wrapper that looks like an input -->
    <div class="slots-wrapper">
      <div class="slots-input">
        <div class="time-input">
            <el-time-picker v-model="value1" placeholder="Arbitrary time" />
            <span>:</span>
            <el-time-picker v-model="value1" placeholder="Arbitrary time" />
        </div>
      </div>
      <button type="button" class="add-btn" @click="addSlot">+</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  dayName: { type: String, default: '' },
});
</script>
