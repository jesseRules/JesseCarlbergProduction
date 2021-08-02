namespace JesseCarlbergProduction.Models
{
    public class BlogDBSettingsModel : IBlogDBSettingsModel
    {
        public string BlogCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IBlogDBSettingsModel
    {
        string BlogCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}