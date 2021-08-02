using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace JesseCarlbergProduction.Models
{
    public class ContactModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string name { get; set; }
        public string email { get; set; }
        public string message { get; set; }
        public string timeStamp { get; set; }
    }
}