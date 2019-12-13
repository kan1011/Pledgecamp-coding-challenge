<template>
  <div id="project-form-dialog">
    <md-dialog
      :md-active="active"
      :md-click-outside-to-close="false"
      :md-close-on-esc="false"
      @md-closed="clearData"
    >
      <md-dialog-title>New Project</md-dialog-title>
      <md-dialog-content>
        <form class="md-layout" @submit.prevent="handleSubmit">
          <md-field>
            <label>Project Name</label>
            <md-input v-model="project.projectName" />
          </md-field>
          <md-field>
            <label>Category</label>
            <md-select v-model="project.categoryId">
              <md-option value="1">Test Category</md-option>
              <md-option value="2">Test Category 2</md-option>
              <md-option value="3">Test Category 3</md-option>
            </md-select>
          </md-field>
          <md-field>
            <label>Description</label>
            <md-textarea v-model="project.projectDescription" />
          </md-field>
          <md-field>
            <label>Funding Goal</label>
            <span class="md-prefix">HK$</span>
            <md-input type="number" v-model="project.fundingGoal" />
          </md-field>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="handleSubmit">Submit</md-button>
        <md-button @click="handleCloseFormDialog">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import axios from "axios";
/* eslint-disable no-console */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

export default {
  name: "ProjectFormDialog",
  props: {
    showDialog: Boolean,
    refreshProjects: Function,
    handleCloseFormDialog: Function
  },
  data: function() {
    return {
      project: {
        projectName: "",
        projectDescription: "",
        categoryId: "",
        categoryName: "",
        fundingGoal: 0
      }
    };
  },
  computed: {
    active: function() {
      return this.showDialog;
    }
  },
  methods: {
    handleSubmit: function() {
      axios
        .post("/api/projects", this.project)
        .then(response => {
        //   console.log("message", response.data.message);
          this.handleCloseFormDialog();
          this.refreshProjects();
        })
        .catch(error => {
        //   console.log("error", error.message);
        });
    },
    clearData: function() {
      this.project = {
        projectName: "",
        projectDescription: "",
        categoryId: "",
        categoryName: "",
        fundingGoal: 0
      };
    }
  }
};
</script>
