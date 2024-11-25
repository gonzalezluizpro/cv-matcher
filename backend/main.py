import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Union
from cv_matcher import CVMatcher

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS with Logging
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize CV Matcher
cv_matcher = CVMatcher()

class MatchRequest(BaseModel):
    cv_text: str
    job_description: str

class SkillsAnalysis(BaseModel):
    matching_skills: List[str]
    missing_skills: List[str]
    additional_skills: List[str]

class MatchResponse(BaseModel):
    metrics: Dict[str, str]
    skills_analysis: Dict[str, List[str]]

@app.post("/api/analyze", response_model=MatchResponse)
async def analyze_match(request: MatchRequest):
    logger.info(f"Received analyze request - CV Text Length: {len(request.cv_text)}, Job Description Length: {len(request.job_description)}")
    try:
        report = cv_matcher.generate_report(request.cv_text, request.job_description)
        logger.info(f"Analysis completed successfully. Report generated: {report}")
        return report
    except Exception as e:
        logger.error(f"Error analyzing CV: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

# Add a root endpoint for testing
@app.get("/")
async def root():
    logger.info("Root endpoint accessed")
    return {"message": "CV Matcher API is running"}

if __name__ == "__main__":
    logger.info("Starting CV Matcher API server")
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)