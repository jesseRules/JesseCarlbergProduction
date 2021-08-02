using JesseCarlbergProduction.Models;
using System.Collections.Generic;

namespace JesseCarlbergProduction.Interfaces
{
    public interface IBlogService
    {
        public List<BlogModel> GetWithWait();
        public List<BlogModel> Get();
        public BlogModel Get(string id);
        public BlogModel Create(BlogModel blog);
        public void Update(string id, BlogModel blogIn);
        public void Remove(BlogModel blogIn);
        public void Remove(string id);
    }
}