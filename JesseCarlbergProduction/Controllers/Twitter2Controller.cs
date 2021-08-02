using JesseCarlbergProduction.Interfaces;
using JesseCarlbergProduction.Models.Twitter;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace JesseCarlbergProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Twitter2Controller : ControllerBase
    {
        private readonly ITwitter2Service _twitter2Service;

        public Twitter2Controller(ITwitter2Service twitter2Service)
        {
            _twitter2Service = twitter2Service;
        }

        /// <summary>
        /// Search Twitter by Keyword
        /// </summary>
        /// <param name="keyword"></param>
        /// <param name="tweetCount"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("searchRecent")]
        public async Task<Twitter2Model.Rootobject> GetSearchRecentAsync(string keyword, int tweetCount)
        {
            if (tweetCount > 100)
            {
                tweetCount = 100;
            }
            return await _twitter2Service.GetSearchAllAsync(keyword, tweetCount);
        }

        /// <summary>
        /// Search Twitter by Keyword For Display
        /// </summary>
        /// <param name="keyword"></param>
        /// <param name="tweetCount"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("search")]
        public async Task<Twitter2Model.RootView> GetSearchRecentForDisplayAsync(string keyword, int tweetCount)
        {
            if (tweetCount > 100)
            {
                tweetCount = 100;
            }
            return await _twitter2Service.GetSearchAllForDisplayAsync(keyword, tweetCount);
        }
    }
}