# pledgecamp-code-challenge

By Joe

## Project setup, start, and test

### Setup

Use `yarn` / `yarn install` to install packages needed

```
yarn install
```

### Compiles and hot-reloads for development

Use `yarn serve` to start the project, and check it out on localhost:8080 (or other port if 8080 is occupied)

```
yarn serve
```

### Testing

Use `yarn test:unit` to run the unit tests.

## Functionalities of the project

It majorly contains an index page, showing list of project cards. Each card represents an ongoing crowdfunding project, and display the information on it.

In the bottom-left of the page, snackbar-like toast notifications will be displayed, while index page is mounted and API fetching request is called. This will notice user his/her project 1) has reach certain percentage of goal, or 2) is featured.

In the bottom-right of the page, a FAB could be clicked to trigger a create form for new project. No form validation is conducted for this coding test.

On top of the project cards, there is a createdSinceFilter. Once user choose a date, it will call the GET index request with "createdSince" parameter.

## Vue-Material

Vue-Material is used in this project.

## API, Database and Data structure
### Database
A fake DB has been created in ```/src/fake-db```.

### API
```axios-mock-adapter``` has been used for a mock API, accepting two requests for project: ```index``` and ```create```.

### Data structure
Basically the data of each "project" is the same as described in the coding challenge document. One adjustment has been made, `featured: :boolean` is added in the root of it so as to identify whether the project is featured or not. Example as following:

```
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
}
```
