// src/types/index.d.ts

// types.ts

// types.ts or Game.ts
export interface Game {
    _id: string;

    game_id: number;
    title: string;
    sample_cover: {
      image: string;
      thumbnail_image: string;
    };
    isFavorite: boolean; // Include isFavorite property
    genres: {
      genre_category: string;
      genre_category_id: number;
      genre_id: number;
      genre_name: string;
    }[];
    platforms: {
      first_release_date: string;
      platform_id: number;
      platform_name: string;
    }[];
    sample_screenshots: {
      caption: string;
      height: number;
      image: string;
      thumbnail_image: string;
      width: number;
    }[];
  }
  
  