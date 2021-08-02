using JesseCarlbergProduction.Interfaces;
using JesseCarlbergProduction.Models;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace JesseCarlbergProduction.Services
{
    /// <summary>
    /// Class EmailService.
    /// </summary>
    public class EmailService : IEmailService
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="EmailService"/> class.
        /// </summary>
        /// <param name="optionsAccessor">The options accessor.</param>
        public EmailService(IOptions<AuthMessageSenderOptions> optionsAccessor)
        {
            Options = optionsAccessor.Value;
        }

        /// <summary>
        /// Gets the options.
        /// </summary>
        /// <value>The options.</value>
        public AuthMessageSenderOptions Options { get; } //set only via Secret Manager

        /// <summary>
        /// Sends the email.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <returns>Task&lt;SendGrid.Response&gt;.</returns>
        public async Task<SendGrid.Response> SendEmailAsync(Models.EmailModel email)
        {
            var client = new SendGridClient(Options.SendGridKey);
            var from = new EmailAddress("jesse@jessecarlbergproduction.com", "Jesse Carlberg Production");
            var subject = email.Subject;
            var to = new EmailAddress(email.ToEmail, email.FName + " " + email.LName);
            var plainTextContent = email.Message;
            var htmlContent = email.HtmlMessage;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
            return response;
        }
    }
}