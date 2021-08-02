namespace JesseCarlbergProduction.Models.Twitter
{
    public class TwitterConnectionSettings : ITwitterConnectionSettings
    {
        public string Key { get; set; }
        public string Secret { get; set; }
    }

    public interface ITwitterConnectionSettings
    {
        public string Key { get; set; }
        public string Secret { get; set; }
    }
}