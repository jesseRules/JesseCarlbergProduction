using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace JesseCarlbergProduction.Models.Twitter
{
    public class Twitter2Model
    {
        public class Rootobject
        {
            public RootData[] data { get; set; }
            public RootIncludes includes { get; set; }
            public MetaData meta { get; set; }
        }

        public class RootView
        {
            public RootData[] tweets { get; set; }

            public MetaData meta { get; set; }
        }

        public class RootIncludes
        {
            public Users[] users { get; set; }
        }

        public class Users
        {
            [JsonProperty(PropertyName = "protected")]
            public Boolean protect { get; set; }

            public string username { get; set; }
            public UserEntities entities { get; set; }
            public string description { get; set; }
            public string pinned_tweet_id { get; set; }
            public UserPublicMetrics public_metrics { get; set; }
            public Boolean verified { get; set; }
            public string profile_image_url { get; set; }
            public string url { get; set; }
            public string name { get; set; }
            public string id { get; set; }
        }

        public class UserEntities
        {
            public UserUrl url { get; set; }
        }

        public class UserUrl
        {
            public UserUrls[] urls { get; set; }
        }

        public class UserUrls
        {
            public Int32 start { get; set; }
            public Int32 end { get; set; }
            public string url { get; set; }
            public string expanded_url { get; set; }
            public string display_url { get; set; }
        }

        public class UserPublicMetrics
        {
            public Int32 followers_count { get; set; }
            public Int32 following_count { get; set; }
            public Int32 tweet_count { get; set; }
            public Int32 listed_count { get; set; }
        }

        public class MetaData
        {
            public string newest_id { get; set; }
            public string oldest_id { get; set; }
            public Int32 result_count { get; set; }
            public string next_token { get; set; }
        }

        public class RootData
        {
            public string reply_settings { get; set; }
            public PublicMetrics public_metrics { get; set; }
            public DateTime created_at { get; set; }
            public string author_id { get; set; }
            public ReferencedTweets[] referenced_tweets { get; set; }
            public string conversation_id { get; set; }
            public Boolean possibly_sensitive { get; set; }
            public TwitterEntities entities { get; set; }
            public string lang { get; set; }
            public string text { get; set; }
            public string source { get; set; }
            public Users user { get; set; }
            public ContextAnnotations[] context_annotations { get; set; }
            public string id { get; set; }
            public Attachments attachments { get; set; }
        }

        public class RootTweets
        {
            public string reply_settings { get; set; }
            public PublicMetrics public_metrics { get; set; }
            public DateTime created_at { get; set; }
            public string author_id { get; set; }
            public ReferencedTweets[] referenced_tweets { get; set; }
            public string conversation_id { get; set; }
            public Boolean possibly_sensitive { get; set; }
            public TwitterEntities entities { get; set; }
            public string lang { get; set; }
            public string text { get; set; }
            public string source { get; set; }
            public ContextAnnotations[] context_annotations { get; set; }
            public string id { get; set; }

            public Users user { get; set; }
            public Attachments attachments { get; set; }
        }

        public class Attachments
        {
            public List<string> media_keys { get; set; }
        }

        public class ContextAnnotations
        {
            public Domain domain { get; set; }
            public Entity entity { get; set; }
        }

        public class Domain
        {
            public string id { get; set; }
            public string name { get; set; }
            public string description { get; set; }
        }

        public class Entity
        {
            public string id { get; set; }
            public string name { get; set; }
        }

        public class PublicMetrics
        {
            public Int32 retweet_count { get; set; }
            public Int32 reply_count { get; set; }
            public Int32 like_count { get; set; }
            public Int32 quote_count { get; set; }
        }

        public class ReferencedTweets
        {
            public string type { get; set; }
            public string id { get; set; }
        }

        public class TwitterEntities
        {
            public Annotations[] annotations { get; set; }
            public Mentions[] mentions { get; set; }
            public EntityUrls[] urls { get; set; }
            public Hashtags[] hashtags { get; set; }
        }

        public class Hashtags
        {
            public Int32 start { get; set; }
            public Int32 end { get; set; }
            public string tag { get; set; }
        }

        public class EntityUrls
        {
            public Int32 start { get; set; }
            public Int32 end { get; set; }
            public string url { get; set; }
            public string expanded_url { get; set; }
            public string display_url { get; set; }
        }

        public class Annotations
        {
            public Int32 start { get; set; }
            public Int32 end { get; set; }
            public Decimal probability { get; set; }
            public string type { get; set; }
            public string normalized_text { get; set; }
        }

        public class Mentions
        {
            public Int32 start { get; set; }
            public Int32 end { get; set; }
            public string username { get; set; }
        }
    }
}