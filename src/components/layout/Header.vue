<template>
    <div class="header">
        <div class="container header-wrapper">
            <h1 class="header-wrapper__title">Reservation</h1>
            <BaseButton type="button" class="danger compact" @click="$emit('disableReservation')">Disable Reservation</BaseButton>
        </div>
    </div>
</template>

<script>
import BaseButton from '../Form/Button.vue'
export default {
    name: 'Header',
    components: {
        BaseButton
    },
    emits: ['disableReservation']
}
</script>