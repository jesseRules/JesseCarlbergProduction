using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace JesseCarlbergProduction.Models
{
    /// <summary>
    /// Class ApplicationDBContext.
    /// Implements the <see cref="Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityDbContext{iExcelContainer.Models.ApplicationUser}" />
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityDbContext{iExcelContainer.Models.ApplicationUser}" />
    public class ApplicationDBContext : IdentityDbContext<ApplicationUser>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ApplicationDBContext"/> class.
        /// </summary>
        /// <param name="options">The options.</param>
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }
    }
}