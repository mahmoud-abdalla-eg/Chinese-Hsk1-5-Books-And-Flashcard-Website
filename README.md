# Mandarin Flow HSK — HSK 1–5 Books & Flashcards Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A multilingual, conversation-first Chinese learning platform for HSK 1–5 learners.

Mandarin Flow HSK helps students learn Chinese naturally through long conversations, flashcards, listening practice, shadowing, pronunciation recording, quizzes, and local progress tracking. Instead of memorizing vocabulary as isolated words, the platform places HSK vocabulary inside realistic daily-life situations so learners can understand, repeat, and use the words in context.

## Live Demo

[Open the live website](https://chinese-hsk-flashcards.netlify.app/)

## Project Overview

This project is built around the HSK 3.0 learning approach and organizes vocabulary by level, unit, and study mode.

Current content structure:

| Level | Focus | Words | Units |
|---|---|---:|---:|
| HSK 1 | First conversations | 300 | 6 |
| HSK 2 | Daily confidence | 197 | 4 |
| HSK 3 | Real situations | 491 | 10 |
| HSK 4 | Complex stories | 990 | 20 |
| HSK 5 | Fluent flow | 1,579 | 32 |

Total: **3,557 words** across **72 units**.

## Key Features

### Conversation-Based Learning

Learn vocabulary through realistic conversations instead of isolated memorization.

Conversation topics include:

- Greetings
- Family
- School
- Shopping
- Restaurants
- Transportation
- Time and dates
- Weather
- Hobbies
- Work
- Travel
- Health
- Asking for help
- Phone calls
- Directions
- Hotels
- Airports
- Daily routines

### Flashcards

Practice every vocabulary item with flashcards that show:

- Chinese characters
- Pinyin
- English meaning
- Arabic meaning
- Review difficulty options

The flashcard system supports a simple memory loop with options such as:

- Again
- Hard
- Good
- Easy

### Listening & Shadowing Practice

The platform is designed to help learners listen, repeat, and shadow Chinese sentences.

Learners can:

- Listen to conversation lines
- Repeat after the speaker
- Practice pronunciation
- Compare their pronunciation with the original sentence

### Voice Recording & Pronunciation Practice

The website includes pronunciation practice features where learners can record themselves and receive an estimated browser-based score.

> Note: The pronunciation score is currently an estimated score. It can be upgraded later with a dedicated pronunciation assessment service such as Azure Speech Assessment.

### Multilingual Interface

The app supports three default interface languages:

- English
- 中文
- العربية

This makes the platform useful for English-speaking learners, Arabic-speaking learners, and learners who want more Chinese exposure.

### Study Modes

The learning system is designed around a complete practice loop:

1. Conversation Mode
2. Shadowing Mode
3. Flashcard Mode
4. Listening Quiz
5. Translation Quiz
6. Typing Quiz

### Data Check Dashboard

The app includes an admin/data-check area to help review missing or incomplete learning content.

This makes it easier to maintain data quality while adding more conversations, words, audio, and units.

## Tech Stack

- **Next.js**
- **React**
- **Tailwind CSS**
- **Biome**
- **Local JSON data**
- **Netlify deployment**

## Main App Folder

The main website code is inside:

```bash
chinese-hsk-website
```

## Project Structure

```bash
Chinese-Hsk1-5-Books-And-Flashcard-Website/
│
├── chinese-hsk-website/
│   ├── app/
│   │   ├── admin/data-check/
│   │   ├── api/
│   │   ├── conversations/
│   │   ├── dashboard/
│   │   ├── flashcards/
│   │   └── hsk/[level]/
│   │
│   ├── components/
│   ├── lib/
│   │   ├── data/
│   │   ├── i18n/
│   │   ├── progress/
│   │   └── validation/
│   │
│   ├── public/
│   ├── scripts/
│   ├── source-data/
│   │   ├── conversations/
│   │   └── hsk/
│   │
│   ├── package.json
│   └── README.md
│
├── hsk 1/
├── hsk 2/
├── hsk 3/
├── hsk 4/
├── hsk 5/
├── HSK 1-6 Grammar.pdf
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mahmoud-abdalla-eg/Chinese-Hsk1-5-Books-And-Flashcard-Website.git
```

### 2. Enter the app directory

```bash
cd Chinese-Hsk1-5-Books-And-Flashcard-Website/chinese-hsk-website
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Available Scripts

Run these commands from inside the `chinese-hsk-website` folder.

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the project for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run Biome checks |
| `npm run format` | Format the code with Biome |
| `npm run validate` | Validate HSK learning data |
| `npm run coverage` | Check content coverage |
| `npm run generate-audio` | Generate audio files for learning content |
| `npm run generate-conversations` | Generate conversation content |

## Data Organization

The learning content is stored locally and separated by level.

Main data folders:

```bash
source-data/hsk
source-data/conversations
```

This makes the platform easy to expand because each HSK level can have its own vocabulary, units, conversations, and learning content.

## Roadmap

Planned improvements:

- Add more complete authored conversations for every unit
- Add high-quality native speaker audio for all words and conversations
- Improve pronunciation scoring with a dedicated speech assessment API
- Add user accounts and cloud sync
- Add spaced repetition scheduling
- Add more quiz types
- Add downloadable study sheets
- Add admin tools for editing vocabulary and conversations
- Add progress analytics by level, unit, and weak words

## Why This Project Matters

Many Chinese learning tools present vocabulary as a list. This project takes a more natural approach by helping learners see vocabulary inside real communication.

The goal is to make HSK study feel more like using Chinese in daily life, not just memorizing definitions.

## Deployment

The project is currently deployed on Netlify:

[https://chinese-hsk-flashcards.netlify.app/](https://chinese-hsk-flashcards.netlify.app/)

You can also deploy the Next.js app to platforms such as:

- Netlify
- Vercel
- Render
- Any Node.js hosting environment that supports Next.js

## Contributing

Contributions are welcome.

Good areas for contribution include:

- Fixing vocabulary data
- Adding missing pinyin or translations
- Creating better conversations
- Improving Arabic translations
- Improving English translations
- Adding audio files
- Improving UI/UX
- Adding tests and validation scripts

## Author

Created by [Mahmoud Abdalla](https://github.com/mahmoud-abdalla-eg).

## License

This project is open source and licensed under the **MIT License**.

You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the project, as long as the original copyright notice and MIT license text are included.

See the [LICENSE](LICENSE) file for full details.
