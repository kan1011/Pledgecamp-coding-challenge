import mock from "./../mock";

const projectDB = {
  projects: [
    {
      projectId: "8182fad6-06df-4af4-9fad-311578efb835",
      projectName: "Project 1",
      projectDescription:
        "<p>A short film and social justice initiative about the trauma of parent/child separation.</p>",
      categoryId: "1",
      categoryName: "Test Category",
      fundingGoal: "100000",
      percentageComplete: "80",
      featured: false,
      createdAt: "2019-12-31T13:45:30"
    },
    {
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
    },
    {
      projectId: "8182fad6-06df-4af4-9fad-311578efb837",
      projectName: "Project 3",
      projectDescription:
        "<p>A short film and social justice initiative about the trauma of parent/child separation. 3</p>",
      categoryId: "1",
      categoryName: "Test Category",
      fundingGoal: "100000",
      percentageComplete: "49",
      featured: false,
      createdAt: "2019-11-13T13:45:30"
    },
    {
      projectId: "8182fad6-06df-4af4-9fad-311578efb838",
      projectName: "Project 4",
      projectDescription:
        "<p>A short film and social justice initiative about the trauma of parent/child separation. 3</p>",
      categoryId: "1",
      categoryName: "Test Category",
      fundingGoal: "300000",
      percentageComplete: "75",
      featured: true,
      createdAt: "2019-11-30T13:45:30"
    }
  ]
};

/* eslint-disable no-console */
mock.onGet("/api/projects").reply(request => {
  return [
    200,
    request.params && request.params.createdSince
      ? projectDB.projects.filter(
          project =>
            Date.parse(project.createdAt) >=
            Date.parse(request.params.createdSince)
        )
      : projectDB.projects
  ];
});

mock.onPost("/api/projects").reply(request => {
  const data = JSON.parse(request.data);
    projectDB.projects = [...projectDB.projects, {
        projectId: Math.random().toString(36).substr(2, 5), // just simply giving a random id
        projectName: data.projectName,
        projectDescription: `<p>${data.projectDescription}</p>`,
        categoryId: data.categoryId,
        categoryName: {"1": "Test Category", "2": "Test Category 2", "3": "Test Category 3"}[data.categoryId] || "Other",
        fundingGoal: data.fundingGoal.toString(),
        percentageComplete: "0",
        featured: false,
        createdAt: new Date().toISOString()
    }]
  return [201, { message: "Project created" }];
});
