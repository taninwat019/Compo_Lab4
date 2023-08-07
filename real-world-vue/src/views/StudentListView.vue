<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import EventCard2 from '@/components/EventCard2.vue'
import type { EventItem } from '@/type'
import { type Ref, ref } from 'vue'
import StudentService from '@/services/StudentService'
import StudentCard from '../components/StudentCard.vue'

const events: Ref<Array<EventItem>> = ref([])

StudentService.getEvent().then((response) => {
  events.value = response.data
})
</script>

<template>
  <h1>Events For Good</h1>
  <main class="events">
    <StudentCard v-for="event in events" :key="event.id" :event="event"></StudentCard>
  </main>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.events2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: right;
}
</style>
