using JesseCarlbergProduction.Models;
using System.Threading.Tasks;

namespace JesseCarlbergProduction.Interfaces
{
    /// <summary>
    /// Interface IEmailService
    /// </summary>
    public interface IEmailService
    {
        /// <summary>
        /// Sends the email.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <returns>Task&lt;SendGrid.Response&gt;.</returns>
        public Task<SendGrid.Response> SendEmailAsync(EmailModel email);
    }
}