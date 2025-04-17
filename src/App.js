/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

	let [글정보, setTitle] = useState([
		{ title: '남자 코트 추천', date: '4월 16일 발행', likes: 0 },
		{ title: '프라하 우동 맛집', date: '4월 20일 발행', likes: 0 },
		{ title: '프라하 볼거리', date: '4월 22일 발행', likes: 0 }
	]);
	let [likes, setLikes] = useState([0, 0, 0]);

	// 좋아요 증가 함수
	const increaseLikes = (index) => {
		let copy = [...글정보];
		copy[index].likes += 1;
		setLikes(copy);
	};

	// 가나다순 정렬 함수
	const sortTitles = () => {
		let copy = [...글정보];
		copy.sort((a, b) => a.title.localeCompare(b.title)); // 가나다순 정렬
		setTitle(copy);
	};

	// onClick={() => { only_function }}
	return (
		<div className="App">
			<div className="black-nav">
				<h4>React Blog</h4>
			</div>

			{/* 가나다순 정렬 버튼 */}
			<button onClick={sortTitles}>Sort</button>

			{/* 글 목록 */}
			{글정보.map((item, index) => (
				<div key={index} className='list'>
					<h4>
						{ item.title }
						<span onClick={() => increaseLikes(index)}>👍</span>
						{ item.likes }
					<p>{ item.date }</p>
					</h4>
				</div>
			))}

			{/* 제목 업데이트 버튼 */}
			<button onClick={() => { 
				let copy = [...글정보];
				copy[0].title = '여자 코트 추천'; // 첫 번째 제목 수정
				setTitle(copy);
			}}>Update</button>

			<Modal/>
		</div>
	);
}

const Modal = () => {
	return (
		<div className="modal">
		<h4>제목</h4>
		<p>날짜</p>
		<p>상세 내용</p>
		</div>
	)
}

export default App;
