namespace JesseCarlbergProduction.Models
{
    public class SubscriptionDBSettingsModel : ISubscriptionDBSettingsModel
    {
        public string SubscriptionsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ISubscriptionDBSettingsModel
    {
        string SubscriptionsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}