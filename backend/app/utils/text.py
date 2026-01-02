import re
from collections import Counter
from typing import List

# 확장된 전문 불용어 데이터셋
ENGLISH_STOPWORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself", "just", "me", "more", "most", "my", "myself", "no", "nor", "not", "now", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "should", "so", "some", "such", "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "with", "would", "you", "your", "yours", "yourself", "yourselves", "will", "shall", "can", "may", "might", "must", "says", "said", "via", "according", "shared", "reut", "news", "report", "print", "fine", "them", "following", "comments"
}

KOREAN_STOPWORDS = {
    "있는", "있으며", "있고", "있다", "합니다", "하는", "했다", "있습니다", "위해", "대한", "통해", "대해", "따르면", "관련", "이번", "지난", "것이다", "것으로", "것을", "것이", "것은", "경우", "모든", "정도", "이후", "이전", "지금", "다시", "따라", "부터", "까지", "에게", "에서", "그리고", "하지만", "또한", "매우", "가장", "이미", "결국", "항상", "종종"
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
        text = re.sub(r'[^a-zA-Z0-9가-힣\s.,!?\'"]', '', text)
        
        # 4. 다중 공백 및 줄바꿈을 공백 하나로 통일
        text = re.sub(r'\s+', ' ', text)
        
        return text.strip()

    @staticmethod
    def extract_keywords(text: str, top_n: int = 5) -> List[str]:
        """
        [BoW] 빈도수 기반 키워드 추출
        """
        if not text:
            return []
            
        # 소문자 변환 및 토큰화
        all_words = re.findall(r'\b[a-zA-Z가-힣]{2,}\b', text.lower())
        
        meaningful_words = []
        for w in all_words:
            # 영어인 경우 (알파벳 포함)
            if re.match(r'[a-z]', w):
                if len(w) < 3 or w in ENGLISH_STOPWORDS:
                    continue
            # 한국어인 경우
            else:
                if w in KOREAN_STOPWORDS:
                    continue
            meaningful_words.append(w)
        
        counter = Counter(meaningful_words)
        return [word for word, count in counter.most_common(top_n)]
