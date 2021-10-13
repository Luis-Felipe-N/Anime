export async function animeFetch(type: string) {
    const response = await fetch(`https://api.aniapi.com/v1/${type}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer <YOUR_JWT>',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    });

    const responseJson = await response.json()
    return responseJson
}

// anilist_id: 4282
// banner_image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/4282-2UcZq3DUNH9G.jpg"
// cover_image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx4282-R19YmET0glSZ.jpg"
// descriptions: {en: "November, 1998: Shiki meets a boy named Tomoe Enjo…ure he's killed.\r\n<br><br>\r\n(Source: Aniplex USA)"}
// end_date: "2008-08-16T00:00:00Z"
// episode_duration: 114
// episodes_count: 1
// format: 2
// genres: (22) ['Action', 'Drama', 'Mystery', 'Romance', 'Supernatural', 'Thriller', 'Anti-Hero', 'Female Protagonist', 'Super Power', 'Magic', 'Achronological Order', 'Gore', 'Urban Fantasy', 'Kuudere', 'Primarily Adult Cast', 'Crime', 'Tragedy', 'Seinen', 'Memory Manipulation', 'Love Triangle', 'Urban', 'Primarily Male Cast']
// id: 5441
// mal_id: 4282
// score: 84
// season_period: 2
// season_year: 2008
// start_date: "2008-08-16T00:00:00Z"
// status: 0
// titles: {en: 'Kara no Kyoukai: Mujun Rasen', jp: '空の境界 矛盾螺旋'}
// trailer_url: "https://www.youtube.com/embed/o3nYOOkXRfM"