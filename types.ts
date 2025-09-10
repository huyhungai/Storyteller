export interface Audience {
  age: string;
  gender: string;
  expertise: string;
  interests: string;
}

export interface FormData {
  inputText: string;
  storyStyle: string;
  language: string;
  audience: Audience;
  outputLength: number;
}

export interface Suggestion {
  quote: string;
  change: string;
  reason: string;
}

export interface StoryAnalysisResult {
  analysis: string;
  suggestions: Suggestion[];
  rewrittenText: string;
  homework: string;
}

export interface Preset {
  name: string;
  settings: {
    storyStyle: string;
    language: string;
    audience: Audience;
  };
}
