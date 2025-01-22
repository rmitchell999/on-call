<template src="./OnCallApplicationReadonly.html"></template>

<script setup lang="ts">
import '@/assets/main.css';
import { ref, onMounted, defineProps } from 'vue';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

interface OnCallEntry {
  groupName: string;
  day: string;
  contact: string;
  phone: string;
}

const props = defineProps<{ signOut: () => void }>();
const activeTab = ref('schedule');
const contacts = ref([
  { email: 'jeffrey@example.com', phone: '+31627296098', name: 'Jeffrey van de...', onCall: true },
  { email: 'scott@example.com', phone: '+447785294418', name: 'Scott Beaton', onCall: false },
]);
const onCallList = ref<OnCallEntry[]>([]);
const timeOptions = ref(generateTimeOptions());
const timezoneOptions = ref(['GMT', 'EST', 'PST', 'BST', 'CET']);
const selectedTimezone = ref('GMT');
const startTime = ref('');
const selectedMonth = ref(new Date().getMonth());
const selectedYear = ref(new Date().getFullYear());

function generateTimeOptions() {
  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i < 10 ? `0${i}` : i;
      const minute = j < 10 ? `0${j}` : j;
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
}

const generateCalendar = () => {
  const now = new Date(selectedYear.value, selectedMonth.value);
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  const days = eachDayOfInterval({ start, end });
  onCallList.value = days.map(day => ({
    groupName: 'Terneuzen',
    day: format(day, 'EEEE dd-MM-yyyy'),
    contact: '',
    phone: ''
  }));
  loadSchedule();
};

const loadSchedule = () => {
  const savedSchedule = localStorage.getItem(`schedule-${selectedYear.value}-${selectedMonth.value}`);
  if (savedSchedule) {
    const schedule = JSON.parse(savedSchedule);
    selectedTimezone.value = schedule.timezone;
    startTime.value = schedule.startTime;
    onCallList.value.forEach(entry => {
      const savedEntry = schedule.onCallList.find((e: OnCallEntry) => e.day === entry.day);
      if (savedEntry) {
        entry.contact = savedEntry.contact;
        entry.phone = savedEntry.phone;
      }
    });
  }
};

const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

onMounted(() => {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts) {
    contacts.value = JSON.parse(savedContacts);
  }
  generateCalendar();
});
</script>

<style src="./OnCallApplication.css" scoped></style>