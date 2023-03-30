import { useRouter } from 'next/router';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Button } from 'src/components/Button';
import { TranslateIcon } from 'src/components/IconSource';
import { Option } from 'src/components/Option';
import { Select } from 'src/components/Select';
import styled from 'styled-components';

const ButtonStyled = styled(Button)({
	display: 'flex',
	padding: '0px !important',
	borderRadius: '10px',
	aspectRatio: '1/1',
});

export const LanguageSelect = () => {
	const router = useRouter();

	return (
		<Select
			trigger={
				<ButtonStyled colorScheme='secondary' variant='text'>
					<TranslateIcon /> <MdOutlineKeyboardArrowDown />
				</ButtonStyled>
			}
			onChange={e => router.push(router.asPath, undefined, { locale: e })}
		>
			<Option value='en'>En</Option>
			<Option value='es'>Es</Option>
		</Select>
	);
};
