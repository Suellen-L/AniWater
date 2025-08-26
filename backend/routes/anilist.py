from flask import Blueprint, jsonify, request
import requests

anilist_bp = Blueprint('anilist', __name__)

# Endpoint e headers da RapidAPI
ANILIST_URL = "https://Anilistmikilior1V1.p.rapidapi.com/"
headers = {
    "X-RapidAPI-Key": "06cdd2fb15msh225e37488a3c5e9p1b6111jsn8fb0e3cd543c",
    "X-RapidAPI-Host": "Anilistmikilior1V1.p.rapidapi.com"
}

# 🔹 Rota para buscar animes por temporada
@anilist_bp.route('/animes', methods=['GET'])
def get_animes_by_season():
    season = request.args.get('season', 'SUMMER')
    year = request.args.get('year', '2023')

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

    response = requests.post(ANILIST_URL, json={"query": query, "variables": variables}, headers=headers)
    return jsonify(response.json())

# 🔹 Rota para buscar mangás por gênero
@anilist_bp.route('/mangas', methods=['GET'])
def get_mangas_by_genre():
    genre = request.args.get('genre', 'Romance')

    query = """
    query ($genre: String) {
      Page(page: 1, perPage: 20) {
        media(genre_in: [$genre], type: MANGA) {
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
        "genre": genre
    }

    response = requests.post(ANILIST_URL, json={"query": query, "variables": variables}, headers=headers)
    return jsonify(response.json())

# 🔹 Rota para buscar detalhes por ID
@anilist_bp.route('/media/<int:media_id>', methods=['GET'])
def get_media_details(media_id):
    query = """
    query ($id: Int) {
      Media(id: $id) {
        id
        title {
          romaji
          english
        }
        description
        coverImage {
          large
        }
        genres
        type
        episodes
        chapters
        status
        averageScore
      }
    }
    """
    variables = { "id": media_id }

    response = requests.post(ANILIST_URL, json={"query": query, "variables": variables}, headers=headers)
    return jsonify(response.json())