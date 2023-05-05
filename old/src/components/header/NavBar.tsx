import Link from 'next/link';
import styled from 'styled-components';

const LinkStyle = styled(Link)`
	height: 56px;
	text-decoration: none;
	padding: 0 1rem;
	display: flex;
	justify-content: end;
	align-items: center;
	border-radius: 1.2rem;
	color: #333333;
	font-size: 1.2rem;
	font-style: italic;
	transition: all 0.3s ease-in-out;
	:hover {
		color: #ea1889;
		font-weight: 700;
		padding-right: 2rem;
	}
`;

const NavStyle = styled.nav`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem 0;
`;

export default function NavBar() {
	return (
		<NavStyle>
			<LinkStyle href='/chapter1'>Chapter 1</LinkStyle>
			<LinkStyle href='/chapter1'>Chapter 2</LinkStyle>
			<LinkStyle href='/chapter1'>Chapter 3</LinkStyle>
			<LinkStyle href='/chapter1'>Chapter 4</LinkStyle>
		</NavStyle>
	);
}

