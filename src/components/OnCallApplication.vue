<template src="./OnCallApplication.html"></template>
<script setup lang="ts">
import '@/assets/main.css';
import { ref, onMounted, defineProps } from 'vue';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { Amplify, Auth } from 'aws-amplify'; // Import Amplify and Auth from aws-amplify
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/backend/data/resource'; // Adjust the path based on your project structure

// Generate data client
const client = generateClient<Schema>();

interface OnCallEntry {
  groupName: string;
  day: string;
  contact: string;
  phone: string;
}

const props = defineProps<{ signOut: () => void }>();
const activeTab = ref('schedule');
const showModal = ref(false);
const editIndex = ref<number | null>(null);
const form = ref({ email: '', phone: '', name: '', onCall: false });
const errorMessage = ref('');
const contacts = ref<OnCallEntry[]>([]);
const onCallList = ref<OnCallEntry[]>([]);
const timeOptions = ref(generateTimeOptions());
const timezoneOptions = ref(['GMT', 'EST', 'PST', 'BST', 'CET']);
const selectedTimezone = ref('GMT');
const startTime = ref('');
const selectedMonth = ref(new Date().getMonth());
const selectedYear = ref(new Date().getFullYear());
const userGroup = ref('');
const isReadOnly = ref(false);

async function checkUserGroup() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
    if (groups.includes('TerneuzenAdmin')) {
      userGroup.value = 'TerneuzenAdmin';
      isReadOnly.value = false;
    } else if (groups.includes('TerneuzenReadOnly')) {
      userGroup.value = 'TerneuzenReadOnly';
      isReadOnly.value = true;
    }
  } catch (error) {
    console.error('Error checking user group:', error);
  }
}

async function loadContacts() {
  try {
    const { data } = await client.models.OnCallEntry.list();
    contacts.value = data;
  } catch (error) {
    console.error('Error loading contacts:', error);
  }
}

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

const updatePhoneNumber = (index: number) => {
  const selectedContact = contacts.value.find(contact => contact.name === onCallList.value[index].contact);
  if (selectedContact) {
    onCallList.value[index].phone = selectedContact.phone;
  }
};

const openModal = (event: MouseEvent, index: number | null = null) => {
  event.preventDefault();
  if (index !== null) {
    form.value = { ...contacts.value[index] };
    editIndex.value = index;
  } else {
    form.value = { email: '', phone: '', name: '', onCall: false };
    editIndex.value = null;
  }
  showModal.value = true;
  errorMessage.value = '';
};

const saveContacts = async () => {
  try {
    await client.models.OnCallEntry.create({ input: contacts.value });
  } catch (error) {
    console.error('Error saving contacts:', error);
  }
};

const saveContact = () => {
  const e164Regex = /^\+?[1-9]\d{1,14}$/;
  if (!e164Regex.test(form.value.phone)) {
    errorMessage.value = 'Please enter a valid E.164 phone number.';
    return;
  }
  if (editIndex.value !== null) {
    contacts.value[editIndex.value] = { ...form.value };
  } else {
    contacts.value.push({ ...form.value });
  }
  showModal.value = false;
  saveContacts();
};

const deleteContact = async (index: number) => {
  try {
    await client.models.OnCallEntry.delete({ id: contacts.value[index].id });
    contacts.value.splice(index, 1);
  } catch (error) {
    console.error('Error deleting contact:', error);
  }
};

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

const saveSchedule = async () => {
  const confirmation = confirm('Are you sure you want to save these changes?');
  if (!confirmation) return;
  const schedule = {
    timezone: selectedTimezone.value,
    startTime: startTime.value,
    onCallList: onCallList.value,
  };
  try {
    await client.models.OnCallEntry.create({ input: schedule });
    console.log('Schedule saved:', schedule);
  } catch (error) {
    console.error('Error saving schedule:', error);
  }
};

const loadSchedule = async () => {
  try {
    const savedSchedule = await client.models.OnCallEntry.list();
    if (savedSchedule) {
      const schedule = savedSchedule.data;
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
  } catch (error) {
    console.error('Error loading schedule:', error);
  }
};

const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

onMounted(async () => {
  await checkUserGroup();
  await loadContacts();
  generateCalendar();
});
</script>