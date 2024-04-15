import "../styles/RecentRow.scss";

export function Box({ orientation, value }) {
	return (
		<div
			className="GameBox"
			style={{
				aspectRatio: orientation === "vertical" ? "3/4" : "4/3",
				height: orientation === "vertical" ? "auto" : "25vh",
				width: orientation === "vertical" ? "25vh" : "auto",
			}}
		>
			{value}
		</div>
	);
}
