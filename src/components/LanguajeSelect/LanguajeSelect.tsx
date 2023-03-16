import { useRouter } from 'next/router';
import { IconButton } from 'src/components/IconButton';
import { TranslateIcon } from 'src/components/IconSource';
import { Option } from 'src/components/Option';
import { Select } from 'src/components/Select';

type Props = {};

export const LanguageSelect = (props: Props) => {
	const router = useRouter();

	return (
		<Select
			trigger={
				<IconButton
					colorScheme='primary'
					variant='text'
					asIcon={<TranslateIcon />}
				/>
			}
			onChange={e => {
				console.log(e);

				router.push(router.asPath, undefined, { locale: e });
			}}
		>
			<Option value='en'>En</Option>
			<Option value='es'>Es</Option>
		</Select>
	);
};
