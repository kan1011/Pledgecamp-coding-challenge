import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import ProjectCard from "@/components/PledgecampCodeChallenge/ProjectCard.vue";
import VueMaterial from "vue-material";

const localVue = createLocalVue();
localVue.use(VueMaterial);

const propsData = {
  project: {
    projectId: "8182fad6-06df-4af4-9fad-311578efb836",
    projectName: "Project 2",
    projectDescription:
      "<p>A short film and social justice initiative about the trauma of parent/child separation. 2</p>",
    categoryId: "1",
    categoryName: "Test Category",
    fundingGoal: "500000",
    percentageComplete: "30",
    featured: true,
    createdAt: "2019-10-01T13:45:30"
  }
};

describe("ProjectCard.vue", () => {
  var wrapper;

  it("displays project title, category and description", () => {
    wrapper = shallowMount(ProjectCard, { propsData, localVue });
    const title = wrapper.find("#title");
    const category = wrapper.find("#category");
    const description = wrapper.find("#description")
    expect(title.text()).toBe("Project 2");
    expect(category.text()).toBe("Test Category");
    expect(description.text()).toBe("A short film and social justice initiative about the trauma of parent/child separation. 2")
  });

  it("displays project published date in YYYY-MM-DD format", () => {
    wrapper = shallowMount(ProjectCard, { propsData, localVue });
    const publishedAt = wrapper.find("#published-at");
    expect(publishedAt.text()).toBe("2019-10-01")
  });

  it("displays percentage completed", () => {
    wrapper = shallowMount(ProjectCard, { propsData, localVue });
    const percentageCompleted = wrapper.find("#percentage-completed")
    expect(percentageCompleted.text()).toEqual(expect.stringContaining("30"))
  })

  it("displays funding goal", () => {
    wrapper = shallowMount(ProjectCard, { propsData, localVue });
    const fundingGoal = wrapper.find("#funding-goal")
    expect(fundingGoal.text()).toEqual(expect.stringContaining("$500000"))
  })
});
