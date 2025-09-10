import React from 'react';
import type { FormData, Audience } from '../types';
import { STORY_STYLES, LANGUAGES, OUTPUT_LENGTHS, PRESETS } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputFormProps {
  formData: FormData;
  isLoading: boolean;
  onFormChange: (field: keyof FormData, value: any) => void;
  onAudienceChange: (field: keyof Audience, value: string) => void;
  onSubmit: () => void;
  selectedPreset: string;
  onPresetChange: (name: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ formData, isLoading, onFormChange, onAudienceChange, onSubmit, selectedPreset, onPresetChange }) => {
  const commonInputClass = "w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors";
  const commonLabelClass = "block text-sm font-medium text-gray-400 mb-1";
  
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg space-y-6">
      <div>
        <label htmlFor="stylePreset" className={commonLabelClass}>
          Chọn cài đặt sẵn (Preset)
        </label>
        <select
          id="stylePreset"
          value={selectedPreset}
          onChange={(e) => onPresetChange(e.target.value)}
          className={commonInputClass}
        >
          <option value="custom">-- Tùy chỉnh --</option>
          {PRESETS.map(preset => <option key={preset.name} value={preset.name}>{preset.name}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="inputText" className={commonLabelClass}>
          Câu chuyện của bạn
        </label>
        <textarea
          id="inputText"
          value={formData.inputText}
          onChange={(e) => onFormChange('inputText', e.target.value)}
          placeholder="Dán hoặc viết câu chuyện của bạn vào đây..."
          rows={10}
          className={commonInputClass}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="storyStyle" className={commonLabelClass}>Phong cách kể chuyện</label>
          <select
            id="storyStyle"
            value={formData.storyStyle}
            onChange={(e) => onFormChange('storyStyle', e.target.value)}
            className={commonInputClass}
          >
            {STORY_STYLES.map(style => <option key={style} value={style}>{style}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="language" className={commonLabelClass}>Ngôn ngữ</label>
          <select
            id="language"
            value={formData.language}
            onChange={(e) => onFormChange('language', e.target.value)}
            className={commonInputClass}
          >
            {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="outputLength" className={commonLabelClass}>Độ dài đầu ra (chữ)</label>
          <select
            id="outputLength"
            value={formData.outputLength}
            onChange={(e) => onFormChange('outputLength', parseInt(e.target.value))}
            className={commonInputClass}
          >
            {OUTPUT_LENGTHS.map(len => <option key={len} value={len}>{len}</option>)}
          </select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Độc giả mục tiêu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label htmlFor="audienceAge" className={commonLabelClass}>Độ tuổi</label>
            <input type="text" id="audienceAge" value={formData.audience.age} onChange={e => onAudienceChange('age', e.target.value)} className={commonInputClass} />
          </div>
          <div>
            <label htmlFor="audienceGender" className={commonLabelClass}>Giới tính</label>
            <input type="text" id="audienceGender" value={formData.audience.gender} onChange={e => onAudienceChange('gender', e.target.value)} className={commonInputClass} />
          </div>
          <div>
            <label htmlFor="audienceExpertise" className={commonLabelClass}>Chuyên môn</label>
            <input type="text" id="audienceExpertise" value={formData.audience.expertise} onChange={e => onAudienceChange('expertise', e.target.value)} className={commonInputClass} />
          </div>
          <div>
            <label htmlFor="audienceInterests" className={commonLabelClass}>Mối quan tâm</label>
            <input type="text" id="audienceInterests" value={formData.audience.interests} onChange={e => onAudienceChange('interests', e.target.value)} className={commonInputClass} />
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {isLoading ? (
            'Đang phân tích...'
          ) : (
            <>
              <SparklesIcon />
              <span className="ml-2">Giúp tôi kể chuyện hay hơn</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
