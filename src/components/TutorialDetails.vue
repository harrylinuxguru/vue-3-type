<template>
  <div v-if="currentTutorial.id" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="currentTutorial.name"
        />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <input
          type="text"
          class="form-control"
          id="address"
          v-model="currentTutorial.address"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteTutorial">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateTutorial">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TutorialDataService from "@/services/DataService";
import Tutorial from "@/types/Tutorial";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "tutorial",
  data() {
    return {
      currentTutorial: {} as Tutorial,
      message: "",
    };
  },
  methods: {
    getTutorial(id: any) {
      TutorialDataService.get(id)
        .then((response: ResponseData) => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updatePublished(status: boolean) {
      let data = {
        id: this.currentTutorial.id,
       name: this.currentTutorial.name,
        address: this.currentTutorial.address,
        published: status,
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.currentTutorial.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id);
  },
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>@/services/DataService@/types/Hotell
