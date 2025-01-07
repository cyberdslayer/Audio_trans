# Audio Transcription App
A web application for audio transcription built with Next.js frontend and FastAPI backend.


1. Home page

  ![image](https://github.com/user-attachments/assets/792690c3-e169-4831-9c41-cec5385222be)

3. Recording a file

  ![image](https://github.com/user-attachments/assets/9fd89f76-dd31-4cf8-bf92-297921eeee31)
  ![image](https://github.com/user-attachments/assets/55a0ccd3-5b69-4b21-9851-631eb0e18426)

5. Transcription

  ![image](https://github.com/user-attachments/assets/22146d21-c2fb-4f3f-998d-0fcdaf6d3fb1)

7. Uploaded file transciption

   ![image](https://github.com/user-attachments/assets/7f6c4d5e-2594-4128-ba33-1862a9992f4f)
   ![image](https://github.com/user-attachments/assets/5505cc4f-1c9a-4a78-9d0c-9701fbb3e77c)

9. You will not be able to hear but still

   ![image](https://github.com/user-attachments/assets/7af68c5a-7412-42f4-b5bb-f082ab42faba)



## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Backend**: FastAPI (Python)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ 
- Python 3.8+
- npm or yarn

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/cyberdslayer/Audio_trans.git
   cd Audio_trans


2. Install dependencies:

```shellscript
npm install
```


3. Run the development server:

```shellscript
npm run dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser.


### Backend Setup

1. Navigate to the backend directory:

```shellscript
cd backend
```


2. Create a virtual environment:

```shellscript
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```


3. Install Python dependencies:

```shellscript
pip install -r requirements.txt
```


4. Run the FastAPI server:

```shellscript
uvicorn main:app --reload
```




The backend API will be available at [http://localhost:8000](http://localhost:8000).

## Features

- Audio recording through browser
- Audio file upload support
- Real-time audio transcription
- Text-to-Speech conversion
- Modern dark theme UI
- Responsive design


## Project Structure

```plaintext
Audio_trans/
├── public/           # Static files
├── src/              # Frontend source code
│   ├── app/         # Next.js app directory
│   ├── components/  # React components
│   └── lib/        # Utility functions
└── README.md
```

## Development

- Frontend runs on port 3000
- Backend API runs on port 8000
- Uses environment variables for configuration
- Implements modern Next.js App Router features


