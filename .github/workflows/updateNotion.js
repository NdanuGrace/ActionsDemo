const fetch = require('node-fetch');

const NOTION_API_TOKEN = process.env.NOTION_API_TOKEN;
const NOTION_PAGE_ID = '9c4e25b41bf049da9206a06e8c8626c2';

async function updateNotionPage(content) {
  const headers = {
    'Authorization': `Bearer ${NOTION_API_TOKEN}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2021-05-13',
  };

  const data = {
    'properties': {
      'title': {
        'title': [
          {
            'text': {
              'content': content,
            },
          },
        ],
      },
    },
  };

  const response = await fetch(`https://api.notion.com/v1/pages/${NOTION_PAGE_ID}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data),
  });

  if (response.ok) {
    console.log('Notion page updated successfully.');
  } else {
    console.error('Failed to update Notion page:', await response.json());
  }
}

const newContent = 'This is the updated content.';
updateNotionPage(newContent);