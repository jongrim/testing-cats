# Goals and Description

The goal of this project is to demonstrate the patterns we'll use for testing our application. It will demonstrate this at four levels which correspond to the [testing trophy](https://kentcdodds.com/blog/write-tests):

- Static Types
- Unit tests
- Integration tests
- e2e tests

To demonstrate that, I intend to build a small application that uses an external API for data loading, has some user interactions that cause on screen updates, and includes at least some variation of a form.

## Use cases

These specific use cases we'll be demonstrated:
[] Pure JS / TS functions
[] Functional component using hooks
[] Redux connected component
[] Redux reducer
[] Redux thunk
[] State machine driven component (stretch goal as it's unclear if we'll make use of these)

## Use cases outside of scope

To limit scope, the following will not be demonstrated:

- Authentication flows

## Libraries that will be used

I have closesly followed the development and progress of testing libraries for approximately the last year and a half. As such, I already have strong opinions as to what libraries will deliver the best results and experience. If you disagree and believe another library should be considered, I am happy to accomodate pending a discussion about the merits of such. Right now, I see more value in establishing what good tests look like so that developers have a clear pattern to follow in the future.

Current libraries that will be used as part of the exercise:

- [Jest](https://jestjs.io/)
- The [testing-library](https://testing-library.com/) family
- [Cypress](https://www.cypress.io/)
