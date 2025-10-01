<template>
  <div
    class="modal fade"
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
          <h5 class="modal-title" id="addBranchModalLabel">Add Branches</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="branch" class="form-label">Branches</label>
            <div v-if="branches">
              <el-select
                v-model="selectedBranch"
                placeholder="Select a branch"
                style="width: 100%"
              >
                <el-option
                  v-for="branch in branches"
                  :key="branch.id"
                  :label="`${branch.name} (${branch.reference ? branch.reference : ''})`"
                  :value="branch.id"
                />
              </el-select>
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
            @click="saveBranch"
            :disabled="!selectedBranch"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  visible: { type: Boolean, default: false },
  branches: { type: Array, default: () => [] }
});

const emit = defineEmits(["close", "save"]);

const selectedBranch = ref("");

function saveBranch() {
  emit("save", selectedBranch.value);
  selectedBranch.value = "";
}

onMounted(() => {
  if (props.visible) {
    selectedBranch.value = "";
  }
});
</script>
<style></style>