import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'src/components/Button';
import { LocalStorageKeys, LocalStorageService } from 'src/utils';

const baseUrl = 'http://localhost:3000/book/chapter-1';

export const BookmarkButton = () => {
	const router = useRouter();
	const [url, setUrl] = React.useState('');

	React.useEffect(() => {
		const bookmarkUrl = LocalStorageService.find<string>(
			LocalStorageKeys.bookmark,
		);

		if (!bookmarkUrl) return;

		setUrl(bookmarkUrl);
	}, []);

	return (
		<Button onClick={() => router.push(url || baseUrl)}>
			{url ? 'Continue from where you left off' : 'Start reading'}
		</Button>
	);
};
