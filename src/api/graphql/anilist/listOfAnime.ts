import { gql } from '@apollo/client';

export const LIST_OF_ANIME = gql`
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        id: $id
        search: $search
        isAdult: false
        season: SUMMER
        seasonYear: 2022
        sort: [POPULARITY_DESC]
      ) {
        id
        title {
          romaji
        }
        coverImage {
          extraLarge
          color
        }
      }
    }
  }
`;
