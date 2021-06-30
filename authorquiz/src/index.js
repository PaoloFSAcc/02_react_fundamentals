import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import AuthorQuiz from './AuthorQuiz';
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import AddAuthorForm from './AddAuthorForm';

const authors = [
  {
		name: 'Mark Twain',
		imageUrl: 'images/authors/marktwain.jpeg',
		imageSource: 'Wikimedia Commons',
		books: [ 'The Adventures of Huckleberry Finn' ]
	},
	{
		name: 'Brandon Sanderson',
		imageUrl: 'images/authors/brandonsanderson.jpeg',
		imageSource: 'Wikimedia Commons',
		books: ['Mistborn', 'Stormlight Archive']
	},
	{
		name: 'Herman Hesse',
		imageUrl: 'images/authors/hermanhesse.jpeg',
		imageSource: 'Wikimedia Commons',
		books: ['Steppenwolf']
	},
	{
		name: 'Jim Butcher',
		imageUrl: 'images/authors/jimbutcher.jpeg',
		imageSource: 'Wikimedia Commons',
		books: ['Ghost Story', 'Cold case']
	},
	{
		name: 'Charles Dickens',
		imageUrl: 'images/authors/charlesdickens.jpeg',
		imageSource: 'Wikimedia Commons',
		books: ['David Copperfield', 'A Tale of Two Cities']
	},
	{
		name: 'Joe Abercrombie',
		imageUrl: 'images/authors/joeabercrombie.jpeg',
		imageSource: 'Wikimedia Commons',
		books: ['The Blade Itself', 'Red Blood', 'Last Argument of Kings']
	},
  {
    name: "P.A. Valiente",
    imageUrl:'images/authors/pavaliente.png',
    imageSource: 'Wikimedia Commons',
    books: [
      'Our half of the Sphere',
      'A death in the making',
      'Comoda critica a la sociedad mexicana'
    ]
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce((p, c, i) => {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks)  
  return {
    books: fourRandomBooks,
    author: authors.find((author) =>
      author.books.some((title) => 
      title === answer))
  }

}
//Not needed anymore
// function resetState() {
// 	return {
// 		turnData: getTurnData(authors),
// 		highlight: '',
// 	  }
// }
//Substitute state for store
//let state = resetState();

//
function reducer(state = {authors, turnData: getTurnData(authors), highlight: '' }, action) {
	switch(action.type) {
		case 'ANSWER_SELECTED':
			const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
			return Object.assign({}, state, {
					highlight: isCorrect ? 'correct' : 'wrong'
				});

		case 'CONTINUE':
			return Object.assign({}, state, {
					highlight: '',
					turnData: getTurnData(state.authors),
				});
		case 'ADD_AUTHOR':
			return Object.assign({}, state, {
				authors: state.authors.concat([action.author]),
			})
		default: return state;
	}
}
let store = Redux.createStore(reducer);

// function onAnswerSelected(answer) {
// 	const isCorrect = state.turnData.author.books.some((book) => book === answer)
// 	state.highlight = isCorrect ? 'correct' : 'wrong';
// 	render();
// }

//This was also deleted because the redux provider needs to include addAuthor, by moving it there, theres no need to have it here
// function App() {
// 	// const onCont = () =>{
// 	// 	state = resetState();
// 	// 	render();
// 	// }
// 	return(
// 		<ReactRedux.Provider store={store}>
// 			<AuthorQuiz/>
// 		</ReactRedux.Provider>		
// 	);
// }

// const AuthorWrapper = withRouter(({history}) =>	
// 	<AddAuthorForm onAddAuthor={ (author) => {
// 		authors.push(author);
// 		history.push('/');
// 		}}
// 	/>
	
// );

//Rerendering is now done by redux, no need to rerender
//function render() {
	ReactDOM.render(
		<BrowserRouter>
			<ReactRedux.Provider store={store}>
				<Route exact path="/" component={AuthorQuiz}/>
				<Route exact path="/add" component={AddAuthorForm}/>
			</ReactRedux.Provider>				
		</BrowserRouter>,
		document.getElementById('root')
	);
//}
//render();


