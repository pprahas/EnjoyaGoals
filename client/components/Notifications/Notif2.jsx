import { useState, useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { AiOutlineInfoCircle, AiFillCheckCircle } from "react-icons/ai";
import "./Notif2.css";

const Notif2 = (props) => {
	try {
		const { notifList } = props;
		const [list, setList] = useState(notifList);

		useEffect(() => {
			setList(notifList);
		}, [notifList, list]);

		// console.log(`list = ${list}`);
		// for (var item in list) {
		// 	console.log(Object.values(item));
		// }

		// return (
		// 	<>
		// 		<div className="notification-container bottom-right">
		// 				<div className="notification toast bottom-right">
		// 					<button>X</button>
		// 					<div className="notification-image">
		// 						<img src={<AiOutlineInfoCircle size="20"/>} alt="" />\
		// 					</div>
		// 					<div>
		// 						<p className="notification-title">This is a test</p>
		// 						<p className="notification-message">Work and nobody gets hurt</p>
		// 					</div>
		// 				</div>
		// 		</div>
		// 	</>
		// );

		const deleteToast = (id) => {
			const listItemIndex = list.findIndex((e) => e.id === id);
			list.splice(listItemIndex, 1);
			setList([...list]);
		};

		const getIcon = (type) => {
			switch (type) {
				case "info":
					return (<AiOutlineInfoCircle size="30" />);
				case "warning":
					return (<FiAlertTriangle size="30" />);
				case "success":
					return (<AiFillCheckCircle size="30" />);
				default:
					return (<AiOutlineInfoCircle size="30" />);
			}
		};

		return (
			<>
				<div className="notification-container bottom-right">
					{list.map((notif, i) => (
						<div key={i} className={`notification toast bottom-right ${notif.type}`}>
							<button onClick={() => deleteToast(notif.id)}>X</button>
							<div className="notification-image">
								{getIcon(notif.type)}
							</div>
							<div>
								<p className="notification-title">{notif.title}</p>
								<p className="notification-message">{notif.desc}</p>
							</div>
						</div>
					))}
				</div>
			</>
		);
	} catch (error) {
		console.log(error);
	}
};


export default Notif2;
