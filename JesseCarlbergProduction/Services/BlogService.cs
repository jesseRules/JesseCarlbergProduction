using JesseCarlbergProduction.Interfaces;
using JesseCarlbergProduction.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace JesseCarlbergProduction.Services
{
    public class BlogService: IBlogService
    {
        private readonly IMongoCollection<BlogModel> _blogs;

        public BlogService(IBlogDBSettingsModel settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _blogs = database.GetCollection<BlogModel>(settings.BlogCollectionName);
        }

        public List<BlogModel> GetWithWait()
        {
            return _blogs.FindAsync(blog => true).GetAwaiter().GetResult().ToList();
        }

        public List<BlogModel> Get() =>
            _blogs.Find(blog => true).ToList();

        public BlogModel Get(string id) =>
            _blogs.Find<BlogModel>(blog => blog.Id == id).FirstOrDefault();

        public BlogModel Create(BlogModel blog)
        {
            _blogs.InsertOne(blog);
            return blog;
        }

        public void Update(string id, BlogModel blogIn) =>
            _blogs.ReplaceOne(blog => blog.Id == id, blogIn);

        public void Remove(BlogModel blogIn) =>
            _blogs.DeleteOne(blog => blog.Id == blogIn.Id);

        public void Remove(string id) =>
            _blogs.DeleteOne(blog => blog.Id == id);
    }
}