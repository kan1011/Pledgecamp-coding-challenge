import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import IndexPage from "@/components/PledgecampCodeChallenge/IndexPage.vue";
import axios from "axios";
import VueMaterial from 'vue-material'

const localVue = createLocalVue()
localVue.use(VueMaterial)

var wrapper;

afterEach = async () => {
  await wrapper.destroy();
};

describe("IndexPage.vue", () => {
  afterEach = async () => {
    await wrapper.destroy();
  };

  it("has a mounted hook", () => {
    expect(typeof IndexPage.mounted).toBe("function");
  });

  it("mounted with API Get call", done => {
    const spy = jest.spyOn(axios, "get");
    wrapper = shallowMount(IndexPage, { localVue });

    expect(spy).toHaveBeenCalledWith("/api/projects");
    done();
  });

  it("pushs notification", done => {
    wrapper = shallowMount(IndexPage, { localVue });

    const beforePush = wrapper.vm.notifications.length;
    wrapper.vm.pushNotification("Testing");
    expect(wrapper.vm.notifications.length).toBe(beforePush + 1);
    expect(wrapper.vm.notifications[wrapper.vm.notifications.length - 1]).toBe(
      "Testing"
    );
    done();
  });

  it("reads notifications", done => {
    wrapper = shallowMount(IndexPage, { localVue });

    wrapper.setData({ notifications: ["Testing1", "Testing2"] });
    expect(wrapper.vm.notifications.length).toBe(2);
    expect(wrapper.vm.notifications[wrapper.vm.notifications.length - 1]).toBe(
      "Testing2"
    );
    wrapper.vm.readNotification();
    expect(wrapper.vm.notifications.length).toBe(1);
    expect(wrapper.vm.notifications[wrapper.vm.notifications.length - 1]).toBe(
      "Testing1"
    );
    done();
  });

  it("opens and closes form dialog", done => {
    wrapper = shallowMount(IndexPage, { localVue });

    wrapper.setData({ showFormDialog: false });
    wrapper.vm.openFormDialog();
    expect(wrapper.vm.showFormDialog).toBe(true);
    wrapper.vm.closeFormDialog();
    expect(wrapper.vm.showFormDialog).toBe(false);
    done();
  });

  it("refreshs proejcts", done => {
    wrapper = shallowMount(IndexPage, { localVue });
    const spy = jest.spyOn(axios, "get");

    wrapper.vm.refreshProjects();
    expect(wrapper.vm.createdSinceFilter).toBe(null);
    expect(spy).toHaveBeenCalled();
    done();
  });

  it("filters project by createdSinceFilter", done => {
    wrapper = shallowMount(IndexPage, { localVue });
    const spy = jest.spyOn(axios, "get");

    wrapper.setData({ createdSinceFilter: "2019-01-01" });
    expect(wrapper.vm.createdSinceFilter).toBe("2019-01-01");
    expect(spy).toHaveBeenLastCalledWith("/api/projects", {
      params: { createdSince: "2019-01-01" }
    });
    done();
  });
});
