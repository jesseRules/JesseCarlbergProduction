using JesseCarlbergProduction.Interfaces;
using JesseCarlbergProduction.Models;
using JesseCarlbergProduction.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JesseCarlbergProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionsService _subscriptionsService;

        public SubscriptionController(SubscriptionsService subscriptionsService)
        {
            _subscriptionsService = subscriptionsService;
        }

        /// <summary>
        /// Gets a Subscription Entry by ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("{id:length(24)}", Name = "GetSubscription")]
        public ActionResult<SubscriptionModel> Get(string id)
        {
            var subscription = _subscriptionsService.Get(id);

            if (subscription == null)
            {
                return NotFound();
            }

            return subscription;
        }

        /// <summary>
        /// Add a Subscription Entry (set id to null)
        /// </summary>
        /// <remarks>Uses a MongoDB hosted on Azure</remarks>
        /// <param name="subscription"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<SubscriptionModel> Create(SubscriptionModel subscription)
        {
            _subscriptionsService.Create(subscription);

            return CreatedAtRoute("GetSubscription", new { id = subscription.Id.ToString() }, subscription);
        }
    }
}