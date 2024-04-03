<template>
  <div v-if="isLoggedIn" class="list row">
    <div class="col-md-4">
      <select v-model="selectedTutorial" @change="fetchSelectedTutorial">
        <option value="">Select a tutorial</option>
        <option v-for="tutorial in tutorials" :value="tutorial">{{ tutorial.name }}</option>
      </select>
    </div>
    <!-- Your existing content goes here -->
  </div>
  <div v-else>
    <p>Please log in to access this page.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TutorialDataService from "@/services/TutorialDataService";
import Tutorial from "@/types/Tutorial";
import ResponseData from "@/types/ResponseData";
import { isAuthenticated } from "@/services/authhelper";

export default defineComponent({
  name: "TutorialsList",
  data() {
    return {
      tutorials: [] as Tutorial[],
      selectedTutorial: {} as Tutorial,
      isLoggedIn: false,
    };
  },
  methods: {
    async retrieveTutorials() {
      try {
        const response: ResponseData = await TutorialDataService.getAll();
        this.tutorials = response.data;
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSelectedTutorial() {
      if (this.selectedTutorial && this.selectedTutorial.id) {
        try {
          const response: ResponseData = await TutorialDataService.get(this.selectedTutorial.id);
          this.selectedTutorial = response.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  async mounted() {
    this.isLoggedIn = await isAuthenticated(); // Check if user is authenticated
    if (this.isLoggedIn) {
      this.retrieveTutorials(); // Fetch tutorials only if user is logged in
    }
  },
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
