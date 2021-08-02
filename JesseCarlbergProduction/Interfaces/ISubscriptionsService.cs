using JesseCarlbergProduction.Models;

namespace JesseCarlbergProduction.Interfaces
{
    public interface ISubscriptionsService
    {
        public SubscriptionModel Get(string id);
        public SubscriptionModel Create(SubscriptionModel subscription);
    }
}