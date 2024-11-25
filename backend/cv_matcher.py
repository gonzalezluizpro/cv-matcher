import spacy
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
from typing import List, Dict, Set, Union

class CVMatcher:
    def __init__(self):
        # Load English language model
        self.nlp = spacy.load("en_core_web_sm")
        self.vectorizer = CountVectorizer(stop_words='english')
        
    def preprocess_text(self, text: str) -> str:
        # Convert to lowercase and remove special characters
        text = re.sub(r'[^\w\s]', ' ', text.lower())
        # Process with spaCy
        doc = self.nlp(text)
        # Remove stopwords and lemmatize
        processed = ' '.join([token.lemma_ for token in doc if not token.is_stop])
        return processed
    
    def extract_skills(self, text: str) -> List[str]:
        # Define common skill keywords (extend this list based on your needs)
        skill_patterns = [
            'python', 'java', 'javascript', 'sql', 'aws', 'docker',
            'kubernetes', 'react', 'angular', 'node.js', 'machine learning',
            'data analysis', 'project management', 'agile', 'scrum',
            'communication', 'leadership', 'problem solving'
        ]
        
        text_lower = text.lower()
        found_skills = [skill for skill in skill_patterns if skill in text_lower]
        return found_skills
    
    def calculate_match(self, cv_text: str, job_desc: str) -> Dict[str, Union[float, List[str]]]:
        # Preprocess both texts
        cv_processed = self.preprocess_text(cv_text)
        job_processed = self.preprocess_text(job_desc)
        
        # Extract skills
        cv_skills = set(self.extract_skills(cv_text))
        job_skills = set(self.extract_skills(job_desc))
        
        # Calculate matching and missing skills
        matching_skills = cv_skills.intersection(job_skills)
        missing_skills = job_skills - cv_skills
        extra_skills = cv_skills - job_skills
        
        # Calculate overall similarity using cosine similarity
        text_matrix = self.vectorizer.fit_transform([cv_processed, job_processed])
        similarity = cosine_similarity(text_matrix[0:1], text_matrix[1:2])[0][0]
        
        # Prepare results
        results = {
            'overall_match_percentage': round(similarity * 100, 2),
            'matching_skills': list(matching_skills),
            'missing_skills': list(missing_skills),
            'extra_skills': list(extra_skills),
            'skill_match_percentage': round(len(matching_skills) / len(job_skills) * 100 if job_skills else 0, 2)
        }
        
        return results
    
    def generate_report(self, cv_text: str, job_desc: str) -> Dict[str, Union[Dict[str, str], Dict[str, List[str]]]]:
        match_results = self.calculate_match(cv_text, job_desc)
        
        report = {
            'metrics': {
                'Overall Match': f"{match_results['overall_match_percentage']}%",
                'Skills Match': f"{match_results['skill_match_percentage']}%"
            },
            'skills_analysis': {
                'Matching Skills': match_results['matching_skills'],
                'Missing Skills': match_results['missing_skills'],
                'Additional Skills': match_results['extra_skills']
            }
        }
        
        return report