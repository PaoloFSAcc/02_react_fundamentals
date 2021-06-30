import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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

function resetState() {
	return {
		turnData: getTurnData(authors),
		highlight: '',
	  }
}
let state = resetState();

function onAnswerSelected(answer) {
	const isCorrect = state.turnData.author.books.some((book) => book === answer)
	state.highlight = isCorrect ? 'correct' : 'wrong';
	render();
}

function App() {
	const onCont = () =>{
		state = resetState();
		render();
	}
	return(
		<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} onContinue={onCont}/>
	);
}

const AuthorWrapper = withRouter(({history}) =>	
	<AddAuthorForm onAddAuthor={ (author) => {
		console.log("we did it honeybee")
		authors.push(author);
		history.push('/');
		}}
	/>
	
);

function render() {
	ReactDOM.render(
		<React.StrictMode>
			<BrowserRouter>
				<Route exact path="/" component={App}/>
				<Route exact path="/add" component={AuthorWrapper}/>
			</BrowserRouter>
		</React.StrictMode>,
		document.getElementById('root')
		);
}
render();


