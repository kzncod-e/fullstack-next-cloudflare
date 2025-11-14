export const dummyData = {
  sessionId: "2025-11-13-001",
  agent: "SocialAgent-01",
  platform: "TikTok",
  startTime: "2025-11-13T15:00:00Z",
  endTime: "2025-11-13T15:10:00Z",
  status: "completed",
  activities: [
    {
      type: "login",
      status: "done",
      timestamp: "2025-11-13T15:00:10Z",
      details: "User logged in successfully.",
    },
    {
      type: "post",
      status: "done",
      timestamp: "2025-11-13T15:01:00Z",
      details: "Posted content about AI automation trends.",
      post: {
        id: "post_001",
        title: "5 Cara AI Mengubah Dunia Marketing",
        caption: "AI bukan masa depan — AI adalah sekarang. 🚀",
        link: "https://tiktok.com/@agent/video/123456",
      },
    },
    {
      type: "scroll_feed",
      status: "done",
      timestamp: "2025-11-13T15:02:00Z",
      viewedPosts: [
        { id: "post_002", author: "@techdaily", title: "Keren banget AI art ini!" },
        { id: "post_003", author: "@startuplab", title: "Cara bikin bot Telegram pakai Node.js" },
        { id: "post_004", author: "@dataindie", title: "5 tools buat data analysis 2025" },
      ],
    },
    {
      type: "watch_video",
      status: "done",
      timestamp: "2025-11-13T15:03:00Z",
      videos: [
        { id: "vid_001", title: "Cara kerja algoritma TikTok", duration: "00:45" },
        { id: "vid_002", title: "Belajar React Native 2025", duration: "00:30" },
      ],
    },
    {
      type: "like",
      status: "done",
      timestamp: "2025-11-13T15:05:00Z",
      likedPosts: [
        { id: "post_005", title: "10 Ide Konten TikTok buat Dev", author: "@frontendfun" },
        { id: "post_006", title: "Belajar Next.js 15 dalam 5 Menit", author: "@devdaily" },
        { id: "post_007", title: "Gimana AI bantu lo tidur lebih cepat", author: "@techrelax" },
      ],
    },
    {
      type: "bookmark",
      status: "done",
      timestamp: "2025-11-13T15:06:00Z",
      savedPosts: [
        { id: "post_006", title: "Belajar Next.js 15 dalam 5 Menit" },
        { id: "post_008", title: "Optimasi SEO di 2025" },
      ],
    },
    {
      type: "comment",
      status: "done",
      timestamp: "2025-11-13T15:08:00Z",
      commentedPosts: [
        {
          id: "post_009",
          title: "Cara kerja algoritma TikTok",
          author: "@datainsight",
          comment: "Insightful banget, thanks udah share!",
        },
        {
          id: "post_010",
          title: "AI dan masa depan content creator",
          author: "@creativeai",
          comment: "Setuju! AI bantu ide tapi tetap butuh kreativitas manusia 🔥",
        },
      ],
    },
    {
      type: "follow",
      status: "done",
      timestamp: "2025-11-13T15:09:00Z",
      followedAccounts: [
        { username: "@aiupdates", name: "AI Updates" },
        { username: "@techindonesia", name: "Tech Indonesia" },
      ],
    },
  ],
  summary: {
    totalActions: 8,
    successRate: "100%",
    notes: "All actions executed naturally without detection.",
  },
};
