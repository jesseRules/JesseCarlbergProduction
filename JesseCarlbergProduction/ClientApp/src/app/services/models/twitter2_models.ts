export class TwitterFeed {
  tweets: Tweets[];
  meta: Meta;
}

export class Tweets {
  reply_settings: string;
  public_metrics: PublicMetrics;
  created_at: Date;
  author_id: string;
  referenced_tweets: ReferrencedTweets[];
  conversation_id: string;
  possibly_sensitive: boolean;
  entities: Entities;
  lang: string;
  text: string;
  source: string;
  user: User;
  id: string;
  attachments: Attachments;
  context_annotations: ContextAnnotations[];
}

export class ContextAnnotations {
 domain: Domain;
 entity: ContextEntity;
}

export class ContextEntity {
  id: string;
  name: string;
}

export class Domain {
  id: string;
  name: string;
  description: string;
}

export class Attachments {
  media_keys: string[];
}

export class User {
  protect: Boolean;
  username: string;
  entities: UserEntities;
  description: string;
  pinned_tweet_id: string;
  verified: Boolean;
  profile_image_url: string;
  url: string;
  name: string;
  id: string;
}

export class UserPublicMetrics {
  followers_count: number;
  following_count: number;
  tweet_count: number;
  listed_count: number;
}

export class UserEntities {
  url: UserUrl;
}

export class UserUrl {
  urls: Urls[];
}

export class Entities {
  annotations: Annotations[];
  mentions: Mentions[];
  urls: Urls[];
  hashtags: Hashtags;
}

export class Hashtags {
  start: number;
  end: number;
  tag: string;
}

export class Urls {
  start: number;
  end: number;
  url: string;
  expanded_url: string;
  display_url: string;
}

export class Annotations {
  start: number;
  end: number;
  probability: number;
  type: string;
  normalized_text: string;
}

export class Mentions {
  start: number;
  end: number;
  username: string;
}

export class ReferrencedTweets {
  type: string;
  id: string;
}

export class PublicMetrics {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
}

export class Meta {
  newest_id: string;
  oldest_id: string;
  result_count: number;
  next_token: string;
}
