<template>
  <div class="event-class">
    <div class="event-card">
      <p>{{ event?.studentId }}</p>
      <span>{{ event?.name }} {{ event?.surname }}</span>
      <p>{{ event?.gpa }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EventItem, StudentItem } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  event: {
    type: Object as PropType<StudentItem>,
    require: true
  }
})
</script>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
