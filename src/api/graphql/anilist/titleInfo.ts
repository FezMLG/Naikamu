import { gql } from '@apollo/client';

export const TITLE_INFO = gql`
  query ($id: Int!) {
    Media(id: $id) {
      id
      format
      status
      description
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      seasonYear
      episodes
      duration
      trailer {
        id
        site
        thumbnail
      }
      genres
      averageScore
      meanScore
      popularity
      tags {
        id
        name
      }
      nextAiringEpisode {
        id
        airingAt
        episode
      }
      siteUrl
      title {
        english
        romaji
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
    }
  }
`;
