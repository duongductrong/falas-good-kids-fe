import { ApiResponse, http } from "@/lib/http";
import { createQuery } from "react-query-kit";

export interface MonthlyHistoryRequest {
  limit?: number;
  excludeCurrent?: boolean;
}

export interface MonthlyHistoryPlayer {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  scores: number;
  rank: 1 | 2 | 3;
  voters: Array<{
    id: number;
    name: string;
    avatar?: string;
  }>;
}

export interface MonthlyHistoryItem {
  monthLabel: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  topPlayers: MonthlyHistoryPlayer[];
}

export interface MonthlyHistoryResponse
  extends ApiResponse<MonthlyHistoryItem[]> {}

// Mockup data for development (used when API is not available)
const mockupMonthlyHistory: MonthlyHistoryItem[] = [
  {
    monthLabel: "November 2025",
    startDate: "2025-11-01T00:00:00.000Z",
    endDate: "2025-11-30T23:59:59.999Z",
    isCurrent: false,
    topPlayers: [
      {
        id: 42,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        scores: 127,
        rank: 1,
        voters: [],
      },
      {
        id: 89,
        name: "Bob Smith",
        email: "bob.smith@example.com",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        scores: 98,
        rank: 2,
        voters: [],
      },
      {
        id: 23,
        name: "Carol Williams",
        email: "carol.williams@example.com",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        scores: 76,
        rank: 3,
        voters: [],
      },
    ],
  },
  {
    monthLabel: "October 2025",
    startDate: "2025-10-01T00:00:00.000Z",
    endDate: "2025-10-31T23:59:59.999Z",
    isCurrent: false,
    topPlayers: [
      {
        id: 67,
        name: "David Chen",
        email: "david.chen@example.com",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        scores: 145,
        rank: 1,
        voters: [],
      },
      {
        id: 12,
        name: "Emma Davis",
        email: "emma.davis@example.com",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
        scores: 112,
        rank: 2,
        voters: [],
      },
      {
        id: 98,
        name: "Frank Wilson",
        email: "frank.wilson@example.com",
        avatar:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
        scores: 89,
        rank: 3,
        voters: [],
      },
    ],
  },
  {
    monthLabel: "September 2025",
    startDate: "2025-09-01T00:00:00.000Z",
    endDate: "2025-09-30T23:59:59.999Z",
    isCurrent: false,
    topPlayers: [
      {
        id: 34,
        name: "Grace Lee",
        email: "grace.lee@example.com",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        scores: 93,
        rank: 1,
        voters: [],
      },
      {
        id: 56,
        name: "Henry Kim",
        email: "henry.kim@example.com",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        scores: 81,
        rank: 2,
        voters: [],
      },
      {
        id: 78,
        name: "Isabella Rodriguez",
        email: "isabella.rodriguez@example.com",
        avatar:
          "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
        scores: 67,
        rank: 3,
        voters: [],
      },
    ],
  },
  {
    monthLabel: "August 2025",
    startDate: "2025-08-01T00:00:00.000Z",
    endDate: "2025-08-31T23:59:59.999Z",
    isCurrent: false,
    topPlayers: [
      {
        id: 91,
        name: "Jack Thompson",
        email: "jack.thompson@example.com",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        scores: 134,
        rank: 1,
        voters: [],
      },
      {
        id: 45,
        name: "Katherine Park",
        email: "katherine.park@example.com",
        avatar:
          "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150&fit=crop&crop=face",
        scores: 119,
        rank: 2,
        voters: [],
      },
    ],
  },
  {
    monthLabel: "July 2025",
    startDate: "2025-07-01T00:00:00.000Z",
    endDate: "2025-07-31T23:59:59.999Z",
    isCurrent: false,
    topPlayers: [],
  },
  {
    monthLabel: "June 2025",
    startDate: "2025-06-01T00:00:00.000Z",
    endDate: "2025-06-30T23:59:59.999Z",
    isCurrent: false,
    topPlayers: [
      {
        id: 22,
        name: "Lucas Martinez",
        email: "lucas.martinez@example.com",
        avatar:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
        scores: 156,
        rank: 1,
        voters: [],
      },
      {
        id: 88,
        name: "Maya Patel",
        email: "maya.patel@example.com",
        avatar:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
        scores: 142,
        rank: 2,
        voters: [],
      },
      {
        id: 55,
        name: "Noah Anderson",
        email: "noah.anderson@example.com",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
        scores: 128,
        rank: 3,
        voters: [],
      },
    ],
  },
];

export const useLeaderboardMonthlyHistory = createQuery<
  MonthlyHistoryResponse,
  MonthlyHistoryRequest
>({
  queryKey: ["leaderboard/monthly-history"],
  fetcher: async ({ limit = 6, excludeCurrent = true }) => {
    try {
      const response = await http.get("leaderboard/monthly-history", {
        params: {
          limit,
          excludeCurrent,
        },
      });
      return response.data;
    } catch (error) {
      // Return mockup data if API is not available
      console.warn(
        "Monthly history API not available, using mockup data:",
        error
      );
      return {
        status: true,
        statusCode: 200,
        path: "/leaderboard/monthly-history",
        data: mockupMonthlyHistory.slice(0, limit),
        message: "Monthly history retrieved successfully (mockup data)",
        timestamp: new Date().toISOString(),
        meta: {
          page: 1,
          size: limit,
          total: mockupMonthlyHistory.length,
        },
      } as MonthlyHistoryResponse;
    }
  },
});
