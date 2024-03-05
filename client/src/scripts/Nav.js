import logo from "../media/logo back.png";
import "../styles/Nav.css";

export function Nav() {
	return (
		<nav>
			<div>
				<img src={logo} alt=""></img>
				<span>Games</span>
			</div>
		</nav>
	);
}
