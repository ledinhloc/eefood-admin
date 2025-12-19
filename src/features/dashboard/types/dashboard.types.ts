export interface UserInfo {
  id: number;
  username: string;
  email: string;
  avatarUrl: string;
}

export interface TopUserResponse {
  userInfo: UserInfo;
  followerCount: number;
}

export interface UserRegistrationStatsResponse {
  date: string;
  totalUsers: number;
}

export interface TopUserPostResponse {
  userInfo: UserInfo;
  postCount: number;
}

export interface UserStatistics {
  totalUsers: number;
  topInfluencers: TopUserResponse[];
  recentRegistrations: UserRegistrationStatsResponse[];
  topPostCreators: TopUserPostResponse[];
}

export interface TopPostResponse {
  postId: number;
  title: string;
  imageUrl: string;
  userInfo: UserInfo;
  count: number;
  createdAt: string | null;
}

export interface ViolatedPostResponse {
  postId: number;
  title: string;
  content: string;
  userId: number;
  username: string;
  reason: string;
}

export interface PostStatistics {
  topLikedPosts: TopPostResponse[];
  totalViolatedPosts: number;
  recentViolatedPosts: ViolatedPostResponse[];
}

export interface DashboardQueryParams {
  topPostsLimit?: number;
  recentViolatedPostsLimit?: number;
  topInfluencersLimit?: number;
  recentRegistrationsLimit?: number;
  topPostCreatorsLimit?: number;
}
