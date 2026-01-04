import { VietnamUserMap } from "@/features/dashboard/components/map/VietnamUserMap.tsx";
import { Podium3D } from "@/features/dashboard/components/Podium3D.tsx";
import { RegistrationLineChart } from "@/features/dashboard/components/RegistrationLineChart.tsx";
import { StatsCard } from "@/features/dashboard/components/StatsCard.tsx";
import { TopCreatorsRanking } from "@/features/dashboard/components/TopCreatorsRanking.tsx";
import { TopLikedPosts } from "@/features/dashboard/components/TopLikedPosts.tsx";
import { ViolatedPostsChart } from "@/features/dashboard/components/ViolatedPostsChart.tsx";
import { useGetPostStatisticsQuery, useGetUserStatisticsQuery } from "@/features/dashboard/services/dashboardApi";
import { AlertTriangle, TrendingUp, Users } from "lucide-react";

export const AdminDashboardPage: React.FC = () => {
  const { data: userStats, isLoading: userLoading, error: userError } = useGetUserStatisticsQuery({
    topInfluencersLimit: 3,
    recentRegistrationsLimit: 7,
    topPostCreatorsLimit: 5,
  });

  const { data: postStats, isLoading: postLoading, error: postError } = useGetPostStatisticsQuery({
    topPostsLimit: 10,
    recentViolatedPostsLimit: 5,
  });

  if (userLoading || postLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-600 rounded-full animate-spin animation-delay-150" />
        </div>
      </div>
    );
  }

  if (userError || postError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
            Không thể tải dữ liệu
          </h3>
          <p className="text-gray-600 text-center">
            Vui lòng thử lại sau hoặc liên hệ quản trị viên.
          </p>
        </div>
      </div>
    );
  }

  const userData = userStats?.data;
  const postData = postStats?.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Dashboard Thống Kê
          </h1>
          <p className="text-gray-600">
            Tổng quan về người dùng và bài viết của hệ thống
          </p>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Tổng Số Người Dùng"
            value={userData?.totalUsers || 0}
            icon={Users}
            gradient="from-blue-500 to-blue-700"
            iconColor="text-white"
          />
          <StatsCard
            title="Tổng Bài Viết Được Yêu Thích"
            value={postData?.topLikedPosts?.length || 0}
            icon={TrendingUp}
            gradient="from-green-500 to-emerald-700"
            iconColor="text-white"
          />
          <StatsCard
            title="Bài Viết Vi Phạm"
            value={postData?.totalViolatedPosts || 0}
            icon={AlertTriangle}
            gradient="from-red-500 to-red-700"
            iconColor="text-white"
          />
        </div>

        {/* User Statistics Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
            Thống Kê Người Dùng
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Influencers */}
            {userData?.topInfluencers && userData.topInfluencers.length > 0 && (
              <Podium3D influencers={userData.topInfluencers} />
            )}

            {/* Registration Chart */}
            {userData?.recentRegistrations &&
              userData.recentRegistrations.length > 0 && (
                <RegistrationLineChart data={userData.recentRegistrations} />
              )}
          </div>

          {/* Top Post Creators */}
          {userData?.topPostCreators && userData.topPostCreators.length > 0 && (
            <div className="mt-6">
              <TopCreatorsRanking creators={userData.topPostCreators} />
            </div>
          )}

          {/* Vietnam User Map - Full Width */}
          {userData?.cityStatistics && userData.cityStatistics.length > 0 && (
            <div className="mt-6">
              <VietnamUserMap cityStatistics={userData.cityStatistics} />
            </div>
          )}
        </div>

        {/* Post Statistics Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-red-500 rounded-full" />
            Thống Kê Bài Viết
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Liked Posts */}
            {postData?.topLikedPosts && postData.topLikedPosts.length > 0 && (
              <TopLikedPosts posts={postData.topLikedPosts} />
            )}

            {/* Violated Posts Chart */}
            {postData?.recentViolatedPosts &&
              postData.recentViolatedPosts.length > 0 && (
                <ViolatedPostsChart posts={postData.recentViolatedPosts} />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;