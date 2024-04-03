// @no-ts-checHexagonal_Architecturek
import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { merge } from 'merge-pdf-buffers';
import type { NextApiRequest, NextApiResponse } from 'next';
import P from 'playwright';

interface Data {
  status: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const pageList = [
    'http://localhost:3000/',
    'http://localhost:3000/book/Chapter01_Clean-Agile',
    'http://localhost:3000/book/Chapter02_Communication-First-and-Foremost',
    'http://localhost:3000/book/Chapter03_Hexagonal_Architecture',
    'http://localhost:3000/book/Chapter04_GoLang',
  ];

  const browser = await P.chromium.launch({ headless: true });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });

  const styleTagContentHome = `	
	header, footer, hr { display: none !important; }
`;
  const styleTagContent = `
	main { margin: 0 !important; }
	header, button { display: none !important; }
	h1 { padding-top: 0 !important; }
	h2 { padding-top: 0 !important; margin-top: 2rem !important; }
	h2 > div { border: none !important; }
	#__next-build-watcher, #__next-prerender-indicator { display: none !important; }
`;
  const opt: Parameters<P.Page['pdf']>['0'] = {
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    scale: 0.8,
    margin: {
      bottom: '60px',
      top: '60px',
      left: '50px',
      right: '50px',
    },
  };

  const pdfList = await Promise.all(
    pageList.map(async (url, idx) => {
      const page = await context.newPage();
      await page.goto(url);
      await page.emulateMedia({ media: 'screen' });

      if (idx === 0) {
        await page.addStyleTag({ content: styleTagContentHome });

        // Open all chapters
        const buttonList = await page
          .getByRole('main')
          .getByRole('button')
          .all();
        await Promise.all(
          buttonList.map(async btn => await btn.dispatchEvent('click')),
        );

        // Disable all links
        const linkList = await page.getByRole('main').getByRole('link').all();
        await Promise.all(
          linkList.map(async link => {
            await link.evaluate((node: HTMLAnchorElement) => (node.href = '#'));
          }),
        );

        // hidde Download button
        await page
          .getByText(/download/i)
          .evaluate((node: HTMLButtonElement) => {
            node.style.display = 'none';
          });

        // hidde Start Reading button
        await page
          .getByText(/start reading/i)
          .evaluate((node: HTMLButtonElement) => {
            node.style.display = 'none';
          });
      } else {
        await page.addStyleTag({ content: styleTagContent });
      }

      await page.waitForTimeout(1500);
      return page.pdf(opt);
    }),
  );

  const merged = await merge(pdfList);
  fs.writeFileSync('public/gentleman-programming-book.pdf', merged);

  await browser.close();

  res.status(200).json({ status: 'ok' });
}
