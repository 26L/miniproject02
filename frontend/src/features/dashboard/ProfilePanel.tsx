import { User, Edit3 } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  avatar: string | null;
  interests: string[];
  stats: {
    searches: number;
    bookmarks: number;
    readArticles: number;
  };
}

interface ProfilePanelProps {
  profile: UserProfile;
  onEditClick: () => void;
}

const CATEGORY_NAMES: Record<string, string> = {
  politics: '정치',
  economy: '경제',
  society: '사회',
  technology: '기술',
  sports: '스포츠',
};

export function ProfilePanel({ profile, onEditClick }: ProfilePanelProps) {
  return (
    <section className="gradient-primary text-white rounded-xl overflow-hidden shadow-md mb-6 transition-all hover:shadow-lg">
      <div className="p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-5 relative">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl border-2 border-white/30 overflow-hidden flex-shrink-0">
            {profile.avatar ? (
              <img src={profile.avatar} alt="프로필 이미지" className="w-full h-full object-cover" />
            ) : (
              <User className="h-8 w-8" />
            )}
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate">{profile.name}</h3>
            <p className="text-xs opacity-80 truncate">{profile.email}</p>
          </div>
          
          {/* Edit Button */}
          <button
            onClick={onEditClick}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all flex-shrink-0"
            aria-label="프로필 편집"
          >
            <Edit3 className="h-4 w-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-around py-4 border-t border-b border-white/20 mb-4">
          <div className="text-center">
            <span className="block text-xl font-bold">{profile.stats.searches}</span>
            <span className="text-xs opacity-80">검색</span>
          </div>
          <div className="text-center">
            <span className="block text-xl font-bold">{profile.stats.bookmarks}</span>
            <span className="text-xs opacity-80">북마크</span>
          </div>
          <div className="text-center">
            <span className="block text-xl font-bold">{profile.stats.readArticles}</span>
            <span className="text-xs opacity-80">읽은 기사</span>
          </div>
        </div>

        {/* Interests */}
        <div>
          <h4 className="text-sm font-medium opacity-90 mb-3">관심 분야</h4>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="bg-white/20 px-3 py-1.5 rounded-full text-xs font-medium"
              >
                {CATEGORY_NAMES[interest] || interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export type { UserProfile };
