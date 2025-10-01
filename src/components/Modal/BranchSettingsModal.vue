<template>
  <div
    class="modal fade setting-branch-modal"
    :class="{ show: visible }"
    :style="{ display: visible ? 'block' : 'none' }"
    tabindex="-1"
    aria-labelledby="addBranchModalLabel"
    aria-hidden="!visible"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title" id="addBranchModalLabel">Branches Settings</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <div class="branch-hours-info">
            Branch working hours are 00:00 - 00:00
          </div>
          <div class="form">
           <div class="form-group">
              <label for="reservation_duration" class="label required">Reservation Duration(minutes)</label>
              <el-input v-model="form.reservation_duration" id="reservation_duration" class="input" type="number" placeholder="Reservation duration" />
           </div>
           <div class="form-group">
              <TimeSlot dayName="Satrday" />
           </div>
          </div>

        </div>

        <!-- Actions -->
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TimeSlot from "../Form/TimeSlot.vue";
import { ref } from "vue";

const props = defineProps({
  visible: { type: Boolean, default: false },
  branch: {type: Object, default: () => {}}
});

const form = ref({
  reservation_duration: null,
  reservation_times: {}
})

const emit = defineEmits(["close", "save"]);

</script>
