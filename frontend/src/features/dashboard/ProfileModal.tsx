import { useState, useRef, useEffect } from 'react';
import { X, Camera, User, Key, Eye, EyeOff, Check, AlertCircle, Settings, Loader2 } from 'lucide-react';
import type { UserProfile } from './ProfilePanel';
import { validateApiKey } from '@/services/api';

export interface ApiKeys {
  newsApiKey: string;
  openAiApiKey: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  apiKeys: ApiKeys;
  onSave: (profile: UserProfile) => void;
  onSaveApiKeys: (apiKeys: ApiKeys) => void;
}

const INTEREST_OPTIONS = [
  { value: 'politics', label: '정치' },
  { value: 'economy', label: '경제' },
  { value: 'society', label: '사회' },
  { value: 'technology', label: '기술' },
  { value: 'sports', label: '스포츠' },
];

const API_KEY_CONFIG = [
  {
    key: 'newsApiKey' as const,
    label: 'News API 키',
    description: '뉴스 데이터를 가져오기 위한 API 키입니다.',
    placeholder: 'sk-news-xxxxxxxxxxxxxxxx',
    helpUrl: 'https://newsapi.org',
  },
  {
    key: 'openAiApiKey' as const,
    label: 'OpenAI API 키',
    description: 'AI 분석, 요약 및 감정 분석을 위한 OpenAI API 키입니다.',
    placeholder: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    helpUrl: 'https://platform.openai.com/api-keys',
  },
];

export function ProfileModal({ isOpen, onClose, profile, apiKeys, onSave, onSaveApiKeys }: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'api'>('profile');
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    avatar: profile.avatar,
    interests: profile.interests,
    emailNotify: false,
    trendNotify: true,
  });
  
  const [apiFormData, setApiFormData] = useState<ApiKeys>({
    newsApiKey: apiKeys.newsApiKey,
    openAiApiKey: apiKeys.openAiApiKey,
  });

  const [showKeys, setShowKeys] = useState({
    newsApiKey: false,
    openAiApiKey: false,
  });

  const [apiKeyStatus, setApiKeyStatus] = useState<Record<string, 'idle' | 'testing' | 'valid' | 'invalid'>>({
    newsApiKey: 'idle',
    openAiApiKey: 'idle',
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 모달이 열릴 때 apiKeys로 초기화
  useEffect(() => {
    if (isOpen) {
      setApiFormData({
        newsApiKey: apiKeys.newsApiKey,
        openAiApiKey: apiKeys.openAiApiKey,
      });
      setFormData({
        name: profile.name,
        email: profile.email,
        avatar: profile.avatar,
        interests: profile.interests,
        emailNotify: false,
        trendNotify: true,
      });
    }
  }, [isOpen, apiKeys, profile]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = () => {
    onSave({
      ...profile,
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar,
      interests: formData.interests,
    });
    onClose();
  };

  const handleInterestChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter(i => i !== value)
        : [...prev.interests, value],
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size check (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('이미지 크기는 2MB 이하여야 합니다');
      return;
    }

    // Image type check
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({
        ...prev,
        avatar: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleApiKeyChange = (key: keyof ApiKeys, value: string) => {
    setApiFormData(prev => ({ ...prev, [key]: value }));
    setApiKeyStatus(prev => ({ ...prev, [key]: 'idle' }));
  };

  const toggleShowKey = (key: keyof ApiKeys) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const testApiKey = async (key: keyof ApiKeys) => {
    const apiKey = apiFormData[key];
    if (!apiKey.trim()) {
      setApiKeyStatus(prev => ({ ...prev, [key]: 'invalid' }));
      return;
    }
    
    setApiKeyStatus(prev => ({ ...prev, [key]: 'testing' }));
    
    try {
      // 실제 API 키 검증
      const keyType = key === 'newsApiKey' ? 'news' : 'openai';
      const isValid = await validateApiKey(keyType, apiKey);
      setApiKeyStatus(prev => ({ ...prev, [key]: isValid ? 'valid' : 'invalid' }));
    } catch (error) {
      console.error('API key validation error:', error);
      setApiKeyStatus(prev => ({ ...prev, [key]: 'invalid' }));
    }
  };

  const handleSaveApiKeys = () => {
    onSaveApiKeys(apiFormData);
    // 저장 후 알림
    alert('API 키가 저장되었습니다.');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'testing':
        return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
      case 'valid':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'invalid':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'testing':
        return '검증 중...';
      case 'valid':
        return '유효한 키입니다';
      case 'invalid':
        return '유효하지 않은 키입니다';
      default:
        return '';
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] opacity-0 animate-[fadeIn_0.25s_forwards]"
      onClick={handleOverlayClick}
      style={{ animation: 'fadeIn 0.25s forwards' }}
    >
      <div className="bg-white rounded-xl shadow-lg max-w-[560px] w-[90%] max-h-[90vh] overflow-y-auto transform scale-95 animate-[scaleIn_0.25s_forwards]">
        {/* Modal Header */}
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-foreground">설정</h2>
            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:bg-background rounded-md transition-all"
              aria-label="닫기"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'profile'
                  ? 'gradient-primary text-white'
                  : 'bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="h-4 w-4" />
              프로필
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'api'
                  ? 'gradient-primary text-white'
                  : 'bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              <Key className="h-4 w-4" />
              API 키 설정
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <>
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4 p-6 bg-background rounded-xl mb-6">
            <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-4xl text-white overflow-hidden border-4 border-white shadow-md">
              {formData.avatar ? (
                <img src={formData.avatar} alt="미리보기" className="w-full h-full object-cover" />
              ) : (
                <User className="h-10 w-10" />
              )}
            </div>
            <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-border rounded-lg text-sm font-medium text-muted-foreground cursor-pointer transition-all hover:border-primary hover:text-primary">
              <Camera className="h-4 w-4" />
              <span>사진 변경</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </label>
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <label htmlFor="inputName" className="block text-sm font-medium text-foreground mb-2">
              이름
            </label>
            <input
              type="text"
              id="inputName"
              placeholder="이름을 입력해 주세요"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-border rounded-lg text-sm transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="inputEmail" className="block text-sm font-medium text-foreground mb-2">
              이메일
            </label>
            <input
              type="email"
              id="inputEmail"
              placeholder="이메일을 입력해 주세요"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-border rounded-lg text-sm transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>

          {/* Interest Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              관심 분야 선택
            </label>
            <div className="flex flex-wrap gap-3">
              {INTEREST_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-2 px-4 py-2 bg-background border-2 rounded-lg text-sm cursor-pointer transition-all ${
                    formData.interests.includes(option.value)
                      ? 'border-primary text-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(option.value)}
                    onChange={() => handleInterestChange(option.value)}
                    className="hidden"
                  />
                  <span
                    className={`w-[18px] h-[18px] border-2 rounded flex items-center justify-center transition-all ${
                      formData.interests.includes(option.value)
                        ? 'bg-primary border-primary'
                        : 'border-border'
                    }`}
                  >
                    {formData.interests.includes(option.value) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              알림 설정
            </label>
            <div className="space-y-3">
              <label className="flex justify-between items-center p-3.5 bg-background rounded-lg cursor-pointer">
                <span className="text-sm text-foreground">이메일 알림</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.emailNotify}
                    onChange={(e) => setFormData(prev => ({ ...prev, emailNotify: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-[26px] bg-border rounded-full peer-checked:bg-primary transition-all"></div>
                  <div className="absolute top-[3px] left-[3px] w-5 h-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-[22px]"></div>
                </div>
              </label>
              
              <label className="flex justify-between items-center p-3.5 bg-background rounded-lg cursor-pointer">
                <span className="text-sm text-foreground">인기 키워드 알림</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.trendNotify}
                    onChange={(e) => setFormData(prev => ({ ...prev, trendNotify: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-[26px] bg-border rounded-full peer-checked:bg-primary transition-all"></div>
                  <div className="absolute top-[3px] left-[3px] w-5 h-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-[22px]"></div>
                </div>
              </label>
            </div>
          </div>
            </>
          )}

          {activeTab === 'api' && (
            <>
              {/* API Keys Info Banner */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
                <div className="flex items-start gap-3">
                  <Settings className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">API 키 설정</p>
                    <p className="text-xs text-muted-foreground">
                      뉴스 검색, AI 분석 기능을 사용하려면 API 키를 설정해야 합니다.
                      API 키는 브라우저에 안전하게 저장됩니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* API Key Inputs */}
              <div className="space-y-5">
                {API_KEY_CONFIG.map((config) => (
                  <div key={config.key} className="p-4 bg-background rounded-xl border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <label className="block text-sm font-medium text-foreground">
                          {config.label}
                        </label>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {config.description}
                        </p>
                      </div>
                      {config.helpUrl !== '#' && (
                        <a
                          href={config.helpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline"
                        >
                          키 발급하기 →
                        </a>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <div className="relative flex-1">
                        <input
                          type={showKeys[config.key] ? 'text' : 'password'}
                          value={apiFormData[config.key]}
                          onChange={(e) => handleApiKeyChange(config.key, e.target.value)}
                          placeholder={config.placeholder}
                          className="w-full pl-4 pr-10 py-2.5 border-2 border-border rounded-lg text-sm font-mono transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                        />
                        <button
                          type="button"
                          onClick={() => toggleShowKey(config.key)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showKeys[config.key] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <button
                        onClick={() => testApiKey(config.key)}
                        disabled={apiKeyStatus[config.key] === 'testing' || !apiFormData[config.key].trim()}
                        className="px-4 py-2.5 bg-background border-2 border-border rounded-lg text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {apiKeyStatus[config.key] === 'testing' ? '검증 중...' : '검증'}
                      </button>
                    </div>
                    
                    {/* Status Message */}
                    {apiKeyStatus[config.key] !== 'idle' && (
                      <div className={`flex items-center gap-2 mt-2 text-xs ${
                        apiKeyStatus[config.key] === 'valid' ? 'text-green-600' :
                        apiKeyStatus[config.key] === 'invalid' ? 'text-red-500' :
                        'text-primary'
                      }`}>
                        {getStatusIcon(apiKeyStatus[config.key])}
                        <span>{getStatusText(apiKeyStatus[config.key])}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-700">
                    <strong>보안 안내:</strong> API 키는 로컬 브라우저에만 저장되며 서버로 전송되지 않습니다.
                    공용 컴퓨터에서는 API 키를 저장하지 마세요.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-border flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg text-sm font-medium bg-background text-primary border-2 border-primary transition-all hover:bg-primary/10"
          >
            취소
          </button>
          {activeTab === 'profile' ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 rounded-lg text-sm font-medium gradient-primary text-white transition-all hover:translate-y-[-2px] hover:shadow-md"
            >
              프로필 저장
            </button>
          ) : (
            <button
              onClick={handleSaveApiKeys}
              className="px-6 py-3 rounded-lg text-sm font-medium gradient-primary text-white transition-all hover:translate-y-[-2px] hover:shadow-md"
            >
              API 키 저장
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
