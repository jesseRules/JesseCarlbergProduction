using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace JesseCarlbergProduction.Models
{
    public class BlogModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string pubDate { get; set; }
        public string thumbImageURL { get; set; }
        public string mainImageURL { get; set; }
        public string content { get; set; }
        public string[] categories { get; set; }
        public string title { get; set; }
        public string link { get; set; }
        public string author { get; set; }
        public string description { get; set; }
        public string content_html { get; set; }
        public string content_markdown { get; set; }
    }
}