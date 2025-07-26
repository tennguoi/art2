import React, { useState } from 'react';
import { Post } from '../types/api';
import { apiService } from '../services/api';
import { useApi } from '../hooks/useApi';

const PostList: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  
  const { data: posts, loading, error, refetch } = useApi<Post[]>(
    () => {
      const endpoint = selectedUserId 
        ? `/posts?userId=${selectedUserId}` 
        : '/posts';
      return apiService.get<Post[]>(endpoint);
    },
    [selectedUserId]
  );

  const handleUserFilter = (userId: number | null) => {
    setSelectedUserId(userId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-2 text-gray-600">Đang tải danh sách posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-red-600 font-medium">Lỗi khi tải dữ liệu:</div>
          <button
            onClick={refetch}
            className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
        <div className="text-red-500 text-sm mt-1">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Danh sách Posts</h2>
        
        <div className="flex items-center gap-2">
          <select
            value={selectedUserId || ''}
            onChange={(e) => handleUserFilter(e.target.value ? Number(e.target.value) : null)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Tất cả users</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map(userId => (
              <option key={userId} value={userId}>User {userId}</option>
            ))}
          </select>
          
          <button
            onClick={refetch}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Làm mới
          </button>
        </div>
      </div>
      
      <div className="grid gap-4">
        {posts?.slice(0, 20).map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-800 flex-1">{post.title}</h3>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded ml-2">
                User {post.userId}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;