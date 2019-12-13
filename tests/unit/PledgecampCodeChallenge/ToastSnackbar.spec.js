import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import ToastSnackbar from "@/components/PledgecampCodeChallenge/ToastSnackbar.vue";
import VueMaterial from "vue-material";

const localVue = createLocalVue();
localVue.use(VueMaterial);
const propsData = { notifications: ["Testing1", "Testing2", "Testing3"] };

describe("ToastSnackbar.vue", () => {
  var wrapper;

  it("positions left", () => {
    wrapper = shallowMount(ToastSnackbar, { propsData, localVue });
    expect(wrapper.vm.position).toBe("left");
  });

  it("is active when there is notifications", () => {
    wrapper = shallowMount(ToastSnackbar, { propsData, localVue });
    expect(wrapper.vm.active).toBe(true);
  });

  it("is inactive when there is 0 notification", () => {
    wrapper = shallowMount(ToastSnackbar, { propsData, localVue });
    wrapper.setProps({ notifications: [] });
    expect(wrapper.vm.active).toBe(false);
  });

  it("shows the last notification", () => {
    wrapper = shallowMount(ToastSnackbar, { propsData, localVue });
    const span = wrapper.find("span");
    expect(span.text()).toBe("Testing3");
  });
});
