import type { Preset } from './types';

export const STORY_STYLES: string[] = [
  'Hài hước',
  'Hồi hộp',
  'Lãng mạn',
  'Bi kịch',
  'Sử thi',
  'Kinh dị',
  'Bí ẩn',
  'Khoa học viễn tưởng',
  'Giả tưởng',
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
      prompt: 'Ngày xửa ngày xưa, ở một vương quốc nọ ẩn sâu trong khu rừng xanh thẳm, có một cô bé...',
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
      prompt: 'Executive Summary: This report analyzes the Q3 financial performance, highlighting key growth areas and providing strategic recommendations for the upcoming quarter.',
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
      prompt: 'Hoàng hôn buông xuống trên bãi biển, nhuộm cả một góc trời thành màu cam tím. Anh đứng đó, ngắm nhìn những con sóng vỗ về bờ cát, lòng thầm mong cô sẽ đến...',
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
      prompt: 'INT. ABANDONED HOUSE - NIGHT\n\nThe only light comes from a single, grime-covered window. Dust motes dance in the moonlight. A floorboard CREAKS from the far corner of the room.',
    },
  },
];