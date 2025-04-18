import './App.css';
import { JSX, useState } from 'react';

// Interface for blog post data
interface BlogPost {
	title: string;
	date: string;
	likes: number;
}

function App(): JSX.Element {
	// State for blog posts with proper typing
	const [posts, setPosts] = useState<BlogPost[]>([
		{ title: 'Men\'s Coat Recommendations', date: 'Published April 16', likes: 0 },
		{ title: 'Prague Udon Restaurant Guide', date: 'Published April 20', likes: 0 },
		{ title: 'Things to See in Prague', date: 'Published April 22', likes: 0 }
	]);

	// Function to increase likes with type annotations
	const increaseLikes = (index: number): void => {
		let copy = [...posts];
		copy[index].likes += 1;
		setPosts(copy);
	};

	// Function to sort titles alphabetically
	const sortTitles = (): void => {
		let copy = [...posts];
		copy.sort((a, b) => a.title.localeCompare(b.title));
		setPosts(copy);
	};

	return (
		<div className="App">
			<div className="black-nav">
				<h4>React Blog</h4>
			</div>

			{/* Sort button */}
			<button onClick={sortTitles}>Sort</button>

			{/* Blog post list */}
			{posts.map((item, index) => (
				<div key={index} className='list'>
					<h4>
						{ item.title }
						<span onClick={() => increaseLikes(index)}>👍</span>
						{ item.likes }
					<p className='publication-date'>{ item.date }</p>
					</h4>
				</div>
			))}

			{/* Update title button */}
			<button onClick={() => {
				let copy = [...posts];
				copy[0].title = 'Women\'s Coat Recommendations'; // Update first title
				setPosts(copy);
			}}>Update</button>

			<Modal />
		</div>
	);
}

// Modal component with type definition
const Modal = (): JSX.Element => {
	return (
		<div className="modal">
			<h4>Title</h4>
			<p>Date</p>
			<p>Details</p>
		</div>
	);
}

export default App;
