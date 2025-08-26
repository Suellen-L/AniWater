from flask import Blueprint, jsonify, request
import requests

anilist_bp = Blueprint('anilist', __name__)

ANILIST_URL = "https://graphql.anilist.co"

# Rota para buscar animes por temporada
@anilist_bp.route('/animes', methods=['GET'])
def get_animes_by_season():
    season = request.args.get('season', 'SUMMER')  # Ex: SUMMER, WINTER, SPRING, FALL
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

    response = requests.post(ANILIST_URL, json={"query": query, "variables": variables})
    return jsonify(response.json())


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

    response = requests.post(ANILIST_URL, json={"query": query, "variables": variables})
    return jsonify(response.json())