import { useState, useRef, useEffect } from 'react';
import { X, Camera, User } from 'lucide-react';
import type { UserProfile } from './ProfilePanel';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

const INTEREST_OPTIONS = [
  { value: 'politics', label: '정치' },
  { value: 'economy', label: '경제' },
  { value: 'society', label: '사회' },
  { value: 'technology', label: '기술' },
  { value: 'sports', label: '스포츠' },
];

export function ProfileModal({ isOpen, onClose, profile, onSave }: ProfileModalProps) {
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    avatar: profile.avatar,
    interests: profile.interests,
    emailNotify: false,
    trendNotify: true,
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 모달이 열릴 때 profile로 초기화
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: profile.name,
        email: profile.email,
        avatar: profile.avatar,
        interests: profile.interests,
        emailNotify: false,
        trendNotify: true,
      });
    }
  }, [isOpen, profile]);

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



  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] opacity-0 animate-[fadeIn_0.25s_forwards]"
      onClick={handleOverlayClick}
      style={{ animation: 'fadeIn 0.25s forwards' }}
    >
      <div className="bg-white rounded-xl shadow-lg max-w-[560px] w-[90%] max-h-[90vh] overflow-y-auto transform scale-95 animate-[scaleIn_0.25s_forwards]">
        {/* Modal Header */}
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">프로필 설정</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:bg-background rounded-md transition-all"
              aria-label="닫기"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
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
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-border flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg text-sm font-medium bg-background text-primary border-2 border-primary transition-all hover:bg-primary/10"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-lg text-sm font-medium gradient-primary text-white transition-all hover:translate-y-[-2px] hover:shadow-md"
          >
            저장
          </button>
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
