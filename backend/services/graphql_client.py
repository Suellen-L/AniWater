import requests

ANILIST_URL = "https://graphql.anilist.co"

def fetch_animes_by_season(season="SUMMER", year=2023):
    query = """
    query ($season: MediaSeason, $year: Int) {
      Page(page: 1, perPage: 20) {
        media(season: $season, seasonYear: $year, type: ANIME) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          genres
          description
        }
      }
    }
    """
    variables = {
        "season": season.upper(),
        "year": int(year)
    }

    response = requests.post(ANILIST_URL, json={"query": query, "variables": variables})
    return response.json()