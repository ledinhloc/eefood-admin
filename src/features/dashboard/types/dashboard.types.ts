export interface VietnamUserMapProps {
  cityStatistics: UserCityStatesResponse[];
}

export interface ProvinceProperties {
  name: string;
  id: string;
}

export interface ProvinceFeature {
  type: 'Feature';
  properties: ProvinceProperties;
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
}

export interface VietnamGeoJSON {
  type: 'FeatureCollection';
  features: ProvinceFeature[];
}

export interface MapStats {
  total: number;
  max: number;
  topCity: {
    city: string;
    totalUsers: number;
  };
}

export interface DisplayData {
  name: string;
  users: number;
}

export interface MapUpdaterProps {
  center: [number, number];
  zoom: number;
}

export interface ProvinceStyle {
  fillColor: string;
  weight: number;
  opacity: number;
  color: string;
  fillOpacity: number;
}

export interface UserCityStatesResponse {
  city: String;
  totalUsers: number;
}

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
  cityStatistics: UserCityStatesResponse[];
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
