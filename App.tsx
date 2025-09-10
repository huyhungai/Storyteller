import React, { useState, useCallback } from 'react';
import type { StoryAnalysisResult, FormData, Audience } from './types';
import { enhanceStory } from './services/geminiService';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import { PRESETS } from './constants';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    inputText: '',
    storyStyle: 'Hài hước',
    language: 'Tiếng Việt',
    audience: {
      age: 'Mọi lứa tuổi',
      gender: 'Mọi giới',
      expertise: 'Phổ thông',
      interests: 'Không xác định',
    },
    outputLength: 500,
  });

  const [selectedPreset, setSelectedPreset] = useState<string>('custom');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<StoryAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSelectedPreset('custom');
  }, []);

  const handleAudienceChange = useCallback((field: keyof Audience, value: string) => {
    setFormData(prev => ({
      ...prev,
      audience: { ...prev.audience, [field]: value },
    }));
    setSelectedPreset('custom');
  }, []);

  const handlePresetChange = useCallback((presetName: string) => {
    setSelectedPreset(presetName);
    if (presetName === 'custom') {
      return;
    }
    const preset = PRESETS.find(p => p.name === presetName);
    if (preset) {
      setFormData(prev => ({
        ...prev,
        storyStyle: preset.settings.storyStyle,
        language: preset.settings.language,
        audience: { ...preset.settings.audience },
      }));
    }
  }, []);

  const handleSubmit = async () => {
    if (!formData.inputText.trim()) {
      setError('Vui lòng nhập vào câu chuyện của bạn.');
      return;
    }
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const apiResult = await enhanceStory(formData);
      setResult(apiResult);
    } catch (err) {
      console.error(err);
      setError('Đã có lỗi xảy ra khi phân tích câu chuyện. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <p className="text-center text-lg text-gray-400 mb-8">
          Biến ý tưởng của bạn thành những câu chuyện lôi cuốn. Nhập văn bản, chọn phong cách và để AI giúp bạn hoàn thiện.
        </p>
        
        <InputForm
          formData={formData}
          onFormChange={handleFormChange}
          onAudienceChange={handleAudienceChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          selectedPreset={selectedPreset}
          onPresetChange={handlePresetChange}
        />

        {error && (
          <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {isLoading && <Loader />}

        {result && !isLoading && (
          <div className="mt-12">
            <ResultDisplay result={result} />
          </div>
        )}
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
