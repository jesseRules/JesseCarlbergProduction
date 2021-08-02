using JesseCarlbergProduction.Models.Twitter;
using System.Threading.Tasks;

namespace JesseCarlbergProduction.Interfaces
{
    public interface ITwitter2Service
    {
        public Task<string> GetAccessToken();

        public Task<Twitter2Model.Rootobject> GetSearchAllAsync(string term, int count);

        public Task<Twitter2Model.RootView> GetSearchAllForDisplayAsync(string term, int count);
    }
}