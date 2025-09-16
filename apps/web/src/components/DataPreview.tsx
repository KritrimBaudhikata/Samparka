'use client';

import React from 'react';
import { Code, Eye, EyeOff } from 'lucide-react';

interface DataPreviewProps {
  data: any;
  useCase: string;
}

export default function DataPreview({ data, useCase }: DataPreviewProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!data) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <Code className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">Data Preview</h3>
        <p className="text-gray-500">Start a conversation to see the structured data being collected</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-primary-600" />
            <h3 className="font-semibold text-gray-800">Data Preview</h3>
            <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
              {useCase}
            </span>
          </div>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            {isVisible ? (
              <EyeOff className="h-4 w-4 text-gray-600" />
            ) : (
              <Eye className="h-4 w-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>
      
      {isVisible && (
        <div className="p-4">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Collected Fields:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {Object.keys(data).map((key) => (
                  <li key={key} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Validation Status:</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">All required fields collected</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Data format validated</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Awaiting confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
