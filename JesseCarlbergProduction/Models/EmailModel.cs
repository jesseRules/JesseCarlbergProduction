namespace JesseCarlbergProduction.Models
{
    /// <summary>
    /// Class EmailModel.
    /// </summary>
    public class EmailModel
    {
        /// <summary>
        /// Converts to email.
        /// </summary>
        /// <value>To email.</value>
        public string ToEmail { get; set; }

        /// <summary>
        /// Gets or sets the message.
        /// </summary>
        /// <value>The message.</value>
        public string Message { get; set; }

        /// <summary>
        /// Gets or sets the HTML message.
        /// </summary>
        /// <value>The HTML message.</value>
        public string HtmlMessage { get; set; }

        /// <summary>
        /// Gets or sets the name of the f.
        /// </summary>
        /// <value>The name of the f.</value>
        public string FName { get; set; }

        /// <summary>
        /// Gets or sets the name of the l.
        /// </summary>
        /// <value>The name of the l.</value>
        public string LName { get; set; }

        /// <summary>
        /// Gets or sets the subject.
        /// </summary>
        /// <value>The subject.</value>
        public string Subject { get; set; }
    }
}