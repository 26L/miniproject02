import re
from collections import Counter
from typing import List

# 간단한 불용어 리스트 (확장 가능)
STOPWORDS = {
    "a", "an", "the", "in", "on", "at", "to", "for", "of", "and", "or", "but", 
    "is", "are", "was", "were", "be", "been", "this", "that", "it", "with", "as", 
    "by", "from", "news", "report", "says", "said"
}

class TextProcessor:
    @staticmethod
    def clean_text(text: str) -> str:
        """
        [전처리] 텍스트 정제
        1. HTML 태그 제거
        2. 특수문자 및 URL 제거
        3. 다중 공백 -> 단일 공백 치환
        4. 양끝 공백 제거
        """
        if not text:
            return ""
        
        # 1. HTML 태그 제거 (간이)
        text = re.sub(r'<[^>]+>', '', text)
        
        # 2. URL 제거
        text = re.sub(r'http\S+|www\.\S+', '', text)
        
        # 3. 특수문자 제거 (일부 보존하고 싶은 문자는 제외 가능) 및 줄바꿈 정리
        # 알파벳, 한글, 숫자, 공백, 기본 문장부호만 남김
        text = re.sub(r'[^a-zA-Z0-9가-힣\s.,!?\'"]', '', text)
        
        # 4. 다중 공백 및 줄바꿈을 공백 하나로 통일
        text = re.sub(r'\s+', ' ', text)
        
        return text.strip()

    @staticmethod
    def extract_keywords(text: str, top_n: int = 5) -> List[str]:
        """
        [BoW] 빈도수 기반 키워드 추출
        1. 소문자 변환
        2. 토큰화 (단어 단위 분리)
        3. 불용어(Stopwords) 제거
        4. 빈도수 상위 N개 추출
        """
        if not text:
            return []
            
        # 소문자 변환 및 토큰화 (알파벳/한글 단어만 추출)
        words = re.findall(r'\b[a-zA-Z가-힣]{2,}\b', text.lower())
        
        # 불용어 필터링
        meaningful_words = [w for w in words if w not in STOPWORDS]
        
        # 빈도수 계산 (BoW 개념)
        counter = Counter(meaningful_words)
        
        # 상위 N개 반환
        return [word for word, count in counter.most_common(top_n)]
