using JesseCarlbergProduction.Interfaces;
using JesseCarlbergProduction.Models.Twitter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JesseCarlbergProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TwitterController : ControllerBase
    {
        private readonly ITwitterService _twitterService;

        public TwitterController(ITwitterService twitterService)
        {
            _twitterService = twitterService;
        }

        /// <summary>
        /// Get Tweets bt UserName limit 100
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="tweetCount"></param>
        /// <returns></returns>
        ///
        [HttpGet]
        [AllowAnonymous]
        [Route("byuser")]
        public async Task<List<TwitterModel.Status>> getTweetsByUserAsync(string userName, int tweetCount)
        {
            if (tweetCount > 100)
            {
                tweetCount = 100;
            }
            string lookBack = DateTime.Now.ToString("yyyy-MM-dd");
            return await _twitterService.GetTweetsByUserAsync(userName, lookBack, tweetCount);
        }

        /// <summary>
        /// Get Tweets by Geo Location
        /// </summary>
        /// <param name="lat"></param>
        /// <param name="lng"></param>
        /// <param name="radiusMiles"></param>
        /// <param name="tweetCount"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("bygeo")]
        public async Task<List<TwitterModel.Status>> getTweetsByGeoLocationAsync(string lat, string lng, int radiusMiles, int tweetCount)
        {
            if (tweetCount > 100)
            {
                tweetCount = 100;
            }
            return await _twitterService.GetTweetsByGeoAsync(lat, lng, radiusMiles, tweetCount);
        }

        /// <summary>
        /// Search Twitter by Keyword
        /// </summary>
        /// <param name="keyword"></param>
        /// <param name="tweetCount"></param>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        [Route("byterm")]
        public async Task<List<TwitterModel.Status>> getTweetsByKeywordAsync(string keyword, int tweetCount)
        {
            if (tweetCount > 100)
            {
                tweetCount = 100;
            }
            return await _twitterService.GetTweetsByTermAsync(keyword, tweetCount);
        }

        /// <summary>
        /// Search Twitter by Keyword
        /// </summary>
        /// <param name="keyword"></param>
        /// <param name="tweetCount"></param>
        /// <param name="afterId"></param>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        [Route("byterm/afterId")]
        public async Task<List<TwitterModel.Status>> getTweetsByKeywordAfterIdAsync(string keyword, int tweetCount, string afterId)
        {
            if (tweetCount > 100)
            {
                tweetCount = 100;
            }
            return await _twitterService.GetTweetsByTermAfterIDAsync(keyword, tweetCount, afterId);
        }
    }
}