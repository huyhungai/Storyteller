
import React from 'react';
import type { StoryAnalysisResult, Suggestion } from '../types';
import { AnalyzeIcon } from './icons/AnalyzeIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { PencilIcon } from './icons/PencilIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface ResultDisplayProps {
  result: StoryAnalysisResult;
}

const ResultCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden shadow-lg">
    <div className="p-4 bg-gray-800 flex items-center space-x-3 border-b border-gray-700">
      {icon}
      <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
    </div>
    <div className="p-6 text-gray-300 leading-relaxed">
      {children}
    </div>
  </div>
);

const SuggestionItem: React.FC<{ suggestion: Suggestion }> = ({ suggestion }) => (
  <div className="border-l-4 border-indigo-500 pl-4 py-2 my-4 bg-gray-800 rounded-r-lg">
    <blockquote className="italic text-gray-400 border-l-2 border-gray-600 pl-2">
      "{suggestion.quote}"
    </blockquote>
    <p className="mt-2">
      <span className="font-semibold text-green-400">Đề xuất:</span> {suggestion.change}
    </p>
    <p className="mt-1 text-sm text-gray-400">
      <span className="font-semibold text-purple-400">Lý do:</span> {suggestion.reason}
    </p>
  </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <ResultCard title="Phân Tích" icon={<AnalyzeIcon />}>
        <p className="whitespace-pre-wrap">{result.analysis}</p>
      </ResultCard>

      <ResultCard title="Đề Xuất Cải Thiện" icon={<LightbulbIcon />}>
        {result.suggestions.map((suggestion, index) => (
          <SuggestionItem key={index} suggestion={suggestion} />
        ))}
      </ResultCard>

      <ResultCard title="Bản Viết Lại" icon={<PencilIcon />}>
        <p className="whitespace-pre-wrap font-serif text-lg text-gray-100">{result.rewrittenText}</p>
      </ResultCard>

      <ResultCard title="Bài Tập Về Nhà" icon={<BookOpenIcon />}>
        <p className="whitespace-pre-wrap">{result.homework}</p>
      </ResultCard>
    </div>
  );
};

export default ResultDisplay;
