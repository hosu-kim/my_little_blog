import './App.css';
import { JSX, useState } from 'react';

// Interface for blog post data with content field
interface BlogPost {
	title: string;
	date: string;
	likes: number;
	content: string;
}

function App(): JSX.Element {
	// State for blog posts with proper typing
	const [posts, setPosts] = useState<BlogPost[]>([
		{
			title: 'Men\'s Coat Recommendations',
			date: 'Published April 16',
			likes: 0,
			content: 'Winter is coming! Here are my top picks for men\'s coats this season. I\'ve personally tested these brands in cold weather and can vouch for their quality and warmth. Look for water-resistant materials if you live in a rainy area, and don\'t forget to check the inner lining for additional insulation.' },
		{
			title: 'Prague Udon Restaurant Guide',
			date: 'Published April 20',
			likes: 0,
			content: 'During my recent trip to Prague, I discovered several amazing udon restaurants. My favorite was "Udon & Soba" near the Old Town Square. They serve authentic Japanese noodles with a Czech twist. Don\'t miss specialty - mushroom udon with local herbs. Most restaurants are open until late and offer vegetarian options as well.'},
		{
			title: 'Things to See in Prague',
			date: 'Published April 22',
			likes: 0,
			content: ' Prague is filled with architectural wondes and historical sites. Start with Prague Castle and St. Vitus Cathedral, then walk across Charles Bridge to explore the Old Town. The Astronomical Clock is a must-see, and if you have time, visit the Jewish Quarter. For the best views of the city, climb the Old Town Hall Tower or head to Letná Park.'
		}
	]);

	// Modal state management
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

	// Function to increase likes with type annotations
	const increaseLikes = (index: number): void => {
		let copy = [...posts];
		copy[index].likes += 1;
		setPosts(copy);
	};

	// Function to open modal when title is clicked
	const openModal = (post: BlogPost): void => {
		setSelectedPost(post);
		setModalOpen(true);
	};

	// Function to close modal
	const closeModal = (): void => {
		setModalOpen(false);
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
						{/* Click on title to open modal with post details */}
						<span
							onClick={() => openModal(item)}
							style={{ cursor: 'pointer'}}
						>
							{item.title}
						</span>
						<span onClick={(e) => {
							e.stopPropagation();
							increaseLikes(index);
						}}>👍</span>
						{ item.likes }
					<p className='publication-date'>{item.date}</p>
					</h4>
				</div>
			))}

			{/* Update title button */}
			<button onClick={() => {
				let copy = [...posts];
				copy[0].title = 'Women\'s Coat Recommendations'; // Update first title
				setPosts(copy);
			}}>Update</button>

			{/* Display modal only when it's open and a post is selected */}
			{modalOpen && selectedPost && (
				<Modal
					post={selectedPost}
					onClose={closeModal}
				/>
			)}
		</div>
	);
}

// Props interface for Modal component
interface ModalProps {
	post: BlogPost;
	onClose: () => void;
}

// Modal component with type definition
const Modal = ({ post, onClose }: ModalProps): JSX.Element => {
	return (
		<div className="modal">
			<div className="modal-content">
				<span className="close" onClick={onClose} style={{ cursor: 'pointer'}}>&times;</span>
				<h4>{post.title}</h4>
				<p>{post.date}</p>
				<p><strong>Likes:</strong> {post.likes}</p>
				<div className="post-content">
					<p>{post.content}</p>
				</div>
			</div>
		</div>
	);
}

export default App;
