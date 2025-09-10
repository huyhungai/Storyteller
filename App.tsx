import React, { useState, useCallback, useEffect } from 'react';
import type { StoryAnalysisResult, FormData, Audience, Preset } from './types';
import { enhanceStory } from './services/geminiService';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import { PRESETS as DEFAULT_PRESETS } from './constants';

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

  const [userPresets, setUserPresets] = useState<Preset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string>('custom');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<StoryAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedPresets = localStorage.getItem('storyteller_presets');
      if (savedPresets) {
        setUserPresets(JSON.parse(savedPresets));
      } else {
        // If no presets in localStorage, load defaults and save them
        setUserPresets(DEFAULT_PRESETS);
        localStorage.setItem('storyteller_presets', JSON.stringify(DEFAULT_PRESETS));
      }
    } catch (e) {
      console.error("Failed to load presets from localStorage", e);
      setUserPresets(DEFAULT_PRESETS);
    }
  }, []);

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
    const preset = userPresets.find(p => p.name === presetName);
    if (preset) {
        if (formData.inputText.trim() !== '' && formData.inputText.trim() !== preset.settings.prompt.trim()) {
            if (!window.confirm('Hành động này sẽ ghi đè lên nội dung hiện tại của bạn. Bạn có muốn tiếp tục không?')) {
                // If user cancels, revert the dropdown selection
                setSelectedPreset(selectedPreset); 
                return;
            }
        }
      setFormData(prev => ({
        ...prev,
        inputText: preset.settings.prompt,
        storyStyle: preset.settings.storyStyle,
        language: preset.settings.language,
        audience: { ...preset.settings.audience },
      }));
    }
  }, [userPresets, formData.inputText, selectedPreset]);
  
  const handleSavePreset = () => {
    const presetName = window.prompt("Nhập tên cho cài đặt của bạn:");
    if (!presetName || presetName.trim() === '') {
      return; // User cancelled or entered empty name
    }

    const existingPresetIndex = userPresets.findIndex(p => p.name === presetName);
    if (existingPresetIndex !== -1) {
      if (!window.confirm(`Cài đặt "${presetName}" đã tồn tại. Bạn có muốn ghi đè không?`)) {
        return;
      }
    }

    const newPreset: Preset = {
      name: presetName.trim(),
      settings: {
        storyStyle: formData.storyStyle,
        language: formData.language,
        audience: { ...formData.audience },
        prompt: formData.inputText, // Save current text as the prompt for this preset
      }
    };

    let updatedPresets;
    if (existingPresetIndex !== -1) {
        updatedPresets = [...userPresets];
        updatedPresets[existingPresetIndex] = newPreset;
    } else {
        updatedPresets = [...userPresets, newPreset];
    }
    
    setUserPresets(updatedPresets);
    localStorage.setItem('storyteller_presets', JSON.stringify(updatedPresets));
    setSelectedPreset(newPreset.name);
    alert(`Đã lưu cài đặt "${newPreset.name}"!`);
  };

  const handleDeletePreset = () => {
    if (selectedPreset === 'custom') return;

    if (window.confirm(`Bạn có chắc chắn muốn xóa cài đặt "${selectedPreset}" không?`)) {
      const updatedPresets = userPresets.filter(p => p.name !== selectedPreset);
      setUserPresets(updatedPresets);
      localStorage.setItem('storyteller_presets', JSON.stringify(updatedPresets));
      setSelectedPreset('custom');
      alert(`Đã xóa cài đặt "${selectedPreset}".`);
    }
  };


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
          presets={userPresets}
          selectedPreset={selectedPreset}
          onPresetChange={handlePresetChange}
          onSavePreset={handleSavePreset}
          onDeletePreset={handleDeletePreset}
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