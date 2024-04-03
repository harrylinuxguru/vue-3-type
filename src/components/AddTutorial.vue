<template>
  <div class="submit-form">
    <div v-if="isLoggedIn()">
      <div class="form-group">
        <label for="name">name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="tutorial.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="address">address</label>
        <input
          class="form-control"
          id="address"
          required
          v-model="tutorial.address"
          name="address"
        />
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>
    <div v-if="saveTutorial()">
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
    <div v-else-if="!isLoggedIn()">
      <h4>Please log in to access this page!</h4>
      <!-- <button class="btn btn-success" @click="newTutorial">Add</button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DataService from "@/services/DataService";
import Tutorial from "@/types/Tutorial";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: 0,
        name: "",
        address: "",
        stars: "",
        imageurl: "",
        published: false,
      } as Tutorial,
      submitted: false,
    };
  },
  methods: {
    isLoggedIn() {
      // Implement your authentication logic here
      // For example, check if there's a token in localStorage
      return localStorage.getItem('accessToken') !== null;
    },
    saveTutorial() {
      let data = {
        name: this.tutorial.name,
        address: this.tutorial.address,
        
      };

      DataService.create(data)
        .then((response: ResponseData) => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = {} as Tutorial;
    },
  },
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>@/types/Hotell
