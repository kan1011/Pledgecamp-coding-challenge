<template>
  <div id="pledgecamp">
    <md-card class="main-content">
      <md-card-header class="main-card-header">
        <div class="md-title">
          Pledgecamp Code Challenge
        </div>
        <div class="md-subhead">
          Joe
        </div>
        <md-divider class="main-header-divider" />
      </md-card-header>
      <md-card-content class="main-card-content">
        <div class="filter-section">
          <md-datepicker v-model="createdSinceFilter">
            <label>Filter Created Since</label>
          </md-datepicker>
        </div>
        <ProjectCardList v-bind:projects="projects" />
      </md-card-content>
    </md-card>
    <ToastSnackbar
      @read-notification="readNotification"
      :notifications="notifications"
    />
    <md-button class="md-fab md-fab-bottom-right" @click="openFormDialog">
      <md-icon>add</md-icon>
    </md-button>
    <ProjectFormDialog
      :showDialog="showFormDialog"
      :refreshProjects="refreshProjects"
      :handleCloseFormDialog="closeFormDialog"
    />
  </div>
</template>

<script>
import ProjectCardList from "./ProjectCardList";
import ToastSnackbar from "./ToastSnackbar";
import ProjectFormDialog from "./ProjectFormDialog";
import axios from "axios";
import moment from "moment";
/* eslint-disable no-console */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
export default {
  name: "Pledgecamp",
  data: function() {
    return {
      projects: [],
      notifications: [],
      createdSinceFilter: null,
      showFormDialog: false
    };
  },
  mounted: async function() {
    try {
      const response = await axios.get("/api/projects");
      if (response.status == 200) {
        this.projects = response.data;
        await this.projects.map(project => {
          if (project.featured) {
            this.pushNotification(`${project.projectName} is featured!`);
          }
          if (parseFloat(project.percentageComplete) >= 50) {
            this.pushNotification(
              `${project.projectName} has reached 50% of the goal!`
            );
          }
        });
      } else {
        // console.log("Error Code", response.status);
      }
    } catch (error) {
      //   console.log("Error on getting projects index", error.message);
    }
  },
  methods: {
    readNotification: function() {
      this.notifications.pop();
    },
    pushNotification: function(message) {
      this.notifications.push(message);
    },
    openFormDialog: function() {
      this.showFormDialog = true;
    },
    closeFormDialog: function() {
      this.showFormDialog = false;
    },
    refreshProjects: function() {
      this.createdSinceFilter = null; // clear filter to ensure refresh effect is visible
      axios
        .get("/api/projects")
        .then(response => {
          this.projects = response.data;
        })
        .catch(error => {
          //   console.log("Error on getting projects index", error.message);
        });
    }
  },
  watch: {
    createdSinceFilter: function(selectedDate) {
      let params = {};
      if (selectedDate) {
        params = {
          ...params,
          createdSince: moment(selectedDate).format("YYYY-MM-DD")
        };
      }
      axios
        .get("/api/projects", { params })
        .then(response => {
          this.projects = response.data;
        })
        .catch(error => {
          //   console.log("Error on getting projects index", error.message);
        });
    }
  },
  components: {
    ProjectCardList,
    ToastSnackbar,
    ProjectFormDialog
  }
};
</script>

<style>
#pledgecamp {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.main-content {
  width: 1024px;
  max-width: 100%;
}

.main-card-header {
  text-align: center;
}

.main-card-content {
  padding: 10px 25px !important;
}

.main-header-divider {
  margin-top: 20px;
}

.filter-section {
  width: 200px;
}
</style>
