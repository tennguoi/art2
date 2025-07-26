import React from 'react';
import { User } from '../types/api';
import { apiService } from '../services/api';
import { useApi } from '../hooks/useApi';

const UserList: React.FC = () => {
  const { data: users, loading, error, refetch } = useApi<User[]>(
    () => apiService.get<User[]>('/users')
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Đang tải danh sách users...</span>
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
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Danh sách Users</h2>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Làm mới
        </button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users?.map((user) => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-800 mb-2">{user.name}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>📧 {user.email}</p>
              <p>📞 {user.phone}</p>
              <p>🌐 {user.website}</p>
              <p>🏢 {user.company.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;