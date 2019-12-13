<template>
    <div id="project-card" class="project-card">
        <md-card>
            <md-card-header>
                <div class="md-title" id="title">{{ project.projectName }}</div>
                <div class="md-subhead project-subhead">
                    <div id="category">{{ project.categoryName }}</div>
                    <div id="published-at">{{ publisedAt }}</div>
                </div>
                <md-divider class="header-divider"/>
                <md-badge class="md-square badge-top-right featured-badge" md-content="Featured" v-if="project.featured"></md-badge>
            </md-card-header>
            <md-card-content>
                <div id="description" >
                    <span v-html="project.projectDescription"/>
                </div>
                <div class="funding-progress-section">
                    <div id="percentage-completed" class="funding-progress-percentage md-caption">{{ project.percentageComplete }}% Completed</div>
                    <md-progress-bar class="md-accent" md-mode="determinate" :md-value="parseFloat(project.percentageComplete)"/>
                </div>
                <div id="funding-goal" class="funding-goal-section md-caption">
                    Funding Goal: ${{ project.fundingGoal }}
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: "ProjectCard",
    props: {
        project: Object
    },
    computed: {
        publisedAt: function() {
            return moment(this.project.createdAt).format("YYYY-MM-DD")
        }
    }
}
</script>

<style>
    .funding-goal-section {
        text-align: right;
        margin-top: 10px;
    }

    .project-card {
        width: 300px;
        max-width: 100%;
        margin: 10px 10px;
    }

    .funding-progress-percentage {
        text-align: right;
    }

    .header-divider {
        margin-top: 10px;
    }

    .badge-top-right {
        right: initial;
        top: -5px;
        left: -8px;
    }

    .featured-badge {
        font-size: 13px;
        font-weight: bold;
        height: 22px !important;
    }

    .project-subhead {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
    }
</style>