## Getting Started

First, install the packages:

```bash
pnpm install
```

Then copy the example env file and add your OpenAI API key:

```
OPENAI_API_KEY=your_api_key_here
```

You can get an API key from [platform.openai.com](https://platform.openai.com/api-keys). The key is used server-side only (in the `/api/taste-profile` route) to generate taste profiles and book recommendations.

Then run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
