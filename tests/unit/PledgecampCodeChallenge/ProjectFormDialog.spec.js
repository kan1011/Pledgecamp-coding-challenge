import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import ProjectFormDialog from "@/components/PledgecampCodeChallenge/ProjectFormDialog.vue";
import VueMaterial from 'vue-material'

const localVue = createLocalVue()
localVue.use(VueMaterial)

const propsData = { 
    showDialog: false,
    handleCloseFormDialog: function(){},
    handleSubmit: function(){}
 };

describe("ProjectFormDialog.vue", () => {
  var wrapper;

  it("is active when passing showDialog: true", () => {
    wrapper = shallowMount(ProjectFormDialog, { propsData, localVue });
    expect(wrapper.vm.active).toBe(false);

    wrapper.setProps({ ...wrapper.vm.props, showDialog: true })
    expect(wrapper.vm.active).toBe(true)
  });
});
