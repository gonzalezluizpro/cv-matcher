# CV Matcher

A web application that matches CVs with job descriptions using AI and natural language processing.

## Features

- CV and Job Description text analysis
- Skills matching
- Visual representation of match metrics
- Real-time analysis

## Tech Stack

- Frontend:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - Recharts

- Backend:
  - FastAPI
  - Python
  - spaCy
  - scikit-learn

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cv-matcher.git
cd cv-matcher
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

### Running the Application

1. Start the backend server
```bash
cd backend
uvicorn main:app --reload
```

2. In a new terminal, start the frontend
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details