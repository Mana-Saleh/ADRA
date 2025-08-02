import React from 'react';

interface SearchInputProps {
  isSticky?: boolean;
  onSearch?: (query: string) => void; // Optional callback
}

const SearchInput: React.FC<SearchInputProps> = ({ isSticky = false, onSearch }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('search') as string;
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          name="search" // Add name for FormData
          type="text"
          placeholder="Search destinations, activities..."
          className={`w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 ${
            isSticky 
              ? 'bg-card text-foreground border border-input shadow-md focus:ring-2 focus:ring-ring'
              : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 placeholder-white/80 focus:ring-2 focus:ring-white/50'
          } focus:outline-none focus:border-transparent`}
        />
      </div>
    </form>
  );
};

export default SearchInput;