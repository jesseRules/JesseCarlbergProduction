using JesseCarlbergProduction.Interfaces;
using JesseCarlbergProduction.Models;
using MongoDB.Driver;
using System.Linq;

namespace JesseCarlbergProduction.Services
{
    public class SubscriptionsService: ISubscriptionsService
    {
        private readonly IMongoCollection<SubscriptionModel> _subscriptions;

        public SubscriptionsService(ISubscriptionDBSettingsModel settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _subscriptions = database.GetCollection<SubscriptionModel>(settings.SubscriptionsCollectionName);
        }

        public SubscriptionModel Get(string id) =>
        _subscriptions.Find<SubscriptionModel>(subscription => subscription.Id == id).FirstOrDefault();

        public SubscriptionModel Create(SubscriptionModel subscription)
        {
            _subscriptions.InsertOne(subscription);
            return subscription;
        }
    }
}