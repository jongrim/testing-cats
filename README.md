# Goals and Description

The goal of this project is to demonstrate patterns we can follow for testing our application. The intent is to create examples that can serve as guidance for later. It will demonstrate this at four levels which correspond to the [testing trophy](https://kentcdodds.com/blog/write-tests):

- Static Types
- Unit tests
- Integration tests
- e2e tests

To demonstrate that, I intend to build a small application that uses an external API for data loading, has some user interactions that cause on screen updates, and includes at least some variation of a form. The application will be written in TypeScript and make use of Redux. Optionally, there may also be a state machine driven component.

## Measuring success

The first measure of success will be the completion of the items listed in the [use cases](#use-cases) section.

The second measure of success will be feedback from the team - I expect people to provide feedback regarding if the use cases are representative of what we anticipate building and if the presented examples are understandable and a good guiding point. It is your responsibility to ask questions and point out difficulties.

## Use cases

These specific use cases we'll be demonstrated:

- [x] Pure JS / TS functions
- - [Util function testing](./src/features/CatCollector/utils.test.ts)

- [x] Mocking imports
- - [Creating a mock version of an api](./src/features/CatCollector/api/__mocks__/cats.ts)
- - [Mocking endpoints for integration testing](./src/App.test.tsx)

- [x] Functional component using hooks
- - [Testing a functional component with react-testing-library](./src/features/CatCollector/CatCollector.test.tsx)

- [x] Redux connected component
- - [Testing a functional component with react-testing-library](./src/features/CatCollector/CatCollector.test.tsx)

- [x] [Redux reducer](./src/features/CatCollector/redux.test.ts)

- [x] [Redux thunk](./src/features/CatCollector/redux.test.ts)

- [x] [API Testing](./src/features/CatCollector/api/cats.test.ts)

- [ ] State machine driven component (stretch goal as it's unclear if we'll make use of these)

## Use cases outside of scope

To limit scope, the following will not be demonstrated:

- Authentication flows

## Libraries that will be used

Current libraries that will be used as part of the exercise:

- [Jest](https://jestjs.io/)
- The [testing-library](https://testing-library.com/) family
- [Cypress](https://www.cypress.io/)

### Why these?

First off, as of create-react-app 3.3.0 Jest and Testing-Library come bundled automatically. This makes them the de facto community standard and many people will either already be, or will become, familiar with their usage. If we stay inline with the community we increase the odds of being able to find support when needed, and that any new team members will already be familiar with the library.

Regarding Cypress, it is regularly spoken highly of by the community and my own experience has mirrored that. Additionally, this library has been selected for use by the SDET team for their tests so it will be helpful to be aligned on it.

### What about Enzyme?

Enzyme is replaced by testing-library. There are plenty of google results that can point to debates between the two, but the main arguments for using `react-testing-library` over Enzyme are that it encourages good UI testing patterns where your tests mimic how a user will interact with your site / component. It is too easy in Enzyme to create brittle tests that are linked to implementation details such as prop and state variable names. This stance is also supported by community resources including the [ThoughtWorks Technology Radar](https://www.thoughtworks.com/radar/languages-and-frameworks?blipid=201904035).
