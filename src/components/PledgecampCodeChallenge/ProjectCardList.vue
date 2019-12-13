<template>
    <div id="project-card-list">
        <ProjectCard
            v-for="project in projects"
            v-bind:project="project"
            v-bind:key="project.projectId"
        />
    </div>
</template>

<script>
import ProjectCard from './ProjectCard'
export default {
    name: "ProjectCardList",
    props: {
        projects: Array
    },
    components: {
        ProjectCard
    }
}
</script>

<style>
#project-card-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
}
</style>