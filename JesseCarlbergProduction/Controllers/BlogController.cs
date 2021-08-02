using JesseCarlbergProduction.Interfaces;
using JesseCarlbergProduction.Models;
using JesseCarlbergProduction.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace JesseCarlbergProduction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(BlogService blogService)
        {
            _blogService = blogService;
        }

        /// <summary>
        /// Gets entire list of Blog Entries
        /// </summary>
        /// <remarks>Uses a MongoDB hosted on Azure</remarks>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<List<BlogModel>> Get()
        {
            // HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);

            return _blogService.Get();
        }

        /// <summary>
        /// Gets a Blog Lists
        /// </summary>
        /// <param name="count"></param>
        /// <param name="offset"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("list", Name = "GetBlogList")]
        public ActionResult<List<BlogModel>> GetBlogList(Int32 count, Int32 offset)
        {
            // HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            string owner = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return _blogService.GetWithWait();
        }

        /// <summary>
        /// Gets a Blog Entry by ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("{id:length(24)}", Name = "GetBlog")]
        public ActionResult<BlogModel> Get(string id)
        {
            var blog = _blogService.Get(id);

            if (blog == null)
            {
                return NotFound();
            }

            return blog;
        }

        /// <summary>
        /// Add a Blog Entry (set id to null)
        /// </summary>
        /// <remarks>Uses a MongoDB hosted on Azure</remarks>
        /// <param name="blog"></param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public ActionResult<BlogModel> Create(BlogModel blog)
        {
            _blogService.Create(blog);

            return CreatedAtRoute("GetBlog", new { id = blog.Id.ToString() }, blog);
        }

        /// <summary>
        /// Update Blog Entry by ID
        /// </summary>
        /// <remarks>Uses a MongoDB hosted on Azure</remarks>
        /// <param name="id"></param>
        /// <param name="blogIn"></param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, BlogModel blogIn)
        {
            var blog = _blogService.Get(id);

            if (blog == null)
            {
                return NotFound();
            }

            _blogService.Update(id, blogIn);

            return NoContent();
        }

        /// <summary>
        /// Delete a Blog Entry by ID
        /// </summary>
        /// <remarks>Uses a MongoDB hosted on Azure</remarks>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var blog = _blogService.Get(id);

            if (blog == null)
            {
                return NotFound();
            }

            _blogService.Remove(blog.Id);

            return NoContent();
        }
    }
}