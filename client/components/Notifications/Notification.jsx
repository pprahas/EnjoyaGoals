import React, { useState, useEffect } from "react";
import "./Notification.css";

const colors = ["notification info", "notification success", "notification warning", "notification error"];

// export default function Notification({
// 	color = colors[color - 1],
// 	text,
// }) {
// 	// const [isClosing, setIsClosing] = useState(false);
// 	// useEffect(() => {
// 	// 	if (isClosing) {
// 	// 		con
// 	// 	}
// 	// })
	
// 	return (
// 		<div className="notification">
// 			<div className={color}>
// 				{text}
// 			</div>
// 		</div>
// 	)
// };

const Notification = (props) => {
	if (!props.text) {
		return null;
	}

	if (!props.color) {
		return null;
	}
	
	var convertedColor = colors[props.color];
	// convertedColor = "notification " + convertedColor;
	console.log(`convertedColor = ${convertedColor}`);

	return (
		<div className="notification">
			<div className={convertedColor}>
				{props.text}
			</div>
		</div>
		
		// <div className={convertedColor}>
		// 		{props.text}
		// </div>
	)
	
};

export default Notification;