import { useState, useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { AiOutlineInfoCircle, AiFillCheckCircle } from "react-icons/ai";
import "./Notif.css";

const Notif = (props) => {
	try {
		const { notifList } = props;
		const [list, setList] = useState(notifList);
		const [autoDelIndex, setAutoDelIndex] = useState(0);

		useEffect(() => {
			setList(notifList);
		}, [notifList, list]);

		useEffect(() => {
			const interval = setInterval(() => {
				if (notifList.length && list.length && autoDeleteCheck(list[autoDelIndex])) {
					deleteToast(list[autoDelIndex].id);
				}
			}, 10000);
			return () => {
				clearInterval(interval);
			}
		}, [notifList, list]);

		const autoDeleteCheck = (notifToCheck) => {
			if (notifToCheck.type === "info") {
				return true;
			}

			setAutoDelIndex(autoDelIndex + 1);
			return false;
		}

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
						<div key={i} className={`notification notif bottom-right ${notif.type}`}>
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

export default Notif;
