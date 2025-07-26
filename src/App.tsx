import React, { useState } from 'react';
import UserList from './components/UserList';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';

type TabType = 'users' | 'posts' | 'create';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('users');

  const tabs = [
    { id: 'users' as TabType, label: 'Users', icon: '👥' },
    { id: 'posts' as TabType, label: 'Posts', icon: '📝' },
    { id: 'create' as TabType, label: 'Tạo Post', icon: '➕' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🚀 Demo API Fetch với React
          </h1>
          <p className="text-gray-600">
            Ví dụ về cách fetch API từ frontend để sử dụng dữ liệu từ backend
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'users' && <UserList />}
          {activeTab === 'posts' && <PostList />}
          {activeTab === 'create' && <CreatePost />}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            💡 Ứng dụng này demo các phương thức HTTP: GET, POST, PUT, DELETE
          </p>
          <p className="mt-1">
            🔗 Sử dụng JSONPlaceholder API làm backend demo
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;