import React from "react";

const LocationSearchPanel = (props) => {
  if (props.isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (props.suggestions.length === 0 && !props.isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">
        <i className="ri-map-pin-line text-4xl mb-3"></i>
        <p>No suggestions found</p>
        <p className="text-sm mt-1">Try entering a more specific location</p>
      </div>
    );
  }

  return (
    <div className="my-6">
      <div className="space-y-3">
        {props.suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100 hover:border-gray-900"
            onClick={() => props.onSuggestionClick(suggestion)}
          >
            <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
              <i className="ri-map-pin-2-line text-gray-900 text-xl"></i>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{suggestion.display_name}</h4>
              <p className="text-xs text-gray-500 truncate">
                {suggestion.address?.city || suggestion.address?.town || 
                 suggestion.address?.village || suggestion.address?.county || 
                 'Unknown location'}
              </p>
            </div>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSearchPanel;