using JesseCarlbergProduction.Models.Twitter;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JesseCarlbergProduction.Interfaces
{
    public interface ITwitterService
    {
        public Task<string> GetAccessToken();

        public Task<List<TwitterModel.Status>> GetTweetsByGeoAsync(string lat, string lng, int radius, int count);

        public Task<List<TwitterModel.Status>> GetTweetsByUserAsync(string userName, string lookBack, int count);

        public Task<List<TwitterModel.Status>> GetTweetsByTermAsync(string term, int count);

        public Task<List<TwitterModel.Status>> GetTweetsByTermSinceIDAsync(string term, int count, string since_id);

        public Task<List<TwitterModel.Status>> GetTweetsByTermAfterIDAsync(string term, int count, string after_id);
    }
}