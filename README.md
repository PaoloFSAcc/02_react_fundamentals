# 02_react_fundamentals
Pluralsight course by Liam McLennan for Full Stack University at Accenture

1. The clicker app differs from the video since create-react-app now delivers a function component, instead of a class component
2. Create authorquiz app with create-react-app
3. Add bootstrap: get it from: https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css
4. Save that to src: You have to edit the css to make it pretty, otherwise bad formatting is copied from the browser.
5. Be careful when passing props with spread operator
6. For testing, the instructions use enzyme adapter with react 16, this has not been yet officially released so I used: https://www.npmjs.com/package/@wojtekmaj/enzyme-adapter-react-17
7. Even though I have the same code as the one found in another github repository, the last test does not run. (https://github.com/andasimion/AuthorQuiz-react-redux/blob/master/src/AuthorQuiz.test.js)
8. A bit distracted on the Form Library part (JSONSchemaForm), check Chapter 6, video Form Libraries, minute 3:13
9. React-Redux: Substitute state for store. Create a store, taking a reducer as a parameter.
    1. Reducer is a function that takes the existing state and an action and uses that to generate the next state. 
    2. To use the store, we need to wrap every component that needs access to the store in a ReactRedux.Provider
    3. mapDispatchToProps maps events that can come up from author quiz components to actions that we publish to the redux store. (onAnswerSelected and onContinue)
    4. Once props and events are provided by the redux store, you can delete them from author quiz and who calls it
    5. Add the elements to the original state which was empty up to this point
    6. For the add author, wrap with connect and wrap that with withRouter to be able to go back
    7. Since routing is managed inside AddAuthor we can remove it from index