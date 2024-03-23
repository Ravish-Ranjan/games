import logo from "../assets/logo large.png";
import "../styles/Nav.scss";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Avatar from '@mui/material/Avatar';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { deepPurple } from '@mui/material/colors';

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

export function Nav() {
	const [SearchQuery, setSearchQuery] = useState("");
	return (
		<nav>
			<div id="brand">
				<img src={logo} alt=""></img>
				<span>SOCK8's</span>
			</div>
			<div id="nav-control">
				<ThemeProvider theme={darkTheme}>
					<TextField
						id="search-bar"
						className="text"
						onInput={(e) => {
							setSearchQuery(e.target.value);
						}}
						label="Search games"
						variant="outlined"
						color="secondary"
						size="small"
						value={SearchQuery}
					/>
					<IconButton type="submit" aria-label="search">
						<SearchIcon style={{ fill: "hsl(300, 40%, 8	0%)" }} />
					</IconButton>
				</ThemeProvider>
				<Avatar sx={{ bgcolor: deepPurple[400] }} alt="Ravish Ranjan" className="avatar pixel-font">Rr</Avatar>
			</div>
		</nav>
	);
}
