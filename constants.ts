import type { Preset } from './types';

export const STORY_STYLES: string[] = [
  'Hài hước',
  'Hồi hộp',
  'Lãng mạn',
  'Bi kịch',
  'Sử thi',
  'Kinh dị',
  'Phong cách Ernest Hemingway',
  'Phong cách Nguyễn Nhật Ánh',
  'Phong cách J.K. Rowling',
  'Tường thuật chuyên nghiệp',
];

export const LANGUAGES: string[] = ['Tiếng Việt', 'English'];

export const OUTPUT_LENGTHS: number[] = [200, 500, 1000];

export const PRESETS: Preset[] = [
  {
    name: 'Truyện Cổ Tích Cho Trẻ Em',
    settings: {
      storyStyle: 'Phong cách Nguyễn Nhật Ánh',
      language: 'Tiếng Việt',
      audience: {
        age: '5-10 tuổi',
        gender: 'Mọi giới',
        expertise: 'Phổ thông',
        interests: 'Những câu chuyện diệu kỳ, bài học cuộc sống',
      },
    },
  },
  {
    name: 'Báo Cáo Kinh Doanh Chuyên Nghiệp',
    settings: {
      storyStyle: 'Tường thuật chuyên nghiệp',
      language: 'English',
      audience: {
        age: '30-55 tuổi',
        gender: 'Mọi giới',
        expertise: 'Kinh doanh, Tài chính',
        interests: 'Phân tích dữ liệu, chiến lược thị trường',
      },
    },
  },
  {
    name: 'Truyện Ngắn Lãng Mạn',
    settings: {
      storyStyle: 'Lãng mạn',
      language: 'Tiếng Việt',
      audience: {
        age: '18-35 tuổi',
        gender: 'Nữ',
        expertise: 'Phổ thông',
        interests: 'Tình yêu, các mối quan hệ',
      },
    },
  },
   {
    name: 'Kịch Bản Phim Kinh Dị',
    settings: {
      storyStyle: 'Kinh dị',
      language: 'English',
      audience: {
        age: '18-40 tuổi',
        gender: 'Mọi giới',
        expertise: 'Phổ thông',
        interests: 'Phim ảnh, truyện hồi hộp, tâm lý học',
      },
    },
  },
];
