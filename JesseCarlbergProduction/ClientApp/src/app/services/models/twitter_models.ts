export class tweets{
    created_at: string;
    id: number;
    id_str: string;
    text: string;
    truncated: boolean;
    comment_count: number;
    entities: {
        hashtag: object[];
        symbols: object[];
        user_mentions: {
            screen_name: string;
            name: string;
            id: number;
            id_str: string;
            indices: number[];
        };
        url: {
            url: string;
            expanded_url: string;
            display_url: string;
            indices: number[];
        }
    };
    metadata: {
        iso_language_code: string;
        result_type: string;
    }
    source: string;
    in_reply_to_status_id: object;
    in_reply_to_status_id_str: object;
    in_reply_to_user_id: object;
    in_reply_to_user_id_str: object;
    in_reply_to_screen_name: object;
    user: {
        id: number;
        id_str: string;
        name: string;
        screen_name: string;
        location: string;
        description: string;
        url: string;
        entities: {
            description: {
                urls: object[];
            }
            url: {
                urls: {
                    url: string;
                    expanded_url: string;
                    display_url: string;
                    indices: number;
                }
            }
        }
        _protected: boolean;
        followers_count: number;
        friends_count: number;
        listed_count: number;
        created_at: string;
        favourites_count: number;
        utc_offset: number;
        time_zone: string;
        geo_enabled: boolean;
        verified: boolean;
        statuses_count: number;
        lang: string;
        contributors_enabled: boolean;
        is_translator: boolean;
        is_translation_enabled: boolean;
        profile_background_color: string;
        profile_background_image_url: string;
        profile_background_image_url_https: string;
        profile_background_tile: boolean;
        profile_image_url: string;
        profile_image_url_https: string;
        profile_banner_url: string;
        profile_link_color: string;
        profile_sidebar_border_color: string;
        profile_sidebar_fill_color: string;
        profile_text_color: string;
        profile_use_background_image: boolean;
        has_extended_profile: boolean;
        default_profile: boolean;
        default_profile_image: boolean;
        following: boolean;
        follow_request_sent: boolean;
        notifications: boolean;
        translator_type: string;
    }
    geo: object;
    coordinates: object;
    place: object;
    contributors: object;
    is_quote_status: boolean;
    retweet_count: number;
    favorite_count: number;
    favorited: boolean;
    retweeted: boolean;
    possibly_sensitive: boolean;
    lang: string;
}
