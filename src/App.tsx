import React, {useState} from 'react';
import './App.css';
import { isParameterPropertyDeclaration } from 'typescript';

type TPoint = {
	x: number,
	y: number
}


function App() {
	const [points, setPoints] = useState<TPoint[]>([]);
	const [popped, setPopped] = useState<TPoint[]>([]);

	function placeCircle(e: React.MouseEvent<HTMLDivElement>){
		const {clientX, clientY} = e;
		setPoints([...points, {x:clientX, y:clientY,}]);
	}
	function undo(){
		const newPoints = [...points];
		const poppedPoint = newPoints.pop();
		if(!poppedPoint) return;
		setPopped([...popped, poppedPoint]);
		setPoints(newPoints);
	}

	function redo(){
		const newPopped = [...popped];
		const poppedPoint = newPopped.pop();
		if(!poppedPoint) return;
		setPoints([...points, poppedPoint]);
		setPopped(newPopped);

	}


	return (
		<>
			<button disabled={points.length === 0} onClick={undo}>Undo</button>
			<button disabled={popped.length === 0} onClick={redo}>Redo</button>
			<div className="App" onClick={placeCircle}>
				{points.map((point, index) =>(
					<div
					key={index}
					className="circle"
					style={{
						left: point.x - 10 + "px",
						top: point.y - 10 + "px",
					}}></div>
				))}
			</div>
		</>
	);
}

export default App;
