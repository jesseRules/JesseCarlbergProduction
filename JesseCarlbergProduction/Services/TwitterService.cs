using JesseCarlbergProduction.Interfaces;
using JesseCarlbergProduction.Models.Twitter;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace JesseCarlbergProduction.Services
{
    /// <summary>
    /// TwitterService
    /// </summary>
    /// <remarks></remarks>
    public class TwitterService : ITwitterService
    {
        public string AccessToken { get; set; }

        public TwitterConnectionSettings Options { get; set; }

        public TwitterService(IOptions<TwitterConnectionSettings> optionsAccessor)
        {
            Options = optionsAccessor.Value;
            AccessToken = GetAccessToken().GetAwaiter().GetResult();
        }

        //get token
        public async Task<string> GetAccessToken()
        {
            using (HttpClient httpClient = new HttpClient())
            {
                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.twitter.com/oauth2/token ");
                var customerInfo = Convert.ToBase64String(new UTF8Encoding()
                                            .GetBytes(Options.Key + ":" + Options.Secret));
                request.Headers.Add("Authorization", "Basic " + customerInfo);
                request.Content = new StringContent("grant_type=client_credentials",
                                                        Encoding.UTF8, "application/x-www-form-urlencoded");
                HttpResponseMessage response = await httpClient.SendAsync(request).ConfigureAwait(false);
                string json = await response.Content.ReadAsStringAsync();
                dynamic item = Newtonsoft.Json.JsonConvert.DeserializeObject<object>(json);
                return item["access_token"];
            }
        }

        //Tweets by Location
        public async Task<List<TwitterModel.Status>> GetTweetsByGeoAsync(string lat, string lng, int radius, int count)
        {
            var requestGeoTimeline = new HttpRequestMessage(HttpMethod.Get, string.Format(@"
https://api.twitter.com/1.1/search/tweets.json?count={3}&geocode={0},{1},{2}mi&exclude_replies=1&tweet_mode=extended"
           , lat, lng, radius, count));
            requestGeoTimeline.Headers.Add("Authorization", "Bearer " + AccessToken);
            using (HttpClient httpClient = new HttpClient())
            {
                HttpResponseMessage responseUserTimeLine = await httpClient.SendAsync(requestGeoTimeline);
                string json = await responseUserTimeLine.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<TwitterModel.Rootobject>(json).statuses.ToList<TwitterModel.Status>();
            }
        }

        //Tweets by User
        public async Task<List<TwitterModel.Status>> GetTweetsByUserAsync(string userName, string lookBack, int count)
        {
            var requestUserTimeline = new HttpRequestMessage(HttpMethod.Get, string.Format(@"
            https://api.twitter.com/1.1/statuses/user_timeline.json?count={0}&screen_name={1}&until={2}&exclude_replies=1&tweet_mode=extended"
            , count, userName, lookBack));
            requestUserTimeline.Headers.Add("Authorization", "Bearer " + AccessToken);
            using (HttpClient httpClient = new HttpClient())
            {
                HttpResponseMessage responseUserTimeLine = await httpClient.SendAsync(requestUserTimeline);
                string json = await responseUserTimeLine.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<TwitterModel.Status>>(json);
            }
        }

        //Tweets by Term
        public async Task<List<TwitterModel.Status>> GetTweetsByTermAsync(string term, int count)
        {
            var requestUserTimeline = new HttpRequestMessage(HttpMethod.Get, string.Format(@"
            https://api.twitter.com/1.1/search/tweets.json?count={0}&q={1}&tweet_mode=extended"
            , count, term));
            requestUserTimeline.Headers.Add("Authorization", "Bearer " + AccessToken);
            using (HttpClient httpClient = new HttpClient())
            {
                HttpResponseMessage responseUserTimeLine = await httpClient.SendAsync(requestUserTimeline);
                string json = await responseUserTimeLine.Content.ReadAsStringAsync();
                List<TwitterModel.Status> response = JsonConvert.DeserializeObject<TwitterModel.Rootobject>(json).statuses.ToList<TwitterModel.Status>();
                List<TwitterModel.Status> og = response.FindAll(p => p.in_reply_to_status_id == null);
                response.FindAll(p => p.in_reply_to_status_id == null).ForEach(x =>
                {
                    x.comment_count = response.FindAll(t => t.in_reply_to_status_id_str != null && t.in_reply_to_status_id_str.Equals(x.id_str)).Count();
                });

                return response;
            }
        }

        //Tweets by Term Since Search
        public async Task<List<TwitterModel.Status>> GetTweetsByTermSinceIDAsync(string term, int count, string since_id)
        {
            var requestUserTimeline = new HttpRequestMessage(HttpMethod.Get, string.Format(@"
            https://api.twitter.com/1.1/search/tweets.json?count={0}&q={1}&since_id={2}&exclude_replies=1&tweet_mode=extended"
            , count, term, since_id));
            requestUserTimeline.Headers.Add("Authorization", "Bearer " + AccessToken);
            using (HttpClient httpClient = new HttpClient())
            {
                HttpResponseMessage responseUserTimeLine = await httpClient.SendAsync(requestUserTimeline);
                string json = await responseUserTimeLine.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<TwitterModel.Rootobject>(json).statuses.ToList<TwitterModel.Status>();
            }
        }

        //Tweets by Term Since Search
        public async Task<List<TwitterModel.Status>> GetTweetsByTermAfterIDAsync(string term, int count, string after_id)
        {
            var requestUserTimeline = new HttpRequestMessage(HttpMethod.Get, string.Format(@"
            https://api.twitter.com/1.1/search/tweets.json?count={0}&q={1}&max_id={2}&exclude_replies=1&tweet_mode=extended"
            , count, term, after_id));
            requestUserTimeline.Headers.Add("Authorization", "Bearer " + AccessToken);
            using (HttpClient httpClient = new HttpClient())
            {
                HttpResponseMessage responseUserTimeLine = await httpClient.SendAsync(requestUserTimeline);
                string json = await responseUserTimeLine.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<TwitterModel.Rootobject>(json).statuses.ToList<TwitterModel.Status>();
            }
        }
    }
}